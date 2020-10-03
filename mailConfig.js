const nodemailer = require("nodemailer")
const mailegun = require("nodemailer-mailgun-transport")

const sendMail = (from,subject,text,cb)=>{
    const auth = {
        auth:{
            api_key:"5ce1ee1226932ca81ee28e0fd9452e92-aff2d1b9-6da43f09",
            domain:"sandbox77c89d7b03f641fa9f52c068141e5a44.mailgun.org"
        }
    }
    const transporter = nodemailer.createTransport(mailegun(auth));
    const mailOptions = {
        from,
        to:"braveharted33@gmail.com",
        subject,
        text
    }
    
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            cb(err,null)
        }else{
          cb(null,data)
        }
    })
}

module.exports = sendMail
// const mailgun = require("mailgun-js");
// const DOMAIN = "sandbox77c89d7b03f641fa9f52c068141e5a44.mailgun.org";
// const mg = mailgun({apiKey: "5ce1ee1226932ca81ee28e0fd9452e92-aff2d1b9-6da43f09", domain: DOMAIN});
// const data = {
// 	from: "Mailgun Sandbox <postmaster@sandbox77c89d7b03f641fa9f52c068141e5a44.mailgun.org>",
// 	to: "braveharted33@gmail.com",
// 	subject: "Hello",
// 	text: "Testing some Mailgun awesomness!"
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });
// sendMail("nyaknodavis318@gmail.com",datasub,data)
// brave harted
// braveharted33@gmail.com