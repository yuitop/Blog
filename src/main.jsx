import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const Root = () => {

  const [mode, setMode] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#6DB78C",
        dark: "#037B68"
      }
    }
  });

  return <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <App setMode={setMode} />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Root/>
)
