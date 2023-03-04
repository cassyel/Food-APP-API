import { deleteProductModel, IDeleteProductProps  } from '../../models/products/deleteProduct';
import { deleteImageFromS3 } from '../../../AWS-S3';

export async function deleteProductService({ id }: IDeleteProductProps) {
  const deletedProduct = await deleteProductModel({ id });

  if (deletedProduct) deleteImageFromS3({ Key: deletedProduct.imagePath });

  return deletedProduct
    ? { content: deletedProduct, code: 200 }
    : { content: { error: `Not find product with this id: ${id}` }, code: 404 };
}

