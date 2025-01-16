import express from 'express';
import { check, deleteUser, updateUser } from '../controllers/userController.mjs';
import { verifyToken } from '../utils/verifyUser.mjs';

const router=express.Router();

router.get('/',check)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
export default router;