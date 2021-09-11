import {Context, Suite} from "mocha";
import {censorWord} from "../../../src/commands/bans/banned";
import {expect} from "chai";

describe("banned", function (this: Suite) {
    // a | *
    it("should censor a single vowel", async function (this: Context) {
        return expect(censorWord("a")).to.eql("*");
    });

    // ag | *g
    it("should censor a vowel with 1 consonant on the right", async function (this: Context) {
        return expect(censorWord("ag")).to.eql("*g");
    });

    // agg | *gg
    it("should censor a vowel with 2 consonants on the right", async function (this: Context) {
        return expect(censorWord("agg")).to.eql("*gg");
    });

    // aggg | *ggg
    it("should censor a vowel with 3 consonants on the right", async function (this: Context) {
        return expect(censorWord("aggg")).to.eql("*ggg");
    });

    // agggg | *gggg
    it("should censor a vowel with 4 consonants on the right", async function (this: Context) {
        return expect(censorWord("agggg")).to.eql("*gggg");
    });

    // gga | gg*
    it("should censor a vowel with 2 consonants on the left", async function (this: Context) {
        return expect(censorWord("gga")).to.eql("gg*");
    });

    // ggga | ggg*
    it("should censor a vowel with 3 consonants on the left", async function (this: Context) {
        return expect(censorWord("ggga")).to.eql("ggg*");
    });

    // gaag | ga*g
    it("should censor the right vowel when there are two in the middle of an even length word", async function (this: Context) {
        return expect(censorWord("gaag")).to.eql("ga*g");
    });

    // gaga | g*ga
    it("should censor the closest vowel", async function (this: Context) {
        return expect(censorWord("gaga")).to.eql("g*ga");
    });

    // gggga | gggg*
    it("should censor a vowel with 4 consonants on the left", async function (this: Context) {
        return expect(censorWord("gggga")).to.eql("gggg*");
    });

    // gaagg | ga*gg
    it("should censor the middle vowel in an odd length word", async function (this: Context) {
        return expect(censorWord("gaagg")).to.eql("ga*gg");
    });

    // ggaag | gg*ag
    it("should censor the middle vowel in an odd length word", async function (this: Context) {
        return expect(censorWord("ggaag")).to.eql("gg*ag");
    });

    // gagag | g*gag
    it("should censor the left vowel when two are the same distance", async function (this: Context) {
        return expect(censorWord("gagag")).to.eql("g*gag");
    });

    // gaggag | gagg*g
    it("should censor the right vowel when two are the same distance in an even length word", async function (this: Context) {
        return expect(censorWord("gaggag")).to.eql("gagg*g");
    });

    // ggggg | ggggg
    it("should not censor anything when there are no vowels", async function (this: Context) {
        return expect(censorWord("ggggg")).to.eql("ggggg");
    });

    // A | *
    it("should censor capital vowels", async function (this: Context) {
        return expect(censorWord("A")).to.eql("*");
    });
});
