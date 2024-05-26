"use client";

import { TIME_DELAY_SWITCH_LANGUAGE } from "@/constants/language";
import i18n from "@/i18n";
import { debounce } from "@/lib/debounce";
import { GlobalOutlined } from "@ant-design/icons";
import { Flex, Switch } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define language constants
const LANGUAGES = {
  VN: "vn",
  EN: "en",
} as const;

type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const SwitchLanguage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(
    lang as Language
  );

  // Change language and update URL
  const setLanguage = debounce((language: Language) => {
    console.log("===>language", language);

    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("lang", language);
    router.push(`?${newParams.toString()}`);
  }, TIME_DELAY_SWITCH_LANGUAGE);

  useEffect(() => {
    if (lang) {
      setLanguage(lang as Language);
    }

    if (!lang) {
      setLanguage(LANGUAGES.EN);
    }
  }, [lang]);

  const handleSwitchLanguage = () => {
    const newLanguage =
      currentLanguage === LANGUAGES.VN ? LANGUAGES.EN : LANGUAGES.VN;
    setLanguage(newLanguage);
  };

  return (
    <Flex gap={8}>
      <GlobalOutlined />
      <Switch
        checked={currentLanguage === LANGUAGES.VN}
        onChange={handleSwitchLanguage}
        className="switch-language"
        checkedChildren={LANGUAGES.VN.toUpperCase()}
        unCheckedChildren={LANGUAGES.EN.toUpperCase()}
        defaultChecked
      />
    </Flex>
  );
};

export default SwitchLanguage;
