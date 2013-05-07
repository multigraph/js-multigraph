/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Datatips Normalizer", function () {
    "use strict";

    var Datatips = window.multigraph.core.Datatips,
        DatatipsVariable = window.multigraph.core.DatatipsVariable,
        DataPlot = window.multigraph.core.DataPlot,
        Data = window.multigraph.core.Data,
        DataVariable = window.multigraph.core.DataVariable,
        DataValue = window.multigraph.core.DataValue,
        NumberFormatter = window.multigraph.core.NumberFormatter,
        DatetimeFormatter = window.multigraph.core.DatetimeFormatter,
        plot,
        datatips;
    
    beforeEach(function () {
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        plot = new DataPlot();
        plot.variable().add(new DataVariable("x", 0, DataValue.NUMBER));
        plot.variable().add(new DataVariable("y", 1, DataValue.NUMBER));
    });

    describe("Handling Missing Variables", function () {
        it("Should create new datatips variables for any missing variables", function () {
            datatips = new Datatips();
            expect(datatips.variables().size()).toBe(0);
            datatips.normalize(plot);
            expect(datatips.variables().size()).toEqual(plot.variable().size());
        });
    });

    it("Should create new datatips variables for any missing variables", function () {
        datatips = new Datatips();
        expect(datatips.variables().size()).toBe(0);
        datatips.normalize(plot);
        expect(datatips.variables().size()).toEqual(plot.variable().size());
    });

    it("Should set the formatString to an appropriate value if it is missing", function () {
        var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD().plot.datatips.variable;

        plot = new DataPlot();
        plot.variable().add(new DataVariable("x", 0, DataValue.NUMBER));
        plot.variable().add(new DataVariable("y", 1, DataValue.NUMBER));
        plot.variable().add(new DataVariable("y1", 2, DataValue.DATETIME));

        datatips = new Datatips();
        datatips.variables().add((new DatatipsVariable()).formatString("hey"));
        datatips.variables().add(new DatatipsVariable());
        datatips.variables().add(new DatatipsVariable());

        expect(datatips.variables().at(0).formatString()).toBe("hey");
        expect(datatips.variables().at(1).formatString()).toBeUndefined();
        expect(datatips.variables().at(2).formatString()).toBeUndefined();

        datatips.normalize(plot);

        expect(datatips.variables().at(0).formatString()).toBe("hey");
        expect(datatips.variables().at(1).formatString()).toBe(defaultValues["formatString-number"]);
        expect(datatips.variables().at(2).formatString()).toBe(defaultValues["formatString-datetime"]);
    });

    it("Should create formatters with the proper formatString and Type", function () {
        var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD().plot.datatips.variable;

        plot = new DataPlot();
        plot.variable().add(new DataVariable("x", 0, DataValue.NUMBER));
        plot.variable().add(new DataVariable("y", 1, DataValue.NUMBER));
        plot.variable().add(new DataVariable("y1", 2, DataValue.DATETIME));

        datatips = new Datatips();
        datatips.variables().add((new DatatipsVariable()).formatString("hey"));
        datatips.variables().add(new DatatipsVariable());
        datatips.variables().add(new DatatipsVariable());

        expect(datatips.variables().at(0).formatString()).toBe("hey");
        expect(datatips.variables().at(1).formatString()).toBeUndefined();
        expect(datatips.variables().at(2).formatString()).toBeUndefined();

        datatips.normalize(plot);

        expect(datatips.variables().at(0).formatter() instanceof NumberFormatter).toBe(true);
        expect(datatips.variables().at(1).formatter() instanceof NumberFormatter).toBe(true);
        expect(datatips.variables().at(2).formatter() instanceof DatetimeFormatter).toBe(true);

        expect(datatips.variables().at(0).formatter().getFormatString()).toBe(datatips.variables().at(0).formatString());
        expect(datatips.variables().at(1).formatter().getFormatString()).toBe(datatips.variables().at(1).formatString());
        expect(datatips.variables().at(2).formatter().getFormatString()).toBe(datatips.variables().at(2).formatString());
    });

});
