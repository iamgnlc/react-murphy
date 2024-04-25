import React, { type ReactElement, useEffect, useState } from "react";

import { Head } from "./Head";
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
import { type CorollaryProps, type ItemProps, type SizeProps } from "./types/";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

interface LawProps {
  titleTag?: "h1" | "h2" | "h3";
  item: ItemProps;
  size?: { [key in string]: SizeProps["size"] };
}

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

const Corollary: React.FC<{ item: CorollaryProps }> = ({
  item,
}): ReactElement => (
  <>
    <Label>Corollary:</Label>
    <Law item={item} size={{ title: "s", law: "s" }} />
  </>
);

const Corollaries: React.FC<{ items: CorollaryProps[] }> = ({
  items,
}): ReactElement => (
  <>
    <Label>Corollaries:</Label>
    <StyledList>
      {items.map((item) => (
        <ListElement key={JSON.stringify(item)}>
          <Law item={item} size={{ title: "s", law: "s" }} />
        </ListElement>
      ))}
    </StyledList>
  </>
);

const Wrapper: React.FC<{ item: ItemProps }> = ({ item }): ReactElement => (
  <StyledWrapper key={JSON.stringify(item)}>
    <Law item={item} titleTag="h1" />
    {item.laws && <List items={item.laws} />}
    {item.corollary && <Corollary item={item.corollary} />}
    {item.corollaries && <Corollaries items={item.corollaries} />}
  </StyledWrapper>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: ItemProps[] }>();
  const [error, setError] = useState(null);

  const fetchData = async (): Promise<void> => {
    fetch(API_URL)
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
  };

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
        {data?.data?.map((item: ItemProps) => (
          <Wrapper key={JSON.stringify(item)} item={item} />
        ))}
      </Container>
    </>
  );
};

export { App };
