import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    orderId: string;
    productId: mongoose.Schema.Types.ObjectId;
    product_details: {
        _id: string;
        name: string;
        image: string[];
    };
    paymentId: string;
    amount: number;
    status: string;
}

const orderSchema: Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderId: {
        type: String,
        required: [true, 'Provide the order id'],
        unique: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    product_details: {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: [String],
            required: true
        }
    },
    paymentId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model<IOrder>('order', orderSchema);

export default orderModel;