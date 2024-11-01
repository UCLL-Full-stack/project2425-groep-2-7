/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            age:
 *              type: integer
 *              format: int32
 *              description: Age of the user.
 *            name:
 *              type: string
 *              description: Name of the user.
 *            country:
 *              type: string
 *              description: Country of the user.
 *            description:
 *              type: string
 *              description: Description of the user.
 *            email:
 *              type: string
 *              format: email
 *              description: Email of the user.
 *            role:
 *              type: string
 *              description: Role of the user.
 */

import playerService from '../service/user.service'
import express, { NextFunction, Request, Response } from 'express';

const userRouter = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get a list of all players.
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
});

export {userRouter}