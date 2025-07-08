import express from 'express'
const app = express()
import nodeMailer  from 'nodemailer'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const sendEmail = (to, code) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user:'mesto1830@outlook.com',
      pass: 'MK1972mk11130113'
    }
  })
  const mailoption  = {
    from: 'mesto1830@outlook.com',
    to: to,
    //to: ['email1','email2','email3'],//for multiple receiver
    subject: 'Code',
    text: 'Plase copy and paste this code to activate your account.',
    html: `
    <h2>${code}</h2>
    `
  }
  
  transporter.sendMail(mailoption,(err, info) =>{
    if (err) {
      console.log(err)
    }
    console.log('Email send:' + info.response)
  })
}


export default sendEmail