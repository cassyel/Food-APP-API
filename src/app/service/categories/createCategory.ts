import { createCategoryModel, findCategoryModel, ICategoryProps } from '../../models/categories/createCategory';

export async function createCategoryService({ name, icon }: ICategoryProps) {
  const existsCategory = await findCategoryModel({ name, icon });

  if (existsCategory) return { content: { error: 'Category already exists' }, code: 409 };

  const newCategory = await createCategoryModel({ name, icon });

  return newCategory
    ? { content: newCategory, code: 201 }
    : { content: { error: 'Category not created' }, code: 400 };
}
