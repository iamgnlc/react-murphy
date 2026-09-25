import React, {
  type ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  Title,
  Wrapper as StyledWrapper,
} from "./styles";
import type { CorollaryProps, ItemProps, LawProps } from "./types/";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

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
    {items?.map((law, index) => (
      <ListElement key={`i${index}`}>
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
  locale = "en",
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
      {items.map((item, index) => (
        <ListElement key={`i${index}`}>
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: ItemProps[] }>();
  const [error, setError] = useState(null);

  const [firstSegment, secondSegment] = window.location.pathname
    .split("/")
    .filter(Boolean);

  const isLang = (value: string | undefined): value is string =>
    value !== undefined && value in lang;

  const locale = isLang(firstSegment) ? firstSegment : "en";
  const num = Number(secondSegment);

  const apiPath = [locale, num && String(num)].filter(Boolean).join("/");
  const apiUrl = `${API_URL}${apiPath}`;

  const fetchData = useCallback(async (): Promise<void> => {
    fetch(apiUrl)
      .then(async (response) => await response.json())
      .then((data) => {
        if (data.code === 200) {
          setError(null);
          setData(data);
        } else setError(data.status);
      })
      .catch((error) => {
        setData(undefined);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    void fetchData();

    if (REFRESH_INTERVAL) {
      const interval = setInterval(() => {
        void fetchData();
      }, REFRESH_INTERVAL);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <>
      <Head />
      <GlobalStyle />
      <Container>
        {loading && <Loading />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {data?.data?.map((item: ItemProps, index) => (
          <Wrapper key={`i${index}`} item={item} locale={locale} />
        ))}
      </Container>
    </>
  );
};

export { App };
