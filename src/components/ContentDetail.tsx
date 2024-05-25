"use client";

import { Button, Flex, Form, Input, Tag, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

type RequiredMark = boolean | "optional" | "customize";

const customizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean }
) => (
  <>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </>
);

function ContentDetail() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

  console.log("===>form:", form);

  return (
    <Content>
      <Flex
        className="content-detail"
        justify="center"
        align="center"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Form className="form-content" form={form} layout="vertical">
          <Form.Item label="URL" required tooltip="This is a required field">
            <Input size="large" placeholder="Input url" />
          </Form.Item>

          <Form.Item label="Custom Alias (Optional)">
            <Input size="large" placeholder="Input custom Alias" />
          </Form.Item>

          <Form.Item>
            <Flex justify="end">
              <Button type="primary" danger>
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </Content>
  );
}

export default ContentDetail;
