require('../lib/ajaxthrottle/src/ajaxthrottle.js');
require('../lib/lightbox/lightbox.js');
require('../lib/jquery/jquery.mousewheel.js');
require('../lib/busy-spinner/busy_spinner.js');
require('../lib/error-display/build/errorDisplay.js');
require('../lib/requestanimationframe/requestanimationframe.js');

require('./parser/jquery_xml_parser.js')($);
require('./graphics/canvas/all.js')($, window);

// This forces ./events/multigraph.js to load, which is where the 'main' program
// really lives --- i.e. installation of the Multigraph jQuery plugin, and the
// $(document).ready(...) stuff that springs into action once the page has loaded.
// Note that the 3rd arg to require('./events/multigraph.js') is unused.
require('./events/multigraph.js')($, window, undefined);

// For JS applications that want to use the bundled multigraph file, instead of
// referencing Multigraph through npm-style require statements, and for backward
// compatibility with pre-npm versions of Multigraph, create the globael
// window.multigraph object which exposes a bunch of objects/functions from the
// Multigraph code.
var Multigraph = require('./core/multigraph.js')($);
window.multigraph = {
    'core' : {
        'Multigraph':                	Multigraph,
        'CSVData':                		require('./core/csv_data.js')($),
        'WebServiceData':             	require('./core/web_service_data.js')($),

        'ArrayData':                    require('./core/array_data.js'),
        'Axis':                         require('./core/axis.js'),
        'AxisBinding':                  require('./core/axis_binding.js'),
        'AxisTitle':                    require('./core/axis_title.js'),
        'Background':                   require('./core/background.js'),
        'ConstantPlot':                 require('./core/constant_plot.js'),
        'Data':                         require('./core/data.js'),
        'DataFormatter':                require('./core/data_formatter.js'),
        'DataMeasure':                  require('./core/data_measure.js'),
        'DataPlot':                     require('./core/data_plot.js'),
        'DataValue':                    require('./core/data_value.js'),
        'DataVariable':                 require('./core/data_variable.js'),
        'Datatips':                     require('./core/datatips.js'),
        'DatatipsVariable':             require('./core/datatips_variable.js'),
        'DatetimeFormatter':            require('./core/datetime_formatter.js'),
        'DatetimeMeasure':              require('./core/datetime_measure.js'),
        'DatetimeValue':                require('./core/datetime_value.js'),
        'EventEmitter':                 require('./core/event_emitter.js'),
        'FilterOption':                 require('./core/filter_option.js'),
        'Filter':                       require('./core/filter.js'),
        'Graph':                        require('./core/graph.js'),
        'Grid':                         require('./core/grid.js'),
        'Icon':                         require('./core/icon.js'),
        'Img':                          require('./core/img.js'),
        'Labeler':                      require('./core/labeler.js'),
        'Legend':                       require('./core/legend.js'),
        'Mixin':                        require('./core/mixin.js'),
        'NumberFormatter':              require('./core/number_formatter.js'),
        'NumberMeasure':                require('./core/number_measure.js'),
        'NumberValue':                  require('./core/number_value.js'),
        'Pan':                          require('./core/pan.js'),
        'PeriodicArrayData':            require('./core/periodic_array_data.js'),
        'Plot':                         require('./core/plot.js'),
        'PlotLegend':                   require('./core/plot_legend.js'),
        'Plotarea':                     require('./core/plotarea.js'),
        'Renderer':                     require('./core/renderer.js'),
        'BandRenderer':                 require('./core/renderers/band_renderer.js'),
        'BarRenderer':                  require('./core/renderers/bar_renderer.js'),
        'FillRenderer':                 require('./core/renderers/fill_renderer.js'),
        'PointlineRenderer':            require('./core/renderers/pointline_renderer.js'),
        'RangeBarRenderer':             require('./core/renderers/rangebar_renderer.js'),
        'Text':                         require('./core/text.js'),
        'Title':                        require('./core/title.js'),
        'Warning':                      require('./core/warning.js'),
        'WebServiceDataCacheNode':      require('./core/web_service_data_cache_node.js'),
        'WebServiceDataIterator':       require('./core/web_service_data_iterator.js'),
        'Window':                       require('./core/window.js'),
        'Zoom':                         require('./core/zoom.js')
    },

    'create': Multigraph.create,

    'math': {
        'Box': 				require('./math/box.js'),
        'Displacement': 	require('./math/displacement.js'),
        'Enum': 			require('./math/enum.js'),
        'Insets': 			require('./math/insets.js'),
        'Point': 			require('./math/point.js'),
        'RGBColor': 		require('./math/rgb_color.js'),
        'util': 			require('./math/util.js')
    },
    'parser' : {
        'stringToJQueryXMLObj' : require('./parser/jquery_xml_parser.js').stringToJQueryXMLObj
    },
    'browserHasCanvasSupport' : Multigraph.browserHasCanvasSupport,
    'browserHasSVGSupport'    : Multigraph.browserHasSVGSupport,
    'jQuery' : $
};
window.sprintf = require('sprintf');
