window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    ns.EventEmitter = new window.jermaine.Model(function () {

        // listeners is a js object whose keys are the names (strings)
        // of emitted events; the value associated with each key
        // is the list of registered listener functions for that event.
        this.hasA("listeners").which.defaultsTo( function() {
            // Use a function that returns an empty object as the
            // default value, so we get a new listeners object
            // created for each EventEmitter instance.
            return {};
        });

        this.respondsTo("addListener", function (event, listener) {
            var listeners = this.listeners(),
                i;
            if (listeners[event] === undefined) {
                listeners[event] = [];
            }
            for (i=0; i<listeners[event].length; ++i) {
                if (listeners[event][i] === listener) {
                    return false;
                }
            }
            listeners[event].push(listener);
            if (event !== "addListener") {
                this.emit("listenerAdded", event, listener);
            }
            return true;
        });

        this.respondsTo("removeListener", function (event, listener) {
            var listeners = this.listeners(),
                i;
            for (i=0; i<listeners.length; ++i) {
                if (listeners[i] === listener) {
                    this.emit("listenerRemoved", event, listener);
                    listeners[i] = null;
                    break;
                }
            }
        });

        // call the registered listeners for an event
        this.respondsTo("emit", function (event) {
            var listeners = this.listeners(),
                i,
                nulls = [],
                event_listeners,
                args;

            if (!listeners[event]) { return; } // no listeners registered for this event

            event_listeners = listeners[event];

            // call all the listeners in our list, except for nulls, which we keep
            // track of
            for (i = 0; i < event_listeners.length; i++) {
                if (event_listeners[i] !== null) {
                    args = Array.prototype.slice.call(arguments);
                    args.splice(0,1);
                    event_listeners[i].apply(this, args);
                } else {
                    nulls.push(i);
                }
            }

            // remove any nulls from the event_listeners list
            if (nulls.length > 0) {
                for (i=nulls.length-1; i>=0; --i) {
                    event_listeners.splice(nulls[i],1);
                }
            }

        });


    });

});
