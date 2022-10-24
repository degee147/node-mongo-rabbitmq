import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/paymentRoutes';
import amqp from 'amqplib';



let channel;

async function connect() {
    const amqpServer = process.env.RABBITMQ_URL;
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('TRANSACTIONS');


}

connect().then(() => {
    channel.consume('TRANSACTIONS', data => {
        console.log('Consuming TRANSACTIONS service');
        const { products, userEmail } = JSON.parse(data.content);
        createOrder(products, userEmail)
            .then(newOrder => {
                channel.ack(data);
                channel.sendToQueue(
                    'PAYMENTS',
                    Buffer.from(JSON.stringify({ newOrder }))
                );
            })
            .catch(err => {
                console.log(err);
            });
    });
});
const app = express();
const PORT = 4004;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27018/transactions');

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);


app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);