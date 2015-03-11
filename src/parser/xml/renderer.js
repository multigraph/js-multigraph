// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Renderer = require('../../core/renderer.js');

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Renderer.parseXML)==="function") { return Renderer; };

    // <renderer
    //     type="RENDERERTYPE(line)">
    //   <option
    //       name="STRING!"
    //       value="STRING!"
    //       min="DATAVALUE"
    //       max="DATAVALUE">
    //   </option>
    //   ...
    // </renderer>
    Renderer.parseXML = function (xml, plot, messageHandler) {
        var DataValue   = require('../../core/data_value.js'),
            NumberValue = require('../../core/number_value.js'),
            Warning     = require('../../core/warning.js'),
            pF          = require('../../util/parsingFunctions.js'),
            rendererType,
            renderer,
            opt;

        require('../../core/renderers/all_renderers.js');

        if (xml && pF.getXMLAttr(xml,"type") !== undefined) {
            rendererType = Renderer.Type.parse(pF.getXMLAttr(xml,"type"));
            if (!Renderer.Type.isInstance(rendererType)) {
                throw new Error("unknown renderer type '" + pF.getXMLAttr(xml,"type") + "'");
            }
            renderer = Renderer.create(rendererType);
            renderer.plot(plot);
            if (xml.find("option").length > 0) {

                //
                // The following provides support for deprecatd the "missingvalue" and
                // "missingop" renderer options.  Those options are not officially supported
                // any more; MUGL files should use the  missingvalue/missingop attributes
                // of <data><variable> or <data><variables> instead.  When we're ready to
                // remove this support, delete the block of code:
                //
                (function (renderer, xml, plot, messageHandler) {
                    var i,
                        missingValueOption = xml.find("option[name=missingvalue]"),
                        missingOpOption    = xml.find("option[name=missingop]");
                    if (missingValueOption.length > 0 || missingOpOption.length > 0) {
                        var columns = plot.data().columns(),
                            column;
                        for (i = 0; i < columns.size();  ++i) {
                            column = columns.at(i);
                            if (column.type() === DataValue.NUMBER) {
                                if (missingValueOption.length > 0 && (column.missingvalue() === undefined)) {
                                    column.missingvalue(NumberValue.parse(pF.getXMLAttr(missingValueOption,"value")));
                                }
                                if (missingOpOption.length > 0 && (column.missingop() === undefined)) {
                                    column.missingop(DataValue.parseComparator(pF.getXMLAttr(missingOpOption,"value")));
                                }
                            }
                        }
                    }
                    if (missingValueOption.length > 0) {
                        messageHandler.warning("Renderer option 'missingvalue' is deprecated; " +
                                               "use 'missingvalue' attribute of 'data'/'variable'; instead");
                        // remove the element from the xml so that the option-processing code below doesn't see it
                        missingValueOption.remove();
                    }
                    if (missingOpOption.length > 0) {
                        messageHandler.warning("Renderer option 'missingop' is deprecated; " +
                                               "use 'missingvalue' attribute of 'data'/'variable'; instead");
                        // remove the element from the xml so that the option-processing code below doesn't see it
                        missingOpOption.remove();
                    }
                }(renderer, xml, plot, messageHandler));
                //
                // End of code to delete when removing support for deprecated
                // missingvalue/missingop renderer options.
                //

                $.each(xml.find(">option"), function (i, e) {
                    try {
                        renderer.setOptionFromString(pF.getXMLAttr($(e),"name"),
                                                     pF.getXMLAttr($(e),"value"),
                                                     pF.getXMLAttr($(e),"min"),
                                                     pF.getXMLAttr($(e),"max"));
                    } catch (e) {
                        if (e instanceof Warning) {
                            messageHandler.warning(e);
                        } else {
                            throw e;
                        }
                    }
                });
            }
        }
        return renderer;
    };

    return Renderer;
};
