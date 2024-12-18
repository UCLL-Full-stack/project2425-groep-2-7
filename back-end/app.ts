import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { teamRouter } from './controller/team.routes';
import { tournamentRouter } from './controller/tournament.routes';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Mock JWT Secret (make sure to set it in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(
    expressjwt({
        secret: JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs/', /^\/apidocs\/?.*/, '/players/login', '/players/register', '/status'],
    })
);

app.use('/players', userRouter);
app.use('/teams', teamRouter);
app.use('/tournaments', tournamentRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TournamentZ API',
            version: '1.0.0',
            description: 'API for managing tournaments, teams, and players',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'application error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
