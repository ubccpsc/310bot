import {Listener} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";

const cooldown: Listener<"messageCreate"> = {
    event: "messageCreate",
    procedure: async (client: Client, message: Message) => {
        if (message.author.bot) return;

        if (message.content.toLowerCase().includes("cooldown"))  {
            const messageToSend = `Hi ${message.author.toString()}, it seems you have complained about about the autobot's cooldown time. We have graciously doubled your cooldown time in response, have a nice day :smiley:`;
            return message.channel.send(messageToSend);
        }
    }
};

export default cooldown;
