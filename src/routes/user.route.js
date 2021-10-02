import express from 'express';
import * as userController from '../controllers/user.controller';
import { loginValidator, signupValidator } from '../validators/user.validator';

const router = express.Router();

router.post('/signup', signupValidator, userController.signup);
router.post('/login', loginValidator, userController.login);

export default router;
