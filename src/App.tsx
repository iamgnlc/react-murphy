import React, { type ReactElement, useEffect, useState } from "react";

import { Loading } from "./Loading";
import {
  Container,
  ErrorMessage,
  GlobalStyle,
  Label,
  Law as StyledLaw,
  List,
  ListElement,
  Title,
  Wrapper,
} from "./styles";
import { type Corollary, type Item, type Size } from "./types/";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

const Law: React.FC<{
  item: Item;
  size?: { [key in string]: Size["size"] };
}> = ({ item, size }): ReactElement => (
  <>
    {item.title && <Title size={size?.title}>{item.title}</Title>}
    {item.law && <StyledLaw size={size?.law}>{item.law}</StyledLaw>}
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: Item[] }>();
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

  // const renderLaw = (
  //   item: Item,
  //   size?: { [key in string]: Size["size"] }
  // ): ReactElement => (
  //   <>
  //     {item.title && <Title size={size?.title}>{item.title}</Title>}
  //     {item.law && <Law size={size?.law}>{item.law}</Law>}
  //   </>
  // );

  const renderList = (item: Item): ReactElement => (
    <List>
      {item.laws?.map((law) => (
        <ListElement key={JSON.stringify(law)}>
          <Law
            item={typeof law === "string" ? { law } : law}
            size={{ title: "s", law: "s" }}
          />
        </ListElement>
      ))}
    </List>
  );

  const renderCorollary = (item: Corollary): ReactElement => (
    <>
      <Label>Corollary:</Label>
      <Law item={item} size={{ title: "s", law: "s" }} />
    </>
  );

  const renderCorollaries = (items: Corollary[]): ReactElement => (
    <>
      <Label>Corollaries:</Label>
      <List>
        {items.map((item) => (
          <ListElement key={JSON.stringify(item)}>
            <Law item={item} size={{ title: "s", law: "s" }} />
          </ListElement>
        ))}
      </List>
    </>
  );

  const renderWrapper = (item: Item): ReactElement => (
    <Wrapper key={JSON.stringify(item)}>
      <Law item={item} />
      {item.laws && renderList(item)}
      {item.corollary && renderCorollary(item.corollary)}
      {item.corollaries && renderCorollaries(item.corollaries)}
    </Wrapper>
  );

  return (
    <Container>
      <GlobalStyle />
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data?.data?.map((item: Item) => renderWrapper(item))}
    </Container>
  );
};

export { App };
