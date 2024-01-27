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

const API_URL = "https://murphy.gnlc.me/";

const REFRESH_INTERVAL = 10000; // 0 to disable auto-refresh.

const App = () => {
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
    }
  };

  useEffect(() => {
    fetchData();

    if (Boolean(REFRESH_INTERVAL)) {
      const interval = setInterval(() => {
        fetchData();
      }, REFRESH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, []);

  const renderLaw = (item) => (
    <>
      {item.title && <Title>{item.title}</Title>}
      {item.law && <Law>{item.law}</Law>}
    </>
  );

  const renderLaws = (item) => (
    <List>
      {item.laws.map((law) => (
        <ListElement>
          {typeof law === "string" ? (
            <Law>{law}</Law>
          ) : (
            <>
              <Title small>{law.title}</Title>
              <Law>{law.law}</Law>
            </>
          )}
        </ListElement>
      ))}
    </List>
  );

  const renderSub = (item) => (
    <>
      {item.title && <Title small>{item.title}</Title>}
      {item.law && <Law small>{item.law}</Law>}
    </>
  );

  const renderCorollary = ({ corollary: item }) => (
    <>
      <Label>Corollary:</Label>
      {renderSub(item)}
    </>
  );

  const renderCorollaries = ({ corollaries: items }) => (
    <>
      <Label>Corollaries:</Label>
      <List>
        {items.map((item) => (
          <ListElement>{renderSub(item)}</ListElement>
        ))}
      </List>
    </>
  );

  const renderWrapper = (item, index) => (
    <Wrapper key={`${index}${Math.random()}`}>
      {renderLaw(item)}
      {item.laws && renderLaws(item)}
      {item.corollary && renderCorollary(item)}
      {item.corollaries && renderCorollaries(item)}
    </Wrapper>
  );

  return (
    <Container>
      <GlobalStyle />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data?.data?.map((item, index) => renderWrapper(item, index))}
    </Container>
  );
};

export default App;
