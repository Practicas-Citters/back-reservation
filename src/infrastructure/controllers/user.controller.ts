import type { Request, Response } from 'express';
import { UserRole } from '../../domain/entities/user.entity.js';
import { CreateUseCase } from '../../application/use-cases/user/create.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/user/update.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/user/delete.use-case.js';
import { GetAllUseCase } from '../../application/use-cases/user/get-all.use-case.js';
import { GetByEmailUseCase } from '../../application/use-cases/user/get-by-email.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/user/get-by-id.use-case.js';
import { GetByPremiumStatusUseCase } from '../../application/use-cases/user/get-by-premium-status.use-case.js';
import { GetByRoleUseCase } from '../../application/use-cases/user/get-by-role.use-case.js';
import { GetByUsernameUseCase } from '../../application/use-cases/user/get-by-username.use-case.js';
import { UserSchema } from '../../infrastructure/validation/user.schema.js';

export class UserController {
    constructor(
        private createUseCase: CreateUseCase,
        private updateUseCase: UpdateUseCase,
        private deleteUseCase: DeleteUseCase,
        private getAllUseCase: GetAllUseCase,
        private getByEmailUseCase: GetByEmailUseCase,
        private getByIdUseCase: GetByIdUseCase,
        private getByPremiumStatusUseCase: GetByPremiumStatusUseCase,
        private getByRoleUseCase: GetByRoleUseCase,
        private getByUsernameUseCase: GetByUsernameUseCase
    ) {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getByPremiumStatus = this.getByPremiumStatus.bind(this);
        this.getByRole = this.getByRole.bind(this);
        this.getByUsername = this.getByUsername.bind(this);
    }

    /**
     * Create a new user.
     * Validates input using UserSchema.
     */
    async create(req: Request, res: Response) {
        try {
            const validation = UserSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({ 
                    error: "Validation failed", 
                    details: validation.error.flatten().fieldErrors 
                });
            }

            const user = await this.createUseCase.execute(validation.data);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Update an existing user (Partial update).
     * Method: PATCH
     * Validates input using UserSchema.partial().
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const validation = UserSchema.partial().safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({ 
                    error: "Validation failed", 
                    details: validation.error.flatten().fieldErrors 
                });
            }

            // Filter out undefined values to satisfy strict TS requirements
            const updateInput = Object.fromEntries(
                Object.entries(validation.data).filter(([_, v]) => v !== undefined)
            );

            try {
                const user = await this.updateUseCase.execute(id, updateInput as any);
                res.status(200).json(user);
            } catch (error: any) {
                if (error.message === `User with id ${id} not found`) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                throw error;
            }
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Delete a user by its ID.
     * Expects 'id' in the route parameters.
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid user ID' });
                return;
            }
            const user = await this.deleteUseCase.execute(id);
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get all users.
     */
    async getAll(req: Request, res: Response) {
        try {
            const users = await this.getAllUseCase.execute();
            res.status(200).json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a user by its ID.
     * Expects 'id' in the route parameters.
     */
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid user ID' });
                return;
            }
            const user = await this.getByIdUseCase.execute(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a user by its Email.
     * Expects 'email' in the route parameters.
     */
    async getByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            if (!email || typeof email !== 'string') {
                res.status(400).json({ error: 'Invalid email' });
                return;
            }
            const user = await this.getByEmailUseCase.execute(email);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get users by Is Premium status.
     * Expects 'isPremium' as 'true' or 'false' in the route parameters.
     */
    async getByPremiumStatus(req: Request, res: Response) {
        try {
            const { isPremium } = req.params;

            if (isPremium !== 'true' && isPremium !== 'false') {
                res.status(400).json({ error: 'Invalid isPremium parameter. Must be "true" or "false"' });
                return;
            }

            const isPremiumBool = isPremium === 'true';

            const users = await this.getByPremiumStatusUseCase.execute(isPremiumBool);
            res.status(200).json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get users by Role.
     * Expects 'role' in the route parameters (must match UserRole enum).
     */
    async getByRole(req: Request, res: Response) {
        try {
            const { role } = req.params;
            const isValidRole = Object.values(UserRole).includes(role as UserRole);

            if (!role || !isValidRole) {
                res.status(400).json({ error: `Invalid role. Allowed roles are: ${Object.values(UserRole).join(', ')}` });
                return;
            }
            const user = await this.getByRoleUseCase.execute(role as UserRole);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a user by its Username.
     * Expects 'username' in the route parameters.
     */
    async getByUsername(req: Request, res: Response) {
        try {
            const { username } = req.params;
            if (!username || typeof username !== 'string') {
                res.status(400).json({ error: 'Invalid username' });
                return;
            }
            const user = await this.getByUsernameUseCase.execute(username);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }


}
