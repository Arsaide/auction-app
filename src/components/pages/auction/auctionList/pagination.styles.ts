import { createTheme } from '@mui/material/styles';

export const pagintaionStyles = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    marginTop: '20px',
                    color: 'white',
                    '&.Mui-selected': {
                        backgroundColor: '#5a8f29',
                        '&:hover': {
                            backgroundColor: '#7dc738',
                        },
                    },
                },
            },
        },
    },
});
