import mongoose from "mongoose";

const addressScheema = mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Users"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Address || mongoose.model("Address", addressScheema)