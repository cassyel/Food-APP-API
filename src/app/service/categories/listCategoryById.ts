import { ObjectId } from 'mongoose';
import { listCategoryByIdModel } from '../../models/categories/listCategoryById';

export async function listCategoryByIdService(id: ObjectId) {
  const category = await listCategoryByIdModel(id);
  return !!category;
}
