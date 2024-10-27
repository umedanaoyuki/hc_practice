import styled from "styled-components";

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 20px 20px;
  background-color: ${({ $active }) => ($active ? "#007BFF" : "#f1f1f1")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  border: none;
  border-bottom: ${({ $active }) => ($active ? "2px solid #007BFF" : "none")};
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 32px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;
