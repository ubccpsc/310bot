import {Context, Suite} from "mocha";
import {clearDatabase} from "../harness/Util";
import {Log} from "@ubccpsc310/bot-base";
import {ban, getBannedWord, unban} from "../../src/controllers/BanController";
import {expect} from "chai";

describe("BanController", function (this: Suite) {
    
    const defaultBanRequester: string = "bob's son";

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
            await ban("  ", defaultBanRequester);
            expect.fail("Banning whitespace should have failed");
        } catch (err) {
            expect(err).to.be.instanceOf(Error);
            expect(await getBannedWord()).to.eql("");
        }
    });

    it("Should not ban with spoiler marks", async function (this: Context) {
        try {
            await ban("hello||world", defaultBanRequester);
            expect.fail("Banning hello||world should have failed");
        } catch (err) {
            expect(err).to.be.instanceOf(Error);
            expect(await getBannedWord()).to.eql("");
        }
        try {
            await ban("something|||else", defaultBanRequester);
            expect.fail("Banning something|||else should have failed");
        } catch (err) {
            expect(err).to.be.instanceOf(Error);
            expect(await getBannedWord()).to.eql("");
        }
        try {
            await ban("||spoiler||", defaultBanRequester);
            expect.fail("Banning ||spoiler|| should have failed");
        } catch (err) {
            expect(err).to.be.instanceOf(Error);
            expect(await getBannedWord()).to.eql("");
        }
    });

    it("Should ban with single bars", async function (this: Context) {
        try {
            await ban("|w|a|t|", defaultBanRequester);
        } catch (err) {
            Log.error(err);
            expect.fail("Banning |w|a|t| should have succeeded");
        }
        expect(await getBannedWord()).to.eql("|w|a|t|");
    });

    it("Should ban with other formatting", async function (this: Context) {
        try {
            await ban("**what**_are_`you`'doing'```here```", defaultBanRequester);
        } catch (err) {
            Log.error(err);
            expect.fail("Banning **what**_are_`you`'doing'```here``` should have succeeded");
        }
        expect(await getBannedWord()).to.eql("**what**_are_`you`'doing'```here```");
    });

    it("Should ban a word", async function (this: Context) {
        try {
            await ban("an*me", defaultBanRequester);
        } catch (err) {
            Log.error(err);
            expect.fail("Banning an*me should have succeeded");
        }
        expect(await getBannedWord()).to.eql("an*me");
    });

    it("Should make banned word lowercase", async function (this: Context) {
        try {
            await ban("MUT*TION", defaultBanRequester);
        } catch (err) {
            Log.error(err);
            expect.fail("Banning MUT*TION should have succeeded");
        }
        expect(await getBannedWord()).to.eql("mut*tion");
    });

    it("Should unban a word", async function (this: Context) {
        expect(await getBannedWord()).to.eql("mut*tion");
        await unban();
        expect(await getBannedWord()).to.eql("");
    });
});
