const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
    try {
        console.log("Opening connection")
         const conn = await mongoose.connect(process.env.MONGO_URI + '/' + process.env.DB_NAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err) { 
        mongoose.disconnect();
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB