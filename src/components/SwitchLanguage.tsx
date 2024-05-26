"use client";

import React, { Suspense, useEffect, useState } from "react";
import i18n from "@/i18n";
import { GlobalOutlined } from "@ant-design/icons";
import { Flex, Skeleton, Switch } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/lib/debounce";
import { TIME_DELAY_SWITCH_LANGUAGE } from "@/constants/language";

// Define language constants
const LANGUAGES = {
  VN: "vn",
  EN: "en",
} as const;

type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const SwitchLanguageComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(
    lang as Language
  );

  // Change language and update URL
  const setLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("lang", language);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (lang) {
      setLanguage(lang as Language);
      return;
    }

    setLanguage(LANGUAGES.EN);
  }, [lang]);

  const handleSwitchLanguage = () => {
    const newLanguage =
      currentLanguage === LANGUAGES.VN ? LANGUAGES.EN : LANGUAGES.VN;
    setCurrentLanguage(newLanguage);
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

const SwitchLanguage = () => {
  return (
    <Suspense
      fallback={
        <Skeleton.Button
          className="skeleton-switch-lang"
          active={true}
          size={"small"}
          shape={"round"}
          block={false}
        />
      }
    >
      <SwitchLanguageComponent />
    </Suspense>
  );
};

export default SwitchLanguage;
