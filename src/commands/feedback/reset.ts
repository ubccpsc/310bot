import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {reset as resetImpl} from "../../controllers/FeedbackController";

const reset: Command = {
    name: "reset",
    description: "Resets feedback",
    usage: "reset",
    procedure: (client: Client, message: Message) =>
        resetImpl().then(() => message.channel.send("Not giving feedback")),
};

export default reset;
