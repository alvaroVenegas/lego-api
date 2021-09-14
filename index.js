const express = require ('express');
const {connect} = require ('./utils/mongoDbUtils');
const passport = require ('passport');
require('./authentication')
const session = require('express-session')

const dotenv = require('dotenv');
dotenv.config();

const homeRoutes = require ('./routes/home.routes');
const setsRoutes = require ('./routes/sets.routes');
const usersRoutes = require ('./routes/users.routes');
<<<<<<< HEAD
//const mongoDb = require ("./utils/mongoDbUtils")
=======
const loginRoutes = require ('./routes/login.routes')
const productsRoutes = require ('./routes/products.routes')

const MongoStore = require('connect-mongo')

const {isAuth, isAdmin} = require('./middlewares/auth.middleware')


>>>>>>> 03b986c57ccb66ba01146c9064dc4eae307aaef0
const PORT = 3000;
const app = express();

connect();
<<<<<<< HEAD
=======

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

>>>>>>> 03b986c57ccb66ba01146c9064dc4eae307aaef0

//Json en el body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Rutas
app.use('/login', loginRoutes)
app.use('/users', usersRoutes);
app.use("/", homeRoutes);
app.use(isAuth)
app.use('/legos', productsRoutes)
app.use('/sets', setsRoutes);
app.use('/users', usersRoutes);

<<<<<<< HEAD

=======
>>>>>>> 03b986c57ccb66ba01146c9064dc4eae307aaef0
app.use("*", (req, res) => {
    const error = new Error("Error, ruta desconocida")
    error.status = 404;
    return res.status(404).json(error)
});

app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Unexpected error")
});

app.listen(PORT, () => {
    console.log (`Listenen in port: ${PORT}`);
    }
);

