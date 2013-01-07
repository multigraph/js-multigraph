window.multigraph.util.namespace("window.multigraph.math", function (ns) {
    "use strict";

    /**
     * The Math module provides utility models and functions which correspond to mathematical concepts.
     *
     * @module multigraph
     * @submodule math
     * @main math
     */

    /**
     * A Displacement represents a geometric position along a line
     * segment, expressed in terms of two quantities: a relative
     * position called `a`, and an absolute offset called `b`.  The
     * length of the line segment is not known in advance --- the idea
     * is that the Displacement object encapsulates a rule for
     * determining a location along ANY line segment.  The Displacement
     * has methods which take the line segment length as an argument
     * and return the computed final position.
     *
     * There are two different position-calcuating methods,
     * corresponding to two different interpretations of the relative
     * value `a`:
     *
     * **relative length**:
     *     `a` is a number between 0 and 1, representing a fraction of
     *       the total length of the line segment; the relative
     *       position determined by `a` is the fraction `a` of the
     *       total length of the segment.
     *     In this case, the position-calculating method
     *       `calculateLength(L)` returns the number `a * L + b`, which
     *       corresponds to moving `a` of the way along the length L,
     *       then adding `b`:
     *
     *             [--------------------------------X------------]
     *             |<---- a * L --->|<---- b ------>|
     *             |<------------------  L  -------------------->|
     *
     * **relative coordinate**:
     *     `a` is a number between -1 and 1, representing a coordinate
     *       value in a [-1,1] coordinate system along the line
     *       segment.
     *     In this case, the position-calculating method
     *       `calculateCoordinate(L)` returns the number `(a+1) * L/2 +
     *       b`.  which corresponds to moving to the position
     *       determined by the `a` coordinate, then adding `b`:
     *
     *             [------------------------------------X--------]
     *             |<--- (a+1) * L/2 --->|<---- b ----->|
     *             |<------------------  L  -------------------->|
     *
     * @class Displacement
     * @for Displacement
     * @constructor
     * @param {Number} a
     * @param {Integer} b (OPTIONAL)
     */
    ns.Displacement = new window.jermaine.Model( "Displacement", function () {
        
        this.hasA("a").which.validatesWith(function (a) {
            return window.multigraph.utilityFunctions.validateNumberRange(a, -1.0, 1.0);
        });
        this.hasA("b").which.isA("integer").and.defaultsTo(0);
        this.isBuiltWith("a", "%b");

        this.respondsTo("calculateLength", function (totalLength) {
            return this.a() * totalLength + this.b();
        });

        this.respondsTo("calculateCoordinate", function (totalLength) {
            return (this.a() + 1) * totalLength/2.0 + this.b();
        });

    });

    ns.Displacement.regExp = /^([\+\-]?[0-9\.]+)([+\-])([0-9\.+\-]+)$/;

    /**
     * Parses a string into a Displacement.  The string should be of one of the following forms:
     *
     *     "A+B"  ==>  a=A  b=B
     *     "A-B"  ==>  a=A  b=-B
     *     "A"    ==>  a=A  b=0
     *     "+A"   ==>  a=A  b=0
     *     "-A"   ==>  a=-A b=0
     * 
     * @method parse
     * @param {String} string
     * @static
     * @author jrfrimme
     */
    ns.Displacement.parse = function (string) {
        var ar = ns.Displacement.regExp.exec(string),
            d,
            a,
            b,
            sign;
        if (string === undefined) {
            d = new ns.Displacement(1);
        } else if (ar !== null) {
            a = parseFloat(ar[1]);
            b = parseFloat(ar[3]);
            switch (ar[2]) {
            case "+":
                sign = 1;
                break;
            case "-":
                sign = -1;
                break;
            default:
                sign = 0;
                break;
            }
            /*
              if (isNaN(a) || sign == 0 || isNaN(b)) {
              throw new ParseError('parse error');
              }
            */
            d = new ns.Displacement(a, sign * b);
        } else {
            a = parseFloat(string);
            /*n
              if (isNaN(a)) {
              throw new ParseError('parse error');
              }
            */
            d = new ns.Displacement(a);
        }
        return d;
    };
});
