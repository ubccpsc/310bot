import {getDatabaseController} from "@ubccpsc310/bot-base";

type FeedbackEntity = {words: string[], id: "~feedback~"};

const db = getDatabaseController();

let feedbackWordsCache: string[];

const MIN_LEN_FOR_FEEDBACK = 1000;

const getFeedbackWords = async (): Promise<string[]> => {
    const feedbackWords = feedbackWordsCache ??
        (await db.get<FeedbackEntity>("settings", "~feedback~"))?.words;
    feedbackWordsCache = feedbackWords ?? [];
    return feedbackWordsCache;
};

const setFeedbackWords = async (words: string[]): Promise<void> => {
    await db.set<FeedbackEntity>("settings", {id: "~feedback~", words});
    feedbackWordsCache = words;
};

const isUnhinged = async (content: string): Promise<boolean> => {
    if (content.length >= MIN_LEN_FOR_FEEDBACK) {
        const words = await getFeedbackWords();
        const lowerContent = content.toLowerCase();
        return words.some((word) => lowerContent.includes(word));
    } else {
        return false;
    }
};

const giveFeedbackTo = async (words: string[]): Promise<void> => {
    const wordSet = new Set(await getFeedbackWords());
    words.forEach((word) => wordSet.add(word.toLowerCase()));
    return setFeedbackWords([...wordSet]);
};

const reset = async (): Promise<void> =>
    setFeedbackWords([]);

export {isUnhinged, giveFeedbackTo, reset};
