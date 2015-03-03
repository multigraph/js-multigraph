/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

//var jquery_preload = require('../../src/jquery_preload.js');
//jquery_preload.with_jquery(function() {
//});


var jsdom = require('jsdom'),
    DOMParser = require('xmldom').DOMParser;

describe("Background Img parsing", function () {
    "use strict";

    //require('../../src/parser/jquery_xml_parser.js');

    var Img = require('../../src/core/img.js'),
        Point = require('../../src/math/point.js'),
        xmlString,
        $xml,
        image,
        srcString = "http://www.example.com/example_img.png",
        frameString = "plot",
        anchorString = "1,1",
        baseString = "0,0",
        positionString = "-1,1",
        ParseXML,
        $;

    require('../../src/parser/img.js');

    beforeEach(function(done){
        jsdom.env({
            html: '<html><body></body></html>',
            scripts: [process.cwd() + '/lib/jquery/jquery.min.js'],
            done: function(err, window) {
                jsdom.getVirtualConsole(window).sendTo(console);
                if (err) console.log(err);
                $ = window.jQuery;
                window.DOMParser = DOMParser;
                ParseXML = require('../../src/parser/parse_xml.js')($),
                xmlString = ''
                    + '<?xml version="1.0" encoding="UTF-8"?><img'
                    +    ' src="' + srcString + '"'
                    +    ' frame="' + frameString + '"'
                    +    ' anchor="' + anchorString + '"'
                    +    ' base="' + baseString + '"'
                    +    ' position="' + positionString + '"'
                    +    '></img>';
                var $xml = ParseXML.stringToJQueryXMLObj(xmlString);
                image = Img.parseXML($xml);
                done();
            }
        });
    });

    it("should be able to parse a background from XML", function () {
        expect(image).not.toBeUndefined();
        expect(image instanceof Img).toBe(true);
    });

    it("should be able to parse a img from XML and read its 'src' attribute", function () {
        expect(image.src()).toBe(srcString);
    });

    it("should be able to parse a img from XML and read its 'anchor' attribute", function () {
        expect(image.anchor().x()).toEqual((Point.parse(anchorString)).x());
        expect(image.anchor().y()).toEqual((Point.parse(anchorString)).y());
    });

    it("should be able to parse a img from XML and read its 'base' attribute", function () {
        expect(image.base().x()).toEqual((Point.parse(baseString)).x());
        expect(image.base().y()).toEqual((Point.parse(baseString)).y());
    });

    it("should be able to parse a img from XML and read its 'position' attribute", function () {
        expect(image.position().x()).toEqual((Point.parse(positionString)).x());
        expect(image.position().y()).toEqual((Point.parse(positionString)).y());
    });

    it("should be able to parse a img from XML and read its 'frame' attribute", function () {
        expect(image.frame()).toBe(frameString.toLowerCase());
    });

});
