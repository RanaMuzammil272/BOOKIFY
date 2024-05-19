const mongoose = require('mongoose');

const accountscheme=new mongoose.mongoose.Schema({
    Cardno:{
        type:Number,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Pin:{
        type:Number,
        required:true

    },
    Expiry:{
        type:Number,
        required:true
    }

})


const Accounts=mongoose.model('Accounts', accountscheme);

module.exports=Accounts;