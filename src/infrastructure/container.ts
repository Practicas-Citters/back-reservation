import { InMemoryUserRepository } from './repositories/in-memory-user.repository.js';
import { InMemoryBookingRepository } from './repositories/in-memory-booking.repository.js';
import { PaymentRepositoryImpl } from './repositories/payment.repository.impl.js';
import { ScheduleRepositoryImpl } from './repositories/schedule.repository.impl.js';
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';
import { CourtRepositoryImpl } from './repositories/court.repository.impl.js';
import { SportRepositoryImpl } from './repositories/sport.repository.impl.js';
import { UserRepositoryImpl } from './repositories/user.repository.impl.js';

// Singleton instances
// export const userRepository = new InMemoryUserRepository();

export const bookingRepository = new InMemoryBookingRepository();
export const userRepository = new UserRepositoryImpl();
export const paymentRepository = new PaymentRepositoryImpl();
export const scheduleRepository = new ScheduleRepositoryImpl();
export const passwordHasher = new BcryptPasswordHasher();
export const idGenerator = new UuidIdGenerator();
export const courtRepository = new CourtRepositoryImpl();
export const sportRepository = new SportRepositoryImpl();
