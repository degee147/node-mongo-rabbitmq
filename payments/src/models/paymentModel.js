import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PaymentSchema = new Schema({
    customerId: {
        type: String,
        required: 'Enter customerId'
    },
    productId: {
        type: String,
        required: 'Enter productId'
    },
    orderId: {
        type: String,
        required: 'Enter orderId'
    },
    amount: {
        type: Number,
        required: 'Enter a valid amount'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
