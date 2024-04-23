import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: "#6DB78C",
      dark: "#037B68"
    }
    // secondary : {
    //   main: "#7CE8A9"
    // }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // overflowY: "hidden",
          // overflowX: "scrool"
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
)
