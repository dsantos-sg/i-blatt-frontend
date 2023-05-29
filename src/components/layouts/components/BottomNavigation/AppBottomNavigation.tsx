import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { AddCircle, Menu, Search } from '@mui/icons-material';
import { useContext } from 'react';
import { PrivateLayoutContext } from '../../PrivateLayout.tsx';

export const AppBottomNavigation = () => {
  const { handleDrawerOpen, drawerOpen, handleBottomNavigationIndex } =
    useContext(PrivateLayoutContext);

  const handleClick = (index: number) => {
    handleDrawerOpen(!drawerOpen);
    handleBottomNavigationIndex(index);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background:
          'radial-gradient(circle at center top,hsl(0, 0%, 100%),hsl(0, 0%, 85%) )',
        zIndex: 1300,
      }}
      elevation={12}
      square
    >
      <BottomNavigation showLabels sx={{ background: 'transparent' }}>
        <BottomNavigationAction
          onClick={() => handleClick(0)}
          icon={<Search />}
        />
        <BottomNavigationAction
          onClick={() => handleClick(1)}
          icon={<Menu />}
        />
        <BottomNavigationAction
          onClick={() => handleClick(2)}
          icon={<AddCircle />}
        />
      </BottomNavigation>
    </Paper>
  );
};
