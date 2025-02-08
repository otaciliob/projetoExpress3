require("dotenv").config();
const mustacheExpress = require("mustache-express");
const logger = require('morgan');
const express = require('express');
const {sequelize} = require('./models/DB');
const engine = mustacheExpress();
const app = express();
const PORT = process.env.PORT;

const UserRouter = require("./routers/UsersRouters");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.engine("mustache",engine);

app.use("/", UserRouter);
sequelize.sync();

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`)
})
