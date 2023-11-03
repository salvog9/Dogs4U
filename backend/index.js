const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;

//CUSTOM MODULES
const breedsRouter = require('./routes/breedsRoutes');
const userRouter = require('./routes/userRoute');
const authJwt = require("./helpers/auth");



//MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(authJwt());


//ROUTES
app.use('/breeds', breedsRouter);
app.use('/user', userRouter);


app.get('/', (req,res) => {
    res.send('Welcome!')
})





//Port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
