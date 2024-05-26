"use client";

import { Button, Flex, Form, FormProps, Input, message } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BannerApp from "./BannerApp";
import ResultShorter from "./ResultShorter";

type FieldType = {
  originalUrl: string;
  customAlias?: string;
};

type ShorterDataType = {
  originalUrl: string;
  shorterUrl: string;
};

const ContentDetail: React.FC = () => {
  const [dataShorter, setDataShorter] = useState<ShorterDataType>({
    originalUrl: "",
    shorterUrl: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  message.config({
    maxCount: 3,
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    setDataShorter((prev) => ({ ...prev, originalUrl: values.originalUrl }));

    try {
      const response = await fetch("/api/shorter-url", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resSubmitShortUrl = await response.json();
      const { success, message: resMessage, data } = resSubmitShortUrl || {};

      setDataShorter((prev) => ({
        ...prev,
        shorterUrl: data?.shorterUrl || "",
      }));

      if (!success) {
        message.error(t(resMessage));
      }
    } catch (error) {
      console.error("Error submitting short URL:", error);
      message.error(t("error_server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical className="content-detail" justify="start" align="center">
      <BannerApp />

      <Form
        className="form-content"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label={<b>{t("url")}</b>}
          name="originalUrl"
          rules={[
            {
              required: true,
              message: t("url_invalid_format"),
            },
            { type: "url", message: t("url_invalid_format") },
          ]}
        >
          <Input
            size="large"
            placeholder={t("input_url_placeholder")}
            autoComplete="url"
            spellCheck="false"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={<b>{t("custom_alias_label")}</b>}
          name="customAlias"
        >
          <Input
            autoComplete="on"
            size="large"
            spellCheck="false"
            placeholder={t("input_custom_alias_placeholder")}
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit" loading={loading} danger>
              {t("submit_form_shorter_url")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>

      <ResultShorter
        shorterUrl={dataShorter.shorterUrl}
        originalUrl={dataShorter.originalUrl}
      />
    </Flex>
  );
};

export default ContentDetail;
