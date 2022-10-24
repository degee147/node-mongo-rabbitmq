import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/transactionRoutes';
import amqp from 'amqplib';
import { TransactionSchema } from './src/models/transactionModel';

const Transaction = mongoose.model('Transaction', TransactionSchema);

let channel;

async function connect() {
    const amqpServer = process.env.RABBITMQ_URL;
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('TRANSACTIONS');

}

connect().then(() => {
    console.log('Connected to RabbitMQ');
    channel.consume('TRANSACTIONS', data => {
        console.log('Consuming TRANSACTIONS service');

        let newTransaction = new Transaction(JSON.parse(data.content));

        newTransaction.save((err, transaction) => {
            if (err) {
                console.log(err);
            }
            console.log('transaction saved');
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