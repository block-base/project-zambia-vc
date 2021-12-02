import React from "react";

import { get, verify } from "../../../lib/vc";

export const useVerifier = () => {
  const [scannedFileId, setScannedFileId] = React.useState("");
  const [isVerified, setIsVerified] = React.useState();

  React.useEffect(() => {
    if (!scannedFileId) {
      return;
    }
    (async () => {
      const vc = await get(scannedFileId);
      const isVerified = await verify(vc);
      setIsVerified(isVerified);
    })();
  }, [scannedFileId]);

  return { setScannedFileId, isVerified };
};
