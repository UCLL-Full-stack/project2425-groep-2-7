// middleware/validateIat.ts
import { Request, Response, NextFunction } from 'express';

export const validateIat = (maxAgeSeconds = 3600, clockSkewSeconds = 5) =>
    (req: Request, res: Response, next: NextFunction) => {
        const payload = req.auth;
        const now = Math.floor(Date.now() / 1000);

        if (!payload?.iat) {
            return res.status(400).json({ error: 'Token missing iat claim' });
        }

        const iat = payload.iat;

        if (iat > now + clockSkewSeconds) {
            return res.status(400).json({ error: 'Token issued in the future' });
        }

        if (now - iat > maxAgeSeconds) {
            return res.status(401).json({ error: 'Token too old' });
        }

        next();
    };
