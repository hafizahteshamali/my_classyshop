import express from 'express';
import {
  CreateProductController,
  DeleteProductByIdController,
  GetAllProductsController,
  GetProductByIdController,
  UpdateProductByIdController
} from '../Controllers/ProductControllers.js';

import uploadProduct from '../utils/uploadProductImages.js';

const ProductRoutes = express.Router();

ProductRoutes.post('/', uploadProduct.fields([
    {name: 'images', maxCount: 10},
    {name: 'featureImages', maxCount: 2}
]), CreateProductController)

ProductRoutes.get('/', GetAllProductsController);

ProductRoutes.get('/:id', GetProductByIdController);

ProductRoutes.delete('/:id', DeleteProductByIdController);

ProductRoutes.put('/:id', uploadProduct.fields([
    { name: 'images', maxCount: 10 },
    { name: 'featureImages', maxCount: 2 }
  ]),
  UpdateProductByIdController
);

export default ProductRoutes;
