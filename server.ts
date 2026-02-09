import express from 'express';

const app = express();

// Verbos HTTP

app.use(express.json());

import { authRouter } from './src/infrastructure/routes/auth.routes.js';
import { bookingRouter } from './src/infrastructure/routes/booking.routes.js';
import { paymentRouter } from './src/infrastructure/routes/payment.routes.js';

app.use('/api/auth', authRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/payments', paymentRouter);


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
