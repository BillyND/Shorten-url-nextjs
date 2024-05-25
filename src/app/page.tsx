import ContentDetail from "@/components/ContentDetail";
import FooterDetail from "@/components/FooterDetail";
import HeaderDetail from "@/components/HeaderDetail";
import { Flex } from "antd";

export default function Home() {
  return (
    <Flex vertical>
      {/* <HeaderDetail /> */}
      <ContentDetail />
      <FooterDetail />
    </Flex>
  );
}
