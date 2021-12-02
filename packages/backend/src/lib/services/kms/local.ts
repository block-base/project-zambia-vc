import { IKmsService } from "../../interfaces/kms";
import { Payload } from "../../types";

export class LocalKmsService implements IKmsService {
  sign(payload: Payload) {
    return "";
  }
}
