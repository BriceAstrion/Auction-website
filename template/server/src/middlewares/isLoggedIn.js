import jwt from 'jsonwebtoken'
const secretKey = 'wreztxgchvibjontxfkgcndhgkjh';

export const isLoggedIn = (req, res, next) => {
    const token = req.header('Authorization');
    const decodedToken = jwt.decode(token, secretKey);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided!'});
    }

    jwt.verify(token, secretKey, {}, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
        }
        req.user = user;
        next();
    });
}