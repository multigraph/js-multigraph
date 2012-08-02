window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var rendererList,
        Renderer,
        RendererOption,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer);

    Renderer = new window.jermaine.Model( "Renderer", function () {
        this.hasA("type").which.validatesWith(function (type) {
            return type === "line" || type === "bar" ||
                   type === "fill" || type === "point" ||
                   type === "barerror" || type === "lineerror" ||
                   type === "pointline";
        });
        this.hasMany("options").which.validatesWith(function (option) {
            return option instanceof ns.RendererOption;
        });

        this.hasA("horizontalaxis").which.validatesWith(function (a) {
            return a instanceof ns.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function (a) {
            return a instanceof ns.Axis;
        });


        this.isBuiltWith("type");

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.renderer, attributes);

        this.respondsTo("transformPoint", function (input) {
            var output = [],
                haxis = this.horizontalaxis(),
                vaxis = this.verticalaxis(),
                i;

            output[0] = haxis.dataValueToAxisValue(input[0]);
            for (i = 1; i<input.length; ++i) {
                output[i] = vaxis.dataValueToAxisValue(input[i]);
            }
            return output;
        });


        this.respondsTo("setOptionFromString", function (name, stringValue, stringMin, stringMax) {
            //if (typeof (this.newOptions()[name]) !== "function") {
            if (!this.optionsMetadata[name]) {
                // If this renderer has no option named "name", bail out immediately.  This should eventually
                // throw an error, but for now we just quietly ignore it, to eliminate error conditions coming
                // from unimplemented options.
                console.log("WARNING: renderer has no option named '" + name + "'");
                return;
            }
            var rendererOpt = new (this.optionsMetadata[name].type)();
            rendererOpt.parseValue(stringValue);
            if (this.verticalaxis()) {
                if (stringMin !== undefined) {
                    rendererOpt.min( ns.DataValue.parse( this.verticalaxis().type(), stringMin ));
                }
                if (stringMax !== undefined) {
                    rendererOpt.max( ns.DataValue.parse( this.verticalaxis().type(), stringMax ));
                }
            }
            this.newOptions()[name]().add(rendererOpt);

        });

	this.respondsTo("getOptionValue", function (optionName, /*optional:*/value) {
            var i,
                newOptions,
                optionList;

            newOptions = this.newOptions();
            if (typeof(newOptions[optionName]) !== "function") {
                throw new Error('unknown option "'+optionName+'"');
            }
            optionList = newOptions[optionName]();
            if (!optionList) {
                throw new Error('unknown option "'+optionName+'"');
            }
            //NOTE: options are stored in reverse order; default one is always in the '0' position.
            //  Search through them starting at the END of the list, going backwards!
            for (i=optionList.size()-1; i>=0; --i) {
                var option = optionList.at(i);
                if (((option.min()===undefined) || (value===undefined) || option.min().le(value))
                    &&
                    ((option.max()===undefined) || (value===undefined) || option.max().gt(value))) {
                    return option.value();
                }
            }
		
        });

        // method must be overridden by subclass:
        this.respondsTo("begin", function () {
        });
        // method must be overridden by subclass:
        this.respondsTo("dataPoint", function (point) {
        });
        // method must be overridden by subclass:
        this.respondsTo("end", function () {
        });

    });

    /*
     * Private list of known renderers.  This list is populated from within individual
     * renderer submodel implementations by calls to Renderer.addType.
     */
    rendererList = [];

    /*
     * Add a renderer submodel to the list of known renders.  rendererObj should be
     * an object with two properties:
     *    'type'  : the type of the renderer -- a string, which is the value expected
     *              for the type attribute of the mugl <renderer> tag.
     *    'model' : the renderer submodel
     */
    Renderer.addType = function (rendererObj) {
	rendererList.push(rendererObj);
    };

    /*
     * Factory method: create an instance of a renderer submodel based on its type (a string).
     */
    Renderer.create = function (type) {
	var i,
            renderer;
        for (i=0; i<rendererList.length; ++i) {
            if (rendererList[i].type === type) {
                renderer = new (rendererList[i].model)();
                renderer.type(type);
                return renderer;
            }
        }
    };

    Renderer.declareOptions = function (renderer, OptionsModelName, options) {
        var i,
            OptionsModel,
            optionsMetadata;

        OptionsModel    = window.jermaine.Model(OptionsModelName, function () {});
        optionsMetadata = {};
        for (i=0; i<options.length; ++i) {
            //NOTE: need closure to capture value of options[i].type as optionType, for use in
            //  validation function
            (function (optionType) {
                OptionsModel.hasMany(options[i].name).eachOfWhich.validatesWith(function (v) {
                    return v instanceof optionType;
                });
            }(options[i].type));
            optionsMetadata[options[i].name] = {
                'type'    : options[i]['type'],
                'default' :  options[i]['default']
            };
        }
        renderer.hasA("newOptions").isImmutable().defaultsTo(function () { return new OptionsModel(); });
        renderer.prototype.optionsMetadata = optionsMetadata;

        renderer.isBuiltWith(function () {
            // populate newOptions with default values stored in options metadata (which was populated by declareOptions):
            var opt, ropt;
            for (opt in this.optionsMetadata) {
                ropt = new (this.optionsMetadata[opt].type)(this.optionsMetadata[opt]['default']);
                this.newOptions()[opt]().add( ropt );
            }
        });

    };


    Renderer.Option = new window.jermaine.Model( "Renderer.Option", function () {
        this.hasA("min").which.validatesWith(ns.DataValue.isInstance);
        this.hasA("max").which.validatesWith(ns.DataValue.isInstance);
    });


    Renderer.RGBColorOption = new window.jermaine.Model( "Renderer.RGBColorOption", function () {
        this.isA(Renderer.Option);
        this.hasA("value").which.validatesWith(function (v) {
            return v instanceof window.multigraph.math.RGBColor;
        });
        this.isBuiltWith("value");
        this.respondsTo("serializeValue", function () {
            return this.value().getHexString();
        });
        this.respondsTo("parseValue", function (string) {
            this.value( window.multigraph.math.RGBColor.parse(string) );
        });

    });

    Renderer.NumberOption = new window.jermaine.Model( "Renderer.NumberOption", function () {
        this.isA(Renderer.Option);
        this.hasA("value").which.isA("number");
        this.isBuiltWith("value");
        this.respondsTo("serializeValue", function () {
            return this.value().toString();
        });
        this.respondsTo("parseValue", function (string) {
            this.value( parseInt(string, 10) );
        });

    });



    ns.Renderer = Renderer;
});
