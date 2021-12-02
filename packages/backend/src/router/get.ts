import express from "express";
const router = express.Router();

import { driveService } from "../lib/service-loader";

router.get("/get", async (req, res) => {
  const { vcFileId } = req.body;
  const vc = driveService.getFile(vcFileId);
  res.send({ vc });
});

export default router;
