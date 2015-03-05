$(document).ready(function() {

    function test_size(test) {
        return {
            width  : ( test.width  !== undefined ) ? test.width  : 800,
            height : ( test.height !== undefined ) ? test.height : 500
        };
    }

    function render(tests, n) {
        $("title").text(tests[n].mugl);
        $("a.prevlink").off();
        $("a.nextlink").off();
        if (n > 0) {
            $("#prevtext").text(tests[n-1].mugl);
            $("a.prevlink").on('click', function() {
                render(tests,n-1);
            });
        } else {
            $("#prevtext").text("");
        }
        if (n < tests.length-1) {
            $("#nexttext").text(tests[n+1].mugl);
            $("a.nextlink").on('click', function() {
                render(tests,n+1);
            });
        } else {
            $("#nexttext").text("");
        }

        $("#muglname a").text(tests[n].mugl);
        $("#muglname a").attr('href', "../mugl/"+tests[n].mugl );

        var size = test_size(tests[n]);

        $("#muglsize").text(size.width + " X " + size.height);

        $("div#multigraph-container").empty();
        $("div#multigraph-container").append("<div>");
        $("div#multigraph-container div").width(size.width);
        $("div#multigraph-container div").height(size.height);

        $("#testlist a").removeClass("selected");
        $("#testlist a.test"+n).addClass("selected");

        window.history.replaceState({}, "RDV", "./?test="+tests[n].mugl);

        function create_multigraph() {
            $("div#multigraph-container div").multigraph({
                'mugl' : "../mugl/" + tests[n].mugl
            });
        }

        var nOutstanding = 0;

        function incrOutstanding() {
            ++nOutstanding;
        }
        function decrOutstanding() {
            --nOutstanding;
            if (nOutstanding === 0) {
                create_multigraph();
            }
        }


        incrOutstanding();
        if (tests[n].js) {
            tests[n].js.forEach(function(js) {
                incrOutstanding();
                (function(d, script) {
                    script = d.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.onload = function(){
                        decrOutstanding();
                    };
                    script.src = js;
                    d.getElementsByTagName('head')[0].appendChild(script);
                }(document));
            });
        }
        decrOutstanding();
    }


    function find_test_index(tests, testname) {
        var i;
        for (i=0; i<tests.length; ++i) {
            if (tests[i].mugl === testname) { return i; }
        }
        return -1;
    }

    $.ajax({
        url: "tests.json",
        dataType: "json",
        success: function(tests) {

            tests.forEach(function(test,i) {
                var size = test_size(test);
                var $a = $("<a class=test"+i+" href='#'>" + test.mugl + " @ " + size.width + " X " + size.height + "</a>");
                $a.click(function() {
                    render(tests, i);
                });
                $("<div></div>").append($a).appendTo($("#testlist"));
            });

            var m = window.location.toString().match(/.*test=([^&#]+)/);
            var initial_test_n = 0;
            if (m) {
                var testname = m[1];
                initial_test_n = find_test_index(tests, testname);
            }
            if (initial_test_n < 0) {
                initial_test_n = 0;
            }
            render(tests, initial_test_n);
        },
        error : function (jqXHR, textStatus, errorThrown) {
            console.log('got an error');
            console.log(errorThrown);
        }
    });

});
