window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var DataVariable = ns.DataVariable,
        Data,
        i;

    Data = new window.jermaine.Model(function () {
        var Data = this;
        
        this.isA(ns.EventEmitter);

        /**
         * private find function
         * 
         *   Searches through a jermaine attr_list of DataVariables (columns) for
         *   an entry having a given id or column number.
         * 
         *      attrName: the name of the attribute to search on; should be either
         *                "id" or "column"
         *      attrValue: the value to search for. If attrName is "id", this value
         *                 should be a string.  If attrName is "column", this value
         *                 should be an int.
         *      columns: the attr_list to search through
         * 
         *   Returns: the index (an int) of the DataVariable entry having
         *            the given attribute value, if any, or -1 if none was found
         * 
         *  Example:
         *       find("id", "x", columns)
         *          finds the index of the DataVariable in the columns attr_list
         *          having an id of "x"
         *       find("column", "1", columns)
         *          finds the index of the DataVariable in the columns attr_list
         *          having a "column" attribute of 1
         */
        var find = function (attrName, attrValue, columns) {
            var result = -1;
            for (i = 0; i < columns.size(); ++i) {
                if (columns.at(i)[attrName]() === attrValue) {
                    result = i;
                }
            }
            return result;
        };

        /**
         * Set the 'data' attribute of each of this data object's columns
         * to point to the data object itself.
         */
        this.respondsTo("initializeColumns", function () {
            var i;
            for (i=0; i<this.columns().size(); ++i) {
                this.columns().at(i).data(this);
            }
        });

        this.hasMany("columns").eachOfWhich.validateWith(function (column) {
            this.message = "Data: constructor parameter should be an array of DataVariable objects";
            return column instanceof DataVariable;
        });

//      this.hasMany("readyCallbacks").eachOfWhich.isA("function");
//      this.hasA("readyCallbacks"); // js array; initialized to the empty array in init() method

        this.hasA("defaultMissingvalue").which.isA("string");
        this.hasA("defaultMissingop").which.isA("string").and.defaultsTo("eq");

        this.respondsTo("init", function() {
            // Initialization function --- should be called from isBuiltWith initializer.  This is split
            // off into a separate function so that it can be called from submodel's isBuiltWith initializers
            // as well, since Jermaine does not provide a way to call the parent models' isBuiltWith initializer
            // function.
            //this.readyCallbacks([]);
            this.initializeColumns();
        });

        this.isBuiltWith("columns", function () {
            this.init();
        });

        this.respondsTo("columnIdToColumnNumber", function (id) {
            var columnIndex,
                column = undefined;

            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToColumnNumber expects parameter to be a string");
            }

            columnIndex = find("id", id, this.columns());
            if (columnIndex >= 0) {
                column = this.columns().at(columnIndex);
            }

            if (column === undefined) {
                throw new Error("Data: no column with the label " + id);
            }
            
            return column.column();
        });

        this.respondsTo("columnIdToDataVariable", function (id) {
            var dv;
            
            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToDataVariable requires a string parameter");
            }
            
            dv = find("id", id, this.columns()) !== -1?this.columns().at(find("id", id, this.columns())):undefined;

            if (dv === undefined) {
                throw new Error("Data: no column with the label " + id);
            }

            return dv;
        });

        this.respondsTo("getColumnId", function (column) {
            var result;

            if (typeof(column) !== "number") {
                throw new Error("Data: getColumnId method expects an integer");
            }

            result = find("column", column, this.columns());

            if (result === -1) {
                throw new Error("Data: column " + column + " does not exist");
            }
            
            return this.columns().at(result).id();
        });

        this.respondsTo("getColumns", function () {
            var result = [],
                         columns = this.columns(),
                         i;

            for (i = 0; i < columns.size(); ++i) {
                result.push(columns.at(i));
            }

            return result;
        });

        this.respondsTo("getBounds", function (columnNumber) {
            // submodels must implement this
        });

        this.respondsTo("getIterator", function () {
            // submodels must implement this
        });

        /*
         * The "onReady" contract:
         * 
         * Each submodel of this Data model should do the following:
         * 
         * 1. Emit an "onReady" event whenever new data is available.
         *    The arguments to the event listener are the min and max
         *    values of the range of (newly) available data.
         * 
         * 2. Optionally, register a listener for its own "listenerAdded"
         *    events, which performs whatever actions are needed, if any,
         *    when a new "onReady" listener is registered.
         */

        this.respondsTo("pause", function() {
            //no op
        });
        this.respondsTo("resume", function() {
            //no op
        });

        this.respondsTo("isMissing", function (value, i) {
            // This method should return true if the DataValue "value" meets the "missing" criteria of
            // the i-th column
            var column;
            if (i < 0 || i >= this.columns().size()) {
                throw new Error("metadata.isMissing(): index out of range");
            }
            column = this.columns().at(i);
            if (!column.missingvalue() || !column.missingop()) {
                return false;
            }
            return value[column.missingop()](column.missingvalue());
        });
    });

    ns.Data = Data;
});
