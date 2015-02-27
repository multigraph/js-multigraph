var NormalizerMixin = require('./normalizer_mixin.js');

NormalizerMixin.add(function () {
    var Multigraph = require('../core/multigraph.js');
    Multigraph.respondsTo("normalize", function () {
        var i;
        
        for (i = 0; i < this.graphs().size(); ++i) {
            this.graphs().at(i).normalize();
        }

    });

});
