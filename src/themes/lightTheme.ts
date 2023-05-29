import { createTheme } from '@mui/material/styles';
import { red, deepPurple } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3333',
      dark: '#000000',
      light: '#ffffff',
    },
    secondary: {
      main: deepPurple[500],
      dark: deepPurple[700],
      light: '#E7E0EC',
    },
    error: { main: red[500] },
    background: {
      paper: '#ffffff',
      default: 'radial-gradient(#FFFFFF 0%,#C4C4C4 100%) ',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    // fontFamily:"roboto, "
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&:hover': {
            cursor: 'pointer',
            color: 'purple',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          width: '128px',
          height: '40px',
          borderRadius: '100px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {},
      styleOverrides: {},
    },
  },
});
