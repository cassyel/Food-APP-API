import { Router } from 'express';

import { createCategoryController } from './app/controller/categories/createCategory';
import { listCategoriesController } from './app/controller/categories/listCategories';
import { createProductController } from './app/controller/products/createProduct';
import { listProductsController } from './app/controller/products/listProducts';
import { listProductsByCategoryController } from './app/controller/products/listProductsByCategory';
import { listOrdersController } from './app/controller/orders/listOrders';
import { createOrderController } from './app/controller/orders/createOrder';
import { changeOrderStatusController } from './app/controller/orders/changeOrderStatus';
import { deleteOrderController } from './app/controller/orders/deleteOrder';
import { deleteProductController } from './app/controller/products/deleteProduct';
import { loginController } from './app/controller/user/login';
import { authMiddleware } from './authMiddleware';
import { upload } from './AWS-S3';

export const router = Router();

// List Categories
router.get('/categories', listCategoriesController);

// Create Category
router.post('/categories', authMiddleware, createCategoryController);

// List Products
router.get('/products', listProductsController);

// Create Product
router.post('/products', authMiddleware, upload.single('image'), createProductController);

// Get Products By Category
router.get('/categories/:categoryId/products', listProductsByCategoryController);

// Delete Product
router.delete('/products/:productId', authMiddleware, deleteProductController);

// List Orders
router.get('/orders', listOrdersController);

// Create Order
router.post('/orders', authMiddleware, createOrderController);

// Change Order Status
router.patch('/orders/:orderId', authMiddleware, changeOrderStatusController);

// Delete / Cancel Order
router.delete('/orders/:orderId', authMiddleware, deleteOrderController);

// Login
router.post('/login', loginController);
