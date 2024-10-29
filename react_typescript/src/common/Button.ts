import styled from "styled-components";

export const Button = styled.button<{ $primary?: boolean }>`
  padding: 20px 20px;
  background: ${(props) => (props.$primary ? "#ff6b3a" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#0067C0")};
  font-size: 1em;
  margin-left: 1em;
  cursor: pointer;
  border-radius: 32px;
  outline: none;
  &:hover {
    background-color: #ffc61a;
    color: black;
  }
`;
