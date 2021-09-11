import * as fs from "fs-extra";

const clearDatabase = () =>
    fs.remove("./db");

export {clearDatabase};
