import {Router} from 'express';
import {exportRegistrationsExcel} from "../services/export.service";

const exportRouter = Router();

exportRouter.get('/', exportRegistrationsExcel)

export default exportRouter;