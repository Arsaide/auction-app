import styled from 'styled-components';
import TabList from '@mui/lab/TabList';
import { MainColors } from '../../../../../../lib/colors/MainColors';

export const CustomTabList = styled(TabList)`
    gap: 10px;
    & .MuiTabs-indicator {
        background-color: ${MainColors.GREEN};
    }
    & .MuiTab-root {
        color: ${MainColors.GRAY999};
        margin-right: 5px;
    }
    & .Mui-selected {
        color: ${MainColors.WHITE};
    }
`;
