/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Renderer", function () {
    "use strict";

    var Renderer = window.multigraph.core.Renderer,
        r;

    beforeEach(function () {
        r = new Renderer(Renderer.LINE);
    }); 

    it("should be able to create a Renderer", function () {
        expect(r instanceof Renderer).toBe(true);
    });

    describe("type attribute", function () {
        it("should be able to set/get the type attribute", function () {
            r.type(Renderer.RANGEBAR);
            expect(r.type()).toBe(Renderer.RANGEBAR);
        });


        it("should throw an error if types value is not one of the predefined values", function () {
            expect(function () {
                r.type(Renderer.BARERROR);
            }).not.toThrow();
            expect(function () {
                r.type("barerrors");
            }).toThrowError("validator failed with parameter barerrors");
        });
    });

    describe("Option", function () {
        var RendererOption = window.multigraph.core.RendererOption,
            option;

        beforeEach(function () {
            option = new RendererOption("linewidth", "100");
        });

        //TODO: change to check for new style options
        xit("should be able to add a RendererOption to a Renderer", function () {
            r.options().add(option);
            expect(r.options().at(0)).toBe(option);
        });

        //TODO: change to check for new style options
        xit("should be able to add multiple RendererOptions to a Renderer", function () {
            var option2 = new RendererOption("linecolor", "0x123456");
            r.options().add(option);
            r.options().add(option2);
            expect(r.options().at(0)).toBe(option);
            expect(r.options().at(1)).toBe(option2);
        });

        //TODO: change to check for new style options
        xit("should be able to add an RendererOption with attributes to a Renderer", function () {
            option.name("linewidth");
            option.value("100");
            r.options().add(option);
            expect(r.options().at(0)).toBe(option);
        });

        //TODO: change to check for new style options
        xit("should be able to add multiple RendererOptions with attributes to a Renderer", function () {
            var option2 = new RendererOption("linecolor", "0x123456"),
                option3 = new RendererOption("dotsize", "2");
            option.name("linewidth");
            option.value("13");
            option3.min("2");
            r.options().add(option);
            r.options().add(option2);
            r.options().add(option3);
            expect(r.options().at(0)).toBe(option);
            expect(r.options().at(1)).toBe(option2);
            expect(r.options().at(2)).toBe(option3);
        });

        //TODO: change to check for new style options
        xit("should be able to set/get attributes of an RendererOption added to a Renderer", function () {
            r.options().add(option);
            r.options().at(0).name("dotcolor");
            r.options().at(0).value("0x0945AF");
            expect(r.options().at(0).name()).toBe("dotcolor");
            expect(r.options().at(0).value()).toBe("0x0945AF");
        });

    });

    describe("concrete Renderer subclass implementation", function () {

        var TestRenderer;

        beforeEach(function () {
            TestRenderer = new window.jermaine.Model("TestRenderer", function () {
                this.isA(Renderer);
            });
        });

        var declareOptions = function () {
            Renderer.declareOptions(TestRenderer, "TestRendererOptions", [
                {
                    'name'          : 'linecolor',
                    'type'          : Renderer.RGBColorOption,
                    'default'       : new window.multigraph.math.RGBColor(0,0,1)
                },
                {
                    'name'          : 'linewidth',
                    'type'          : Renderer.NumberOption,
                    'default'       : 1.23
                }
            ]);
        };

        it("should be able to create an instance of a subclass of Renderer", function () {
            var renderer = new TestRenderer();
            expect(renderer instanceof TestRenderer).toBe(true);
        });

        it("instance of subclass of Renderer should also be an instance of Renderer", function () {
            var renderer = new TestRenderer();
            expect(renderer instanceof Renderer).toBe(true);
        });

        it("declareOptions should not throw an error", function () {
            var renderer = new TestRenderer();
            expect(function () {
                declareOptions();
            }).not.toThrow();
        });

        it("declareOptions should add a 'options' attribute to TestRenderer", function () {
            declareOptions();
            var renderer = new TestRenderer();
            expect(typeof(renderer.options)).toEqual("function");
        });

        it("value of TestRenderer's options attribute should be a model with 'linecolor' and 'linewidth' attributes", function () {
            declareOptions();
            var renderer = new TestRenderer();
            expect(typeof(renderer.options().linecolor)).toEqual("function");
            expect(typeof(renderer.options().linewidth)).toEqual("function");
        });

        it("should be able to add a Renderer.RGBColorOption instance to options's 'linecolor'", function () {
            declareOptions();
            var renderer = new TestRenderer();
            var color = new window.multigraph.math.RGBColor(0,1,0);
            renderer.options().linecolor().add( new Renderer.RGBColorOption(color) );
            expect(renderer.options().linecolor().at(1).value()).toEqual(color);
        });

        it("attempt to add anything other than a Renderer.RGBColorOption instance to options's 'linecolor' should throw an error", function () {
            declareOptions();
            var renderer = new TestRenderer();
            var color = new window.multigraph.math.RGBColor(0,1,0);
            expect(function () {
                renderer.options().linecolor().add(new Renderer.NumberOption(4));
            }).toThrow();
            expect(function () {
                renderer.options().linecolor().add("NotAnOption");
            }).toThrow();
        });

        it("should be able to add a Renderer.NumberOption instance to options's 'linewidth'", function () {
            declareOptions();
            var renderer = new TestRenderer();
            var width = 12.2;
            renderer.options().linewidth().add( new Renderer.NumberOption(width) );
            expect(renderer.options().linewidth().at(1).value()).toEqual(width);
        });

        it("attempt to add anything other than a Renderer.NumberOption instance to options's 'linewidth' should throw an error", function () {
            declareOptions();
            var renderer = new TestRenderer();
            var width = 12.2;
            expect(function () {
                renderer.options().linewidth().add(new Renderer.RGBColorOption(new window.multigraph.math.RGBColor(1,0,0)));
            }).toThrow();
            expect(function () {
                renderer.options().linewidth().add("NotAnOption");
            }).toThrow();
        });

        describe("TestRenderer instance's optionsMetadata object", function () {
            var renderer;
            beforeEach(function () {
                declareOptions();
                renderer = new TestRenderer();
            });
            it("should be an object", function () {
                expect(typeof(renderer.optionsMetadata)).toEqual("object");
            });
            it("should have a linecolor attribute which is an object", function () {
                expect(typeof(renderer.optionsMetadata.linecolor)).toEqual("object");
            });
            it("should have a linecolor attribute which is an object with a 'type' attribute whose value is correct", function () {
                expect(renderer.optionsMetadata.linecolor.type).toEqual(Renderer.RGBColorOption);
            });
            it("should have a linewidth attribute which is an object", function () {
                expect(typeof(renderer.optionsMetadata.linewidth)).toEqual("object");
            });
            it("should have a linewidth attribute which is an object with a 'type' attribute whose value is correct", function () {
                expect(renderer.optionsMetadata.linewidth.type).toEqual(Renderer.NumberOption);
            });
            it("should have a linewidth attribute which is an object with a 'default' attribute whose value is correct", function () {
                expect(renderer.optionsMetadata.linewidth['default']).toEqual(1.23);
            });
        });


        describe("TestRenderer's setOptionFromString method", function () {
            var renderer;
            beforeEach(function () {
                declareOptions();
                renderer = new TestRenderer();
            });
            it("should exist and be a function", function () {
                expect(typeof(renderer.setOptionFromString)).toEqual("function");
            });
            it("should be able to set a linecolor value with no min or max setting", function () {
                expect(function () {
                    renderer.setOptionFromString("linecolor", "0xffff00");
                }).not.toThrow();
                expect(renderer.options().linecolor().size()).toEqual(1);
                expect(renderer.options().linecolor().at(0) instanceof Renderer.RGBColorOption).toBe(true);
                expect(renderer.options().linecolor().at(0).serializeValue()).toEqual("0xffff00");
            });
            it("should be able to set a linecolor value with both a min and max setting", function () {
                // NOTE: renderer needs a vertical axis with a defined "type" for this, so that it knows how to parse min/max values from strings!
                var Axis = window.multigraph.core.Axis;
                var DataValue = window.multigraph.core.DataValue;
                var NumberValue = window.multigraph.core.NumberValue;
                var DataPlot = window.multigraph.core.DataPlot;
                var plot = (
                    (new DataPlot())
                        .verticalaxis((new Axis(Axis.VERTICAL)).type(DataValue.NUMBER))
                        .horizontalaxis((new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER))
                );
                renderer.plot(plot);

                expect(function () {
                    renderer.setOptionFromString("linecolor", "0xffff00", new NumberValue(-1), new NumberValue(1));
                }).not.toThrow();
                expect(renderer.options().linecolor().size()).toEqual(2);
                expect(renderer.options().linecolor().at(1) instanceof Renderer.RGBColorOption).toBe(true);
                expect(renderer.options().linecolor().at(1).serializeValue()).toEqual("0xffff00");
                expect(renderer.options().linecolor().at(1).min().getRealValue()).toEqual(-1);
                expect(renderer.options().linecolor().at(1).max().getRealValue()).toEqual(1);

            });
            it("should be able to set a couple linecolors with different min/max vals, and correctly fetch results using getOptionValue", function () {
                // NOTE: renderer needs a vertical axis with a defined "type" for this, so that it knows how to parse min/max values from strings!
                var Axis = window.multigraph.core.Axis;
                var DataValue = window.multigraph.core.DataValue;
                var NumberValue = window.multigraph.core.NumberValue;
                var DataPlot = window.multigraph.core.DataPlot;
                var plot = (
                    (new DataPlot())
                        .verticalaxis((new Axis(Axis.VERTICAL)).type(DataValue.NUMBER))
                        .horizontalaxis((new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER))
                );
                renderer.plot(plot);

                expect(function () {
                    renderer.setOptionFromString("linecolor", "0xff0000", new NumberValue(0), new NumberValue(10));
                    renderer.setOptionFromString("linecolor", "0x00ff00", new NumberValue(10), new NumberValue(20));
                }).not.toThrow();
                expect(renderer.options().linecolor().size()).toEqual(3);

                expect(renderer.getOptionValue("linecolor", new NumberValue(5)).getHexString()).toEqual("0xff0000");
                expect(renderer.getOptionValue("linecolor", new NumberValue(15)).getHexString()).toEqual("0x00ff00");
                expect(renderer.getOptionValue("linecolor", new NumberValue(25)).getHexString()).toEqual("0x0000ff");
            });


            it("defaults", function () {
                // NOTE: renderer needs a vertical axis with a defined "type" for this, so that it knows how to parse min/max values from strings!
                var Axis = window.multigraph.core.Axis;
                var DataValue = window.multigraph.core.DataValue;
                var NumberValue = window.multigraph.core.NumberValue;
                var DataPlot = window.multigraph.core.DataPlot;
                var plot = (
                    (new DataPlot())
                        .verticalaxis((new Axis(Axis.VERTICAL)).type(DataValue.NUMBER))
                        .horizontalaxis((new Axis(Axis.HORIZONTAL)).type(DataValue.NUMBER))
                );
                renderer.plot(plot);

                expect(renderer.options().linecolor().size()).toEqual(1);
                expect(renderer.options().linewidth().size()).toEqual(1);

                expect(renderer.getOptionValue("linecolor").getHexString()).toEqual("0x0000ff");
                expect(renderer.getOptionValue("linewidth")).toEqual(1.23);

/*
                expect(function () {
                    renderer.setOptionFromString("linecolor", "0xff0000", new NumberValue(0), new NumberValue(10));
                    renderer.setOptionFromString("linecolor", "0x00ff00", new NumberValue(10), new NumberValue(20));
                }).not.toThrow();

                expect(renderer.getOptionValue("linecolor", new NumberValue(5)).getHexString()).toEqual("0xff0000");
                expect(renderer.getOptionValue("linecolor", new NumberValue(15)).getHexString()).toEqual("0x00ff00");
                // default value:
                expect(renderer.getOptionValue("linecolor", new NumberValue(25)).getHexString()).toEqual("0x0000ff");
*/

            });


        });

    });

});
