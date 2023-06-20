import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { theme } from './theme.ts';

import App from './App.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Box sx={{ my: 4 }}>
            <App />
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
