import type { Request, Response } from 'express';
import { CreateUseCase } from '../../application/use-cases/user/create.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/user/update.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/user/delete.use-case.js';
import { GetAllUseCase } from '../../application/use-cases/user/get-all.use-case.js';
import { GetByEmailUseCase } from '../../application/use-cases/user/get-by-email.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/user/get-by-id.use-case.js';
import { GetByIsPremiumUseCase } from '../../application/use-cases/user/get-by-is-premium.use-case.js';
import { GetByRoleUseCase } from '../../application/use-cases/user/get-by-role.use-case.js';
import { GetByUsernameUseCase } from '../../application/use-cases/user/get-by-username.use-case.js';

export class UserController {
    constructor(
        private createUseCase: CreateUseCase,
        private updateUseCase: UpdateUseCase,
        private deleteUseCase: DeleteUseCase,
        private getAllUseCase: GetAllUseCase,
        private getByEmailUseCase: GetByEmailUseCase,
        private getByIdUseCase: GetByIdUseCase,
        private getByIsPremiumUseCase: GetByIsPremiumUseCase,
        private getByRoleUseCase: GetByRoleUseCase,
        private getByUsernameUseCase: GetByUsernameUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getByIsPremium = this.getByIsPremium.bind(this);
        this.getByRole = this.getByRole.bind(this);
        this.getByUsername = this.getByUsername.bind(this);
    }

    async create(req: Request, res: Response) {
        try {



            const { fullName, username, email, password, phone, birthDate } = req.body;

            // In a real case, we would validate the data first (or use middleware/schema validation)
            const user = await this.createUseCase.execute({
                fullName,
                username,
                email,
                password,
                phone,
                birthDate: new Date(birthDate)
            });

            // We return the user without the password (though we should use a response DTO)
            const response = {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role
            };

            res.status(201).json(response);
        } catch (error: any) {
            console.error(error);
            // Basic error handling
            if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const { fullName, username, email, password, phone, birthDate } = req.body;

        } catch (error) {

        }
    }


}
