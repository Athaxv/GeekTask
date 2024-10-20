const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://laatharv:6kYBupURk02EIlkr@loginapp.pitga.mongodb.net/?retryWrites=true&w=majority&appName=loginapp')
.then(() => {
    console.log('Mongoose connected')
})
.catch((err) => {
    console.log("Mongoose connection error: ", err);
})