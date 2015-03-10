var Background = require('../../core/background.js');

// <background color="#ffff00">
//   <img src="foo.png" anchor="-1 5" base="3 12" position="-2 3" frame="padding"/>
// </background>
Background.parseXML = function (xml, multigraph) {
    var background       = new Background(),
        pF               = require('../../util/parsingFunctions.js'),
        RGBColor         = require('../../math/rgb_color.js'),
        Img              = require('../../core/img.js'),
        child;

    if (xml) {
        pF.parseAttribute(pF.getXMLAttr(xml,"color"), background.color, RGBColor.parse);
        child = xml.find("img");
        if (child.length > 0) {
            background.img(Img.parseXML(child, multigraph));
        }
    }
    return background;
};

module.exports = Background;
