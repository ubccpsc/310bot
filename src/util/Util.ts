// https://github.com/stiang/remove-markdown/blob/master/index.js
const removeMarkdown = (content: string): string => content
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/([*_]{1,3})(\S.*?\S?)\1/g, '$2') // Remove emphasis
    .replace(/([*_]{1,3})(\S.*?\S?)\1/g, '$2') // (repeat the line to remove double emphasis)
    .replace(/~~(.+?)~~/g, '$1') // Remove strikethrough
    .replace(/\|\|(.+?)\|\|/g, '$1'); // Remove spoilers

export {removeMarkdown};
