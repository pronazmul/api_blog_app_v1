// Dependencies
import { createTransport } from 'nodemailer'

// Module Export
const TransportUtils = {}

/*
@ desc: Email Sender Utility Function
@ param [:object] - {name:string, email:string, success:bool, subject:string, body:string}
@ param [:function(err, data)] - Error back Pattern Callback Function
@ return [] - Function call
 */
TransportUtils.deliverMail = (userinfo, callback) => {
  //Mail Transporter Object
  let transporterCredentials = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  }
  //Destructure Mail Receiver Info:
  let { name, email, success, subject, body } = userinfo

  // Organized Mail Body
  let mailBody = {
    from: process.env.MAIL_AUTH_USER,
    to: email,
    subject: subject,
    text: body,
  }
  //Send Mail
  if (email) {
    const transporter = createTransport(transporterCredentials)
    transporter.sendMail(mailBody, (err, info) => {
      if (err) {
        callback(err)
      } else {
        callback(undefined, info)
      }
    })
  } else {
    console.log("You didon't delivered reciver informations.")
  }
}

export default TransportUtils
