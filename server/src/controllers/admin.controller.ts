import {Router} from "express";
import {
  exportAsExcel,
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
adminRouter.get('/participants/export', exportAsExcel)

export default adminRouter