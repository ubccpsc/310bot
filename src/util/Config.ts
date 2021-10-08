import * as dotenv from 'dotenv';
dotenv.config();
import {Log} from "@ubccpsc310/bot-base";

export enum ConfigKey {
    botToken = "botToken",
    courseStaffId = "courseStaffId",
    studentId = "studentId",
    timeoutRoleId = "timeoutRoleId",
}

const config = {
    [ConfigKey.botToken]: process.env.BOT_TOKEN,

    [ConfigKey.courseStaffId]: "796809476351066132",
    [ConfigKey.studentId]: "796809476341628936",
    [ConfigKey.timeoutRoleId]: "811760490451435551",
};

export const getConfig = (key: ConfigKey): typeof config[ConfigKey] => {
    if (config[key] !== null && config[key] !== undefined) {
        return config[key];
    } else {
        Log.warn(`Config Key "${key}" was not set, yet accessed.`);
        return null;
    }
};
