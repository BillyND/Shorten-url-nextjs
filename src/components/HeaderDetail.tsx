"use client";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Flex, Layout, Menu } from "antd";
import React from "react";
import SwitchLanguage from "./SwitchLanguage";
const { Header } = Layout;

function HeaderDetail() {
  const items = [UserOutlined, VideoCameraOutlined, UploadOutlined].map(
    (icon, index) => ({
      key: String(index + 1),
      icon: React.createElement(icon),
      label: `nav ${index + 1}`,
    })
  );

  return (
    <Header className="sticky-header">
      <Flex className="width-100-per" align="center">
        <div className="width-100-per"></div>
        {/* <Menu
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
        <SwitchLanguage />
      </Flex>
    </Header>
  );
}

export default HeaderDetail;
