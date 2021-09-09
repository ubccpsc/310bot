import {Command} from "@ubccpsc310/bot-base";
import {Client, Message} from "discord.js";
import {unban as unbanImpl} from "../../controllers/BanController";
import {ConfigKey, getConfig} from "../../util/Config";

const unban: Command = {
    name: "unban",
    description: "Unbans word",
    usage: "unban",
    procedure: async (client: Client, message: Message) => {
        const courseStaffRoleID = getConfig(ConfigKey.courseStaffId);
        const courseStaffRole = await message.guild.roles.fetch(courseStaffRoleID);
        let reply;
        if (courseStaffRole.members.has(message.author.id)) {
            await unbanImpl();
            reply = "No word banned";
        } else {
            reply = "Nice try buddy";
        }
        return message.channel.send(reply);
    },
};

export default unban;
