window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";

    ns.getKeys = function (obj) {
        var keys = [],
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    ns.insertDefaults = function (elem, defaults, attributes) {
        var i;
        for (i = 0; i < attributes.length; i++) {
            if (defaults[attributes[i]] !== undefined && (typeof(defaults[attributes[i]]) !== "object" || defaults[attributes[i]] === null)) {
                if (elem.attributes().indexOf(attributes[i]) > -1) {
                    elem.attribute(attributes[i]).defaultsTo(defaults[attributes[i]]);
                }
            }
        }
        return elem;
    };

    ns.getDefaultValuesFromXSD = function () {
        
        return {
            "window": {
//              "width": undefined,
//              "height": undefined,
                "border": 2,
                "margin" : function () { return new window.multigraph.math.Insets(/*top*/2, /*left*/2, /*bottom*/2, /*right*/2); },
                "padding": function () { return new window.multigraph.math.Insets(/*top*/5, /*left*/5, /*bottom*/5, /*right*/5); },
                "bordercolor": function () { return new window.multigraph.math.RGBColor.parse("0x000000"); }
            },
            "legend": {
                "icon" : {
                    "height": 30,
                    "width": 40,
                    "border": 1
                },
                "visible": null,
                "base": function () { return new window.multigraph.math.Point(1,1); },
                "anchor": function () { return new window.multigraph.math.Point(1,1); },
                "position": function () { return new window.multigraph.math.Point(0,0); },
                "frame": "plot",
                "color": function () { return new window.multigraph.math.RGBColor.parse("0xffffff"); },
                "bordercolor": function () { return new window.multigraph.math.RGBColor.parse("0x000000"); },
                "opacity": 1.0,
                "border": 1,
                "rows": undefined,
                "columns": undefined,
                "cornerradius": 0,
                "padding": 0
            },
            "background": {
                "img": {
                    "src": undefined,
                    "anchor": function () { return new window.multigraph.math.Point(-1,-1); },
                    "base": function () { return new window.multigraph.math.Point(-1,-1); },
                    "position": function () { return new window.multigraph.math.Point(0,0); },
                    "frame": "padding"
                },
                "color": "0xffffff"
            },
            "plotarea": {
                "margin" : function () { return new window.multigraph.math.Insets(/*top*/10 , /*left*/38, /*bottom*/35, /*right*/35); },
                "border": 0,
                "color" : null,
                "bordercolor": function () { return new window.multigraph.math.RGBColor.parse("0xeeeeee"); }
            },
            "title": {
                "text"         : undefined,
                "frame"        : "padding",
                "border"       : 0,
                "color"        : function () { return new window.multigraph.math.RGBColor.parse("0xffffff"); },
                "bordercolor"  : function () { return new window.multigraph.math.RGBColor.parse("0x000000"); },
                "opacity"      : 1.0,
                "padding"      : 0,
                "cornerradius" : 15,
                "anchor"       : function () { return new window.multigraph.math.Point(0,1); },
                "base"         : function () { return new window.multigraph.math.Point(0,1); },
                "position"     : function () { return new window.multigraph.math.Point(0,0); }
            },
            "horizontalaxis": {
                "title": {
                    "content": undefined,
//                    "fontname": "default",
//                    "fontsize": "12",
//                    "fontcolor": "0x000000",
                    "anchor": undefined,
                    "base" : 0,
                    "position": undefined,

                    "position-horizontal-top"    : function () { return new window.multigraph.math.Point(0, 15); },
                    "position-horizontal-bottom" : function () { return new window.multigraph.math.Point(0, -18); },
                    "position-vertical-right"    : function () { return new window.multigraph.math.Point(33, 0); },
                    "position-vertical-left"     : function () { return new window.multigraph.math.Point(-25, 0); },

                    "anchor-horizontal-top"      : function () { return new window.multigraph.math.Point(0, -1); },
                    "anchor-horizontal-bottom"   : function () { return new window.multigraph.math.Point(0, 1); },
                    "anchor-vertical-right"      : function () { return new window.multigraph.math.Point(-1, 0); },
                    "anchor-vertical-left"       : function () { return new window.multigraph.math.Point(1, 0); },

                    "angle": 0
                },
                "labels": {
                    "label": {
                        "format": undefined,
                        // NOTE: the Labeler object's default values for position and anchor should be undefined.
                        //       If those attributes are not specified in the MUGL, the Labeler's
                        //       initializeGeometry() method sets them to one of the context-dependent values
                        //       below.
                        "position": undefined,
                        "anchor": undefined,

                        "position-horizontal-top"    : function () { return new window.multigraph.math.Point(0, 5); },
                        "position-horizontal-bottom" : function () { return new window.multigraph.math.Point(0, -5); },
                        "position-vertical-right"    : function () { return new window.multigraph.math.Point(5, 0); },
                        "position-vertical-left"     : function () { return new window.multigraph.math.Point(-8, 0); },

                        "anchor-horizontal-top"      : function () { return new window.multigraph.math.Point(0, -1); },
                        "anchor-horizontal-bottom"   : function () { return new window.multigraph.math.Point(0, 1); },
                        "anchor-vertical-right"      : function () { return new window.multigraph.math.Point(-1, 0); },
                        "anchor-vertical-left"       : function () { return new window.multigraph.math.Point(1, 0); },

                        "angle": 0.0,
                        "spacing": undefined,
                        "densityfactor": 1.0,
                        "color" : function () { return new window.multigraph.math.RGBColor.parse("0x000000"); },
                        "visible" : true
//                        "fontname": undefined,
//                        "fontsize": undefined,
//                        "fontcolor": undefined
                    },
//                    "fontname": "default",
//                    "fontsize": "12",
//                    "fontcolor": "0x000000",
//                    "format": "%1d",
//                    "visible": "true",
                    "start-number": function () { return new window.multigraph.core.NumberValue(0); },
                    "start-datetime": function () { return new window.multigraph.core.DatetimeValue(0); },
                    "angle": 0.0,
                    "position": function () { return new window.multigraph.math.Point(0,0); },
                    "anchor": function () { return new window.multigraph.math.Point(0,0); },
                    "color" : function () { return new window.multigraph.math.RGBColor.parse("0x000000"); },
                    "visible" : true,
                    "defaultNumberSpacing": "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
                    "defaultDatetimeSpacing": "1000Y 500Y 200Y 100Y 50Y 20Y 10Y 5Y 2Y 1Y 6M 3M 2M 1M 7D 3D 2D 1D 12H 6H 3H 2H 1H",
                    "function": undefined,
                    "densityfactor": undefined
                },
                "grid": {
                    "color": function () { return new window.multigraph.math.RGBColor.parse("0xeeeeee"); },
                    "visible": false
                },
                "pan": {
                    "allowed": true,
                    "min": null,
                    "max": null
                },
                "zoom": {
                    "allowed": true,
                    "min": undefined,
                    "max": undefined,
                    "anchor": null
                },
                "binding": {
                    "id": undefined,
                    "min": undefined,
                    "max": undefined
                },
                "id": undefined,
                "type": "number",
//                "length": 1.0,
                "length" : function () { return new window.multigraph.math.Displacement(1,0); },
                "position": function () { return new window.multigraph.math.Point(0,0); },
                "pregap": 0,
                "postgap": 0,
                "anchor": -1,
                "base": function () { return new window.multigraph.math.Point(-1,-1); },
                "min": "auto",
                "minoffset": 0,
                //"minposition": -1,
                "minposition": function () { return new window.multigraph.math.Displacement(-1,0); },
                "max": "auto",
                "maxoffset": 0,
                //"maxposition": 1,
                "maxposition": function () { return new window.multigraph.math.Displacement(1,0); },
                "positionbase": undefined,
//                "color": "0x000000",
                "color": function () { return new window.multigraph.math.RGBColor(0,0,0); },
                "tickmin": -3,
                "tickmax": 3,
                "tickcolor": null,
                "highlightstyle": "axis",
                "linewidth": 1,
                "orientation": undefined
            },
            "verticalaxis": {
                "title": {
                    "content": undefined,
//                    "fontname": "default",
//                    "fontsize": "12",
//                    "fontcolor": "0x000000",
                    "anchor": function () { return new window.multigraph.math.Point(0,-20); },
                    "position": function () { return new window.multigraph.math.Point(0,1); },
                    "angle": "0"
                },
                "labels": {
                    "label": {
                        "format": undefined,
                        "start": undefined,
                        "angle": undefined,
                        "position": undefined,
                        "anchor": undefined,
                        "spacing": undefined,
                        "densityfactor": undefined
//                        "fontname": undefined,
//                        "fontsize": undefined,
//                        "fontcolor": undefined
                    },
//                    "fontname": "default",
//                    "fontsize": "12",
//                    "fontcolor": "0x000000",
                    "format": "%1d",
                    "visible": "true",
                    "start": "0",
                    "angle": "0.0",
                    "position": "0 0",
                    "anchor": "0 0",
//                    "spacing": "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
//                    "defaultDatetimeSpacing": "1000Y 500Y 200Y 100Y 50Y 20Y 10Y 5Y 2Y 1Y 6M 3M 2M 1M 7D 3D 2D 1D 12H 6H 3H 2H 1H",
                    "function": undefined,
                    "densityfactor": undefined
                },
                "grid": {
//                    "color": "0xeeeeee",
                    "visible": "false"
                },
                "pan": {
                    "allowed": "yes",
                    "min": undefined,
                    "max": undefined
                },
                "zoom": {
                    "allowed": "yes",
                    "min": undefined,
                    "max": undefined,
                    "anchor": "none"
                },
                "binding": {
                    "id": undefined,
                    "min": undefined,
                    "max": undefined
                },
                "id": undefined,
                "type": "number",
//                "length": "1.0",
                "position": "0 0",
                "pregap": "0",
                "postgap": "0",
                "anchor": "-1",
                "base": "-1 1",
                "min": "auto",
                "minoffset": "0",
                "minposition": "-1",
                "max": "auto",
                "maxoffset": "0",
                "maxposition": "1",
                "positionbase": undefined,
//                "color": "0x000000",
                "tickmin": "-3",
                "tickmax": "3",
                "highlightstyle": "axis",
                "linewidth": "1",
                "orientation": undefined
            },
            "plot": {
                "legend": {
                    "visible": true,
                    "label": undefined
                },
                "horizontalaxis": {
                    "variable": {
                        "ref": undefined,
                        "factor": undefined
                    },
                    "constant": {
                        "value": undefined
                    },
                    "ref": undefined
                },
                "verticalaxis": {
                    "variable": {
                        "ref": undefined,
                        "factor": undefined
                    },
                    "constant": {
                        "value": undefined
                    },
                    "ref": undefined
                },
                "filter": {
                    "option": {
                        "name": undefined,
                        "value": undefined
                    },
                    "type": undefined
                },
                "renderer":{
                    "option": {
                        "name": undefined,
                        "value": undefined,
                        "min": undefined,
                        "max": undefined
                    },
                    "type": function () { return window.multigraph.core.Renderer.Type.parse("line"); }
                },
                "datatips":{
                    "variable": {
                        "format": undefined
                    },
//                    "visible": "false",
                    "format": undefined,
//                    "bgcolor": "0xeeeeee",
                    "bgalpha": "1.0",
                    "border": 1,
//                    "bordercolor": "0x000000",
                    "pad": 2
                }
            },
            "throttle": {
                "pattern"    : "",
                "requests"   : 0,
                "period"     : 0,
                "concurrent" : 0
            },
            "data": {
                "variables": {
                    "variable": {
                        "id": undefined,
                        "column": undefined,
                        "type": "number",
                        "missingvalue": undefined,
                        "missingop": undefined
                    },
                    "missingvalue": "-9000",
                    "missingop": "eq"
                },
                "values": {
                    "content": undefined
                },
                "csv": {
                    "location": undefined
                },
                "service": {
                    "location": undefined
                }
            }
        };
        
    };
});
