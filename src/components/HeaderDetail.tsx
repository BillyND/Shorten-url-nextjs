"use client";

import { Flex, Layout } from "antd";
import SwitchLanguage from "./SwitchLanguage";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
const { Header } = Layout;

function HeaderDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const handleBackToHome = () => {
    router.push(`/?lang=${lang}`);
  };

  return (
    <Suspense
      fallback={
        <Header className="sticky-header">
          <Flex className="width-100-per" align="center">
            <span className="width-100-per logo-shorter-url">ShorterUrls</span>
            <SwitchLanguage />
          </Flex>
        </Header>
      }
    >
      <Header className="sticky-header">
        <Flex className="width-100-per" align="center">
          <span
            className="width-100-per logo-shorter-url"
            onClick={handleBackToHome}
          >
            ShorterUrls
          </span>
          <SwitchLanguage />
        </Flex>
      </Header>
    </Suspense>
  );
}

export default HeaderDetail;
