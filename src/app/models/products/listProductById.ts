import { Product } from '../../database/Product';

export interface IListProductById {
  productsIds: string[]
}

export async function listProductById({ productsIds }: IListProductById) {
  const product = await Product.find().where('id').equals(productsIds);
  return product;
}
