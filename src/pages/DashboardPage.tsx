import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent, Paper, Box, Divider, Rating,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const DashboardPage = () => {
  // @ts-ignore
  const [wordList, setWordList] = useState<any>([]);

  // @ts-ignore
  const langs = {
    pt: 'português',
    en: 'english',
  };
  // @ts-ignore
  const { t, i18n } = useTranslation();

  // @ts-ignore
  useEffect(() => {
    const fetchWordData = async () => {
      const token = localStorage.getItem('token');

      try {
        const configWord = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const configImage = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };

        const wordDataRequest = await axios.get(
          'https://i-blatt-be.onrender.com/api/words',
          configWord
        );
        console.log(
          'Recebido lista de palavras com sucesso!',
          wordDataRequest.data.data
        );

        // @ts-ignore
        const imageDataRequest = wordDataRequest.data.data.map( async (wordData) => {
            try {
              const result = await axios.get(
                `https://i-blatt-be.onrender.com/api/image?key=${wordData.image}`,
                {
                  ...configImage,
                  responseType: 'blob',
                }
              );
              if (result.data) {
                const imageObjectURL = URL.createObjectURL(result.data);
                return { ...wordData, imageContent: imageObjectURL };
              }
            } catch (error) {
              console.error('Erro ao receber imagem:', error);
            }
          }
        );

        const fullWordData = await Promise.all(imageDataRequest);

        // @ts-ignore
        setWordList(fullWordData.filter(Boolean));
      } catch (error) {
        console.error('Erro ao receber lista de palavras:', error);
      }
    };

    // @ts-ignore
    fetchWordData();
  }, []);

  return (
    <>
      <Container
        sx={{
          width: '100%',
          marginTop: '8rem',
          marginBottom: '3rem',
          minHeight: '80vh'
        }}
        maxWidth="xs"
      >
        <Typography variant="h4" textAlign={"center"} sx={{fontWeight: 'light', my: 2}} >{t('Word list')}</Typography>

        <Paper
          elevation={12}
          sx={{
            backgroundImage:
              'radial-gradient(circle at center, hsla(0, 0%, 100%, 1) 33%, hsla(0, 0%, 98%, 1) 100%)', //TODO: Discutir como definir as cores da aplicação, hex, rgb ou hsl?
            borderRadius: '1em',
          }}
        >
          <Box sx={{ p: 2 }}>
            <div>
              {wordList.map((word: any) => (
                <Card key={word.id} sx={{ my: 3 }} variant="outlined">
                  <CardMedia
                    component="img"
                    height="320"
                    image={word.imageContent}
                    alt="imagem"
                  />
                  <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                    <Rating size='large' value={word.rating}/>
                  </Box>
                  <CardContent>
                    <Typography variant="caption">Native word</Typography>
                    <Typography variant="h6" component="div">{word.nativeWord}
                    </Typography>
                    <Divider sx={{my: 2}} />
                    <Typography variant='caption'>Language</Typography>
                    <Typography variant='body1'>{word.foreignWordData.nounType[0].language === 'ENGLISH' && <Typography variant='h2'>🇬🇧</Typography>}</Typography>
                    <Typography variant='body1'>{word.foreignWordData.nounType[0].language === 'FRENCH' && <Typography variant='h2'>🇫🇷</Typography>}</Typography>
                    <Typography variant='body1'>{word.foreignWordData.nounType[0].language === 'GERMAN' && <Typography variant='h2'>🇩🇪</Typography>}</Typography>
                    <Typography variant='body1'>{word.foreignWordData.nounType[0].language === 'PORTUGUESE' && <Typography variant='h2'>🇧🇷</Typography>}</Typography>
                    <Typography variant='body1'>{word.foreignWordData.nounType[0].language === 'SPANISH' && <Typography variant='h2'>🇪🇸</Typography>}</Typography>
                    <Typography variant='caption'>foreign word</Typography>
                    <Typography variant='body1'>{word.foreignWordData.nounType[0].foreignWord}</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
