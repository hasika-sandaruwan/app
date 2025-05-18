const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
//============================
const UserRoute = require('./route/UserRoute');
const ProductRoute = require('./route/ProductRoute');
//============================

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

try{
    mongoose.connect(`${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    app.listen(SERVER_PORT,()=>{
        console.log(`Server started & running on port ${SERVER_PORT}`);
    });
}catch (e){
    console.log(e);
}
app.get('/test-api', (req,resp)=>{
    return resp.json({'message':'Hi server is running...'});
});

app.use('/api/v1/users', UserRoute);
app.use('/api/v1/products', ProductRoute);