import React, { useState } from 'react';

interface PaginationHook {
    currentPage: number;
    auctionsPerPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
}

const usePagination = (initAuctionsPerPage: number = 6): PaginationHook => {
    const [currentPage, setCurrentPage] = useState(1);
    const auctionsPerPage = initAuctionsPerPage;

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return {
        currentPage,
        setCurrentPage,
        handlePageChange,
        auctionsPerPage,
    };
};

export default usePagination;
