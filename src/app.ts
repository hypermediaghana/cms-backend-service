import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRoutes } from "./routes/usersRoute";
import { siteRoutes } from "./routes/siteReqRoutes";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/site", siteRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to Hyper Media");
});

app.listen(8000, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
