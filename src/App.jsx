import React, { useState, useEffect } from "react";

import {
  GlobalStyle,
  Container,
  Wrapper,
  MainTitle,
  Law,
  Label,
  SubTitle,
  SubLaw,
  List,
  ListElement,
  ErrorMessage,
} from "./style";

// const API_URL = "http://127.0.0.1:8000/";
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
      {item.title && <MainTitle>{item.title}</MainTitle>}
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
              <SubTitle>{law.title}</SubTitle>
              <Law>{law.law}</Law>
            </>
          )}
        </ListElement>
      ))}
    </List>
  );

  const renderSub = (item) => (
    <>
      {item.title && <SubTitle>{item.title}</SubTitle>}
      {item.law && <SubLaw>{item.law}</SubLaw>}
    </>
  );

  const renderCorollary = ({ corollary }) => (
    <>
      <Label>Corollary:</Label>
      {renderSub(corollary)}
    </>
  );

  const renderCorollaries = ({ corollaries }) => (
    <>
      <Label>Corollaries:</Label>
      <List>
        {corollaries.map((item) => (
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
