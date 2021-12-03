import { SupportedExt } from "../types";

export interface IDriveService {
  uploadFile: (folder: string, name: string, ext: SupportedExt, file: Buffer) => Promise<string>;

  getFile: (fileId: string) => Promise<Buffer>;

  getDownloadURI: (fileId: string) => string;
}
