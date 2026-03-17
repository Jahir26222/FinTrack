import mongoose from "mongoose";


export async function ConnectDB() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
          .then(()=>{
            console.log("MongoDB connected")
          })
    } catch (error) {
        console.log("Error in connecting to DB ", error)
    }
}