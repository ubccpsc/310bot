import {Context, Suite} from "mocha";
import {clearDatabase} from "../harness/Util";
import {Log} from "@ubccpsc310/bot-base";
import {ban, getBannedWord, unban} from "../../src/controllers/BanController";
import {expect} from "chai";

describe("BanController", function (this: Suite) {
    before(async function (this: Context) {
        await clearDatabase();
        Log.info("Database cleared");
    });

    it("Should start with no word banned", async function (this: Context) {
        const bannedWord = await getBannedWord();
        return expect(bannedWord).to.eql("");
    });

    it("Should not ban with whitespace", async function (this: Context) {
        try {
            await ban("  ");
            expect.fail("Banning whitespace should have failed");
        } catch (err) {
            expect(err).to.be.instanceOf(Error);
            expect(await getBannedWord()).to.eql("");
        }
    });

    it("Should ban a word", async function (this: Context) {
        try {
            await ban("an*me");
        } catch (err) {
            Log.error(err);
            expect.fail("Banning whitespace should have succeeded");
        }
        expect(await getBannedWord()).to.eql("an*me");
    });

    it("Should make banned word lowercase", async function (this: Context) {
        try {
            await ban("MUT*TION");
        } catch (err) {
            Log.error(err);
            expect.fail("Banning whitespace should have succeeded");
        }
        expect(await getBannedWord()).to.eql("mut*tion");
    });

    it("Should unban a word", async function (this: Context) {
        expect(await getBannedWord()).to.eql("mut*tion");
        await unban();
        expect(await getBannedWord()).to.eql("");
    });
});
