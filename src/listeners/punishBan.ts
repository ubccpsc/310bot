import {Listener, Log} from "@ubccpsc310/bot-base";
import {Client, GuildMember, Message} from "discord.js";
import {getBannedWord} from "../controllers/BanController";
import {ConfigKey, getConfig} from "../util/Config";
import {removeMarkdown} from "../util/Util";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

const punish: Listener<"messageCreate"> = {
    event: "messageCreate",
    procedure: async (client: Client, message: Message) => {
        const bannedWord = await getBannedWord();
        if (!!bannedWord && contentContainsWord(message.cleanContent, bannedWord)) {
            if (await isCourseStaff(message)) {
                Log.debug("Course staff said a bad word but we're letting it go bc power trip time");
            } else if  (message.author.bot) {
                Log.debug("Bot said a bad word but we're letting it go bc it doesn't know any better");
            } else {
                const member = await message.guild.members.fetch(message.author.id);
                await punishAndScheduleForgiveness(member);
                return message.channel.send(`${member.toString()}, take five minutes to think about what you've done. You should know \`${bannedWord}\` is banned.`);
            }
        }
    }
};

const contentContainsWord = (content: string, word: string): boolean => {
    const delimiter = ",";
    const messageContent = content.toLowerCase();
    const withoutMarkdown = removeMarkdown(messageContent);
    const strippedContent = withoutMarkdown.replace(/[^a-zA-Z0-9]+/g, delimiter);
    const words = strippedContent.split(delimiter);
    return words.includes(word);
};

const punishAndScheduleForgiveness = async (member: GuildMember): Promise<void> => {
    // The smart thing to do here would be journal this in the database but let's just take a chance
    const oldRoles = Array.from(member.roles.valueOf().keys())
        .filter((role) => member.guild.roles.everyone.id !== role);
    await handlePunishment(member, oldRoles);
    // Pray there is no server restart at this time lol
    setTimeout(() => handleForgiveness(member, oldRoles), FIVE_MINUTES_MS);
};

const isCourseStaff = async (message: Message) => {
    const courseStaffRoleID = getConfig(ConfigKey.courseStaffId);
    const courseStaffRole = await message.guild.roles.fetch(courseStaffRoleID);
    return courseStaffRole.members.has(message.author.id);
};

const handlePunishment = (member: GuildMember, oldRoles: string[]) => {
    const futureRemovals = oldRoles.map((role) => member.roles.remove(role));
    const futureAddition = member.roles.add(getConfig(ConfigKey.timeoutRoleId));
    return Promise.all([...futureRemovals, futureAddition]);
};

const handleForgiveness = (member: GuildMember, oldRoles: string[]) => {
    const futureRemoval = member.roles.remove(getConfig(ConfigKey.timeoutRoleId));
    const futureAdditions = oldRoles.map((role) => member.roles.add(role));
    return Promise.all([...futureAdditions, futureRemoval]);
};

export {contentContainsWord};
export default punish;
