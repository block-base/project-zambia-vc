import express from "express";

import { env } from "./config/env";

const app = express();
app.use(express.json());

import getRouter from "./router/get";
import issueRouter from "./router/issue";
import verifyRouter from "./router/verify";

app.use("/get", getRouter);
app.use("/issue", issueRouter);
app.use("/verify", verifyRouter);

app.listen(env.port);
