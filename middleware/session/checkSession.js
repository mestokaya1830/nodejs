const serverauth =  (req, res, next) => {
  if (req.session.auth) {
    next()
  }else{
    res.redirect('/login')
  }
}
module.exports = serverauth