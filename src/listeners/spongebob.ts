import {Listener} from "@ubccpsc310/bot-base";
import {Client, Collection, GuildMember, Message, MessageMentions} from "discord.js";
import {ConfigKey, getConfig} from "../util/Config";
import {isStudent} from "../util/Util";

const spongebob: Listener<"messageCreate"> = {
    event: "messageCreate",
    procedure: async (client: Client, message: Message) => {
        if (message.author.bot) return;
        if (!message.cleanContent.includes("?")) return;
        if (!(await isStudent(message.author.id, message.guild))) return;

        const {tas, mentionedCourseStaff} = getPunishableMentions(message.mentions);
        if (!mentionedCourseStaff && tas.size === 0) return;

        const withCourseStaffReplaced = replaceAllWith(
            [getConfig(ConfigKey.courseStaffId)],
            getConfig(ConfigKey.studentId),
            spongebobbify(message.content),
        );
        const withTAsReplaced = replaceAllWith(
            tas.map((member) => member.id),
            message.author.id,
            withCourseStaffReplaced,
        );

        return message.channel.send(withTAsReplaced);
    }
};

const replaceAllWith = (searches: string[], value: string, starter: string): string => {
    return searches.reduce<string>((accumulator, search): string =>
            accumulator.replace(new RegExp(search, 'g'), value),
        starter);
};

const getPunishableMentions = (mentions: MessageMentions) => {
    const courseStaffId = getConfig(ConfigKey.courseStaffId);
    const {members, roles} = mentions;
    const tas = members.filter((member: GuildMember) =>
        member.roles.valueOf().has(courseStaffId));
    const mentionedCourseStaff = roles.has(courseStaffId);
    return {tas, mentionedCourseStaff};
};

const spongebobbify = (message: string) => message
    .split("")
    .map((char, index) =>
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase())
    .join("");

export {replaceAllWith};
export default spongebob;
