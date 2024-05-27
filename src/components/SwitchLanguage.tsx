"use client";

import i18n from "@/i18n";
import { GlobalOutlined } from "@ant-design/icons";
import { Flex, Skeleton, Switch } from "antd";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Define language constants
const LANGUAGES = {
  VN: "vn",
  EN: "en",
} as const;

type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

const LanguageSwitcherComponent = () => {
  const searchParams = useSearchParams();
  const urlLang = searchParams.get("lang");

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    (urlLang as Language) || LANGUAGES.EN
  );

  const updateLanguageInUrl = (language: Language): void => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", language);
    i18n.changeLanguage(language);

    const newUrl = `${window.location.pathname}?${params.toString()}${
      window.location.hash
    }`;
    window.history.pushState({}, "", newUrl);
  };

  useEffect(() => {
    if (urlLang) {
      updateLanguageInUrl(urlLang as Language);
    } else {
      updateLanguageInUrl(LANGUAGES.EN);
    }
  }, [urlLang]);

  const handleLanguageSwitch = () => {
    const newLanguage =
      currentLanguage === LANGUAGES.VN ? LANGUAGES.EN : LANGUAGES.VN;
    setCurrentLanguage(newLanguage);
    updateLanguageInUrl(newLanguage);
  };

  return (
    <Flex gap={8}>
      <GlobalOutlined />
      <Switch
        checked={currentLanguage === LANGUAGES.VN}
        onChange={handleLanguageSwitch}
        className="switch-language"
        checkedChildren={LANGUAGES.VN.toUpperCase()}
        unCheckedChildren={LANGUAGES.EN.toUpperCase()}
      />
    </Flex>
  );
};

const LanguageSwitcher = () => {
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
          />
        </Flex>
      }
    >
      <LanguageSwitcherComponent />
    </Suspense>
  );
};

export default LanguageSwitcher;
