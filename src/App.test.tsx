import { cleanup, render } from "@testing-library/react";
import { expect, test } from "vitest";

import { App } from "./App";

test("App renders without crashing", () => {
  const { container } = render(<App />);
  expect(container.firstChild).not.toBeNull();
  cleanup();
});
