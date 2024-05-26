"use client";

import { CheckCircleOutlined, ExportOutlined } from "@ant-design/icons";
import { Divider, Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function ResultShorter(props: { shorterUrl: string; originalUrl: string }) {
  const { shorterUrl, originalUrl } = props;
  const { t } = useTranslation();

  if (!shorterUrl) return;

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
    </Flex>
  );
}

export default ResultShorter;
