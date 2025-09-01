import { DefaultForm } from "./DefaultForm";
import { TextInput } from "./formElements/TextInput";
import { Label } from "./formElements/Label";
import { Button } from "./formElements/Button";
import { PasswordInput } from "./formElements/PasswordInput";
import { useContext, useState } from "react";
import { login } from "../api/tokens.api";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { FormTitle } from "./formElements/FormTitle";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await login(formData.username, formData.password);
      console.log("Login: ", response.data);
      setAuth({
        accessToken: response.data.access_token,
        username: response.data.user.username,
        email: response.data.user.email,
      });
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
        <FormTitle>Login form</FormTitle>
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
        <div className="flex justify-end m-1">
          <p
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Don't have an account? Sign up
          </p>
        </div>
        <div className="flex justify-center">
          <Button variant={"accept"} form="login" type="submit">
            Login
          </Button>
        </div>
      </DefaultForm>
    </>
  );
}
