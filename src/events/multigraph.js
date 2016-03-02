// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
var _INCLUDED = false;
module.exports = function($, window, errorHandler) {

    if (_INCLUDED) { return; } else { _INCLUDED = true; }
    
    var Multigraph = require('../core/multigraph.js')($);

    var methods = {
        multigraph : function () {
            return this.data('multigraph').multigraph;
        },

        done : function (func) {
            return this.each(function () {
                return $(this).data('multigraph').multigraph.done(func);
            });
        },

        destroy : function () {
            return this.each(function() {
                var $this = $(this);
                $this.removeData("multigraph");
            });
        },

        init : function (options) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('multigraph');
                if (!("mugl" in options) && !("muglString" in options)) {
                    // if options contains neigther "mugl" nor "muglString",
                    // assume it's a JSON mugl object, so pass it on as
                    // the value of "muglString":
                    options = {
                        muglString: options
                    };
                }
                options.div = this;
                if ( ! data ) {
                    $this.data('multigraph', {
                        multigraph : Multigraph.createGraph(options)
                    });
                }
                return this;
            });
        }
    };

    $.fn.multigraph = function (method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.multigraph' );
            return null;
        }    
    };

    /*
     * Inclusion of this file allows markup like the following to be
     * used in HTML:
     * 
     *     <div class="multigraph"
     *        data-src="MUGL_FILE"
     *        data-width="WIDTH"
     *        data-height="HEIGHT"
     *        data-driver="DRIVER">
     *     </div>
     * 
     * The data-driver tag is optional; if not specified, it currently
     * defaults to "canvas", but that will be changed in the future to
     * make a smart choice based on browser capabilities.
     * 
     * The data-width and data-height tags are also optional; if they
     * are not specified, Multigraph will use the div size as determined
     * by the browser (which may be set by css rules, for example).  If
     * data-width or data-height is present, it will override any css
     * width or height.
     * 
     */
    $(document).ready(function () {

        $("div.multigraph").each(function () {

            var width  = $(this).attr("data-width"),
                height = $(this).attr("data-height"),
                src    = $(this).attr("data-src"),
                driver = $(this).attr("data-driver"),
                options;

            if (width !== undefined) {
                $(this).css('width', width + 'px');
            }
            if (height !== undefined) {
                $(this).css('height', height + 'px');
            }

            /*
             // don't default to canvas here any more; Multigraph.createGraph now does
             // browser detection and will default to canvas if possible, otherwise
             // to raphael
             if (driver === undefined) {
             driver = "canvas";
             }
             */

            options = {
                'div'    : this,
                'mugl'   : src,
                'driver' : driver
            };

            $(this).multigraph(options);
            $(this).lightbox({
                scale : true,
                postopen : function () {
                    var lightboxData = this.data("lightbox");
                    lightboxData.originalDiv = this;
                    this.data("multigraph").multigraph.done(function (m) {
                        m.div(lightboxData.contents);
                        m.initializeSurface();
                        m.resizeSurface(lightboxData.contentWidth, lightboxData.contentHeight);
                        m.width(lightboxData.contentWidth)
                            .height(lightboxData.contentHeight);
                        m.busySpinner().remove();
                        m.busySpinner($('<div style="position: absolute; left:5px; top:5px;"></div>')
                                      .appendTo($(m.div()))
                                      .busy_spinner());
                        m.render();
                    });
                    var timeout= window.setTimeout(function () {
                        lightboxData.contents.lightbox("resize");
                        window.clearTimeout(timeout);
                    }, 50);
                },
                postclose : function () {
                    var lightboxData = this.data("lightbox");
                    this.data("multigraph").multigraph.done(function (m) {
                        m.div(lightboxData.originalDiv)
                            .width($(m.div()).width())
                            .height($(m.div()).height())
                            .busySpinner($('<div style="position: absolute; left:5px; top:5px;"></div>')
                                         .appendTo($(m.div()))
                                         .busy_spinner()
                                        );

                        m.initializeSurface();
                        m.render();
                    });
                },
                postresize : function () {
                    var lightboxData = this.data("lightbox");
                    this.data("multigraph").multigraph.done(function (m) {
                        m.resizeSurface(lightboxData.contentWidth, lightboxData.contentHeight);
                        m.width(lightboxData.contentWidth)
                            .height(lightboxData.contentHeight);
                        m.render();
                    });
                }
            });

        });

    });

};
