/**
 * @swagger
 *   components:
 *    schemas:
 *      Tournament:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Name of the tournament.
 *            location:
 *              type: string
 *              description: Location of the tournament.
 *            game:
 *              type: string
 *              description: Game being played in the tournament.
 *            teams:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Team'
 *              description: List of teams participating in the tournament.
 */

import tournamentService from '../service/tournament.service';
import express, { NextFunction, Request, Response } from 'express';
import { TournamentInput } from '../types';

const tournamentRouter = express.Router();

/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Get a list of all tournaments.
 *     responses:
 *       200:
 *         description: A list of tournaments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Tournament'
 */
tournamentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tournaments:
 *   post:
 *      summary: Create a new tournaments.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tournament'
 *      responses:
 *         200:
 *            description: The created tournament.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Tournament'
 */
tournamentRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Body:", req.body);
    try {
        
        const tournament = <TournamentInput>req.body;
        console.log(tournament);
        const result = await tournamentService.addTournament(tournament);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { tournamentRouter };
