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
        pF = require('../../util/parsingFunctions.js'),
        o;

    require('./filter_option.js'); // so that FilterOption.parseJSON will exist below

    if (json) {
        if (json.options) {
            for (opt in json.options) {
                if (json.options.hasOwnProperty(opt)) {
                    o = new FilterOption();
                    o.name(opt);
                    o.value(String(json.options[opt]));
                    filter.options().add( o );
                }
            }
        }

        pF.parseAttribute(json.type, filter.type);
        return filter;
    };

    return Filter;
};

module.exports = Filter;
