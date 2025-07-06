const wrap = (param) => async(req, res, next) => {
  try {
    await param(req, res)
  } catch (error) {
    res.json(error)
  }
}
export default wrap