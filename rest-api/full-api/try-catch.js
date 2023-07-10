//set try catch block
const errorHandler = (param) => {
  return (req, res, next) => {
    param(req, res, next).catch(next)
  }
}

module.exports =  errorHandler