var Model = require('../../lib/jermaine/src/core/model.js');

var ArrayData = require('./array_data.js');

var CSVData = Model(function () {

    this.isA(ArrayData);
    this.hasA("filename").which.isA("string");
    this.hasA("messageHandler");
    this.hasA("ajaxthrottle");
    this.hasA("dataIsReady").which.isA("boolean").and.defaultsTo(false);

    this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
        if (this.dataIsReady()) {
            return ArrayData.getArrayDataIterator(this, columnIds, min, max, buffer);
        } else {
            return {
                "next"    : function () {},
                "hasNext" : function () { return false; }
            };
        }
    });

    this.respondsTo("_displayError", function (e) {
        if (this.messageHandler()) {
            this.messageHandler().error(e);
        } else {
            throw e;
        }
    });

    this.isBuiltWith("columns", "filename", "%messageHandler", "%ajaxthrottle", function () {
        var that         = this,
            ajaxthrottle = this.ajaxthrottle();

        if (ajaxthrottle === undefined) {
            ajaxthrottle = window.multigraph.jQuery;
        }

        this.adapter(ArrayData);
        this.init();

        if (that.filename() !== undefined) {
            that.emit({type : 'ajaxEvent', action : 'start'});
            ajaxthrottle.ajax({
                url : that.filename(),

                success : function (data) {
                    //parse the data
                    var dataValues = that.adapter().textToStringArray(that.getColumns(), data);
                    that.stringArray(dataValues);
                    // renormalize & populate array
                    that.ajaxNormalize();
                    that.dataIsReady(true);
                    that.emit({type : "dataReady"});
                },

                error : function (jqXHR, textStatus, errorThrown) {
                    var message = errorThrown;
                    if (jqXHR.statusCode().status === 404) {
                        message = "File not found: '" + that.filename() + '"';
                    } else {
                        if (textStatus) {
                            message = textStatus + ": " + message;
                        }
                    }
                    that._displayError(new Error(message));
                },

                // 'complete' callback gets called after either 'success' or 'error', whichever:
                complete : function (jqXHR, textStatus) {
                    that.emit({type : 'ajaxEvent', action : 'complete'});
                }

            });
        }
    });
});

module.exports = CSVData;
