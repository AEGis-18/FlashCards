import { Box } from "../components/formElements/Box";
import { Button } from "../components/formElements/Button";
import { FormTitle } from "../components/formElements/FormTitle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useEffect } from "react";
import { FlashDecksPage } from "./FlashDecksPage";

export function HomePage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "Flash Cards";
  }, []);

  return (
    <>{auth ? <FlashDecksPage></FlashDecksPage> : <p>Login to see info</p>}</>
  );
  // return (
  //   <>
  //     <Box>
  //       <FormTitle>Prueba</FormTitle>
  //       {auth ? (
  //         <>
  //           <p>{auth.username}</p>
  //           <p>{auth.email}</p>
  //         </>
  //       ) : (
  //         <p>Login to see info</p>
  //       )}

  //       <br></br>
  //       <Button onClick={() => navigate("/my-decks")}> My Decks</Button>
  //     </Box>
  //   </>
  // );
}
