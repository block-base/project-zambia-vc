import express from "express";
const router = express.Router();

import { driveService, vcService } from "../lib/service-loader";
import { generateForm } from "../lib/utils/form";
import { generateQRCode } from "../lib/utils/qrcode";

router.post("/issue", async (req, res) => {
  const { credentialSubject } = req.body;
  const vc = await vcService.issue(credentialSubject);
  const vcFileId = await driveService.uploadFile(
    "application/json",
    "",
    "vc.json",
    Buffer.from(vc)
  );
  const qrCodeBuffer = await generateQRCode(vcFileId);
  const formBuffer = await generateForm(qrCodeBuffer, credentialSubject);
  const formFileId = await driveService.uploadFile(
    "image/png",
    "",
    "form.png",
    formBuffer
  );
  const formDownloadURI = driveService.getDownloadURI(formFileId);
  res.send({ vcFileId, formDownloadURI });
});

export default router;
