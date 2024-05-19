export const requestParserOptions = (text: string): string | null => {
    const allowedTags = ['b', 'i', 'u', 'br'];
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const elements = Array.from(doc.body.childNodes);

    for (const element of elements) {
        if (element.nodeName.toLowerCase() === '#text') {
            continue;
        } else if (!allowedTags.includes(element.nodeName.toLowerCase())) {
            return 'You wrote something wrong...🤔';
        }
    }

    return null;
};
