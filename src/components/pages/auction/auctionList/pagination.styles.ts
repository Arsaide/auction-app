import { createTheme } from '@mui/material/styles';
import { ButtonColors } from '../../../../lib/Colors/ButtonColors';

export const pagintaionStyles = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    marginTop: '20px',
                    color: ButtonColors.WHITE,
                    '&.Mui-selected': {
                        backgroundColor: ButtonColors.DGREEN,
                        '&:hover': {
                            backgroundColor: ButtonColors.LGREEN,
                        },
                    },
                },
            },
        },
    },
});
