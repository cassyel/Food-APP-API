import { Router } from 'express';
import { createCategoryController } from './app/controller/categories/createCategory';
import { listCategoriesController } from './app/controller/categories/listCategory';

export const router = Router();

// List Categories
router.get('/categories', listCategoriesController);

// Create Category
router.post('/categories', createCategoryController);

// List Products
router.get('/products', (req, res) => {
  res.send('OK');
});

// Create Product
router.post('/products', (req, res) => {
  res.send('OK');
});

// Get Products By Category
router.get('/categories/:categoryId/products', (req, res) => {
  res.send('OK');
});

// List Orders
router.get('/orders', (req, res) => {
  res.send('OK');
});

// Create Order
router.post('/orders', (req, res) => {
  res.send('OK');
});

// Change Order Status
router.patch('/orders/:orderId', (req, res) => {
  res.send('OK');
});

// Delete / Cancel Order
router.delete('/orders/:orderId', (req, res) => {
  res.send('OK');
});
