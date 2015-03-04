// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
var WebServiceData;
module.exports = function($) {
    if (typeof(WebServiceData) !== "undefined") { return WebServiceData; }

    var Model = require('../../lib/jermaine/src/core/model.js');

    var Data = require('./data.js'),
        DataValue = require('./data_value.js'),
        DataFormatter = require('./data_formatter.js'),
        ArrayData = require('./array_data.js'),
        WebServiceDataCacheNode = require('./web_service_data_cache_node.js'),
        WebServiceDataIterator = require('./web_service_data_iterator.js');

    WebServiceData = Model(function () {
        this.isA(Data);
        this.hasA("serviceaddress").which.isA("string");
        this.hasA("serviceaddresspattern").which.isA("string");
        this.hasA("format").which.isA("string");
        this.hasA("formatter").which.validatesWith(DataFormatter.isInstance);
        this.hasA("messageHandler");
        this.hasA("ajaxthrottle");
        this.isBuiltWith("columns", "serviceaddress", "%messageHandler", "%ajaxthrottle", function () {
            this.init();
            if (this.columns().size() > 0) {
                var column0Type = this.columns().at(0).type();
                if (this.format() === undefined) {
                    this.format(column0Type===DataValue.NUMBER ? "%f" : "%Y%M%D%H%i%s");
                }
                this.formatter(DataFormatter.create(column0Type, this.format()));
            }
            if (this.ajaxthrottle() === undefined) {
                this.ajaxthrottle($);
            }
        });

        this.respondsTo("_displayError", function (e) {
            if (this.messageHandler()) {
                this.messageHandler().error(e);
            } else {
                throw e;
            }
        });

        this.respondsTo("getBounds", function (columnNumber) {
            // TODO: replace this kludge
            return [0, 10];
        });

        this.hasA("arraydata").which.defaultsTo(null).and.validatesWith(function (arraydata) {
            return arraydata instanceof ArrayData || arraydata === null;
        });

        /**
         * A pointer to the head WebServiceDataCacheNode in this WebServieData's cache.
         *
         * @property cacheHead
         * @type {null|WebServiceDataCacheNode}
         * @author jrfrimme
         */
        this.hasA("cacheHead").which.defaultsTo(null).and.validatesWith(function (x) {
            return x === null || x instanceof WebServiceDataCacheNode;
        });

        /**
         * A pointer to the tail WebServiceDataCacheNode in this WebServieData's cache.
         *
         * @property cacheTail
         * @type {null|WebServiceDataCacheNode}
         * @author jrfrimme
         */
        this.hasA("cacheTail").which.defaultsTo(null).and.validatesWith(function (x) {
            return x === null || x instanceof WebServiceDataCacheNode;
        });

        /**
         * Return a pointer to the first WebServiceDataCacheNode in this WebServieData's cache
         * that actually contains data, if any.  If the cache doesn't contain any data, return null.
         *
         * @method dataHead
         * @author jrfrimme
         * @return {null|WebServiceDataCacheNode}
         */
        this.respondsTo("dataHead", function () {
            var head = this.cacheHead();
            if (head === null) { return null; }
            if (head.hasData()) { return head; }
            return head.dataNext();
        });

        /**
         * Return a pointer to the last WebServiceDataCacheNode in this WebServieData's cache
         * that actually contains data, if any.  If the cache doesn't contain any data, return null.
         *
         * @method dataTail
         * @author jrfrimme
         * @return {null|WebServiceDataCacheNode}
         */
        this.respondsTo("dataTail", function () {
            var tail = this.cacheTail();
            if (tail === null) { return null; }
            if (tail.hasData()) { return tail; }
            return tail.dataPrev();
        });

        /**
         * Insert a WebServiceCacheNode into this WebService's cache.
         * If this node's coveredMin is less than the cache head's
         * coveredMin, insert it at the head; otherwise insert it at
         * the tail.  Note that nodes are only inserted either at the
         * head or at the tail of the cache --- not in the middle.
         *
         * @method insertCacheNode
         * @param {WebServiceCacheNode} node
         * @author jrfrimme
         */
        this.respondsTo("insertCacheNode", function (node) {
            var head = this.cacheHead(),
                tail = this.cacheTail();
            if (head === null) {
                this.cacheHead(node);
                this.cacheTail(node);
            } else {
                if (node.coveredMin().lt(head.coveredMin())) {
                    node.next(head);
                    head.prev(node);
                    this.cacheHead(node);
                } else {
                    node.prev(tail);
                    tail.next(node);
                    this.cacheTail(node);
                }
            }
        });

        this.respondsTo("constructRequestURL", function (min, max) {
            var serviceaddress = this.serviceaddress(),
                formatter = this.formatter();

            if (serviceaddress === undefined) {
                throw new Error("WebServiceData.constructRequestURL: undefined service address");
            }
            if (formatter === undefined) {
                throw new Error("WebServiceData.constructRequestURL: undefined formatter for column 0");
            }
            if (this.serviceaddresspattern() === undefined) {
                if ((serviceaddress.indexOf("$min") < 0) &&
                    (serviceaddress.indexOf("$max") < 0)) {
                    this.serviceaddresspattern(serviceaddress + "$min,$max");
                } else {
                    this.serviceaddresspattern(serviceaddress);
                }
            }
            return (this.serviceaddresspattern()
                    .replace("$min", formatter.format(min))
                    .replace("$max", formatter.format(max)));
        });

        this.hasA("coveredMin").which.defaultsTo(null).and.validatesWith(function (x) {
            return x === null || DataValue.isInstance(x);
        });
        this.hasA("coveredMax").which.defaultsTo(null).and.validatesWith(function (x) {
            return x === null || DataValue.isInstance(x);
        });

        /**
         * Initiate requests needed to fetch data between coveredMin and coveredMax, if any.
         *
         * @method insureCoveredRange
         * @author jrfrimme
         */
        this.respondsTo("insureCoveredRange", function () {
            var head = this.cacheHead(),
                tail = this.cacheTail(),
                coveredMin = this.coveredMin(),
                coveredMax = this.coveredMax();

            if (coveredMin === null || coveredMax === null) {
                return;
            }
            if (head === null || tail === null) {
                this.requestSingleRange(coveredMin, coveredMax);
            } else {
                if (coveredMin.lt(head.coveredMin())) {
                    //                     head's min              tail's max
                    //  -----|-------------|-----------------------|----------------
                    //       coveredMin
                    this.requestSingleRange(coveredMin, head.coveredMin());
                }
                if (coveredMax.gt(tail.coveredMax())) {
                    //                     head's min              tail's max
                    //  -------------------|-----------------------|-----------|----
                    //                                                         coveredMax
                    this.requestSingleRange(tail.coveredMax(), coveredMax);
                }
            }
        });

        this.respondsTo("requestSingleRange", function (min, max) {
            var node,
                requestURL,
                that = this,
                JQueryXMLParser = require('../parser/jquery_xml_parser.js')($);

            // create the cache node that will hold the data in this range
            node = new WebServiceDataCacheNode(min, max);

            // insert it into the cache linked list
            this.insertCacheNode(node);

            // construct the URL for fetching the data in this range
            requestURL = this.constructRequestURL(min, max);

            // initiate the fetch request
            this.emit({type : 'ajaxEvent', action : 'start'});
            this.ajaxthrottle().ajax({
                url      : requestURL,
                dataType : "text",
                success  : function (data) {
                    // if data contains a <values> tag, extract its text string value
                    if (data.indexOf("<values>") > 0) {
                        data = JQueryXMLParser.stringToJQueryXMLObj(data).find("values").text();
                    }
                    node.parseData(that.getColumns(), data);

                    that.emit({type : 'ajaxEvent', action : 'success'});
                    that.emit({type : 'dataReady'});
                },

                error : function (jqXHR, textStatus, errorThrown) {
                    var message = errorThrown;
                    if (jqXHR.statusCode().status === 404) {
                        message = "URL not found: '" + requestURL + '"';
                    } else {
                        if (textStatus) {
                            message = textStatus + ": " + message;
                        }
                    }
                    that._displayError(new Error(message));
                },

                // 'complete' callback gets called after either 'success' or 'error', whichever:
                complete : function (jqXHR, textStatus) {
                    that.emit({type : 'ajaxEvent', action : 'complete'});
                }

            });
        });

        this.respondsTo("getIterator", function (columnIds, min, max, buffer) {
            var initialNode,
                initialIndex,
                n, b, i, tmp,
                finalNode,
                finalIndex,
                columnIndices;

            // if min > max, swap them
            if (min.gt(max)) {
                tmp = min;
                min = max;
                max = tmp;
            }

            if (this.coveredMin() === null || min.lt(this.coveredMin())) {
                this.coveredMin(min.clone());
            }
            if (this.coveredMax() === null || max.gt(this.coveredMax())) {
                this.coveredMax(max.clone());
            }

            if (!this.paused()) {
                this.insureCoveredRange();
            }

            if (this.dataHead() === null) {
                // cache is empty, return empty iterator:
                return {
                    "next"    : function () {},
                    "hasNext" : function () { return false; }
                };
            }
            // convert columnIds to columnIndices
            columnIndices = [];
            for (i = 0; i < columnIds.length; ++i) {
                columnIndices.push( this.columnIdToColumnNumber(columnIds[i]) );
            }

            // find the data node containing the 'min' value
            initialNode = this.dataHead();
            while ((initialNode !== null) &&
                   (initialNode.dataNext() !== null) &&
                   (min.gt(initialNode.dataMax()))) {
                initialNode = initialNode.dataNext();
            }
            
            if (initialNode === null || !initialNode.hasData()) {
                initialIndex = -1;
            } else {
                initialIndex = 0;
                // find the index within the initial node corresponding to the 'min' value
                while ((initialIndex < initialNode.data().length-1) &&
                       (initialNode.data()[initialIndex][columnIndices[0]].lt(min))) {
                    ++initialIndex;
                }
                
                // back up 'buffer' steps, being careful not to go further back than the first element of the head node
                n = 0;
                while (n<buffer) {
                    --initialIndex;
                    if (initialIndex<0) {
                        b = initialNode.dataPrev();
                        if (b !== null) {
                            initialNode = b;
                            initialIndex = initialNode.data().length-1;
                        } else {
                            initialIndex = 0;
                            break;
                        }
                    }
                    ++n;
                }
                
                // find the data node containing the 'max' value
                finalNode = initialNode;
                while ( (max.gt(finalNode.dataMax())) &&
                        (finalNode.dataNext() !== null) ) {
                    finalNode = finalNode.dataNext();
                }
                
                // find the index within the final node corresponding to the 'max' value
                finalIndex = 0;
                if (finalNode === initialNode) {
                    finalIndex = initialIndex;
                }
                while ((finalIndex < finalNode.data().length-1) &&
                       (finalNode.data()[finalIndex][columnIndices[0]].lt(max))) {
                    ++finalIndex;
                }
                
                // go forward 'buffer' more steps, being careful not to go further than the last element of the tail
                n = 0;
                //while (n<buffer && !(finalNode===_tail && finalIndex<finalNode.data.length)) {
                while (n < buffer) {
                    ++finalIndex;
                    if (finalIndex >= finalNode.data().length) {
                        b = finalNode.dataNext();
                        if (b !== null) {
                            finalNode = b;
                            finalIndex = 0;
                        } else {
                            finalIndex = finalNode.data().length-1;
                            break;
                        }
                    }
                    ++n;
                }
                
            }
            
            return new WebServiceDataIterator(columnIndices, initialNode, initialIndex, finalNode, finalIndex);
        });

        this.hasA("paused").which.isA("boolean").and.defaultsTo(false);
        this.respondsTo("pause", function() {
            this.paused(true);
        });
        this.respondsTo("resume", function() {
            this.paused(false);
            this.emit({type : 'dataReady',
                       min : this.coveredMin(),
                       max : this.coveredMax()});
        });

    });

    return WebServiceData;
};
