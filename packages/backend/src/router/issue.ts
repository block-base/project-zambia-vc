import express from "express";
import moment from "moment";

import { env } from "../config/env";
import { driveService, vcService } from "../lib/service-loader";
import { Payload } from "../lib/types";
import { generateForm } from "../lib/utils/form";
import { generateQRCode } from "../lib/utils/qrcode";
import { hmacAuthMiddleWare } from "../middleware/auth/hmac";

const router = express.Router();
router.use(hmacAuthMiddleWare);

router.post("/", async (req, res) => {
  const { userId, credentialSubject, displayElements } = req.body;
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const vc = await vcService.issue(credentialSubject);
  const vcFileId = await driveService.uploadFile(
    env.driveVcFolder,
    "application/json",
    `${userId}-${now}.json`,
    Buffer.from(vc)
  );
  const qrCode = await generateQRCode(vcFileId);
  const displayPayload: Payload = {};
  displayElements.forEach((displayElement: string) => {
    displayPayload[displayElement] = credentialSubject[displayElement];
  });
  const formBuffer = await generateForm(qrCode, displayPayload);
  const formFileId = await driveService.uploadFile(
    env.driveFormFolder,
    "image/png",
    `${userId}-${now}.png`,
    formBuffer
  );
  const formDownloadURI = driveService.getDownloadURI(formFileId);
  res.send({ vcFileId, formDownloadURI });
});

export default router;
