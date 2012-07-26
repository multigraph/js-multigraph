if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.TEMP) {
    window.multigraph.TEMP = {};
}

(function (ns) {
    "use strict";

    var DataVariable = window.multigraph.TEMP.DataVariable,
        Data,
        i;

    Data = function (c) {
        var columns,
            find;

        //TODO: confirm c is an array or throw an error
        
        columns = c;

        for (i = 0; i < columns.length; ++i) {
            if (!(columns[i] instanceof DataVariable)) {
                throw new Error("Data: constructor parameter should be an array of DataVariable objects");
            }
        }

        find = function (idOrColumn, thing) {
            var result = -1;
            for (i = 0; i < columns.length; ++i) {
                if (columns[i][idOrColumn]() === thing) {
                    result = i;
                }
            }
            return result;
        };

        this.columnIdToColumnNumber = function (id) {
            var column;

            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToColumnNumber expects parameter to be a string");
            }

            column = find("id", id) !== -1?columns[find("id", id)]:undefined;

            if (column === undefined) {
                throw new Error("Data: no column with the label " + id);
            }

            return column.column();
        };

        this.columnIdToDataVariable = function (id) {
            var dv;

            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToDataVariable requires a string parameter");
            }

            dv = find("id", id) !== -1?columns[find("id", id)]:undefined;

            if (dv === undefined) {
                throw new Error("Data: no column with the label " + id);
            }

            return dv;
        };

        this.getColumnId = function (column) {
            var result;

            if (typeof(column) !== "number") {
                throw new Error("Data: getColumnId method expects an integer");
            }

            result = find("column", column);

            if (result === -1) {
                throw new Error("Data: column " + column + " does not exist");
            }
            
            return columns[result].id();
        };

        this.getColumns = function () {
            return columns;
        };

        this.getBounds = function (columnId) {
            //no op
        };

        this.getIterator = function () {
            //no op
        };

        this.onReady = function (readyHandler) {
            //no op
        };
    };
    
    ns.Data = Data;
}(window.multigraph.TEMP));