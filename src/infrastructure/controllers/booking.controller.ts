import type { Request, Response } from 'express';
import { BookingStatus } from '../../domain/entities/booking.entity.js';
import { CreateBookingUseCase } from '../../application/use-cases/booking/create.use-case.js';
import { GetAllBookingsUseCase } from '../../application/use-cases/booking/get-all.use-case.js';
import { GetBookingByIdUseCase } from '../../application/use-cases/booking/get-by-id.use-case.js';
import { GetBookingsByUserUseCase } from '../../application/use-cases/booking/get-by-user.use-case.js';
import { GetBookingsByDateUseCase } from '../../application/use-cases/booking/get-by-date.use-case.js';
import { GetBookingsByStartTimeUseCase } from '../../application/use-cases/booking/get-by-start-time.use-case.js';
import { GetBookingsByEndTimeUseCase } from '../../application/use-cases/booking/get-by-end-time.use-case.js';
import { GetBookingsByTotalPriceUseCase } from '../../application/use-cases/booking/get-by-total-price.use-case.js';
import { GetBookingsByStatusUseCase } from '../../application/use-cases/booking/get-by-status.use-case.js';
import { GetBookingsByUserAndDateUseCase } from '../../application/use-cases/booking/get-by-user-and-date.use-case.js';
import { GetBookingsByCourtUseCase } from '../../application/use-cases/booking/get-by-court.use-case.js';
import { CheckAvailabilityUseCase } from '../../application/use-cases/booking/check-availability.use-case.js';
import { UpdateBookingUseCase } from '../../application/use-cases/booking/update.use-case.js';
import { DeleteBookingUseCase } from '../../application/use-cases/booking/delete.use-case.js';
import { BookingSchema } from '../../infrastructure/validation/booking.schema.js';

