import React, {FC} from 'react';

interface ImageInterface {
    url: string,
    style?: string
}

const Image:FC<ImageInterface> = ({ url, style }) => {
    const onLoad = () => {
        console.log('Loading')
    }
    return (
        <img
            src={url}
            onLoad={onLoad}
            style={{}}/>
    )
};

export default Image;
