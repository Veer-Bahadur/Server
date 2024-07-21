import express from 'express'
import { addStudent, getAllStudents, getEnrollmentNo, getSeatInfo } from '../controller/HomeController.js'
const router = express.Router()

router.post("/addStudent",addStudent)
router.get("/getEnrollmentNo",getEnrollmentNo)
router.get("/getAllStudents",getAllStudents)
router.get("/getSeatInfo",getSeatInfo)

export default router