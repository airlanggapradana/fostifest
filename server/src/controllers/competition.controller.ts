import {Router} from "express";
import {
  createCompetition, deleteCompetition,
  getCompetitionById,
  getCompetitions,
  updateCompetition
} from "../services/competition.service";

const competitionRouter = Router();

competitionRouter.post('/', createCompetition)
competitionRouter.get('/', getCompetitions)
competitionRouter.get('/:id', getCompetitionById)
competitionRouter.put('/:id', updateCompetition)
competitionRouter.delete('/:id', deleteCompetition)

export default competitionRouter