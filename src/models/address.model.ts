import mongoose, { Document, Schema } from 'mongoose';

interface IAddress extends Document {
    street: string;
    city: string;
    state: string;
    country: string;
    mobile: number | null;
    status: boolean;
}

const addressSchema: Schema = new mongoose.Schema({
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
    country: {
        type: String,
        required: true
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

const addressModel = mongoose.model<IAddress>('address', addressSchema);

export default addressModel;