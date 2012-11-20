window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */

    ns.EventEmitter = new window.jermaine.Model(function () {
        /**
         * EventEmitter is a Jermaine model that supports basic event emitting /
         * handling for Jermaine objects.
         *
         * Events are represented as plain old JavaScript objects with at least
         * the following two properties:
         *
         *   **type**
         *
         *   > a string giving the type of the event; this can be any
         *     arbitrary string.  The event type is not restricted to be
         *     from some predetermined list; applications are free to
         *     use whatever strings they want for their event types.
         *
         *   **target**
         *
         *   > a reference to the object that emitted the event
         *
         * Event objects may also contain arbitrary other properties that are specific to
         * a particular event type.
         *
         * Any Jermaine model can declare itself to be an event emitter by saying
         * "this.isA(EventEmitter)" in its model declaration.
         *
         * This adds three methods to the model:
         *  
         *   **addListener(eventType, listenerFunction)**
         *
         *   > Registers listenerFunction as a listener for events of type
         *     eventType (a string).  listenerFunction should be a function
         *     that accepts a single argument which will be a reference to an
         *     event object as described above.  When the object emits the
         *     event, the listener function will be invoked in the context
         *     where its "this" keyword refers to the object that emitted the
         *     event (the event target).  If listenerFunction is already
         *     registered as a listener for eventType, this function does
         *     nothing --- each listener function can be registered only once.
         *
         *   **removeListener(eventType, listenerFunction)**
         *
         *   > Removes the given listenerFunction from the list of listeners
         *     for this object for events of type eventType.
         *
         *   **emit(event)**
         *
         *   > Causes the object to emit the given event.  The argument can be
         *     either a string, in which case it is assumed to be an event type
         *     and is converted to an event object with the given 'type'
         *     property, or an event object with a 'type' property and any
         *     other desired properties.  The emit() method automatically adds
         *     a 'target' property to the event object, whose value is a
         *     reference to the object emitting the event.
         *
         * In most cases the emit() method is only called from within the
         * implementation of an EventEmitter object, and code external to the
         * object's model will use its addListener() and removeListener() methods
         * to process events that the object emits.  All three of these methods
         * are public methods, though, so it's also possible for code outside of
         * an object's implementation to cause it to emit an event, or for the
         * object's own code to listen for and process its own events.
         *
         * Two special types of events are always present for every EventEmitter
         * object: the "listenerAdded" and "listenerRemoved" events.  These
         * events make it possible to monitor the addition or removal of event
         * listeners.  The "listenerAdded" event is emitted whenever a new
         * listener function is added, and the "listenerRemoved" event is emitted
         * whenever a listener is removed.  Each of these events contain the
         * following properties:
         *
         *   **targetType**
         *
         *   > the event type associated with the listener
         *     being added or removed
         *
         *   **listener**
         *
         *   > the listener function being added or removed
         *
         * @class EventEmitter
         * @for EventEmitter
         * @constructor
         * @example
         *     var Person = new window.jermaine.Model(function() {
         *         this.isA(EventEmitter);
         *         this.hasA("name").which.isA("string");
         *         this.respondsTo("say", function(something) {
         *             console.log(this.name() + ' says ' + something);
         *             this.emit({type : "say", message : something});
         *         });
         *     });
         *     var person = new Person().name("Mark");
         *
         *     var sayListener = function(event) {
         *         console.log(event.target.name() + ' said ' + event.message);
         *     };
         *
         *     person.say('Hello');
         *     person.addListener("say", sayListener);
         *     person.say('Alright');
         *     person.removeListener("say", sayListener);
         *     person.say('Goodbye');
         *
         *
         *     OUTPUT:
         *
         *         Mark says Hello
         *         Mark says Alright
         *         Mark said Alright
         *         Mark said Goodbye
         */

        // listeners is a plain old JS object whose keys are events
        // types (strings); the value associated with each key is the
        // list of registered listener functions for that event type.
        this.hasA("listeners").which.defaultsTo( function() {
            // Use a function that returns an empty object as the
            // default value, so we get a new listeners object
            // created for each EventEmitter instance.
            return {};
        });

        /**
         * Adds a listener function for events of a specific type
         * emitted by this object.
         * 
         * @method addListener
         * @param {string} eventType the type of event
         * @param {function} listener a listener function
         * @return {boolean} a value indicating whether the listener
         *         was actually added (a listener is not added if it
         *         is already registered for the eventType)
         */
        this.respondsTo("addListener", function (eventType, listener) {
            var listeners = this.listeners(),
                i;

            if (listeners[eventType] === undefined) {
                listeners[eventType] = [];
            }
            for (i=0; i<listeners[eventType].length; ++i) {
                if (listeners[eventType][i] === listener) {
                    return false;
                }
            }
            listeners[eventType].push(listener);
            this.emit({ type       : "listenerAdded",
                        targetType : eventType,
                        listener   : listener});
            return true;
        });

        /**
         * Removes a listener function for events of a specific type
         * emitted by this object.
         * 
         * @method removeListener
         * @param {string} eventType the type of event
         * @param {function} listener the listener function to remove
         * @return {boolean} a value indicating whether the listener
         *         was actually removed.
         */
        this.respondsTo("removeListener", function (eventType, listener) {
            var listeners = this.listeners(),
                i;

            if (listeners[eventType] !== undefined) {
                for (i=0; i<listeners[eventType].length; ++i) {
                    if (listeners[eventType][i] === listener) {
                        listeners[eventType][i] = null;
                        this.emit({ type       : "listenerRemoved",
                                    targetType : eventType,
                                    listener   : listener});
                        return true;
                    }
                }
            }
            return false;
        });

        /**
         * Call this objects listeners for a specific event.  If the "event"
         * argument is a string, it is converted to an Object having
         * that string as the value of its "type" attribute; otherwise
         * the "event" argument should be an event Object having a
         * "type" attribute and any other attributes approriate for
         * that event type.  In either case, all (if there are any) of
         * the current listeners on this object for events of the
         * given type will be invoked, being passed an event object.
         * 
         * @method emit
         * @param {Object|string} event either a string representing an event type, or an event
         *                                 object with a 'type' attribute.
         * @return (nothing)
         */
        this.respondsTo("emit", function (event) {
            var listeners,
                i,
                nulls = [];

            if (typeof(event) === "string") {
                event = { type : event };
            }
            if (!event.target) {
                event.target = this;
            }
            if (!event.type) {
                throw new Error("Event object missing 'type' property");
            }

            listeners = this.listeners()[event.type];

            if (!listeners) {
                // no listeners registered for this event type
                return;
            }

            // call all the listeners for this event type, except for
            // nulls, which we keep track of
            for (i = 0; i < listeners.length; i++) {
                if (listeners[i] !== null) {
                    listeners[i].call(this, event);
                } else {
                    nulls.push(i);
                }
            }

            // remove any nulls from the listeners list; work from the end
            // of the list backwards so that removing an item doesn't change
            // the index of other items to be removed
            if (nulls.length > 0) {
                for (i=nulls.length-1; i>=0; --i) {
                    listeners.splice(nulls[i],1);
                }
            }

        });


    });

});
