var FilterOption = require('../core/filter_option.js');

FilterOption.parseXML = function (xml) {
    var option = new FilterOption();
    if (xml) {
        option.name(xml.attr("name"));
        option.value(xml.attr("value") === "" ? undefined : xml.attr("value"));
    }
    return option;
};

module.exports = FilterOption;
