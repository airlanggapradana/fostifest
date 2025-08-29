import {Router} from "express";
import {
  getDataSummary,
  getRegistrationsByCompetitionLastMonths,
  getUserData,
  getUserDetails
} from "../services/admin.service";

const adminRouter = Router();

adminRouter.get('/get-comps-stats', getRegistrationsByCompetitionLastMonths)
adminRouter.get('/get-data-summary', getDataSummary)
adminRouter.get('/get-users-data', getUserData)
adminRouter.get('/get-users-details/:id', getUserDetails)

export default adminRouter