"use client";

import {
  CheckCircleOutlined,
  CheckOutlined,
  CloudDownloadOutlined,
  CopyOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCodeResize from "./QRCodeResize";

function ResultShorter(props: { shorterUrl: string; originalUrl: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { shorterUrl, originalUrl } = props;
  const { t } = useTranslation();
  const refBannerSuccess = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (refBannerSuccess?.current) {
      refBannerSuccess.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shorterUrl]);

  if (!shorterUrl) return;

  const handleCopy = () => {
    if (isCopied) return;

    setIsCopied(true);
    navigator.clipboard.writeText(shorterUrl);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const downloadQRCode = () => {
    const canvas = document
      .getElementById("shorter-url-qrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");

    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Flex vertical className="result-shorter-url">
      <span className="message-success-shorter">
        <Flex gap={8} ref={refBannerSuccess}>
          <CheckCircleOutlined />
          {t("message_success_shorter_url")}
        </Flex>
      </span>

      <Divider />

      <Flex vertical gap={8}>
        <b>{t("old_url_label")}</b>
        <a className="url-result-shorted" href={originalUrl} target="_blank">
          {originalUrl} <ExportOutlined />
        </a>

        <Flex gap={4}>
          <span className="count-character-number">{originalUrl?.length}</span>
          <span className="count-character-text">{t("character")}</span>
        </Flex>
      </Flex>

      <Divider />

      <Flex justify="space-between" wrap="wrap" gap={8}>
        <Flex vertical gap={10}>
          <b>{t("new_url_label")}</b>
          <a className="url-result-shorted" href={shorterUrl} target="_blank">
            {shorterUrl} <ExportOutlined />
          </a>

          <Flex gap={4}>
            <span className="count-character-number">{shorterUrl?.length}</span>
            <span className="count-character-text">{t("character")}</span>
          </Flex>
        </Flex>

        <Button type="primary" danger ghost onClick={handleCopy}>
          <Flex gap={4}>
            {isCopied ? (
              <>
                <CheckOutlined />
                {t("copied")}
              </>
            ) : (
              <>
                <CopyOutlined />
                {t("copy")}
              </>
            )}
          </Flex>
        </Button>
      </Flex>

      <Divider />

      <Flex id="shorter-url-qrcode" vertical gap={4}>
        <QRCodeResize shorterUrl={shorterUrl} />

        <Button size="small" type="primary" danger onClick={downloadQRCode}>
          <CloudDownloadOutlined /> {t("save")}
        </Button>
      </Flex>

      <Divider />
    </Flex>
  );
}

export default ResultShorter;
