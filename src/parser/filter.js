var Filter = require('../core/filter.js');

Filter.parseXML = function (xml) {
    var filter = new Filter(),
        $ = require('jquery'),
        FilterOption = require('../core/filter_option.js'),
        parsingFunctions = require('../util/parsingFunctions.js'),
        child;
    if (xml) {
        child = xml.find("option");
        if (child.length > 0) {
            $.each(child, function (i, e) {
                filter.options().add( FilterOption.parseXML($(e)) );
            });
        }
        parsingFunctions.parseAttribute(xml.attr("type"), filter.type, parsingFunctions.parseString);
    }
    return filter;
};

module.exports = Filter;
