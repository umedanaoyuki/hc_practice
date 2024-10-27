import styled from "styled-components";

export const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? "#ff6b3a" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#0067C0")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => (props.$primary ? "FF6B3A" : "#659ad2")};
  border-radius: 3px;
`;
