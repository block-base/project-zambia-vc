import { IKmsService } from "../../interfaces/kms";
import { IVcService } from "../../interfaces/vc";
import { Payload } from "../../types";

export class IonVcService implements IVcService {
  private kmsService: IKmsService;

  constructor(kmsService: IKmsService) {
    this.kmsService = kmsService;
  }

  issue(credentialSubject: Payload) {
    return "";
  }

  verify(vc: string) {
    return true;
  }
}
