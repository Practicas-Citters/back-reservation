import type { Request, Response } from 'express';
import { UserRole } from '../../domain/entities/user.entity.js';
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

    /**
     * Create a new user.
     * Expects fullName, username, email, password, phone, birthDate in the request body.
     */
    async create(req: Request, res: Response) {
        try {
            const user = await this.createUseCase.execute(req.body);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Update an existing user (Partial update).
     * Method: PATCH
     * Expects 'id' in route parameters and fields to update in body.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid user ID' });
                return;
            }

            const { fullName, username, email, password, phone, birthDate, role, isPremium, profilePicture, points } = req.body;

            // Validations
            if (fullName !== undefined && (typeof fullName !== 'string' || fullName.trim() === '')) {
                res.status(400).json({ error: 'Invalid fullName. Must be a non-empty string.' });
                return;
            }

            if (username !== undefined && (typeof username !== 'string' || username.trim() === '')) {
                res.status(400).json({ error: 'Invalid username. Must be a non-empty string.' });
                return;
            }

            if (email !== undefined && (typeof email !== 'string' || email.trim() === '')) {
                res.status(400).json({ error: 'Invalid email. Must be a non-empty string.' });
                return;
            }

            if (password !== undefined && (typeof password !== 'string' || password.trim() === '')) {
                res.status(400).json({ error: 'Invalid password. Must be a non-empty string.' });
                return;
            }

            if (phone !== undefined && (typeof phone !== 'string' || phone.trim() === '')) {
                res.status(400).json({ error: 'Invalid phone. Must be a non-empty string.' });
                return;
            }

            if (birthDate !== undefined && (typeof birthDate !== 'string' || birthDate.trim() === '')) {
                res.status(400).json({ error: 'Invalid birthDate. Must be a non-empty string.' });
                return;
            }

            if (role !== undefined && (typeof role !== 'string' || role.trim() === '')) {
                res.status(400).json({ error: 'Invalid role. Must be a non-empty string.' });
                return;
            }

            if (isPremium !== undefined && typeof isPremium !== 'boolean') {
                res.status(400).json({ error: 'Invalid isPremium. Must be a boolean.' });
                return;
            }

            if (profilePicture !== undefined && (typeof profilePicture !== 'string' || profilePicture.trim() === '')) {
                res.status(400).json({ error: 'Invalid profilePicture. Must be a non-empty string.' });
                return;
            }

            if (points !== undefined && typeof points !== 'number') {
                res.status(400).json({ error: 'Invalid points. Must be a number.' });
                return;
            }

            try {
                const user = await this.updateUseCase.execute(id, {
                    fullName,
                    username,
                    email,
                    password,
                    phone,
                    birthDate,
                    role,
                    isPremium,
                    profilePicture,
                    points
                });
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
    async getByIsPremium(req: Request, res: Response) {
        try {
            const { isPremium } = req.params;

            if (isPremium !== 'true' && isPremium !== 'false') {
                res.status(400).json({ error: 'Invalid isPremium parameter. Must be "true" or "false"' });
                return;
            }

            const isPremiumBool = isPremium === 'true';

            const users = await this.getByIsPremiumUseCase.execute(isPremiumBool);
            if (!users || users.length === 0) {
                res.status(404).json({ error: 'Users not found' });
                return;
            }
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
