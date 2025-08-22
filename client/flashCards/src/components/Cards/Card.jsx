import { Box } from "../formElements/Box";

export function Card({ card }) {
  return (
    <Box>
      <h1>{card.front}</h1>
      <p>{card.back}</p>
    </Box>
  );
}
