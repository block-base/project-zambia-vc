import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env.development") });

import { DriveName, VcDid, VcKms } from "../lib/types";

const isDriveName = (input?: string): input is DriveName => {
  return input === "local" || input === "google";
};

const isVcDid = (input?: string): input is VcDid => {
  return input === "ion";
};

const isVcKms = (input?: string): input is VcKms => {
  return input === "local";
};

const getEnv = () => {
  if (!isDriveName(process.env.DRIVE_NAME)) {
    throw new Error("drive name invalid");
  }
  if (!process.env.DRIVE_VC_FOLDER) {
    throw new Error("drive vc folder invalid");
  }
  if (!process.env.DRIVE_FORM_FOLDER) {
    throw new Error("drive form folder invalid");
  }
  if (!isDriveName(process.env.DRIVE_NAME)) {
    throw new Error("drive name invalid");
  }
  if (!isVcDid(process.env.VC_DID)) {
    throw new Error("vc did invalid");
  }
  if (!isVcKms(process.env.VC_KMS)) {
    throw new Error("vc kms invalid");
  }
  if (!process.env.AUTH_SECRET) {
    throw new Error("secret invalid");
  }
  if (!process.env.PORT) {
    throw new Error("port invalid");
  }
  return {
    driveName: process.env.DRIVE_NAME,
    driveVcFolder: process.env.DRIVE_VC_FOLDER,
    driveFormFolder: process.env.DRIVE_FORM_FOLDER,
    vcDid: process.env.VC_DID,
    vcKms: process.env.VC_KMS,
    authSecret: process.env.AUTH_SECRET,
    port: process.env.PORT,
  };
};

export const env = getEnv();
