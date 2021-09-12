import {expect} from "chai";
import {contentContainsWord} from "../../src/listeners/punishBan";

describe("punishBan", function () {
    describe("contentContainsWord", function () {
        it("should flag word on its own", function () {
            expect(contentContainsWord("ban", "ban")).to.be.true;
        });

        it("should flag word in a sentence", function () {
            expect(contentContainsWord("the word of the day is ban", "the")).to.be.true;
        });

        it("should not flag a word in a substring", function () {
            expect(contentContainsWord("is the word banned?", "ban")).to.be.false;
        });

        it("should flag a word surrounded by special characters", function () {
            expect(contentContainsWord("is the word 'banned' allowed?", "banned")).to.be.true;
        });

        it("should flag a word with markdown characters in it", function () {
            expect(contentContainsWord("is the word ba`nn`ed allowed?", "banned")).to.be.true;
            expect(contentContainsWord("is the word ba_nn_ed allowed?", "banned")).to.be.true;
            expect(contentContainsWord("is the word ba__nn__ed allowed?", "banned")).to.be.true;
            expect(contentContainsWord("is the word ba*nn*ed allowed?", "banned")).to.be.true;
            expect(contentContainsWord("is the word ba**nn**ed allowed?", "banned")).to.be.true;
            expect(contentContainsWord("is the word ba~~nn~~ed allowed?", "banned")).to.be.true;
            expect(contentContainsWord("is the ~~word bann~~ed allowed?", "banned")).to.be.true;
        });

        it("should not flag a word with other characters (or partial markdown characters) in it", function () {
            expect(contentContainsWord("is the word bann`ed allowed?", "banned")).to.be.false;
            expect(contentContainsWord("is the word bann'ed allowed?", "banned")).to.be.false;
            expect(contentContainsWord("is the word bann!ed allowed?", "banned")).to.be.false;
            expect(contentContainsWord("is the word b~ann~ed allowed?", "banned")).to.be.false;
            expect(contentContainsWord("is the word bann~~ed allowed?", "banned")).to.be.false;
            expect(contentContainsWord("is the word bann~~~~ed allowed?", "banned")).to.be.false;
            expect(contentContainsWord("is the word bann````ed allowed?", "banned")).to.be.false;
        });
    });
});
