const express = require ('express');
const {connect} = require ('./utils/mongoDbUtils');
const passport = require ('passport');
require('./authentication')
const session = require('express-session')
const path = require('path')

const dotenv = require('dotenv');
dotenv.config();

const homeRoutes = require ('./routes/home.routes');
const setsRoutes = require ('./routes/sets.routes');
const usersRoutes = require ('./routes/users.routes');
const loginRoutes = require ('./routes/login.routes')
const productsRoutes = require ('./routes/products.routes')

const MongoStore = require('connect-mongo')

const {isAuth, isAdmin} = require('./middlewares/auth.middleware')

const cors = require("cors");


const PORT = 3000;
const app = express();

connect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({mongoUrl:process.env.MONGODBURL})
}));

app.use(passport.initialize()); 
app.use(passport.session());


//Json en el body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Expone la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/login', loginRoutes)
app.use('/users', usersRoutes);
app.use("/", homeRoutes);
app.use(isAuth)
app.use('/legos', productsRoutes)
app.use('/sets', setsRoutes);


app.use("*", (req, res) => {
    const error = new Error("Error, ruta desconocida")
    error.status = 404;
    return res.status(404).json(error)
});

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Unexpected error")
});

app.disable('x-powered-by');

app.listen(PORT, () => {
    console.log (`Listenen in port: ${PORT}`);
    }
);

