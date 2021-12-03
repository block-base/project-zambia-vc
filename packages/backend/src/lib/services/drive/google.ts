import { drive_v3, google } from "googleapis";

import { IDriveService } from "../../interfaces/drive";
import { DriveSupportedExt } from "../../types";
import { bufferToReadableStream } from "../../utils/stream";

export class GoogleDriveService implements IDriveService {
  private drive: drive_v3.Drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    this.drive = google.drive({
      version: "v3",
      auth,
    });
  }

  async uploadFile(folder: string, name: string, ext: DriveSupportedExt, file: Buffer) {
    const mimeType = {
      png: "image/png",
      json: "application/json",
    }[ext];

    const res = await this.drive.files.create({
      requestBody: {
        name: `${name}.${ext}`,
        parents: [folder],
      },
      media: {
        mimeType,
        body: bufferToReadableStream(file),
      },
    });
    return <string>res.data.id;
  }

  async getFile(fileId: string) {
    const res = await this.drive.files.get({ fileId, alt: "media" });
    if (typeof res.data === "string") {
      return Buffer.from(res.data);
    } else {
      throw new Error("file invalid");
    }
  }

  getDownloadURI(fileId: string) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
}
