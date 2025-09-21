import {Router} from "express";
import {
  createCompetition, createFeedback, createSubmission, deleteCompetition,
  getCompetitionById,
  getCompetitions,
  updateCompetition, updateFeedback
} from "../services/competition.service";

const competitionRouter = Router();

competitionRouter.post('/', createCompetition)
competitionRouter.get('/', getCompetitions)
competitionRouter.post('/submission/:competitionId', createSubmission)
competitionRouter.post('/feedback/:submissionId', createFeedback)
competitionRouter.get('/:id', getCompetitionById)
competitionRouter.put('/:id', updateCompetition)
competitionRouter.put('/feedback/:feedbackId', updateFeedback)
competitionRouter.delete('/:id', deleteCompetition)

export default competitionRouter