export interface IDriveService {
  uploadFile: (
    type: string,
    path: string,
    name: string,
    file: Buffer
  ) => string;

  getFile: (fileId: string) => Buffer;

  getDownloadURI: (fileId: string) => string;
}
