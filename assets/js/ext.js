$.fn.cache = function() {
    var c = this.attr("class");
    var s = this.attr("style");
    this._cachedClasses = c == undefined ? "" : c;
    this._cachedStyles = s == undefined ? "" : s;
    return this;
};

$.fn.reset = function() {
    this.attr("class", this._cachedClasses);
    this.attr("style", this._cachedStyles);
    return this;
};