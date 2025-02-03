import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
    name: string;
    image: string;
}

const categorySchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const categoryModel = mongoose.model<ICategory>('category', categorySchema);

export default categoryModel;