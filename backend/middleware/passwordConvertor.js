
const bcrypt = require('bcryptjs');

const encryptPassword=async(password)=>{
    let hashpassword=await bcrypt.hash(password,10)
    return hashpassword
}

module.exports={encryptPassword}