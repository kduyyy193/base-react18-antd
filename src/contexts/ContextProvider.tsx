import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as dayjs from "dayjs";
import { ConfigProvider } from "antd";
import { Locale } from "antd/es/locale";
import viVN from "antd/lib/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";

import { TUser } from "common/interface";
import { KEY_TOKEN } from "services/config";
import { KEY_USER } from "../constants";

type IContextProps = {
  user: TUser;
  token: string | null;
  locale: Locale | null;
  setToken: (token: string | null) => void;
  setLocale: (locale: Locale) => void;
  setUser: (user: TUser) => void;
  logout: () => void;
  changeLanguage: (values: string) => void;
};

const StateContext = createContext<IContextProps>({
  user: {},
  token: null,
  locale: enUS,
  setToken: () => {
    //
  },
  setUser: () => {
    //
  },
  setLocale: () => {},
  logout: () => {
    //
  },
  changeLanguage: () => {
    //
  },
});

type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<TUser>({});
  const [token, setToken] = useState(localStorage.getItem(KEY_TOKEN));
  const [locale, setLocale] = useState(enUS);
  const { i18n } = useTranslation();

  const _setToken = (token: string | null) => {
    if (token) {
      setToken(token);
      localStorage.setItem(KEY_TOKEN, token);
    }
  };

  const logout = () => {
    setUser({});
    setToken(null);
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USER);
  };

  const changeLanguage = useCallback(
    (values: string | null) => {
      const isReload = localStorage.getItem("i18nextLng") !== values;
      if (values) {
        i18n.changeLanguage(values);
        dayjs.locale(values);
      }
      if (isReload) {
        location.reload();
      }
      axios.defaults.headers.common["X-localization"] = values;
      if (values === "vi") {
        setLocale(viVN);
      }
      if (values === "en") {
        setLocale(enUS);
      }
    },
    [i18n]
  );

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")) {
      changeLanguage(localStorage.getItem("i18nextLng"));
    }
  }, [changeLanguage]);

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        locale,
        setLocale,
        setUser,
        setToken: _setToken,
        logout,
        changeLanguage,
      }}
    >
      <ConfigProvider locale={locale}>{children}</ConfigProvider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
