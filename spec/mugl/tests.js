// This file gives specific sizes at which certain graphics tests
// should be rendered.  MUGL files present in this directory which are
// not mentioned here will be rendered at a default size in the test
// suite.
// 
// See the README.md file in this directory for more info.

module.exports = {
    'tests': [
        { "mugl": "tempgraph.xml",               "width": 800,  "height": 500 },
        { "mugl": "tempgraph.xml",               "width": 800,  "height": 300 },
        { "mugl": "dashboard-aoi.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-asi.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-co2.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-ghouse.xml",        "width": 800,  "height": 400 },
        { "mugl": "dashboard-glacier.xml",       "width": 800,  "height": 400 },
        { "mugl": "dashboard-naoi.xml",          "width": 800,  "height": 400 },
        { "mugl": "dashboard-ocean.xml",         "width": 800,  "height": 400 },
        { "mugl": "dashboard-oni.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-pnap.xml",          "width": 800,  "height": 400 },
        { "mugl": "dashboard-projections.xml",   "width": 800,  "height": 400 },
        { "mugl": "dashboard-sea.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-snow.xml",          "width": 800,  "height": 400 },
        { "mugl": "dashboard-soi.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-sun.xml",           "width": 800,  "height": 400 },
        { "mugl": "dashboard-temp.xml",          "width": 800,  "height": 400 },
        { "mugl": "crn-webservice.xml",          "width": 1000, "height": 400 },
        { "mugl": "acis-webservice.xml",         "width": 1000, "height": 400 },
        { "mugl": "multigraph-logo.xml",         "width": 500,  "height": 500 },

        // The 'js' property is an array of additional JS files that should be loaded in the browser for a specific MUGL
        { "mugl": "drought.xml",                 "js": ["../../aux/data_adapters/drought.js"] },
        { "mugl": "drought-csv.xml",             "js": ["../../aux/data_adapters/drought.js"] },

        // The "error" property indicates that a MUGL file contains an error; these are for
        // testing how Multigraph handles/displays MUGL errors:
        { "mugl" : "error-axis_ref_invalid.xml",               "error" : true },
        { "mugl" : "error-column_data_error.xml",              "error" : true },
        { "mugl" : "error-extra_data_columns.xml",             "error" : true },
        { "mugl" : "error-incorrect_renderer.xml",             "error" : true },
        { "mugl" : "error-invalid-constant-plot.xml",          "error" : true },
        { "mugl" : "error-invalid_csv_location.xml",           "error" : true },
        { "mugl" : "error-missing_data_columns.xml",           "error" : true },
        { "mugl" : "error-missing_data_value.xml",             "error" : true },
        { "mugl" : "error-missing_data.xml",                   "error" : true },
        { "mugl" : "error-multiple_errors.xml",                "error" : true },
        { "mugl" : "error-weather2.xml",                       "error" : true },
        { "mugl" : "error-wrong_variable_refs.xml",            "error" : true }

    ]};      
