const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');

const mongoDb = process.env.MONGODBURL;
//const mongoDb = "mongodb+srv://root:rootpass@cluster0.2kjlk.mongodb.net/lego-api?retryWrites=true&w=majority"
console.log(mongoDb);
const connect = async () => {
    try{
        console.log("aui")
        const db = await mongoose.connect(mongoDb, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify:false
        });
        console.log('despues')
        const {name, host} = db.connection;
        console.log(`Connected with db: ${name}, in host: ${host}`)
    }catch{
        console.log('Error to connect with BD');
    }

}

module.exports = {
    connect
}