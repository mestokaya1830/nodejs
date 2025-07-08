
import redis from 'redis'
//middleware cach
const cache = async(req, res, next) => {
  try {
    const client = redis.createClient(6379)
    await client.connect()

    client.setEx('msg', 3600, 'Mustafa Kaya')
    const msg = await client.get('msg')
    
    if(msg){
      res.send({msg})
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
  }
}
export default cache