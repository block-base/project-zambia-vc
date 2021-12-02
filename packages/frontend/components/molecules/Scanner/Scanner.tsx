import dynamic from "next/dynamic";
import React from "react";

import { useScanner } from "./useScanner";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export interface ScannerProps {
  onScan: (data: string) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const { handleScan, handleError } = useScanner(onScan);
  return <QrReader onError={handleError} onScan={handleScan} />;
};
