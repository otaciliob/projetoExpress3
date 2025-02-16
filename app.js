require("dotenv").config();
const mustacheExpress = require("mustache-express");
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {sequelize} = require('./models/DB');
const engine = mustacheExpress();
const app = express();
const PORT = process.env.PORT;

const UserRouter = require("./routers/UsersRouters");
const AdminRouter = require("./routers/AdminRouter");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({
    secret: 'test', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 }
  }));

app.engine("mustache",engine);

app.set("views","./views");
app.set("view engine", "mustache");

app.use("/", UserRouter);
app.use("/admin", AdminRouter);
sequelize.sync();

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`)
})
