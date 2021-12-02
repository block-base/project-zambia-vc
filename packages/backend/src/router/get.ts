import express from "express";
const router = express.Router();

import { driveService } from "../lib/service-loader";

router.get("/", async (req, res) => {
  const { vcFileId } = req.query;
  if (typeof vcFileId !== "string") {
    throw new Error("invalid argument");
  }
  const vcBuffer = await driveService.getFile(vcFileId);
  const vc = vcBuffer.toString();
  res.send({ vc });
});

export default router;
