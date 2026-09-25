import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../App";
import { MIN_REFRESH_INTERVAL } from "../utils";

const mockPayload = {
  code: 200,
  data: [
    {
      title: "First Law of Socio-Genetics",
      law: "Celibacy is not hereditary.",
    },
  ],
  status: "OK",
};

type FetchMock = ReturnType<typeof vi.fn> & { mock: { calls: unknown[][] } };

let fetchMock: FetchMock;

const mockFetch = (payload: unknown): void => {
  fetchMock = vi.fn().mockResolvedValue({
    json: async () => payload,
  }) as FetchMock;
  vi.stubGlobal("fetch", fetchMock);
};

// Flush the mocked fetch promise chain without relying on timers.
const flushAsync = async (): Promise<void> => {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
  });
};

describe("App", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders without crashing", async () => {
    mockFetch(mockPayload);
    const { container } = render(<App />);
    await flushAsync();

    expect(container.firstChild).not.toBeNull();
  });

  it("renders laws returned by the API", async () => {
    mockFetch(mockPayload);
    render(<App />);
    await flushAsync();

    expect(screen.getByText("First Law of Socio-Genetics")).toBeDefined();
    expect(screen.getByText("Celibacy is not hereditary.")).toBeDefined();
  });

  it("shows the error message when the API responds with a failure", async () => {
    mockFetch({ code: 404, status: "Not Found" });
    render(<App />);
    await flushAsync();

    expect(screen.getByText("Not Found")).toBeDefined();
    expect(screen.queryByText("First Law of Socio-Genetics")).toBeNull();
  });

  it("shows a network error when the request fails", async () => {
    fetchMock = vi.fn().mockRejectedValue(
      new Error("Network error"),
    ) as FetchMock;
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);
    await flushAsync();

    expect(screen.getByText("Network error")).toBeDefined();
  });

  it("renders the Next button after the content", async () => {
    mockFetch(mockPayload);
    render(<App />);
    await flushAsync();

    const next = screen.getByRole("button", { name: "Next" });
    const content = screen.getByText("First Law of Socio-Genetics");

    // The Next control must come after the content in document order.
    expect(
      content.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("hides the Next button while loading", async () => {
    mockFetch(mockPayload);
    render(<App />);

    // Loading state renders the spinner and no Next button.
    expect(screen.queryByRole("button", { name: "Next" })).toBeNull();
  });

  it("hides the Next button when the API fails", async () => {
    mockFetch({ code: 404, status: "Not Found" });
    render(<App />);
    await flushAsync();

    expect(screen.getByText("Not Found")).toBeDefined();
    expect(screen.queryByRole("button", { name: "Next" })).toBeNull();
  });

  it("refetches and renders new content when Next is clicked", async () => {
    mockFetch(mockPayload);
    render(<App />);
    await flushAsync();

    mockFetch({
      code: 200,
      data: [{ title: "Second Law of Socio-Genetics", law: "New law." }],
    });

    userEvent.click(screen.getByRole("button", { name: "Next" }));
    await flushAsync();

    expect(
      screen.getByText("Second Law of Socio-Genetics"),
    ).toBeDefined();
  });

  it("auto-refreshes after the reading-time interval", async () => {
    vi.useFakeTimers();
    mockFetch(mockPayload);
    render(<App />);
    await flushAsync();

    expect(screen.getByText("First Law of Socio-Genetics")).toBeDefined();
    expect(fetchMock.mock.calls.length).toBe(1);

    mockFetch({
      code: 200,
      data: [{ title: "Auto-refreshed law", law: "Murphy was optimistic." }],
    });

    // Short payload, so the interval equals the minimum. Advance multiple
    // cycles so each refetch has time to settle before the next tick.
    await act(async () => {
      for (let i = 0; i < 5; i++) {
        await vi.advanceTimersByTimeAsync(MIN_REFRESH_INTERVAL);
        await Promise.resolve();
        await Promise.resolve();
      }
    });

    // Refetches happened and the latest content is rendered.
    expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Auto-refreshed law")).toBeDefined();
  });

  it("does not auto-refresh before the interval has elapsed", async () => {
    vi.useFakeTimers();
    mockFetch(mockPayload);
    render(<App />);
    await flushAsync();

    act(() => {
      vi.advanceTimersByTime(MIN_REFRESH_INTERVAL - 1);
    });

    expect(fetchMock.mock.calls.length).toBe(1);
  });
});
