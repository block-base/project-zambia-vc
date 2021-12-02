import { Payload } from "../types";

export interface IKmsService {
  sign: (payload: Payload) => string;
}
