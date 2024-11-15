const express = require('express');
const router=express.Router();
const {addDoctor,getAllDoctors,getDoctorOfSpecialization,deleteDoctor,addPatient,getAllPatients,scheduleAppointment,getAppointmentsByDoctor,getAppointmentsByPatient,completeAppointment}=require('../controller/index');

router.post('/addDoctor',addDoctor);
router.get('/getDoctors',getAllDoctors);
router.get('/getDoctorOfSpecialization/:specialization',getDoctorOfSpecialization);
router.delete('/deleteDoctor',deleteDoctor);


router.post('/addPatient',addPatient);  
router.get('/getallPatients',getAllPatients);

router.get('/getAppointmentsByDoctor/:id',getAppointmentsByDoctor);
router.get('/getAppointmentsByPatient/:id',getAppointmentsByPatient);
router.put('/completeAppointement/:id',completeAppointment)
router.post('/scheduleAppointment',scheduleAppointment);


module.exports=router;