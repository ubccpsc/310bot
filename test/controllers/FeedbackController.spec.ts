import {isUnhinged, giveFeedbackTo, reset} from "../../src/controllers/FeedbackController";
import {clearDatabase} from "../harness/Util";
import {Log} from "@ubccpsc310/bot-base";
import {expect} from "chai";

describe("FeedbackController", function () {

    const HINGED_CONTENT = "a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a";
    const UNHINGED_CONTENT = "b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b b";
    const MORE_UNHINGED_CONTENT = "a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c a c";

    before(async function () {
        await clearDatabase();
        Log.info("Database cleared");
    });

    it("should not flag any content", async function () {
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.false;
    });

    it("should be able to give feedback on empty array", async function () {
        await giveFeedbackTo([]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.false;
    });

    it("should flag based on an unhinged word", async function () {
        await giveFeedbackTo(["b"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.true;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.false;
    });

    it("should allow me to flag the same word again", async function () {
        await giveFeedbackTo(["b"]);
        await giveFeedbackTo(["b"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.true;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.false;
    });

    it("should reset feedback words", async function () {
        await reset();
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.false;
    });

    it("should flag multiple words (covers two strings)", async function () {
        await giveFeedbackTo(["b", "c"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.true;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.true;
    });

    it("should flag only based on length", async function () {
        await reset();
        await giveFeedbackTo(["a"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.true;
    });

    it("should flag multiple words (both are in same string)", async function () {
        await reset();
        await giveFeedbackTo(["a", "c"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.true;
    });
});
