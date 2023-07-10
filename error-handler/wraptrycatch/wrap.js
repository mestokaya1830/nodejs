const wrap = (param) => async(req, res, next) => {
  try {
    await param(req, res)
  } catch (error) {
    return next(error)
  }
}
module.exports = wrap