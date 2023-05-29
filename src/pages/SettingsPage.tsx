import {Typography, Button, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {logout} from "../utils";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const langs = {
    pt: "português",
    en: "english",
  };
  const {t, i18n} = useTranslation();

  return (
    <Container
      sx={{
        width: "55vw",
        height: "75vh",
        // backgroundImage: "radial-gradient(#FFFFFF 0%,#C4C4C4 100%)",
        backgroundColor: 'lightgreen',
        marginTop: "5rem",
        borderRadius: "1rem",
      }}
    >
      Settings
      <Typography variant="h1" fontSize="1rem">
        {t("welcome")}
      </Typography>
      <Typography variant="h2" fontSize="3rem">
        {t("SettingsPage")}
      </Typography>
      {Object.entries(langs).map((lang, index) => {
        return (
          <Button
            color="secondary"
            sx={{margin: "1rem"}}
            variant="contained"
            key={index}
            onClick={() => i18n.changeLanguage(lang[0])}
            disabled={i18n.resolvedLanguage === lang[0]}
          >
            {lang[1]}
          </Button>
        );
      })}
      <Button
        color="success"
        sx={{margin: "1rem"}}
        variant="contained"
        onClick={() => {
          navigate("/dashboard")
        }
        }>Dashboard</Button>
      <Button
        color="error"
        sx={{margin: "1rem"}}
        variant="contained"
        onClick={() => {
          logout()
            .then(() => {
              navigate("/login")
            })
        }
        }>Logout</Button>
    </Container>
  );
};
