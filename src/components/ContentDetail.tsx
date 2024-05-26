"use client";

import { Button, Flex, Form, FormProps, Input, message } from "antd";
import { useState } from "react";
import ResultShorter from "./ResultShorter";
import { useTranslation } from "react-i18next";
import BannerApp from "./BannerApp";

type FieldType = {
  originalUrl: string;
  customAlias?: string;
};

function ContentDetail() {
  const [dataShorter, setDataShorter] = useState<{
    originalUrl: string;
    shorterUrl: string;
  }>({
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
      const res = await fetch("/api/shorter-url", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .catch(() => {});

      setDataShorter((prev) => ({
        ...prev,
        shorterUrl: res?.data?.shorterUrl,
      }));
    } catch (error) {
      message.error(t("api_error_message"));
    }

    setLoading(false);
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
          <Input size="large" placeholder={t("input_url_placeholder")} />
        </Form.Item>

        <Form.Item<FieldType>
          label={<b>{t("custom_alias_label")}</b>}
          name="customAlias"
        >
          <Input
            size="large"
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
        shorterUrl={dataShorter?.shorterUrl}
        originalUrl={dataShorter?.originalUrl}
      />
    </Flex>
  );
}

export default ContentDetail;
