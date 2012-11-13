window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var DataVariable = ns.DataVariable,
        Data,
        i;

    Data = new window.jermaine.Model(function () {
        var Data = this;

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
        this.hasA("readyCallbacks"); // js array; initialized to the empty array in init() method

        this.hasA("defaultMissingvalue").which.isA("string");
        this.hasA("defaultMissingop").which.isA("string").and.defaultsTo("eq");

        this.respondsTo("init", function() {
            // Initialization function --- should be called from isBuiltWith initializer.  This is split
            // off into a separate function so that it can be called from submodel's isBuiltWith initializers
            // as well, since Jermaine does not provide a way to call the parent models' isBuiltWith initializer
            // function.
            this.readyCallbacks([]);
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

        this.respondsTo("onReady", function (readyHandler) {
            var callbacks = this.readyCallbacks(),
                i;
            for (i = 0; i < callbacks.length; i++) {
                if (callbacks[i] === readyHandler) {
                    return;
                }
            }
            callbacks.push(readyHandler);
            this.onReadyAdd(readyHandler);
        });

        /*
         * The "onReady" contract:
         * 
         * Each submodel of this Data model should do the following:
         * 
         * 1. Provide an implementation of the method
         *    onReadyAdd(readyHandler), which should perform whatever
         *    one-time action is appropriate for that submodel upon
         *    the registration of a new "ready" callback.  Client code
         *    (i.e. the rest of Multigraph) calls onReady() to
         *    register a new "ready" callback; the generic
         *    implementation of onReady() here in Data.js simply
         *    checks to make sure the new callback isn't present in
         *    the list of ready callbacks, and if it's not, adds it to
         *    the list, and then passes it to onReadyAdd(), where the
         *    submodel can do whatever it needs to do, if anything,
         *    when a new callback is registered.
         * 
         *    The rationale behind onReadyAdd is that some data
         *    submodels (in particular, ArrayData and CSVData), might
         *    call a registered callback immedidately upon
         *    registration, if data is ready at that time; onReadyAdd
         *    is the place to do that).
         * 
         * 2. Call the callReadyCallbacks(...) method asynchronously
         *    whenever new data is available.
         */

        this.respondsTo("onReadyAdd", function (readyHandler) {
            // Each submodel should implement this if desired

        });

        this.respondsTo("callReadyCallbacks", function () {
            // each submodel should call this whenever appropriate...

            var callbacks = this.readyCallbacks(),
                i,
                nulls = [];

            // call all the callbacks in our list, except for nulls, which we keep
            // track of
            for (i = 0; i < callbacks.length; i++) {
                if (callbacks[i] !== null) {
                    callbacks[i].apply(this, arguments);
                } else {
                    nulls.push(i);
                }
            }

            // remove any nulls from the callbacks list
            if (nulls.length > 0) {
                for (i=nulls.length-1; i>=0; --i) {
                    callbacks.splice(nulls[i],1);
                }
            }
        });

        this.respondsTo("clearReady", function (readyHandler) {
            // Removes a function from this data object's list of onReady callbacks.
            //
            // NOTE: so that everything will work correctly if this function
            // is called from within an onReady callback, we do not alter
            // the length of the callback list here.
            // 
            // If we were to actually remove the callback from the list, thereby
            // shortening the list, the length of the callback list in the for(...)
            // loop in callReadyCallbacks() above would change during execution
            // of the loop, with the result that not every callback in the list
            // would get called.
            // 
            // So, what we do here is to simply replace the to-be-removed callback's
            // entry in the callback list with a null.
            // 
            // Then, in callReadyCallbacks() above, we check for any nulls in the
            // list and remove them after the call loop has executed.
            //

            var callbacks = this.readyCallbacks(),
                i;

            for (i=0; i<callbacks.length; ++i) {
                if (callbacks[i] === readyHandler) {
                    callbacks[i] = null;
                    break;
                }
            }
        });

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
