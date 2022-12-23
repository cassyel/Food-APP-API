import { deleteProductModel, IDeleteProductProps  } from '../../models/products/deleteProduct';
import { deleteFailedRequestImage } from '../../controller/products/createProduct';

export async function deleteProductService({ id }: IDeleteProductProps) {
  const deletedProduct = await deleteProductModel({ id });

  if (deletedProduct) deleteFailedRequestImage(`${String(process.env.UPLOADPATH)}${deletedProduct.imagePath}`);

  return deletedProduct
    ? { content: deletedProduct, code: 200 }
    : { content: { error: `Not find order with this id: ${id}` }, code: 400 };
}
