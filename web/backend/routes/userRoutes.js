import express from 'express';
import { createMyOrder, deleteMyOrder, editMyOrder, getMyOrder } from '../controllers/parcelController';

const router = express.Router();

router.get('/api/products', getMyOrder);
router.post('/api/create', createMyOrder);
router.delete('/api/product/:id', deleteMyOrder);
router.put('/api/product/:id', editMyOrder);

export default router;