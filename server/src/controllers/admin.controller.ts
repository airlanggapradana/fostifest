import {Router} from "express";
import {getRegistrationsByCompetitionLastMonths} from "../services/admin.service";

const adminRouter = Router();

adminRouter.get('/get-comps-stats', getRegistrationsByCompetitionLastMonths)

export default adminRouter