import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./components/Top";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url("./../public/backgroundImage.jpg")
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Top />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
