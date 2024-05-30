import React, { FC } from 'react';
import { Field } from 'formik';
import { Link } from 'react-router-dom';
import { MainColorsEnum } from '../../../../../lib/colors/MainColors.enum';
import './searchInput.css';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { sortAuctions } from '../../../../pages/auction/auctionList/sortAuctions';

interface InputField {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    hippies: AuctionInt[];
    isValid: boolean;
    isSubmitting: boolean;
}

const SearchInput: FC<InputField> = ({
    id,
    label,
    name,
    placeholder,
    hippies,
    isValid,
    isSubmitting,
}) => {
    const sortedAuctions = sortAuctions(hippies);

    return (
        <div className={'searchContainer'}>
            <label htmlFor={id}>{label}</label>
            <div className={'searchContent'}>
                <Field
                    type={'text'}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    as={'input'}
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    sx={{
                        bgcolor: ButtonColorsEnum.LGREEN,
                        '&:hover': {
                            bgcolor: ButtonColorsEnum.DGREEN,
                        },
                        '&:disabled': {
                            bgcolor: ButtonColorsEnum.LRED,
                            color: MainColorsEnum.WHITE,
                        },
                    }}
                >
                    {isSubmitting ? (
                        <AutorenewIcon />
                    ) : !isValid ? (
                        <SearchIcon />
                    ) : (
                        <SendIcon />
                    )}
                </Button>
            </div>
            <div className={'searchHippies'}>
                <ul className={'searchList'}>
                    {hippies &&
                        sortedAuctions.map(item => (
                            <li key={item._id} className={'searchItem'}>
                                <Link
                                    to={`/auction/${item._id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: MainColorsEnum.BLACK,
                                    }}
                                    className={'searchTag'}
                                >
                                    {item.active ? (
                                        <VerifiedIcon
                                            sx={{
                                                color: ButtonColorsEnum.LGREEN,
                                                fontSize: 16,
                                            }}
                                        />
                                    ) : (
                                        <CancelIcon
                                            sx={{
                                                color: ButtonColorsEnum.LRED,
                                                fontSize: 16,
                                            }}
                                        />
                                    )}
                                    {item.title} |{' '}
                                    <span className={'searchAuthor'}>
                                        @{item.owner}
                                    </span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchInput;
