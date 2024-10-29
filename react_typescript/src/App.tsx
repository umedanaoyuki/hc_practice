import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./components/Top";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url("/backgroundImage.jpg")
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter basename="/react_typescript">
        <Routes>
          <Route path={"/"} element={<Top />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
