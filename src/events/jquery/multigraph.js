(function($) {

    var core = window.multigraph.util.namespace("window.multigraph.core");

    /**
     * Inclusion of this file allows tags like the following to be
     * used in HTML:
     * 
     *     <multigraph src="MUGL_FILE" width="WIDTH" height="HEIGHT" driver="DRIVER"/>
     * 
     * The driver tag is optional; if not specified, it currently
     * defaults to "canvas", but that will be changed in the future to
     * make a smart choice based on browser capabilities.
     * 
     * The way this works is as follows:
     * 
     *   1. jQuery registers the function below to execute after the page
     *      has loaded
     *   2. when the function below executes, it scans the DOM for all
     *      <multigraph .../> tags and adds a child div tag to each one.
     *      That div tag has
     *         a. an inline style attribute that sets its width
     *            and height using the width and height attributes from the
     *            <multigraph .../> tag
     *         b. the same class attribute value, if any, as the enclosing
     *            <multigraph> tag
     *         c. an automatically generated id
     *      After the <div> child of the <multigraph> is created, Multigraph's
     *      createGraph() function is called to insert the graph into that div.
     * 
     * TODO: investigage replacing the <multigraph> tag completely with the <div>
     *       tag, rather than adding the <div> tag as a child of it.
     */
    $(document).ready(function() {

        var N = 1;

        $("multigraph").each(function() {
            var width = $(this).attr("width"),
                height = $(this).attr("height"),
                src = $(this).attr("src"),
                clazz = $(this).attr("class"),
                driver = $(this).attr("driver"),
                divid = "multigraph-divid-" + (N++),
                options;

            if (driver === undefined) {
                driver = "canvas";
            }
            
            options = {
                'div'    : divid,
                'mugl'   : src,
                'driver' : driver
            };

            // propagate any 'class' attribute setting to the div
            if (clazz === undefined) {
                clazz = "";
            } else {
                clazz = 'class="' + clazz + '"';
            }

            if (src !== undefined) {
                $(this).append('<div id="'+divid+'" '+clazz+' style="width: '+width+'px; height: '+height+'px;"></div>');
                core.Multigraph.createGraph(options);
            }

        });

    });

})(jQuery);
