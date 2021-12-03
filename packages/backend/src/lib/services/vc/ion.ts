import {
  Crypto,
  CryptoBuilder,
  JoseBuilder,
  KeyReference,
  KeyUse,
  LongFormDid,
  ValidatorBuilder,
} from "verifiablecredentials-verification-sdk-typescript";

import { IVcService } from "../../interfaces/vc";
import { Payload, VcKms } from "../../types";

export class IonVcService implements IVcService {
  private crypto: Crypto;

  constructor(vcKms: VcKms) {
    this.crypto = new CryptoBuilder()
      .useSigningKeyReference(new KeyReference("signing"))
      .useRecoveryKeyReference(new KeyReference("recovery"))
      .useUpdateKeyReference(new KeyReference("update"))
      .build();
    this.initialize(vcKms);
  }

  private initialize = async (vcKms: VcKms) => {
    let did: string;
    if (vcKms === "local") {
      await this.crypto.generateKey(KeyUse.Signature, "signing");
      await this.crypto.generateKey(KeyUse.Signature, "recovery");
      await this.crypto.generateKey(KeyUse.Signature, "update");
      did = await new LongFormDid(this.crypto).serialize();
    } else {
      throw new Error("not implemented");
    }
    this.crypto.builder.useDid(did);
  };

  async issue(payload: Payload) {
    if (!this.crypto.builder.did) {
      throw new Error("did not initialized");
    }
    const credentials = {
      iss: this.crypto.builder.did,
      sub: this.crypto.builder.did, // actually not required sub for current use case, but sdk requires it...
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "Credential"],
        credentialSubject: payload,
      },
    };
    const signature = await this.crypto.signingProtocol(JoseBuilder.JWT).sign(credentials);
    return signature.serialize();
  }

  async verify(vc: string) {
    if (!this.crypto.builder.did) {
      throw new Error("did not initialized");
    }
    const validator = new ValidatorBuilder(this.crypto)
      .useTrustedIssuersForVerifiableCredentials({
        Credential: [this.crypto.builder.did],
      })
      .build();
    const test = await validator.validate(vc);
    return test.result;
  }
}
