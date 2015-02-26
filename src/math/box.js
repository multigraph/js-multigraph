var Box = new window.jermaine.Model("Box", function () {
    this.hasA("width").which.isA("number");
    this.hasA("height").which.isA("number");
    this.isBuiltWith("width", "height");
});
    
module.exports = Box;
