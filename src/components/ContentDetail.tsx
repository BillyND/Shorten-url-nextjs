"use client";

import { Button, Flex, Form, FormProps, Input, message } from "antd";
import { useState } from "react";
import ResultShorter from "./ResultShorter";
import { useTranslation } from "react-i18next";

type FieldType = {
  originalUrl: string;
  customAlias?: string;
};

function ContentDetail() {
  const [shorterUrl, setShorterUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  message.config({
    maxCount: 3,
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);

    try {
      const res = await fetch("/api/shorter-url", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .catch(() => {});

      setShorterUrl(res?.data?.shorterUrl);
    } catch (error) {
      message.error(t("api_error_message"));
    }

    setLoading(false);
  };

  return (
    <Flex vertical className="content-detail" justify="center" align="center">
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
              message: "",
            },
            { type: "url", message: "" },
          ]}
        >
          <Input size="large" />
          <span>oki</span>
        </Form.Item>

        <Form.Item<FieldType>
          label={<b>{t("custom_alias_label")}</b>}
          name="customAlias"
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit" loading={loading} danger>
              {t("submit_form_shorter_url")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>

      <ResultShorter shorterUrl={shorterUrl} />
    </Flex>
  );
}

export default ContentDetail;
