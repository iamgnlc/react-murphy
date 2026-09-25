import { describe, expect, it } from "vitest";

import {
  countWords,
  getRefreshInterval,
  MIN_REFRESH_INTERVAL,
  READING_SPEED_WPM,
} from "../../utils/refreshInterval";

describe("countWords", () => {
  it("counts words in a plain string", () => {
    expect(countWords("Celibacy is not hereditary.")).toBe(4);
  });

  it("returns 0 for an empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("collapses repeated whitespace", () => {
    expect(countWords("one  two\tthree\nfour")).toBe(4);
  });

  it("returns 0 for non-string primitives", () => {
    expect(countWords(null)).toBe(0);
    expect(countWords(undefined)).toBe(0);
    expect(countWords(42)).toBe(0);
    expect(countWords(true)).toBe(0);
  });

  it("sums words across array elements", () => {
    expect(countWords(["one two", "three", 7, null])).toBe(3);
  });

  it("sums words across nested objects and arrays", () => {
    const payload = {
      code: 200,
      data: [
        {
          title: "First Law of Socio-Genetics",
          law: "Celibacy is not hereditary.",
          corollary: { law: "Sins pass down." },
        },
        { laws: ["one", "two three"] },
      ],
      status: "OK",
    };

    // "First Law of Socio-Genetics" (4) + "Celibacy is not hereditary." (4)
    // + "Sins pass down." (3) + "one" (1) + "two three" (2) + "OK" (1) = 15
    expect(countWords(payload)).toBe(15);
  });
});

describe("getRefreshInterval", () => {
  it("is the reading time of the payload in milliseconds", () => {
    // 220 words at 220 wpm = exactly one minute.
    expect(getRefreshInterval("word ".repeat(219) + "word")).toBe(60_000);
  });

  it("scales linearly with word count", () => {
    const words = "a ".repeat(110 - 1) + "a"; // 110 words
    expect(getRefreshInterval(words)).toBe(30_000);
  });

  it("never goes below MIN_REFRESH_INTERVAL", () => {
    expect(getRefreshInterval("short")).toBe(MIN_REFRESH_INTERVAL);
    expect(getRefreshInterval("")).toBe(MIN_REFRESH_INTERVAL);
  });

  it("ignores non-string fields when computing reading time", () => {
    const words = READING_SPEED_WPM / 2; // 110 words -> 30s
    expect(
      getRefreshInterval({ data: Array(words).fill("a"), code: 200 }),
    ).toBe(30_000);
  });
});
