import { Router } from "express";

const router = Router();

router.get('/daniel', (req, res) => {
    res.send('Hola Daniel')
})

export { router as bookingRouter }
