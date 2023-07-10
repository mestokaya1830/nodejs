import express from 'express'
const app = express()
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import nlp from 'compromise'
import cs from 'compromise-sentences'
nlp.extend(cs)

dotenv.config()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/past-tense', (req, res) => {
  let past = nlp(req.query.sentence).sentences().toPastTense()
  let future = nlp(req.query.sentence).sentences().toFutureTense()
  res.json({
    pastTense: past.text(),
    futureTense: future.text()
  })
})

app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})