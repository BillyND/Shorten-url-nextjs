import ContentDetail from "@/components/ContentDetail";
import FooterDetail from "@/components/FooterDetail";
import HeaderDetail from "@/components/HeaderDetail";
import { Layout } from "antd";

export default function Home() {
  return (
    <Layout>
      <HeaderDetail />
      <ContentDetail />
      <FooterDetail />
    </Layout>
  );
}
