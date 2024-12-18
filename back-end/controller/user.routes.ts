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
 */


import userService from '../service/user.service';
import inviteService from '../service/invite.service';
import { UserInput, InviteInput } from '../types';
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
 *     summary: Get a user by ID.
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
 */
userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        console.log(userId);
        const player = await userService.getPlayerById(userId);
        res.status(200).json(player);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /players:
 *   post:
 *      summary: Create a new Player.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *         200:
 *            description: The created User with the 'Player' role.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.addPlayer(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /players/invite:
 *   post:
 *      summary: Create a new Invite.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Invite'
 *      responses:
 *         200:
 *            description: The created Invite with the right Teamid and userId
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Invite'
 */
userRouter.post('/invite', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const invite = <InviteInput>req.body;
        const result = await inviteService.addInvite(invite)
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


export {userRouter};

