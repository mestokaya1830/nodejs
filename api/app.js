import express from 'express'
const app = express()
import helmet from 'helmet'
import cors from 'cors'
import 'dotenv/config'
import db from './models/db.js'
import productsRouter from './routes/productsRouter.js'
import ordersRouter from './routes/ordersRouter.js'

app.use(helmet())
app.use(express.json())
app.use(express.static('static'))


app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000'
    : '*'
}))
// “Uygulaman bir proxy (örneğin Nginx) arkasında çalışıyor.
// Gerçek client IP’sini proxy header’larından al.”
// Client (gerçek IP)
//       ↓
// Nginx
//       ↓
// Express App

// Express bu durumda req.ip olarak bunu gorur 127.0.0.1 Çünkü Express’e gelen istek Nginx’ten geliyor. Gerçek IP’yi göremez.
// Nginx şu header’ı ekler: X-Forwarded-For: gerçek-ip
// trust proxy açık olursa Express bu header’a güvenir ve: req.ip gerçek kullanıcı IP’sini verir.
// 🔥 Ne Zaman Gerekli?
// Şu durumlarda zorunlu:
// Nginx reverse proxy varsa
// Load balancer varsa
// Cloudflare kullanıyorsan
// Rate limit yapıyorsan
// IP bazlı log alıyorsan

// 🛑 Açmazsan Ne Olur?
// Rate limit çalışmaz (herkes aynı IP görünür)
// Gerçek IP loglanmaz
// GeoIP yanlış olur
// Güvenlik analizleri bozulur
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="display:flex;justify-content:center;margin-top:50px;">Home Page</h1>')
})

app.use('/products',  productsRouter)
app.use('/orders',  ordersRouter)

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  console.log(db.readyState)
  let dbStatus = 'fail';
  if (db.readyState === 1) {
    dbStatus = 'ok';
  }
  res.status(dbStatus === 'ok' ? 200 : 500).json({
    status: dbStatus === 'ok' ? 'ok' : 'error',
    uptime: process.uptime(),
    db: dbStatus
  });
});


app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500

  res.status(status).json({
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  })
})

app.use((req, res) => {
  res.status(404).send('Page Not Found')
})

app.listen(process.env.PORT, () => {
  console.log('Server is running...')
})