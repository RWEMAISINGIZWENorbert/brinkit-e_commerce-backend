import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
     adress_line: {
        type: String,
        default: ''
     },     
     city: {
        type: String,
        default: ''
     },
     state: {
        type: String,
        default: ''
     },
     pintCode: {
        type: String
     },
     country: {
        type: String
     },
     mobile: {
        type: Number,
        default: null
     },
     status: {
        type: Boolean,
        default: true
     }
}, {
    timestamps: true
});

const addressModel = mongoose.model('address', addressSchema);

export default addressModel;