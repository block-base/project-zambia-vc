import { Payload, SupportedCredentialType } from "../types";

export interface IVcService {
  issue: (credentialType: SupportedCredentialType, credentialSubject: Payload) => Promise<string>;
  verify: (vc: string) => Promise<boolean>;
}
