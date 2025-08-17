import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { TestPage } from "./pages/TestPage";
import { TestPage2 } from "./pages/TestPage2";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<TestPage />} />
        <Route path="/notes" element={<TestPage2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
