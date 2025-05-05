import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { teamRouter } from './controller/team.routes';
import { tournamentRouter } from './controller/tournament.routes';
import { expressjwt, UnauthorizedError } from 'express-jwt';
import { validateIat } from './util/validateIat';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

// Ensure JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(bodyParser.json()); 



// Swagger setup
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TournamentZ API',
            version: '1.0.0',
            description: 'API for managing tournaments, teams, and players',
        },
    },
    apis: ['./controller/*.routes.ts'], // Update this path to match your file structure
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JWT Middleware
app.use(
    expressjwt({
        secret: JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api-docs',
            /^\/api-docs\/?.*/, // Ensure all paths under `/api-docs` are excluded
            '/players/login',
            '/players/register',
            '/status',
        ],
    })
);

app.use((req, res, next) => {
    const publicPaths = [
        '/players/login',
        '/players/register',
        '/status',
        '/api-docs'
    ];

    const isPublic = publicPaths.some(path => req.path.startsWith(path));

    if (isPublic) {
        return next();
    }

    return validateIat()(req, res, next);
});


// Routes
app.use('/players', userRouter);
app.use('/teams', teamRouter);
app.use('/tournaments', tournamentRouter);

// Health-check route
app.get('/status', (req: Request, res: Response) => {
    res.json({ message: 'Back-end is running...' });
});

// Error-handling middleware
app.use((err: Error | UnauthorizedError, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ status: 'unauthorized', message: err.message });
    }

    console.error('Application Error:', err.message); // Log other errors for debugging
    res.status(400).json({ status: 'application error', message: err.message });
});

// Server start
app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
