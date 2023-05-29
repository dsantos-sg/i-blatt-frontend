import {Logo} from "../components";
import {Typography, Button, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const LandingPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Logo/>
      <Typography
        variant="body1"
        sx={{
          alighText: "center",
          fontSize: "1.25rem",
          fontWeight: "regular",
          maxWidth: "300px",
          textAlign: "center",
        }}
      >
        {t("welcome")}
      </Typography>
      <Button
        onClick={handleNavigate}
        // href="/login"
        variant="contained"
        color="secondary"
        size="medium"
        sx={{
          marginTop: "2rem",
        }}
      >
        {t("login")}
      </Button>
    </Container>
  );
};
