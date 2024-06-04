import React, { createContext, useContext, FC } from 'react';

interface IFetchDataContext {
    fetchData: () => Promise<void>;
}

interface IFetchDataProvider {
    fetchData: () => Promise<void>;
    children: React.ReactNode;
}

const FetchDataContext = createContext<IFetchDataContext>({
    fetchData: async () => {},
});

export const useFetchData = () => useContext(FetchDataContext);

export const FetchDataProvider: FC<IFetchDataProvider> = ({
    fetchData,
    children,
}) => {
    return (
        <FetchDataContext.Provider value={{ fetchData }}>
            {children}
        </FetchDataContext.Provider>
    );
};
