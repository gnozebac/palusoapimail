
var nodemailer = require("nodemailer");
var express = require ("express");
const { defaultMaxListeners } = require("events");

var app =express();


app.use(express.json());


 app.post('/send-email', async (req, res) => {
    
    const {code, email} = req.body;

    contentHTML = `
    <h1>PAL'USO</h1>
    <p> El codigo de verificación es: ${code}</p>
    
    `;

    var trasporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "magbmail.@gmail.com", // generated ethereal user
      pass: "ADNaloy2020", // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }

     });

     var mailOptions = {
         from: 'magbmail.@gmail.com',
         to: email,
         subject: 'Código de verificación',
         html: contentHTML
     }

     const info = await trasporter.sendMail(mailOptions
        
        ,(error,info) => {
         if (error){
            res.status(500).send(error.message);
         }else{
             console.log(info.messageId);
             console.log("email enviado");
             res.status(200).jsonp(req.body);
         }

     }
     
     );

 });

 app.listen(3000, () => {
    console.log("Servidor en -> http");

 });