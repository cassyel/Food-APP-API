import { ObjectId } from 'mongoose';
import { Product } from '../../database/Product';

type ingredients = {
  name: string;
  icon: string;
}

export interface IProductProps {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: ingredients[];
  category: ObjectId
}

export async function createProductModel({ name, description, imagePath, price, ingredients, category }:IProductProps) {
  const newProduct = await Product.create({ name, description, imagePath, price, ingredients, category });
  return newProduct;
}

export async function findProductModel({ name }: { name: string }) {
  const product = await Product.findOne({ name });
  return product;
}
