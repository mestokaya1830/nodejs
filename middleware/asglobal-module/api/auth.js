const isLogin = (req, res, next) => {
  const login = false
  if (login) {
    next()
  } else {
    res.send('Please login!')
  }
}
export default isLogin