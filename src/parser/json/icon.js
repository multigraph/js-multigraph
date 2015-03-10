var Icon = require('../../core/icon.js');

// "icon" : { "border": 2, "width": 30, "height": 20 }
Icon.parseJSON = function (json) {
    var icon = new Icon(),
        parseAttribute = require('../../util/parsingFunctions.js').parseAttribute;
    if (json) {
        parseAttribute(json.height, icon.height);
        parseAttribute(json.width,  icon.width);
        parseAttribute(json.border, icon.border);
    }
    return icon;
};

module.exports = Icon;
