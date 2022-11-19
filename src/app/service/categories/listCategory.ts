import { listCategoriesModel } from '../../models/categories/listCategories';

export async function listCategoriesService() {
  const allCategories = await listCategoriesModel();

  return allCategories.length !== 0
    ? { content: allCategories, code: 200 }
    : { content: { error: 'No category registered' }, code: 400 };
}
