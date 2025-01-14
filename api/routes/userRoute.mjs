import express from 'express';
import { check } from '../controllers/userController.mjs';


const router=express.Router();


router.get('/',check)

export default router;