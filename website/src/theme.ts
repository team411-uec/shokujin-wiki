"use client";

import * as colors from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-noto-sans-jp)",
  },
  shape: {
    borderRadius: 2,
  },
  palette: {
    primary: colors.teal,
    secondary: colors.brown,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
    },
  },
});

export { theme };
