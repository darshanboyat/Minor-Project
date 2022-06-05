function guest (req, res, next) {
    if(!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/success')
}

module.exports = guest