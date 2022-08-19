function authMiddleware(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.status(401).send({
        success: false,
        messages: ['User Must Be Logged In']
    });
}
function loggedRedirectionMiddleware(req, res, next) {
    if (!req.session.user) {
        return next();
    }
    return res.redirect('/');
}

module.exports = {
    authMiddleware,
    loggedRedirectionMiddleware
}
