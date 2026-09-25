import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Head } from "../Head";

describe("Head", () => {
  afterEach(cleanup);

  it("hoists theme-color metas for both colour schemes", () => {
    render(<Head />);

    const dark = document.head.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
    );
    const light = document.head.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
    );

    expect(dark?.getAttribute("content")).toBe("#222");
    expect(light?.getAttribute("content")).toBe("#fff");
  });

  it("renders each capability meta exactly once", () => {
    render(<Head />);

    expect(
      document.head.querySelectorAll('meta[name="mobile-web-app-capable"]')
        .length,
    ).toBe(1);
  });

  it("matches the document title to the environment when provided", () => {
    render(<Head />);

    expect(document.title).toBe(import.meta.env.VITE_TITLE ?? "");
  });
});
