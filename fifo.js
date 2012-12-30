var FIFO = function(){
  var fifo = this;
  var args = Array.prototype.slice.apply(arguments);
  fifo.initialize.apply(fifo, args);
};

FIFO.prototype = {
    initialize: function(){
      var args = Array.prototype.slice.apply(arguments);

      var size = args.length > 0 ? args.shift() : 1024;
      var circular = args.length > 0 ? args.shift() : true;

      this.data = {};
      this.circular = Boolean(circular);
      if (isNaN(this.maxlength = parseInt(size))) {
          this.maxlength = 0;
      }
      this.length = 0;

      return(this);
    },

    push: function (k, v) {
        if (typeof this.data[k] === "undefined") {
            if (this.length < this.maxlength) {
                this.length++;
            } else if (this.circular) {
                this.pop();
                this.length++;
            } else {
                return -1;
            }
        }
        this.data[k] = v;
        return this.length;
    },

    pop: function () {
        for (var i in this.data) {
            var value = this.data[i];
            delete this.data[i];
            this.length--;
            return value;
        }
        return null;
    },

    has: function (k) {
        return typeof this.data[k] !== "undefined";
    },

    find: function (k) {
        return (typeof this.data[k] !== "undefined") ? this.data[k] : null;
    },

    unset: function (k) {
        if (typeof this.data[k] !== "undefined") {
            delete this.data[k];
            this.length--;
        }
    },

    clear: function () {
        this.data = {};
        this.length = 0;
    }
};
