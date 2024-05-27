import { Flex } from "antd";
import { Footer } from "antd/es/layout/layout";
import { FacebookCircle, GithubCircle, InstagramCircle } from "./Icon";
import Link from "next/link";

function FooterDetail() {
  const urlFacebookProfile: any = process.env.FACEBOOK_PROFILE;
  const urlInstagramProfile: any = process.env.INSTAGRAM_PROFILE;
  const urlGithubProfile: any = process.env.GITHUB_PROFILE;

  return (
    <Footer style={{ textAlign: "center", background: "transparent" }}>
      <Flex justify="center" align="center" gap={10}>
        <Link href={urlGithubProfile} target="_blank">
          <GithubCircle className="cursor-pointer" />
        </Link>

        <Link href={urlFacebookProfile} target="_blank">
          <FacebookCircle className="cursor-pointer" />
        </Link>

        <Link href={urlInstagramProfile} target="_blank">
          <InstagramCircle className="cursor-pointer" />
        </Link>
      </Flex>
    </Footer>
  );
}

export default FooterDetail;
