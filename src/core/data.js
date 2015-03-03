var Model = require('../../lib/jermaine/src/core/model.js');

var EventEmitter = require('./event_emitter.js'),
    DataValue = require('../core/data_value.js'),
    DataVariable = require('./data_variable.js');

var Data = new Model(function () {
    
    this.isA(EventEmitter);

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

    // Sorts variables into appropriate order
    var sortVariables = function (data, sortedVariables, unsortedVariables) {
        var columns = data.columns(),
            column,
            i;
        for (i = 0; i < columns.size(); i++) {
            column = columns.at(i);
            if (column.column() !== undefined) {
                sortedVariables[column.column()] = column;
            } else {
                unsortedVariables.push(column);
            }
        }
    };

    // creates placeholder variables
    var createPlaceholderVariables = function (data, unsortedVariables) {
        var numMissingVariables = data.stringArray()[0].length - data.columns().size(),
            i;
        if (numMissingVariables > 0) {
            for (i = 0; i < numMissingVariables; i++) {
                unsortedVariables.push(null);
            }
        }
    };

    // inserts unsorted variables into the correct location
    var insertUnsortedVariables = function (sortedVariables, unsortedVariables) {
        var index, i;
        for (i = 0, index = 0; i < unsortedVariables.length; i++) {
            while (true) {
                if (sortedVariables[index] === undefined) {
                    break;
                }
                index++;
            }
            sortedVariables[index] = unsortedVariables[i];
        }
    };

    // checks that columns were correctly specified
    var checkColumnIndicies = function (data, sortedVariables) {
        var length = data.stringArray()[0].length,
            i;
        if (sortedVariables.length > length) {
            for (i = 0; i < sortedVariables.length; i++) {
                if (sortedVariables[i] instanceof DataVariable && sortedVariables[i].column() > length) {
                    throw new Error("Data Variable Error: Attempting to specify column '" + sortedVariables[i].column() + "' for a variable, while there are only " + length + " data columns available");
                }
            }                    
        }
    };

    // Handles missing attributes
    // creates the appropriate variables if missing
    var handleMissingAttributes = function (sortedVariables, defaultMissingop, defaultMissingvalue) {
        var defaultid,
            i;
        defaultMissingop = DataValue.parseComparator(defaultMissingop);
        for (i = 0; i < sortedVariables.length; i++) {
            if (!sortedVariables[i]) {
                if (i === 0) {
                    defaultid = "x";
                } else if (i === 1) {
                    defaultid = "y";
                } else {
                    defaultid = "y" + (i-1);
                }
                sortedVariables[i] = new DataVariable(defaultid, i, DataValue.NUMBER);
            } else {
                if (sortedVariables[i].column() === undefined) {
                    sortedVariables[i].column(i);
                }
                if (sortedVariables[i].type() === undefined) {
                    sortedVariables[i].type(DataValue.NUMBER);
                }
            }

            if (defaultMissingvalue !== undefined) {
                if (sortedVariables[i].missingvalue() === undefined) {
                    sortedVariables[i].missingvalue(DataValue.parse(sortedVariables[i].type(), defaultMissingvalue));
                }
            }
            if (sortedVariables[i].missingop() === undefined) {
                sortedVariables[i].missingop(defaultMissingop);
            }
        }
    };

    // Inserts the normalized variables into the data instance
    var insertNormalizedVariables = function (data, sortedVariables) {
        var columns = data.columns(),
            i;
        while (columns.size() > 0) {
            columns.pop();
        }
        for (i = 0; i < sortedVariables.length; i++) {
            columns.add(sortedVariables[i]);
        }
        data.initializeColumns();
    };


    // parses string values into the proper data types
    // If there was actual data, validate that the number of values found in stringArray
    // as large as the the number of variables declared.  ArrayData.textToStringArray(),
    // which is the function that constructed stringArray, has already guaranteed that
    // every row in stringArray is of the same length, so we can use the length of the
    // first row as the number of variables.
    var createDataValueArray = function (data, sortedVariables) {
        var ArrayData = require('./array_data.js');
        var stringArray = data.stringArray();
        if (stringArray.length > 0) {
            if (stringArray[0].length < sortedVariables.length) {
                throw new Error("data contains only " + stringArray[0].length + " column(s), but should contain " + sortedVariables.length);
            }
        }

        var dataValues = ArrayData.stringArrayToDataValuesArray(sortedVariables, stringArray);

        data.array(dataValues);
        data.stringArray([]);
    };

    this.prototype.normalize = function () {
        var ArrayData = require('./array_data.js'),
            sortedVariables   = [],
            unsortedVariables = [],
            //  mbp Tue Mar  3 10:51:40 2015:
            //    avoid requiring web_service_data.js and csv_data.js here because they have
            //    a dependency on jQuery; also avoid instanceof
            //CSVData = require('./csv_data.js'),
            //WebServiceData = require('./web_service_data.js'),
            //isCsvOrWebService = this instanceof CSVData || this instanceof WebServiceData,
            isWebServiceData = (typeof(this.serviceaddress) === "function"),
            isCSVData = (typeof(this.filename) === "function"),
            isCsvOrWebService = isWebServiceData || isCSVData;

        // Handles missing variable tags if the data tag has a 'csv' or 'service' tag
        if (isCsvOrWebService) {
            if (this.columns().size() === 0) {
                throw new Error("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");
            }
        }

        sortVariables(this, sortedVariables, unsortedVariables);

        // creates placeholder variables if the data tag has a 'values' tag
        if (this instanceof ArrayData === true && !isCsvOrWebService) {
            createPlaceholderVariables(this, unsortedVariables);
        }

        insertUnsortedVariables(sortedVariables, unsortedVariables);

        // checks that columns were correctly specified for 'values' data tags
        if (this instanceof ArrayData === true && !isCsvOrWebService) {
            checkColumnIndicies(this, sortedVariables);
        }

        handleMissingAttributes(sortedVariables, this.defaultMissingop(), this.defaultMissingvalue());
        insertNormalizedVariables(this, sortedVariables);

        // parses string values into the proper data types if the data tag has a 'values' tag
        if (this instanceof ArrayData === true && !isCsvOrWebService) {
            createDataValueArray(this, sortedVariables);
        }
    };

    this.prototype.ajaxNormalize = function () {
        var sortedVariables   = [],
            unsortedVariables = [];

        sortVariables(this, sortedVariables, unsortedVariables);
        createPlaceholderVariables(this, unsortedVariables);
        insertUnsortedVariables(sortedVariables, unsortedVariables);
        checkColumnIndicies(this, sortedVariables);
        handleMissingAttributes(sortedVariables, this.defaultMissingop(), this.defaultMissingvalue());
        insertNormalizedVariables(this, sortedVariables);
        createDataValueArray(this, sortedVariables);
    };

});

module.exports = Data;
