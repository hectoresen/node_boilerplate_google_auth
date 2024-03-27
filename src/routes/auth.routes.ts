import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import AuthController from '../controllers/auth.controller';
import GoogleProfileResponseInterface from '../common/interfaces/google-profile-response';
import { loginValidatorRules, registerValidationRules } from '../validators/auth';
import { validateRequest } from '../common/middlewares/validate-request';
import '../common/middlewares/google';

const router = express.Router();

router.post('/register', registerValidationRules, validateRequest, AuthController.register);
router.post('/login', loginValidatorRules, validateRequest, AuthController.login)

router.get('/google', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google-auth', {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        session: false,
    }, (user: GoogleProfileResponseInterface, error: string) => {
        if (error) {
            return res.status(409).json({ message: error });
        };
        AuthController.googleAuth(user, res);
    })(req, res, next);
});

export default router;
