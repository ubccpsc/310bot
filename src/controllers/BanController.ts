import {getDatabaseController} from "@ubccpsc310/bot-base";

type BannedWordEntity = {word: string, banRequester: string, id: "banned-word"};

const db = getDatabaseController();

let bannedWordCache: string;

const getBannedWord = async (): Promise<string> => {
    const bannedWord = bannedWordCache ??
        (await db.get<BannedWordEntity>("settings", "banned-word"))?.word;
    bannedWordCache = bannedWord ?? "";
    return bannedWordCache;
};

const getBanRequester = async(): Promise<string> => {
    return (await db.get<BannedWordEntity>("settings", "banned-word"))?.banRequester;
};

const ban = async (word: string, banRequester: string): Promise<void> => {
    if (/\s/.test(word)) {
        throw new Error("Cannot ban a word with whitespace");
    } else if (/\|\|/.test(word)) {
        throw new Error("Cannot ban a word with spoiler marks (||)");
    }
    const lowerWord = word.toLowerCase();
    await db.set<BannedWordEntity>("settings", {id: "banned-word", word: lowerWord, banRequester: banRequester});
    bannedWordCache = lowerWord;
};

const unban = async (): Promise<void> => {
    await db.delete("settings", "banned-word");
    bannedWordCache = "";
};

export {ban, unban, getBannedWord, getBanRequester};
