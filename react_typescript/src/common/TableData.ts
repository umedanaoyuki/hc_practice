import styled from "styled-components";

// export const TableData = styled.td`
//   color: black;
//   border-collapse: collapse;
//   border: 1px dotted #000099;
//   text-align: center;
//   &:before {
//     content: "";
//     display: block;
//     min-height: 50px;
//     float: left;
//   }
// `;

// export const TableData = styled.td`
//   display: flex;
//   align-items: center; /* 縦方向の中央揃え */
//   justify-content: center; /* 横方向の中央揃え */
//   color: black;
//   border-collapse: collapse;
//   border: 1px dotted #000099;
//   text-align: center;
//   min-height: 50px;
// `;

export const TableData = styled.td`
  color: black;
  border-collapse: collapse;
  border: 1px dotted #000099;
  text-align: center;
  vertical-align: middle; /* 縦方向の中央揃え */
  height: 50px; /* セルの高さを指定 */
`;
