/*
 * This file defines a single global object named jQueryXMLHandler,
 * which has a single method named 'mixin', which adds two methods to
 * each of our domain objects (Graph, Axis, Plot).  The first is a
 * "parse" method, for translating a JQuery XML object into an
 * instance of the domain object.  The second is a "serialize" method
 * for converting a domain object to an XML string. The names of these
 * two methods are passed to this function as strings.
 * 
 * The 'parse' method is added to the object constructor function
 * directly.  This is so that we can invoke the 'parse' method on the
 * constructor name itself, as in Graph.parse(), like a static class
 * method in Java.  The 'parse' method returns a new instance of the
 * domain object, created by calling the object constructor function
 * (with 'new'), and then initializing all properties (and subobjects)
 * with values read from the specified xml object.
 *
 * The 'serialize' function, on the other hand, is added to the
 * constructor function's prototype, and is intended to be called
 * on an actual object instance. It returns string containing an
 * XML representation of the object.
 * 
 * So, for example, after calling
 * 
 *    jQueryXMLHandler.mixin('parseXML', 'serializeXML')
 * 
 * we can say
 * 
 *    var graph = Graph.parseXML(xml)
 *    var xmlstring = graph.serializeXML();
 */

/**
 * @param parse      the name (a string) to use for the parse function
 * @param serialize  the name (a string) to use for the serialize function
 */
var jQueryXMLHandler = jQueryXMLHandler ? jQueryXMLHandler : { 'mixinfuncs' : [] }
jQueryXMLHandler.mixin = function(parse, serialize) {

    $.each(jQueryXMLHandler.mixinfuncs, function(i,func) {
        func(parse,serialize);
    });

}
