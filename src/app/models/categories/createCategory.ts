import { Category } from '../../database/Category';

export interface categoryProps {
  name: string;
  icon: string
}

export async function createCategoryModel({ name, icon }: categoryProps) {
  const newCategory = await Category.create({ name, icon });
  return newCategory;
}

export async function findCategoryModel({ name, icon }: categoryProps) {
  const category = await Category.findOne({ name, icon });
  return category;
}
