import { listCategoryByIdModel } from '../../models/categories/listCategoryById';

export async function listCategoryByIdService(id: string) {
  const category = await listCategoryByIdModel(id);

  return category
    ? { content: category, code: 200 }
    : { content: { error: `No category registered with this ${id}` }, code: 404 };
}
