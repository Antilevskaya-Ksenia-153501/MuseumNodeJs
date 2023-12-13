import {Router} from 'express';
import {register, signin} from '../controllers.auth.js'

const router = new Router();

//SignUp
router.post('/register', register);

//SignIn
router.post('/signin', signin);

export default router;