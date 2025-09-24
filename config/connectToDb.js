const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGODB_URI

console.log(mongoUri);


const connectToDb = async () => {
    console.log("connecting..")
    try{
        const connected = await mongoose.connect(mongoUri)
        if(connected){
            console.log(" ✅ mongodb connected");

            
        }
    }
        catch(error){
            console.error("❌ MongoDB connection failed:", err.message);
            
        }
    }

    module.exports = connectToDb

    