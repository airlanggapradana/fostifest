/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_BASE_URL: string;
  // tambahin env lain kalau ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
