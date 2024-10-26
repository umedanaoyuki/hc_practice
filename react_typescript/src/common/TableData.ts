import styled from "styled-components";

export const TableData = styled.td`
  color: black;
  border-collapse: collapse;
  border: 1px dotted #000099;
  text-align: center;
  &:before {
    content: "";
    display: block;
    min-height: 50px;
    float: left;
  }
`;
