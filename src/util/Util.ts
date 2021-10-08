import {Guild} from "discord.js";
import {ConfigKey, getConfig} from "./Config";

// https://github.com/stiang/remove-markdown/blob/master/index.js
// I don't know markdown standard, but discord turns ____ into *__* which this doesn't catch
const removeMarkdown = (content: string): string => content
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/([_]{1,2})([^_]+)\1/g, '$2') // Remove emphasis
    .replace(/([*]{1,2})([^*]+)\1/g, '$2') // Remove emphasis
    .replace(/~~(.+?)~~/g, '$1') // Remove strikethrough
    .replace(/\|\|(.+?)\|\|/g, '$1'); // Remove spoilers

// Censors a word by replacing the middlemost vowel (if any) with a *. If the word is even, the middle will be
// considered the character on the right. If there are two vowels equidistant from the middle, the left will be chosen.
const censorWord = (word: string): string => {
    const middle: number = Math.round(word.length / 2.0  - 0.5); // This makes the middle on the right size if an even length
    // Find the middle vowel and replace it with a *
    // middle + 1 gets the exact amount on the left but it could be one over on the right, we must check that
    for (let pos = 0; pos < middle + 1; pos++) {
        const left = middle - pos;
        const right = middle + pos;
        // We have to check the left first in order to reduce the bias from starting right of center on even length\
        // words. This is what allows gaga to correctly be censored as g*ga even though the middle is the second g.
        if (/[aeiou]/.test(word[left])) {
            word = word.substring(0, left) + "*" + word.substring(left + 1);
            break;
        } else if (right < word.length && /[aeiouAEIOU]/.test(word[right])) {
            // Replace character with a *
            word = word.substring(0, right) + "*" + word.substring(right + 1);
            break;
        }
    }

    return word;
};

const isRole = (roleId: string) => async (id: string, guild: Guild): Promise<boolean> => {
    const role = await guild.roles.fetch(roleId);
    return role.members.has(id);
};

const isCourseStaff = isRole(getConfig(ConfigKey.courseStaffId));
const isStudent = isRole(getConfig(ConfigKey.studentId));

export {removeMarkdown, censorWord, isCourseStaff, isStudent};
