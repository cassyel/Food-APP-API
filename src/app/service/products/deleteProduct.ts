import { deleteProductModel, IDeleteProductProps  } from '../../models/products/deleteProduct';
import { deleteFailedRequestImage } from '../../controller/products/createProduct';
import path from 'path';

export async function deleteProductService({ id }: IDeleteProductProps) {
  const deletedProduct = await deleteProductModel({ id });

  if (deletedProduct) deleteFailedRequestImage(`${path.resolve(__dirname, '../../../../', 'uploads')}/${deletedProduct.imagePath}`);

  return deletedProduct
    ? { content: deletedProduct, code: 200 }
    : { content: { error: `Not find product with this id: ${id}` }, code: 404 };
}

