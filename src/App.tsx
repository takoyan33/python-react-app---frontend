import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import ChatGpt from "./ChatGpt";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/result`} element={<Result />} />
        <Route path={`/chatgpt`} element={<ChatGpt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
