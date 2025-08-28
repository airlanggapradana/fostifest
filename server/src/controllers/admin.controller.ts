import {Router} from "express";
import {getDataSummary, getRegistrationsByCompetitionLastMonths} from "../services/admin.service";

const adminRouter = Router();

adminRouter.get('/get-comps-stats', getRegistrationsByCompetitionLastMonths)
adminRouter.get('/get-data-summary', getDataSummary)

export default adminRouter