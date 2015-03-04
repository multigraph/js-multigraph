module.exports = function() {
    var Background = require('../../core/background.js');

    if (typeof(Background.render)==="function") { return Background; }

    Background.respondsTo("render", function (graph, context, width, height) {
        var mb = graph.window().margin().left() + graph.window().border(),
            img = this.img();

        context.save();
        context.fillStyle = this.color().getHexString("#");
        context.fillRect(mb, mb, width - 2*mb, height - 2*mb);
        context.restore();
        
        if (img && img.src() !== undefined) {
            img.render(graph, context, width, height);
        }
    });

    return Background;
};
