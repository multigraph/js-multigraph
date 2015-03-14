var FilterOption = require('../../core/filter_option.js');

// "option" : { "name" : "STRING!",  "value" : "STRING!" }
FilterOption.parseJSON = function (json) {
    var pF     = require('../../util/parsingFunctions.js'),
        uF     = require('../../util/utilityFunctions.js'),
        option = new FilterOption();
    if (json) {
        option.name(json.name);
        if ("value" in json && json.value !== "") {
            // coerce to string since "value" attr of filter_option is of type string
            option.value(uF.coerceToString(json.value));
        }
    }
    return option;
};

module.exports = FilterOption;
