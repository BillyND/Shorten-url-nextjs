import ContentDetail from "@/components/ContentDetail";
import FooterDetail from "@/components/FooterDetail";
import HeaderDetail from "@/components/HeaderDetail";
import dbConnect from "@/lib/dbConnect";
import { Flex } from "antd";

// Ensure database connection when the application starts
dbConnect();

export default function Home() {
  return (
    <Flex vertical>
      <HeaderDetail />
      <ContentDetail />
      <FooterDetail />
    </Flex>
  );
}
