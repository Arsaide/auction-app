import React, { FC, useContext, useState } from 'react';
import UserDetails from './userDetails/UserDetails';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { CustomTabList } from '../subComponents/customTabList';
import Tab from '@mui/material/Tab';
import { CustomTabPanel } from '../subComponents/customTabPanel';
import { CircularProgress } from '@mui/material';
import { MainColorsEnum } from '../../../../../../lib/colors/MainColors.enum';
import { Context } from '../../../../../../index';
import { AuctionInt } from '../../../../../../app/auction/auction-id/AuctionItemProps';
import { toast } from 'react-toastify';
import OwnAuctionsList from '../../ownAuctionsList/OwnAuctionsList';
import UserAboutMe from './userTabs/userAboutMe/UserAboutMe';

interface IUserVariantPersonalAccount {
    id: string | undefined;
    name: string;
    email: string;
    avatar: string;
}

const UserVariantPA: FC<IUserVariantPersonalAccount> = ({
    id,
    name,
    email,
    avatar,
}) => {
    const { store } = useContext(Context);
    const [value, setValue] = useState('1');
    const [auctions, setAuctions] = useState<AuctionInt[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const fetchAuctions = async () => {
        try {
            setIsSubmitting(false);
            const auctionResponse = await store.getOwnAuctions(id);
            setAuctions(auctionResponse.data.auctions);
        } catch (error: any) {
            toast.error(error.response?.data?.message);
            console.error('Error fetching account:', error);
        } finally {
            setIsSubmitting(true);
        }
    };

    return (
        <>
            <UserDetails name={name} email={email} avatar={avatar} />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabList onChange={handleChange}>
                            <Tab label="About me" value="1" />
                            <Tab
                                label="Auction info"
                                value="2"
                                onClick={() => fetchAuctions()}
                            />
                        </CustomTabList>
                    </Box>
                    <CustomTabPanel value="1">
                        <UserAboutMe />
                    </CustomTabPanel>
                    <CustomTabPanel value="2">
                        {isSubmitting ? (
                            <OwnAuctionsList auctions={auctions} />
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress
                                    size={200}
                                    thickness={2}
                                    sx={{ color: MainColorsEnum.GREEN }}
                                />
                            </Box>
                        )}
                    </CustomTabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default UserVariantPA;
