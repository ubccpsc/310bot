import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {getBannedWord} from "../../controllers/BanController";

const banned: Command = {
    name: "banned",
    description: "Lists the banned word (if any)",
    usage: "banned",
    procedure: async (client: Client, message: Message) => {
        let bannedWord = await getBannedWord();
        bannedWord = censorWord(bannedWord);
        const reply = bannedWord ? `The current banned word is: ||${bannedWord}||` : "No word is banned at the moment";
        return message.channel.send(reply);
    },
};

// Tentative tests for when testing is added
// a | *
// ag | *g
// agg | *gg
// aggg | *ggg
// agggg | *gggg
// gga | gg*
// ggga | ggg*
// gaag | ga*g
// gaga | g*ga
// gggga | gggg*
// gaagg | ga*gg
// ggaag | gg*ag
// gagag | g*gag

const censorWord = (word: string): string => {
    const middle = Math.round(word.length / 2.0  - 0.5); // This makes the middle on the right size if an even length
    // Find the middle vowel and replace it with a *
    // middle + 1 gets the exact amount on the left but it could be one over on the right, we must check that
    for (let pos = 0; pos < middle + 1; pos++) {
        const left = middle - pos;
        const right = middle + pos;
        // We have to check the left first in order to reduce the bias from starting right of center on even length\
        // words. This is what allows gaga to correctly be censored as g*ga even though the middle is the second g.
        if (/[aeiou]/.test(middle[left])) {
            word = word.substring(0, left) + "*" + word.substring(left + 1);
            break;
        } else if (right < word.length && /[aeiou]/.test(middle[right])) {
            // Replace character with a *
            word = word.substring(0, right) + "*" + word.substring(right + 1);
            break;
        }
    }

    return word;
};

export {censorWord};
export default banned;
