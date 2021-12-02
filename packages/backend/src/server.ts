import express from "express";

const app = express();
const port = 8080;

import getRouter from "./router/get";
import issueRouter from "./router/issue";
import verifyRouter from "./router/verify";

app.use("/", getRouter);
app.use("/", issueRouter);
app.use("/", verifyRouter);

app.listen(port);
