import React, { FC } from 'react';
import { AuctionInt } from '../../../../../app/auction/auction-id/AuctionItemProps';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import '../PersonalIdGrid.css';
import { formatDate } from '../formatDate';
import Box from '@mui/material/Box';
import clsx from 'clsx';

interface ListOfBetsProps {
    auctions: AuctionInt[];
}

const ListOfBets: FC<ListOfBetsProps> = ({ auctions }) => {
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
        { field: 'rates', headerName: 'My Rate', width: 200 },
        { field: 'desct', headerName: 'Description', width: 200 },
        { field: 'active', headerName: 'Active', width: 100 },
        {
            field: 'time',
            headerName: 'Time',
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

export default ListOfBets;
