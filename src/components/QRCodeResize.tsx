import { QRCode } from "antd";
import { useEffect, useState } from "react";

interface QRCodeProps {
  shorterUrl: string;
}

const QRCodeResize: React.FC<QRCodeProps> = ({ shorterUrl }) => {
  const [qrCodeSize, setQRCodeSize] = useState(300);

  useEffect(() => {
    // Set initial size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setQRCodeSize(Math.min(260, window.innerWidth - 64));
  };

  return <QRCode size={qrCodeSize} value={shorterUrl || "-"} />;
};

export default QRCodeResize;
