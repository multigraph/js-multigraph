var ConsecutiveDistanceFilter = function (options) {
    this.options = options;
    this.prevPx = undefined;
    this.prevPy = undefined;
    this.havePrev = false;
    this.distance = ("distance" in options) ? options.distance : 5;
};

ConsecutiveDistanceFilter.prototype.reset = function () {
    this.havePrev = false;
};

ConsecutiveDistanceFilter.prototype.filter = function (datap, pixelp) {
    var filterOut = false;
      if (this.havePrev) {
          var dx = Math.abs(pixelp[0] - this.prevPx);
          var dy = Math.abs(pixelp[1] - this.prevPy);
          filterOut = (dx + dy < this.distance);
          if (!filterOut) {
              this.prevPx = pixelp[0];
              this.prevPy = pixelp[1];
          }
      } else {
          this.prevPx = pixelp[0];
          this.prevPy = pixelp[1];
      }
    this.havePrev = true;
    return filterOut;
};

module.exports = ConsecutiveDistanceFilter;
