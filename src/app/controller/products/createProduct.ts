import fs from 'fs';
import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { createProductService } from '../../service/products/createProduct';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  image: Joi.any().optional(),
  price: Joi.number().min(1).required(),
  ingredients: Joi.string().optional(),
  category: Joi.string().required()
});

const options: ValidationOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const deleteFailedRequestImage = (path: string) => {
  fs.unlink(path, () => {
    console.log(`Deleted ${path}`);
  });
};

export async function createProductController(req: Request, res: Response) {
  const { file, body } = req;
  const { error: JoiInputFieldsError } = schema.validate(body, options);

  if (JoiInputFieldsError) {
    deleteFailedRequestImage(String(file?.path));
    return res.status(400).json({ error: JoiInputFieldsError.message });
  }

  const { name, description, price, ingredients, category } = body;

  const { code, content } = await createProductService({
    name,
    description,
    imagePath: file?.filename,
    price: Number(price),
    ingredients: ingredients ? JSON.parse(ingredients) : [],
    category,
  });

  if (code !== 201) deleteFailedRequestImage(String(file?.path));

  return res.status(code).json(content);
}
