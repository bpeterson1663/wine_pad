const withAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.status(403).json({ err: 'user unahtorized' })
  }
}

module.exports = withAuth
