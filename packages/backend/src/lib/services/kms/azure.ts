import { IKmsService } from "../../interfaces/kms";
import { Payload } from "../../types";

export class AzureKmsService implements IKmsService {
  sign(payload: Payload) {
    return "";
  }
}
