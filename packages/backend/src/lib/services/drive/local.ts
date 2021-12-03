import * as fs from "fs";
import * as path from "path";

import { env } from "../../../config/env";
import { IDriveService } from "../../interfaces/drive";
import { SupportedExt } from "../../types";

const base = path.join(__dirname, "..", "..", "..", "..", "drive");

export class LocalDriveService implements IDriveService {
  async uploadFile(folder: string, name: string, ext: SupportedExt, file: Buffer) {
    if (folder !== "form" && folder !== "vc") {
      throw new Error("folder invalid");
    }
    const id = path.join(folder, `${name}.${ext}`);
    fs.writeFileSync(path.join(base, id), file);

    return id;
  }

  async getFile(fileId: string) {
    const res = fs.readFileSync(path.join(base, fileId));
    return res;
  }

  getDownloadURI(fileId: string) {
    return `http://localhost:${env.port}/drive/${fileId}`;
  }
}
