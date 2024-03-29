import React, { memo } from "react";
import { Helmet } from "react-helmet";

const title = process.env.REACT_APP_TITLE;

const Head = memo(() => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="author" content={process.env.REACT_APP_AUTHOR} />
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
