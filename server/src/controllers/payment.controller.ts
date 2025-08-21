import {Router} from 'express';
import {createPayment, handleNotification} from "../services/payment.service";

const paymentRouter = Router();

paymentRouter.post('/', createPayment)
paymentRouter.post('/notification', handleNotification)

export default paymentRouter