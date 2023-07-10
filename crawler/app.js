const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
const { executablePath } = require("puppeteer")
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
puppeteer.use(stealth())

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/crawler', async(req, res) => {
  //pase this on to url 
  //http://localhost:3000/scrapp?website=http://books.toscrape.com/
  try {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: executablePath()
    })
    const page = await browser.newPage()
    await page.goto(req.query.website)
    const result = await page.content()
    await page.close()
    res.status(200).send(result)
  } catch (error) {
    res.json(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})