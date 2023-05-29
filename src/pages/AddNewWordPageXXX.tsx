import {
  Typography,
  Container,
  TextField,
  Button,
  Card,
  CardMedia,
  Slider,
  Fab,
  CardContent,
  CardActions,
  Autocomplete,
  Rating,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { MuiFileInput } from 'mui-file-input';
import { Box } from '@mui/material';
// @ts-ignore
import AvatarEditor from 'react-avatar-editor';
import { Check, ZoomIn, ZoomOut } from '@mui/icons-material';
import { apiURL } from '../utils';
import { useForm } from 'react-hook-form';

export const AddNewWordPageXXX = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const navigate = useNavigate();
  // @ts-ignore
  const {register, handleSubmit, formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [wordType, setWordType] = useState('')

  useEffect(() => {
    console.log('word type: ', getValues('wordType'));
    console.log('here................');
  }, []);

  const handleImageChange = (newFile: File | null) => {
    setSelectedImage(newFile);
    setCroppedImage(null);
  };

  const handleCropImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL('image/jpeg', 1);
      setCroppedImage(croppedImageUrl);
    }
  };

  const handleZoomChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: number | number[]
  ) => {
    event.preventDefault();
    // const newScale = parseFloat(event.target.value);
    setScale(value as number);
  };

  const generateRandomName = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomName = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters[randomIndex];
    }
    const timestamp = new Date().getTime();
    randomName += timestamp;
    return randomName;
  };

  const dataURItoFile = (dataURI: string, fileName: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: 'image/jpeg' });
  };

  const handleRatingChange = (newValue: number | null) => {
    setValue('rating', newValue);
  };

  const dataTreePreparation = () => {
    const mainFormData = getValues();

    const {
      nativeWord,
      wordType,
      language,
      mainArticle,
      noun,
      plural,
      additionalInfos,
      rating,
      synonyms,
      phrases,
    } = mainFormData;

    return {
      nativeWord: nativeWord,
      wordType: wordType,
      rating: rating,
      foreignWordData: {
        nounType: [
          {
            language: language,
            foreignWord: noun,
            mainArticle: mainArticle,
            plural: plural,
            synonyms: synonyms,
            sentences: phrases,
            additionalInfos: additionalInfos,
          },
        ],
        verbType: [],
        adjectiveType: [],
        pronounType: [],
        connectionType: [],
      },
    };
  };

  const handleOnSubmit = async () => {
    if (croppedImage) {
      try {
        const imageFormData = new FormData();
        const fileName = generateRandomName();
        imageFormData.append('image', dataURItoFile(croppedImage, fileName));
        const token = localStorage.getItem('token');
        const configImage = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };

        const baseURL = apiURL.defaults.baseURL;
        const response = await axios.post(
          `${baseURL}image`,
          imageFormData,
          configImage
        );
        console.log('Imagem enviada com sucesso!');

        if (response.status === 200) {
          const wordData = {
            ...dataTreePreparation(),
            image: fileName,
          };
          try {
            const configWord = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };
            await axios.post(`${baseURL}create-word`, wordData, configWord);
            console.log('Mensagem enviada com sucesso!');
            navigate('/dashboard');
          } catch (error) {
            console.error('Erro ao enviar:', error);
          }
        }
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
      }
    }
  };

  const { t } = useTranslation();

  // @ts-ignore
  const handleWordTypeChange = (event) => {
    setWordType(event.target.value)
  }

  return (
    <Container
      sx={{
        width: '100%',
        marginTop: '8rem',
        marginBottom: '3rem',
        minHeight: '80vh',
      }}
      maxWidth="xs"
    >
      <Paper
        elevation={12}
        sx={{
          backgroundImage:
            'radial-gradient(circle at center, hsla(0, 0%, 100%, 1) 33%, hsla(0, 0%, 98%, 1) 100%)', //TODO: Discutir como definir as cores da aplicação, hex, rgb ou hsl?
          borderRadius: '1em',
        }}
      >
        <Box sx={{ px: 2, pt: 2 }}>
          <Typography variant="h5">{t('Native word')}</Typography>
          {/*@ts-ignore*/}
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField
              label="Native word"
              variant="filled"
              sx={{ my: 1 }}
              fullWidth
              {...register('nativeWord')}
            />
            <MuiFileInput
              placeholder="Insert an image"
              accept=".jpeg, .jpg, .gif, .png"
              sx={{ my: 1 }}
              fullWidth
              variant="filled"
              value={selectedImage}
              onChange={handleImageChange}
            />
            {selectedImage && (
              <>
                {!croppedImage ? (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Card>
                        <CardContent>
                          <AvatarEditor
                            ref={editorRef}
                            image={URL.createObjectURL(selectedImage)}
                            width={320}
                            height={320}
                            border={0}
                            scale={scale}
                          />
                        </CardContent>
                        <CardActions
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Box sx={{ display: 'flex', width: '100%', mr: 3 }}>
                            <ZoomOut />
                            {/*@ts-ignore*/}
                            <Slider defaultValue={1} min={1} max={2} step={0.1} value={scale} onChange={handleZoomChange} sx={{ mx: 2 }} />
                            <ZoomIn />
                          </Box>
                          <Fab color="primary" onClick={handleCropImage}>
                            <Check />
                          </Fab>
                        </CardActions>
                      </Card>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      mb: 3,
                    }}
                  >
                    <Card sx={{ maxWidth: 500 }}>
                      <CardMedia
                        component="img"
                        src={croppedImage}
                        alt="uploaded image"
                      />
                    </Card>
                  </Box>
                )}
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              {/*@ts-ignore*/}
              <Rating name="rating" defaultValue={0} value={getValues('rating')} onChange={(event, newValue) => {
                  handleRatingChange(newValue);
                }}
              />
            </Box>

            {/*@ts-ignore*/}
            <Autocomplete multiple sx={{ my: 1 }} options={['Context 1', 'Context 2', 'Context 3']} defaultValue={[]} onChange={(event, value) => {setValue('context', value);}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Context"
                  placeholder="Add a context..."
                />
              )}
            />

            <FormControl variant="filled" sx={{ my: 1, width: '100%' }}>
              <InputLabel id="word-type-label">Word type</InputLabel>
              <Select
                labelId="word-type-label"
                {...register('wordType')}
                fullWidth
                onChange={handleWordTypeChange}
              >
                <MenuItem value="---">
                  <em>Please select a word type</em>
                </MenuItem>
                <MenuItem value="NOUN">Noun</MenuItem>
                <MenuItem value="PRONOUN">Pronoun</MenuItem>
                <MenuItem value="VERB">Verb</MenuItem>
                <MenuItem value="ADJECTIVE">Adjective</MenuItem>
                <MenuItem value="CONNECTION">Connection</MenuItem>
              </Select>
            </FormControl>

            {wordType && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5">{t('Foreign word')}</Typography>
                <Box sx={{ my: 3 }}>
                  <FormControl variant="filled" sx={{ mb: 1, width: '100%' }}>
                    <InputLabel id="foreign-language-label">
                      Foreign language
                    </InputLabel>
                    <Select
                      labelId="foreign-language-label"
                      fullWidth
                      {...register('language')}
                    >
                      <MenuItem value="">
                        <em>Please select a foreign available language</em>
                      </MenuItem>
                      <MenuItem value="ENGLISH">English</MenuItem>
                      <MenuItem value="FRENCH">French</MenuItem>
                      <MenuItem value="GERMAN">German</MenuItem>
                      <MenuItem value="PORTUGUESE">Portuguese</MenuItem>
                      <MenuItem value="SPANISH">Spanish</MenuItem>
                    </Select>
                  </FormControl>

                  {/*Noun type*/}
                  <TextField
                    label="Main article"
                    variant="filled"
                    {...register('mainArticle')}
                    sx={{ my: 1 }}
                    fullWidth
                  />

                  <TextField
                    label="Noun"
                    variant="filled"
                    {...register('noun')}
                    sx={{ my: 1 }}
                    fullWidth
                  />

                  <TextField
                    label="Plural"
                    variant="filled"
                    {...register('plural')}
                    sx={{ my: 1 }}
                    fullWidth
                  />

                  {/*gereral definitions*/}
                  {/*@ts-ignore*/}
                  <Autocomplete multiple sx={{ my: 2 }} options={['synonym 1', 'synonym 2', 'synonym 3']} defaultValue={[]} onChange={(event, value) => {setValue('synonyms', value);}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Synonyms"
                        placeholder="Add a new synonym..."
                      />
                    )}
                  />

                  {/*@ts-ignore*/}
                  <Autocomplete multiple sx={{ my: 2 }} options={['phrases 1', 'phrases 2', 'phrases 3']} defaultValue={[]} onChange={(event, value) => {setValue('phrases', value);}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Phrases"
                        placeholder="Add a new phrase..."
                      />
                    )}
                  />

                  <TextField
                    label="additional infos"
                    variant="filled"
                    {...register('additionalInfos')}
                    sx={{ my: 1 }}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Box>
                <Divider />
              </>
            )}
            <Button
              color="success"
              sx={{ margin: '1rem' }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};
