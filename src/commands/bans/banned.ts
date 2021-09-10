import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {getBannedWord} from "../../controllers/BanController";

const banned: Command = {
    name: "banned",
    description: "Lists the banned word (if any)",
    usage: "banned",
    procedure: async (client: Client, message: Message) => {
        const bannedWord = await getBannedWord();
        let reply;
        if (bannedWord) {
            reply = `The current banned word is: ||${bannedWord}||`;
        } else {
            reply = "No word is banned at the moment";
        }
        return message.channel.send(reply);
    },
};

export default banned;
