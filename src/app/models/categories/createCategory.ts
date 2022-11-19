import { Category } from '../../database/Category';

export interface ICategoryProps {
  name: string;
  icon: string
}

export async function createCategoryModel({ name, icon }: ICategoryProps) {
  const newCategory = await Category.create({ name, icon });
  return newCategory;
}

export async function findCategoryModel({ name, icon }: ICategoryProps) {
  const category = await Category.findOne({ name, icon });
  return category;
}
