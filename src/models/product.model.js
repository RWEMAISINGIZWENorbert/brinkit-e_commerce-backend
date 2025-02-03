import mongoose from "mongoose";

const  productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: Array,
        default: []
    },
    category_id: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    subCategory_id: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subCategory'
        }
    ],
    unit: {
        type: String,
        default: ''
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
       type: Number,
       default: null
    },
    discount: {
       type: Number,
       default: null
    },
    description: {
        type: String,
        default: ''
    },
    more_details: {
         type: Object,
         default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
},{ 
    timestamps: true
});

const productModel = mongoose.model('product', productSchema);
export default productModel;