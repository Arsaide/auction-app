import { createTheme } from '@mui/material/styles';

export const pagintaionStyles = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: 'white', // Цвет текста элементов
                },
            },
        },
    },
});
