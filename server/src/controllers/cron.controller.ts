import {Router} from 'express';
import {cleanupUnconfirmedRegistrations} from "../jobs/registrationCleanup";

const cronRouter = Router();

cronRouter.post('/', cleanupUnconfirmedRegistrations)

export default cronRouter;