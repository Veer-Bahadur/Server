import express from 'express'
import { addStudent, getAllStudents, getEnrollmentNo } from '../controller/HomeController.js'
const router = express.Router()

router.post("/addStudent",addStudent)
router.get("/getEnrollmentNo",getEnrollmentNo)
router.get("/getAllStudents",getAllStudents)

export default router