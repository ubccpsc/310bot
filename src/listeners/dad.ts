import {Listener} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";

const dad: Listener<"messageCreate"> = {
    event: "messageCreate",
    procedure: async (client: Client, message: Message) => {
        if (message.author.bot) return;

        const messageSendersActualName = getMessageSendersActualName(message.cleanContent);
        if (messageSendersActualName == null) return; // u have no name

        const messageToSend = "Hi " + messageSendersActualName + ", I'm dad!";
        return message.channel.send(messageToSend);
    }
};

const getMessageSendersActualName = (content: string): string => {
    const lowerCaseContent = content.toLowerCase();
    const regex = /(?:^|\s)\s*(im|i'm|i am)\s+(.*)/;
    const match = lowerCaseContent.match(regex);

    return match?.at(2);
};

export {getMessageSendersActualName};
export default dad;
