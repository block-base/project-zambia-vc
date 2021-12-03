import { Payload, SupportedCredentialType } from "../types";

import Ajv from "ajv";

const ajv = new Ajv();

export const validateSchema = (credentialType: SupportedCredentialType, credentialSubject: Payload) => {
  let result;
  if (credentialType == "Credential") {
    const schema = {
      required: ["borrower", "age_over_16", "loan_count", "identity_proofing"],
      type: "object",
      properties: {
        borrower: {
          type: "string",
        },
        age_over_16: {
          type: "boolean",
        },
        loan_count: {
          type: "integer",
        },
        identity_proofing: {
          type: "string",
        },
        loan_amount: {
          type: "integer",
        },
        address: {
          type: "string",
        },
        times_received_loan: {
          type: "number",
        },
        training_completed: {
          type: "boolean",
        },
      },
      additionalProperties: false,
    };
    const validate = ajv.compile(schema);
    result = validate(credentialSubject);
  } else {
    throw new Error("not implemented");
  }
  return result;
};
