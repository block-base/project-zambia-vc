import { IDriveService } from "../../interfaces/drive";

export class LocalDriveService implements IDriveService {
  uploadFile(type: string, path: string, name: string, file: Buffer) {
    return "";
  }
  getFile(fileId: string) {
    return Buffer.from("");
  }
  getDownloadURI(fileId: string) {
    return "";
  }
}
