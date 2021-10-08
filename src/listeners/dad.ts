import {Listener} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";

const dad: Listener<"messageCreate"> = {
    event: "messageCreate",
    procedure: async (client: Client, message: Message) => {
        if (message.author.bot) return;

        const messageSendersActualName = getMessageSendersActualName(message.cleanContent)
        if (messageSendersActualName == null) return; // u have no name

        const messageToSend = "Hi " + messageSendersActualName + ", I'm dad!";
        return message.channel.send(messageToSend);
    }
};

const getMessageSendersActualName = (content: string): string => {
    const wordsToSearchFor = ["im", "i'm", "i am"];
    const lowerCaseContent = content.toLowerCase();

    for (const wordToSearchFor of wordsToSearchFor) {
        const matches = lowerCaseContent.match("(?:^| ) ?" + wordToSearchFor + " ?(.*)(?:$| )")

        // did we find the word to search for in the message content?
        if (matches) {
            const name = matches[1]

            if (name != "") {
                return name
            }
        }
    }

    return null;
};

export default dad;
