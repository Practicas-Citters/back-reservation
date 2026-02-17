import express from 'express';

const app = express();

// Verbos HTTP

app.use(express.json());

import { authRouter } from './src/infrastructure/routes/auth.routes.js';
import { bookingRouter } from './src/infrastructure/routes/booking.routes.js';
import { courtRouter } from './src/infrastructure/routes/court.routes.js';
import { sportRouter } from './src/infrastructure/routes/sport.routes.js';
import { paymentRouter } from './src/infrastructure/routes/payment.routes.js'; // Assuming this exists based on conflict

// Note: checking conflict content, paymentRouter was in the other branch
// Let's look at the conflict again
// <<<<<<
// import { courtRouter } ...
// app.use ...
// ======
// import { sportRouter } ...
// import { paymentRouter } ...
// app.use ...
// >>>>>>

// I will just put them all together.

app.use('/api/auth', authRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/court', courtRouter);
app.use('/api/sport', sportRouter);
app.use('/api/payments', paymentRouter);


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
