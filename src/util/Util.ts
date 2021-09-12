// https://github.com/stiang/remove-markdown/blob/master/index.js
// I don't know markdown standard, but discord turns ____ into *__* which this doesn't catch
const removeMarkdown = (content: string): string => content
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/([_]{1,2})([^_]+)\1/g, '$2') // Remove emphasis
    .replace(/([*]{1,2})([^*]+)\1/g, '$2') // Remove emphasis
    .replace(/~~(.+?)~~/g, '$1') // Remove strikethrough
    .replace(/\|\|(.+?)\|\|/g, '$1'); // Remove spoilers

export {removeMarkdown};
