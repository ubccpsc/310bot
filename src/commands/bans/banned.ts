import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {getBannedWord} from "../../controllers/BanController";

const banned: Command = {
    name: "banned",
    description: "Lists the banned word (if any)",
    usage: "banned",
    procedure: async (client: Client, message: Message) => {
        const banned_word = await getBannedWord();
        let reply;
        if (banned_word) {
            reply = "The current banned word is: ||";
            reply += banned_word;
            reply += "||";
        } else {
            reply = "No word is banned at the moment";
        }
        return message.channel.send(reply);
    },
};

export default banned;
