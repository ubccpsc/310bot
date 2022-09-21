import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {giveFeedbackTo} from "../../controllers/FeedbackController";
import {removeMarkdown} from "../../util/Util";

const feedback: Command = {
    name: "feedback",
    description: "Adds a word to the list of words that should get feedback",
    usage: "feedback <word>+",
    procedure: async (client: Client, message: Message, args: string[]) => {
        let reply;
        if (args.length === 0) {
            reply = "???? what??????";
        } else {
            const cleanWords = args.map(removeMarkdown);
            await giveFeedbackTo(cleanWords);
            const replyWords = cleanWords.map(word => `\`${word}\``).join(", ");
            reply = `Giving feedback to: ${replyWords}`;
        }
        return message.channel.send(reply);
    },
};

export default feedback;
