import "./App.css";
import { AuthProvider } from "./components/AuthProvider";
import DeckDetail from "./components/Decks/DeckDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import DecksPage from "./pages/DecksPage";
import { LoginPage } from "./pages/LoginPage";
import { TestPage } from "./pages/TestPage";
import { TestPage2 } from "./pages/TestPage2";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <TestPage2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decks"
            element={
              <ProtectedRoute>
                <DecksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decks/:id"
            element={
              <ProtectedRoute>
                <DeckDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
