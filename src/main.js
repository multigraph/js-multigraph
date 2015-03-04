require('./parser/jquery_xml_parser.js')($);
require('./graphics/canvas/all.js')($, window);

// This forces ./events/multigraph.js to load, which is where the 'main' program
// really lives --- i.e. installation of the Multigraph jQuery plugin, and the
// $(document).ready(...) stuff that springs into action once the page has loaded.
// Note that the 3rd arg to require('./events/multigraph.js') is unused.
require('./events/multigraph.js')($, window, undefined);

// leave the Multigraph object available in the `Multigraph` global var:
window.Multigraph = require('./core/multigraph.js');
