import { Footer } from "antd/es/layout/layout";
import React from "react";

function FooterDetail() {
  return (
    <Footer style={{ textAlign: "center" }}>
      ShorterUrls ©{new Date().getFullYear()} Created by BillyND
    </Footer>
  );
}

export default FooterDetail;
