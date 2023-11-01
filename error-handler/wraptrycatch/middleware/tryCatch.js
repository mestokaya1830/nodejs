const wrap = (param) => async(req, res, next) => {
  try {
    await param(req, res)
  } catch (error) {
    // res.json(error) // and grap this in frontend
    return next(error)
  }
}

export default wrap
