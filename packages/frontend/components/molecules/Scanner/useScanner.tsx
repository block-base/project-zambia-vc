import React from "react";

export const useScanner = (onScan) => {
  const [isScanned, setIsScanned] = React.useState(false);

  const handleScan = (data: string) => {
    if (!data || isScanned) {
      return;
    }
    setIsScanned(true);
    onScan(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return { handleScan, handleError };
};
