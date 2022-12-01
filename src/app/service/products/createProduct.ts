import { createProductModel, findProductModel, IProductProps } from '../../models/products/createProduct';

export async function createProductService({ name, description, imagePath, price, ingredients, category }:IProductProps) {
  const existsProduct = await findProductModel({ name, description });

  if (existsProduct) return { content: { error: 'Product already exists' }, code: 400 };

  const newProduct = await createProductModel({ name, description, imagePath, price, ingredients, category });

  return newProduct
    ? { content: newProduct, code: 201 }
    : { content: { error: 'Category not created' }, code: 400 };
}
