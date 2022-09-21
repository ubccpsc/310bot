import {getDatabaseController} from "@ubccpsc310/bot-base";

const db = getDatabaseController();

const clearDatabase = async (): Promise<void> => {
    const elements = await db.scan("settings", {});
    const ids = elements.map((element) => element.id);
    const futureDeletes = ids.map((id) => db.delete("settings", id));
    await Promise.all(futureDeletes);
};

export {clearDatabase};
