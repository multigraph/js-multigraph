if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.canvasMixin.add(function(ns) {
        var Graph = ns.Graph;

        Graph.respondsTo("render", function(context, width, height) {
            var i;

/*
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(width, height);
            context.moveTo(0, height);
            context.lineTo(width, 0);
            context.strokeStyle = "#000000";
            context.stroke();
            context.closePath();
*/

            console.log(this.background());

            context.fillStyle = this.window().bordercolor().getHexString("#");
            var m = this.window().margin().left();
            context.fillRect(m,m,width-2*m,height-2*m);

            var mb = m + this.window().border();

            context.fillStyle = this.background().color().getHexString("#");
            context.fillRect(mb,mb,width-2*mb,height-2*mb);

            var x0 = this.window().margin().left()  + this.window().border() + this.window().padding().left() + this.plotarea().margin().left();
            var y0 = this.window().margin().bottom() + this.window().border() + this.window().padding().bottom() + this.plotarea().margin().bottom();

            context.transform(1,0,0,1,x0,y0);

            for (i=0; i<this.axes().size(); ++i) {
                this.axes().at(i).render(this, context);
            }
        });

    });

}(window.multigraph));
