const jwt =require("jsonwebtoken");

const generateToken = (id) => {
    const privateKey = 'khan123';
  return jwt.sign({ id },privateKey, {
    expiresIn: "30d",
  });

}

module.exports=  generateToken;
