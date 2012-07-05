if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.utilityFunctions) {
    window.multigraph.utilityFunctions = {};
}

(function (ns) {
    "use strict";

    ns.utilityFunctions.getKeys = function (obj) {
        var keys = [],
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    ns.utilityFunctions.insertDefaults = function (elem, defaults, attributes) {
        var i;
        for (i = 0; i < attributes.length; i++) {
            if (defaults[attributes[i]] !== undefined && typeof(defaults[attributes[i]]) !== "object") {
                elem.attribute(attributes[i]).defaultsTo(defaults[attributes[i]]);
            }
        }
        return elem;
    };

    ns.utilityFunctions.parseInteger = function (number) {
        return parseInt(number, 10);
    };

    ns.utilityFunctions.parseIntegerOrUndefined = function (number) {
        number = parseInt(number, 10);
        return isNaN(number) === true ? undefined : number;
    };

    ns.utilityFunctions.parseDouble = function (number) {
        return Number(number);
    };

    ns.utilityFunctions.parseDoubleOrUndefined = function (number) {
        number = parseFloat(number);
        return isNaN(number) === true ? undefined : number;
    };

    ns.utilityFunctions.getDefaultValuesFromXSD = function () {
        
        return {
            "window": {
//              "width": undefined,
//              "height": undefined,
                "border": 2,
                "margin" : function() { return new ns.math.Insets(/*top*/2, /*left*/2, /*bottom*/2, /*right*/2); },
                "padding": function() { return new ns.math.Insets(/*top*/5, /*left*/5, /*bottom*/5, /*right*/5); },
                "bordercolor": "0x000000"
            },
            "ui": {
                "eventhandler": "saui"
            },
            "networkmonitor": {
                "visible" : undefined,
                "fixed": undefined
            },
            "debugger": {
                "visible" : undefined,
                "fixed": undefined
            },
            "legend": {
                "icon" : {
                    "height": 30,
                    "width": 40,
                    "border": 1
                },
                "visible": undefined,
                "base": "1 1",
                "anchor": "1 1",
                "position": "0 0",
                "frame": "plot",
                "color": "0xffffff",
                "bordercolor": "0x000000",
                "opacity": 1.0,
                "border": 1,
                "rows": undefined,
                "columns": 1,
                "cornerradius": 0,
                "padding": 0
            },
            "background": {
                "img": {
                    "src": undefined,
                    "anchor": "-1 -1",
                    "base": "-1 -1",
                    "position": "0 0",
                    "frame": "padding"
                },
                "color": "0xffffff"
            },
            "plotarea": {
                "margin" : function() { return new ns.math.Insets(/*top*/10 , /*left*/38, /*bottom*/35, /*right*/35); },
                "border": 0,
                "bordercolor": "0xeeeeee"
            },
            "title": {
                "content": undefined,
                "base": "0 1",
                "border": "0",
                "color": "0xffffff",
                "bordercolor": "0x000000",
                "opacity": 1.0,
                "padding": "0",
                "cornerradius": undefined,
                "position": "0 0",
                "anchor": "0 1"
            },
            "horizontalaxis": {
                "title": {
                    "content": undefined,
//                    "fontname": "default",
//                    "fontsize": "12",
//                    "fontcolor": "0x000000",
                    "position": "0 -20",
                    "anchor": "0 1",
                    "angle": 0
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
//                    "visible": "true",
                    "start": "0",
                    "angle": 0.0,
                    "position": "0 0",
                    "anchor": "0 0",
                    "spacing": "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
//                    "defaultDatetimeSpacing": "1000Y 500Y 200Y 100Y 50Y 20Y 10Y 5Y 2Y 1Y 6M 3M 2M 1M 7D 3D 2D 1D 12H 6H 3H 2H 1H",
                    "function": undefined,
                    "densityfactor": undefined
                },
                "grid": {
                    "color": "0xeeeeee",
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
                "axiscontrols": {
                    "visible": undefined
                },
                "id": undefined,
                "type": "number",
                "length": 1.0,
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
                "color": "0x000000",
                "tickmin": -3,
                "tickmax": 3,
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
                    "position": "0 -20",
                    "anchor": "0 1",
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
                    "spacing": "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
//                    "defaultDatetimeSpacing": "1000Y 500Y 200Y 100Y 50Y 20Y 10Y 5Y 2Y 1Y 6M 3M 2M 1M 7D 3D 2D 1D 12H 6H 3H 2H 1H",
                    "function": undefined,
                    "densityfactor": undefined
                },
                "grid": {
                    "color": "0xeeeeee",
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
                "axiscontrols": {
                    "visible": undefined
                },
                "id": undefined,
                "type": "number",
                "length": "1.0",
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
                "color": "0x000000",
                "tickmin": "-3",
                "tickmax": "3",
                "highlightstyle": "axis",
                "linewidth": "1",
                "orientation": undefined
            },
            "plot": {
                "legend": {
                    "visible": undefined,
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
                    "type": "line"
                },
                "datatips":{
                    "variable": {
                        "format": undefined
                    },
//                    "visible": "false",
                    "format": undefined,
                    "bgcolor": "0xeeeeee",
                    "bgalpha": "1.0",
                    "border": 1,
                    "bordercolor": "0x000000",
                    "pad": 2
                }
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

}(window.multigraph));
