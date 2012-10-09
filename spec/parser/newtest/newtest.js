/*global xdescribe, describe, xit, beforeEach, expect, it, jasmine */
/*jshint laxbreak:true */

describe("New Parser Tests", function () {
    "use strict";

    var xmlString = (''
                     + '<mugl>'
                     +   '<horizontalaxis id="x">'
                     +      '<title>Hello World!</title>'
                     +   '</horizontalaxis>'
                     +   '<renderer type="line">'
                     +      '<option name="color" value="red"/>'
                     +   '</renderer>'
                     + '</mugl>'
                    );
                     
//    console.log(xmlString);

    var $xml = window.multigraph.jQuery(xmlString);
//    console.log($xml);

    var pxml = window.multigraph.jQuery.parseXML(xmlString);
//    console.log(pxml);

    var $pxml = window.multigraph.jQuery(pxml);
//    console.log($pxml);

    var textNew = $pxml.find("title").text();
    var textOld = $xml.find("title").text();

    it(textNew + "/" + textOld, function() {
    });

});
