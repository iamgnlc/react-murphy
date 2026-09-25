import { memo } from "react";

const { VITE_TITLE, VITE_AUTHOR }: ImportMetaEnv = import.meta.env;

// React 19 natively hoists <title> and <meta> rendered anywhere in the tree
// into <head> and dedupes them, so no head-manager library is needed.
const Head = memo(() => (
  <>
    {VITE_TITLE !== undefined && (
      <>
        <title>{VITE_TITLE}</title>
        <meta property="og:title" content={VITE_TITLE} />
      </>
    )}
    {VITE_AUTHOR !== undefined && <meta name="author" content={VITE_AUTHOR} />}
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta
      name="theme-color"
      content="#222"
      media="(prefers-color-scheme: dark)"
    />
    <meta
      name="theme-color"
      content="#fff"
      media="(prefers-color-scheme: light)"
    />
  </>
));

Head.displayName = "Head";

export { Head };
