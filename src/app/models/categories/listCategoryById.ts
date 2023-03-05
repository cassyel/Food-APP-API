import { Category } from '../../database/Category';

export async function listCategoryByIdModel(id: string) {
  const category = await Category.find().where('id').equals(id);
  return category;
}
