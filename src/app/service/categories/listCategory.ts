import { listCategoriesModel } from '../../models/categories/listCategories';

export async function listCategoriesService() {
  const allCategories = await listCategoriesModel();

  return { content: allCategories, code: 200 };
}
