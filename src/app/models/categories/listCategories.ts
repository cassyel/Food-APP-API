import { Category } from '../../database/Category';

export async function listCategoriesModel() {
  const allCategories = await Category.find();
  return allCategories;
}
