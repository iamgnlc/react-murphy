import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { fadeIn } from "react-animations";

const fader = keyframes`${fadeIn}`;

const frame = css`
  --size: 1rem;
  margin: var(--size);
  padding: var(--size);
  border: calc(2 * var(--size)) solid #0000;
  outline-offset: calc(-1 * var(--size));
  background: conic-gradient(from 90deg at 1px 1px, #0000 25%, #aaa 0);
  outline: 1px solid #222;
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
  font-style: italic;
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

export const MainTitle = styled.p`
  font-size: 1.5em;
  color: #222;
  text-shadow: 1px 1px 1px #ccc;
`;

export const Law = styled.p`
  font-size: 1em;
  color: #666;
  text-shadow: 1px 1px 1px #ccc;
`;

export const Label = styled.p`
  font-size: 0.7em;
  margin: -0.75rem 0;
  color: #aaa;
`;

export const SubTitle = styled.p`
  font-size: 1.05em;
  color: #222;
  text-shadow: 1px 1px 1px #ccc;
`;

export const SubLaw = styled.p`
  font-size: 0.825em;
  color: #666;
  text-shadow: 1px 1px 1px #ccc;
`;

export const List = styled.ul`
  ${childrenMargin};

  padding-left: 2rem;

  li {
    list-style: circle;
    margin-bottom: 1rem;

    * {
      margin: 0;
    }
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
  color: #c00;
`;
