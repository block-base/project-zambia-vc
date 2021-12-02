import React from "react";

import { Scanner } from "../../molecules/Scanner";
import { useVerifier } from "./useVerifier";

export const Verifier: React.FC = () => {
  const { isVerified, setScannedFileId } = useVerifier();

  return (
    <div>
      <Scanner onScan={setScannedFileId} />
      {isVerified == true && <p>Verified</p>}
      {isVerified == false && <p>Not Verified</p>}
    </div>
  );
};
