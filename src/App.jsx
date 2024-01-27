import React, { useState, useEffect } from "react";

import {
  GlobalStyle,
  Container,
  LawWrapper,
  Title,
  Law,
  Laws,
  ErrorMessage,
} from "./style";

const API_URL = "https://murphy.gnlc.me/";

const REFRESH_INTERVAL = 10000;

const FetchDataComponent = () => {
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

    const interval = setInterval(() => {
      fetchData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // return null;

  return (
    <Container>
      <GlobalStyle />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {data?.data?.map((item, index) => (
        <LawWrapper key={index}>
          {item.title && <Title>{item.title}</Title>}
          {item.law && <Law>{item.law}</Law>}
          {item.laws && (
            <Laws>
              {item.laws.map((law) => (
                <Law as="li">{law}</Law>
              ))}
            </Laws>
          )}
        </LawWrapper>
      ))}
    </Container>
  );
};

export default FetchDataComponent;
