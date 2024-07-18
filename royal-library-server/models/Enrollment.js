import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema({
    enrollmentNo: {
        type: String,
        required: true,
        unique : true
    },
    seatNo : {
        type : String,
        required : true
    },
    dateOfEnrollment: {
        type: Date,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    motherName: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    monthlyFee: {
        type: Number,
        required: true
    },
    batchTiming: {
        type: String,
        required: true
    }
},{
    timestamps : true
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
export default Enrollment