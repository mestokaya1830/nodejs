exports.login = (req, res) => {
  res.status(200).json('Hello Login Controller!')
}
exports.register = (req, res) => {
  res.status(200).json('Hello Register Controller!')
}
exports.resetpassword = (req, res) => {
  res.status(200).json('Hello ResetPassword Controller!')
}

// module.exports = {
//   login,
//   register,
//   resetpassword
// }