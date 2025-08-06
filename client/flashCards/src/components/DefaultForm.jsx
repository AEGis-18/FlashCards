import { Box } from "./formElements/Box";

export function DefaultForm({ children, ...props }) {
  return (
    <>
      <Box>
        <form {...props}>{children}</form>
      </Box>
    </>
  );
}
