import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        
       
       
    } catch (error) {
        
        process.exit(1)
    }
}

export  {connectDB}





