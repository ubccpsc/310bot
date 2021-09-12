import {expect} from "chai";
import {removeMarkdown} from "../../src/util/Util";

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
});
