import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {getBannedWord} from "../../controllers/BanController";
import {censorWord} from "../../util/Util";

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

export default banned;
