import dayjs from 'dayjs';

export const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return date.format('DD.MM.YYYY');
};
