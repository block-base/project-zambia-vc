export interface IDriveService {
  uploadFile: (
    folderId: string,
    mimeType: string,
    name: string,
    file: Buffer
  ) => Promise<string>;

  getFile: (fileId: string) => Promise<Buffer>;

  getDownloadURI: (fileId: string) => string;
}
