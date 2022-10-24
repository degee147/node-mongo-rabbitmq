import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    productId: {
        type: String,
        required: 'Enter productId'
    },
    name: {
        type: String,
        required: 'Enter name'
    },
    price: {
        type: Number
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});
