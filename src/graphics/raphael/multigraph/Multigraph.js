/*global Raphael */

if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function(ns) {

        ns.Multigraph.hasA("paper"); // Raphael paper object

        ns.Multigraph.hasA("$div");  // jQuery object for the Raphael paper's div

        ns.Multigraph.hasA("width").which.isA('number');
        ns.Multigraph.hasA("height").which.isA('number');

        ns.Multigraph.respondsTo("init", function() {
            this.$div($('#'+this.divid()));
            this.width(this.$div().width());
            this.height(this.$div().height());
            if (this.paper()) {
                this.paper().remove();
            }
            this.paper(new window.Raphael(this.divid(), this.width(), this.height()));
            this.render();
        });

        ns.Multigraph.respondsTo("render", function() {
            var i;
            this.initializeGeometry(this.width(), this.height());
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.paper(), this.width(), this.height());
            }
        });

    });

    ns.Multigraph.createRaphaelGraph = function(divid, muglurl) {

        ns.jQueryXMLMixin.apply(ns, 'parseXML', 'serialize');
        ns.raphaelMixin.apply(ns);

        var muglPromise = $.ajax({
            "url"      : muglurl,
            "dataType" : "text"
        });

        var deferred = $.Deferred();

        muglPromise.done(function(data) {
            var multigraph = ns.Multigraph.parseXML( $(data) );
            multigraph.divid(divid);
            multigraph.init();
            deferred.resolve(multigraph);
        });

        return deferred.promise();

    };



}(window.multigraph));
