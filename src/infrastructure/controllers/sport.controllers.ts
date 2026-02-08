import type { Request, Response } from 'express';
import { CreateSportUseCase } from '../../application/useCase/sports/create-sport.use-case.js';
import { GetSportsUseCase } from '../../application/useCase/sports/get-sports.use-case.js';

export class SportController {
    constructor(
        // @QUESTION: La IA me ha sugerido que ponga private readonly, pero no se porque
        private readonly createSportUseCase: CreateSportUseCase,
        private readonly getSportsUseCase: GetSportsUseCase,
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async create(req: Request, res: Response) {
        try {
            const { name, iconUrl, minPlayers, maxPlayers } = req.body;

            const sport = await this.createSportUseCase.execute({
                name,
                iconUrl,
                minPlayers,
                maxPlayers
            });

            res.status(201).json(sport);

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const sports = await this.getSportsUseCase.execute();
            res.status(200).json(sports);

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}