import styled from 'styled-components';
import TabList from '@mui/lab/TabList';
import { MainColorsEnum } from '../../../../../../lib/colors/MainColors.enum';

export const CustomTabList = styled(TabList)`
    gap: 10px;
    & .MuiTabs-indicator {
        background-color: ${MainColorsEnum.GREEN};
    }
    & .MuiTab-root {
        color: ${MainColorsEnum.GRAY999};
        margin-right: 5px;
    }
    & .Mui-selected {
        color: ${MainColorsEnum.WHITE};
    }
`;
