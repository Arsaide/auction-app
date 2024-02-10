import * as React from 'react';
import Divider from '@mui/material/Divider';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssistantIcon from '@mui/icons-material/Assistant';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme} from '@mui/material';

const theme = createTheme({
    components: {
        MuiSvgIcon: {
          styleOverrides: {
            root: {
              color: 'white',
            },
          },
        },
      },
})

const SideBar = () => {      
    return (
        <>
            <Toolbar sx={{bgcolor: "#040A2F"}} />
            <Divider />
            <List sx={{bgcolor: "#040A2F"}}>
                <ListItem disablePadding>
                    <ListItemButton href='/'>
                        <ListItemIcon>
                            <ThemeProvider theme={theme}>
                                <HomeIcon />
                            </ThemeProvider>
                        </ListItemIcon>
                        <ListItemText primary={'Home'} sx={{color: "white"}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/bet'>
                        <ListItemIcon>
                            <ThemeProvider theme={theme}>
                                <CurrencyBitcoinIcon/>
                            </ThemeProvider>
                        </ListItemIcon>
                        <ListItemText primary={'Place a bet'} sx={{color: "white"}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/online-chat'>
                        <ListItemIcon>
                            <ThemeProvider theme={theme}>
                                <QuestionAnswerIcon/>
                            </ThemeProvider>
                        </ListItemIcon>
                        <ListItemText primary={'Online chat'} sx={{color: "white"}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href='/information'>
                        <ListItemIcon>
                            <ThemeProvider theme={theme}>
                                <AssistantIcon/>
                            </ThemeProvider>
                        </ListItemIcon>
                        <ListItemText primary={'Information'} sx={{color: "white"}}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
};

export default SideBar;