import "./App.css";
import { AuthProvider } from "./components/AuthProvider";
import DeckDetail from "./components/Decks/DeckDetail";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { CreateDeckPage } from "./pages/CreateDeckPage";
import { FlashCardsPage } from "./pages/FlashCardsPage";
import { LoginPage } from "./pages/LoginPage";
import { MyDecksPage } from "./pages/MyDecksPage";
import { PublicDecksPage } from "./pages/PublicDecksPage";
import { TestPage } from "./pages/TestPage";
import { TestPage2 } from "./pages/TestPage2";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/*
          <Route
            path="/public-decks"
            element={
              <>
              <NavBar/>
                <PublicDecksPage />
                </>
            }
          />

         */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <TestPage />
              </>
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
            path="/my-decks"
            element={
              <ProtectedRoute>
                <MyDecksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-decks/:id"
            element={
              <ProtectedRoute>
                <DeckDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-decks/create"
            element={
              <ProtectedRoute>
                <CreateDeckPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/flash-cards"
            element={
              <ProtectedRoute>
                <FlashCardsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
