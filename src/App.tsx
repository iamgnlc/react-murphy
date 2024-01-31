import React, { type ReactElement, useEffect, useState } from "react";

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
  Wrapper,
} from "./styles";
import { type ICorollary, type IItem, type ISize } from "./types/";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

interface LawProps {
  item: IItem;
  size?: { [key in string]: ISize["size"] };
}

const Law: React.FC<LawProps> = ({ item, size }): ReactElement => (
  <>
    {item.title && <Title size={size?.title}>{item.title}</Title>}
    {item.law && <StyledLaw size={size?.law}>{item.law}</StyledLaw>}
  </>
);

const List: React.FC<{ item: IItem }> = ({ item }): ReactElement => (
  <StyledList>
    {item.laws?.map((law) => (
      <ListElement key={JSON.stringify(law)}>
        <Law
          item={typeof law === "string" ? { law } : law}
          size={{ title: "s", law: "s" }}
        />
      </ListElement>
    ))}
  </StyledList>
);

const Corollary: React.FC<{ item: ICorollary }> = ({ item }): ReactElement => (
  <>
    <Label>Corollary:</Label>
    <Law item={item} size={{ title: "s", law: "s" }} />
  </>
);

const Corollaries: React.FC<{ items: ICorollary[] }> = ({
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

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: IItem[] }>();
  const [error, setError] = useState(null);

  const fetchData = async (): Promise<void> => {
    fetch(API_URL)
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        setError(null);
        setData(data);
      })
      .catch((error) => {
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

  const renderWrapper = (item: IItem): ReactElement => (
    <Wrapper key={JSON.stringify(item)}>
      <Law item={item} />
      {item.laws && <List item={item} />}
      {item.corollary && <Corollary item={item.corollary} />}
      {item.corollaries && <Corollaries items={item.corollaries} />}
    </Wrapper>
  );

  return (
    <Container>
      <GlobalStyle />
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data?.data?.map((item: IItem) => renderWrapper(item))}
    </Container>
  );
};

export { App };
