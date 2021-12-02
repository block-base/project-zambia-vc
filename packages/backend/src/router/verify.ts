import express from "express";
const router = express.Router();

import { vcService } from "../lib/service-loader";

router.post("/", async (req, res) => {
  const { vc } = req.body;
  const result = await vcService.verify(vc);
  res.send(result);
});

export default router;
