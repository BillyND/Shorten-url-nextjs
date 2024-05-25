"use client";

import { Button, Flex, Form, FormProps, Input } from "antd";
import { useState } from "react";
import ResultShorter from "./ResultShorter";
import { UrlMappings } from "@/app/utils/urlMappings";

type FieldType = {
  originalUrl: string;
  customAlias?: string;
};

function ContentDetail() {
  const [shorterUrl, setShorterUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    setLoading(true);

    const resShorterUrl = await fetch("/api/shorter-url", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .catch(() => {});

    setShorterUrl(resShorterUrl?.data?.shorterUrl);
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Flex vertical className="content-detail" justify="center" align="center">
      <Form
        className="form-content"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="URL"
          name="originalUrl"
          rules={[
            { required: true, message: "URL does not have a valid format" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Custom Alias (Optional)"
          name="customAlias"
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit" danger loading={loading}>
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>

      <ResultShorter shorterUrl={shorterUrl} />
    </Flex>
  );
}

export default ContentDetail;
