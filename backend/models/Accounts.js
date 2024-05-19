const mongoose = require('mongoose');

const accountscheme=new mongoose.mongoose.Schema({
    cardNo:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    enteredPrice:{
        type:Number,
        required:true

    },
    expiry:{
        type:String,
        required:true
    }

})


const Accounts=mongoose.model('Accounts', accountscheme);

module.exports=Accounts;