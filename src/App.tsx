import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n/i18n";

import {AppRoutes} from "./routes";
import {lightTheme} from "./themes";
import {AuthProvider} from "./contexts";

export const App = () => {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <CssBaseline/>
        <ThemeProvider theme={lightTheme}>
          <AppRoutes/>
        </ThemeProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};
