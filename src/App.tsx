import React, { type ReactElement, useEffect, useState } from "react";

import { Head } from "./Head";
import { lang } from "./lang";
import { Loading } from "./Loading";
import {
  Container,
  ErrorMessage,
  GlobalStyle,
  Label,
  Law as StyledLaw,
  List as StyledList,
  ListElement,
  Refresh,
  Root,
  Title,
  Wrapper as StyledWrapper,
} from "./styles";
import type { CorollaryProps, ItemProps, LawProps } from "./types/";
import { getRefreshInterval } from "./utils";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const HTTP_OK = 200;

interface ApiResponse {
  code: number;
  data: ItemProps[];
  status?: string;
}

const isApiResponse = (payload: unknown): payload is ApiResponse =>
  typeof payload === "object" &&
  payload !== null &&
  "code" in payload &&
  typeof payload.code === "number" &&
  "data" in payload;

const getErrorStatus = (payload: unknown): string => {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "status" in payload &&
    typeof payload.status === "string" &&
    payload.status.length > 0
  ) {
    return payload.status;
  }
  return "Unexpected response from the API.";
};

type FetchResult =
  | { ok: true; payload: ApiResponse }
  | { ok: false; error: string };

const fetchPayload = async (
  url: string,
  signal?: AbortSignal,
): Promise<FetchResult> => {
  try {
    const response = await fetch(url, { signal });
    const payload: unknown = await response.json();

    if (isApiResponse(payload) && payload.code === HTTP_OK) {
      return { ok: true, payload };
    }
    return { ok: false, error: getErrorStatus(payload) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const Law: React.FC<LawProps> = ({
  item,
  size,
  titleTag = "h2",
}): ReactElement => (
  <>
    {item.title && (
      <Title as={titleTag} size={size?.title}>
        {item.title}
      </Title>
    )}
    {item.law && <StyledLaw size={size?.law}>{item.law}</StyledLaw>}
  </>
);

const List: React.FC<{ items: ItemProps["laws"] }> = ({
  items,
}): ReactElement => (
  <StyledList>
    {items?.map((law) => (
      <ListElement key={JSON.stringify(law)}>
        <Law
          item={typeof law === "string" ? { law } : law}
          size={{ title: "s", law: "s" }}
        />
      </ListElement>
    ))}
  </StyledList>
);

const Corollary: React.FC<{ item: CorollaryProps; locale: string }> = ({
  item,
  locale,
}): ReactElement => (
  <>
    <Label>{lang[locale].corollary}:</Label>
    <Law item={item} size={{ title: "s", law: "s" }} />
  </>
);

const Corollaries: React.FC<{ items: CorollaryProps[]; locale: string }> = ({
  items,
  locale,
}): ReactElement => (
  <>
    <Label>{lang[locale].corollaries}:</Label>
    <StyledList>
      {items.map((item) => (
        <ListElement key={JSON.stringify(item)}>
          <Law item={item} size={{ title: "s", law: "s" }} />
        </ListElement>
      ))}
    </StyledList>
  </>
);

const Wrapper: React.FC<{ item: ItemProps; locale: string }> = ({
  item,
  locale,
}): ReactElement => (
  <StyledWrapper key={JSON.stringify(item)}>
    {item.law && <Law item={item} titleTag="h1" />}
    {item.laws && <List items={item.laws} />}
    {item.corollary && <Corollary item={item.corollary} locale={locale} />}
    {item.corollaries && (
      <Corollaries items={item.corollaries} locale={locale} />
    )}
  </StyledWrapper>
);

const App: React.FC = () => {
  // Both values being empty means a request is in flight, which doubles as
  // the loading state; no separate `setLoading` bookkeeping is needed.
  const [data, setData] = useState<ApiResponse>();
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);
  const loading = data === undefined && error === null;

  const [firstSegment, secondSegment] = window.location.pathname
    .split("/")
    .filter(Boolean);

  const isLang = (value: string | undefined): value is string =>
    value !== undefined && value in lang;

  const locale = isLang(firstSegment) ? firstSegment : "en";
  const num = Number(secondSegment);

  const apiPath = [locale, num && String(num)].filter(Boolean).join("/");
  const apiUrl = `${API_URL}${apiPath}`;

  useEffect(() => {
    const controller = new AbortController();
    let interval: ReturnType<typeof setInterval> | undefined = undefined;

    void (async () => {
      const result = await fetchPayload(apiUrl, controller.signal);
      if (controller.signal.aborted) return;

      if (result.ok) {
        setError(null);
        setData(result.payload);

        // Re-fetch once the reader has had time to read the content.
        interval = setInterval(() => {
          void (async () => {
            const next = await fetchPayload(apiUrl);
            if (next.ok) {
              setError(null);
              setData(next.payload);
            } else {
              setError(next.error);
            }
          })();
        }, getRefreshInterval(result.payload));
      } else {
        setError(result.error);
      }
    })();

    return () => {
      controller.abort();
      if (interval !== undefined) clearInterval(interval);
    };
  }, [apiUrl, requestId]);

  const refresh = (): void => {
    setData(undefined);
    setError(null);
    setRequestId((value) => value + 1);
  };

  return (
    <Root>
      <Head />
      <GlobalStyle />
      <Container>
        {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {data?.data.map((item) => (
          <Wrapper key={JSON.stringify(item)} item={item} locale={locale} />
        ))}
      </Container>
      {!loading && !error && (
        <Refresh onClick={refresh}>{lang[locale].refresh}</Refresh>
      )}
    </Root>
  );
};

export { App };
