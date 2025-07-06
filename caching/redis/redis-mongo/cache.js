import cache from 'memory-cache'
const memCache = new cache.Cache()

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key =  '__express__' + req.originalUrl || req.url
    if(memCache.get(key)){
        res.send( memCache.get(key) )
        return
    }else{
      res.sendResponse = res.send
      res.send = (body) => {
        memCache.put(key,body,duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}
export default cacheMiddleware 