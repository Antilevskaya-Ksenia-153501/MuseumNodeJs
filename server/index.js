import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js';
import exhibitsRoute from './routes/exhibits.js';
import hallsRoute from './routes/halls.js';
import fileUpload from 'express-fileupload';

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRoute);
app.use('/api/exhibits', exhibitsRoute);
app.use('/api/halls', hallsRoute);

async function start() {
    try {
        await mongoose
        .connect('mongodb+srv://antikevkun:admin@museum.wwszfqr.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('MongoDB connected.'))
        .catch((err) => console.log('MongoDB error of connecting!!!', err));

        app.listen(3002, () => console.log('Server started on port: 3002'))
    } catch (error) {
        console.log(error)
    }
}

start();