export class BookingController {
    constructor(
        private readonly createBookingUseCase: CreateBookingUseCase,
        private readonly getAllBookingsUseCase: GetAllBookingsUseCase,
        private readonly getBookingByIdUseCase: GetBookingByIdUseCase,
        private readonly getBookingsByUserUseCase: GetBookingsByUserUseCase,
        private readonly getBookingsByDateUseCase: GetBookingsByDateUseCase,
        private readonly getBookingsByStartTimeUseCase: GetBookingsByStartTimeUseCase,
        private readonly getBookingsByEndTimeUseCase: GetBookingsByEndTimeUseCase,
        private readonly getBookingsByTotalPriceUseCase: GetBookingsByTotalPriceUseCase,
        private readonly getBookingsByStatusUseCase: GetBookingsByStatusUseCase,
        private readonly getBookingsByUserAndDateUseCase: GetBookingsByUserAndDateUseCase,
        private readonly getBookingsByCourtUseCase: GetBookingsByCourtUseCase,
        private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
        private readonly updateBookingUseCase: UpdateBookingUseCase,
        private readonly deleteBookingUseCase: DeleteBookingUseCase,
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUser = this.getByUser.bind(this);
        this.getByDate = this.getByDate.bind(this);
        this.getByStartTime = this.getByStartTime.bind(this);
        this.getByEndTime = this.getByEndTime.bind(this);
        this.getByTotalPrice = this.getByTotalPrice.bind(this);
        this.getByStatus = this.getByStatus.bind(this);
        this.getByUserAndDate = this.getByUserAndDate.bind(this);
        this.getByCourt = this.getByCourt.bind(this);
        this.checkAvailability = this.checkAvailability.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Creates a new booking.
     * Validates input using BookingSchema.
     */
    async create(req: Request, res: Response) {
        try {
            // Validate incoming request body
            const validation = BookingSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({ 
                    error: "Validation failed", 
                    details: validation.error.flatten().fieldErrors 
                });
            }

            // Using validated data (now typed and cleaned)
            const { userId, courtId, date, startTime, endTime, numPeople, totalPrice } = validation.data;
            
            const booking = await this.createBookingUseCase.execute({
                userId: userId!,
                courtId: courtId!,
                date: date!,
                startTime: startTime!,
                endTime: endTime!,
                numPeople: numPeople!,
                totalPrice: totalPrice!,
            });
            res.status(201).json(booking);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const bookings = await this.getAllBookingsUseCase.execute();
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const booking = await this.getBookingByIdUseCase.execute({ id });
            res.status(200).json(booking);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            if (!userId || typeof userId !== 'string') {
                res.status(400).json({ error: 'Invalid User ID' });
                return;
            }
            const bookings = await this.getBookingsByUserUseCase.execute({ userId });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByDate(req: Request, res: Response) {
        try {
            const { date } = req.params;
            if (!date || typeof date !== 'string') {
                res.status(400).json({ error: 'Invalid Date' });
                return;
            }
            const bookings = await this.getBookingsByDateUseCase.execute({ date });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByStartTime(req: Request, res: Response) {
        try {
            const { startTime } = req.params;
            if (!startTime || typeof startTime !== 'string') {
                res.status(400).json({ error: 'Invalid Start Time' });
                return;
            }
            const bookings = await this.getBookingsByStartTimeUseCase.execute({ startTime });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByEndTime(req: Request, res: Response) {
        try {
            const { endTime } = req.params;
            if (!endTime || typeof endTime !== 'string') {
                res.status(400).json({ error: 'Invalid End Time' });
                return;
            }
            const bookings = await this.getBookingsByEndTimeUseCase.execute({ endTime });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByTotalPrice(req: Request, res: Response) {
        try {
            const { totalPrice } = req.params;
            if (!totalPrice || typeof totalPrice !== 'string') {
                res.status(400).json({ error: 'Invalid Total Price' });
                return;
            }
            const bookings = await this.getBookingsByTotalPriceUseCase.execute({ totalPrice: Number(totalPrice) });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByStatus(req: Request, res: Response) {
        try {
            const { status } = req.params;
            if (!status || typeof status !== 'string') {
                res.status(400).json({ error: 'Invalid Status' });
                return;
            }
            const bookings = await this.getBookingsByStatusUseCase.execute({ status: status as BookingStatus });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByUserAndDate(req: Request, res: Response) {
        try {
            const { userId, date } = req.params;
            if (!userId || typeof userId !== 'string' || !date || typeof date !== 'string') {
                res.status(400).json({ error: 'Invalid User ID or Date' });
                return;
            }
            const bookings = await this.getBookingsByUserAndDateUseCase.execute({ userId, date });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByCourt(req: Request, res: Response) {
        try {
            const { courtId } = req.params;
            if (!courtId || typeof courtId !== 'string') {
                res.status(400).json({ error: 'Invalid Court ID' });
                return;
            }
            const bookings = await this.getBookingsByCourtUseCase.execute({ courtId });
            res.status(200).json(bookings);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async checkAvailability(req: Request, res: Response) {
        try {
            const { courtId, date, startTime, endTime } = req.body;
            const isAvailable = await this.checkAvailabilityUseCase.execute({
                courtId,
                date,
                startTime,
                endTime
            });
            res.status(200).json({ isAvailable });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Updates an existing booking.
     * Validates input using BookingSchema.partial() to allow any subset of fields.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid ID' });
            }

            // Validate incoming request body for partial updates
            const validation = BookingSchema.partial().safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({ 
                    error: "Validation failed", 
                    details: validation.error.flatten().fieldErrors 
                });
            }

            const validatedData = validation.data;

            // Filter out undefined values to satisfy exactOptionalPropertyTypes in TypeScript
            const updateInput = Object.fromEntries(
                Object.entries(validatedData).filter(([_, v]) => v !== undefined)
            );

            const booking = await this.updateBookingUseCase.execute({
                id,
                ...updateInput
            });
            res.status(200).json(booking);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const success = await this.deleteBookingUseCase.execute({ id });
            res.status(200).json({ success });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }
}