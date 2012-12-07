(function($) {
    "use strict";

    var core = window.multigraph.util.namespace("window.multigraph.core");

    var methods = {
        multigraph : function() {
            return this.data('multigraph').multigraph;
        },

        done : function(func) {
            return this.each(function() {
                return $(this).data('multigraph').multigraph.done(func);
            });
        },

        init : function(options) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data('multigraph'),
                    settings = $.extend({
                        'div' : this
                    }, options);
                if ( ! data ) {
                    $this.data('multigraph', {
                        multigraph : core.Multigraph.createGraph(settings)
                    });
                }
                return this;
            });
        }
    };

    $.fn.multigraph = function( method ) {
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
    $(document).ready(function() {

        $("div.multigraph").each(function() {

            var width = $(this).attr("data-width"),
                height = $(this).attr("data-height"),
                src = $(this).attr("data-src"),
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

        });

    });

}(window.multigraph.jQuery));
