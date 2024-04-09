import { fadeIn } from "react-animations";
import styled, { createGlobalStyle, css, keyframes } from "styled-components";

import { type SizeProps } from "./types/size.interface";

const fader = keyframes`${fadeIn}`;

const frame = css`
  --size: 1rem;
  margin: var(--size);
  padding: var(--size);
  border: calc(2 * var(--size)) solid #0000;
  outline-offset: calc(-1 * var(--size));
  background: conic-gradient(
    from 90deg at 1px 1px,
    #0000 25%,
    var(--frame-colour-inside) 0
  );
  outline: 1px solid var(--frame-colour-outside);
`;

const childrenMargin = css`
  *:first-child {
    margin-top: 0;
  }
  *:last-child {
    margin-bottom: 0;
  }
`;

const verticalCentered = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Light mode. */
    @media (prefers-color-scheme: light) {
      --background-colour: #fff;
      --radial-colour: #ccc;
      --title-colour: #333;
      --text-colour: #666;
      --label-colour: #aaa;
      --text-shadow-colour: #ccc;
      --frame-colour-inside: #aaa;
      --frame-colour-outside: #333;
      --error-colour: #c00;
      --error-shadow-colour: #faa;
    }

    /* Dark mode. */
    @media (prefers-color-scheme: dark) {
      --background-colour: #222;
      --radial-colour: #101010;
      --title-colour: #fff;
      --text-colour: #cdcdcd;
      --label-colour: #aaa;
      --text-shadow-colour: #000;
      --frame-colour-inside: #fff;
      --frame-colour-outside: #cdcdcd;
      --error-colour: #f11;
      --error-shadow-colour: #800;
    }
  }

  ::selection {
    color: var(--background-colour);
    background-color: var(--text-colour);
  }

  :is(h1, h2, h3, h4, h5, h6) {
    font-weight: normal;
  }

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
    background-color: var(--background-colour);
  }

  #root {
    ${verticalCentered}

    height: 100%;
    min-height: 100vh;
    background: radial-gradient(var(--background-colour) 75%, var(--radial-colour));
  }
`;

export const Container = styled.div`
  ${verticalCentered}
  flex-wrap: wrap;

  font-family: Georgia, serif;
  font-size: 150%;
  height: 100%;
  line-height: 2.25rem;
`;

export const Wrapper = styled.div`
  ${frame};
  ${childrenMargin};

  animation: 1s ${fader} alternate;
  flex: 0 0 35%;
  flex-grow: 0.8;
`;

export const Title = styled.p<SizeProps>`
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
  color: var(--title-colour);
  text-shadow: 1px 1px 1px var(--text-shadow-colour);
`;

export const Law = styled.p<SizeProps>`
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
  color: var(--text-colour);
  text-shadow: 1px 1px 1px var(--text-shadow-colour);
`;

export const Label = styled.p`
  font-size: 0.7em;
  font-style: italic;
  margin: -0.75rem 0;
  color: var(--label-colour);
`;

export const List = styled.ul`
  ${childrenMargin};

  padding-left: 2rem;

  li::marker {
    color: var(--text-colour);
  }
`;

export const ListElement = styled.li`
  list-style: circle;
  margin-bottom: 1rem;

  * {
    margin: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--error-colour);
  text-shadow: 1px 1px 1px var(--error-shadow-colour);
`;
