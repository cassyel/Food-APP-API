import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { createCategoryService } from '../../service/categories/createCategory';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  icon: Joi.string().min(1).required(),
});

const options: ValidationOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

export async function createCategoryController(req: Request, res: Response) {
  const { error } = schema.validate(req.body, options);
  if (error) return res.status(400).json({ error: error.message });

  const { name, icon } = req.body;
  const { code, content } = await createCategoryService({ name, icon });

  return res.status(code).json(content);
}
