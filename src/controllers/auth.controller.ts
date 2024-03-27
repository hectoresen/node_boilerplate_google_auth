import { Request, Response } from "express";

import { UserRepository } from "../repositories/user.repository";
import GoogleProfileResponseInterface from "../common/interfaces/google-profile-response";

export default class AuthController {
    constructor() {}

    static async googleAuth (profile: GoogleProfileResponseInterface, res: Response) {
        try {
            //TOD@ any actions
            return res.status(200).json(profile)
        } catch (error) {
            return res.status(400).json({ error: 'An error occurred during authentication' });
        }
    };
    
    static async register(req: Request, res: Response) {
        const { firstName, lastName, email, password } = req.body;

        try {
            //TOD@ other registration methods
            const newUser = await new UserRepository().createUser({
                firstName: firstName,
                email: email
            });

            return res.status(201).json({ user: newUser })

        } catch (error: unknown) {
            console.log(error)
            const firebaseError = error as { errorInfo?: { code?: string; message?: string } };
            return res.status(400).json({ error: firebaseError.errorInfo?.message })
        };
    };

    static async login(req: Request, res: Response) {
        //TOD@ other authentication methods
    };
}