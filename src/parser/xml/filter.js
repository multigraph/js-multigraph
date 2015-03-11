// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Filter = require('../../core/filter.js');

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Filter.parseXML)==="function") { return Filter; };

    // <filter type="STRING">
    //    <option name="STRING!" value="STRING!"/>
    //    <option name="STRING!" value="STRING!"/>
    //    ...
    // </filter>
    Filter.parseXML = function (xml) {
        var filter = new Filter(),
            FilterOption = require('../../core/filter_option.js'),
            pF = require('../../util/parsingFunctions.js'),
            child;
        if (xml) {
            child = xml.find("option");
            if (child.length > 0) {
                $.each(child, function (i, e) {
                    filter.options().add( FilterOption.parseXML($(e)) );
                });
            }
            pF.parseAttribute(pF.getXMLAttr(xml,"type"), filter.type);
        }
        return filter;
    };

    return Filter;
};

