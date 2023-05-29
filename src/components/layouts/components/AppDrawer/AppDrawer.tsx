import { FormEvent, useContext, useState } from 'react';
import { PrivateLayoutContext } from '../../PrivateLayout.tsx';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from '@mui/material';
import {
  AddCircle,
  ArrowBack,
  AutoAwesome,
  Cable,
  ChevronRight,
  Dashboard,
  DirectionsRun,
  DynamicFeed,
  Extension,
  Groups,
  Info,
  Logout,
  ReceiptLong,
  Search,
  Send,
  Settings,
} from '@mui/icons-material';
import { logout } from '../../../../utils';
import { useNavigate } from 'react-router-dom';

export const AppDrawer = () => {
  const {
    handleDrawerOpen,
    drawerOpen,
    bottomNavigationIndex,
    handleSearchValue,
  } = useContext(PrivateLayoutContext);
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    handleDrawerOpen(open);
  };

  /*
  const handleListItemClick = () => {
    toggleDrawer(false);
    setShowSecondaryMenu(false);
  };
*/

  const toggleSecondaryMenu = () => {
    setShowSecondaryMenu(!showSecondaryMenu);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSearchValue(search);
    setSearch('');
    handleDrawerOpen(false);
  };

  const handleClick = (route: string) => {
    toggleDrawer(false)();
    if (route === 'logout') {
      logout().then(() => navigate('/login'));
    } else if (route.includes('word-list')) {
      toggleSecondaryMenu();
      navigate(route);
    } else {
      navigate(route);
    }
  };

  return (
    <>
      {Boolean(!bottomNavigationIndex || bottomNavigationIndex < 2) && (
        <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 'auto',
              background:
                'radial-gradient( circle at center bottom, hsl(0, 0%, 100%), hsl(0, 0%, 85%))',
              p: 2,
              mb: 7,
            }}
          >
            {bottomNavigationIndex === 0 && (
              <>
                <Box sx={{ width: '100%', height: '100%', mt: 1 }}>
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Search
                        sx={{
                          color: 'action.active',
                          fontSize: '2em',
                          mr: 2,
                          mb: 1,
                        }}
                      />
                      <TextField
                        label="Search"
                        type="search"
                        variant="filled"
                        fullWidth
                        value={search}
                        onChange={(event) =>
                          setSearch(() => event.target.value)
                        }
                      />
                      <IconButton type="submit">
                        <Send
                          sx={{
                            color: 'action.active',
                            fontSize: '1em',
                            mx: 2,
                            mb: 1,
                          }}
                        />
                      </IconButton>
                    </Box>
                  </form>
                </Box>
              </>
            )}
            {bottomNavigationIndex === 1 && (
              <>
                <List
                  style={{ display: showSecondaryMenu ? 'none' : 'block' }}
                  subheader={
                    <ListSubheader
                      component="div"
                      sx={{ backgroundColor: 'transparent' }}
                    >
                      Main menu
                    </ListSubheader>
                  }
                >
                  <ListItemButton onClick={() => handleClick('logout')}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={() => handleClick('/about')}>
                    <ListItemIcon>
                      <Info />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleClick('/settings')}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                  <ListItemButton onClick={toggleSecondaryMenu}>
                    <ListItemIcon>
                      <ReceiptLong />
                    </ListItemIcon>
                    <ListItemText primary="Word list" />
                    <ChevronRight />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleClick('/add-new-word')}>
                    <ListItemIcon>
                      <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="Add a new word" />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleClick('/dashboard')}>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </List>
                <List
                  style={{ display: showSecondaryMenu ? 'block' : 'none' }}
                  subheader={
                    <ListSubheader
                      component="div"
                      sx={{ backgroundColor: 'transparent' }}
                    >
                      Word list by:
                    </ListSubheader>
                  }
                >
                  <ListItemButton onClick={toggleSecondaryMenu}>
                    <ListItemIcon>
                      <ArrowBack />
                    </ListItemIcon>
                    <ListItemText primary="Return to main menu" />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    onClick={() => handleClick('/word-list/connection')}
                  >
                    <ListItemIcon>
                      <Cable />
                    </ListItemIcon>
                    <ListItemText primary="Connection" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleClick('/word-list/nouns')}
                  >
                    <ListItemIcon>
                      <Extension />
                    </ListItemIcon>
                    <ListItemText primary="Nouns" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleClick('/word-list/verbs')}
                  >
                    <ListItemIcon>
                      <DirectionsRun />
                    </ListItemIcon>
                    <ListItemText primary="Verbs" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleClick('/word-list/adjectives')}
                  >
                    <ListItemIcon>
                      <AutoAwesome />
                    </ListItemIcon>
                    <ListItemText primary="Adjectives" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleClick('/word-list/pronouns')}
                  >
                    <ListItemIcon>
                      <Groups />
                    </ListItemIcon>
                    <ListItemText primary="Pronoums" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => handleClick('/word-list/all-types')}
                  >
                    <ListItemIcon>
                      <DynamicFeed />
                    </ListItemIcon>
                    <ListItemText primary="All types" />
                  </ListItemButton>
                </List>
              </>
            )}
          </Box>
        </Drawer>
      )}
    </>
  );
};
