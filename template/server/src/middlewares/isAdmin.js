export function isAdmin (req, res, next) {
    const user = req.user;

    if (!user.isAdmin) {
        return res.status(403).json({error: 'Forbidden: Access denied for Non-Admin Users!'})
    } else {
        return next();
    }
}