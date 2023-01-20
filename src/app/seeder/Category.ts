import { Category } from '../database/Category';

export async function categoriesSeeder() {
  await Category.deleteMany();
  await Category.insertMany([
    {
      name: 'Promoções',
      icon: '💎',
    },
    {
      name: 'Pizzas',
      icon: '🍕',
    },
    {
      name: 'Hambúrgueres',
      icon: '🍔',
    },
    {
      name: 'Bebidas',
      icon: '🍻',
    },
  ]);
}
