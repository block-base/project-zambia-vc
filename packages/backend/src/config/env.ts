import { DidName, DriveName, KmsName } from "../lib/types";

const isDriveName = (input?: string): input is DriveName => {
  return input === "local" || input === "google";
};

const isVcDid = (input?: string): input is DidName => {
  return input === "ion";
};

const isVcKms = (input?: string): input is KmsName => {
  return input === "local" || input === "azure";
};

const getEnv = () => {
  if (!isDriveName(process.env.DRIVE_NAME)) {
    throw new Error("drive name invalid");
  }
  if (!isVcDid(process.env.DID_NAME)) {
    throw new Error("vc did invalid");
  }
  if (!isVcKms(process.env.KMS_NAME)) {
    throw new Error("vc kms invalid");
  }
  return {
    drive: process.env.DRIVE_NAME,
    did: process.env.DID_NAME,
    kms: process.env.KMS_NAME,
  };
};

export const env = getEnv();
