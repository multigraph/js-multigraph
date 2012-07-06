/*global describe, it, beforeEach, expect, xit, jasmine */

describe("ValueType General Tests", function () {
    "use strict";

    var JSNumberValueType = window.multigraph.valuetype.JSNumberValueType,
        MTNumberValueType = window.multigraph.valuetype.MTNumberValueType,
        N = 1000000,
        v = 1.234,
        vinc = 1.01,
        i;
            

    beforeEach(function () {
    });


    function speedTests(NumberValueType, typename) {

        describe(typename, function() {

            it("create a long array", function () {
                var values = [],
                    newvalues = [];

                var startTime = new Date();
                for (i=0; i<N; ++i) {
                    values[i] = new NumberValueType(v);
                    v = v + vinc;
                }
                var time = (new Date()) - startTime;
                console.log("time for 'create a long array' for " + typename + ": " + time + "ms");
            });

            it("create consecutive sums of a long array", function () {
                var values = [],
                newvalues = [];

                var startTime = new Date();
                for (i=0; i<N; ++i) {
                    values[i] = new NumberValueType(v);
                    v = v + vinc;
                }
                for (i=0; i<N-1; ++i) {
                    newvalues[i] = new NumberValueType(values[i].getRealValue() + values[i+1].getRealValue());
                }
                var time = (new Date()) - startTime;
                console.log("time for 'create consecutive sums of a long array' for " + typename + ": " + time + "ms");
            });

        });

    }

    speedTests(JSNumberValueType, "JSNumberValueType");
    speedTests(MTNumberValueType, "MTNumberValueType");


});
