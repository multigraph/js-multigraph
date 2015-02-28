var Window = require('../core/window.js');

Window.parseXML = function (xml) {
    //WARNING: do not declare a local var named "window" here; it masks the global 'window' object,
    //  which screws up the references to window.multigraph.* below!
    var w = new Window(),
        RGBColor         = require('../math/rgb_color.js'),
        parsingFunctions = require('../util/parsingFunctions.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        parseInteger     = parsingFunctions.parseInteger,
        attr;
    if (xml) {
        parseAttribute(xml.attr("width"),  w.width,  parseInteger);
        parseAttribute(xml.attr("height"), w.height, parseInteger);
        parseAttribute(xml.attr("border"), w.border, parseInteger);

        attr = xml.attr("margin");
        if (attr !== undefined) {
            (function (m) {
                w.margin().set(m,m,m,m);
            }(parseInt(attr, 10)));
        }

        attr = xml.attr("padding");
        if (attr !== undefined) {
            (function (m) {
                w.padding().set(m,m,m,m);
            }(parseInt(attr, 10)));
        }

        // removed deprecated color name check from commit #17665e2
        //    jrfrimme Tues Apr 2 11:47 2013
        parseAttribute(xml.attr("bordercolor"), w.bordercolor, RGBColor.parse);
    }
    return w;
};

module.exports = Window;
