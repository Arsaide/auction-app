import React, { FC } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';
import '../PersonalIdGrid.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../formatDate';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import VerifiedIcon from '@mui/icons-material/Verified';
import ClearIcon from '@mui/icons-material/Clear';

interface OwnAuctionsListProps {
    auctions: AuctionInt[];
}

const OwnAuctionsList: FC<OwnAuctionsListProps> = ({ auctions }) => {
    const columns: GridColDef[] = [
        {
            field: '_id',
            headerName: 'ID',
            width: 225,
            renderCell: (params: GridCellParams) => (
                <Link
                    to={`/auction/${String(params.value)}`}
                    className="white-link"
                >
                    {String(params.value)}
                </Link>
            ),
        },
        { field: 'title', headerName: 'Title', width: 250 },
        {
            field: 'minRates',
            headerName: 'Minimum Rate',
            width: 200,
            renderCell: (params: GridCellParams) => (
                <div>
                    {parseFloat(params.value as string).toLocaleString(
                        'de-DE',
                        {
                            style: 'currency',
                            currency: 'USD',
                        },
                    )}
                </div>
            ),
        },
        {
            field: 'rates',
            headerName: 'Actual Rate',
            width: 200,
            renderCell: (params: GridCellParams) => (
                <div>
                    {parseFloat(params.value as string).toLocaleString(
                        'de-DE',
                        {
                            style: 'currency',
                            currency: 'USD',
                        },
                    )}
                </div>
            ),
        },
        { field: 'desct', headerName: 'Description', width: 200 },
        {
            field: 'active',
            headerName: 'Active',
            width: 75,
            renderCell: (params: GridCellParams) => (
                <>
                    {params.value === true ? (
                        <VerifiedIcon fontSize="small" />
                    ) : (
                        <ClearIcon fontSize="small" />
                    )}
                </>
            ),
        },
        {
            field: 'timeStart',
            headerName: 'Time Start',
            width: 150,
            renderCell: (params: GridCellParams) => (
                <div>{formatDate(String(params.value))}</div>
            ),
        },
        {
            field: 'timeEnd',
            headerName: 'End Time',
            width: 150,
            renderCell: (params: GridCellParams) => (
                <div>{formatDate(String(params.value))}</div>
            ),
        },
    ].map(column => ({
        ...column,
        headerClassName: 'custom-header-color-class',
    }));

    const rows = auctions.map(item => ({
        ...item,
        id: item._id,
    }));

    return (
        <>
            <div style={{ width: '100%' }}>
                <Box sx={{ height: 371, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        getCellClassName={params =>
                            clsx('custom-text-color-class', {
                                'your-condition-class':
                                    params.value === 'someValue',
                            })
                        }
                        className="custom-pagination-color"
                        pageSizeOptions={[5]}
                    />
                </Box>
            </div>
        </>
    );
};

export default OwnAuctionsList;
