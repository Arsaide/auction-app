import { useRef, useState } from 'react';
import {
    applyStyle,
    TStyle,
} from '../../components/layout/common/inputs/textEditInput/applyStyle';

export function useEditorText() {
    const [text, setText] = useState('');
    const [selectionStart, setSelectionStart] = useState(0);
    const [selectionEnd, setSelectionEnd] = useState(0);

    const textRef = useRef<HTMLTextAreaElement | null>(null);

    const updateSelection = () => {
        if (!textRef.current) return;
        setSelectionStart(textRef.current.selectionStart);
        setSelectionEnd(textRef.current.selectionEnd);
    };

    const applyFormat = (type: TStyle) => {
        const selectedText = text.substring(selectionStart, selectionEnd);

        if (!selectedText) return;

        const before = text.substring(0, selectionStart);

        const after = text.substring(selectionEnd);

        setText(before + applyStyle(type, selectedText) + after);
    };

    return { text, applyFormat, updateSelection, setText, textRef };
}
