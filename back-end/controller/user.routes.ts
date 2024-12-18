/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         age:
 *           type: integer
 *           format: int32
 *           description: Age of the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *         country:
 *           type: string
 *           description: Country of the user.
 *         description:
 *           type: string
 *           description: Description of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user.
 *         role:
 *           type: string
 *           description: Role of the user.
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: Password of the user.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for the authenticated user.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the authenticated user.
 */

import { error } from 'console';
import userService from '../service/user.service';
import { UserInput } from '../types';
import express, { NextFunction, Request, Response } from 'express';

const userRouter = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Get a list of all players.
 *     tags:
 *       - Players
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error.
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await userService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /players/{userId}:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Get a user by ID.
 *     tags:
 *       - Players
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        const player = await userService.getPlayerById(userId);
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /players/register:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     summary: Create a new Player.
 *     tags:
 *       - Players
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created User with the 'Player' role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Validation error.
 *       500:
 *         description: Server error.
 */
userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.addPlayer(user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /players/login:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     summary: Authenticate a user.
 *     tags:
 *       - Players
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Server error.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const response = await userService.authenticate(user);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
