import {getMessageSendersActualName} from "../../src/listeners/dad";
import {expect} from "chai";

describe("dad", function () {
    describe("getMessageSendersActualName", function () {
        it("should not find a name if there is no name", function () {
            expect(getMessageSendersActualName("foo bar baz")).to.not.exist;
            expect(getMessageSendersActualName("imagine")).to.not.exist;
            expect(getMessageSendersActualName("i'm.")).to.not.exist;
            expect(getMessageSendersActualName("im")).to.not.exist;
            expect(getMessageSendersActualName("him her")).to.not.exist;
        });

        it("should find a name at the end of string", function () {
            expect(getMessageSendersActualName("i'm bob")).to.equal("bob");
            expect(getMessageSendersActualName("hi, I'm bob")).to.equal("bob");
            expect(getMessageSendersActualName("i'M bob")).to.equal("bob");
            expect(getMessageSendersActualName("HI, IM bob")).to.equal("bob");
            expect(getMessageSendersActualName("im BOB")).to.equal("bob");
            expect(getMessageSendersActualName("hi -- i am bob")).to.equal("bob");
            expect(getMessageSendersActualName("I AM BOB")).to.equal("bob");
        });

        it("should find a name followed by a space", function () {
            expect(getMessageSendersActualName("i'm bob foo")).to.equal("bob");
            expect(getMessageSendersActualName("hi, I'm bob foo")).to.equal("bob");
            expect(getMessageSendersActualName("i'M bob foo")).to.equal("bob");
            expect(getMessageSendersActualName("HI, IM bob foo")).to.equal("bob");
            expect(getMessageSendersActualName("im BOB foo")).to.equal("bob");
            expect(getMessageSendersActualName("hi -- i am bob foo")).to.equal("bob");
            expect(getMessageSendersActualName("I   AM    BOB foo")).to.equal("bob");
        });

        it("should find a name followed by a special character", function () {
            expect(getMessageSendersActualName("i'm bob! foo")).to.equal("bob");
            expect(getMessageSendersActualName("hi, I'm bob. foo")).to.equal("bob");
            expect(getMessageSendersActualName("i'M bob? foo")).to.equal("bob");
            expect(getMessageSendersActualName("HI, IM  bob. foo")).to.equal("bob");
            expect(getMessageSendersActualName("im BOB. foo")).to.equal("bob");
            expect(getMessageSendersActualName("(hi -- i am bob) foo")).to.equal("bob");
        });

        it("should find a name wrapped in special characters", function () {
            expect(getMessageSendersActualName("(I  AM BOB) foo")).to.equal("bob");
            expect(getMessageSendersActualName("(i'm BOB) foo")).to.equal("bob");
            expect(getMessageSendersActualName("(im   BOB) foo")).to.equal("bob");
        });
    });
});
