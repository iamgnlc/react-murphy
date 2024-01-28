import React, { useState, useEffect, type ReactNode } from "react";

import {
  GlobalStyle,
  Container,
  Wrapper,
  Title,
  Law,
  Label,
  List,
  ListElement,
  ErrorMessage,
} from "./styles";

import { Loading } from "./Loading";

import { Item, Corollary } from "./types/item.interface";
import { Size } from "./types/size.interface";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

const App = (): ReactNode => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: Item[] }>();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();

    if (Boolean(REFRESH_INTERVAL)) {
      const interval = setInterval(() => {
        fetchData();
      }, REFRESH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, []);

  const renderLaw = (item: Item, size?: { [key: string]: Size["size"] }) => (
    <>
      {item.title && <Title size={size?.title}>{item.title}</Title>}
      {item.law && <Law size={size?.law}>{item.law}</Law>}
    </>
  );

  const renderList = (item: Item) => (
    <List>
      {item.laws?.map((law) => (
        <ListElement>
          {typeof law === "string" ? (
            <Law>{law}</Law>
          ) : (
            renderLaw(law, { title: "s" })
          )}
        </ListElement>
      ))}
    </List>
  );

  const renderCorollary = (corollary: Corollary) => (
    <>
      <Label>Corollary:</Label>
      {renderLaw(corollary, { title: "s", law: "s" })}
    </>
  );

  const renderCorollaries = (corollaries: Corollary[]) => (
    <>
      <Label>Corollaries:</Label>
      <List>
        {corollaries.map((corollary) => (
          <ListElement>
            {renderLaw(corollary, { title: "s", law: "s" })}
          </ListElement>
        ))}
      </List>
    </>
  );

  const renderWrapper = (item: Item) => (
    <Wrapper key={JSON.stringify(item)}>
      {renderLaw(item)}
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

export default App;
