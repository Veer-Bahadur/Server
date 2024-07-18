import Enrollment from "../models/Enrollment.js";
export const addStudent = async (req, res) => {
    try {
        const {
            enrollmentNo,
            seatNo,
            dateOfEnrollment,
            studentName,
            dateOfBirth,
            motherName,
            fatherName,
            address,
            qualification,
            mobileNo,
            emailId,
            monthlyFee,
            batchTiming
        } = req.body;

        let student = await Enrollment.findOne({ enrollmentNo })
        if (student) {
            return res.status(400).json({
                message: "Student with this enrollment already exists"
            })
        }
        student = await Enrollment.findOne({ seatNo })
        if(batchTiming==="Full Day"){
            return res.status(400).json({
                message : "Seat is already allocated to " + student.studentName
            })
        }else{
            if(student.batchTiming===batchTiming){
                return res.status(400).json({
                    message : "Seat is already allocated in this shift to " + student.studentName
                })
            }
        }

        Enrollment.create({
            enrollmentNo,
            seatNo,
            dateOfEnrollment,
            studentName,
            dateOfBirth,
            motherName,
            fatherName,
            address,
            qualification,
            mobileNo,
            emailId,
            monthlyFee,
            batchTiming
        }).then(data => {
            return res.status(200).json({
                message: "New Student Enrolled Successfully",
                data
            })
        }).catch(err => {
            console.log("ERROR CREATING STUDENT ", err);
            return res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
}
export const getEnrollmentNo = async (req, res) => {
    try {
        let no = "RL2024/"
        let student = await Enrollment.find({}).sort({ createdAt: -1 }).limit(1)
        let en = student[0].enrollmentNo.substring(7,)
        let temp = 0
        for (let i = 0; i < en.length; i++) {
            if (en[i] === '0') {
                console.log("**", en[i]);
                continue;
            } else {
                temp = en.substring(i,)
                break;
            }
        }
        temp = parseInt(temp) + 1
        if (temp < 10) {
            no = no + '000' + temp.toString()
        } else {
            if (temp < 100) {
                no = no + '00' + temp.toString()
            }
            else {
                if (temp < 1000) {
                    no = no + '0' + temp.toString()
                } else {
                    no = no + temp.toString()
                }
            }
        }
        console.log(en, temp)
        return res.status(200).json({
            enrollmentNo: no
        })
    } catch (error) {
        console.log("ERROR CREATING ENROLLMENT NO", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export const getAllStudents = async (req,res)=>{
    try {
        console.log("/getAllStudents");
        const list  = await Enrollment.find({}).sort({createdAt : -1})
        return res.status(200).json({
            message : "All Student List",
            data : list
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}