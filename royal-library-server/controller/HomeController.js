import Enrollment from "../models/Enrollment.js";
import Fees from "../models/Fees.js";
export const addStudent = async (req, res) => {
    console.log("ADD STUDENT");
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
            console.log("Student with this enrollment already exists");
            return res.status(400).json({
                message: "Student with this enrollment already exists"
            })
        }
        student = await Enrollment.findOne({ seatNo })
        if (student?.batchTiming === "Full Day") {
            return res.status(400).json({
                message: "Seat is already allocated to " + student?.studentName
            })
        } else {
            if (student?.batchTiming === batchTiming) {
                return res.status(400).json({
                    message: "Seat is already allocated in this shift to " + student?.studentName
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
            console.log("New Student Enrolled Successfully");
            return res.status(200).json({
                message: `${data.studentName} is now enrolled`,
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
        let en = student[0]?.enrollmentNo?.substring(7,)
        if (en === undefined) {
            return res.status(200).json({
                enrollmentNo: no + '0001'
            })
        }
        let temp = 0
        for (let i = 0; i < en?.length; i++) {
            if (en[i] === '0') {
                continue;
            } else {
                temp = en?.substring(i,)
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
export const getAllStudents = async (req, res) => {
    try {
        console.log("/getAllStudents");
        const list = await Enrollment.find({}).sort({ createdAt: -1 })
        return res.status(200).json({
            message: "All Student List",
            data: list
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export const getSeatInfo = async (req,res)=>{
    console.log("/getSeatInfo");
    try {
        let seatInfo = await Enrollment.aggregate(
            [
                {
                  $group: {
                    _id: "$batchTiming",
                    seat : {$push : "$seatNo"}
                  }
                }
              ]
        )
        let fullday = [];
        let me = []
        seatInfo.forEach(el=>{
            if(el._id==="Full Day"){
                fullday = el.seat
            }else{
                me= [...me , ...el.seat]
            }
        })
        seatInfo.forEach(el=>{
            if(el._id!=="Full Day"){
                el.seat = [...el.seat , ...fullday]
            }else{
                el.seat = [...el.seat , ...me]
            }
        })
        return res.status(200).json({
            message : "Seat Info",
            data : seatInfo
        })
    } catch (error) {
        console.log("ERROR IN EXTRACTING SEAT INFO",error);
        return res.status(500).json({
            message : "Internal Server Error",
            error
        })
    }
}
export const submitFees = async (req,res)=>{
    console.log("/submit-fees",req.body);
    try {
        const {enrollmentNo,seatNo,batchTiming,amount,dop,month,year} = req.body
        if(!(enrollmentNo&&seatNo&&batchTiming&&amount&&dop&&month&&year)){
            return res.status(400).json({
                message : "Information MIssing. Check Once please"
            })
        }
        let fees = await Fees.findOne({month,year,enrollmentNo})
        fees = await Fees.create({enrollmentNo,seatNo,batchTiming,amount,dop,month,year})
         return res.status(200).json({
            message : "Fees submitted successfully"
         })

    } catch (error) {
        
    }
}