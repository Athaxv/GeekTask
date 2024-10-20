const express = require('express');
const app = express();
const AuthRouter = require('./Routes/AuthRouter')

require("./models/db");
require('dotenv').config();


const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["https://geek-task-frontend.vercel.app/login"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

mongoose.connect('mongodb+srv://laatharv:6kYBupURk02EIlkr@loginapp.pitga.mongodb.net/?retryWrites=true&w=majority&appName=loginapp')

app.use('/auth', AuthRouter)

app.get('/', function (req, res) {
    res.send("Hogya")
})

app.listen(3000);