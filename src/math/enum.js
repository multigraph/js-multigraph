// Use Enum to create objects that act like enumerations in other languages (such as Java).
// 
// Usage is like this:
// 
//   var Suit = Enum("Suit");
//   var clubs = new Suit("clubs");
//   var diamonds = new Suit("diamonds");
//   var spades = new Suit("spades");
//   var hearts = new Suit("hearts");
// 
//   var c = Suit.parse("clubs");  # c is guaranteed to equal the clubs variable from above
// 
var Enum = function (name) {

    var instances = {};

    var Enum = function (key) {
        if (instances[key] !== undefined) {
            throw new Error("attempt to redefine "+name+" Enum with key '"+key+"'");
        }
        this.enumType = name;
        this.key = key;
        instances[key] = this;
    };

    Enum.parse = function (key) {
        return instances[key];
    };

    Enum.prototype.toString = function () {
        return this.key;
    };

    Enum.isInstance = function (obj) {
        return (obj !== undefined && obj !== null && obj.enumType === name);
    };

    return Enum;
};

module.exports = Enum;
