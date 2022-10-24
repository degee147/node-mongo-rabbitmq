import mongoose from 'mongoose';
import { PaymentSchema } from '../models/paymentModel';

const Payment = mongoose.model('Payment', PaymentSchema);

export const addNewPayment = (req, res) => {
    let newPayment = new Payment(req.body);

    newPayment.save((err, payment) => {
        if (err) {
            res.send(err);
        }
        res.json(payment);
    });
};

export const getPayments = (req, res) => {
    Payment.find({}, (err, payment) => {
        if (err) {
            res.send(err);
        }
        res.json(payment);
    });
};

export const getPaymentWithID = (req, res) => {
    Payment.findById(req.params.paymentId, (err, payment) => {
        if (err) {
            res.send(err);
        }
        res.json(payment);
    });
}

export const updatePayment = (req, res) => {
    Payment.findOneAndUpdate({ _id: req.params.paymentId}, req.body, { new: true }, (err, payment) => {
        if (err) {
            res.send(err);
        }
        res.json(payment);
    })
}

export const deletePayment = (req, res) => {
    Payment.remove({ _id: req.params.paymentId }, (err, payment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted payment'});
    })
}