// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Filter = require('../core/filter.js');

    Filter.parseXML = function (xml) {
        var filter = new Filter(),
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

    return Filter;
};

