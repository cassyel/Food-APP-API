import { Request, Response } from 'express';
import Joi, { ValidationOptions } from 'joi';
import { isValidObjectId } from 'mongoose';
import { changeOrderStatusService } from '../../service/orders/changeOrderStatus';

const schema = Joi.object({
  status: Joi.string().valid('WAITING', 'IN_PRODUCTION', 'DONE').required(),
});

const options: ValidationOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

export async function changeOrderStatusController(req: Request, res: Response) {
  const { error: JoiInputFieldsError } = schema.validate(req.body, options);

  if (JoiInputFieldsError)
    return res.status(400).json({ error: JoiInputFieldsError.message });

  const { status } = req.body;
  const { orderId: id } = req.params;

  if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid orderId' });

  const { code, content } = await changeOrderStatusService({ id, status });

  return res.status(code).json(content);
}
