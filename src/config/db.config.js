//Set up mongoose connection
var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectDB() {
    try {
        console.log("Opening connection")
        var mongoDB = 'mongodb+srv://cdp:BHdUDx2iU9gWcBOC@clusterscrumban.rsjdb.mongodb.net/scrumban_db?retryWrites=true&w=majority';
        mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        console.log("connection successfull");
    } catch(err) { 
        mongoose.disconnect();
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB