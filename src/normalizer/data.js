var NormalizerMixin = require('./normalizer_mixin.js');

NormalizerMixin.add(function () {
    var Data = require('../core/data.js'),
        DataVariable = require('../core/data_variable.js'),
        DataValue = require('../core/data_value.js');

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
        var DataValue = DataValue,
            defaultid,
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
        var stringArray = data.stringArray();
        if (stringArray.length > 0) {
            if (stringArray[0].length < sortedVariables.length) {
                throw new Error("data contains only " + stringArray[0].length + " column(s), but should contain " + sortedVariables.length);
            }
        }

        var dataValues = ns.ArrayData.stringArrayToDataValuesArray(sortedVariables, stringArray);

        data.array(dataValues);
        data.stringArray([]);
    };

    Data.prototype.normalize = function () {
        var sortedVariables   = [],
            unsortedVariables = [],
            isCsvOrWebService = this instanceof ns.CSVData || this instanceof ns.WebServiceData;

        // Handles missing variable tags if the data tag has a 'csv' or 'service' tag
        if (isCsvOrWebService) {
            if (this.columns().size() === 0) {
                throw new Error("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");
            }
        }

        sortVariables(this, sortedVariables, unsortedVariables);

        // creates placeholder variables if the data tag has a 'values' tag
        if (this instanceof ns.ArrayData === true && !isCsvOrWebService) {
            createPlaceholderVariables(this, unsortedVariables);
        }

        insertUnsortedVariables(sortedVariables, unsortedVariables);

        // checks that columns were correctly specified for 'values' data tags
        if (this instanceof ns.ArrayData === true && !isCsvOrWebService) {
            checkColumnIndicies(this, sortedVariables);
        }

        handleMissingAttributes(sortedVariables, this.defaultMissingop(), this.defaultMissingvalue());
        insertNormalizedVariables(this, sortedVariables);

        // parses string values into the proper data types if the data tag has a 'values' tag
        if (this instanceof ns.ArrayData === true && !isCsvOrWebService) {
            createDataValueArray(this, sortedVariables);
        }
    };

    Data.prototype.ajaxNormalize = function () {
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
