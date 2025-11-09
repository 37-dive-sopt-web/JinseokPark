import styled from "@emotion/styled";
import { theme } from "../theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  width: 100vw;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 3rem;
  }

  button {
    padding: 1rem 2rem;
    border-radius: 1.6rem;
    border: none;
    background-color: ${theme.colors.point};
    font-size: 1.5rem;
    color: white;
    transition: all 0.5s ease;
  }

  button:hover {
    transform: translateY(-0.5rem);
  }
`;
