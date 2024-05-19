const mongoose =require("mongoose");

const connectDB =async ()=>{
    try {
        const conn=await mongoose.connect("mongodb+srv://RanaMuzammil:rana272003@firstinteraction.hbq4ymt.mongodb.net/Bookify?retryWrites=true&w=majority&appName=FirstInteraction");
        console.log(`mongo connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`${error.message}`);
        process.exit();
    }
};

module.exports=connectDB;