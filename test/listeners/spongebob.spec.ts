import {replaceAllWith} from "../../src/listeners/spongebob";
import {expect} from "chai";

describe("spongebob", function () {
    describe("replaceAllWith", function () {
        it("should not replace anything in an empty string", function () {
            expect(replaceAllWith(["foo"], "baz", ""))
                .to.equal("");
        });

        it("should not replace anything if the search is not found", function () {
            expect(replaceAllWith(["foo"], "baz", "bar"))
                .to.equal("bar");
        });

        it("should replace one search value", function () {
            expect(replaceAllWith(["foo"], "baz", "foo"))
                .to.equal("baz");
        });

        it("should replace one search value in a longer string", function () {
            expect(replaceAllWith(["foo"], "baz", "bar foo bar"))
                .to.equal("bar baz bar");
        });

        it("should replace multiple search values multiple times", function () {
            expect(replaceAllWith(["foo", "bar"], "baz", "foo bar foo bar"))
                .to.equal("baz baz baz baz");
        });

    });
});
