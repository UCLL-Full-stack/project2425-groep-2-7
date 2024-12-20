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
 *     Invite:
 *       type: object
 *       properties:
 *         teamId:
 *           type: integer
 *           description: The ID of the team to which the player is being invited.
 *         userId:
 *           type: integer
 *           description: The ID of the user being invited.
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Login token.
 *         email:
 *           type: string
 *           description: Corresponding email.
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email.
 *         password:
 *           type: string
 *           description: Password.
 */

import { error } from 'console';
import userService from '../service/user.service';
import inviteService from '../service/invite.service';
import { UserInput, InviteInput } from '../types';
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
 * /players/invite:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new Invite.
 *     tags:
 *       - Players
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invite'
 *     responses:
 *       200:
 *         description: The created Invite with the correct teamId and userId.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invite'
 */
userRouter.post('/invite', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const invite = <InviteInput>req.body;
        const result = await inviteService.addInvite(invite);
        res.status(200).json(result);
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
        res.status(200).json({ message: 'Authentication Successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /players/email/{email}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve user details by email
 *     description: Fetches user information based on the provided email.
 *     parameters:
 *       - name: email
 *         in: path  # Changed from 'query' to 'path'
 *         description: The email address of the user to fetch details for.
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the user.
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                 firstName:
 *                   type: string
 *                   description: The user's first name.
 *                 lastName:
 *                   type: string
 *                   description: The user's last name.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *                 teamId:
 *                   type: integer
 *                   description: The ID of the team the user is a part of.
 *       400:
 *         description: Bad request (invalid email format).
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const response = await userService.getUserByEmail({ email: email });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /players/invite/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all invites for a specific user by userId
 *     description: Fetches all the invites where the `userId` matches the provided `userId`.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of the user to fetch invites for.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the invites.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invite'
 *       400:
 *         description: Bad request (invalid userId format).
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/invite/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        console.log(userId);
        const invites = await inviteService.getInvites(userId);
        res.status(200).json(invites);
    } catch (error) {
        next(error);
    }
});

userRouter.delete('/invite/:inviteId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inviteId = parseInt(req.params.inviteId);
        await inviteService.deleteInvite(inviteId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export { userRouter };
