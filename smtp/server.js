const express = require('express')
const app = express()
const cors = require('cors')
const nm  = require('nodemailer')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const transporter = nm.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user:'mesto1830@outlook.com',
    pass: 'MK1972mk'
  }
})

const mailoption  = {
  from: 'mesto1830@outlook.com',
  to: 'mesto1830@gmail.com',
  //to: ['email1','email2','email3'],//for multiple receiver
  subject: 'Test',
  text: 'Hello Mesto',
  html: '<h3>How are you?</h3>',
}

transporter.sendMail(mailoption,(err, info) =>{
  if (err) {
    console.log(err)
  }
  console.log('Email send:' + info.response)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started...')
})