Multigraph.installDataAdapter('drought', {
    textToStringArray : function (dataVariables, text) {
        var stringArray = [],
            stringValuesThisRow,
            lines = text.split("\n"),
            i, j, year;
        for (i=0; i<lines.length; ++i) {
            stringValuesThisRow = lines[i].split(",");
            year = stringValuesThisRow[0];
            for (j=1; j<stringValuesThisRow.length; ++j) {
                stringArray.push([ Multigraph.sprintf("%s%02d", year, j), stringValuesThisRow[j] ]);
            }
        }
        return stringArray;
    }
});
