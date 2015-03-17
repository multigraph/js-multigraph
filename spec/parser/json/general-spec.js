/*global describe, it, beforeEach, expect, xit, jasmine, waitsFor, runs */
/*jshint  laxbreak:true */


describe("General JSON parsing", function () {
    "use strict";

    var Data = require('../../../src/core/data.js'),
        ArrayData = require('../../../src/core/array_data.js'),
        PeriodicArrayData = require('../../../src/core/periodic_array_data.js'),
        DataVariable = require('../../../src/core/data_variable.js'),
        NumberValue = require('../../../src/core/number_value.js'),
        DataValue = require('../../../src/core/data_value.js'),
        DatetimeValue = require('../../../src/core/datetime_value.js'),
        vF = require('../../../src/util/validationFunctions.js'),
        sprintf = require('sprintf'),
        CSVData,
        Multigraph,
        data;

    // returns true iff a and b are two (possibly nested) arrays with exactly
    // the same structure and same values
    function nested_arrays_equal(a, b) {
        if (vF.typeOf(a) === 'array' && vF.typeOf(b) === 'array') {
            if (a.length != b.length) { return false; }
            var i;
            for (i=0; i<a.length; ++i) {
                if (!nested_arrays_equal(a[i], b[i])) { return false; }
            }
            return true;
        } else {
            return a === b;
        }
    }

    var NodeJQueryHelper = require('../../node_jquery_helper.js');
    var $, jqw = NodeJQueryHelper.createJQuery();
    beforeEach(function() { $ = jqw.$; });

    beforeEach(function () {
        require('../../../src/parser/json/multigraph.js')($);
        CSVData = require('../../../src/core/csv_data.js')($);
        Multigraph = require('../../../src/core/multigraph.js')($);
    });


    it("Multigraph model should have a parseJSON method", function () {
        expect(typeof(Multigraph.parseJSON)).toBe("function");
    });

    describe("foo bar", function () {

        var location = NodeJQueryHelper.localFileURL(__dirname, "/../../../crn-webservice.json"),
            json;

        beforeEach(function (done) {
            var json = $.ajax({
                'url' : location,
                'dataType' : 'text',
                success: function(data) {
                    json = data;
                    done();
                }
            });
        });

        it("parsing", function () {
            try {
                var m = Multigraph.parseJSON(json);
            } catch (e) {
                console.log(e);
            }
            expect(m instanceof Multigraph).toBe(true);
        });
        it("normalizing", function () {
            var m = Multigraph.parseJSON(json);
            m.normalize();
            expect(m instanceof Multigraph).toBe(true);
        });

    });

});
