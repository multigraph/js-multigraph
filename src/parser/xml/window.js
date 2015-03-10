var Window = require('../../core/window.js');

Window.parseXML = function (xml) {
    //WARNING: do not declare a local var named "window" here; it masks the global 'window' object,
    //  which screws up the references to window.multigraph.* below!
    var w = new Window(),
        RGBColor         = require('../../math/rgb_color.js'),
        pF               = require('../../util/parsingFunctions.js'),
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger,
        attr;
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"width"),  w.width,  parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"height"), w.height, parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"border"), w.border, parseInteger);

        attr = pF.getXMLAttr(xml,"margin");
        if (attr !== undefined) {
            (function (m) {
                w.margin().set(m,m,m,m);
            }(parseInt(attr, 10)));
        }

        attr = pF.getXMLAttr(xml,"padding");
        if (attr !== undefined) {
            (function (m) {
                w.padding().set(m,m,m,m);
            }(parseInt(attr, 10)));
        }

        // removed deprecated color name check from commit #17665e2
        //    jrfrimme Tues Apr 2 11:47 2013
        parseAttribute(pF.getXMLAttr(xml,"bordercolor"), w.bordercolor, RGBColor.parse);
    }
    return w;
};

module.exports = Window;
