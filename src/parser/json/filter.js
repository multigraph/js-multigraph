var Filter = require('../../core/filter.js');

// "filter" : {
//   "type": "STRING"
//   "options" : [
//     { "name" : "STRING!", "value" : "STRING!" },
//     { "name" : "STRING!", "value" : "STRING!" }
//     ...
//   }
// }
Filter.parseJSON = function (json) {
    var filter = new Filter(),
        FilterOption = require('../../core/filter_option.js'),
        pF = require('../../util/parsingFunctions.js');

    if (json) {
        if (json.options) {
            json.options.forEach(function(option) {
                filter.options().add( FilterOption.parseJSON(option) );
            });
        }
        pF.parseAttribute(json.type, filter.type);
        return filter;
    };

    return Filter;
};

module.exports = Filter;
