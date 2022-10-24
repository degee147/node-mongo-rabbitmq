import { 
    addNewOrder, 
    getOrders, 
    getOrderWithID, 
    updateOrder,
    deleteOrder 
} from '../controllers/crmController';

const routes = (app) => {
    app.route('/order')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getOrders)
    
    // POST endpoint
    .post(addNewOrder);

    app.route('/order/:orderId')
    // get specific order
    .get(getOrderWithID)
    
    // put request
    .put(updateOrder)

    // delete request
    .delete(deleteOrder);
}

export default routes;
