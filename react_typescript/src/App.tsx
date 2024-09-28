import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import Top from "./components/Top";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0e101c;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <GlobalStyle />
                <Login />
              </>
            }
          />
          <Route path={"/top"} element={<Top />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
