const express = require ('express');
const {connect} = require ('./utils/mongoDbUtils');
const passport = require ('passport');
require('./authentication')
const homeRoutes = require ('./routes/home.routes');
const setsRoutes = require ('./routes/sets.routes');
const usersRoutes = require ('./routes/users.routes');
const loginRoutes = require ('./routes/login.routes')
//const mongoDb = require ("./utils/mongoDbUtils")
const PORT = 3000;
const app = express();

connect();

app.use(passport.initialize()); 


//Json en el body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Rutas
app.use("/", homeRoutes);
app.use('/sets', setsRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes)


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

