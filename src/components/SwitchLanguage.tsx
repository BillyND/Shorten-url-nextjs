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
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");

  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(
    lang as Language
  );

  // Change language and update URL
  const setLanguage = (language: Language): void => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", language);
    i18n.changeLanguage(language);

    const newUrl = `${window.location.pathname}?${params.toString()}${
      window.location.hash
    }`;

    window.history.pushState({}, "", newUrl);
  };

  useEffect(() => {
    if (lang) {
      setLanguage(lang as Language);
      return;
    }

    setLanguage(LANGUAGES.EN);
  }, []);

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
        <Flex gap={8}>
          <GlobalOutlined />
          <Skeleton.Button
            className="skeleton-switch-lang"
            active={true}
            size={"small"}
            shape={"round"}
            block={false}
          />
        </Flex>
      }
    >
      <SwitchLanguageComponent />
    </Suspense>
  );
};

export default SwitchLanguage;
