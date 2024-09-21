import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Top from "./components/Top";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/top"} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
