import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

export function LoginPage() {
  useEffect(() => {
    document.title = "Login - Flash Cards";
  }, []);

  return (
    <>
      <LoginForm />
    </>
  );
}
