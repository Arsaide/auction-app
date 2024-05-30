import { HTMLReactParserOptions, Element } from 'html-react-parser';
import { MainColorsEnum } from '../../colors/MainColors.enum';
import React from 'react';

export const auctionCardParserOptions: HTMLReactParserOptions = {
    replace: domNode => {
        if (domNode instanceof Element) {
            const allowedTags = ['b', 'i', 'u', 'br'];
            if (!allowedTags.includes(domNode.name)) {
                return <></>;
            }
        }
    },
};
