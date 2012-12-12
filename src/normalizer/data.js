window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Data.prototype.normalize = function () {
            var i,
                j,
                sortedVariables = [],
                unsortedVariables = [];

            //
            // Handles missing variable tags if the data tag has a 'csv' or 'service' tag
            //
            if (this instanceof ns.CSVData || this instanceof ns.WebServiceData) {
                if (this.columns().size() === 0) {
                    throw new Error("Data Normalization: Data gotten from csv and web service sources require variables to be specified in the mugl.");
                }
            }

            //
            // Sorts variables into appropriate order
            //
            for (i = 0; i < this.columns().size(); i++) {
                if (this.columns().at(i).column() !== undefined) {
                    sortedVariables[this.columns().at(i).column()] = this.columns().at(i);
                } else {
                    unsortedVariables.push(this.columns().at(i));
                }
            }

            // creates placeholder variables if the data tag has a 'values' tag
            if (this instanceof ns.ArrayData === true && this instanceof ns.CSVData === false && this instanceof ns.WebServiceData === false) {
                var numMissingVariables = this.stringArray()[0].length - this.columns().size();
                if (numMissingVariables > 0) {
                    for (i = 0; i < numMissingVariables; i++) {
                        unsortedVariables.push(null);
                    }
                }
            }

            // inserts unsorted variables into the correct location
            var index = 0;
            for (i = 0; i < unsortedVariables.length; i++) {
                while (true) {
                    if (sortedVariables[index] === undefined) {
                        break;
                    }
                    index++;
                }
                sortedVariables[index] = unsortedVariables[i];
            }
            
            // checks that columns were correctly specified for 'values' data tags
            if (this instanceof ns.ArrayData === true && this instanceof ns.CSVData === false && this instanceof ns.WebServiceData === false) {
                if (sortedVariables.length > this.stringArray()[0].length) {
                    for (i = 0; i < sortedVariables.length; i++) {
                        if (sortedVariables[i] instanceof ns.DataVariable && sortedVariables[i].column() > this.stringArray()[0].length) {
                            throw new Error("Data Variable Error: Attempting to specify column '" + sortedVariables[i].column() + "' for a variable, while there are only " + this.stringArray()[0].length + " data columns available");
                        }
                    }                    
                }
            }

            //
            // Handles missing attrs.
            // creates the appropriate variable if missing and if the data had a 'values' tag.
            //
            var defaultid,
                defaultMissingop = ns.DataValue.parseComparator(this.defaultMissingop());
            for (i = 0; i < sortedVariables.length; i++) {
                if (!sortedVariables[i]) {
                    if (i === 0) {
                        defaultid = "x";
                    } else if (i === 1) {
                        defaultid = "y";
                    } else {
                        defaultid = "y" + (i-1);
                    }
                    sortedVariables[i] = new ns.DataVariable(defaultid, i, ns.DataValue.NUMBER);
                } else {
                    if (sortedVariables[i].column() === undefined) {
                        sortedVariables[i].column(i);
                    }
                    if (sortedVariables[i].type() === undefined) {
                        sortedVariables[i].type(ns.DataValue.NUMBER);
                    }
                }

                if (this.defaultMissingvalue() !== undefined) {
                    if (sortedVariables[i].missingvalue() === undefined) {
                        sortedVariables[i].missingvalue(ns.DataValue.parse(sortedVariables[i].type(), this.defaultMissingvalue()));
                    }
                }
                if (sortedVariables[i].missingop() === undefined) {
                    sortedVariables[i].missingop(defaultMissingop);
                }
            }

            //
            // Inserts the normalized variables into the data instance
            //
            while (this.columns().size() > 0) {
                this.columns().pop();
            }
            for (i = 0; i < sortedVariables.length; i++) {
                this.columns().add(sortedVariables[i]);
            }
            this.initializeColumns();

            // parses string values into the proper data types if the data tag has a 'values' tag
            if (this instanceof ns.ArrayData === true && this instanceof ns.CSVData === false && this instanceof ns.WebServiceData === false) {
                // If there was actual data, validate that the number of values found in stringArray
                // as large as the the number of variables declared.  ArrayData.textToStringArray(),
                // which is the function that constructed stringArray, has already guaranteed that
                // every row in stringArray is of the same length, so we can use the length of the
                // first row as the number of variables.
                if (this.stringArray().length > 0) {
                    if (this.stringArray()[0].length < sortedVariables.length) {
                        throw new Error("<value> data contains only " + this.stringArray()[0].length + " column(s), but should contain " + sortedVariables.length);
                    }
                }

                var dataValues = ns.ArrayData.stringArrayToDataValuesArray(sortedVariables, this.stringArray());

                this.array(dataValues);
                this.stringArray([]);
            }

        };

    });

});
