import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    customerId: {
        type: String,
        required: 'Enter a customerId'
    },
    productId: {
        type: String,
        required: 'Enter a productId'
    },
    amount: {
        type: Number,
        required: 'Enter a valid amount'
    },
    status: {
        type: String
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});
