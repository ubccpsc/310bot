import {Listener} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {isUnhinged} from "../controllers/FeedbackController";

const REPLY = "haha unhinged";

const feedback: Listener<"messageCreate"> = {
    event: "messageCreate",
    procedure: async (client: Client, message: Message) => {
        if (!message.author.bot && await isUnhinged(message.cleanContent)) {
            return message.reply(REPLY);
        }
    }
};

export default feedback;
