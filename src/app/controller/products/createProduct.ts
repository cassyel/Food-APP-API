import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { createProductService } from '../../service/products/createProduct';
import { isValidObjectId } from 'mongoose';
import { deleteImageFromS3 } from '../../../AWS-S3';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  image: Joi.any().optional(),
  price: Joi.number().min(1).required(),
  ingredients: Joi.string().optional(),
  category: Joi.string().required(),
});

const options: ValidationOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

interface File extends Express.Multer.File {
  file: {
    key: string;
    bucket: string;
    location: string;
  }
}

export async function createProductController(req: Request, res: Response) {
  try {
    const { body } = req;
    const { file, file: { key: Key } } = req as unknown as File;
    const { error: JoiInputFieldsError } = schema.validate(body, options);


    if (!file) return res.status(400).json({ error: 'Image is required' });

    console.log(req.file);


    if (JoiInputFieldsError) {
      deleteImageFromS3({ Key });
      return res.status(400).json({ error: JoiInputFieldsError.message });
    }


    const { name, description, price, category } = body;
    let { ingredients } = body;


    if (!isValidObjectId(category)) return res.status(400).json({ error: 'Invalid categoryId' });
    const splittedIngredients = ingredients.split('');

    if (splittedIngredients[0] !== '[' && splittedIngredients[splittedIngredients.length -1] !== ']') {
      ingredients = `[${ingredients}]`;
    }

    console.log(ingredients);

    const { code, content } = await createProductService({
      name,
      description,
      imagePath: file.key,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      category,
    });

    if (code !== 201) deleteImageFromS3({ Key });

    return res.status(code).json(content);
  } catch {
    const { file: { key: Key } } = req as unknown as File;

    deleteImageFromS3({ Key });
    return res.status(400).json({ error: 'Syntax Error Ingredients' });
  }
}
