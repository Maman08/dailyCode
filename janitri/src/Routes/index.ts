import express  from "express";
import { getAllUsers,addUser } from "../Controller/userController";
import { addPatient,getPatients,deletePatient } from "../Controller/patientController";
const router=express.Router();

router.get('/users',getAllUsers);
router.post('/adduser',addUser);
router.delete('/deleteuser',addUser);
router.get('/patient',getPatients);
router.post('/addpatient',addPatient);
router.delete('/deletepatient/:id',deletePatient);
export default router;