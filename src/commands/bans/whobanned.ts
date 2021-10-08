import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {getBanRequester as whoBannedImpl, getBannedWord as bannedWordImpl} from "../../controllers/BanController";

const whoBanned: Command = {
    name: "whobanned",
    "description": "Shows the username of the person who has banned a word",
    usage: "whobanned",
    procedure: async (client: Client, message: Message) => {
        const bannedWord = await bannedWordImpl();
        const reply = bannedWord !== "" ? `<@!${await whoBannedImpl()}> has requested the ban` : `No word banned`;
        return message.channel.send(reply);
    },
};

export default whoBanned;
