interface ImportMetaEnv {
  readonly VITE_TITLE: string | undefined;
  readonly VITE_AUTHOR: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
