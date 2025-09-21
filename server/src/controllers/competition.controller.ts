import {Router} from "express";
import {
  createCompetition, createFeedback, createSubmission, deleteCompetition,
  getCompetitionById,
  getCompetitions,
  updateCompetition
} from "../services/competition.service";

const competitionRouter = Router();

competitionRouter.post('/', createCompetition)
competitionRouter.get('/', getCompetitions)
competitionRouter.post('/submission/:competitionId', createSubmission)
competitionRouter.post('/feedback/:submissionId', createFeedback)
competitionRouter.get('/:id', getCompetitionById)
competitionRouter.put('/:id', updateCompetition)
competitionRouter.delete('/:id', deleteCompetition)

export default competitionRouter