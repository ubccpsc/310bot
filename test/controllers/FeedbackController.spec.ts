import {isUnhinged, giveFeedbackTo, reset} from "../../src/controllers/FeedbackController";
import {clearDatabase} from "../harness/Util";
import {Log} from "@ubccpsc310/bot-base";
import {expect} from "chai";

describe("FeedbackController", function () {

    const HINGED_CONTENT = "I really like 310! This is my favourite course at UBC so far! I really appreciate the integrity of the teaching staff :)";
    const UNHINGED_CONTENT = "There should be a partial refund this and other courses that are online solely because UBC can’t find a room on campus. Online courses offer a significantly worse learning experience for many students. UBC has an enormous campus, $3Billion annual revenue and doesn’t even have a room for us to learn in for 3 hours a week? No rooms at all!? And this is a mandatory course so we don’t have an option to drop it and it’s online all year. I have no idea how the administration or professors can stand by the decision to charge students the full price for an inferior educational product. The excuse isn’t even Covid anymore it’s just “not enough rooms”.  If there’s any interest, I think we should start a petition and deliver it to the AMS to fight for a mandatory reduction of tuition fees for courses moved online because of their own logistical failings by 1-credit. Ex. We’re paying for a 4-credit course so we would pay for a 3-credit course. That seems like a reasonable compromise and will incentivize UBC to treat students less like commodities and more like customers.";
    const MORE_UNHINGED_CONTENT = "Well I didn’t think what I wrote was rude or unhinged. In fact I had another student express support before it was taken down.  What I was writing about, angrily yes, is that for UBC to force over 600 students (which generates probably over $500,000 in tuition fees and subsidies) to take a required course for CS degree online because they can’t find a room is ridiculous. It’s indicative of UBC’s lack of concern about the quality of their educational products as well as their students’ best interest. Do you honestly believe that a school the size of UBC has no way to offer this course in person? If you don’t care about this that’s fine but I had a very rough time with online classes during Covid and now this is still happening because UBC can’t find a room? It’s a lie Harry. You see that don’t you? It’s not because of a room. It’s because they want a profit. They sacrifice quality of the education for school’s profit at every turn. That, to me, is a textbook version of a lack of integrity. Tell me you all don’t feel the same way about UBC not caring about students half as much as their balance sheet. And if instead it’s simply for the professors convenience then they should say so and not lie. But I suspect UBC struggled to find profs for this course because nobody wanted to teach it which is why it stayed online.";

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
        await giveFeedbackTo(["petition"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.true;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.false;
    });

    it("should allow me to flag the same word again", async function () {
        await giveFeedbackTo(["petition"]);
        await giveFeedbackTo(["petition"]);
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
        await giveFeedbackTo(["unhinged", "rude", "refund"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.true;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.true;
    });

    it("should flag only based on length", async function () {
        await reset();
        await giveFeedbackTo(["integrity"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.true;
    });

    it("should flag multiple words (both are in same string)", async function () {
        await reset();
        await giveFeedbackTo(["unhinged", "integrity"]);
        expect(await isUnhinged(HINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(UNHINGED_CONTENT)).to.be.false;
        expect(await isUnhinged(MORE_UNHINGED_CONTENT)).to.be.true;
    });
});
