if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.TEMP) {
    window.multigraph.TEMP = {};
}

(function (ns) {
    "use strict";

    var Data = function (columns) {
        var columnLabels = {},
            rows = [],
            i;
            
        //TODO: check columns to make sure it's an array of strings
        
        for (i = 0; i < columns.length; ++i) {
            columnLabels[columns[i]] = i;
        }

        this.columnIdToColumnNumber = function (id) {
            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToColumnNumber expects parameter to be a string");
            }

            if (columnLabels[id] === undefined) {
                throw new Error("Data: no column with the label " + id);
            }

            return columnLabels[id];
        };

        this.columnIdToDataVariable = function (id) {
            //TODO: check to make sure id is a string
            //TODO: check to make sure id exists

            //return rows[columnIdToColumnNumber(id)];
        };

        this.getBounds = function (columnId) {
            //no op
        };

        this.getColumnId = function (column) {
            //TODO: check to make sure column is an integer
            
        };

        this.getColumns = function () {
            
        };

        this.getIterator = function () {
            
        };

        this.onReady = function (readyHandler) {

        };
    };
    
    ns.Data = Data;
}(window.multigraph.TEMP));