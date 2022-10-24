import { 
    addNewProduct, 
    getProducts, 
    getProductWithID, 
    updateProduct,
    deleteProduct 
} from '../controllers/productController';

const routes = (app) => {
    app.route('/product')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getProducts)
    
    // POST endpoint
    .post(addNewProduct);

    app.route('/product/:productId')
    // get specific product
    .get(getProductWithID)
    
    // put request
    .put(updateProduct)

    // delete request
    .delete(deleteProduct);
}

export default routes;
