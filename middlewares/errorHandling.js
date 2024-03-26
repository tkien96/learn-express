module.exports = (err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status).render('error', { err: err })
}
