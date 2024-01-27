import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    width: 100%;
    height: 100%;
    overscroll-behavior: none;
    
  }

  p, li {
    margin-top:  0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Container = styled.div`
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 150%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LawWrapper = styled.div`
  width: 80%;
  --size: 1rem;
  margin: var(--size);
  padding: var(--size);
  border: calc(2 * var(--size)) solid #0000;
  outline-offset: calc(-1 * var(--size));
  background: conic-gradient(from 90deg at 1px 1px, #0000 25%, #777 0);
  outline: 1px solid #222;
`;

export const Title = styled.p`
  font-size: 1.5em;
  color: #ccc;
  text-shadow: 1px 1px 1px #333;
`;

export const Law = styled.p`
  font-size: 1em;
  line-height: 1.5em;
  color: #222;
`;

export const Laws = styled.ul`
  li {
    list-style: circle;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
`;
