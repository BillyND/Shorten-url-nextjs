"use client";

import { Footer } from "antd/es/layout/layout";
import React from "react";
import { useTranslation } from "react-i18next";

function FooterDetail() {
  const { t } = useTranslation();

  return (
    <Footer style={{ textAlign: "center", background: "transparent" }}>
      ShorterUrls ©{new Date().getFullYear()} {t("created_by")} BillyND
    </Footer>
  );
}

export default FooterDetail;
