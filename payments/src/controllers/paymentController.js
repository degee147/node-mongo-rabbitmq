import mongoose from 'mongoose';
import { PaymentSchema } from '../models/paymentModel';
const amqp = require('amqplib');



let channel;

async function connect() {
    const amqpServer = process.env.RABBITMQ_URL;
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('PAYMENTS');
}

connect().then(() => {
    console.log('Connected to RabbitMQ');
    channel.consume('PAYMENTS', data => {
        console.log('Consuming PAYMENTS service');
        // const { products, userEmail } = JSON.parse(data.content);
        
    });
});

const Payment = mongoose.model('Payment', PaymentSchema);

export const addNewPayment = (req, res) => {
    let newPayment = new Payment(req.body);

    newPayment.save((err, payment) => {
        if (err) {
            res.send(err);
        }

        channel.sendToQueue(
            'TRANSACTIONS',
            JSON.stringify(payment)
        );
        // await channel.consume('PAYMENT', data => {
        //     order = JSON.parse(data.content);
        // });

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
    Payment.findOneAndUpdate({ _id: req.params.paymentId }, req.body, { new: true }, (err, payment) => {
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
        res.json({ message: 'Successfully deleted payment' });
    })
}
