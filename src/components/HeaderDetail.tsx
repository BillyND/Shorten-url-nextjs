"use client";

import { Flex, Layout } from "antd";
import SwitchLanguage from "./SwitchLanguage";
const { Header } = Layout;

function HeaderDetail() {
  return (
    <Header className="sticky-header">
      <Flex className="width-100-per" align="center">
        <span className="width-100-per logo-shorter-url">ShorterUrls</span>
        <SwitchLanguage />
      </Flex>
    </Header>
  );
}

export default HeaderDetail;
