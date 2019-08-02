function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/')
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
    return next()
  } else {
    res.redirect('/')
  }
}

function isUserOrAdmin(req, res, next) {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    return next()
  } else {
    res.redirect('/')
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isUserOrAdmin
}
