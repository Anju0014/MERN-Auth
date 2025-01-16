import express from 'express';
import { addUser, admindelete, adminLogout, adminsearch, adminSignin, getuserDetails, getUsers, updateUserDetails } from '../controllers/adminController.mjs';
import { isAdmin } from '../utils/verifyAdmin.mjs';

const router=express.Router()
router.post("/signin", adminSignin);
router.get('/getUsers',isAdmin, getUsers)
router.get("/search", isAdmin,adminsearch);
router.delete("/delete",isAdmin,admindelete);
router.post("/addUser",isAdmin,addUser);
router.get("/getUserDetails/:id",isAdmin,getuserDetails)
router.put("/updateUserDetails/:id",isAdmin,updateUserDetails)
router.post('/logout',isAdmin,adminLogout)


export default router 