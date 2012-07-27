describe("namespace utility", function () {
    var namespace = window.util.namespace;

    it("should throw an error on a malformed namespace string", function () {
        expect(function () {
            namespace("not;a;namespace", function () {});
        }).toThrow("namespace: not;a;namespace is a malformed namespace string");

        expect(function () {
            namespace("window.this.is.a.namespace", function () { });
        }).not.toThrow();

        expect(function () {
            namespace("window", function () {});
        }).toThrow("namespace: window is a malformed namespace string");
    });

    it("should throw an error if the second argument exists and is not a function", function () {
        expect(function () {
            namespace("this.is.a.test", "namespace");
        }).toThrow("namespace: second argument must be a function that accepts a namespace parameter");
    });

    it("should create the appropriate namespace", function () {
        var ns = namespace("window.test", function (exports) {
            exports.message = "this is a message in the namespace";
        });

        expect(window.test).not.toBeUndefined();
        expect(window.test.message).not.toBeUndefined();
        expect(window.test.message).toBe("this is a message in the namespace");
    });

    it("should add the namespace to the window if it is not explicitly the first part of the namespace string", function () {
        var ns = namespace("newNameSpace", function (exports) {
            exports.message = "another test namespace";
        });

        expect(window.newNameSpace).not.toBeUndefined();
        expect(newNameSpace).not.toBeUndefined();
        expect(newNameSpace.message).toBe("another test namespace");
        expect(ns).toBe(window.newNameSpace);
        expect(ns.message).toBe("another test namespace");

    });
});