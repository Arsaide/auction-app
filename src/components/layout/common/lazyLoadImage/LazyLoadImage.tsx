import React, { FC, useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';

interface LazyLoadImageInt {
    src: string;
    w: string;
    h: string;
    alt: string;
    active?: boolean;
}

const LazyLoadImage: FC<LazyLoadImageInt> = ({ src, w, h, alt, active }) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setImageLoaded(true);
        };

        img.src = src;
    }, [src]);

    return (
        <>
            {!imageLoaded && (
                <Blurhash
                    hash={'UKQm0KIU_N%M-;M{xuof%Mj[M{WBt7ofM{M{'}
                    width={w}
                    height={h}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            )}
            {imageLoaded && (
                <img
                    src={src}
                    alt={alt}
                    loading={'lazy'}
                    style={{
                        width: w,
                        height: h,
                        objectFit: 'cover',
                        filter: !active ? 'grayscale(100%)' : 'none',
                    }}
                />
            )}
        </>
    );
};

export default LazyLoadImage;
