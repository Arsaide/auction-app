import { createTheme } from '@mui/material/styles';
import { ButtonColorsEnum } from '../../../../lib/colors/ButtonColors.enum';

export const pagintaionStyles = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    marginTop: '20px',
                    color: ButtonColorsEnum.WHITE,
                    '&.Mui-selected': {
                        backgroundColor: ButtonColorsEnum.DGREEN,
                        '&:hover': {
                            backgroundColor: ButtonColorsEnum.LGREEN,
                        },
                    },
                },
            },
        },
    },
});
