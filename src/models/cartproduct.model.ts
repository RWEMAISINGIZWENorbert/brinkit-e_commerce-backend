import mongoose, { Document, Schema } from 'mongoose';

interface ICartProduct extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    userId: mongoose.Schema.Types.ObjectId;
}

const cartProductSchema: Schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

const cartProductModel = mongoose.model<ICartProduct>('cartProduct', cartProductSchema);

export default cartProductModel;