import {Router} from "express";
import {newRegistrationIndividual, newRegistrationTeam} from "../services/registration.service";

const registrationRouter = Router();

registrationRouter.post('/individual', newRegistrationIndividual)
registrationRouter.post('/team', newRegistrationTeam)

export default registrationRouter;