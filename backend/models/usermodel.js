const mongoose =require("mongoose");
const bycrypt =require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    newMessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: 'online'
    }
    
  },
  {
    timestamps: true,
    minimize:false,
  }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt =await bycrypt.genSalt(10);
    this.password=await bycrypt.hash(this.password,salt);
});


userSchema.methods.matchpassword =async function(enteredpassword){
    return await bycrypt.compare(enteredpassword,this.password);
}
const User = mongoose.model('User', userSchema);

module.exports= User;
