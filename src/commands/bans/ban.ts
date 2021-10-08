import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {ban as banImpl} from "../../controllers/BanController";
import {ConfigKey, getConfig} from "../../util/Config";
import {removeMarkdown} from "../../util/Util";

const ban: Command = {
    name: "ban",
    description: "Bans a word",
    usage: "ban <word>",
    procedure: async (client: Client, message: Message, args: string[]) => {
        const courseStaffRoleID = getConfig(ConfigKey.courseStaffId);
        const courseStaffRole = await message.guild.roles.fetch(courseStaffRoleID);
        let reply;
        if (courseStaffRole.members.has(message.author.id)) {
            if (args.length === 0) {
                reply = "Ban what?";
            } else if (args.length > 1) {
                reply = "You can only ban one word at a time";
            } else {
                const [word] = args;
                const cleanedWord = removeMarkdown(word);
                const banRequester = message.author.id;
                try {
                    await banImpl(cleanedWord, banRequester);
                    reply = `Banned \`${cleanedWord.toLowerCase()}\``;
                } catch (e) {
                    reply = e?.message ?? `That word can't be banned`;
                }
            }
        } else {
            reply = "Try again when you are a TA";
        }
        return message.channel.send(reply);
    },
};

export default ban;
