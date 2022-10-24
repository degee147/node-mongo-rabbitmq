import { 
    addNewPayment, 
    getPayments, 
    getPaymentWithID, 
    updatePayment,
    deletePayment 
} from '../controllers/paymentController';

const routes = (app) => {
    app.route('/payment')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getPayments)
    
    // POST endpoint
    .post(addNewPayment);

    app.route('/payment/:paymentId')
    // get specific payment
    .get(getPaymentWithID)
    
    // put request
    .put(updatePayment)

    // delete request
    .delete(deletePayment);
}

export default routes;
