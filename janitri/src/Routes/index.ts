import express  from "express";
import { getAllUsers,addUser } from "../Controller/userController";
const router=express.Router();

router.get('/users',getAllUsers);
router.post('/adduser',addUser);

export default router;