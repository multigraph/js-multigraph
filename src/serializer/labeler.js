window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, serialize) {

        ns.core.Labeler.prototype[serialize] = function (spacing, tag) {
            // This serializer takes a single optional argument which is a value to output for the "spacing"
            // attribute.  If that argument is missing, the labeler's own spacing value is used.  This seemingly
            // weird API is in support of the ability to collapse multiple <label> tags into a single one,
            // with spacings separated by spaces.  The idea is that whoever calls this serialize method will
            // figure out if it has multiple Labelers are the same except for spacing, and if so, it will
            // serialize only one of them, passing in a space-separated string of the spacings for the "spacing"
            // argument.
            //
            // It also takes a second optional argument which is the tag string to use; the default is "label".
            if (tag === undefined) {
                tag = 'label';
            }

            var attributeStrings = [],
                output = '<'+tag+' ';

            if (spacing === undefined) {
                spacing = this.spacing();
            }

            if (this.start() !== undefined)          { attributeStrings.push('start="'           + this.start()                       + '"'); }
            if (this.angle() !== undefined)          { attributeStrings.push('angle="'           + this.angle()                       + '"'); }
            if (this.formatter() !== undefined)      { attributeStrings.push('format="'          + this.formatter().getFormatString() + '"'); }
            if (this.anchor() !== undefined)         { attributeStrings.push('anchor="'          + this.anchor().serialize()          + '"'); }
            if (this.position() !== undefined)       { attributeStrings.push('position="'        + this.position().serialize()        + '"'); }
            if (spacing !== undefined)               { attributeStrings.push('spacing="'         + spacing                            + '"'); }
            if (this.densityfactor() !== undefined)  { attributeStrings.push('densityfactor="'   + this.densityfactor()               + '"'); }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
