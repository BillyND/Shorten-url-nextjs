"use client";

import { TIME_DELAY_SWITCH_LANGUAGE } from "@/constants/language";
import { languageSubs } from "@/global-state/initalGlobalState";
import { debounce } from "@/lib/debounce";
import { GlobalOutlined } from "@ant-design/icons";
import { Flex, Switch } from "antd";
import { useSubscription } from "global-state-hook";

const listLanguage: { [key: string]: string } = { VN: "vn", EN: "en" };

function SwitchLanguage() {
  const { setState } = useSubscription(languageSubs);

  const handleSwitchLanguage = debounce((value: boolean) => {
    setState({ language: value ? listLanguage.VN : listLanguage.EN });
  }, TIME_DELAY_SWITCH_LANGUAGE);

  return (
    <Flex gap={8}>
      <GlobalOutlined />
      <Switch
        onChange={handleSwitchLanguage}
        className="switch-language"
        checkedChildren={listLanguage.VN}
        unCheckedChildren={listLanguage.EN}
        defaultChecked
      />
    </Flex>
  );
}

export default SwitchLanguage;
