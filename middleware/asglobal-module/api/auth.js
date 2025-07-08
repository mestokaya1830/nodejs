const isLogin = (req, res, next) => {
  const login = false
  if (login) {
    next()
    return false
  }
  res.send('Please login!')
}
export default isLogin