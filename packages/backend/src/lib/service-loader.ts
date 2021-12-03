import { env } from "../config/env";
import { GoogleDriveService } from "./services/drive/google";
import { LocalDriveService } from "./services/drive/local";
import { IonVcService } from "./services/vc/ion";
import { DriveName, VcDid, VcKms } from "./types";

const getDriveService = (driveName: DriveName) => {
  if (driveName === "local") {
    return new LocalDriveService();
  } else if (driveName === "google") {
    return new GoogleDriveService();
  } else {
    throw new Error("not implemented");
  }
};

const getVcService = (vcDid: VcDid, vcKms: VcKms) => {
  if (vcDid === "ion") {
    return new IonVcService(vcKms);
  } else {
    throw new Error("not implemented");
  }
};

export const driveService = getDriveService(env.driveName);
export const vcService = getVcService(env.vcDid, env.vcKms);
