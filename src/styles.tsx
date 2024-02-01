import { fadeIn } from "react-animations";
import styled, { createGlobalStyle, css, keyframes } from "styled-components";

import { type ISize } from "./types/size.interface";

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
    var(--frame-colour-one) 0
  );
  outline: 1px solid var(--frame-colour-two);
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
      --title-colour: #333;
      --text-colour: #666;
      --label-colour: #aaa;
      --text-shadow-colour: #ccc;
      --radial-colour-one: #fff;
      --radial-colour-two: #ccc;
      --frame-colour-one: #aaa;
      --frame-colour-two: #333;
      --error-colour: #c00;
      --error-shadow-colour: #faa;
    }

    /* Dark mode. */
    @media (prefers-color-scheme: dark) {
      --background-colour: #222;
      --title-colour: #fff;
      --text-colour: #ddd;
      --label-colour: #aaa;
      --text-shadow-colour: #000;
      --radial-colour-one: #222;
      --radial-colour-two: #121212;
      --frame-colour-one: #aaa;
      --frame-colour-two: #ccc;
      --error-colour: #f11;
      --error-shadow-colour: #800;
    }
  }

  ::selection {
    color: var(--background-colour);
    background-color: var(--text-colour);
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
  }

  #root {
    ${verticalCentered}

    height: 100%;
    min-height: 100vh;
    background: radial-gradient(var(--radial-colour-one) 75%, var(--radial-colour-two));
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

  width: 80%;
  animation: 1s ${fader} alternate;
`;

export const Title = styled.p<ISize>`
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

export const Law = styled.p<ISize>`
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

export const ErrorMessage = styled.div`
  color: var(--error-colour);
  text-shadow: 1px 1px 1px var(--error-shadow-colour);
`;
