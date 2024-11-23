import express from 'express';
import UserController from '../controllers/users.js';
import {isAdmin} from "../middlewares/isAdmin.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";

const router = express.Router();
const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:email', (req, res) => userController.getOneUser(req, res));

router.post('/', (req, res) => userController.registerUser(req, res));

router.put('/:email', isLoggedIn, isAdmin, userController.updateUser);

router.delete('/:email',isLoggedIn, isAdmin, (req, res) => userController.deleteUser(req, res));
router.delete('/:id',isLoggedIn, isAdmin, (req, res) => userController.deleteUserById(req, res));

export default router;