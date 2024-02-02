import { useEffect, useRef } from 'react';
import { timeBuild } from './constants';

type MetaData = {
  buildDate: number;
};

interface ComponentProps {}

const withClearCache = <T extends ComponentProps>(
  Component: React.ComponentType<T>
): React.FC<T> => {
  return function ClearCacheComponent(props: T) {
    const componentMounted = useRef(false);

    useEffect(() => {
      if (!componentMounted.current) {
        fetch('/meta.json', { cache: 'no-cache' })
          .then((response) => response.json() as Promise<MetaData>)
          .then((meta: MetaData) => {
            const latestVersionDate = meta.buildDate;
            let currentVersionDate = localStorage.getItem(timeBuild) || 0;
            currentVersionDate = parseInt(currentVersionDate as string);
            if (!currentVersionDate || latestVersionDate > currentVersionDate) {
              localStorage.clear();
              localStorage.setItem(timeBuild, new Date().getTime().toString());
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
      window.location.reload();
    };

    return <Component {...props} />;
  };
};

export default withClearCache;
