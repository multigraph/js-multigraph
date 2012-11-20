window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */

    /**
     * The Mixin model provides a convenient way for Jermaine
     * applications to "mix in" additional functionality to a model,
     * from outside the model's initial definition.
     * 
     * The ability to add features (methods and/or attributes) to a
     * Jermaine model outside its initial definition already exists in
     * Jermaine -- this Mixin model does not actually add new
     * functionality to Jermaine; it just provides a convenient
     * pattern for grouping additional features together and applying
     * them to a model as a group.
     * 
     * The Mixin model maintains an internal list of functions, called
     * mixin functions, and provides an add() method for adding a
     * function to that list.
     * 
     * The apply() method calls all of the mixinfunctions that have been
     * added to the list, passing each one the same arguments
     * that were passed to the apply() function itself.
     * 
     * That's it.  That's all the Mixin class does.  It's up to you to
     * put whatever jermaine-model-extending code you want in the
     * mixin functions you add to the Mixin; the Mixin simply serves
     * as a place to hold them all, and a convenient way to execute
     * them all at once.
     *
     * @class Mixin
     * @for Mixin
     * @author mbp
     */
    var Mixin = new window.jermaine.Model( "Mixin", function () {

        /**
         * The internal list of functions to be applied.
         *
         * @property mixinfuncs
         * @private
         * @type {}
         * @author mbp
         */
        this.hasMany("mixinfuncs");

        /**
         * Internal value for tracking whether apply() has been called
         * for this Mixin.
         *
         * @property applied
         * @type {}
         * @private
         * @author mbp
         */
        this.hasA("applied").which.isA("boolean").defaultsTo(false);

        /**
         * Adds a function to this Mixin's mixin list.  Does not check
         * to see if the function is already on the list -- just blindly
         * appends the given function to the list.
         *
         * @method add
         * @param {} func
         * @author mbp
         */
        this.respondsTo("add", function (mixinfunc) {
            this.mixinfuncs().add(mixinfunc);
        });

        /**
         * Call each of this Mixin's mixin functions.  Any
         * arguments passed to apply() will be passed through to each
         * mixin function called.
         * 
         * apply() checks to see whether it has ever been called
         * before for this Mixin, and only executes the mixin
         * functions if this is the first call to apply(); calls to
         * apply() after the first one will have no effect.  (This is
         * true even if additional mixin functions are added after
         * apply() is called; the Mixin maintains a single internal
         * Boolean value that tracks whether apply() has been called.)
         *
         * @method apply
         * @author mbp
         */
        this.respondsTo("apply", function () {
            if (! this.applied()) {
                var i;
                for (i=0; i<this.mixinfuncs().size(); ++i) {
                    this.mixinfuncs().at(i).apply(this, arguments);
                }
            }
            this.applied(true);
        });


        /**
         * Just like apply(), but forces the mixin functions to be called
         * regardless of whether apply() was previously called for this
         * Mixin.
         *
         * @method reapply
         * @author mbp
         */
        this.respondsTo("reapply", function () {
            this.applied(false);
            this.apply.apply(this,arguments);
        });


   });

    ns.Mixin = Mixin;

});
