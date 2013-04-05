window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */

    /**
     * @class Data
     * @for Data
     * @constructor
     * @param {DataVariable} columns
     */
    var Data = new window.jermaine.Model(function () {
        var DataVariable = ns.DataVariable;
        
        this.isA(ns.EventEmitter);

        /**
         * Searches through a jermaine attr_list of DataVariables (columns) for
         * an entry having a given id or column number.
         *
         * @method find
         * @private
         * @param {String} attrName The name of the attribute to search on;
         *     should be either "id" or "column".
         * @param {String|Integer} attrValue The value to search for. If attrName
         *     is "id", this value should be a string.  If attrName is "column",
         *     this value should be an int.
         * @param {DataVariable Attr_List} columns The attr_list to search through.
         * @static
         * @return {Integer} The index (an int) of the DataVariable entry having
         *     the given attribute value, if any, or -1 if none was found
         * @author jrfrimme
         *
         * @example
         *
         *     find("id", "x", columns)
         *
         *         finds the index of the DataVariable in the columns attr_list
         *         having an id of "x"
         *
         *     find("column", 1, columns)
         *
         *         finds the index of the DataVariable in the columns attr_list
         *         having a "column" attribute of 1
         */
        var find = function (attrName, attrValue, columns) {
            var result = -1,
                i;
            for (i = 0; i < columns.size(); ++i) {
                if (columns.at(i)[attrName]() === attrValue) {
                    result = i;
                    break;
                }
            }
            return result;
        };

        /**
         * Set the `data` attribute of each of this data object's columns
         * to point to the data object itself.
         *
         * @method initializeColumns
         * @author jrfrimme
         */
        this.respondsTo("initializeColumns", function () {
            var i;
            for (i = 0; i < this.columns().size(); ++i) {
                this.columns().at(i).data(this);
            }
        });

        this.hasMany("columns").eachOfWhich.validateWith(function (column) {
            this.message = "Data: constructor parameter should be an array of DataVariable objects";
            return column instanceof DataVariable;
        });

        this.hasA("defaultMissingvalue").which.isA("string");
        this.hasA("defaultMissingop").which.isA("string").and.defaultsTo("eq");
        this.hasA("adapter");

        /**
         * Initialization function --- should be called from isBuiltWith initializer.  This is split
         * off into a separate function so that it can be called from submodel's isBuiltWith initializers
         * as well, since Jermaine does not provide a way to call the parent models' isBuiltWith initializer
         * function.
         *
         * @method init
         * @author jrfrimme
         */
        this.respondsTo("init", function() {
            this.initializeColumns();
        });

        this.isBuiltWith("columns", function () {
            this.init();
        });

        this.respondsTo("columnIdToColumnNumber", function (id) {
            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToColumnNumber expects parameter to be a string");
            }

            var columnIndex = find("id", id, this.columns()),
                column = undefined;

            if (columnIndex >= 0) {
                column = this.columns().at(columnIndex);
            }

            if (column === undefined) {
                throw new Error("Data: no column with the label " + id);
            }
            
            return column.column();
        });

        this.respondsTo("columnIdToDataVariable", function (id) {
            if (typeof(id) !== "string") {
                throw new Error("Data: columnIdToDataVariable requires a string parameter");
            }
            
            var columns = this.columns(),
                dv = find("id", id, columns) !== -1 ? columns.at(find("id", id, columns)) : undefined;

            if (dv === undefined) {
                throw new Error("Data: no column with the label " + id);
            }

            return dv;
        });

        this.respondsTo("getColumnId", function (column) {
            if (typeof(column) !== "number") {
                throw new Error("Data: getColumnId method expects an integer");
            }

            var result = find("column", column, this.columns());

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
