"use client";

import { Button, Flex, Form, FormProps, Input, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import ResultShorter from "./ResultShorter";
import { useState } from "react";

type FieldType = {
  originalUrl: string;
  customAlias?: string;
};

function ContentDetail() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [shorterUrl, setShorterUrl] = useState<string>("");

  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    const resShorterUrl = await fetch("/api/shorter-url", {
      method: "POST",
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setShorterUrl(resShorterUrl?.data?.shorterUrl);

    console.log("Success:", values);
    console.log("===> resShorterUrl:", resShorterUrl);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <Flex
        vertical
        className="content-detail"
        justify="center"
        align="center"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
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
              <Button type="primary" htmlType="submit" danger>
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Form>

        <ResultShorter shorterUrl={shorterUrl} />
      </Flex>
    </Content>
  );
}

export default ContentDetail;
