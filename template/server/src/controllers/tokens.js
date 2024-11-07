import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../data/users.js';

class TokensController {
    generateToken(req, res) {
        const { email, password } = req.body;

        // Find the user in the users array based on the provided email
        const user = users.find(user => user.email === email);

        // If the user does not exist or the password is incorrect, return an error response
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // At this point, the user is authenticated. Generate a JWT token.
        const payload = { email: user.email, isAdmin: user.isAdmin };
        const secretKey = 'wreztxgchvibjontxfkgcndhgkjh'; // Actual secret key
        const options = { expiresIn: '1h' };

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                console.error('Error generating JWT token:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            // Send the JWT token in the response
            res.status(200).json({ token });
        });
    }
}

export default TokensController;