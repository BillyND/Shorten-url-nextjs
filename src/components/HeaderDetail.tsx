"use client";

import { Flex, Layout } from "antd";
import SwitchLanguage from "./SwitchLanguage";
import { useRouter, useSearchParams } from "next/navigation";
const { Header } = Layout;

function HeaderDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const handleBackToHome = () => {
    router.push(`/?lang=${lang}`);
  };

  return (
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
  );
}

export default HeaderDetail;
