import {Router} from "express";
import {
  getAllSubmissions,
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
adminRouter.get('/submissions', getAllSubmissions)

export default adminRouter