module.exports = function() {
    var Window = require('../../core/window.js');

    if (typeof(Window.render)==="function") { return Window; }

    Window.respondsTo("render", function (context, width, height) {
        var m = this.margin().left();

        context.save();
        context.fillStyle = this.bordercolor().getHexString("#");
        context.fillRect(m, m, width - 2*m, height - 2*m);
        context.restore();
    });

    return Window;
};
