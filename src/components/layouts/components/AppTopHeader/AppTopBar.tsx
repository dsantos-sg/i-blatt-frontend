import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from '../../../logo/Logo.tsx';
import { Breadcrumbs, Paper } from '@mui/material';
import Link from '@mui/material/Link';

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
};

const AppTopBar = () => {
  return (
    <Paper square>
      <AppBar
        position="fixed"
        sx={{
          background:
            'radial-gradient(circle at top, hsl(0, 0%, 90%) 33%, hsl(0, 0%, 70%) 100%)', //TODO: Discutir como definir as cores da aplicação, hex, rgb ou hsl?
        }}
        elevation={12}
      >
        <Toolbar>
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Logo logoSize={'24px'} fontSize={'16px'} direction={'row'} />
          </Box>
        </Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            mb: 2,
          }}
        >
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Catalog
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Accessories
              </Link>
              <Link underline="hover" color="inherit" href="#">
                New Collection
              </Link>
            </Breadcrumbs>
          </div>
        </Box>
      </AppBar>
    </Paper>
  );
};

export default AppTopBar;
