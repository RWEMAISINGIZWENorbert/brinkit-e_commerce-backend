import mongoose from "mongoose";

const orderSchema = new mongoose.schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    orderId: {
        type: String,
        required: [true, 'Provide th eorder id'],
        unique: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'product'
    },
    product_details: {
        _id: String,
        name: String,
        image: Array 
    },
    paymentId: {
        type: String,
        default: ''
    },
    payment_status: {
        type: String,
        default: ''
    },
    derivery_address: {
          type: mongoose.Schema.ObjectId,
          ref: 'order'
    },
    subTotalAmount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ''
    }
}, {
    timeStamps: true
});

const orderModel = mongoose.model('order', orderSchema);
export default orderModel;