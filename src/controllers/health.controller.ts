import { Request, Response } from 'express';

interface HealthCheck {
    uptime: number
    message: string
    timestamp: number
    memory: Memory
};

interface Memory {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
    arrayBuffers: number
}

export default class HealthController {

    static health(req: Request, res: Response) {
        const healthcheck: HealthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            memory: process.memoryUsage()
        };
        try {
            return res.status(200).json(healthcheck);
        } catch (error) {
            healthcheck.message = 'ERROR';
            res.status(503).send();
        }
    };
}
