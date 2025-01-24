import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'provide name']
    },
    email: {
        type: String,
        required: [true, 'provide the email'],
        unique: true
    }, 
    password: {
            type: String,
            required: [true, 'Provide the password'] 
    },
     avatar: { 
        type: String,
        default: ''
     } ,
     mobile: {
        type: Number,
        default: null
     },
     refresh_token: {
        type: String,
        default: ''
     },
     verify_email: {
        type: Boolean,
        default: false
     },
     last_login_date: {
        type: Date,
        default: ''
     },
     status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
     },
     address_details : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'address'
        }
     ],
     shopping_cart : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'cartProduct'
        }
     ],
     oder_history : [
       {
         type: mongoose.Schema.ObjectId,
         ref: 'order'
       }
     ],
     forgot_password_otp:  {
            type: String,
            default: null
     },
    forgot_password_expiry: {
        type: Date,

    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'] ,  
        default: 'USER'
    }         
}, {
    timestamps: true
});

const userModal = mongoose.model('user', userSchema);
export default userModal;