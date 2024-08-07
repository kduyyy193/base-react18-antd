import { ComponentType, useEffect, useRef } from "react";
import { TIME_BUILD } from "./constants";

type MetaData = {
  buildDate: number;
};

const withClearCache = (Component: ComponentType) => {
  return function ClearCacheComponent(props: object) {
    const componentMounted = useRef(false);

    useEffect(() => {
      if (!componentMounted.current) {
        fetch("/meta.json", { cache: "no-cache" })
          .then((response) => response.json() as Promise<MetaData>)
          .then((meta: MetaData) => {
            const latestVersionDate = meta.buildDate;
            let currentVersionDate = localStorage.getItem(TIME_BUILD) || 0;
            currentVersionDate = parseInt(currentVersionDate as string);
            if (!currentVersionDate || latestVersionDate > currentVersionDate) {
              localStorage.clear();
              localStorage.setItem(TIME_BUILD, new Date().getTime().toString());
              refreshCacheAndReload();
            }
          });
        componentMounted.current = true;
      }
    }, []);

    const refreshCacheAndReload = () => {
      if (caches) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
    };

    return <Component {...props} />;
  };
};

export default withClearCache;
