const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const config = functions.config();
const cors = require("cors")({origin:true});

admin.initializeApp();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {user: config.user.email, pass: config.user.password}
});


let mailOptions = {};

exports.sendMailFromADHDMovers= functions.https.onRequest((request, response)=>{
  cors(request, response, ()=>{
    const{name, email, phone, message, items} = request.query

    if(items){
      mailOptions = {//то что получим себе от того почтов ящика
        from: 'ADHD Movers',
        to:'andreynef@gmail.com',
        subject: 'Order received',
        html:`
              <p style='font-size:16px'> From: ${name} </p>
              <p style='font-size:16px'> Email: ${email} </p>
              <p style='font-size:16px'> Phone: ${phone} </p>
              <p style='font-size:16px'> Items: ${items} </p>
              <p style='font-size:16px'> Message: ${message} </p>
            `
      };
    }else {//просто сообщение
      mailOptions = {//то что получим себе от того почт ящика
        from: 'ADHD Movers',
        to: 'andreynef@gmail.com',
        subject: 'Booking message received',
        html: `
              <p style='font-size:16px'> From: ${name} </p>
              <p style='font-size:16px'> Email: ${email} </p>
              <p style='font-size:16px'> Phone: ${phone} </p>
              <p style='font-size:16px'> Message: ${message} </p>
            `,
      };
    }

    transporter.sendMail(mailOptions, error=> {
      if(error){
        response.send(error);
      } else {
        response.send('Message sent successfully');
      }
    });

    mailOptions = {//то что отправим им обратно
      from: 'ADHD Movers',
      to:email,
      subject: 'We have received your message',
      // html: copiedResponseHugeHtmlForMessage,
      html: `
              <p style='font-size:16px'> Thanks for messaging us. We will contact you back shortly. </p>
            `,
    };
    transporter.sendMail(mailOptions)//просто отправить еще раз по новому адресу с новым шаблоном. Без проверок, ибо это лишнее тк уже проверено.

  });
});
