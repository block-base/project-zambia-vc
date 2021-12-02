import axios from "axios";
import { env } from "../config/env";

export const get = async (vcFileId: string) => {
  const { data } = await axios.get(
    `${env.backendUriBase}/get?vcFileId=${vcFileId}`
  );
  return data.vc;
};

export const verify = async (vc: string) => {
  const { data: isVerified } = await axios.post(
    `${env.backendUriBase}/verify`,
    {
      vc,
    }
  );
  return isVerified;
};
