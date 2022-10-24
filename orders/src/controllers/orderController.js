import mongoose from 'mongoose';
import { OrderSchema } from '../models/crmModel';

const Order = mongoose.model('Order', OrderSchema);

export const addNewOrder = (req, res) => {
    let newOrder = new Order(req.body);

    newOrder.save((err, order) => {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
};

export const getOrders = (req, res) => {
    Order.find({}, (err, order) => {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
};

export const getOrderWithID = (req, res) => {
    Order.findById(req.params.orderId, (err, order) => {
        if (err) {
            res.send(err);
        }
        res.json(order);
    });
}

export const updateOrder = (req, res) => {
    Order.findOneAndUpdate({ _id: req.params.orderId}, req.body, { new: true }, (err, order) => {
        if (err) {
            res.send(err);
        }
        res.json(order);
    })
}

export const deleteOrder = (req, res) => {
    Order.remove({ _id: req.params.orderId }, (err, order) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted order'});
    })
}