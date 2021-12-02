export type DriveName = "local" | "google";
export type DidName = "ion";
export type KmsName = "local" | "azure";

export interface Payload {
  [key: string]: string;
}
