const mongoose = require('mongoose');

const orderscheme=new mongoose.mongoose.Schema({
    bookTitle:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true

    },
    enteredPrice:{
        type:Number,
        required:true
    },
},{timestamps:true})
const Order=mongoose.model('Order', orderscheme);

module.exports=Order;