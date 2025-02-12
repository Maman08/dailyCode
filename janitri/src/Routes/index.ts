import express from "express";
import { getAllUsers, addUser } from "../Controller/userController";
import { addPatient, getPatients, deletePatient } from "../Controller/patientController";
import { addHeartRateRecord, getHeartRateRecords, deleteHeartRateRecord } from "../Controller/heartRateController";

const router = express.Router();
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
  });
  
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /adduser:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/adduser', addUser);

/**
 * @swagger
 * /deleteuser:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/deleteuser', addUser);

/**
 * @swagger
 * /patient:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get('/patient', getPatients);

/**
 * @swagger
 * /addpatient:
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Patient added
 */
router.post('/addpatient', addPatient);

/**
 * @swagger
 * /deletepatient/{id}:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted
 */
router.delete('/deletepatient/:id', deletePatient);

/**
 * @swagger
 * /record:
 *   get:
 *     summary: Get all heart rate records
 *     tags: [HeartRate]
 *     responses:
 *       200:
 *         description: List of heart rate records
 */
router.get('/record', getHeartRateRecords);

/**
 * @swagger
 * /addrecord:
 *   post:
 *     summary: Add a new heart rate record
 *     tags: [HeartRate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               heartRate:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Heart rate record added
 */
router.post('/addrecord', addHeartRateRecord);

/**
 * @swagger
 * /deleterecord/{id}:
 *   delete:
 *     summary: Delete a heart rate record
 *     tags: [HeartRate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Heart rate record deleted
 */
router.delete('/deleterecord/:id', deleteHeartRateRecord);

export default router;
