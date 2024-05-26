"use client";

import { TIME_DELAY_SWITCH_LANGUAGE } from "@/constants/language";
import { getCurrentLang, setCurrentLang } from "@/i18n";
import { debounce } from "@/lib/debounce";
import { GlobalOutlined } from "@ant-design/icons";
import { Flex, Switch } from "antd";
import { useState } from "react";

const listLanguage: { [key: string]: string } = { vn: "vn", en: "en" };

function SwitchLanguage() {
  const [currentLanguageState, setCurrentLanguageState] = useState<string>(
    getCurrentLang()
  );

  const handleSwitchLanguage = (value: boolean) => {
    console.log("===>value:", value);
    const newLanguage =
      currentLanguageState === listLanguage.vn
        ? listLanguage.en
        : listLanguage.vn;

    setCurrentLanguageState(newLanguage);
    setCurrentLang(newLanguage);
  };

  return (
    <Flex gap={8}>
      <GlobalOutlined />
      <Switch
        checked={currentLanguageState === listLanguage.vn}
        onChange={handleSwitchLanguage}
        className="switch-language"
        checkedChildren={listLanguage.vn.toUpperCase()}
        unCheckedChildren={listLanguage.en.toUpperCase()}
        defaultChecked
      />
    </Flex>
  );
}

export default SwitchLanguage;
