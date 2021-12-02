import * as fs from "fs";
import * as path from "path";

import ejs from "ejs";
import nodeHtmlToImage from "node-html-to-image";
import { Payload } from "../types";

export const generateForm = async (qrCode: string, payload: Payload) => {
  const template = fs.readFileSync(
    path.join(__dirname, "..", "..", "forms", "vc.ejs")
  );
  const html = ejs.render(template.toString(), { qrCode, payload });
  const image = await nodeHtmlToImage({
    html,
  });
  if (!Buffer.isBuffer(image)) {
    throw new Error("generated image invalid");
  }
  return image;
};

generateForm("ok", {});
