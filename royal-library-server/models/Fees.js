import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({
    seatNo : {
        type : String,
        required : true
    },
    studentName: {
        type: String,
        required: true
    },
    batchTiming: {
        type: String,
        required: true
    },
    month : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    amount : {
        type : Number,
        required :true
    },
    dop : {
        type : Date,
        required : true
    }
},{
    timestamps : true
})
const Fees = mongoose.model("Fees",feesSchema)
export default Fees