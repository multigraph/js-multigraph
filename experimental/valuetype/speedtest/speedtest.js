window.multigraph.jQuery(document).ready(function() {
    "use strict";

    var JSNumberValueType = window.multigraph.valuetype.JSNumberValueType,
        MTNumberValueType = window.multigraph.valuetype.MTNumberValueType,
        N = 4000000;

    var ArrayTester = function(NumberValueType, typename, N) {

        var values = [],
            newvalues = [],
            startTime;

        this.testCreate = function() {
            var i,
                v = 1.234,
                vinc = 1.01;

            startTime = new Date();
            if (typename === "number") {
                for (i=0; i<N; ++i) {
                    values[i] = v;
                    v = v + vinc;
                }
            } else {
                for (i=0; i<N; ++i) {
                    values[i] = new NumberValueType(v);
                    v = v + vinc;
                }
            }
            return (new Date()) - startTime;
        };

        this.testRead = function() {
            var i, v;

            startTime = new Date();
            if (typename === "number") {
                for (i=0; i<N; ++i) {
                    v = values[i];
                }
            } else {
                for (i=0; i<N; ++i) {
                    v = values[i].getRealValue();
                }
            }
            return (new Date()) - startTime;
        };

        this.testAdd = function() {
            var i;
            startTime = new Date();
            if (typename === "number") {
                for (i=0; i<N-1; ++i) {
                    newvalues[i] = values[i] + values[i+1];
                }
            } else {
                for (i=0; i<N-1; ++i) {
                    newvalues[i] =
                        new NumberValueType(values[i].getRealValue() + values[i+1].getRealValue());
                }
            }
            return (new Date()) - startTime;
        };
    };

    var speedTester = new window.speedtester.SpeedTester();

    var number1Tester = new ArrayTester("number", "number", N);
    var number2Tester = new ArrayTester("number", "number", N);
    var jsTester = new ArrayTester(JSNumberValueType, "JSNumberValueType", N);
    var mtTester = new ArrayTester(MTNumberValueType, "MTNumberValueType", N);

    var createSpeedTest = function(id, func) {
        speedTester.createTest(
            function() {
                window.multigraph.jQuery('#td_' + id).css({'background-color':'#66ff66'});
                window.multigraph.jQuery('#' + id).text("running...");
            },
            function() {
                window.multigraph.jQuery('#td_' + id).css({'background-color':'#ffffff'});
                window.multigraph.jQuery('#' + id).text(func() + " ms");
            }
        );
    };

    window.multigraph.jQuery("#create_label").text("create array of length " + N);
    window.multigraph.jQuery("#read_label").text("read array of length " + N);
    window.multigraph.jQuery("#add_label").text("create new array of length " + N + " of consecutive sums");

    createSpeedTest("number1_create", function() {
        return number1Tester.testCreate();
    });
    createSpeedTest("number1_read", function() {
        return number1Tester.testRead();
    });
    createSpeedTest("number1_add", function() {
        return number1Tester.testAdd();
    });
    createSpeedTest("number2_create", function() {
        return number2Tester.testCreate();
    });
    createSpeedTest("number2_read", function() {
        return number2Tester.testRead();
    });
    createSpeedTest("number2_add", function() {
        return number2Tester.testAdd();
    });
    createSpeedTest("JSNumberValueType_create", function() {
        return jsTester.testCreate();
    });
    createSpeedTest("JSNumberValueType_read", function() {
        return jsTester.testRead();
    });
    createSpeedTest("JSNumberValueType_add", function() {
        return jsTester.testAdd();
    });
/*
    createSpeedTest("MTNumberValueType_create", function() {
        return mtTester.testCreate();
    });
    createSpeedTest("MTNumberValueType_read", function() {
        return mtTester.testRead();
    });
    createSpeedTest("MTNumberValueType_add", function() {
        return mtTester.testAdd();
    });
*/
    speedTester.runTests(function() {
        console.log("All speed tests completed.");
    });

});
