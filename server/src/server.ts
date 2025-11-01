import express, {Request, Response, Application, NextFunction} from "express";
import cors from "cors";
import userRouter from "./controllers/user.controller";
import {errorHandler} from "./middlewares/errorHandler";
import competitionRouter from "./controllers/competition.controller";
import registrationRouter from "./controllers/registration.controller";
import authRouter from "./controllers/auth.controller";
import paymentRouter from "./controllers/payment.controller";
import exportRouter from "./controllers/export.controller";
import adminRouter from "./controllers/admin.controller";
import {decodeJwtWithoutVerify} from "./middlewares/authorization.middleware";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cron from "node-cron";
import {env} from "./env";
import multer from "multer";
import {supabase} from "./utils/supabaseClient";
import {cleanupUnconfirmedRegistrations} from "./jobs/registrationCleanup";

const app: Application = express();

app.use(
  cors(),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/cron', async () => {
  // Jalankan tiap 15 menit
  cron.schedule("*/15 * * * *", async () => {
    console.log("[CRON] Running registration cleanup...");
    await cleanupUnconfirmedRegistrations();
  });
})

// pakai memory storage, jadi file masuk buffer
const upload = multer({storage: multer.memoryStorage()});

app.post("/api/upload", upload.single("file"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({error: "No file uploaded"});
      return;
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // upload ke supabase storage
    const {data, error} = await supabase.storage
      .from("submissions") // ganti sesuai nama bucket di supabase
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      res.status(500).json({error: error.message});
      return;
    }

    // bikin public URL
    const {data: publicUrl} = supabase.storage
      .from("submissions")
      .getPublicUrl(fileName);

    res.status(200).json({
      message: "File uploaded successfully",
      path: data?.path,
      url: publicUrl.publicUrl,
    });
    return;
  } catch (err) {
    next(err);
  }
});


app.get('/', (_req, res) => {
  res.send('Welcome to the server!');
})

app.use('/api/user', userRouter)
app.use('/api/competition', competitionRouter)
app.use('/api/registration', registrationRouter)
app.use('/api/auth', authRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/export', exportRouter)
app.use('/api/admin', decodeJwtWithoutVerify, adminRouter)

app.use(errorHandler)

// export default app;
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
})