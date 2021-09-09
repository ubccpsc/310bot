import {getDatabaseController} from "../../../bot-base";

type BannedWordEntity = {word: string, id: "banned-word"};

const db = getDatabaseController();

let bannedWordCache: string;

const getBannedWord = async (): Promise<string> => {
    const bannedWord = bannedWordCache ??
        (await db.get<BannedWordEntity>("settings", "banned-word"))?.word;
    bannedWordCache = bannedWord ?? "";
    return bannedWordCache;
};

const ban = async (word: string): Promise<void> => {
    if (/[\n\t\r ]/.test(word)) {
        throw new Error("Cannot ban a word with whitespace");
    }
    await db.set<BannedWordEntity>("settings", {id: "banned-word", word: word.toLowerCase()});
    bannedWordCache = word;
};

const unban = async (): Promise<void> => {
    await db.delete("settings", "banned-word");
    bannedWordCache = "";
};

export {ban, unban, getBannedWord};
