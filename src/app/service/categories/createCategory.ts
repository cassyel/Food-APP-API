import { createCategoryModel, findCategoryModel } from '../../models/categories/createCategory';
import { categoryProps } from '../../models/categories/createCategory';

export async function createCategoryService({ name, icon }: categoryProps) {
  const existsCategory = await findCategoryModel({ name, icon });

  if (existsCategory) return { content: { error: 'Category already exists' }, code: 400 };

  const newCategory = await createCategoryModel({ name, icon });

  return newCategory
    ? { content: newCategory, code: 201 }
    : { content: { error: 'Category not created' }, code: 400 };
}
