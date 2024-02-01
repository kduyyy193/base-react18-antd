/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_STATUS: string;
  readonly VITE_REACT_APP_URL_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
