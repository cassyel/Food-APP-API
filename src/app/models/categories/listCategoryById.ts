import { ObjectId } from 'mongoose';
import { Category } from '../../database/Category';

export async function listCategoryByIdModel(id: ObjectId) {
  const category = await Category.findById(id);
  return category;
}
