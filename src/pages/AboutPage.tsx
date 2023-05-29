import { Typography, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';


export const AboutPage = () => {
  const langs = {
    pt: 'português',
    en: 'english',
  };
  const { t, i18n } = useTranslation();

  return (
    <Container
      sx={{
        width: '100%',
        minHeight: '80vh',
        // backgroundImage: "radial-gradient(#FFFFFF 0%,#C4C4C4 100%)",
        marginTop: "5rem",
        backgroundColor: 'aliceblue',
      }}
    >
      Dashboard
      <Typography variant="h1" fontSize="1rem">
        {t('welcome')}
      </Typography>
      <Typography variant="h2" fontSize="3rem">
        {t('About')}
      </Typography>
      {Object.entries(langs).map((lang, index) => {
        return (
          <Button
            color="secondary"
            sx={{ margin: '1rem' }}
            variant="contained"
            key={index}
            onClick={() => i18n.changeLanguage(lang[0])}
            disabled={i18n.resolvedLanguage === lang[0]}
          >
            {lang[1]}
          </Button>
        );
      })}
    </Container>
  );
};
