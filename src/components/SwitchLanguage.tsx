"use client";

import i18n from "@/i18n";
import { GlobalOutlined } from "@ant-design/icons";
import { Flex, Switch } from "antd";
import { useState } from "react";

const listLanguage: { [key: string]: string } = { vn: "vn", en: "en" };

// Function to get the current language using localStorage
export function getCurrentLang(): string {
  if (localStorage) {
    // Retrieve the language preference from localStorage
    const storedLang = localStorage?.getItem("language");

    // If the language preference exists in localStorage, return it
    // Otherwise, return a default language ("en" for English)
    return storedLang || "vn";
  }

  return "vn";
}

export function setCurrentLang(language: string): void {
  if (localStorage) {
    localStorage?.setItem("language", language);
  }

  i18n.changeLanguage(language);
}

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
