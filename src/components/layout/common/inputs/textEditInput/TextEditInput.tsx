import React, { FC, useEffect } from 'react';
import { useEditorText } from '../../../../../hooks/useEditorText/useEditorText';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import WrapTextIcon from '@mui/icons-material/WrapText';
import './TextEditInput.css';
import Button from '@mui/material/Button';
import { ButtonColorsEnum } from '../../../../../lib/colors/ButtonColors.enum';
import parse from 'html-react-parser';
import { Field, ErrorMessage as Error, useFormikContext } from 'formik';
import { textParserOptions } from '../../../../../lib/parserOptions/textParserOptions/textParserOptions';
import { CustomTooltip } from '../../ui/customTooltip/CustomTooltip';

interface ITextEditInput {
    id: string;
    name: string;
    placeholder: string;
}

const TextEditInput: FC<ITextEditInput> = ({ id, name, placeholder }) => {
    const { applyFormat, text, updateSelection, setText, textRef, lineBreak } =
        useEditorText();

    const { setFieldValue, values } = useFormikContext<{
        [key: string]: string;
    }>();

    useEffect(() => {
        setText(values[name]);
    }, [values, name, setText]);

    useEffect(() => {
        setFieldValue(name, text);
    }, [text, setFieldValue, name]);

    return (
        <>
            {text && (
                <>
                    <span>Preview</span>
                    <div className={'preview'}>
                        {parse(text, textParserOptions)}
                    </div>
                </>
            )}
            <div className={'card'}>
                <Error name={name}>
                    {error => <span className={'error'}>{error}</span>}
                </Error>
                <Field
                    id={id}
                    name={name}
                    innerRef={textRef}
                    className={'editor'}
                    spellCheck="false"
                    onSelect={updateSelection}
                    placeholder={placeholder}
                    as="textarea"
                />
                <div className={'actions'}>
                    <div className={'tools'}>
                        <CustomTooltip title="Clear all Text" placement="top">
                            <Button
                                className={'toolsBtn'}
                                sx={{
                                    color: ButtonColorsEnum.WHITE,
                                    mt: 1,
                                    '&:hover': {
                                        color: ButtonColorsEnum.LRED,
                                    },
                                }}
                                onClick={() => setText('')}
                            >
                                <FormatClearIcon />
                            </Button>
                        </CustomTooltip>
                        <CustomTooltip title="Bold Text" placement="top">
                            <Button
                                className={'toolsBtn'}
                                sx={{
                                    color: ButtonColorsEnum.WHITE,
                                    mt: 1,
                                    '&:hover': {
                                        color: ButtonColorsEnum.GRAY,
                                    },
                                }}
                                onClick={() => applyFormat('bold')}
                            >
                                <FormatBoldIcon />
                            </Button>
                        </CustomTooltip>
                        <CustomTooltip title="Italic Text" placement="top">
                            <Button
                                className={'toolsBtn'}
                                sx={{
                                    color: ButtonColorsEnum.WHITE,
                                    mt: 1,
                                    '&:hover': {
                                        color: ButtonColorsEnum.GRAY,
                                    },
                                }}
                                onClick={() => applyFormat('italic')}
                            >
                                <FormatItalicIcon />
                            </Button>
                        </CustomTooltip>
                        <CustomTooltip title="Underline Text" placement="top">
                            <Button
                                className={'toolsBtn'}
                                sx={{
                                    color: ButtonColorsEnum.WHITE,
                                    mt: 1,
                                    '&:hover': {
                                        color: ButtonColorsEnum.GRAY,
                                    },
                                }}
                                onClick={() => applyFormat('underline')}
                            >
                                <FormatUnderlinedIcon />
                            </Button>
                        </CustomTooltip>
                        <CustomTooltip
                            title="Insert Line Break"
                            placement="top"
                        >
                            <Button
                                className={'toolsBtn'}
                                sx={{
                                    color: ButtonColorsEnum.WHITE,
                                    mt: 1,
                                    '&:hover': {
                                        color: ButtonColorsEnum.GRAY,
                                    },
                                }}
                                onClick={() => lineBreak()}
                            >
                                <WrapTextIcon />
                            </Button>
                        </CustomTooltip>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextEditInput;
