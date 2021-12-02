import { env } from "../config/env";
import { GoogleDriveService } from "./services/drive/google";
import { LocalDriveService } from "./services/drive/local";
import { AzureKmsService } from "./services/kms/azure";
import { LocalKmsService } from "./services/kms/local";
import { IonVcService } from "./services/vc/ion";
import { DidName, DriveName, KmsName } from "./types";

const getDriveService = (driveName: DriveName) => {
  if (driveName === "local") {
    return new LocalDriveService();
  } else if (driveName === "google") {
    return new GoogleDriveService();
  } else {
    throw new Error("not implemented");
  }
};

const getKmsService = (kmsName: KmsName) => {
  if (kmsName === "local") {
    return new LocalKmsService();
  } else if (kmsName === "azure") {
    return new AzureKmsService();
  } else {
    throw new Error("not implemented");
  }
};

const getVcService = (didName: DidName, kmsName: KmsName) => {
  const kmsService = getKmsService(kmsName);
  if (didName === "ion") {
    return new IonVcService(kmsService);
  } else {
    throw new Error("not implemented");
  }
};

export const driveService = getDriveService(env.drive);
export const vcService = getVcService(env.did, env.kms);
