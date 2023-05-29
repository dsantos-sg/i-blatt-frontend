import {Box} from '@mui/material';
import {IPrivateLayoutProps, ReactGeneric} from '../../interfaces/generic';
import AppTopBar from './components/AppTopHeader/AppTopBar.tsx';
import {AppBottomNavigation} from './components/BottomNavigation/AppBottomNavigation.tsx';
import {AppDrawer} from './components/AppDrawer/AppDrawer.tsx';
import {createContext, useState} from 'react';
import {NewWordDialog} from './components/NewWordDialog/NewWordDialog.tsx';

export const PrivateLayoutContext = createContext<IPrivateLayoutProps>({
  drawerOpen: false,
  handleDrawerOpen: () => {
  },
  bottomNavigationIndex: null,
  handleBottomNavigationIndex: () => {
  },
  searchValue: '',
  handleSearchValue: () => {
  },
  newWordDialogOpen: false,
  handleNewWordDialogOpen: () => {
  },
});

export const PrivateLayout = ({children}: ReactGeneric) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNavigationIndex, setBottomNavigationIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [newWordDialogOpen, setNewWordDialogOpen] = useState(false);

  const handleDrawerOpen = (val: boolean) => {
    setDrawerOpen(val);
  };

  const handleBottomNavigationIndex = (val: number) => {
    setBottomNavigationIndex(val);
    if (val === 2) {
      setNewWordDialogOpen(true);
    }
  };

  const handleSearchValue = (val: string) => {
    alert(
      `Text '${val}' has arrived in the PrivateLayout component from the search input`
    );
    setSearchValue(val);
  };

  const handleNewWordDialogOpen = (val: boolean) => {
    setNewWordDialogOpen(val);
  };

  const contextValue = {
    drawerOpen,
    handleDrawerOpen,
    bottomNavigationIndex,
    handleBottomNavigationIndex,
    searchValue,
    handleSearchValue,
    newWordDialogOpen,
    handleNewWordDialogOpen,
  };

  return (
    <PrivateLayoutContext.Provider value={contextValue}>
      <Box
        sx={{
          backgroundImage:
            'radial-gradient(circle at top, hsla(0, 0%, 100%, 1) 33%, hsla(0, 0%, 80%, 1) 100%)', //TODO: Discutir como definir as cores da aplicação, hex, rgb ou hsl?
      pb:5
      }}
      >
        <header>
          <AppTopBar/>
        </header>
        <main>
          <AppDrawer/>
          {children}
        </main>
        <footer>
          <AppBottomNavigation/>
        </footer>
        <NewWordDialog/>
      </Box>
    </PrivateLayoutContext.Provider>
  );
};
