import { Payload } from "../types";

export interface IVcService {
  issue: (payload: Payload) => Promise<string>;
  verify: (vc: string) => Promise<boolean>;
}
