import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ email, role }: { email: string; role: Role }): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'tournamentz_app' };
    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT Token, see server log for details');
    }
};

export { generateJwtToken };
