import express from "express";
import { getAllUsers, addUser,updateUser,permanentDelteUser,deleteUser } from "../Controller/userController";
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/adduser', addUser);

/**
 * @swagger
 * /deleteuser/{id}:
 *   delete:
 *     summary: Soft delete a user (mark as deleted)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User marked as deleted
 */
router.delete('/deleteuser/:id', deleteUser);

/**
 * @swagger
 * /updateuser/{id}:
 *   patch:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Failed to update user
 */
router.patch('/updateuser/:id', updateUser);

/**
 * @swagger
 * /permanentdeleteuser/{id}:
 *   delete:
 *     summary: Permanently delete a user from the database
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User permanently deleted
 *       500:
 *         description: Failed to permanently delete user
 */
router.delete('/permanentdeleteuser/:id', permanentDelteUser);
/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique ID of the patient
 *                   user_id:
 *                     type: string
 *                     description: ID of the associated user
 *                   name:
 *                     type: string
 *                     description: Name of the patient
 *                   age:
 *                     type: integer
 *                     description: Age of the patient
 *                   gender:
 *                     type: string
 *                     description: Gender of the patient
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp of patient creation
 *       500:
 *         description: Internal server error
 */
router.get('/patients', getPatients);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *               - age
 *               - gender
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID of the patient
 *               name:
 *                 type: string
 *                 description: Name of the patient
 *               age:
 *                 type: integer
 *                 description: Age of the patient
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: Gender of the patient
 *     responses:
 *       201:
 *         description: Patient added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique ID of the new patient
 *                 user_id:
 *                   type: string
 *                   description: Associated user ID
 *                 name:
 *                   type: string
 *                   description: Name of the patient
 *                 age:
 *                   type: integer
 *                   description: Age of the patient
 *                 gender:
 *                   type: string
 *                   description: Gender of the patient
 *       400:
 *         description: Bad request - Missing or invalid fields
 *       500:
 *         description: Internal server error
 */
router.post('/patients', addPatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Soft delete a patient (mark as deleted)
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient to be deleted
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Patient Deleted successfully"
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.delete('/patients/:id', deletePatient);


/**
 * @swagger
 * /record/{patientId}:
 *   get:
 *     summary: Get patient details along with heart rate records
 *     tags: [HeartRate]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Patient details and heart rate records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patient_id:
 *                   type: string
 *                   description: ID of the patient
 *                 name:
 *                   type: string
 *                   description: Name of the patient
 *                 age:
 *                   type: integer
 *                   description: Age of the patient
 *                 gender:
 *                   type: string
 *                   description: Gender of the patient
 *                 heart_rate_records:
 *                   type: array
 *                   description: List of heart rate records
 *                   items:
 *                     type: object
 *                     properties:
 *                       recordId:
 *                         type: string
 *                         description: ID of the heart rate record
 *                       heartRate:
 *                         type: integer
 *                         description: Measured heart rate
 *                       recordedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the heart rate was recorded
 *       400:
 *         description: patientId is required
 *       404:
 *         description: Patient not found or no records available
 *       500:
 *         description: Internal server error
 */

router.get('/record/:patientId', getHeartRateRecords);

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
 *         description: Heart rate record added successfully
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
 *         description: The ID of the heart rate record to delete
 *     responses:
 *       200:
 *         description: Heart rate record deleted successfully
 */
router.delete('/deleterecord/:id', deleteHeartRateRecord);

export default router;  