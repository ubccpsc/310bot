import {expect} from "chai";
import {removeMarkdown, censorWord} from "../../src/util/Util";

describe("Util", function () {
    describe("removeMarkdown", function () {
        it("should handle emphasis", function () {
            expect(removeMarkdown("test _test_ test")).to.equal("test test test");
            expect(removeMarkdown("test *test* test")).to.equal("test test test");
            expect(removeMarkdown("test *test** test")).to.equal("test test* test");
            expect(removeMarkdown("test *_* test")).to.equal("test _ test");
        });

        it("should handle double emphasis", function () {
            expect(removeMarkdown("test __test__ test")).to.equal("test test test");
            expect(removeMarkdown("test **test** test")).to.equal("test test test");
        });

        it("should handle strike through", function () {
            expect(removeMarkdown("te~~st te~~st")).to.equal("test test");
        });

        it("should handle inline code", function () {
            expect(removeMarkdown("`test test`")).to.equal("test test");
            expect(removeMarkdown("`test` `test`")).to.equal("test test");
        });

        it("should handle spoilers", function () {
            expect(removeMarkdown("test || test || test")).to.equal("test  test  test");
        });

        it("should not touch tags with nothing in between them", function () {
            expect(removeMarkdown("foo ~~~~ bar")).to.equal("foo ~~~~ bar");
            expect(removeMarkdown("foo `` bar")).to.equal("foo `` bar");
            expect(removeMarkdown("foo |||| bar")).to.equal("foo |||| bar");
            expect(removeMarkdown("foo ___ bar")).to.equal("foo ___ bar");
            expect(removeMarkdown("foo *** bar")).to.equal("foo *** bar");
        });

        it("should not touch partial tags", function () {
            expect(removeMarkdown("test ||test test")).to.equal("test ||test test");
            expect(removeMarkdown("test `test~ test")).to.equal("test `test~ test");
            expect(removeMarkdown("test *test_ test")).to.equal("test *test_ test");
        });
    });

    describe("censorWord", function () {
        // a | *
        it("should censor a single vowel", async function () {
            return expect(censorWord("a")).to.eql("*");
        });

        // ag | *g
        it("should censor a vowel with 1 consonant on the right", function () {
            return expect(censorWord("ag")).to.eql("*g");
        });

        // agg | *gg
        it("should censor a vowel with 2 consonants on the right", function () {
            return expect(censorWord("agg")).to.eql("*gg");
        });

        // aggg | *ggg
        it("should censor a vowel with 3 consonants on the right", function () {
            return expect(censorWord("aggg")).to.eql("*ggg");
        });

        // agggg | *gggg
        it("should censor a vowel with 4 consonants on the right", function () {
            return expect(censorWord("agggg")).to.eql("*gggg");
        });

        // gga | gg*
        it("should censor a vowel with 2 consonants on the left", function () {
            return expect(censorWord("gga")).to.eql("gg*");
        });

        // ggga | ggg*
        it("should censor a vowel with 3 consonants on the left", function () {
            return expect(censorWord("ggga")).to.eql("ggg*");
        });

        // gaag | ga*g
        it("should censor the right vowel when there are two in the middle of an even length word", function () {
            return expect(censorWord("gaag")).to.eql("ga*g");
        });

        // gaga | g*ga
        it("should censor the closest vowel", function () {
            return expect(censorWord("gaga")).to.eql("g*ga");
        });

        // gggga | gggg*
        it("should censor a vowel with 4 consonants on the left", function () {
            return expect(censorWord("gggga")).to.eql("gggg*");
        });

        // gaagg | ga*gg
        it("should censor the middle vowel in an odd length word", function () {
            return expect(censorWord("gaagg")).to.eql("ga*gg");
        });

        // ggaag | gg*ag
        it("should censor the middle vowel in an odd length word", function () {
            return expect(censorWord("ggaag")).to.eql("gg*ag");
        });

        // gagag | g*gag
        it("should censor the left vowel when two are the same distance", function () {
            return expect(censorWord("gagag")).to.eql("g*gag");
        });

        // gaggag | gagg*g
        it("should censor the right vowel when two are the same distance in an even length word", function () {
            return expect(censorWord("gaggag")).to.eql("gagg*g");
        });

        // ggggg | ggggg
        it("should not censor anything when there are no vowels", function () {
            return expect(censorWord("ggggg")).to.eql("ggggg");
        });

        // A | *
        it("should censor capital vowels", function () {
            return expect(censorWord("A")).to.eql("*");
        });
    });
});
