import React, { FC, useEffect } from 'react';
import { useEditorText } from '../../../../../hooks/useEditorText/useEditorText';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import './TextEditInput.css';
import Button from '@mui/material/Button';
import { ButtonColors } from '../../../../../lib/colors/ButtonColors';
import parse from 'html-react-parser';
import { Field, ErrorMessage as Error, useFormikContext } from 'formik';
import { textParserOptions } from '../../../../../lib/parserOptions/textParserOptions/textParserOptions';

interface ITextEditInput {
    id: string;
    name: string;
    placeholder: string;
}

const TextEditInput: FC<ITextEditInput> = ({ id, name, placeholder }) => {
    const { applyFormat, text, updateSelection, setText, textRef } =
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
                        <Button
                            className={'toolsBtn'}
                            sx={{
                                color: ButtonColors.WHITE,
                                mt: 1,
                                '&:hover': {
                                    color: ButtonColors.LRED,
                                },
                            }}
                            onClick={() => setText('')}
                        >
                            <FormatClearIcon />
                        </Button>
                        <Button
                            className={'toolsBtn'}
                            sx={{
                                color: ButtonColors.WHITE,
                                mt: 1,
                                '&:hover': {
                                    color: ButtonColors.GRAY,
                                },
                            }}
                            onClick={() => applyFormat('bold')}
                        >
                            <FormatBoldIcon />
                        </Button>
                        <Button
                            className={'toolsBtn'}
                            sx={{
                                color: ButtonColors.WHITE,
                                mt: 1,
                                '&:hover': {
                                    color: ButtonColors.GRAY,
                                },
                            }}
                            onClick={() => applyFormat('italic')}
                        >
                            <FormatItalicIcon />
                        </Button>
                        <Button
                            className={'toolsBtn'}
                            sx={{
                                color: ButtonColors.WHITE,
                                mt: 1,
                                '&:hover': {
                                    color: ButtonColors.GRAY,
                                },
                            }}
                            onClick={() => applyFormat('underline')}
                        >
                            <FormatUnderlinedIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextEditInput;
