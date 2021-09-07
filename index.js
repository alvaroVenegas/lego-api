const express = require ('express');
const homeRoutes = require ('./routes/home.routes');
const {connect} = require ('./utils/mongoDbUtils');
//const mongoDb = require ("./utils/mongoDbUtils")
const PORT = 3000;
const app = express();

connect();
//mongoDb.connect();

app.use("/", homeRoutes);


app.use("*", (req, res, next) => {
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
)

