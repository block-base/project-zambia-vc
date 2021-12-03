import cors from "cors";
import express from "express";
import * as path from "path";

import { env } from "./src/config/env";

const app = express();
app.use(cors());
app.use(express.json());

import getRouter from "./src/router/get";
import issueRouter from "./src/router/issue";
import verifyRouter from "./src/router/verify";

app.use("/get", getRouter);
app.use("/issue", issueRouter);
app.use("/verify", verifyRouter);

if (env.driveName === "local") {
  app.use("/drive", express.static(path.join(__dirname, "drive")));
}

app.listen(env.port, () => {
  console.log(`server listening at http://localhost:${env.port}`);
});
