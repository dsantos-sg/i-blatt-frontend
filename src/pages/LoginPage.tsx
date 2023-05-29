import { ChangeEvent, useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo, ResetPassword, Btn01 } from '../components';

import { Typography, Button, Container, TextField, Box } from '@mui/material';
import {
  HighlightOff,
  Visibility,
  VisibilityOff,
  Error,
} from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

import { ILoginData, LoginProps, RegisterProps } from '../interfaces/generic';

import { inputsValidation } from '../utils';
import { login } from '../utils/authServices.ts';
import { AuthContext } from '../contexts';

export const LoginPage = () => {
  const { t } = useTranslation();
  const [loginData, setLoginData] = useState<LoginProps>({
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const navigate = useNavigate();
  const emailRef = useRef<HTMLDivElement | null>(null);
  const passwordRef = useRef<HTMLDivElement | null>(null);
  const { handleIsAuthenticated } = useContext(AuthContext);

  const handleLoginInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  // desabilita mensagem de erro se o usuário deletar algum input para corrigir texto
  useEffect(() => {
    setIsDisable(
      loginData.email.length === 0 || loginData.password.length === 0
        ? true
        : false
    );
    loginData.email.length === 0 && setIsError(false);
    loginData.password.length === 0 && setIsError(false);
  }, [loginData]);

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  // limpa e foca cursor no input selecionado
  const handleDelete = (input: string) => {
    setLoginData({ ...loginData, [input]: '' });
    input === 'email' && emailRef.current?.focus();
    input === 'password' && passwordRef.current?.focus();
    setIsError(false);
  };

  const handleSubmit = async () => {
    //event.preventDefault(); TODO configurar mais tarde o preventDefault da função

    const validationCheck = inputsValidation(loginData as RegisterProps);
    const validationError = validationCheck.email && validationCheck.password;
    if (!validationError) {
      setIsError(!validationError);
      return;
    } else {
      setIsError(!validationError);
    }

    const myLoginData: ILoginData = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const loginSuccessful = await login(myLoginData);
      if (loginSuccessful) {
        handleIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore
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
          alighText: 'center',
          fontSize: '1.5rem',
          fontWeight: '500',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        {t('loginData')}
      </Typography>

      {/* EMAIL INPUT */}
      <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
        <TextField
          variant="filled"
          value={loginData.email}
          id="email"
          label="email"
          onChange={(e) => handleLoginInputs(e)}
          fullWidth
          error={isError}
          inputRef={emailRef}
          helperText={isError ? t('loginError') : null}
          sx={{
            backgroundColor: 'secondary.light',
          }}
        />
        {/* icone para limpar input */}
        {loginData.email.length > 0 && !isError && (
          <HighlightOff
            onClick={() => handleDelete('email')}
            sx={{
              // '&:hover': {
              //   cursor: 'pointer',
              // },
              color: 'action.active',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '1rem',
            }}
          />
        )}
        {/* icone de erro, com funcionalidade para limpar input */}
        {isError && (
          <Error
            onClick={() => handleDelete('email')}
            sx={{
              // '&:hover': {
              //   cursor: 'pointer',
              // },
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
          label="password"
          variant="filled"
          value={loginData.password}
          type={isHidden ? 'password' : 'text'}
          onChange={(e) => handleLoginInputs(e)}
          fullWidth
          error={isError}
          inputRef={passwordRef}
          helperText={isError ? t('loginError') : null}
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
            <VisibilityOff
              onClick={() => setIsHidden(false)}
              sx={
                {
                  // '&:hover': {
                  //   cursor: 'pointer',
                  // },
                }
              }
            />
          ) : (
            <Visibility
              onClick={() => setIsHidden(true)}
              sx={
                {
                  // '&:hover': {
                  //   cursor: 'pointer',
                  // },
                }
              }
            />
          )}

          {/* icone para limpar input */}
          {loginData.password.length > 0 && !isError && (
            <HighlightOff
              onClick={() => handleDelete('password')}
              sx={{
                // '&:hover': {
                //   cursor: 'pointer',
                // },
                color: 'action.active',
              }}
            />
          )}

          {/* icone de erro, com funcionalidade para limpar input */}
          {isError && (
            <Error
              onClick={() => handleDelete('password')}
              sx={{
                color: 'error.main',
              }}
            />
          )}
        </Box>
      </Box>

      {/*RESET PASSWORD BUTTON   */}
      <Button
        onClick={() => setShowResetModal(true)}
        variant="text"
        color="secondary"
        size="large"
        sx={{
          marginTop: '2rem',
          textAlign: 'start',
          alignSelf: 'start',
        }}
      >
        {t('passwordForgot')}
      </Button>

      {/* SUBMIT BUTTON */}
      <Btn01 isDisable={isDisable} cb={handleSubmit} text={t('loginData')} />
      {/* <Button
					onClick={() => handleSubmit()}
					variant="contained"
					color="secondary"
					size="medium"
					disabled={
						loginData.email.length === 0 || loginData.password.length === 0
							? true
							: false
					}
					sx={{
						marginTop: "2rem",
					}}
				>
					{t("loginData")}
				</Button> */}

      {/* REGISTER BUTTON */}
      <Button
        onClick={() => handleNavigate('/register')}
        variant="text"
        color="secondary"
        size="medium"
        sx={{
          marginTop: '2rem',
          textAlign: 'justify',
          width: '90%',
        }}
      >
        {t('registerNewUser')}
      </Button>
      {showResetModal && (
        <ResetPassword show={showResetModal} cb={setShowResetModal} />
      )}
    </Container>
  );
};
