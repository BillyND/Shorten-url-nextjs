"use client";

import {
  CheckCircleOutlined,
  CheckOutlined,
  CopyOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ResultShorter(props: { shorterUrl: string; originalUrl: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { shorterUrl, originalUrl } = props;
  const { t } = useTranslation();

  if (!shorterUrl) return;

  const handleCopy = () => {
    if (isCopied) return;

    setIsCopied(true);
    navigator.clipboard.writeText(shorterUrl);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Flex vertical className="result-shorter-url">
      <span className="message-success-shorter">
        <Flex gap={8}>
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

      <Flex justify="space-between">
        <Flex vertical gap={8}>
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
    </Flex>
  );
}

export default ResultShorter;
