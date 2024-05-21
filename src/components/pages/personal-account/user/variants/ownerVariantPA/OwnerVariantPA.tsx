import React, { FC, useContext, useState } from 'react';
import OwnerDetails from './ownerDetails/OwnerDetails';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { CustomTabList } from '../../customComponents/customTabList';
import { AuctionInt } from '../../../../../../app/auction/auction-id/AuctionItemProps';
import { Context } from '../../../../../../index';
import { toast } from 'react-toastify';
import OwnerAuctionsInfo from './ownerTabs/ownAuctionsInfo/OwnerAuctionsInfo';
import { MainColors } from '../../../../../../lib/colors/MainColors';
import { CircularProgress } from '@mui/material';
import { CustomTabPanel } from '../../customComponents/customTabPanel';
import OwnSettings from './ownerTabs/ownSettings/OwnSettings';
import OwnAboutMe from './ownerTabs/ownAboutMe/OwnAboutMe';

interface IOwnerVariantPersonalAccount {
    name: string;
    email: string;
    balance: string;
    avatar: string;
}

const OwnerVariantPA: FC<IOwnerVariantPersonalAccount> = ({
    name,
    email,
    balance,
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
            const token = localStorage.getItem('token');
            const auctionResponse = await store.getOwnAuctions(token);
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
            <OwnerDetails
                name={name}
                email={email}
                balance={balance}
                avatar={avatar}
            />
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
                            <Tab label="Settings" value="3" />
                        </CustomTabList>
                    </Box>
                    <CustomTabPanel value="1">
                        <OwnAboutMe />
                    </CustomTabPanel>
                    <CustomTabPanel value="2">
                        {isSubmitting ? (
                            <OwnerAuctionsInfo auctions={auctions} />
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
                                    sx={{ color: MainColors.GREEN }}
                                />
                            </Box>
                        )}
                    </CustomTabPanel>
                    <CustomTabPanel value="3">
                        <OwnSettings />
                    </CustomTabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default OwnerVariantPA;
