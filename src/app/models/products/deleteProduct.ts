import { Product } from '../../database/Product';

export interface IDeleteProductProps {
  id: string;
}

export async function deleteProductModel({ id }: IDeleteProductProps) {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return deletedProduct;
}
