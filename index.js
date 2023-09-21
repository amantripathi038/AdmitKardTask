require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send("<h1><center>Server is working properly</center></h1>");
})

const textRouter = require('./routers/textRouter');
app.use('/api/v1', textRouter);



app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})