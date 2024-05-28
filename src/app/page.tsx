import ContentDetail from "@/components/ContentDetail";
import FooterDetail from "@/components/FooterDetail";
import HeaderDetail from "@/components/HeaderDetail";
import dbConnect from "@/lib/dbConnect";
import { Flex } from "antd";

export default async function Home() {
  await dbConnect();

  return (
    <Flex vertical>
      <HeaderDetail />
      <ContentDetail />
      <FooterDetail />
    </Flex>
  );
}
