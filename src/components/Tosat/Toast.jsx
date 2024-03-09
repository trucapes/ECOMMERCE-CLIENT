import { Snackbar } from "@mui/material";
import * as React from "react";

export default function SnackbarVariants() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState("outlined");

  setTimeout(() => {
    setOpen(true);
  }, 1000);

  return (
    <div>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        variant={variant}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        A snackbar with {variant} variant.
      </Snackbar>
    </div>
  );
}
