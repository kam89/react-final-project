import React from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { defaultThemes } from 'themes';
import { Home } from 'components/templates/home';

function App() {
  let theme = createTheme(defaultThemes);
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg">
        <Home />
      </Container>
    </ThemeProvider>
  );
}

export default App;
