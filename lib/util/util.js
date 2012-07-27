(function (ns) {
   "use strict";

    var namespace = function (ns, func) {
        var nsRegExp = /^([a-zA-Z]+)(\.[a-zA-Z]*)*$/,
            nsArray,
            currentNS,
            i;

        //check to make sure ns is a properly formatted namespace string
        if (ns.match(nsRegExp) === null || ns === "window") {
            throw new Error("namespace: " + ns + " is a malformed namespace string");
        }

        //parse namespace string
        nsArray = ns.split(".");

        //set the root namespace to window (if it's not explictly stated)
        if (nsArray[0] === "window") {
            currentNS = window;
        } else {
            currentNS = (window[nsArray[0]] === undefined)?window[nsArray[0]] = {}:window[nsArray[0]];
        }

        //confirm func is actually a function
        if (typeof(func) !== "function") {
            throw new Error("namespace: second argument must be a function that accepts a namespace parameter");
        }

        //build namespace
        for (i = 1; i < nsArray.length; ++i) {
            if (currentNS[nsArray[i]] === undefined) {
                currentNS[nsArray[i]] = {};
            }
            currentNS = currentNS[nsArray[i]];
        }

        //if the function was defined, run it on the current namespace
        if (func) {
            func(currentNS);
        }

        //return namespace
        return currentNS;
    };

    return namespace(ns, function (exports) {
        exports.namespace = namespace;
    });
}("window.jermaine.util"));