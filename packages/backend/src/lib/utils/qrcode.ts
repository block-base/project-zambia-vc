import QRCode from "qrcode";

export const generateQRCode = async (input: string) => {
  return await QRCode.toDataURL(input);
};
