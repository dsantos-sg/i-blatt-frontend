import { Box } from '@mui/material';
import { ReactGeneric } from '../../interfaces/generic';

export const PublicLayout = ({ children }: ReactGeneric) => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        backgroundImage:
          'radial-gradient(circle at top, hsla(0, 0%, 100%, 1) 33%, hsla(0, 0%, 80%, 1) 100%)', //TODO: Discutir como definir as cores da aplicação, hex, rgb ou hsl?
        display: 'flex',
        justiyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};
