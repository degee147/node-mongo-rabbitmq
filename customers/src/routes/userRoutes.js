import { 
    addNewUser, 
    getUsers, 
    getUserWithID, 
    updateUser,
    deleteUser 
} from '../controllers/userController';

const routes = (app) => {
    app.route('/user')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getUsers)
    
    // POST endpoint
    .post(addNewUser);

    app.route('/user/:userId')
    // get specific user
    .get(getUserWithID)
    
    // put request
    .put(updateUser)

    // delete request
    .delete(deleteUser);
}

export default routes;
