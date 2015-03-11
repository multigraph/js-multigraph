var FilterOption = require('../../core/filter_option.js');

// <option name="STRING!" value="STRING!"/>
FilterOption.parseXML = function (xml) {
    var pF     = require('../../util/parsingFunctions.js'),
        option = new FilterOption();
    if (xml) {
        option.name(pF.getXMLAttr(xml,"name"));
        option.value(pF.getXMLAttr(xml,"value") === "" ? undefined : pF.getXMLAttr(xml,"value"));
    }
    return option;
};

module.exports = FilterOption;
