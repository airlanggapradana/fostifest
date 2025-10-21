import {Router} from "express";
import {cleanupUnconfirmedRegistrations} from "../jobs/registrationCleanup";

const cronRouter = Router();

// Endpoint manual trigger
cronRouter.post("/cleanup", async (_req, res) => {
  await cleanupUnconfirmedRegistrations();
  res.json({message: "Cleanup executed successfully."});
});

export default cronRouter;
