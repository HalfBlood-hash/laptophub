
const { transporter }=require("./emailConfig")
const {Verification_Email_Template}=require( '../templates/otpTemplate')
const {Welcome_Email_Template}=require("../templates/welcomeEmail")
// 
const sendEmailverification=async(email,verificationCode)=>{
    try{
        const info = await transporter.sendMail({
            from: '"laptophub 👻" <sanusatyam28@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "verification code", // Subject line
            text: "email verifaication code", // plain text body
            html:Verification_Email_Template.replace("{verificationCode}",verificationCode), 
          });
        console.log(info);
        }
    catch(error)
    {
        console.log("error form node a mailer",error);
    }
  }
   const welcomeEmailFuction=async(email,name)=>{
    try{
      
        const info = await transporter.sendMail({
            from: '"laptophub 👻" <sanusatyam28@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome to laptophub!", // Subject line
            text: "email verifaication code", // plain text body
            html:Welcome_Email_Template.replace("{name}",name), // html body
          });
        console.log(info);
        }
    catch(error)
    {
        console.log("error form node a mailer",error);
    }
  }

  module.exports={sendEmailverification,welcomeEmailFuction}