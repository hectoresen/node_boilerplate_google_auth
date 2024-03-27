import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import { UserRepository } from '../../repositories/user.repository';
import GoogleProfileResponseInterface from '../interfaces/google-profile-response';

passport.use('google-auth', new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        callbackURL: 'http://localhost:3000/auth/google'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const userEmail = profile?.emails?.[0]?.value;
            const userName = profile?.name?.givenName ?? userEmail
            const googleProfile: GoogleProfileResponseInterface = profile._json;

            if (!userEmail) {
                return done(null, 'User email not present in profile')
            };

            const user = await new UserRepository().findUserByEmail(userEmail);

            console.log(profile)
            if (!user) {
                await new UserRepository().createUser({
                    firstName: userName,
                    email: userEmail
                });
                done({
                    googleProfile,
                    accessToken,
                    refreshToken
                });
            };

            done({
                googleProfile,
                accessToken,
                refreshToken
            });
        } catch (error) {
            done(null, 'An error occurred during authentication')
        }
    }
))
