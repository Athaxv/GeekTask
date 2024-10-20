const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/loginapp')
.then(() => {
    console.log('Mongoose connected')
})
.catch((err) => {
    console.log("Mongoose connection error: ", err);
})