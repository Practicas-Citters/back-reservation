import 'reflect-metadata';
import express from 'express';
import { connectDB } from './src/infrastructure/config/postgres.config.js';

const app = express();

// HTTP Verbs

app.use(express.json());

import { authRouter } from './src/infrastructure/routes/auth.routes.js';
import { bookingRouter } from './src/infrastructure/routes/booking.routes.js';
import { courtRouter } from './src/infrastructure/routes/court.routes.js';
import { sportRouter } from './src/infrastructure/routes/sport.routes.js';
import { paymentRouter } from './src/infrastructure/routes/payment.routes.js'; // Assuming this exists based on conflict



app.use('/api/auth', authRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/court', courtRouter);
app.use('/api/sport', sportRouter);
app.use('/api/payments', paymentRouter);


app.listen(process.env.PORT || 4000, async () => {
    await connectDB();
    console.log("Server running on port ", process.env.PORT || 4000);
});
