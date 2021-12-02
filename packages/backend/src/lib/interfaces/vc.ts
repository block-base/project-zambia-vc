import { Payload } from "../types";

export interface IVcService {
  issue: (payload: Payload) => string;
  verify: (vc: string) => boolean;
}
