/**
 * The SpeedTester object runs a sequence of tests (actually any sequence of functions) in such
 * a way as to ensure that the browser has a chance to update the page display between each test.
 * The idea is that each test function might update the DOM to indicate the results of that test,
 * and we want the user to be able to see the results of each test immediately, rather than waiting
 * until all tests are done.
 * 
 * Each "test" actually consists of a pair of functions, one called the "prep" function, and one
 * called the "test" function.  When the SpeedTester object runs the test, it runs the "prep" function
 * first, followed by the "test" function, allowing the browser to refresh the screen after each one
 * of these.
 * 
 * Usage is as follows:
 * 
 *     var speedTester = new window.speedtester.SpeedTester();
 * 
 *     speedTester.createTest( [prep function], [test function] );
 *     speedTester.createTest( [prep function], [test function] );
 *     ...
 *     speedTester.createTest( [prep function], [test function] );
 * 
 *     speedTester.runTests();
 * 
 * The runTests() method runs all tests specified by calls to the createTest() method, in the
 * order given. runTests() takes an optional argument, which is a function to be run
 * after all tests have run.
 */

if (!window.speedtester) {
    window.speedtester = {};
}

(function(ns) {

    var SpeedTester = function() {

        this.tests = [];

        this.createTest = function (prep, test) {
            this.tests.push({"prep" : prep, "test" : test});
        };

        this.testIndex = 0;

        this.runTests = function(post) {
            var that = this;
            if (this.testIndex >= this.tests.length) {
                if (typeof(post) === 'function') {
                    post();
                }
                return;
            }
            var test = this.tests[this.testIndex];
            ++this.testIndex;
            if (typeof(test.prep) === 'function') {
                test.prep();
            }
            window.requestAnimationFrame(function() {
                if (typeof(test.test) === 'function') {
                    test.test();
                }
                that.runTests(post);
            });
        };

    };

    ns.SpeedTester = SpeedTester;

})(window.speedtester);
