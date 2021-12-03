import { DriveSupportedExt } from "../types";

export interface IDriveService {
  uploadFile: (folder: string, name: string, ext: DriveSupportedExt, file: Buffer) => Promise<string>;

  getFile: (fileId: string) => Promise<Buffer>;

  getDownloadURI: (fileId: string) => string;
}
