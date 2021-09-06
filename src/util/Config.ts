import * as dotenv from 'dotenv';
dotenv.config();
import {Log} from "@ubccpsc310/bot-base";

export enum ConfigKey {
    botToken = "botToken",
}

const config = {
    [ConfigKey.botToken]: process.env.BOT_TOKEN,
};

export const getConfig = (key: ConfigKey): typeof config[ConfigKey] => {
    if (config[key] !== null && config[key] !== undefined) {
        return config[key];
    } else {
        Log.warn(`Config Key "${key}" was not set, yet accessed.`);
        return null;
    }
};
