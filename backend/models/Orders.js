const mongoose = require('mongoose');

const orderscheme=new mongoose.mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true

    },
    Destination:{
        type:String,
        required:true


    },
    Payment:{
        type:String,
        requied:true
    },
    Date:{
        type:String,
        required:true

    }


})
const Order=mongoose.model('Order', orderscheme);

module.exports=Order;