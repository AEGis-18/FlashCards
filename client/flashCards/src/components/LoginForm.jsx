import { DefaultForm } from "./DefaultForm";
import { TextInput } from "./formElements/TextInput";
import { Label } from "./formElements/Label";
import { Button } from "./formElements/Button";
import { PasswordInput } from "./formElements/PasswordInput";
import { useContext, useState } from "react";
import { login } from "../api/tokens.api";
import { useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await login(formData.username, formData.password);

      navigate(from, { replace: true });
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <>
      <DefaultForm id="login" onSubmit={handleLogin}>
        <h1>Login</h1>
        <Label for="username">Username</Label>
        <TextInput
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Label for="password">Password</Label>
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant={"accept"} form="login" type="submit">
          Login
        </Button>
      </DefaultForm>
    </>
  );
}
