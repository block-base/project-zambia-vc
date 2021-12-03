export type DriveName = "google" | "local";
export type VcDid = "ion";
export type VcKms = "local";

export type SupportedExt = "png" | "json";

export interface Payload {
  [key: string]: string;
}

export type SupportedCredentialType = "Credential";
