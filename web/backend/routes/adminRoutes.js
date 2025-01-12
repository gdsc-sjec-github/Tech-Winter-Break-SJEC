import express from 'express';
import { getAllOrders, updateAnOrder } from '../controllers/adminController.js';

const router = express.Router();

router.get('/api/admin/products', getAllOrders);
router.put('/api/admin/products/:id', updateAnOrder);
  
export default router;