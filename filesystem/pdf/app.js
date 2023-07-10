const puppeteer = require('puppeteer')
const fs = require('fs')

async function getPdf(){
  const url = 'https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js'
  
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'load'})

  await page.pdf({path: './test.pdf', format:'A4'})
  await browser.close()
}
getPdf()