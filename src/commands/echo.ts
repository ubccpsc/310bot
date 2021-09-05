import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";

const echo: Command = {
    name: "echo",
    description: "Repeats a message",
    usage: "echo <message>?",
    procedure: async (client: Client, message: Message, args: string[]) => {
        let reply;
        if (args.length > 0) {
            reply = args.join(" ");
        } else {
            reply = "... echo";
        }
        return message.channel.send(reply);
    },
};

export default echo;
