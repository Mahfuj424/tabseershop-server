import express, { Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middleware/notFoundRoute";
import router from "./app/routes";
import errorMiddleware from "./app/middleware/globalErrorHandler";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  res.send({ message: "tabseershop server is running" });
};

app.get("/", test);

// not found route
app.use(notFound);
app.use(errorMiddleware);
export default app;
