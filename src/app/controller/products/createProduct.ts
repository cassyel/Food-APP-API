import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { createProductService } from '../../service/products/createProduct';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  image: Joi.any().optional(),
  price: Joi.number().min(1).required(),
  ingredients: Joi.string().required(),
  category: Joi.string().required()
});

const options: ValidationOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

export async function createProductController(req: Request, res: Response) {
  const { error } = schema.validate(req.body, options);
  if (error) return res.status(400).json({ error: error.message });

  const imagePath = req.file?.filename;
  const { name, description, price, ingredients, category } = req.body;

  const { code, content } = await createProductService({
    name,
    description,
    imagePath,
    price: Number(price),
    ingredients: JSON.parse(ingredients),
    category,
  });

  res.status(code).json(content);
}
