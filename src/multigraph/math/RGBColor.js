if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.math) {
    window.multigraph.math = {};
}

(function (ns) {
    "use strict";

    var RGBColor = new ns.ModelTool.Model( "RGBColor", function () {
        
        this.hasA("r").which.validatesWith(function (r) {
            return ns.utilityFunctions.validateNumberRange(r, 0, 1.0);
        });
        this.hasA("g").which.validatesWith(function (g) {
            return ns.utilityFunctions.validateNumberRange(g, 0, 1.0);
        });
        this.hasA("b").which.validatesWith(function (b) {
            return ns.utilityFunctions.validateNumberRange(b, 0, 1.0);
        });

        var numberToHex = function (number) {
            number = parseInt(number * 255, 10).toString(16);
            if (number.length === 1) {
                number = "0" + number;
            }
            return number;
        };

        this.respondsTo("getHexString", function (prefix) {
            if (!prefix) {
                prefix = "0x";
            }
            return prefix + numberToHex(this.r()) + numberToHex(this.g()) + numberToHex(this.b());
        });
        this.isBuiltWith("r", "g", "b");

    });

    RGBColor.parse = function (string) {
        var red,
            green,
            blue,
            grey,
            colorObj;

        if (string === undefined) {
            return undefined;
        } else if (typeof(string) === 'string') {
            string = string.toLowerCase();

            switch (string) {
            case "black":
                red = 0;
                green = 0;
                blue = 0;
                break;
            case "red":
                red = 1;
                green = 0;
                blue = 0;
                break;
            case "green":
                red = 0;
                green = 1;
                blue = 0;
                break;
            case "blue":
                red = 0;
                green = 0;
                blue = 1;
                break;
            case "yellow":
                red = 1;
                green = 1;
                blue = 0;
                break;
            case "magenta":
                red = 1;
                green = 0;
                blue = 1;
                break;
            case "cyan":
                red = 0;
                green = 1;
                blue = 1;
                break;
            case "white":
                red = 1;
                green = 1;
                blue = 1;
                break;
            case "grey":
                grey = parseInt("ee", 16) / 255;
                red = grey;
                green = grey;
                blue = grey;
                break;
            default:
                string = string.replace(/(0(x|X)|#)/, "");
                red = parseInt(string.substring(0,2), 16) / 255;
                green = parseInt(string.substring(2,4), 16) / 255;
                blue = parseInt(string.substring(4,6), 16) / 255;
                break;
            }
            colorObj = new RGBColor(red, green, blue);
            return colorObj;
        }
        return undefined;
    };
    
    ns.math.RGBColor = RGBColor;
    
}(window.multigraph));
