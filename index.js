const express = require ('express');
const homeRoutes = require ('./routes/home.routes');
const {connect} = require ('./utils/mongoDbUtils');
//const mongoDb = require ("./utils/mongoDbUtils")
const PORT = 3000;
const app = express();

connect();
//mongoDb.connect();

app.use("/", homeRoutes);


app.listen(PORT, () => {
    console.log (`Listenen in port: ${PORT}`);
    }
)

