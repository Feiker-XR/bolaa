if (typeof (Object.create) != 'function') {
    Object.create = function (obj) {
        var obj1 = {};
        for (var n in obj) {
            obj1[n] = obj[n];
        }
        return obj1;
    };
}

if (Function.prototype.bind == undefined) {
    Function.prototype.bind = function () {
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object,
                args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}

if (Array.prototype.indexOf == undefined) {
    Array.prototype.indexOf = function (item) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == item) {
                return i;
            }
        }
        return -1;
    };
}