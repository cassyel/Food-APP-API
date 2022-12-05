import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { createOrderService } from '../../service/orders/createOrder';

const schema = Joi.object({
  table: Joi.string().min(2).required(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().optional(),
    })).required(),
});

const options: ValidationOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

export async function createOrderController(req: Request, res: Response) {
  const { error: JoiInputFieldsError } = schema.validate(req.body, options);
  if (JoiInputFieldsError)
    return res.status(400).json({ error: JoiInputFieldsError.message });

  const { table, products } = req.body;
  const { code, content } = await createOrderService({ table, products });

  return res.status(code).json(content);
}
