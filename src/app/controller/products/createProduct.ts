import { ingredients } from './../../models/products/createProduct';
import { Request, Response } from 'express';
import Joi from 'joi';
import { createProductService } from '../../service/products/createProduct';
import { deleteImageFromS3 } from '../../../AWS-S3';
import { listCategoryByIdService } from '../../service/categories/listCategoryById';
import { ObjectId } from 'mongoose';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  image: Joi.any().required(),
  price: Joi.number().min(1).required(),
  ingredients: Joi.string().empty().required(),
  category: Joi.string().hex().length(24).required().messages({ 'string.length': 'Invalid objectID' }),
});

interface File extends Express.Multer.File {
  file: {
    key: string;
  }
}

interface ICreateProduct {
  name: string;
  description: string;
  image: Express.Multer.File | undefined;
  price: number;
  ingredients: ingredients[]  | [];
  category: ObjectId;
}

const optionsJoi = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

async function validJoi({ category, description, image, ingredients, name, price }: ICreateProduct) {
  try {
    await schema.validateAsync({ category, description, image, ingredients, name, price }, optionsJoi);
  } catch(error) {
    if (error instanceof Joi.ValidationError) {
      throw new Error(error.details[0].message);
    }
  }

  return null;
}

async function validCategory({ category, key }: { category: ObjectId, key: string }) {
  const categoryExists = await listCategoryByIdService(category);
  if (!categoryExists) {
    deleteImageFromS3({ key });
    throw new Error('Please Check categoryIds On Get Request In /categories');
  }

  return null;
}


export async function createProductController(req: Request, res: Response) {
  const { category, description, name, price } = req.body as ICreateProduct;
  const { file: image } = req;
  let { ingredients: unformattedIngredients } = req.body;

  await validJoi({ category, description, image, ingredients: unformattedIngredients, name, price });

  const { file: { key } } = req as unknown as File;
  await validCategory({ category, key });

  const splittedIngredients = unformattedIngredients.split('');

  if (splittedIngredients[0] !== '[' && splittedIngredients[splittedIngredients.length -1] !== ']') {
    unformattedIngredients = `[${unformattedIngredients}]`;
  }

  const { code, content } = await createProductService({
    name,
    description,
    imagePath: key,
    price: Number(price),
    ingredients: unformattedIngredients ? JSON.parse(unformattedIngredients) : [],
    category,
  });

  if (code !== 201)  deleteImageFromS3({ key });
  return res.status(code).json(content);
}
