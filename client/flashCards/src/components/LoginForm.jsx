import { DefaultForm } from "./DefaultForm";
import { TextInput } from "./formElements/TextInput";
import { Label } from "./formElements/Label";
import { Button } from "./formElements/Button";
import { PasswordInput } from "./formElements/PasswordInput";
import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({ user: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <>
      <DefaultForm id="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Label for="user">Username</Label>
        <TextInput id="user" value={formData.user} onChange={handleChange} />
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
