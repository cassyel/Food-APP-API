import { Request, Response } from 'express';

export async function productsImages(req: Request, res: Response) {
  const { imagePath } = req.params;

  return res.status(307).redirect(`https://food-app-api-production.s3.sa-east-1.amazonaws.com/${imagePath}`);
}
