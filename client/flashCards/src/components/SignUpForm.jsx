import { set, useForm } from "react-hook-form";
import { Label } from "./formElements/Label";
import { DefaultForm } from "./DefaultForm";
import { TextInput } from "./formElements/TextInput";
import { PasswordInput } from "./formElements/PasswordInput";
import { FormTitle } from "./formElements/FormTitle";
import { Button } from "./formElements/Button";
import { ErrorMessage } from "./ErrorMessage";
import { signUp } from "../api/tokens.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const { register, handleSubmit, formState, watch } = useForm();
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await signUp(data.username, data.email, data.password);
      console.log(res);
      if (res.status === 201) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        setBackendError("Error during sign up");
      }
    } catch (error) {
       if (error.response && error.response.status === 400) {
      const errorData = error.response.data;
      const errorMessages = [];
      
      if (errorData.username) {
        errorMessages.push(...errorData.username);
      }
      if (errorData.email) {
        errorMessages.push(...errorData.email);
      }
      if (errorData.password) {
        errorMessages.push(...errorData.password);
      }

      setBackendError(errorMessages);
    } else {
      console.log(error);
      setBackendError("An unexpected error occurred. Please try again.");
    }
    }
  };

  return (<>
    <DefaultForm id="signup" onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Sign Up</FormTitle>

      <Label htmlFor="username">Username: </Label>
      <TextInput
        id="username"
        name="username"
        {...register("username", { required: "Username is required" })}
      />
      {formState.errors.username && (
        <ErrorMessage>{formState.errors.username.message}</ErrorMessage>
      )}
      <Label htmlFor="email">Email address: </Label>
      <TextInput
        id="email"
        name="email"
        {...register("email", {
          required: "Email address is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />
      {formState.errors.email && (
        <ErrorMessage>{formState.errors.email.message}</ErrorMessage>
      )}

      <Label htmlFor="password">Password: </Label>
      <PasswordInput
        id="password"
        name="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 9,
            message: "Password should, at least, be 9 characters long",
          },
        })}
      />
      {formState.errors.password && (
        <ErrorMessage>{formState.errors.password.message}</ErrorMessage>
      )}

      <Label htmlFor="confirmPassword">Confirm your password: </Label>
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        {...register("confirmPassword", {
          required: "Confirm your password",
          validate: (value) =>
            value == watch("password") || "Passwords do not match",
        })}
      />
      {formState.errors.confirmPassword && (
        <ErrorMessage>{formState.errors.confirmPassword.message}</ErrorMessage>
      )}

     
      <div className="flex justify-center">
        <Button variant={"accept"} type="submit">
          Confirm
        </Button>
      </div>
    </DefaultForm>
 {backendError && <ErrorMessage>{backendError}</ErrorMessage>}
 </>
  );
}
