import React, { useState, useEffect } from "react";

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
} from "./style";

import { Loading } from "./Loading";

const API_URL = "https://murphy.gnlc.me/";
// const API_URL = "http://127.0.0.1:8000/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
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
    } catch (error) {
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

  const renderLaw = (item, size) => (
    <>
      {item.title && <Title size={size?.title}>{item.title}</Title>}
      {item.law && <Law size={size?.law}>{item.law}</Law>}
    </>
  );

  const renderList = (item) => (
    <List>
      {item.laws.map((law) => (
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

  const renderCorollary = ({ corollary: item }) => (
    <>
      <Label>Corollary:</Label>
      {renderLaw(item, { title: "s", law: "s" })}
    </>
  );

  const renderCorollaries = ({ corollaries: items }) => (
    <>
      <Label>Corollaries:</Label>
      <List>
        {items.map((item) => (
          <ListElement>{renderLaw(item, { title: "s", law: "s" })}</ListElement>
        ))}
      </List>
    </>
  );

  const renderWrapper = (item) => (
    <Wrapper key={JSON.stringify(item)}>
      {renderLaw(item)}
      {item.laws && renderList(item)}
      {item.corollary && renderCorollary(item)}
      {item.corollaries && renderCorollaries(item)}
    </Wrapper>
  );

  return (
    <Container>
      <GlobalStyle />
      {loading && <Loading />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data?.data?.map((item, index) => renderWrapper(item, index))}
    </Container>
  );
};

export default App;
