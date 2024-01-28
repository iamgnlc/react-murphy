import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { fadeIn } from "react-animations";

import { Size } from "./types/size.interface";

const fader = keyframes`${fadeIn}`;

const frame = css`
  --size: 1rem;
  margin: var(--size);
  padding: var(--size);
  border: calc(2 * var(--size)) solid #0000;
  outline-offset: calc(-1 * var(--size));
  background: conic-gradient(from 90deg at 1px 1px, #0000 25%, #aaa 0);
  outline: 1px solid #333;
`;

const childrenMargin = css`
  *:first-child {
    margin-top: 0;
  }
  *:last-child {
    margin-bottom: 0;
  }
`;

const vCenter = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    min-height: 100%;
  }
  html,
  body {
    margin: 0;
    width: 100%;
    overscroll-behavior: none;
  }

  #root {
    ${vCenter}

    height: 100%;
    min-height: 100vh;
    background: radial-gradient(#fff 75%, #ccc);
  }
`;

export const Container = styled.div`
  ${vCenter}

  flex-wrap: wrap;
  font-family: Georgia, serif;
  font-size: 150%;
  height: 100%;
  line-height: 2.25rem;
`;

export const Wrapper = styled.div`
  ${frame};
  ${childrenMargin};

  width: 80%;
  animation: 1s ${fader} alternate;
`;

export const Title = styled.p<Size>`
  font-size: ${(props) => {
    switch (props.size) {
      case "s":
        return 1.05;
      case "l":
        return 2.5;
      default:
        return 1.5;
    }
  }}em;

  font-style: normal;
  line-height: 2.75rem;
  color: #333;
  text-shadow: 1px 1px 1px #ccc;
`;

export const Law = styled.p<Size>`
  font-size: ${(props) => {
    switch (props.size) {
      case "s":
        return 0.825;
      case "l":
        return 1.75;
      default:
        return 1;
    }
  }}em;

  font-style: italic;
  color: #666;
  text-shadow: 1px 1px 1px #ccc;
`;

export const Label = styled.p`
  font-size: 0.7em;
  font-style: italic;
  margin: -0.75rem 0;
  color: #aaa;
`;

export const List = styled.ul`
  ${childrenMargin};

  padding-left: 2rem;
`;

export const ListElement = styled.li`
  list-style: circle;
  margin-bottom: 1rem;

  * {
    margin: 0;
  }
`;

export const ErrorMessage = styled.div`
  color: #c00;
  text-shadow: 1px 1px 1px #fcc;
`;
