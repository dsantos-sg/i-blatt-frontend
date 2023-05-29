import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../components';
import {inputsValidation, register} from '../utils';
import {
  Typography,
  Button,
  Container,
  TextField,
  Box,
  Autocomplete,
} from '@mui/material';
import {
  HighlightOff,
  Visibility,
  VisibilityOff,
  Error,
} from '@mui/icons-material';

import { RegisterProps, ValidationProps } from '../interfaces/generic';
import { worldLanguagesList } from '../i18n/worldLanguagesList';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const languagesList: any = [];
  Object.values(worldLanguagesList).map((lang) =>
    languagesList.push({ label: lang.name })
  );

  const { t } = useTranslation();

  const [newUser, setNewUser] = useState<RegisterProps>({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nativeLanguage: '',
  });

  // isValid precisa ser refatorada para poder acomodar erros de formatação dos diferentes inputs. Ex: userName = minLenght; password = caracteres especiais; passwordConfirm = password
  const validationDefault: ValidationProps = {
    userName: true,
    email: true,
    password: true,
    passwordConfirm: true,
    nativeLanguage: true,
  };
  const [isValid, setIsValid] = useState<ValidationProps>(validationDefault);

  const [isHidden, setIsHidden] = useState<boolean>(true);

  // const navigate = useNavigate();
  // const handleNavigate = (href: string) => {
  // 	navigate(href);
  // };

  const userNameRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const passwordRef = useRef<HTMLDivElement | null>(null);
  const passwordConfirmRef = useRef<HTMLDivElement | null>(null);

  const handleNewUserInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleLanguage = (language: string | null) => {
    let lang = language ? language : '';
    setNewUser({ ...newUser, nativeLanguage: lang });
  };

  // desabilita mensagem de erro se o usuário deletar algum input para corrigir texto
  useEffect(() => {
    newUser.nativeLanguage.length > 0 &&
      setIsValid({ ...isValid, nativeLanguage: true });
  }, [newUser.nativeLanguage]);

  // limpa e foca cursor no input selecionado
  const handleDelete = (input: string) => {
    setNewUser({ ...newUser, [input]: '' });
    setIsValid({ ...isValid, [input]: true });
    input === 'userName' && userNameRef.current?.focus();
    input === 'email' && emailRef.current?.focus();
    input === 'password' && passwordRef.current?.focus();
    input === 'passwordConfirm' && passwordConfirmRef.current?.focus();
  };

  const handleSubmit = async () => {
    let validation = true;
    const validationResult = inputsValidation(newUser);

    Object.values(validationResult).map((res) => {
      if (!res) validation = res;
    });

    // LOGIC TO RETURN and stop register request IF HAS A INVALID INPUT
    if (!validation) {
      setIsValid(validationResult);
      return;
    }
    try {
      const user = { ...newUser, passwordConfirm: undefined };
      await register(user);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore
  return (
    <Container
      sx={{
        maxWidth: '600px !important',
        width: '80vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* LOGO */}
      <Logo logoSize={'55px'} fontSize={'75px'} />
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.5rem',
          fontWeight: '500',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        {t('register')}
      </Typography>

      {/* USERNAME INPUT */}
      <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
        <TextField
          variant="filled"
          value={newUser.userName}
          id="userName"
          label={t('userName')}
          onChange={(e) => handleNewUserInputs(e)}
          fullWidth
          error={!isValid.userName}
          inputRef={userNameRef}
          helperText={!isValid.userName ? t('loginError') : null}
          sx={{
            backgroundColor: 'secondary.light',
          }}
        />
        {/* icone para limpar input */}
        {newUser.userName.length > 0 && isValid && (
          <HighlightOff
            onClick={() => handleDelete('userName')}
            sx={{
              color: 'action.active',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '1rem',
            }}
          />
        )}
        {/* icone de erro, com funcionalidade para limpar input */}
        {!isValid.userName && (
          <Error
            onClick={() => handleDelete('userName')}
            sx={{
              color: 'error.main',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '1rem',
            }}
          />
        )}
      </Box>
      {/* EMAIL INPUT */}
      <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
        <TextField
          variant="filled"
          value={newUser.email}
          id="email"
          label={t('email')}
          onChange={(e) => handleNewUserInputs(e)}
          fullWidth
          error={!isValid.email}
          inputRef={emailRef}
          helperText={!isValid.email ? t('emailError01') : null}
          sx={{
            backgroundColor: 'secondary.light',
          }}
        />
        {/* icone para limpar input */}
        {newUser.email.length > 0 && isValid.email && (
          <HighlightOff
            onClick={() => handleDelete('email')}
            sx={{
              color: 'action.active',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '1rem',
            }}
          />
        )}
        {/* icone de erro, com funcionalidade para limpar input */}
        {!isValid.email && (
          <Error
            onClick={() => handleDelete('email')}
            sx={{
              color: 'error.main',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '1rem',
            }}
          />
        )}
      </Box>

      {/* PASSWORD INPUT */}
      <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
        <TextField
          id="password"
          label={t('password')}
          variant="filled"
          value={newUser.password}
          type={isHidden ? 'password' : 'text'}
          onChange={(e) => handleNewUserInputs(e)}
          fullWidth
          error={!isValid.password}
          inputRef={passwordRef}
          helperText={!isValid.password ? t('passwordError') : null}
          sx={{
            backgroundColor: 'secondary.light',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.25rem',
          }}
        >
          {/* icone para ativar/desativar visibilidade da senha */}
          {isHidden ? (
            <VisibilityOff onClick={() => setIsHidden(false)} />
          ) : (
            <Visibility onClick={() => setIsHidden(true)} />
          )}

          {/* icone para limpar input */}
          {newUser.password.length > 0 && isValid.password && (
            <HighlightOff
              onClick={() => handleDelete('password')}
              sx={{
                color: 'action.active',
              }}
            />
          )}

          {/* icone de erro, com funcionalidade para limpar input */}
          {!isValid.password && (
            <Error
              onClick={() => handleDelete('password')}
              sx={{
                color: 'error.main',
              }}
            />
          )}
        </Box>
      </Box>
      {/* PASSWORD CONFIRM INPUT */}
      <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
        <TextField
          id="passwordConfirm"
          label={t('passwordConfirm')}
          variant="filled"
          value={newUser.passwordConfirm}
          type={isHidden ? 'password' : 'text'}
          onChange={(e) => handleNewUserInputs(e)}
          fullWidth
          error={!isValid.passwordConfirm}
          inputRef={passwordConfirmRef}
          helperText={!isValid.passwordConfirm ? t('passwordMatchError') : null}
          sx={{
            backgroundColor: 'secondary.light',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.25rem',
          }}
        >
          {/* icone para ativar/desativar visibilidade da senha */}
          {isHidden ? (
            <VisibilityOff onClick={() => setIsHidden(false)} />
          ) : (
            <Visibility onClick={() => setIsHidden(true)} />
          )}

          {/* icone para limpar input */}
          {newUser.passwordConfirm.length > 0 && isValid.passwordConfirm && (
            <HighlightOff
              onClick={() => handleDelete('passwordConfirm')}
              sx={{
                color: 'action.active',
              }}
            />
          )}

          {/* icone de erro, com funcionalidade para limpar input */}
          {!isValid.passwordConfirm && (
            <Error
              onClick={() => handleDelete('passwordConfirm')}
              sx={{
                color: 'error.main',
              }}
            />
          )}
        </Box>
      </Box>

      {/* LANGUAGE SELECTION */}
      {/* SET IsValid LOGIC HERE  */}
      <Autocomplete
        disablePortal
        id="nativeLanguage"
        options={languagesList}
        onChange={(e) => {
          // @ts-ignore
          handleLanguage(e.currentTarget.textContent);
        }}
        freeSolo={true}
        sx={{
          width: '100%',
        }}
        renderInput={(params) => (
          <TextField
            variant="filled"
            error={!isValid.nativeLanguage}
            helperText={
              !isValid.nativeLanguage ? t('nativeLanguageError') : null
            }
            sx={{
              backgroundColor: 'secondary.light',
            }}
            {...params}
            label={t('nativeLanguage')}
          />
        )}
      />

      {/* REGISTER BUTTON */}
      <Button
        onClick={() => handleSubmit()}
        variant="contained"
        color="secondary"
        size="medium"
        disabled={
          newUser.userName.length === 0 ||
          newUser.email.length === 0 ||
          newUser.password.length === 0 ||
          newUser.passwordConfirm.length === 0
        }
        sx={{
          marginTop: '2rem',
        }}
      >
        {t('register')}
      </Button>
    </Container>
  );
};
