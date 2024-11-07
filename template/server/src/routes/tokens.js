import express from 'express';
import TokensController from '../controllers/tokens.js';

const router = express.Router();
const tokensController = new TokensController();

router.post('/',  tokensController.generateToken);

export default router;
