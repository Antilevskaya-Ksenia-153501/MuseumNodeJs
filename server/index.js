import express from 'express';
import mongoose from 'mongoose';

mongoose
.connect('mongodb+srv://antikevkun:admin@museum.wwszfqr.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connected.'))
.catch((err) => console.log('MongoDB error of connecting!!!', err));

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server is OK!');
});