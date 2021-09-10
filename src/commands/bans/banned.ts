import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {getBannedWord} from "../../controllers/BanController";

const banned: Command = {
    name: "banned",
    description: "Lists the banned word (if any)",
    usage: "banned",
    procedure: async (client: Client, message: Message) => {
        let bannedWord = await getBannedWord();
        const middle = (bannedWord.length / 2.0) + 0.5; // Adding 0.5 is the equivalent of ensuring it always rounds up
        // Find the middle vowel and replace it with a *
        for (let pos = 0; pos < middle; pos++) {
            if (middle + pos < bannedWord.length && /[aeiou]/.test(middle[middle + pos])) {
                // Replace character with a *
                bannedWord = bannedWord.substring(0,middle + pos) + "*" + bannedWord.substring(middle + pos+1);
                break;
            } else if (middle - pos < bannedWord.length && /[aeiou]/.test(middle[middle - pos])) {
                bannedWord = bannedWord.substring(0,middle - pos) + "*" + bannedWord.substring(middle - pos+1);
                break;
            }
        }
        const reply = bannedWord ? `The current banned word is: ||${bannedWord}||` : "No word is banned at the moment";
        return message.channel.send(reply);
    },
};

export default banned;
