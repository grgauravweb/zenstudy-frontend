import mongoose from "mongoose";
const connection={};

async function dbconnect(){
    if(connection.isconnected){
        return;
    }
    try{
        const db=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connection.isconnected=db.connections[0].readyState;
        console.log('Connected to MongoDB');
    } catch(error){
        console.log('Error connecting to MongoDB:', error.message);
    }
}

export default dbconnect;