var Renderer = require('../../core/renderer.js');

// "renderer" : {
//     "type" : RENDERERTYPE(line)
//     "options" : [
//       { "name" : "STRING!", "value" : "STRING!", "min" : "DATAVALUE", "max" : "DATAVALUE" },
//       { "name" : "STRING!", "value" : "STRING!", "min" : "DATAVALUE", "max" : "DATAVALUE" },
//       ...
//     ]
//   }
Renderer.parseJSON = function (json, plot, messageHandler) {
    var DataValue   = require('../../core/data_value.js'),
        NumberValue = require('../../core/number_value.js'),
        Warning     = require('../../core/warning.js'),
        pF          = require('../../util/parsingFunctions.js'),
        vF          = require('../../util/validationFunctions.js'),
        rendererType,
        renderer,
        opt;

    require('../../core/renderers/all_renderers.js');

    function setOption(name, value, min, max) {
        try {
            renderer.setOptionFromString(name, value, min, max);
        } catch (e) {
            if (e instanceof Warning) {
                messageHandler.warning(e);
            } else {
                throw e;
            }
        }
    }

    if (json && json.type !== undefined) {
        rendererType = Renderer.Type.parse(json.type);
        if (!Renderer.Type.isInstance(rendererType)) {
            throw new Error("unknown renderer type '" + json.type + "'");
        }
        renderer = Renderer.create(rendererType);
        renderer.plot(plot);

        if (json.options) {
            if (vF.typeOf(json.options) === 'array') {
                json.options.forEach(function(option) {
                    try {
                        renderer.setOptionFromString(option.name, option.value, option.min, option.max);
                    } catch (e) {
                        if (e instanceof Warning) {
                            messageHandler.warning(e);
                        } else {
                            throw e;
                        }
                    }
                });
            } else {
                for (opt in json.options) {
                    if (json.options.hasOwnProperty(opt)) {
                        if (vF.typeOf(json.options[opt]) === 'array') {
                            json.options[opt].forEach(function(subopt) {
                                setOption(opt, subopt.value, subopt.min, subopt.max);
                            });
                        } else {
                            setOption(opt, json.options[opt]);
                        }
                    }
                }

            }
        }

    }
    return renderer;
};

module.exports = Renderer;
