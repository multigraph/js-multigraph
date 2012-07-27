/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Data Values", function () {
    "use strict";

    var Values = window.multigraph.core.Values,
        values;

    beforeEach(function () {
        values = new Values();
    });

    it("should be able to create a Values", function () {
        expect(values instanceof Values).toBe(true);
    });

    describe("content attribute", function () {
        it("should be able to set/get the content attribute", function () {
            expect(values.content() === undefined).toBe(true);
            values.content('1,2,3\r\n4,5,6\r\n8,9,10');
            expect(values.content() === '1,2,3\r\n4,5,6\r\n8,9,10').toBe(true);
        });

    });

});
