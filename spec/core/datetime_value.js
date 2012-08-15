/*global describe, it, beforeEach, expect, xit, jasmine */

xdescribe("DatetimeValue", function () {
    "use strict";

    var DatetimeValue = window.multigraph.core.DatetimeValue,
        DatetimeMeasure = window.multigraph.core.DatetimeMeasure;

    //
    // NOTE: The unix timestamp (in milliseconds) for
    //           2012-08-12--16:25:54.123
    //       is
    //           1347467154123
    //       In other words, the number of milliseconds that elapsed between
    //       midnight Jan 1 1970 and 2012-08-12--16:25:54.123 is 1347467154123.
    //

    describe("constructor", function() {

	it("should be able to create a DatetimeValue", function () {
            var x = new DatetimeValue(1347467154123);
            expect(x instanceof DatetimeValue).toBe(true);
	});

	it("should throw an error if passed anything other than a number", function () {
	    expect(function() {
		new DatetimeValue("foo")
	    }).toThrow();
	    expect(function() {
		new DatetimeValue()
	    }).toThrow();
	    expect(function() {
		new DatetimeValue({})
	    }).toThrow();
	    expect(function() {
		new DatetimeValue([])
	    }).toThrow();
	});

    });

    describe("getRealValue() method", function () {

	it("should return the unix timestamp (in milliseconds) used in the constructor", function () {
	    var x = new DatetimeValue(1347467154123);
            expect(x.getRealValue()).toEqual(1347467154123);
	});

    });

    describe("parse() method", function () {

	it("should exist", function() {
	    expect(typeof(DatetimeValue.parse)).toEqual("function");
	});

	var testParse = function(string, format, ms) {
	    it("should correctly parse a string in the format "+format, function () {
		var x = DatetimeValue.parse(string);
		expect(x instanceof DatetimeValue).toBe(true);
		expect(x.getRealValue()).toEqual(ms);
	    });
	};
	
	testParse("20120812162554.123", "YYYYMMDDHHmmss.sss", 1344788754123);
	testParse("20120812162554",     "YYYYMMDDHHmmss",     1344788754000);
	testParse("201208121625", 	"YYYYMMDDHHmm",       1344788700000);
        testParse("2012081216",         "YYYYMMDDHH", 	      1344787200000);
        testParse("20120812",           "YYYYMMDD", 	      1344729600000);
        testParse("201208",             "YYYYMM", 	      1343779200000);
        testParse("2012",               "YYYY", 	      1325376000000);


	//NOTE: the parse() method should remove all spaces, dashes, and colons from its input string before
	//      parsing it, so that the string is parsed as if those characters had not been there.
	var testParse2 = function(string, format, ms) {
	    it("should correctly ignore spaces, dashes, and colons when parsing a string in the format "+format, function () {
		var x = DatetimeValue.parse(string);
		expect(x instanceof DatetimeValue).toBe(true);
		expect(x.getRealValue()).toEqual(ms);
	    });
	};
	
	testParse2("2012-08-12--16-25-54.123", "YYYYMMDDHHmmss.sss", 1344788754123);
	testParse2("2012-08-12 16:25:54.123",  "YYYYMMDDHHmmss.sss", 1344788754123);
	testParse2("2012-08-12-16:25:54",      "YYYYMMDDHHmmss",     1344788754000);
	testParse2("2012-08-12 16:25:54",      "YYYYMMDDHHmmss",     1344788754000);
	testParse2("2012-08-12 16:25", 	       "YYYYMMDDHHmm",       1344788700000);
        testParse2("2012-08-12-16",            "YYYYMMDDHH", 	     1344787200000);
        testParse2("2012-08-12",               "YYYYMMDD", 	     1344729600000);
        testParse2("2012-08",                  "YYYYMM", 	     1343779200000);
        testParse2("2012",                     "YYYY", 	             1325376000000);


	it("should create a DatetimeValue whose getRealValue() for the date Jan 1, 1970 00:00:00 is 0", function () {
	    expect(DatetimeValue.parse("1970").getRealValue()).toEqual(0);
	});

    });

    describe("toString() method", function() {

	it("should exist", function() {
	    var d = DatetimeValue.parse("20120801");
	    expect(typeof(d.toString)).toEqual("function");
	});

	var testToString = function(inputString, expectedOutputString) {
	    expect(DatetimeValue.parse(inputString).toString()).toEqual(expectedOutputString);
	};

        testToString("20120812162554.123",   "20120812162554.123");
        testToString("20120812162554.0",     "20120812162554");
        testToString("20120812162554",       "20120812162554");
        testToString("201208121625",         "20120812162500");
        testToString("2012081216",           "20120812160000");
        testToString("20120812",             "20120812000000");
        testToString("201208",               "20120801000000");
        testToString("2012",                 "20120101000000");

    });

    describe("add() method", function() {
	var testAdd = function(dateString, deltaString, resultString) {
	    it("should return "+resultString+" when " + deltaString + " is added to " + dateString, function() {
		expect(DatetimeValue.parse(dateString).add(DatetimeMeasure.parse(deltaString)).eq(DatetimeValue.parse(resultString))).toBe(true);
	    });
	};

	testAdd("2012",               "1Y",   "2013"              );
	testAdd("20120801",           "3D",   "20120804"          );
	testAdd("20120801122432",     "3D",   "20120804122432"    );
	testAdd("20120226",           "4D",   "20120301"          );
	testAdd("20120226122432",     "4D",   "20120301122432"    );
	testAdd("20110226",           "4D",   "20120302"          );
	testAdd("20110226122432",     "4D",   "20120302122432"    );
	testAdd("20120815",           "1W",   "20120822"          );
	testAdd("20120815122432",     "1W",   "20120822122432"    );
	testAdd("20120813",           "1M",   "20120913"          );
	testAdd("20120813122432",     "1M",   "20120913122432"    );
	testAdd("20120813",           "7M",   "20130213"          );
	testAdd("20120813122432",     "7M",   "20130213122432"    );
	testAdd("20120813122432",     "3H",   "20120813152432"    );
	testAdd("20120813122432",    "12H",   "20120814002432"    );
	testAdd("20120813122432",     "3m",   "20120813122732"    );
	testAdd("20120813122432",    "50m",   "20120813131432"    );
	testAdd("20120813122432",     "3s",   "20120813122435"    );
	testAdd("20120813122432",    "50s",   "20120813122522"    );
	testAdd("20120813122432", "3.123s",   "20120813122435.123");
     });

    describe("compareTo", function () {

        var first, second, otherFirst;

        beforeEach(function () {
            first       = DatetimeValue.parse("19981004001323");
            second      = DatetimeValue.parse("20051224024323");
            otherFirst  = DatetimeValue.parse("19981004001323");
        });
        
        it("compareTo should return -1 for <", function () {
            expect(first.compareTo(second)).toEqual(-1);
        });
        it("compareTo should return +1 for >", function () {
            expect(second.compareTo(first)).toEqual(1);
        });
        it("compareTo should return 0 for =", function () {
            expect(first.compareTo(otherFirst)).toEqual(0);
        });

        describe("comparator mixins", function () {

            it("lt should work correctly", function () {
                expect(first.lt(second)).toBe(true);
                expect(second.lt(first)).toBe(false);
                expect(first.lt(otherFirst)).toBe(false);
            });
            it("le should work correctly", function () {
                expect(first.le(second)).toBe(true);
                expect(second.le(first)).toBe(false);
                expect(first.le(otherFirst)).toBe(true);
            });
            it("eq should work correctly", function () {
                expect(first.eq(second)).toBe(false);
                expect(second.eq(first)).toBe(false);
                expect(first.eq(otherFirst)).toBe(true);
            });
            it("ge should work correctly", function() {
                expect(first.ge(second)).toBe(false);
                expect(second.ge(first)).toBe(true);
                expect(first.ge(otherFirst)).toBe(true);
            });
            it("gt should work correctly", function () {
                expect(first.gt(second)).toBe(false);
                expect(second.gt(first)).toBe(true);
                expect(first.gt(otherFirst)).toBe(false);
            });

        });

    });

});
