window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var DataVariable = ns.DataVariable,
        MetaData,
        i;

    MetaData = function (c) {
        console.log("hello world, you shouldn't see this!");

        var columns,
            find;

        //TODO: confirm c is an array or throw an error
        
        columns = c;

        for (i = 0; i < columns.length; ++i) {
            if (!(columns[i] instanceof DataVariable)) {
                throw new Error("MetaData: constructor parameter should be an array of DataVariable objects");
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
                throw new Error("MetaData: columnIdToColumnNumber expects parameter to be a string");
            }

            column = find("id", id) !== -1?columns[find("id", id)]:undefined;

            if (column === undefined) {
                throw new Error("MetaData: no column with the label " + id);
            }

            return column.column();
        };

        this.columnIdToDataVariable = function (id) {
            var dv;

            if (typeof(id) !== "string") {
                throw new Error("MetaData: columnIdToDataVariable requires a string parameter");
            }

            dv = find("id", id) !== -1?columns[find("id", id)]:undefined;

            if (dv === undefined) {
                throw new Error("MetaData: no column with the label " + id);
            }

            return dv;
        };

        this.getColumnId = function (column) {
            var result;

            if (typeof(column) !== "number") {
                throw new Error("MetaData: getColumnId method expects an integer");
            }

            result = find("column", column);

            if (result === -1) {
                throw new Error("MetaData: column " + column + " does not exist");
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

        this.isMissing = function(value, i) {
            // This method should return true if the DataValue "value" meets the "missing" criteria of
            // the i-th column
            var column;
            if (i < 0 || i >= columns.length) {
                throw new Error("metadata.isMissing(): index out of range");
            }
            column = columns[i];
            if (!column.missingvalue() || !column.missingop()) {
                return false;
            }
            return value[column.missingop()](column.missingvalue());
        };


    };

    var MetaData2 = new window.jermaine.Model(function () {


        //private find function
        var find = function (idOrColumn, thing, columns) {
            var result = -1;
            for (i = 0; i < columns.size(); ++i) {
                if (columns.at(i)[idOrColumn]() === thing) {
                    result = i;
                }
            }
            return result;
        };

        this.hasMany("columns");

        this.isBuiltWith(function (c) {
            console.log("initializer function called!");
            var i;
            
            for (i = 0; i < c.length; ++i) {
                if (!(columns[i] instanceof DataVariable)) {
                    throw new Error("MetaData: constructor parameter should be an array of DataVariable objects");
                } else {
                    this.columns().add(c[i]);
                }
            }
        });

        this.respondsTo("columnIdToColumnNumber", function (id) {
            var column;

            if (typeof(id) !== "string") {
                throw new Error("MetaData: columnIdToColumnNumber expects parameter to be a string");
            }
            
            column = find("id", id, this.columns()) !== -1?this.columns.at(find("id", id, this.columns())):undefined;

            if (column === undefined) {
                throw new Error("MetaData: no column with the label " + id);
            }
            
            return column.column();
        });

        this.respondsTo("columnIdToDataVariable", function (id) {
            var dv;
            
            if (typeof(id) !== "string") {
                throw new Error("MetaData: columnIdToDataVariable requires a string parameter");
            }
            
            dv = find("id", id, this.columns()) !== -1?this.columns.at(find("id", id, this.columns())):undefined;

            if (dv === undefined) {
                throw new Error("MetaData: no column with the label " + id);
            }

            return dv;
        });

        this.respondsTo("getColumnId", function (column) {
            var result;

            if (typeof(column) !== "number") {
                throw new Error("MetaData: getColumnId method expects an integer");
            }

            result = find("column", column, this.columns());

            if (result === -1) {
                throw new Error("MetaData: column " + column + " does not exist");
            }
            
            return columns.at(result).id();
        });

        this.respondsTo("getColumns", function () {
            return this.columns();
        });

        this.respondsTo("getBounds", function (columnId) {
            //no op
        });

        this.respondsTo("getIterator", function () {
            //no op
        });

        this.respondsTo("onReady", function (readyHandler) {
            //no op
        });

        this.respondsTo("isMissing", function(value, i) {
            // This method should return true if the DataValue "value" meets the "missing" criteria of
            // the i-th column
            var column;
            if (i < 0 || i >= columns.length) {
                throw new Error("metadata.isMissing(): index out of range");
            }
            column = columns[i];
            if (!column.missingvalue() || !column.missingop()) {
                return false;
            }
            return value[column.missingop()](column.missingvalue());
        });
    });
    
    ns.MetaData = MetaData;
});