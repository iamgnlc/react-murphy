import { memo } from "react";
import { Helmet } from "react-helmet";

const { VITE_TITLE, VITE_AUTHOR }: ImportMetaEnv = import.meta.env;

const Head = memo(() => (
  <Helmet>
    <title>{VITE_TITLE}</title>
    <meta property="og:title" content={VITE_TITLE} />
    <meta name="author" content={VITE_AUTHOR} />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="mobile-web-app-capable" content="yes" />
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
  </Helmet>
));

Head.displayName = "Head";

export { Head };
