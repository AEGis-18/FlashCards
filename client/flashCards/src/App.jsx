import "./App.css";
import { AuthProvider } from "./components/AuthProvider";
import DeckDetail from "./components/Decks/DeckDetail";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { CreateDeckPage } from "./pages/CreateDeckPage";
import { FlashCardsPage } from "./pages/FlashCardsPage";
import { FlashDecksPage } from "./pages/FlashDecksPage";
import { LoginPage } from "./pages/LoginPage";
import { MyDecksPage } from "./pages/MyDecksPage";
import { PublicDecksPage } from "./pages/PublicDecksPage";
import { SignUpPage } from "./pages/SignUpPage";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
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
                <HomePage />
              </>
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
                <FlashDecksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/flash-cards/:id"
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
