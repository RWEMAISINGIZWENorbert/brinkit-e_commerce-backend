import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    verify_email: boolean;
    last_login_date: Date | string;
    status: 'active' | 'inactive' | 'suspended';
    address_details: mongoose.Schema.Types.ObjectId[];
    refresh_token: string;
}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
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
    address_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address'
        }
    ],
    refresh_token: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const userModel = mongoose.model<IUser>('user', userSchema);

export default userModel;