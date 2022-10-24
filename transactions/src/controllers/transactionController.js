import mongoose from 'mongoose';
import { TransactionSchema } from '../models/transactionModel';

const Transaction = mongoose.model('Transaction', TransactionSchema);


export const addNewTransaction = (req, res) => {
    let newTransaction = new Transaction(req.body);

    newTransaction.save((err, transaction) => {
        if (err) {
            res.send(err);
        }

        channel.sendToQueue(
            'TRANSACTIONS',
            JSON.stringify(transaction)
        );
        // await channel.consume('PAYMENT', data => {
        //     order = JSON.parse(data.content);
        // });

        res.json(transaction);
    });
};

export const getTransactions = (req, res) => {
    Transaction.find({}, (err, transaction) => {
        if (err) {
            res.send(err);
        }
        res.json(transaction);
    });
};

export const getTransactionWithID = (req, res) => {
    Transaction.findById(req.params.transactionId, (err, transaction) => {
        if (err) {
            res.send(err);
        }
        res.json(transaction);
    });
}

export const updateTransaction = (req, res) => {
    Transaction.findOneAndUpdate({ _id: req.params.transactionId }, req.body, { new: true }, (err, transaction) => {
        if (err) {
            res.send(err);
        }
        res.json(transaction);
    })
}

export const deleteTransaction = (req, res) => {
    Transaction.remove({ _id: req.params.transactionId }, (err, transaction) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted transaction' });
    })
}
