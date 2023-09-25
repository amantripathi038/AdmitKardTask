require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));


app.get('/', (req, res) => {
    res.send("<h1><center>Server is working properly</center></h1>");
})

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

const textRouter = require('./routers/textRouter');
app.use('/api/v1', textRouter);



app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})