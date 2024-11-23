import bcrypt from 'bcrypt';
import users from '../data/users.js';

class UserController {

    getAllUsers(req, res) {
        try {
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }

    async registerUser(req, res) {
        const { email, password, name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required.' });
        }

        if (!this.isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ email, password: hashedPassword, name, isAdmin: false });
            return res.status(201).json({ message: 'Registration successful.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async deleteUser(req, res) {
        const { email } = req.body;

        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found.' });
        }

        try {
            users.splice(userIndex, 1);
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }

    async deleteUserById(req, res) {
        const id = parseInt(req.params.id); // Retrieve ID from URL parameters

        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found.' });
        }

        try {
            users.splice(userIndex, 1); // Remove user from the array
            return res.status(200).json({ message: 'User has been successfully deleted.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }

    getOneUser(req, res) {
        const { email } = req.params;

        const user = users.find(user => user.email === email);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: 'User not found.' });
        }
    }

    getUserById(req, res) {
        const id = parseInt(req.params.id);
        const user = users.find(user => user.id === id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    }

    async updateUser(req, res) {
        const { email } = req.params;
        const { role, name } = req.body;

        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Ensure role is updated correctly
        if (role !== undefined) {
            user.isAdmin = role.toLowerCase() === 'admin'; // Map "admin" to true, others to false
        }
        if (name) {
            user.name = name;
        }

        try {
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export default UserController;