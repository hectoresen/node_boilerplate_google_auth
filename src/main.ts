import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import "reflect-metadata";
import passport from 'passport'

import NotFoundException from './common/exceptions/not-found-exception';
import BaseException from './common/exceptions/base-exception';
import { authRouter, healthRouter, userRouter } from './routes';
import { AppDataSource } from '../config/datasource';
import { ApiConfigService } from './common/api-config.service';

const apiConfigService = new ApiConfigService()
const app = express();
const port = apiConfigService.getString('NODE_PORT') || 5000

app.use(express.json());
app.use(passport.initialize());

app.use('/health', healthRouter);
app.use('/auth', authRouter );
app.use('/user', userRouter)

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundException(`The route ${req.originalUrl} was not found.`);
    next(error);
});

app.use((err: BaseException, req: Request, res: Response, next: NextFunction) => {
    const errorResponse = {
        message: err.message,
        status: err.statusCode || 500,
    };
    return res.status(err.statusCode || 500).json(errorResponse);
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
