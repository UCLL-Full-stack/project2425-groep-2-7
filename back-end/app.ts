import './instrument';
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
import * as Sentry from "@sentry/node"; 
import { sanitizeRequestBody } from './util/requestSanitizer'; 

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

// CSP Middleware
const cspMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const nonce = Math.random().toString(36).substr(2, 10);  // Generate a simple nonce
    res.locals.nonce = nonce;  // Make it available to views/templates
    res.setHeader("Content-Security-Policy", 
        `default-src 'self'; ` + 
        `script-src 'self' 'nonce-${nonce}'; ` + // Add the nonce to allow specific inline scripts.
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self'; " +
        "connect-src 'self'; " +
        "frame-ancestors 'none'; "
    );
    next();
};

app.use(cspMiddleware);

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
    apis: ['./controller/*.routes.ts'], 
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
            '/players/login',
            '/players/register',
            '/status',
            '/debug-sentry',
            '/players/password-forgotten',
            '/players/password-reset',
        ],
    })
);

app.use((req, res, next) => {
    const publicPaths = ['/players/login', '/players/register', '/status', '/api-docs', '/debug-sentry'];
    const isPublic = publicPaths.some(path => req.path.startsWith(path));
    if (isPublic) {
        return next();
    }
    return validateIat()(req, res, next);
});

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// Routes
app.use('/players', userRouter);
app.use('/teams', teamRouter);
app.use('/tournaments', tournamentRouter);

// Health-check route
app.get('/status', (req: Request, res: Response) => {
    res.json({ message: 'Back-end is running...' });
});

Sentry.setupExpressErrorHandler(app);

// Error-handling middleware
app.use((err: Error | UnauthorizedError, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        const protectedPaths = ['/players', '/teams', '/tournaments'];
        const isProtectedPath = protectedPaths.some(path => req.path.startsWith(path));
        if (isProtectedPath) {
            Sentry.captureMessage(`Unauthenticated access attempt to ${req.path}`, {
                level: 'warning',
                extra: {
                    method: req.method,
                    ip: req.ip,
                    userAgent: req.headers['user-agent'],
                    sanitizedBody: sanitizeRequestBody(req.body),
                },
            });
        }
        return res.status(401).json({ status: 'unauthorized', message: err.message });
    }

    Sentry.captureException(err, {
        extra: {
            path: req.originalUrl,
            method: req.method,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            sanitizedBody: sanitizeRequestBody(req.body),
        },
    });

    console.error('Application Error:', err.message);
    res.status(400).json({ status: 'application error', message: err.message });
});

// Server start
app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
