import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const conf = new Configuration({
  organization: process.env.ORG_KEY,
  apiKey: process.env.API_KEY//change api key everytime
})
const openai = new OpenAIApi(conf)

app.post('/', async (req, res) => {
  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.message,
    max_tokens: 10,
    temperature: 0.6
  })
  if (result.data.choices[0].text) {
    res.json({ message: result.data.choices[0].text })
  }
})
app.listen(3000, () => {
  console.log('Server is running...')
})