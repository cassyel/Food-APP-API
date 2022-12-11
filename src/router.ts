import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from './app/controller/categories/createCategory';
import { listCategoriesController } from './app/controller/categories/listCategory';
import { createProductController } from './app/controller/products/createProduct';
import { listProductsController } from './app/controller/products/listProducts';
import { listProductsByCategoryController } from './app/controller/products/listProductsByCategory';
import { listOrdersController } from './app/controller/orders/listOrders';
import { createOrderController } from './app/controller/orders/createOrder';
import { changeOrderStatusController } from './app/controller/orders/changeOrderStatus';
import { deleteOrderController } from './app/controller/orders/deleteOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List Categories
router.get('/categories', listCategoriesController);

// Create Category
router.post('/categories', createCategoryController);

// List Products
router.get('/products', listProductsController);

// Create Product
router.post('/products',upload.single('image'), createProductController);

// Get Products By Category
router.get('/categories/:categoryId/products', listProductsByCategoryController);

// List Orders
router.get('/orders', listOrdersController);

// Create Order
router.post('/orders', createOrderController);

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatusController);

// Delete / Cancel Order
router.delete('/orders/:orderId', deleteOrderController);
