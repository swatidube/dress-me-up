(function (window, location, undef) {
    var root = location.protocol + "//" + location.host,
        apiKey = window.AIRBRAKE_API_KEY,
        env = window.AIRBRAKE_ENVIRONMENT;

    function xmlNode(nodeName, attributes, nodeValue) {
        attributes = attributes ? " " + attributes : "";
        return "<" + nodeName + attributes + ">" + nodeValue + "</" + nodeName + ">"
    }
    function escapeText(text) {
        return (text + "").replace(/[&<>'"]/g, function (match) {
            return "&#" + match.charCodeAt() + ";"
        })
    }
    function getXML(message, file, line) {
        file && (file = file.replace(root, "[PROJECT ROOT]"));
        return '<?xml version="1.0" encoding="UTF-8"?>' + xmlNode("notice", 'version="2.2"', xmlNode("api-key", undef, apiKey) + xmlNode("notifier", undef, xmlNode("name", undef, "RTR Notifier") + xmlNode("version", undef, "0.1.0") + xmlNode("url", undef, "http://renttherunway.com")) + xmlNode("error", undef, xmlNode("class", undef, "Error") + xmlNode("message", undef, escapeText(message)) + xmlNode("backtrace", undef, '<line method="" file="' + xmlUrlHelper(escapeText(file)) + '" number="' + escapeText(line) + '" />')) + xmlNode("request", undef, xmlNode("component", undef, "frontend") + xmlNode("action", undef, "javascript") + xmlNode("url", undef, xmlUrlHelper(location.href)) + xmlNode("cgi-data", undef, xmlNode("var", 'key="HTTP_USER_AGENT"', navigator.userAgent) + xmlNode("var", 'key="HTTP_REFERER"', document.referrer) + xmlNode("var", 'key="HTTP_URL"', xmlUrlHelper(window.location.href)) + xmlNode("var", 'key="RTR_USER_ID"', rtr_prop.uid))) + xmlNode("server-environment", undef, xmlNode("project-root", undef, root) + xmlNode("environment-name", undef, env)))
    }(window.Airbrake = {}).notify = function (message, file, line) {
        if (apiKey) {
            new Image().src = "http://airbrake.io/notifier_api/v2/notices?data=" + encodeURIComponent(getXML(message, file, line))
        }
    }
})(this, location);

function xmlUrlHelper(url) {
    var newUrl = url.replace(/&/g, "AMP");
    return newUrl
}(function () {
    function r(a, c, d) {
        if (a === c) {
            return 0 !== a || 1 / a == 1 / c
        }
        if (null == a || null == c) {
            return a === c
        }
        a._chain && (a = a._wrapped);
        c._chain && (c = c._wrapped);
        if (a.isEqual && b.isFunction(a.isEqual)) {
            return a.isEqual(c)
        }
        if (c.isEqual && b.isFunction(c.isEqual)) {
            return c.isEqual(a)
        }
        var e = l.call(a);
        if (e != l.call(c)) {
            return !1
        }
        switch (e) {
            case "[object String]":
                return a == "" + c;
            case "[object Number]":
                return a != +a ? c != +c : 0 == a ? 1 / a == 1 / c : a == +c;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +c;
            case "[object RegExp]":
                return a.source == c.source && a.global == c.global && a.multiline == c.multiline && a.ignoreCase == c.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof c) {
            return !1
        }
        for (var f = d.length; f--;) {
            if (d[f] == a) {
                return !0
            }
        }
        d.push(a);
        var f = 0,
            g = !0;
        if ("[object Array]" == e) {
            if (f = a.length, g = f == c.length) {
                for (; f-- && (g = f in a == f in c && r(a[f], c[f], d));) {}
            }
        } else {
            if ("constructor" in a != "constructor" in c || a.constructor != c.constructor) {
                return !1
            }
            for (var h in a) {
                if (b.has(a, h) && (f++, !(g = b.has(c, h) && r(a[h], c[h], d)))) {
                    break
                }
            }
            if (g) {
                for (h in c) {
                    if (b.has(c, h) && !f--) {
                        break
                    }
                }
                g = !f
            }
        }
        d.pop();
        return g
    }
    var s = this,
        I = s._,
        o = {},
        k = Array.prototype,
        p = Object.prototype,
        i = k.slice,
        J = k.unshift,
        l = p.toString,
        K = p.hasOwnProperty,
        y = k.forEach,
        z = k.map,
        A = k.reduce,
        B = k.reduceRight,
        C = k.filter,
        D = k.every,
        E = k.some,
        q = k.indexOf,
        F = k.lastIndexOf,
        p = Array.isArray,
        L = Object.keys,
        t = Function.prototype.bind,
        b = function (a) {
            return new m(a)
        };
    "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = b), exports._ = b) : s._ = b;
    b.VERSION = "1.3.3";
    var j = b.each = b.forEach = function (a, c, d) {
        if (a != null) {
            if (y && a.forEach === y) {
                a.forEach(c, d)
            } else {
                if (a.length === +a.length) {
                    for (var e = 0, f = a.length; e < f; e++) {
                        if (e in a && c.call(d, a[e], e, a) === o) {
                            break
                        }
                    }
                } else {
                    for (e in a) {
                        if (b.has(a, e) && c.call(d, a[e], e, a) === o) {
                            break
                        }
                    }
                }
            }
        }
    };
    b.map = b.collect = function (a, c, b) {
        var e = [];
        if (a == null) {
            return e
        }
        if (z && a.map === z) {
            return a.map(c, b)
        }
        j(a, function (a, g, h) {
            e[e.length] = c.call(b, a, g, h)
        });
        if (a.length === +a.length) {
            e.length = a.length
        }
        return e
    };
    b.reduce = b.foldl = b.inject = function (a, c, d, e) {
        var f = arguments.length > 2;
        a == null && (a = []);
        if (A && a.reduce === A) {
            e && (c = b.bind(c, e));
            return f ? a.reduce(c, d) : a.reduce(c)
        }
        j(a, function (a, b, i) {
            if (f) {
                d = c.call(e, d, a, b, i)
            } else {
                d = a;
                f = true
            }
        });
        if (!f) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        return d
    };
    b.reduceRight = b.foldr = function (a, c, d, e) {
        var f = arguments.length > 2;
        a == null && (a = []);
        if (B && a.reduceRight === B) {
            e && (c = b.bind(c, e));
            return f ? a.reduceRight(c, d) : a.reduceRight(c)
        }
        var g = b.toArray(a).reverse();
        e && !f && (c = b.bind(c, e));
        return f ? b.reduce(g, c, d, e) : b.reduce(g, c)
    };
    b.find = b.detect = function (a, c, b) {
        var e;
        G(a, function (a, g, h) {
            if (c.call(b, a, g, h)) {
                e = a;
                return true
            }
        });
        return e
    };
    b.filter = b.select = function (a, c, b) {
        var e = [];
        if (a == null) {
            return e
        }
        if (C && a.filter === C) {
            return a.filter(c, b)
        }
        j(a, function (a, g, h) {
            c.call(b, a, g, h) && (e[e.length] = a)
        });
        return e
    };
    b.reject = function (a, c, b) {
        var e = [];
        if (a == null) {
            return e
        }
        j(a, function (a, g, h) {
            c.call(b, a, g, h) || (e[e.length] = a)
        });
        return e
    };
    b.every = b.all = function (a, c, b) {
        var e = true;
        if (a == null) {
            return e
        }
        if (D && a.every === D) {
            return a.every(c, b)
        }
        j(a, function (a, g, h) {
            if (!(e = e && c.call(b, a, g, h))) {
                return o
            }
        });
        return !!e
    };
    var G = b.some = b.any = function (a, c, d) {
        c || (c = b.identity);
        var e = false;
        if (a == null) {
            return e
        }
        if (E && a.some === E) {
            return a.some(c, d)
        }
        j(a, function (a, b, h) {
            if (e || (e = c.call(d, a, b, h))) {
                return o
            }
        });
        return !!e
    };
    b.include = b.contains = function (a, c) {
        var b = false;
        if (a == null) {
            return b
        }
        if (q && a.indexOf === q) {
            return a.indexOf(c) != -1
        }
        return b = G(a, function (a) {
            return a === c
        })
    };
    b.invoke = function (a, c) {
        var d = i.call(arguments, 2);
        return b.map(a, function (a) {
            return (b.isFunction(c) ? c || a : a[c]).apply(a, d)
        })
    };
    b.pluck = function (a, c) {
        return b.map(a, function (a) {
            return a[c]
        })
    };
    b.max = function (a, c, d) {
        if (!c && b.isArray(a) && a[0] === +a[0]) {
            return Math.max.apply(Math, a)
        }
        if (!c && b.isEmpty(a)) {
            return -Infinity
        }
        var e = {
            computed: -Infinity
        };
        j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a;
            b >= e.computed && (e = {
                value: a,
                computed: b
            })
        });
        return e.value
    };
    b.min = function (a, c, d) {
        if (!c && b.isArray(a) && a[0] === +a[0]) {
            return Math.min.apply(Math, a)
        }
        if (!c && b.isEmpty(a)) {
            return Infinity
        }
        var e = {
            computed: Infinity
        };
        j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a;
            b < e.computed && (e = {
                value: a,
                computed: b
            })
        });
        return e.value
    };
    b.shuffle = function (a) {
        var b = [],
            d;
        j(a, function (a, f) {
            d = Math.floor(Math.random() * (f + 1));
            b[f] = b[d];
            b[d] = a
        });
        return b
    };
    b.sortBy = function (a, c, d) {
        var e = b.isFunction(c) ? c : function (a) {
            return a[c]
        };
        return b.pluck(b.map(a, function (a, b, c) {
            return {
                value: a,
                criteria: e.call(d, a, b, c)
            }
        }).sort(function (a, b) {
                var c = a.criteria,
                    d = b.criteria;
                return c === void 0 ? 1 : d === void 0 ? -1 : c < d ? -1 : c > d ? 1 : 0
            }), "value")
    };
    b.groupBy = function (a, c) {
        var d = {},
            e = b.isFunction(c) ? c : function (a) {
                return a[c]
            };
        j(a, function (a, b) {
            var c = e(a, b);
            (d[c] || (d[c] = [])).push(a)
        });
        return d
    };
    b.sortedIndex = function (a, c, d) {
        d || (d = b.identity);
        for (var e = 0, f = a.length; e < f;) {
            var g = e + f >> 1;
            d(a[g]) < d(c) ? e = g + 1 : f = g
        }
        return e
    };
    b.toArray = function (a) {
        return !a ? [] : b.isArray(a) || b.isArguments(a) ? i.call(a) : a.toArray && b.isFunction(a.toArray) ? a.toArray() : b.values(a)
    };
    b.size = function (a) {
        return b.isArray(a) ? a.length : b.keys(a).length
    };
    b.first = b.head = b.take = function (a, b, d) {
        return b != null && !d ? i.call(a, 0, b) : a[0]
    };
    b.initial = function (a, b, d) {
        return i.call(a, 0, a.length - (b == null || d ? 1 : b))
    };
    b.last = function (a, b, d) {
        return b != null && !d ? i.call(a, Math.max(a.length - b, 0)) : a[a.length - 1]
    };
    b.rest = b.tail = function (a, b, d) {
        return i.call(a, b == null || d ? 1 : b)
    };
    b.compact = function (a) {
        return b.filter(a, function (a) {
            return !!a
        })
    };
    b.flatten = function (a, c) {
        return b.reduce(a, function (a, e) {
            if (b.isArray(e)) {
                return a.concat(c ? e : b.flatten(e))
            }
            a[a.length] = e;
            return a
        }, [])
    };
    b.without = function (a) {
        return b.difference(a, i.call(arguments, 1))
    };
    b.uniq = b.unique = function (a, c, d) {
        var d = d ? b.map(a, d) : a,
            e = [];
        a.length < 3 && (c = true);
        b.reduce(d, function (d, g, h) {
            if (c ? b.last(d) !== g || !d.length : !b.include(d, g)) {
                d.push(g);
                e.push(a[h])
            }
            return d
        }, []);
        return e
    };
    b.union = function () {
        return b.uniq(b.flatten(arguments, true))
    };
    b.intersection = b.intersect = function (a) {
        var c = i.call(arguments, 1);
        return b.filter(b.uniq(a), function (a) {
            return b.every(c, function (c) {
                return b.indexOf(c, a) >= 0
            })
        })
    };
    b.difference = function (a) {
        var c = b.flatten(i.call(arguments, 1), true);
        return b.filter(a, function (a) {
            return !b.include(c, a)
        })
    };
    b.zip = function () {
        for (var a = i.call(arguments), c = b.max(b.pluck(a, "length")), d = Array(c), e = 0; e < c; e++) {
            d[e] = b.pluck(a, "" + e)
        }
        return d
    };
    b.indexOf = function (a, c, d) {
        if (a == null) {
            return -1
        }
        var e;
        if (d) {
            d = b.sortedIndex(a, c);
            return a[d] === c ? d : -1
        }
        if (q && a.indexOf === q) {
            return a.indexOf(c)
        }
        d = 0;
        for (e = a.length; d < e; d++) {
            if (d in a && a[d] === c) {
                return d
            }
        }
        return -1
    };
    b.lastIndexOf = function (a, b) {
        if (a == null) {
            return -1
        }
        if (F && a.lastIndexOf === F) {
            return a.lastIndexOf(b)
        }
        for (var d = a.length; d--;) {
            if (d in a && a[d] === b) {
                return d
            }
        }
        return -1
    };
    b.range = function (a, b, d) {
        if (arguments.length <= 1) {
            b = a || 0;
            a = 0
        }
        for (var d = arguments[2] || 1, e = Math.max(Math.ceil((b - a) / d), 0), f = 0, g = Array(e); f < e;) {
            g[f++] = a;
            a = a + d
        }
        return g
    };
    var H = function () {};
    b.bind = function (a, c) {
        var d, e;
        if (a.bind === t && t) {
            return t.apply(a, i.call(arguments, 1))
        }
        if (!b.isFunction(a)) {
            throw new TypeError
        }
        e = i.call(arguments, 2);
        return d = function () {
            if (!(this instanceof d)) {
                return a.apply(c, e.concat(i.call(arguments)))
            }
            H.prototype = a.prototype;
            var b = new H,
                g = a.apply(b, e.concat(i.call(arguments)));
            return Object(g) === g ? g : b
        }
    };
    b.bindAll = function (a) {
        var c = i.call(arguments, 1);
        c.length == 0 && (c = b.functions(a));
        j(c, function (c) {
            a[c] = b.bind(a[c], a)
        });
        return a
    };
    b.memoize = function (a, c) {
        var d = {};
        c || (c = b.identity);
        return function () {
            var e = c.apply(this, arguments);
            return b.has(d, e) ? d[e] : d[e] = a.apply(this, arguments)
        }
    };
    b.delay = function (a, b) {
        var d = i.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, d)
        }, b)
    };
    b.defer = function (a) {
        return b.delay.apply(b, [a, 1].concat(i.call(arguments, 1)))
    };
    b.throttle = function (a, c) {
        var d, e, f, g, h, i, j = b.debounce(function () {
            h = g = false
        }, c);
        return function () {
            d = this;
            e = arguments;
            f || (f = setTimeout(function () {
                f = null;
                h && a.apply(d, e);
                j()
            }, c));
            g ? h = true : i = a.apply(d, e);
            j();
            g = true;
            return i
        }
    };
    b.debounce = function (a, b, d) {
        var e;
        return function () {
            var f = this,
                g = arguments;
            d && !e && a.apply(f, g);
            clearTimeout(e);
            e = setTimeout(function () {
                e = null;
                d || a.apply(f, g)
            }, b)
        }
    };
    b.once = function (a) {
        var b = false,
            d;
        return function () {
            if (b) {
                return d
            }
            b = true;
            return d = a.apply(this, arguments)
        }
    };
    b.wrap = function (a, b) {
        return function () {
            var d = [a].concat(i.call(arguments, 0));
            return b.apply(this, d)
        }
    };
    b.compose = function () {
        var a = arguments;
        return function () {
            for (var b = arguments, d = a.length - 1; d >= 0; d--) {
                b = [a[d].apply(this, b)]
            }
            return b[0]
        }
    };
    b.after = function (a, b) {
        return a <= 0 ? b() : function () {
            if (--a < 1) {
                return b.apply(this, arguments)
            }
        }
    };
    b.keys = L ||
        function (a) {
            if (a !== Object(a)) {
                throw new TypeError("Invalid object")
            }
            var c = [],
                d;
            for (d in a) {
                b.has(a, d) && (c[c.length] = d)
            }
            return c
        };
    b.values = function (a) {
        return b.map(a, b.identity)
    };
    b.functions = b.methods = function (a) {
        var c = [],
            d;
        for (d in a) {
            b.isFunction(a[d]) && c.push(d)
        }
        return c.sort()
    };
    b.extend = function (a) {
        j(i.call(arguments, 1), function (b) {
            for (var d in b) {
                a[d] = b[d]
            }
        });
        return a
    };
    b.pick = function (a) {
        var c = {};
        j(b.flatten(i.call(arguments, 1)), function (b) {
            b in a && (c[b] = a[b])
        });
        return c
    };
    b.defaults = function (a) {
        j(i.call(arguments, 1), function (b) {
            for (var d in b) {
                a[d] == null && (a[d] = b[d])
            }
        });
        return a
    };
    b.clone = function (a) {
        return !b.isObject(a) ? a : b.isArray(a) ? a.slice() : b.extend({}, a)
    };
    b.tap = function (a, b) {
        b(a);
        return a
    };
    b.isEqual = function (a, b) {
        return r(a, b, [])
    };
    b.isEmpty = function (a) {
        if (a == null) {
            return true
        }
        if (b.isArray(a) || b.isString(a)) {
            return a.length === 0
        }
        for (var c in a) {
            if (b.has(a, c)) {
                return false
            }
        }
        return true
    };
    b.isElement = function (a) {
        return !!(a && a.nodeType == 1)
    };
    b.isArray = p ||
        function (a) {
            return l.call(a) == "[object Array]"
        };
    b.isObject = function (a) {
        return a === Object(a)
    };
    b.isArguments = function (a) {
        return l.call(a) == "[object Arguments]"
    };
    b.isArguments(arguments) || (b.isArguments = function (a) {
        return !(!a || !b.has(a, "callee"))
    });
    b.isFunction = function (a) {
        return l.call(a) == "[object Function]"
    };
    b.isString = function (a) {
        return l.call(a) == "[object String]"
    };
    b.isNumber = function (a) {
        return l.call(a) == "[object Number]"
    };
    b.isFinite = function (a) {
        return b.isNumber(a) && isFinite(a)
    };
    b.isNaN = function (a) {
        return a !== a
    };
    b.isBoolean = function (a) {
        return a === true || a === false || l.call(a) == "[object Boolean]"
    };
    b.isDate = function (a) {
        return l.call(a) == "[object Date]"
    };
    b.isRegExp = function (a) {
        return l.call(a) == "[object RegExp]"
    };
    b.isNull = function (a) {
        return a === null
    };
    b.isUndefined = function (a) {
        return a === void 0
    };
    b.has = function (a, b) {
        return K.call(a, b)
    };
    b.noConflict = function () {
        s._ = I;
        return this
    };
    b.identity = function (a) {
        return a
    };
    b.times = function (a, b, d) {
        for (var e = 0; e < a; e++) {
            b.call(d, e)
        }
    };
    b.escape = function (a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    b.result = function (a, c) {
        if (a == null) {
            return null
        }
        var d = a[c];
        return b.isFunction(d) ? d.call(a) : d
    };
    b.mixin = function (a) {
        j(b.functions(a), function (c) {
            M(c, b[c] = a[c])
        })
    };
    var N = 0;
    b.uniqueId = function (a) {
        var b = N++;
        return a ? a + b : b
    };
    b.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var u = /.^/,
        n = {
            "\\": "\\",
            "'": "'",
            r: "\r",
            n: "\n",
            t: "\t",
            u2028: "\u2028",
            u2029: "\u2029"
        },
        v;
    for (v in n) {
        n[n[v]] = v
    }
    var O = /\\|'|\r|\n|\t|\u2028|\u2029/g,
        P = /\\(\\|'|r|n|t|u2028|u2029)/g,
        w = function (a) {
            return a.replace(P, function (a, b) {
                return n[b]
            })
        };
    b.template = function (a, c, d) {
        d = b.defaults(d || {}, b.templateSettings);
        a = "__p+='" + ''.replace(O, function (a) {
            return "\\" + n[a]
        }).replace(d.escape || u, function (a, b) {
                return "'+\n_.escape(" + w(b) + ")+\n'"
            }).replace(d.interpolate || u, function (a, b) {
                return "'+\n(" + w(b) + ")+\n'"
            }).replace(d.evaluate || u, function (a, b) {
                return "';\n" + w(b) + "\n;__p+='"
            }) + "';\n";
        d.variable || (a = "with(obj||{}){\n" + a + "}\n");
        var a = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + a + "return __p;\n",
            e = new Function(d.variable || "obj", "_", a);
        if (c) {
            return e(c, b)
        }
        c = function (a) {
            return e.call(this, a, b)
        };
        c.source = "function(" + (d.variable || "obj") + "){\n" + a + "}";
        return c
    };
    b.chain = function (a) {
        return b(a).chain()
    };
    var m = function (a) {
        this._wrapped = a
    };
    b.prototype = m.prototype;
    var x = function (a, c) {
            return c ? b(a).chain() : a
        },
        M = function (a, c) {
            m.prototype[a] = function () {
                var a = i.call(arguments);
                J.call(a, this._wrapped);
                return x(c.apply(b, a), this._chain)
            }
        };
    b.mixin(b);
    j("pop,push,reverse,shift,sort,splice,unshift".split(","), function (a) {
        var b = k[a];
        m.prototype[a] = function () {
            var d = this._wrapped;
            b.apply(d, arguments);
            var e = d.length;
            (a == "shift" || a == "splice") && e === 0 && delete d[0];
            return x(d, this._chain)
        }
    });
    j(["concat", "join", "slice"], function (a) {
        var b = k[a];
        m.prototype[a] = function () {
            return x(b.apply(this._wrapped, arguments), this._chain)
        }
    });
    m.prototype.chain = function () {
        this._chain = true;
        return this
    };
    m.prototype.value = function () {
        return this._wrapped
    }
}).call(this);
(function (c) {
    c.extend(c.fn, {
        validate: function (a) {
            if (this.length) {
                var b = c.data(this[0], "validator");
                if (b) {
                    return b
                }
                b = new c.validator(a, this[0]);
                c.data(this[0], "validator", b);
                if (b.settings.onsubmit) {
                    this.find("input, button").filter(".cancel").click(function () {
                        b.cancelSubmit = true
                    });
                    b.settings.submitHandler && this.find("input, button").filter(":submit").click(function () {
                        b.submitButton = this
                    });
                    this.submit(function (d) {
                        function e() {
                            if (b.settings.submitHandler) {
                                if (b.submitButton) {
                                    var f = c("<input type='hidden'/>").attr("name", b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm)
                                }
                                b.settings.submitHandler.call(b, b.currentForm);
                                b.submitButton && f.remove();
                                return false
                            }
                            return true
                        }
                        b.settings.debug && d.preventDefault();
                        if (b.cancelSubmit) {
                            b.cancelSubmit = false;
                            return e()
                        }
                        if (b.form()) {
                            if (b.pendingRequest) {
                                b.formSubmitted = true;
                                return false
                            }
                            return e()
                        } else {
                            b.focusInvalid();
                            return false
                        }
                    })
                }
                return b
            } else {
                a && a.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
            }
        },
        valid: function () {
            if (c(this[0]).is("form")) {
                return this.validate().form()
            } else {
                var a = true,
                    b = c(this[0].form).validate();
                this.each(function () {
                    a &= b.element(this)
                });
                return a
            }
        },
        removeAttrs: function (a) {
            var b = {},
                d = this;
            c.each(a.split(/\s/), function (e, f) {
                b[f] = d.attr(f);
                d.removeAttr(f)
            });
            return b
        },
        rules: function (a, b) {
            var d = this[0];
            if (a) {
                var e = c.data(d.form, "validator").settings,
                    f = e.rules,
                    g = c.validator.staticRules(d);
                switch (a) {
                    case "add":
                        c.extend(g, c.validator.normalizeRule(b));
                        f[d.name] = g;
                        if (b.messages) {
                            e.messages[d.name] = c.extend(e.messages[d.name], b.messages)
                        }
                        break;
                    case "remove":
                        if (!b) {
                            delete f[d.name];
                            return g
                        }
                        var h = {};
                        c.each(b.split(/\s/), function (j, i) {
                            h[i] = g[i];
                            delete g[i]
                        });
                        return h
                }
            }
            d = c.validator.normalizeRules(c.extend({}, c.validator.metadataRules(d), c.validator.classRules(d), c.validator.attributeRules(d), c.validator.staticRules(d)), d);
            if (d.required) {
                e = d.required;
                delete d.required;
                d = c.extend({
                    required: e
                }, d)
            }
            return d
        }
    });
    c.extend(c.expr[":"], {
        blank: function (a) {
            return !c.trim("" + a.value)
        },
        filled: function (a) {
            return !!c.trim("" + a.value)
        },
        unchecked: function (a) {
            return !a.checked
        }
    });
    c.validator = function (a, b) {
        this.settings = c.extend(true, {}, c.validator.defaults, a);
        this.currentForm = b;
        this.init()
    };
    c.validator.format = function (a, b) {
        if (arguments.length == 1) {
            return function () {
                var d = c.makeArray(arguments);
                d.unshift(a);
                return c.validator.format.apply(this, d)
            }
        }
        if (arguments.length > 2 && b.constructor != Array) {
            b = c.makeArray(arguments).slice(1)
        }
        if (b.constructor != Array) {
            b = [b]
        }
        c.each(b, function (d, e) {
            a = a.replace(RegExp("\\{" + d + "\\}", "g"), e)
        });
        return a
    };
    c.extend(c.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: c([]),
            errorLabelContainer: c([]),
            onsubmit: true,
            ignore: [],
            ignoreTitle: false,
            onfocusin: function (a) {
                this.lastActive = a;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass);
                    this.addWrapper(this.errorsFor(a)).hide()
                }
            },
            onfocusout: function (a) {
                if (!this.checkable(a) && (a.name in this.submitted || !this.optional(a))) {
                    this.element(a)
                }
            },
            onkeyup: function (a) {
                if (a.name in this.submitted || a == this.lastElement) {
                    this.element(a)
                }
            },
            onclick: function (a) {
                if (a.name in this.submitted) {
                    this.element(a)
                } else {
                    a.parentNode.name in this.submitted && this.element(a.parentNode)
                }
            },
            highlight: function (a, b, d) {
                c(a).addClass(b).removeClass(d)
            },
            unhighlight: function (a, b, d) {
                c(a).removeClass(b).addClass(d)
            }
        },
        setDefaults: function (a) {
            c.extend(c.validator.defaults, a)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: c.validator.format("Please enter no more than {0} characters."),
            minlength: c.validator.format("Please enter at least {0} characters."),
            rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."),
            range: c.validator.format("Please enter a value between {0} and {1}."),
            max: c.validator.format("Please enter a value less than or equal to {0}."),
            min: c.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function () {
                function a(e) {
                    var f = c.data(this[0].form, "validator");
                    e = "on" + e.type.replace(/^validate/, "");
                    f.settings[e] && f.settings[e].call(f, this[0])
                }
                this.labelContainer = c(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || c(this.currentForm);
                this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = this.groups = {};
                c.each(this.settings.groups, function (e, f) {
                    c.each(f.split(/\s/), function (g, h) {
                        b[h] = e
                    })
                });
                var d = this.settings.rules;
                c.each(d, function (e, f) {
                    d[e] = c.validator.normalizeRule(f)
                });
                c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", a).validateDelegate(":radio, :checkbox, select, option", "click", a);
                this.settings.invalidHandler && c(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function () {
                this.checkForm();
                c.extend(this.submitted, this.errorMap);
                this.invalid = c.extend({}, this.errorMap);
                this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) {
                    this.check(b[a])
                }
                return this.valid()
            },
            element: function (a) {
                this.lastElement = a = this.clean(a);
                this.prepareElement(a);
                this.currentElements = c(a);
                var b = this.check(a);
                if (b) {
                    delete this.invalid[a.name]
                } else {
                    this.invalid[a.name] = true
                }
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers)
                }
                this.showErrors();
                return b
            },
            showErrors: function (a) {
                if (a) {
                    c.extend(this.errorMap, a);
                    this.errorList = [];
                    for (var b in a) {
                        this.errorList.push({
                            message: a[b],
                            element: this.findByName(b)[0]
                        })
                    }
                    this.successList = c.grep(this.successList, function (d) {
                        return !(d.name in a)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                c.fn.resetForm && c(this.currentForm).resetForm();
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (a) {
                var b = 0,
                    d;
                for (d in a) {
                    b++
                }
                return b
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide()
            },
            valid: function () {
                return this.size() == 0
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        c(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (a) {}
                }
            },
            findLastActive: function () {
                var a = this.lastActive;
                return a && c.grep(this.errorList, function (b) {
                    return b.element.name == a.name
                }).length == 1 && a
            },
            elements: function () {
                var a = this,
                    b = {};
                return c([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    !this.name && a.settings.debug && window.console && console.error("%o has no name assigned", this);
                    if (this.name in b || !a.objectLength(c(this).rules())) {
                        return false
                    }
                    return b[this.name] = true
                })
            },
            clean: function (a) {
                return c(a)[0]
            },
            errors: function () {
                return c(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
            },
            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = c([]);
                this.toHide = c([]);
                this.currentElements = c([])
            },
            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (a) {
                this.reset();
                this.toHide = this.errorsFor(a)
            },
            check: function (a) {
                a = this.clean(a);
                if (this.checkable(a)) {
                    a = this.findByName(a.name).not(this.settings.ignore)[0]
                }
                var b = c(a).rules(),
                    d = false,
                    e;
                for (e in b) {
                    var f = {
                        method: e,
                        parameters: b[e]
                    };
                    try {
                        var g = c.validator.methods[e].call(this, a.value.replace(/\r/g, ""), a, f.parameters);
                        if (g == "dependency-mismatch") {
                            d = true
                        } else {
                            d = false;
                            if (g == "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(a));
                                return
                            }
                            if (!g) {
                                this.formatAndAdd(a, f);
                                return false
                            }
                        }
                    } catch (h) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " + a.id + ", check the '" + f.method + "' method", h);
                        throw h
                    }
                }
                if (!d) {
                    this.objectLength(b) && this.successList.push(a);
                    return true
                }
            },
            customMetaMessage: function (a, b) {
                if (c.metadata) {
                    var d = this.settings.meta ? c(a).metadata()[this.settings.meta] : c(a).metadata();
                    return d && d.messages && d.messages[b]
                }
            },
            customMessage: function (a, b) {
                var d = this.settings.messages[a];
                return d && (d.constructor == String ? d : d[b])
            },
            findDefined: function () {
                for (var a = 0; a < arguments.length; a++) {
                    if (arguments[a] !== undefined) {
                        return arguments[a]
                    }
                }
            },
            defaultMessage: function (a, b) {
                return this.findDefined(this.customMessage(a.name, b), this.customMetaMessage(a, b), !this.settings.ignoreTitle && a.title || undefined, c.validator.messages[b], "<strong>Warning: No message defined for " + a.name + "</strong>")
            },
            formatAndAdd: function (a, b) {
                var d = this.defaultMessage(a, b.method),
                    e = /\$?\{(\d+)\}/g;
                if (typeof d == "function") {
                    d = d.call(this, b.parameters, a)
                } else {
                    if (e.test(d)) {
                        d = jQuery.format(d.replace(e, "{$1}"), b.parameters)
                    }
                }
                this.errorList.push({
                    message: d,
                    element: a
                });
                this.errorMap[a.name] = d;
                this.submitted[a.name] = d
            },
            addWrapper: function (a) {
                if (this.settings.wrapper) {
                    a = a.add(a.parent(this.settings.wrapper))
                }
                return a
            },
            defaultShowErrors: function () {
                for (var a = 0; this.errorList[a]; a++) {
                    var b = this.errorList[a];
                    this.settings.highlight && this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (a = 0; this.successList[a]; a++) {
                        this.showLabel(this.successList[a])
                    }
                }
                if (this.settings.unhighlight) {
                    a = 0;
                    for (b = this.validElements(); b[a]; a++) {
                        this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return c(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (a, b) {
                var d = this.errorsFor(a);
                if (d.length) {
                    d.removeClass().addClass(this.settings.errorClass);
                    d.attr("generated") && d.html(b)
                } else {
                    d = c("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(a),
                        generated: true
                    }).addClass(this.settings.errorClass).html(b || "");
                    if (this.settings.wrapper) {
                        d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                    }
                    this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a))
                }
                if (!b && this.settings.success) {
                    d.text("");
                    typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d)
                }
                this.toShow = this.toShow.add(d)
            },
            errorsFor: function (a) {
                var b = this.idOrName(a);
                return this.errors().filter(function () {
                    return c(this).attr("for") == b
                })
            },
            idOrName: function (a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            checkable: function (a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function (a) {
                var b = this.currentForm;
                return c(document.getElementsByName(a)).map(function (d, e) {
                    return e.form == b && e.name == a && e || null
                })
            },
            getLength: function (a, b) {
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return c("option:selected", b).length;
                    case "input":
                        if (this.checkable(b)) {
                            return this.findByName(b.name).filter(":checked").length
                        }
                }
                return a.length
            },
            depend: function (a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : true
            },
            dependTypes: {
                "boolean": function (a) {
                    return a
                },
                string: function (a, b) {
                    return !!c(a, b.form).length
                },
                "function": function (a, b) {
                    return a(b)
                }
            },
            optional: function (a) {
                return !c.validator.methods.required.call(this, c.trim(a.value), a) && "dependency-mismatch"
            },
            startRequest: function (a) {
                if (!this.pending[a.name]) {
                    this.pendingRequest++;
                    this.pending[a.name] = true
                }
            },
            stopRequest: function (a, b) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[a.name];
                if (b && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                    c(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!b && this.pendingRequest == 0 && this.formSubmitted) {
                        c(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            },
            previousValue: function (a) {
                return c.data(a, "previousValue") || c.data(a, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(a, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            dateDE: {
                dateDE: true
            },
            number: {
                number: true
            },
            numberDE: {
                numberDE: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function (a, b) {
            a.constructor == String ? this.classRuleSettings[a] = b : c.extend(this.classRuleSettings, a)
        },
        classRules: function (a) {
            var b = {};
            (a = c(a).attr("class")) && c.each(a.split(" "), function () {
                this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this])
            });
            return b
        },
        attributeRules: function (a) {
            var b = {};
            a = c(a);
            for (var d in c.validator.methods) {
                var e = a.attr(d);
                if (e) {
                    b[d] = e
                }
            }
            b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength;
            return b
        },
        metadataRules: function (a) {
            if (!c.metadata) {
                return {}
            }
            var b = c.data(a.form, "validator").settings.meta;
            return b ? c(a).metadata()[b] : c(a).metadata()
        },
        staticRules: function (a) {
            var b = {},
                d = c.data(a.form, "validator");
            if (d.settings.rules) {
                b = c.validator.normalizeRule(d.settings.rules[a.name]) || {}
            }
            return b
        },
        normalizeRules: function (a, b) {
            c.each(a, function (d, e) {
                if (e === false) {
                    delete a[d]
                } else {
                    if (e.param || e.depends) {
                        var f = true;
                        switch (typeof e.depends) {
                            case "string":
                                f = !! c(e.depends, b.form).length;
                                break;
                            case "function":
                                f = e.depends.call(b, b)
                        }
                        if (f) {
                            a[d] = e.param !== undefined ? e.param : true
                        } else {
                            delete a[d]
                        }
                    }
                }
            });
            c.each(a, function (d, e) {
                a[d] = c.isFunction(e) ? e(b) : e
            });
            c.each(["minlength", "maxlength", "min", "max"], function () {
                if (a[this]) {
                    a[this] = Number(a[this])
                }
            });
            c.each(["rangelength", "range"], function () {
                if (a[this]) {
                    a[this] = [Number(a[this][0]), Number(a[this][1])]
                }
            });
            if (c.validator.autoCreateRanges) {
                if (a.min && a.max) {
                    a.range = [a.min, a.max];
                    delete a.min;
                    delete a.max
                }
                if (a.minlength && a.maxlength) {
                    a.rangelength = [a.minlength, a.maxlength];
                    delete a.minlength;
                    delete a.maxlength
                }
            }
            a.messages && delete a.messages;
            return a
        },
        normalizeRule: function (a) {
            if (typeof a == "string") {
                var b = {};
                c.each(a.split(/\s/), function () {
                    b[this] = true
                });
                a = b
            }
            return a
        },
        addMethod: function (a, b, d) {
            c.validator.methods[a] = b;
            c.validator.messages[a] = d != undefined ? d : c.validator.messages[a];
            b.length < 3 && c.validator.addClassRules(a, c.validator.normalizeRule(a))
        },
        methods: {
            required: function (a, b, d) {
                if (!this.depend(d, b)) {
                    return "dependency-mismatch"
                }
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return (a = c(b).val()) && a.length > 0;
                    case "input":
                        if (this.checkable(b)) {
                            return this.getLength(a, b) > 0
                        }
                    default:
                        return c.trim(a).length > 0
                }
            },
            remote: function (a, b, d) {
                if (this.optional(b)) {
                    return "dependency-mismatch"
                }
                var e = this.previousValue(b);
                this.settings.messages[b.name] || (this.settings.messages[b.name] = {});
                e.originalMessage = this.settings.messages[b.name].remote;
                this.settings.messages[b.name].remote = e.message;
                d = typeof d == "string" && {
                    url: d
                } || d;
                if (this.pending[b.name]) {
                    return "pending"
                }
                if (e.old === a) {
                    return e.valid
                }
                e.old = a;
                var f = this;
                this.startRequest(b);
                var g = {};
                g[b.name] = a;
                c.ajax(c.extend(true, {
                    url: d,
                    mode: "abort",
                    port: "validate" + b.name,
                    dataType: "json",
                    data: g,
                    success: function (h) {
                        f.settings.messages[b.name].remote = e.originalMessage;
                        var j = h === true;
                        if (j) {
                            var i = f.formSubmitted;
                            f.prepareElement(b);
                            f.formSubmitted = i;
                            f.successList.push(b);
                            f.showErrors()
                        } else {
                            i = {};
                            h = h || f.defaultMessage(b, "remote");
                            i[b.name] = e.message = c.isFunction(h) ? h(a) : h;
                            f.showErrors(i)
                        }
                        e.valid = j;
                        f.stopRequest(b, j)
                    }
                }, d));
                return "pending"
            },
            minlength: function (a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) >= d
            },
            maxlength: function (a, b, d) {
                return this.optional(b) || this.getLength(c.trim(a), b) <= d
            },
            rangelength: function (a, b, d) {
                a = this.getLength(c.trim(a), b);
                return this.optional(b) || a >= d[0] && a <= d[1]
            },
            min: function (a, b, d) {
                return this.optional(b) || a >= d
            },
            max: function (a, b, d) {
                return this.optional(b) || a <= d
            },
            range: function (a, b, d) {
                return this.optional(b) || a >= d[0] && a <= d[1]
            },
            email: function (a, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)
            },
            url: function (a, b) {
                return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function (a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a))
            },
            dateISO: function (a, b) {
                return this.optional(b) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)
            },
            number: function (a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)
            },
            digits: function (a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function (a, b) {
                if (this.optional(b)) {
                    return "dependency-mismatch"
                }
                if (/[^0-9-]+/.test(a)) {
                    return false
                }
                var d = 0,
                    e = 0,
                    f = false;
                a = a.replace(/\D/g, "");
                for (var g = a.length - 1; g >= 0; g--) {
                    e = a.charAt(g);
                    e = parseInt(e, 10);
                    if (f) {
                        if ((e *= 2) > 9) {
                            e -= 9
                        }
                    }
                    d += e;
                    f = !f
                }
                return d % 10 == 0
            },
            accept: function (a, b, d) {
                d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(b) || a.match(RegExp(".(" + d + ")$", "i"))
            },
            equalTo: function (a, b, d) {
                d = c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    c(b).valid()
                });
                return a == d.val()
            }
        }
    });
    c.format = c.validator.format
})(jQuery);
(function (c) {
    var a = {};
    if (c.ajaxPrefilter) {
        c.ajaxPrefilter(function (d, e, f) {
            e = d.port;
            if (d.mode == "abort") {
                a[e] && a[e].abort();
                a[e] = f
            }
        })
    } else {
        var b = c.ajax;
        c.ajax = function (d) {
            var e = ("port" in d ? d : c.ajaxSettings).port;
            if (("mode" in d ? d : c.ajaxSettings).mode == "abort") {
                a[e] && a[e].abort();
                return a[e] = b.apply(this, arguments)
            }
            return b.apply(this, arguments)
        }
    }
})(jQuery);
(function (c) {
    !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && c.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        function d(e) {
            e = c.event.fix(e);
            e.type = b;
            return c.event.handle.call(this, e)
        }
        c.event.special[b] = {
            setup: function () {
                this.addEventListener(a, d, true)
            },
            teardown: function () {
                this.removeEventListener(a, d, true)
            },
            handler: function (e) {
                arguments[0] = c.event.fix(e);
                arguments[0].type = b;
                return c.event.handle.apply(this, arguments)
            }
        }
    });
    c.extend(c.fn, {
        validateDelegate: function (a, b, d) {
            return this.bind(b, function (e) {
                var f = c(e.target);
                if (f.is(a)) {
                    return d.apply(f, arguments)
                }
            })
        }
    })
})(jQuery);
(function ($, undefined) {
    var tag2attr = {
            a: "href",
            img: "src",
            form: "action",
            base: "href",
            script: "src",
            iframe: "src",
            link: "href"
        },
        key = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
        aliases = {
            anchor: "fragment"
        },
        parser = {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        },
        querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g,
        fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;

    function parseUri(url, strictMode) {
        var str = decodeURI(url),
            res = parser[strictMode || false ? "strict" : "loose"].exec(str),
            uri = {
                attr: {},
                param: {},
                seg: {}
            },
            i = 14;
        while (i--) {
            uri.attr[key[i]] = res[i] || ""
        }
        uri.param.query = {};
        uri.param.fragment = {};
        uri.attr.query.replace(querystring_parser, function ($0, $1, $2) {
            if ($1) {
                uri.param.query[$1] = $2
            }
        });
        uri.attr.fragment.replace(fragment_parser, function ($0, $1, $2) {
            if ($1) {
                uri.param.fragment[$1] = $2
            }
        });
        uri.seg.path = uri.attr.path.replace(/^\/+|\/+$/g, "").split("/");
        uri.seg.fragment = uri.attr.fragment.replace(/^\/+|\/+$/g, "").split("/");
        uri.attr.base = uri.attr.host ? uri.attr.protocol + "://" + uri.attr.host + (uri.attr.port ? ":" + uri.attr.port : "") : "";
        return uri
    }
    function getAttrName(elm) {
        var tn = elm.tagName;
        if (tn !== undefined) {
            return tag2attr[tn.toLowerCase()]
        }
        return tn
    }
    $.fn.url = function (strictMode) {
        var url = "";
        if (this.length) {
            url = $(this).attr(getAttrName(this[0])) || ""
        }
        return $.url(url, strictMode)
    };
    $.url = function (url, strictMode) {
        if (arguments.length === 1 && url === true) {
            strictMode = true;
            url = undefined
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();
        return {
            data: parseUri(url, strictMode),
            attr: function (attr) {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr
            },
            param: function (param) {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query
            },
            fparam: function (param) {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment
            },
            segment: function (seg) {
                if (seg === undefined) {
                    return this.data.seg.path
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1;
                    return this.data.seg.path[seg]
                }
            },
            fsegment: function (seg) {
                if (seg === undefined) {
                    return this.data.seg.fragment
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1;
                    return this.data.seg.fragment[seg]
                }
            }
        }
    }
})(jQuery);
/*!
 * jQuery Form Plugin
 * version: 3.14 (30-JUL-2012)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 */
(function ($) {
    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;
    $.fn.ajaxSubmit = function (options) {
        if (!this.length) {
            log("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var method, action, url, $form = this;
        if (typeof options == "function") {
            options = {
                success: options
            }
        }
        method = this.attr("method");
        action = this.attr("action");
        url = (typeof action === "string") ? $.trim(action) : "";
        url = url || window.location.href || "";
        if (url) {
            url = (url.match(/^([^#]+)/) || [])[1]
        }
        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, options);
        var veto = {};
        this.trigger("form-pre-serialize", [this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional
        }
        var elements = [];
        var qx, a = this.formToArray(options.semantic, elements);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional)
        }
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [a, this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var q = $.param(a, traditional);
        if (qx) {
            q = (q ? (q + "&" + qx) : qx)
        }
        if (options.type.toUpperCase() == "GET") {
            options.url += (options.url.indexOf("?") >= 0 ? "&" : "?") + q;
            options.data = null
        } else {
            options.data = q
        }
        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function () {
                $form.resetForm()
            })
        }
        if (options.clearForm) {
            callbacks.push(function () {
                $form.clearForm(options.includeHidden)
            })
        }
        if (!options.dataType && options.target) {
            var oldSuccess = options.success ||
                function () {};
            callbacks.push(function (data) {
                var fn = options.replaceTarget ? "replaceWith" : "html";
                $(options.target)[fn](data).each(oldSuccess, arguments)
            })
        } else {
            if (options.success) {
                callbacks.push(options.success)
            }
        }
        options.success = function (data, status, xhr) {
            var context = options.context || this;
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form])
            }
        };
        var fileInputs = $("input:file:enabled[value]", this);
        var hasFileInputs = fileInputs.length > 0;
        var mp = "multipart/form-data";
        var multipart = ($form.attr("enctype") == mp || $form.attr("encoding") == mp);
        var fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function () {
                    fileUploadIframe(a)
                })
            } else {
                fileUploadIframe(a)
            }
        } else {
            if ((hasFileInputs || multipart) && fileAPI) {
                fileUploadXhr(a)
            } else {
                $.ajax(options)
            }
        }
        for (var k = 0; k < elements.length; k++) {
            elements[k] = null
        }
        this.trigger("form-submit-notify", [this, options]);
        return this;

        function fileUploadXhr(a) {
            var formdata = new FormData();
            for (var i = 0; i < a.length; i++) {
                formdata.append(a[i].name, a[i].value)
            }
            if (options.extraData) {
                for (var p in options.extraData) {
                    if (options.extraData.hasOwnProperty(p)) {
                        formdata.append(p, options.extraData[p])
                    }
                }
            }
            options.data = null;
            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: "POST"
            });
            if (options.uploadProgress) {
                s.xhr = function () {
                    var xhr = jQuery.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.onprogress = function (event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100)
                            }
                            options.uploadProgress(event, position, total, percent)
                        }
                    }
                    return xhr
                }
            }
            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function (xhr, o) {
                o.data = formdata;
                if (beforeSend) {
                    beforeSend.call(this, xhr, o)
                }
            };
            $.ajax(s)
        }
        function fileUploadIframe(a) {
            var form = $form[0],
                el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var useProp = !! $.fn.prop;
            if ($(":input[name=submit],:input[id=submit]", form).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return
            }
            if (a) {
                for (i = 0; i < elements.length; i++) {
                    el = $(elements[i]);
                    if (useProp) {
                        el.prop("disabled", false)
                    } else {
                        el.removeAttr("disabled")
                    }
                }
            }
            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = "jqFormIO" + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr("name");
                if (!n) {
                    $io.attr("name", id)
                } else {
                    id = n
                }
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })
            }
            io = $io[0];
            xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function () {},
                getResponseHeader: function () {},
                setRequestHeader: function () {},
                abort: function (status) {
                    var e = (status === "timeout" ? "timeout" : "aborted");
                    log("aborting upload... " + e);
                    this.aborted = 1;
                    if (io.contentWindow.document.execCommand) {
                        try {
                            io.contentWindow.document.execCommand("Stop")
                        } catch (ignore) {}
                    }
                    $io.attr("src", s.iframeSrc);
                    xhr.error = e;
                    if (s.error) {
                        s.error.call(s.context, xhr, e, status)
                    }
                    if (g) {
                        $.event.trigger("ajaxError", [xhr, s, e])
                    }
                    if (s.complete) {
                        s.complete.call(s.context, xhr, e)
                    }
                }
            };
            g = s.global;
            if (g && 0 === $.active++) {
                $.event.trigger("ajaxStart")
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s])
            }
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--
                }
                return
            }
            if (xhr.aborted) {
                return
            }
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + ".x"] = form.clk_x;
                        s.extraData[n + ".y"] = form.clk_y
                    }
                }
            }
            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
                return doc
            }
            var csrf_token = $("meta[name=csrf-token]").attr("content");
            var csrf_param = $("meta[name=csrf-param]").attr("content");
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token
            }
            function doSubmit() {
                var t = $form.attr("target"),
                    a = $form.attr("action");
                form.setAttribute("target", id);
                if (!method) {
                    form.setAttribute("method", "POST")
                }
                if (a != s.url) {
                    form.setAttribute("action", s.url)
                }
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    })
                }
                if (s.timeout) {
                    timeoutHandle = setTimeout(function () {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT)
                    }, s.timeout)
                }
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log("state = " + state);
                        if (state && state.toLowerCase() == "uninitialized") {
                            setTimeout(checkState, 50)
                        }
                    } catch (e) {
                        log("Server abort: ", e, " (", e.name, ")");
                        cb(SERVER_ABORT);
                        if (timeoutHandle) {
                            clearTimeout(timeoutHandle)
                        }
                        timeoutHandle = undefined
                    }
                }
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            if (s.extraData.hasOwnProperty(n)) {
                                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty("name") && s.extraData[n].hasOwnProperty("value")) {
                                    extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name + '">').attr("value", s.extraData[n].value).appendTo(form)[0])
                                } else {
                                    extraInputs.push($('<input type="hidden" name="' + n + '">').attr("value", s.extraData[n]).appendTo(form)[0])
                                }
                            }
                        }
                    }
                    if (!s.iframeTarget) {
                        $io.appendTo("body");
                        if (io.attachEvent) {
                            io.attachEvent("onload", cb)
                        } else {
                            io.addEventListener("load", cb, false)
                        }
                    }
                    setTimeout(checkState, 15);
                    form.submit()
                } finally {
                    form.setAttribute("action", a);
                    if (t) {
                        form.setAttribute("target", t)
                    } else {
                        $form.removeAttr("target")
                    }
                    $(extraInputs).remove()
                }
            }
            if (s.forceSync) {
                doSubmit()
            } else {
                setTimeout(doSubmit, 10)
            }
            var data, doc, domCheckCount = 50,
                callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return
                }
                try {
                    doc = getDoc(io)
                } catch (ex) {
                    log("cannot access response document: ", ex);
                    e = SERVER_ABORT
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort("timeout");
                    return
                } else {
                    if (e == SERVER_ABORT && xhr) {
                        xhr.abort("server abort");
                        return
                    }
                }
                if (!doc || doc.location.href == s.iframeSrc) {
                    if (!timedOut) {
                        return
                    }
                }
                if (io.detachEvent) {
                    io.detachEvent("onload", cb)
                } else {
                    io.removeEventListener("load", cb, false)
                }
                var status = "success",
                    errMsg;
                try {
                    if (timedOut) {
                        throw "timeout"
                    }
                    var isXml = s.dataType == "xml" || doc.XMLDocument || $.isXMLDoc(doc);
                    log("isXml=" + isXml);
                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                        if (--domCheckCount) {
                            log("requeing onLoad callback, DOM not available");
                            setTimeout(cb, 250);
                            return
                        }
                    }
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml) {
                        s.dataType = "xml"
                    }
                    xhr.getResponseHeader = function (header) {
                        var headers = {
                            "content-type": s.dataType
                        };
                        return headers[header]
                    };
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute("status")) || xhr.status;
                        xhr.statusText = docRoot.getAttribute("statusText") || xhr.statusText
                    }
                    var dt = (s.dataType || "").toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        var ta = doc.getElementsByTagName("textarea")[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            xhr.status = Number(ta.getAttribute("status")) || xhr.status;
                            xhr.statusText = ta.getAttribute("statusText") || xhr.statusText
                        } else {
                            if (scr) {
                                var pre = doc.getElementsByTagName("pre")[0];
                                var b = doc.getElementsByTagName("body")[0];
                                if (pre) {
                                    xhr.responseText = pre.textContent ? pre.textContent : pre.innerText
                                } else {
                                    if (b) {
                                        xhr.responseText = b.textContent ? b.textContent : b.innerText
                                    }
                                }
                            }
                        }
                    } else {
                        if (dt == "xml" && !xhr.responseXML && xhr.responseText) {
                            xhr.responseXML = toXml(xhr.responseText)
                        }
                    }
                    try {
                        data = httpData(xhr, dt, s)
                    } catch (e) {
                        status = "parsererror";
                        xhr.error = errMsg = (e || status)
                    }
                } catch (e) {
                    log("error caught: ", e);
                    status = "error";
                    xhr.error = errMsg = (e || status)
                }
                if (xhr.aborted) {
                    log("upload aborted");
                    status = null
                }
                if (xhr.status) {
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? "success" : "error"
                }
                if (status === "success") {
                    if (s.success) {
                        s.success.call(s.context, data, "success", xhr)
                    }
                    if (g) {
                        $.event.trigger("ajaxSuccess", [xhr, s])
                    }
                } else {
                    if (status) {
                        if (errMsg === undefined) {
                            errMsg = xhr.statusText
                        }
                        if (s.error) {
                            s.error.call(s.context, xhr, status, errMsg)
                        }
                        if (g) {
                            $.event.trigger("ajaxError", [xhr, s, errMsg])
                        }
                    }
                }
                if (g) {
                    $.event.trigger("ajaxComplete", [xhr, s])
                }
                if (g && !--$.active) {
                    $.event.trigger("ajaxStop")
                }
                if (s.complete) {
                    s.complete.call(s.context, xhr, status)
                }
                callbackProcessed = true;
                if (s.timeout) {
                    clearTimeout(timeoutHandle)
                }
                setTimeout(function () {
                    if (!s.iframeTarget) {
                        $io.remove()
                    }
                    xhr.responseXML = null
                }, 100)
            }
            var toXml = $.parseXML ||
                function (s, doc) {
                    if (window.ActiveXObject) {
                        doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.async = "false";
                        doc.loadXML(s)
                    } else {
                        doc = (new DOMParser()).parseFromString(s, "text/xml")
                    }
                    return (doc && doc.documentElement && doc.documentElement.nodeName != "parsererror") ? doc : null
                };
            var parseJSON = $.parseJSON ||
                function (s) {
                    return window["eval"]("(" + s + ")")
                };
            var httpData = function (xhr, type, s) {
                var ct = xhr.getResponseHeader("content-type") || "",
                    xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;
                if (xml && data.documentElement.nodeName === "parsererror") {
                    if ($.error) {
                        $.error("parsererror")
                    }
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type)
                }
                if (typeof data === "string") {
                    if (type === "json" || !type && ct.indexOf("json") >= 0) {
                        data = parseJSON(data)
                    } else {
                        if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                            $.globalEval(data)
                        }
                    }
                }
                return data
            }
        }
    };
    $.fn.ajaxForm = function (options) {
        options = options || {};
        options.delegation = options.delegation && $.isFunction($.fn.on);
        if (!options.delegation && this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing ajaxForm");
                $(function () {
                    $(o.s, o.c).ajaxForm(options)
                });
                return this
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this
        }
        if (options.delegation) {
            $(document).off("submit.form-plugin", this.selector, doAjaxSubmit).off("click.form-plugin", this.selector, captureSubmittingElement).on("submit.form-plugin", this.selector, options, doAjaxSubmit).on("click.form-plugin", this.selector, options, captureSubmittingElement);
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", options, doAjaxSubmit).bind("click.form-plugin", options, captureSubmittingElement)
    };

    function doAjaxSubmit(e) {
        var options = e.data;
        if (!e.isDefaultPrevented()) {
            e.preventDefault();
            $(this).ajaxSubmit(options)
        }
    }
    function captureSubmittingElement(e) {
        var target = e.target;
        var $el = $(target);
        if (!($el.is(":submit,input:image"))) {
            var t = $el.closest(":submit");
            if (t.length === 0) {
                return
            }
            target = t[0]
        }
        var form = this;
        form.clk = target;
        if (target.type == "image") {
            if (e.offsetX !== undefined) {
                form.clk_x = e.offsetX;
                form.clk_y = e.offsetY
            } else {
                if (typeof $.fn.offset == "function") {
                    var offset = $el.offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top
                } else {
                    form.clk_x = e.pageX - target.offsetLeft;
                    form.clk_y = e.pageY - target.offsetTop
                }
            }
        }
        setTimeout(function () {
            form.clk = form.clk_x = form.clk_y = null
        }, 100)
    }
    $.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    $.fn.formToArray = function (semantic, elements) {
        var a = [];
        if (this.length === 0) {
            return a
        }
        var form = this[0];
        var els = semantic ? form.getElementsByTagName("*") : form.elements;
        if (!els) {
            return a
        }
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue
            }
            if (semantic && form.clk && el.type == "image") {
                if (!el.disabled && form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val(),
                        type: el.type
                    });
                    a.push({
                        name: n + ".x",
                        value: form.clk_x
                    }, {
                        name: n + ".y",
                        value: form.clk_y
                    })
                }
                continue
            }
            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                if (elements) {
                    elements.push(el)
                }
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    })
                }
            } else {
                if (feature.fileapi && el.type == "file" && !el.disabled) {
                    if (elements) {
                        elements.push(el)
                    }
                    var files = el.files;
                    if (files.length) {
                        for (j = 0; j < files.length; j++) {
                            a.push({
                                name: n,
                                value: files[j],
                                type: el.type
                            })
                        }
                    } else {
                        a.push({
                            name: n,
                            value: "",
                            type: el.type
                        })
                    }
                } else {
                    if (v !== null && typeof v != "undefined") {
                        if (elements) {
                            elements.push(el)
                        }
                        a.push({
                            name: n,
                            value: v,
                            type: el.type,
                            required: el.required
                        })
                    }
                }
            }
        }
        if (!semantic && form.clk) {
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == "image") {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + ".x",
                    value: form.clk_x
                }, {
                    name: n + ".y",
                    value: form.clk_y
                })
            }
        }
        return a
    };
    $.fn.formSerialize = function (semantic) {
        return $.param(this.formToArray(semantic))
    };
    $.fn.fieldSerialize = function (successful) {
        var a = [];
        this.each(function () {
            var n = this.name;
            if (!n) {
                return
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    })
                }
            } else {
                if (v !== null && typeof v != "undefined") {
                    a.push({
                        name: this.name,
                        value: v
                    })
                }
            }
        });
        return $.param(a)
    };
    $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == "undefined" || (v.constructor == Array && !v.length)) {
                continue
            }
            if (v.constructor == Array) {
                $.merge(val, v)
            } else {
                val.push(v)
            }
        }
        return val
    };
    $.fieldValue = function (el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true
        }
        if (successful && (!n || el.disabled || t == "reset" || t == "button" || (t == "checkbox" || t == "radio") && !el.checked || (t == "submit" || t == "image") && el.form && el.form.clk != el || tag == "select" && el.selectedIndex == -1)) {
            return null
        }
        if (tag == "select") {
            var index = el.selectedIndex;
            if (index < 0) {
                return null
            }
            var a = [],
                ops = el.options;
            var one = (t == "select-one");
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) {
                        v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value
                    }
                    if (one) {
                        return v
                    }
                    a.push(v)
                }
            }
            return a
        }
        return $(el).val()
    };
    $.fn.clearForm = function (includeHidden) {
        return this.each(function () {
            $("input,select,textarea", this).clearFields(includeHidden)
        })
    };
    $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == "textarea") {
                this.value = ""
            } else {
                if (t == "checkbox" || t == "radio") {
                    this.checked = false
                } else {
                    if (tag == "select") {
                        this.selectedIndex = -1
                    } else {
                        if (includeHidden) {
                            if ((includeHidden === true && /hidden/.test(t)) || (typeof includeHidden == "string" && $(this).is(includeHidden))) {
                                this.value = ""
                            }
                        }
                    }
                }
            }
        })
    };
    $.fn.resetForm = function () {
        return this.each(function () {
            if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                this.reset()
            }
        })
    };
    $.fn.enable = function (b) {
        if (b === undefined) {
            b = true
        }
        return this.each(function () {
            this.disabled = !b
        })
    };
    $.fn.selected = function (select) {
        if (select === undefined) {
            select = true
        }
        return this.each(function () {
            var t = this.type;
            if (t == "checkbox" || t == "radio") {
                this.checked = select
            } else {
                if (this.tagName.toLowerCase() == "option") {
                    var $sel = $(this).parent("select");
                    if (select && $sel[0] && $sel[0].type == "select-one") {
                        $sel.find("option").selected(false)
                    }
                    this.selected = select
                }
            }
        })
    };
    $.fn.ajaxSubmit.debug = false;

    function log() {
        if (!$.fn.ajaxSubmit.debug) {
            return
        }
        var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(msg)
        } else {
            if (window.opera && window.opera.postError) {
                window.opera.postError(msg)
            }
        }
    }
})(jQuery);
/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {
    var pluses = /\+/g;

    function raw(s) {
        return s
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, " "))
    }
    var config = $.cookie = function (key, value, options) {
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null) {
                options.expires = -1
            }
            if (typeof options.expires === "number") {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days)
            }
            value = config.json ? JSON.stringify(value) : String(value);
            return (document.cookie = [encodeURIComponent(key), "=", config.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""))
        }
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split("; ");
        for (var i = 0, parts;
             (parts = cookies[i] && cookies[i].split("=")); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join("="));
                return config.json ? JSON.parse(cookie) : cookie
            }
        }
        return null
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key, options) !== null) {
            $.cookie(key, null, options);
            return true
        }
        return false
    }
})(jQuery, document);
/*! jQuery UI - v1.8.24 - 2012-09-28
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.core.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function (a, b) {
    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode,
                g = f.name,
                h;
            return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !! h && d(h))
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b)
    }
    function d(b) {
        return !a(b).parents().andSelf().filter(function () {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    a.ui = a.ui || {};
    if (a.ui.version) {
        return
    }
    a.extend(a.ui, {
        version: "1.8.24",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function (b, c) {
            return typeof b == "number" ? this.each(function () {
                var d = this;
                setTimeout(function () {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function () {
            var b;
            return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : b = this.parents().filter(function () {
                return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function (c) {
            if (c !== b) {
                return this.css("zIndex", c)
            }
            if (this.length) {
                var d = a(this[0]),
                    e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) {
                            return f
                        }
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        disableSelection: function () {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                a.preventDefault()
            })
        },
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (c, d) {
        function h(b, c, d, f) {
            return a.each(e, function () {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            }), c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            f = d.toLowerCase(),
            g = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + d] = function (c) {
            return c === b ? g["inner" + d].call(this) : this.each(function () {
                a(this).css(f, h(this, c) + "px")
            })
        }, a.fn["outer" + d] = function (b, c) {
            return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function () {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
            return function (c) {
                return !!a.data(c, b)
            }
        }) : function (b, c, d) {
            return !!a.data(b, d[3])
        },
        focusable: function (b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function (b) {
            var d = a.attr(b, "tabindex"),
                e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }
    }), a(function () {
        var b = document.body,
            c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, {
        plugin: {
            add: function (b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d) {
                    e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
                }
            },
            call: function (a, b, c) {
                var d = a.plugins[b];
                if (!d || !a.element[0].parentNode) {
                    return
                }
                for (var e = 0; e < d.length; e++) {
                    a.options[d[e][0]] && d[e][1].apply(a.element, c)
                }
            }
        },
        contains: function (a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },
        hasScroll: function (b, c) {
            if (a(b).css("overflow") === "hidden") {
                return !1
            }
            var d = c && c === "left" ? "scrollLeft" : "scrollTop",
                e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
        },
        isOverAxis: function (a, b, c) {
            return a > b && a < b + c
        },
        isOver: function (b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }
    })
})(jQuery);
/*! jQuery UI - v1.8.24 - 2012-09-28
 * https://github.com/jquery/jquery-ui
 * Includes: jquery.ui.datepicker.js
 * Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function ($, undefined) {
    function Datepicker() {
        this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    function bindHover(a) {
        var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return a.bind("mouseout", function (a) {
            var c = $(a.target).closest(b);
            if (!c.length) {
                return
            }
            c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function (c) {
                var d = $(c.target).closest(b);
                if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length) {
                    return
                }
                d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover")
            })
    }
    function extendRemove(a, b) {
        $.extend(a, b);
        for (var c in b) {
            if (b[c] == null || b[c] == undefined) {
                a[c] = b[c]
            }
        }
        return a
    }
    function isArray(a) {
        return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/))
    }
    $.extend($.ui, {
        datepicker: {
            version: "1.8.24"
        }
    });
    var PROP_NAME = "datepicker",
        dpuuid = (new Date).getTime(),
        instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (a) {
            return extendRemove(this._defaults, a || {}), this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute("date:" + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase(),
                inline = nodeName == "div" || nodeName == "span";
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function (a, b) {
            var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: c,
                input: a,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: b,
                dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function (a, b) {
            var c = $(a);
            b.append = $([]), b.trigger = $([]);
            if (c.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function (a, c) {
                    return this._get(b, c)
                }), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a)
        },
        _attachments: function (a, b) {
            var c = this._get(b, "appendText"),
                d = this._get(b, "isRTL");
            b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
            var e = this._get(b, "showOn");
            (e == "focus" || e == "both") && a.focus(this._showDatepicker);
            if (e == "button" || e == "both") {
                var f = this._get(b, "buttonText"),
                    g = this._get(b, "buttonImage");
                b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                    src: g,
                    alt: f,
                    title: f
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({
                    src: g,
                    alt: f,
                    title: f
                }))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function () {
                    return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != a[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(a[0])) : $.datepicker._showDatepicker(a[0]), !1
                })
            }
        },
        _autoSize: function (a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var b = new Date(2009, 11, 20),
                    c = this._get(a, "dateFormat");
                if (c.match(/[DM]/)) {
                    var d = function (a) {
                        var b = 0,
                            c = 0;
                        for (var d = 0; d < a.length; d++) {
                            a[d].length > b && (b = a[d].length, c = d)
                        }
                        return c
                    };
                    b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
                }
                a.input.attr("size", this._formatDate(a, b).length)
            }
        },
        _inlineDatepicker: function (a, b) {
            var c = $(a);
            if (c.hasClass(this.markerClassName)) {
                return
            }
            c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function (a, c, d) {
                b.settings[c] = d
            }).bind("getData.datepicker", function (a, c) {
                    return this._get(b, c)
                }), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function (a, b, c, d, e) {
            var f = this._dialogInst;
            if (!f) {
                this.uuid += 1;
                var g = "dp" + this.uuid;
                this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f)
            }
            extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null;
            if (!this._pos) {
                var h = document.documentElement.clientWidth,
                    i = document.documentElement.clientHeight,
                    j = document.documentElement.scrollLeft || document.body.scrollLeft,
                    k = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [h / 2 - 100 + j, i / 2 - 150 + k]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this
        },
        _destroyDatepicker: function (a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (!b.hasClass(this.markerClassName)) {
                return
            }
            var d = a.nodeName.toLowerCase();
            $.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty()
        },
        _enableDatepicker: function (a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (!b.hasClass(this.markerClassName)) {
                return
            }
            var d = a.nodeName.toLowerCase();
            if (d == "input") {
                a.disabled = !1, c.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })
            } else {
                if (d == "div" || d == "span") {
                    var e = b.children("." + this._inlineClass);
                    e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (b) {
                return b == a ? null : b
            })
        },
        _disableDatepicker: function (a) {
            var b = $(a),
                c = $.data(a, PROP_NAME);
            if (!b.hasClass(this.markerClassName)) {
                return
            }
            var d = a.nodeName.toLowerCase();
            if (d == "input") {
                a.disabled = !0, c.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })
            } else {
                if (d == "div" || d == "span") {
                    var e = b.children("." + this._inlineClass);
                    e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
            }
            this._disabledInputs = $.map(this._disabledInputs, function (b) {
                return b == a ? null : b
            }), this._disabledInputs[this._disabledInputs.length] = a
        },
        _isDisabledDatepicker: function (a) {
            if (!a) {
                return !1
            }
            for (var b = 0; b < this._disabledInputs.length; b++) {
                if (this._disabledInputs[b] == a) {
                    return !0
                }
            }
            return !1
        },
        _getInst: function (a) {
            try {
                return $.data(a, PROP_NAME)
            } catch (b) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (a, b, c) {
            var d = this._getInst(a);
            if (arguments.length == 2 && typeof b == "string") {
                return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null
            }
            var e = b || {};
            typeof b == "string" && (e = {}, e[b] = c);
            if (d) {
                this._curInst == d && this._hideDatepicker();
                var f = this._getDateDatepicker(a, !0),
                    g = this._getMinMaxDate(d, "min"),
                    h = this._getMinMaxDate(d, "max");
                extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d)
            }
        },
        _changeDatepicker: function (a, b, c) {
            this._optionDatepicker(a, b, c)
        },
        _refreshDatepicker: function (a) {
            var b = this._getInst(a);
            b && this._updateDatepicker(b)
        },
        _setDateDatepicker: function (a, b) {
            var c = this._getInst(a);
            c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
        },
        _getDateDatepicker: function (a, b) {
            var c = this._getInst(a);
            return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
        },
        _doKeyDown: function (a) {
            var b = $.datepicker._getInst(a.target),
                c = !0,
                d = b.dpDiv.is(".ui-datepicker-rtl");
            b._keyEvent = !0;
            if ($.datepicker._datepickerShowing) {
                switch (a.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), c = !1;
                        break;
                    case 13:
                        var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
                        e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
                        var f = $.datepicker._get(b, "onSelect");
                        if (f) {
                            var g = $.datepicker._formatDate(b);
                            f.apply(b.input ? b.input[0] : null, [g, b])
                        } else {
                            $.datepicker._hideDatepicker()
                        }
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 35:
                        (a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
                        break;
                    case 36:
                        (a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
                        break;
                    case 37:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 38:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
                        break;
                    case 39:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
                        break;
                    case 40:
                        (a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
                        break;
                    default:
                        c = !1
                }
            } else {
                a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1
            }
            c && (a.preventDefault(), a.stopPropagation())
        },
        _doKeyPress: function (a) {
            var b = $.datepicker._getInst(a.target);
            if ($.datepicker._get(b, "constrainInput")) {
                var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")),
                    d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
                return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1
            }
        },
        _doKeyUp: function (a) {
            var b = $.datepicker._getInst(a.target);
            if (b.input.val() != b.lastVal) {
                try {
                    var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
                    c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b))
                } catch (d) {
                    $.datepicker.log(d)
                }
            }
            return !0
        },
        _showDatepicker: function (a) {
            a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
            if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a) {
                return
            }
            var b = $.datepicker._getInst(a);
            $.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._curInst.dpDiv.stop(!0, !0), b && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
            var c = $.datepicker._get(b, "beforeShow"),
                d = c ? c.apply(a, [a, b]) : {};
            if (d === !1) {
                return
            }
            extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
            var e = !1;
            $(a).parents().each(function () {
                return e |= $(this).css("position") == "fixed", !e
            }), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
            var f = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
                position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute",
                display: "none",
                left: f.left + "px",
                top: f.top + "px"
            });
            if (!b.inline) {
                var g = $.datepicker._get(b, "showAnim"),
                    h = $.datepicker._get(b, "duration"),
                    i = function () {
                        var a = b.dpDiv.find("iframe.ui-datepicker-cover");
                        if ( !! a.length) {
                            var c = $.datepicker._getBorders(b.dpDiv);
                            a.css({
                                left: -c[0],
                                top: -c[1],
                                width: b.dpDiv.outerWidth(),
                                height: b.dpDiv.outerHeight()
                            })
                        }
                    };
                b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b
            }
        },
        _updateDatepicker: function (a) {
            var b = this;
            b.maxRows = 4;
            var c = $.datepicker._getBorders(a.dpDiv);
            instActive = a, a.dpDiv.empty().append(this._generateHTML(a)), this._attachHandlers(a);
            var d = a.dpDiv.find("iframe.ui-datepicker-cover");
            !d.length || d.css({
                left: -c[0],
                top: -c[1],
                width: a.dpDiv.outerWidth(),
                height: a.dpDiv.outerHeight()
            }), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var e = this._getNumberOfMonths(a),
                f = e[1],
                g = 17;
            a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
            if (a.yearshtml) {
                var h = a.yearshtml;
                setTimeout(function () {
                    h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null
                }, 0)
            }
            if (typeof (datepickerAfterShow) === "function") {
                datepickerAfterShow(a)
            }
        },
        _getBorders: function (a) {
            var b = function (a) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[a] || a
            };
            return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
        },
        _checkOffset: function (a, b, c) {
            var d = a.dpDiv.outerWidth(),
                e = a.dpDiv.outerHeight(),
                f = a.input ? a.input.outerWidth() : 0,
                g = a.input ? a.input.outerHeight() : 0,
                h = document.documentElement.clientWidth + (c ? 0 : $(document).scrollLeft()),
                i = document.documentElement.clientHeight + (c ? 0 : $(document).scrollTop());
            return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b
        },
        _findPos: function (a) {
            var b = this._getInst(a),
                c = this._get(b, "isRTL");
            while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a))) {
                a = a[c ? "previousSibling" : "nextSibling"]
            }
            var d = $(a).offset();
            return [d.left, d.top]
        },
        _hideDatepicker: function (a) {
            var b = this._curInst;
            if (!b || a && b != $.data(a, PROP_NAME)) {
                return
            }
            if (this._datepickerShowing) {
                var c = this._get(b, "showAnim"),
                    d = this._get(b, "duration"),
                    e = function () {
                        $.datepicker._tidyDialog(b)
                    };
                $.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), this._datepickerShowing = !1;
                var f = this._get(b, "onClose");
                f && f.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
            }
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (a) {
            if (!$.datepicker._curInst) {
                return
            }
            var b = $(a.target),
                c = $.datepicker._getInst(b[0]);
            (b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || b.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != c) && $.datepicker._hideDatepicker()
        },
        _adjustDate: function (a, b, c) {
            var d = $(a),
                e = this._getInst(d[0]);
            if (this._isDisabledDatepicker(d[0])) {
                return
            }
            this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e)
        },
        _gotoToday: function (a) {
            var b = $(a),
                c = this._getInst(b[0]);
            if (this._get(c, "gotoCurrent") && c.currentDay) {
                c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear
            } else {
                var d = new Date;
                c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear()
            }
            this._notifyChange(c), this._adjustDate(b)
        },
        _selectMonthYear: function (a, b, c) {
            var d = $(a),
                e = this._getInst(d[0]);
            e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d)
        },
        _selectDay: function (a, b, c, d) {
            var e = $(a);
            if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0])) {
                return
            }
            var f = this._getInst(e[0]);
            f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
        },
        _clearDate: function (a) {
            var b = $(a),
                c = this._getInst(b[0]);
            this._selectDate(b, "")
        },
        _selectDate: function (a, b) {
            var c = $(a),
                d = this._getInst(c[0]);
            b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
            var e = this._get(d, "onSelect");
            e ? e.apply(d.input ? d.input[0] : null, [b, d]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (a) {
            var b = this._get(a, "altField");
            if (b) {
                var c = this._get(a, "altFormat") || this._get(a, "dateFormat"),
                    d = this._getDate(a),
                    e = this.formatDate(c, d, this._getFormatConfig(a));
                $(b).each(function () {
                    $(this).val(e)
                })
            }
        },
        noWeekends: function (a) {
            var b = a.getDay();
            return [b > 0 && b < 6, ""]
        },
        iso8601Week: function (a) {
            var b = new Date(a.getTime());
            b.setDate(b.getDate() + 4 - (b.getDay() || 7));
            var c = b.getTime();
            return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 86400000) / 7) + 1
        },
        parseDate: function (a, b, c) {
            if (a == null || b == null) {
                throw "Invalid arguments"
            }
            b = typeof b == "object" ? b.toString() : b + "";
            if (b == "") {
                return null
            }
            var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
            var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                f = (c ? c.dayNames : null) || this._defaults.dayNames,
                g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                h = (c ? c.monthNames : null) || this._defaults.monthNames,
                i = -1,
                j = -1,
                k = -1,
                l = -1,
                m = !1,
                n = function (b) {
                    var c = s + 1 < a.length && a.charAt(s + 1) == b;
                    return c && s++, c
                },
                o = function (a) {
                    var c = n(a),
                        d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2,
                        e = new RegExp("^\\d{1," + d + "}"),
                        f = b.substring(r).match(e);
                    if (!f) {
                        throw "Missing number at position " + r
                    }
                    return r += f[0].length, parseInt(f[0], 10)
                },
                p = function (a, c, d) {
                    var e = $.map(n(a) ? d : c, function (a, b) {
                            return [[b, a]]
                        }).sort(function (a, b) {
                                return -(a[1].length - b[1].length)
                            }),
                        f = -1;
                    $.each(e, function (a, c) {
                        var d = c[1];
                        if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) {
                            return f = c[0], r += d.length, !1
                        }
                    });
                    if (f != -1) {
                        return f + 1
                    }
                    throw "Unknown name at position " + r
                },
                q = function () {
                    if (b.charAt(r) != a.charAt(s)) {
                        throw "Unexpected literal at position " + r
                    }
                    r++
                },
                r = 0;
            for (var s = 0; s < a.length; s++) {
                if (m) {
                    a.charAt(s) == "'" && !n("'") ? m = !1 : q()
                } else {
                    switch (a.charAt(s)) {
                        case "d":
                            k = o("d");
                            break;
                        case "D":
                            p("D", e, f);
                            break;
                        case "o":
                            l = o("o");
                            break;
                        case "m":
                            j = o("m");
                            break;
                        case "M":
                            j = p("M", g, h);
                            break;
                        case "y":
                            i = o("y");
                            break;
                        case "@":
                            var t = new Date(o("@"));
                            i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                            break;
                        case "!":
                            var t = new Date((o("!") - this._ticksTo1970) / 10000);
                            i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
                            break;
                        case "'":
                            n("'") ? q() : m = !0;
                            break;
                        default:
                            q()
                    }
                }
            }
            if (r < b.length) {
                throw "Extra/unparsed characters found in date: " + b.substring(r)
            }
            i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
            if (l > -1) {
                j = 1, k = l;
                do {
                    var u = this._getDaysInMonth(i, j - 1);
                    if (k <= u) {
                        break
                    }
                    j++, k -= u
                } while (!0)
            }
            var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
            if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) {
                throw "Invalid date"
            }
            return t
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 10000000,
        formatDate: function (a, b, c) {
            if (!b) {
                return ""
            }
            var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
                e = (c ? c.dayNames : null) || this._defaults.dayNames,
                f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
                g = (c ? c.monthNames : null) || this._defaults.monthNames,
                h = function (b) {
                    var c = m + 1 < a.length && a.charAt(m + 1) == b;
                    return c && m++, c
                },
                i = function (a, b, c) {
                    var d = "" + b;
                    if (h(a)) {
                        while (d.length < c) {
                            d = "0" + d
                        }
                    }
                    return d
                },
                j = function (a, b, c, d) {
                    return h(a) ? d[b] : c[b]
                },
                k = "",
                l = !1;
            if (b) {
                for (var m = 0; m < a.length; m++) {
                    if (l) {
                        a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m)
                    } else {
                        switch (a.charAt(m)) {
                            case "d":
                                k += i("d", b.getDate(), 2);
                                break;
                            case "D":
                                k += j("D", b.getDay(), d, e);
                                break;
                            case "o":
                                k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                k += i("m", b.getMonth() + 1, 2);
                                break;
                            case "M":
                                k += j("M", b.getMonth(), f, g);
                                break;
                            case "y":
                                k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
                                break;
                            case "@":
                                k += b.getTime();
                                break;
                            case "!":
                                k += b.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                h("'") ? k += "'" : l = !0;
                                break;
                            default:
                                k += a.charAt(m)
                        }
                    }
                }
            }
            return k
        },
        _possibleChars: function (a) {
            var b = "",
                c = !1,
                d = function (b) {
                    var c = e + 1 < a.length && a.charAt(e + 1) == b;
                    return c && e++, c
                };
            for (var e = 0; e < a.length; e++) {
                if (c) {
                    a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e)
                } else {
                    switch (a.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            b += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            d("'") ? b += "'" : c = !0;
                            break;
                        default:
                            b += a.charAt(e)
                    }
                }
            }
            return b
        },
        _get: function (a, b) {
            return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b]
        },
        _setDateFromField: function (a, b) {
            if (a.input.val() == a.lastVal) {
                return
            }
            var c = this._get(a, "dateFormat"),
                d = a.lastVal = a.input ? a.input.val() : null,
                e, f;
            e = f = this._getDefaultDate(a);
            var g = this._getFormatConfig(a);
            try {
                e = this.parseDate(c, d, g) || f
            } catch (h) {
                this.log(h), d = b ? "" : d
            }
            a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a)
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function (a, b, c) {
            var d = function (a) {
                    var b = new Date;
                    return b.setDate(b.getDate() + a), b
                },
                e = function (b) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a))
                    } catch (c) {}
                    var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date,
                        e = d.getFullYear(),
                        f = d.getMonth(),
                        g = d.getDate(),
                        h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                        i = h.exec(b);
                    while (i) {
                        switch (i[2] || "d") {
                            case "d":
                            case "D":
                                g += parseInt(i[1], 10);
                                break;
                            case "w":
                            case "W":
                                g += parseInt(i[1], 10) * 7;
                                break;
                            case "m":
                            case "M":
                                f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
                                break;
                            case "y":
                            case "Y":
                                e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f))
                        }
                        i = h.exec(b)
                    }
                    return new Date(e, f, g)
                },
                f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
            return f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f)
        },
        _daylightSavingAdjust: function (a) {
            return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
        },
        _setDate: function (a, b, c) {
            var d = !b,
                e = a.selectedMonth,
                f = a.selectedYear,
                g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
            a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
        },
        _getDate: function (a) {
            var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return b
        },
        _attachHandlers: function (a) {
            var b = this._get(a, "stepMonths"),
                c = "#" + a.id.replace(/\\\\/g, "\\");
            a.dpDiv.find("[data-handler]").map(function () {
                var a = {
                    prev: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, -b, "M")
                    },
                    next: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._adjustDate(c, +b, "M")
                    },
                    hide: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                    },
                    today: function () {
                        window["DP_jQuery_" + dpuuid].datepicker._gotoToday(c)
                    },
                    selectDay: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectDay(c, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "M"), !1
                    },
                    selectYear: function () {
                        return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(c, this, "Y"), !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), a[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (a) {
            var b = new Date;
            b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
            var c = this._get(a, "isRTL"),
                d = this._get(a, "showButtonPanel"),
                e = this._get(a, "hideIfNoPrevNext"),
                f = this._get(a, "navigationAsDateFormat"),
                g = this._getNumberOfMonths(a),
                h = this._get(a, "showCurrentAtPos"),
                i = this._get(a, "stepMonths"),
                j = g[0] != 1 || g[1] != 1,
                k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
                l = this._getMinMaxDate(a, "min"),
                m = this._getMinMaxDate(a, "max"),
                n = a.drawMonth - h,
                o = a.drawYear;
            n < 0 && (n += 12, o--);
            if (m) {
                var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
                p = l && p < l ? l : p;
                while (this._daylightSavingAdjust(new Date(o, n, 1)) > p) {
                    n--, n < 0 && (n = 11, o--)
                }
            }
            a.drawMonth = n, a.drawYear = o;
            var q = this._get(a, "prevText");
            q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
            var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + q + '"><span class="ui-icon ' + (c ? "s32-next-arrow-white" : "s32-back-arrow-white") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ' + (c ? "s32-next-arrow-white" : "s32-back-arrow-white") + '">' + q + "</span></a>",
                s = this._get(a, "nextText");
            s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
            var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + s + '"><span class="ui-icon ' + (c ? "s32-back-arrow-white" : "s32-next-arrow-white") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ' + (c ? "s32-back-arrow-white" : "s32-next-arrow-white") + '">' + s + "</span></a>",
                u = this._get(a, "currentText"),
                v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
            u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
            var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(a, "closeText") + "</button>",
                x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + u + "</button>" : "") + (c ? "" : w) + "</div>" : "",
                y = parseInt(this._get(a, "firstDay"), 10);
            y = isNaN(y) ? 0 : y;
            var z = this._get(a, "showWeek"),
                A = this._get(a, "dayNames"),
                B = this._get(a, "dayNamesShort"),
                C = this._get(a, "dayNamesMin"),
                D = this._get(a, "monthNames"),
                E = this._get(a, "monthNamesShort"),
                F = this._get(a, "beforeShowDay"),
                G = this._get(a, "showOtherMonths"),
                H = this._get(a, "selectOtherMonths"),
                I = this._get(a, "calculateWeek") || this.iso8601Week,
                J = this._getDefaultDate(a),
                K = "";
            for (var L = 0; L < g[0]; L++) {
                var M = "";
                this.maxRows = 4;
                for (var N = 0; N < g[1]; N++) {
                    var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)),
                        P = " ui-corner-all",
                        Q = "";
                    if (j) {
                        Q += '<div class="ui-datepicker-group';
                        if (g[1] > 1) {
                            switch (N) {
                                case 0:
                                    Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
                                    break;
                                case g[1] - 1:
                                    Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
                                    break;
                                default:
                                    Q += " ui-datepicker-group-middle", P = ""
                            }
                        }
                        Q += '">'
                    }
                    Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
                    for (var S = 0; S < 7; S++) {
                        var T = (S + y) % 7;
                        R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + A[T] + '">' + C[T] + "</span></th>"
                    }
                    Q += R + "</tr></thead><tbody>";
                    var U = this._getDaysInMonth(o, n);
                    o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
                    var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7,
                        W = Math.ceil((V + U) / 7),
                        X = j ? this.maxRows > W ? this.maxRows : W : W;
                    this.maxRows = X;
                    var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
                    for (var Z = 0; Z < X; Z++) {
                        Q += "<tr>";
                        var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
                        for (var S = 0; S < 7; S++) {
                            var ba = F ? F.apply(a.input ? a.input[0] : null, [Y]) : [!0, ""],
                                bb = Y.getMonth() != n,
                                bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
                            _ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' data-handler="selectDay" data-event="click" data-month="' + Y.getMonth() + '" data-year="' + Y.getFullYear() + '"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y)
                        }
                        Q += _ + "</tr>"
                    }
                    n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q
                }
                K += M
            }
            return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, K
        },
        _generateMonthYearHeader: function (a, b, c, d, e, f, g, h) {
            var i = this._get(a, "changeMonth"),
                j = this._get(a, "changeYear"),
                k = this._get(a, "showMonthAfterYear"),
                l = '<div class="ui-datepicker-title">',
                m = "";
            if (f || !i) {
                m += '<span class="ui-datepicker-month">' + g[b] + "</span>"
            } else {
                var n = d && d.getFullYear() == c,
                    o = e && e.getFullYear() == c;
                m += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var p = 0; p < 12; p++) {
                    (!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>")
                }
                m += "</select>"
            }
            k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
            if (!a.yearshtml) {
                a.yearshtml = "";
                if (f || !j) {
                    l += '<span class="ui-datepicker-year">' + c + "</span>"
                } else {
                    var q = this._get(a, "yearRange").split(":"),
                        r = (new Date).getFullYear(),
                        s = function (a) {
                            var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
                            return isNaN(b) ? r : b
                        },
                        t = s(q[0]),
                        u = Math.max(t, s(q[1] || ""));
                    t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
                    for (; t <= u; t++) {
                        a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>"
                    }
                    a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null
                }
            }
            return l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>", l
        },
        _adjustInstDate: function (a, b, c) {
            var d = a.drawYear + (c == "Y" ? b : 0),
                e = a.drawMonth + (c == "M" ? b : 0),
                f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0),
                g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
            a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a)
        },
        _restrictMinMax: function (a, b) {
            var c = this._getMinMaxDate(a, "min"),
                d = this._getMinMaxDate(a, "max"),
                e = c && b < c ? c : b;
            return e = d && e > d ? d : e, e
        },
        _notifyChange: function (a) {
            var b = this._get(a, "onChangeMonthYear");
            b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
        },
        _getNumberOfMonths: function (a) {
            var b = this._get(a, "numberOfMonths");
            return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
        },
        _getMinMaxDate: function (a, b) {
            return this._determineDate(a, this._get(a, b + "Date"), null)
        },
        _getDaysInMonth: function (a, b) {
            return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
        },
        _getFirstDayOfMonth: function (a, b) {
            return (new Date(a, b, 1)).getDay()
        },
        _canAdjustMonth: function (a, b, c, d) {
            var e = this._getNumberOfMonths(a),
                f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
            return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
        },
        _isInRange: function (a, b) {
            var c = this._getMinMaxDate(a, "min"),
                d = this._getMinMaxDate(a, "max");
            return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime())
        },
        _getFormatConfig: function (a) {
            var b = this._get(a, "shortYearCutoff");
            return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
                shortYearCutoff: b,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function (a, b, c, d) {
            b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
            var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
        }
    }), $.fn.datepicker = function (a) {
        if (!this.length) {
            return this
        }
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
        var b = Array.prototype.slice.call(arguments, 1);
        return typeof a != "string" || a != "isDisabled" && a != "getDate" && a != "widget" ? a == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b)) : this.each(function () {
            typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this].concat(b)) : $.datepicker._attachDatepicker(this, a)
        }) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [this[0]].concat(b))
    }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.24", window["DP_jQuery_" + dpuuid] = $
})(jQuery);
(function ($) {
    $.fn.hoverIntent = function (f, g) {
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        cfg = $.extend(cfg, g ? {
            over: f,
            out: g
        } : f);
        var cX, cY, pX, pY;
        var track = function (ev) {
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function () {
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function (ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function (e) {
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type == "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function () {
                        compare(ev, ob)
                    }, cfg.interval)
                }
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function () {
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.bind("mouseenter", handleHover).bind("mouseleave", handleHover)
    }
})(jQuery);
(function ($) {
    var supportedCSS, styles = document.getElementsByTagName("head")[0].style,
        toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++) {
        if (styles[toCheck[a]] !== undefined) {
            supportedCSS = toCheck[a]
        }
    }
    var IE = eval('"v"=="\v"');
    jQuery.fn.extend({
        rotate: function (parameters) {
            if (this.length === 0 || typeof parameters == "undefined") {
                return
            }
            if (typeof parameters == "number") {
                parameters = {
                    angle: parameters
                }
            }
            var returned = [];
            for (var i = 0, i0 = this.length; i < i0; i++) {
                var element = this.get(i);
                if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {
                    var paramClone = $.extend(true, {}, parameters);
                    var newRotObject = new Wilq32.PhotoEffect(element, paramClone)._rootObj;
                    returned.push($(newRotObject))
                } else {
                    element.Wilq32.PhotoEffect._handleRotation(parameters)
                }
            }
            return returned
        },
        getRotateAngle: function () {
            var ret = [];
            for (var i = 0, i0 = this.length; i < i0; i++) {
                var element = this.get(i);
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    ret[i] = element.Wilq32.PhotoEffect._angle
                }
            }
            return ret
        },
        stopRotate: function () {
            for (var i = 0, i0 = this.length; i < i0; i++) {
                var element = this.get(i);
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    clearTimeout(element.Wilq32.PhotoEffect._timer)
                }
            }
        }
    });
    Wilq32 = window.Wilq32 || {};
    Wilq32.PhotoEffect = (function () {
        if (supportedCSS) {
            return function (img, parameters) {
                img.Wilq32 = {
                    PhotoEffect: this
                };
                this._img = this._rootObj = this._eventObj = img;
                this._handleRotation(parameters)
            }
        } else {
            return function (img, parameters) {
                this._img = img;
                this._rootObj = document.createElement("span");
                this._rootObj.style.display = "inline-block";
                this._rootObj.Wilq32 = {
                    PhotoEffect: this
                };
                img.parentNode.insertBefore(this._rootObj, img);
                if (img.complete) {
                    this._Loader(parameters)
                } else {
                    var self = this;
                    jQuery(this._img).bind("load", function () {
                        self._Loader(parameters)
                    })
                }
            }
        }
    })();
    Wilq32.PhotoEffect.prototype = {
        _setupParameters: function (parameters) {
            this._parameters = this._parameters || {};
            if (typeof this._angle !== "number") {
                this._angle = 0
            }
            if (typeof parameters.angle === "number") {
                this._angle = parameters.angle
            }
            this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle);
            this._parameters.step = parameters.step || this._parameters.step || null;
            this._parameters.easing = parameters.easing || this._parameters.easing ||
                function (x, t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b
                };
            this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
            this._parameters.callback = parameters.callback || this._parameters.callback ||
                function () {};
            if (parameters.bind && parameters.bind != this._parameters.bind) {
                this._BindEvents(parameters.bind)
            }
        },
        _handleRotation: function (parameters) {
            this._setupParameters(parameters);
            if (this._angle == this._parameters.animateTo) {
                this._rotate(this._angle)
            } else {
                this._animateStart()
            }
        },
        _BindEvents: function (events) {
            if (events && this._eventObj) {
                if (this._parameters.bind) {
                    var oldEvents = this._parameters.bind;
                    for (var a in oldEvents) {
                        if (oldEvents.hasOwnProperty(a)) {
                            jQuery(this._eventObj).unbind(a, oldEvents[a])
                        }
                    }
                }
                this._parameters.bind = events;
                for (var a in events) {
                    if (events.hasOwnProperty(a)) {
                        jQuery(this._eventObj).bind(a, events[a])
                    }
                }
            }
        },
        _Loader: (function () {
            if (IE) {
                return function (parameters) {
                    var width = this._img.width;
                    var height = this._img.height;
                    this._img.parentNode.removeChild(this._img);
                    this._vimage = this.createVMLNode("image");
                    this._vimage.src = this._img.src;
                    this._vimage.style.height = height + "px";
                    this._vimage.style.width = width + "px";
                    this._vimage.style.position = "absolute";
                    this._vimage.style.top = "0px";
                    this._vimage.style.left = "0px";
                    this._container = this.createVMLNode("group");
                    this._container.style.width = width;
                    this._container.style.height = height;
                    this._container.style.position = "absolute";
                    this._container.setAttribute("coordsize", width - 1 + "," + (height - 1));
                    this._container.appendChild(this._vimage);
                    this._rootObj.appendChild(this._container);
                    this._rootObj.style.position = "relative";
                    this._rootObj.style.width = width + "px";
                    this._rootObj.style.height = height + "px";
                    this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                    this._rootObj.className = this._img.className;
                    this._eventObj = this._rootObj;
                    this._handleRotation(parameters)
                }
            } else {
                return function (parameters) {
                    this._rootObj.setAttribute("id", this._img.getAttribute("id"));
                    this._rootObj.className = this._img.className;
                    this._width = this._img.width;
                    this._height = this._img.height;
                    this._widthHalf = this._width / 2;
                    this._heightHalf = this._height / 2;
                    var _widthMax = Math.sqrt((this._height) * (this._height) + (this._width) * (this._width));
                    this._widthAdd = _widthMax - this._width;
                    this._heightAdd = _widthMax - this._height;
                    this._widthAddHalf = this._widthAdd / 2;
                    this._heightAddHalf = this._heightAdd / 2;
                    this._img.parentNode.removeChild(this._img);
                    this._aspectW = ((parseInt(this._img.style.width, 10)) || this._width) / this._img.width;
                    this._aspectH = ((parseInt(this._img.style.height, 10)) || this._height) / this._img.height;
                    this._canvas = document.createElement("canvas");
                    this._canvas.setAttribute("width", this._width);
                    this._canvas.style.position = "relative";
                    this._canvas.style.left = -this._widthAddHalf + "px";
                    this._canvas.style.top = -this._heightAddHalf + "px";
                    this._canvas.Wilq32 = this._rootObj.Wilq32;
                    this._rootObj.appendChild(this._canvas);
                    this._rootObj.style.width = this._width + "px";
                    this._rootObj.style.height = this._height + "px";
                    this._eventObj = this._canvas;
                    this._cnv = this._canvas.getContext("2d");
                    this._handleRotation(parameters)
                }
            }
        })(),
        _animateStart: function () {
            if (this._timer) {
                clearTimeout(this._timer)
            }
            this._animateStartTime = +new Date;
            this._animateStartAngle = this._angle;
            this._animate()
        },
        _animate: function () {
            var actualTime = +new Date;
            var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;
            if (checkEnd && !this._parameters.animatedGif) {
                clearTimeout(this._timer)
            } else {
                if (this._canvas || this._vimage || this._img) {
                    var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                    this._rotate((~~ (angle * 10)) / 10)
                }
                if (this._parameters.step) {
                    this._parameters.step(this._angle)
                }
                var self = this;
                this._timer = setTimeout(function () {
                    self._animate.call(self)
                }, 10)
            }
            if (this._parameters.callback && checkEnd) {
                this._angle = this._parameters.animateTo;
                this._rotate(this._angle);
                this._parameters.callback.call(this._rootObj)
            }
        },
        _rotate: (function () {
            var rad = Math.PI / 180;
            if (IE) {
                return function (angle) {
                    this._angle = angle;
                    this._container.style.rotation = (angle % 360) + "deg"
                }
            } else {
                if (supportedCSS) {
                    return function (angle) {
                        this._angle = angle;
                        this._img.style[supportedCSS] = "rotate(" + (angle % 360) + "deg)"
                    }
                } else {
                    return function (angle) {
                        this._angle = angle;
                        angle = (angle % 360) * rad;
                        this._canvas.width = this._width + this._widthAdd;
                        this._canvas.height = this._height + this._heightAdd;
                        this._cnv.translate(this._widthAddHalf, this._heightAddHalf);
                        this._cnv.translate(this._widthHalf, this._heightHalf);
                        this._cnv.rotate(angle);
                        this._cnv.translate(-this._widthHalf, -this._heightHalf);
                        this._cnv.scale(this._aspectW, this._aspectH);
                        this._cnv.drawImage(this._img, 0, 0)
                    }
                }
            }
        })()
    };
    if (IE) {
        Wilq32.PhotoEffect.prototype.createVMLNode = (function () {
            document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                return function (tagName) {
                    return document.createElement("<rvml:" + tagName + ' class="rvml">')
                }
            } catch (e) {
                return function (tagName) {
                    return document.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        })()
    }
})(jQuery);
(function (a) {
    a.Jcrop = function (b, c) {
        function h(a) {
            return a + "px"
        }
        function i(a) {
            return d.baseClass + "-" + a
        }
        function j() {
            return a.fx.step.hasOwnProperty("backgroundColor")
        }
        function k(b) {
            var c = a(b).offset();
            return [c.left, c.top]
        }
        function l(a) {
            return [a.pageX - e[0], a.pageY - e[1]]
        }
        function m(b) {
            typeof b != "object" && (b = {}), d = a.extend(d, b), a.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (a, b) {
                typeof d[b] != "function" && (d[b] = function () {})
            })
        }
        function n(a, b) {
            e = k(E), bd.setCursor(a === "move" ? a : a + "-resize");
            if (a === "move") {
                return bd.activateHandlers(p(b), u)
            }
            var c = ba.getFixed(),
                d = q(a),
                f = ba.getCorner(q(d));
            ba.setPressed(ba.getCorner(d)), ba.setCurrent(f), bd.activateHandlers(o(a, c), u)
        }
        function o(a, b) {
            return function (c) {
                if (!d.aspectRatio) {
                    switch (a) {
                        case "e":
                            c[1] = b.y2;
                            break;
                        case "w":
                            c[1] = b.y2;
                            break;
                        case "n":
                            c[0] = b.x2;
                            break;
                        case "s":
                            c[0] = b.x2
                    }
                } else {
                    switch (a) {
                        case "e":
                            c[1] = b.y + 1;
                            break;
                        case "w":
                            c[1] = b.y + 1;
                            break;
                        case "n":
                            c[0] = b.x + 1;
                            break;
                        case "s":
                            c[0] = b.x + 1
                    }
                }
                ba.setCurrent(c), bc.update()
            }
        }
        function p(a) {
            var b = a;
            return be.watchKeys(), function (a) {
                ba.moveOffset([a[0] - b[0], a[1] - b[1]]), b = a, bc.update()
            }
        }
        function q(a) {
            switch (a) {
                case "n":
                    return "sw";
                case "s":
                    return "nw";
                case "e":
                    return "nw";
                case "w":
                    return "ne";
                case "ne":
                    return "sw";
                case "nw":
                    return "se";
                case "se":
                    return "nw";
                case "sw":
                    return "ne"
            }
        }
        function r(a) {
            return function (b) {
                return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = k(E), X = !0, n(a, l(b)), b.stopPropagation(), b.preventDefault(), !1)
            }
        }
        function s(a, b, c) {
            var d = a.width(),
                e = a.height();
            d > b && b > 0 && (d = b, e = b / a.width() * a.height()), e > c && c > 0 && (e = c, d = c / a.height() * a.width()), U = a.width() / d, V = a.height() / e, a.width(d).height(e)
        }
        function t(a) {
            return {
                x: a.x * U,
                y: a.y * V,
                x2: a.x2 * U,
                y2: a.y2 * V,
                w: a.w * U,
                h: a.h * V
            }
        }
        function u(a) {
            var b = ba.getFixed();
            b.w > d.minSelect[0] && b.h > d.minSelect[1] ? (bc.enableHandles(), bc.done()) : bc.release(), bd.setCursor(d.allowSelect ? "crosshair" : "default")
        }
        function v(a) {
            if (d.disabled) {
                return !1
            }
            if (!d.allowSelect) {
                return !1
            }
            X = !0, e = k(E), bc.disableHandles(), bd.setCursor("crosshair");
            var b = l(a);
            return ba.setPressed(b), bc.update(), bd.activateHandlers(w, u), be.watchKeys(), a.stopPropagation(), a.preventDefault(), !1
        }
        function w(a) {
            ba.setCurrent(a), bc.update()
        }
        function z() {
            var b = a("<div></div>").addClass(i("tracker"));
            return a.browser.msie && b.css({
                opacity: 0,
                backgroundColor: "white"
            }), b
        }
        function bf(a) {
            H.removeClass().addClass(i("holder")).addClass(a)
        }
        function bg(a, b) {
            function t() {
                window.setTimeout(u, l)
            }
            var c = a[0] / U,
                e = a[1] / V,
                f = a[2] / U,
                g = a[3] / V;
            if (Y) {
                return
            }
            var h = ba.flipCoords(c, e, f, g),
                i = ba.getFixed(),
                j = [i.x, i.y, i.x2, i.y2],
                k = j,
                l = d.animationDelay,
                m = h[0] - j[0],
                n = h[1] - j[1],
                o = h[2] - j[2],
                p = h[3] - j[3],
                q = 0,
                r = d.swingSpeed;
            x = k[0], y = k[1], f = k[2], g = k[3], bc.animMode(!0);
            var s, u = function () {
                return function () {
                    q += (100 - q) / r, k[0] = x + q / 100 * m, k[1] = y + q / 100 * n, k[2] = f + q / 100 * o, k[3] = g + q / 100 * p, q >= 99.8 && (q = 100), q < 100 ? (bi(k), t()) : (bc.done(), typeof b == "function" && b.call(bt))
                }
            }();
            t()
        }
        function bh(a) {
            bi([a[0] / U, a[1] / V, a[2] / U, a[3] / V]), d.onSelect.call(bt, t(ba.getFixed())), bc.enableHandles()
        }
        function bi(a) {
            ba.setPressed([a[0], a[1]]), ba.setCurrent([a[2], a[3]]), bc.update()
        }
        function bj() {
            return t(ba.getFixed())
        }
        function bk() {
            return ba.getFixed()
        }
        function bl(a) {
            m(a), bs()
        }
        function bm() {
            d.disabled = !0, bc.disableHandles(), bc.setCursor("default"), bd.setCursor("default")
        }
        function bn() {
            d.disabled = !1, bs()
        }
        function bo() {
            bc.done(), bd.activateHandlers(null, null)
        }
        function bp() {
            H.remove(), B.show(), a(b).removeData("Jcrop")
        }
        function bq(a, b) {
            bc.release(), bm();
            var c = new Image;
            c.onload = function () {
                var e = c.width,
                    f = c.height,
                    g = d.boxWidth,
                    h = d.boxHeight;
                E.width(e).height(f), E.attr("src", a), I.attr("src", a), s(E, g, h), F = E.width(), G = E.height(), I.width(F).height(G), N.width(F + M * 2).height(G + M * 2), H.width(F).height(G), bb.resize(F, G), bn(), typeof b == "function" && b.call(bt)
            }, c.src = a
        }
        function br(a, b, c) {
            var e = b || d.bgColor;
            d.bgFade && j() && d.fadeTime && !c ? a.animate({
                backgroundColor: e
            }, {
                queue: !1,
                duration: d.fadeTime
            }) : a.css("backgroundColor", e)
        }
        function bs(a) {
            d.allowResize ? a ? bc.enableOnly() : bc.enableHandles() : bc.disableHandles(), bd.setCursor(d.allowSelect ? "crosshair" : "default"), bc.setCursor(d.allowMove ? "move" : "default"), d.hasOwnProperty("trueSize") && (U = d.trueSize[0] / F, V = d.trueSize[1] / G), d.hasOwnProperty("setSelect") && (bh(d.setSelect), bc.done(), delete d.setSelect), bb.refresh(), d.bgColor != O && (br(d.shade ? bb.getShades() : H, d.shade ? d.shadeColor || d.bgColor : d.bgColor), O = d.bgColor), P != d.bgOpacity && (P = d.bgOpacity, d.shade ? bb.refresh() : bc.setBgOpacity(P)), Q = d.maxSize[0] || 0, R = d.maxSize[1] || 0, S = d.minSize[0] || 0, T = d.minSize[1] || 0, d.hasOwnProperty("outerImage") && (E.attr("src", d.outerImage), delete d.outerImage), bc.refresh()
        }
        var d = a.extend({}, a.Jcrop.defaults),
            e, f, g = !1;
        a.browser.msie && a.browser.version.split(".")[0] === "6" && (g = !0), typeof b != "object" && (b = a(b)[0]), typeof c != "object" && (c = {}), m(c);
        var A = {
                border: "none",
                visibility: "visible",
                margin: 0,
                padding: 0,
                position: "absolute",
                top: 0,
                left: 0
            },
            B = a(b),
            C = !0;
        if (b.tagName == "IMG") {
            if (B[0].width != 0 && B[0].height != 0) {
                B.width(B[0].width), B.height(B[0].height)
            } else {
                var D = new Image;
                D.src = B[0].src, B.width(D.width), B.height(D.height)
            }
            var E = B.clone().removeAttr("id").css(A).show();
            E.width(B.width()), E.height(B.height()), B.after(E).hide()
        } else {
            E = B.css(A).show(), C = !1, d.shade === null && (d.shade = !0)
        }
        s(E, d.boxWidth, d.boxHeight);
        var F = E.width(),
            G = E.height(),
            H = a("<div />").width(F).height(G).addClass(i("holder")).css({
                position: "relative",
                backgroundColor: d.bgColor
            }).insertAfter(B).append(E);
        d.addClass && H.addClass(d.addClass);
        var I = a("<div />"),
            J = a("<div />").width("100%").height("100%").css({
                zIndex: 310,
                position: "absolute",
                overflow: "hidden"
            }),
            K = a("<div />").width("100%").height("100%").css("zIndex", 320),
            L = a("<div />").css({
                position: "absolute",
                zIndex: 600
            }).dblclick(function () {
                    var a = ba.getFixed();
                    d.onDblClick.call(bt, a)
                }).insertBefore(E).append(J, K);
        C && (I = a("<img />").attr("src", E.attr("src")).css(A).width(F).height(G), J.append(I)), g && L.css({
            overflowY: "hidden"
        });
        var M = d.boundary,
            N = z().width(F + M * 2).height(G + M * 2).css({
                position: "absolute",
                top: h(-M),
                left: h(-M),
                zIndex: 290
            }).mousedown(v),
            O = d.bgColor,
            P = d.bgOpacity,
            Q, R, S, T, U, V, W = !0,
            X, Y, Z;
        e = k(E);
        var _ = function () {
                function a() {
                    var a = {},
                        b = ["touchstart", "touchmove", "touchend"],
                        c = document.createElement("div"),
                        d;
                    try {
                        for (d = 0; d < b.length; d++) {
                            var e = b[d];
                            e = "on" + e;
                            var f = e in c;
                            f || (c.setAttribute(e, "return;"), f = typeof c[e] == "function"), a[b[d]] = f
                        }
                        return a.touchstart && a.touchend && a.touchmove
                    } catch (g) {
                        return !1
                    }
                }
                function b() {
                    return d.touchSupport === !0 || d.touchSupport === !1 ? d.touchSupport : a()
                }
                return {
                    createDragger: function (a) {
                        return function (b) {
                            return b.pageX = b.originalEvent.changedTouches[0].pageX, b.pageY = b.originalEvent.changedTouches[0].pageY, d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (X = !0, n(a, l(b)), b.stopPropagation(), b.preventDefault(), !1)
                        }
                    },
                    newSelection: function (a) {
                        return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, v(a)
                    },
                    isSupported: a,
                    support: b()
                }
            }(),
            ba = function () {
                function h(d) {
                    d = n(d), c = a = d[0], e = b = d[1]
                }
                function i(a) {
                    a = n(a), f = a[0] - c, g = a[1] - e, c = a[0], e = a[1]
                }
                function j() {
                    return [f, g]
                }
                function k(d) {
                    var f = d[0],
                        g = d[1];
                    0 > a + f && (f -= f + a), 0 > b + g && (g -= g + b), G < e + g && (g += G - (e + g)), F < c + f && (f += F - (c + f)), a += f, c += f, b += g, e += g
                }
                function l(a) {
                    var b = m();
                    switch (a) {
                        case "ne":
                            return [b.x2, b.y];
                        case "nw":
                            return [b.x, b.y];
                        case "se":
                            return [b.x2, b.y2];
                        case "sw":
                            return [b.x, b.y2]
                    }
                }
                function m() {
                    if (!d.aspectRatio) {
                        return p()
                    }
                    var f = d.aspectRatio,
                        g = d.minSize[0] / U,
                        h = d.maxSize[0] / U,
                        i = d.maxSize[1] / V,
                        j = c - a,
                        k = e - b,
                        l = Math.abs(j),
                        m = Math.abs(k),
                        n = l / m,
                        r, s, t, u;
                    return h === 0 && (h = F * 10), i === 0 && (i = G * 10), n < f ? (s = e, t = m * f, r = j < 0 ? a - t : t + a, r < 0 ? (r = 0, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b) : r > F && (r = F, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b)) : (r = c, u = l / f, s = k < 0 ? b - u : b + u, s < 0 ? (s = 0, t = Math.abs((s - b) * f), r = j < 0 ? a - t : t + a) : s > G && (s = G, t = Math.abs(s - b) * f, r = j < 0 ? a - t : t + a)), r > a ? (r - a < g ? r = a + g : r - a > h && (r = a + h), s > b ? s = b + (r - a) / f : s = b - (r - a) / f) : r < a && (a - r < g ? r = a - g : a - r > h && (r = a - h), s > b ? s = b + (a - r) / f : s = b - (a - r) / f), r < 0 ? (a -= r, r = 0) : r > F && (a -= r - F, r = F), s < 0 ? (b -= s, s = 0) : s > G && (b -= s - G, s = G), q(o(a, b, r, s))
                }
                function n(a) {
                    return a[0] < 0 && (a[0] = 0), a[1] < 0 && (a[1] = 0), a[0] > F && (a[0] = F), a[1] > G && (a[1] = G), [a[0], a[1]]
                }
                function o(a, b, c, d) {
                    var e = a,
                        f = c,
                        g = b,
                        h = d;
                    return c < a && (e = c, f = a), d < b && (g = d, h = b), [e, g, f, h]
                }
                function p() {
                    var d = c - a,
                        f = e - b,
                        g;
                    return Q && Math.abs(d) > Q && (c = d > 0 ? a + Q : a - Q), R && Math.abs(f) > R && (e = f > 0 ? b + R : b - R), T / V && Math.abs(f) < T / V && (e = f > 0 ? b + T / V : b - T / V), S / U && Math.abs(d) < S / U && (c = d > 0 ? a + S / U : a - S / U), a < 0 && (c -= a, a -= a), b < 0 && (e -= b, b -= b), c < 0 && (a -= c, c -= c), e < 0 && (b -= e, e -= e), c > F && (g = c - F, a -= g, c -= g), e > G && (g = e - G, b -= g, e -= g), a > F && (g = a - G, e -= g, b -= g), b > G && (g = b - G, e -= g, b -= g), q(o(a, b, c, e))
                }
                function q(a) {
                    return {
                        x: a[0],
                        y: a[1],
                        x2: a[2],
                        y2: a[3],
                        w: a[2] - a[0],
                        h: a[3] - a[1]
                    }
                }
                var a = 0,
                    b = 0,
                    c = 0,
                    e = 0,
                    f, g;
                return {
                    flipCoords: o,
                    setPressed: h,
                    setCurrent: i,
                    getOffset: j,
                    moveOffset: k,
                    getCorner: l,
                    getFixed: m
                }
            }(),
            bb = function () {
                function f(a, b) {
                    e.left.css({
                        height: h(b)
                    }), e.right.css({
                        height: h(b)
                    })
                }
                function g() {
                    return i(ba.getFixed())
                }
                function i(a) {
                    e.top.css({
                        left: h(a.x),
                        width: h(a.w),
                        height: h(a.y)
                    }), e.bottom.css({
                        top: h(a.y2),
                        left: h(a.x),
                        width: h(a.w),
                        height: h(G - a.y2)
                    }), e.right.css({
                        left: h(a.x2),
                        width: h(F - a.x2)
                    }), e.left.css({
                        width: h(a.x)
                    })
                }
                function j() {
                    return a("<div />").css({
                        position: "absolute",
                        backgroundColor: d.shadeColor || d.bgColor
                    }).appendTo(c)
                }
                function k() {
                    b || (b = !0, c.insertBefore(E), g(), bc.setBgOpacity(1, 0, 1), I.hide(), l(d.shadeColor || d.bgColor, 1), bc.isAwake() ? n(d.bgOpacity, 1) : n(1, 1))
                }
                function l(a, b) {
                    br(p(), a, b)
                }
                function m() {
                    b && (c.remove(), I.show(), b = !1, bc.isAwake() ? bc.setBgOpacity(d.bgOpacity, 1, 1) : (bc.setBgOpacity(1, 1, 1), bc.disableHandles()), br(H, 0, 1))
                }
                function n(a, e) {
                    b && (d.bgFade && !e ? c.animate({
                        opacity: 1 - a
                    }, {
                        queue: !1,
                        duration: d.fadeTime
                    }) : c.css({
                        opacity: 1 - a
                    }))
                }
                function o() {
                    d.shade ? k() : m(), bc.isAwake() && n(d.bgOpacity)
                }
                function p() {
                    return c.children()
                }
                var b = !1,
                    c = a("<div />").css({
                        position: "absolute",
                        zIndex: 240,
                        opacity: 0
                    }),
                    e = {
                        top: j(),
                        left: j().height(G),
                        right: j().height(G),
                        bottom: j()
                    };
                return {
                    update: g,
                    updateRaw: i,
                    getShades: p,
                    setBgColor: l,
                    enable: k,
                    disable: m,
                    resize: f,
                    refresh: o,
                    opacity: n
                }
            }(),
            bc = function () {
                function k(b) {
                    var c = a("<div />").css({
                        position: "absolute",
                        opacity: d.borderOpacity
                    }).addClass(i(b));
                    return J.append(c), c
                }
                function l(b, c) {
                    var d = a("<div />").mousedown(r(b)).css({
                        cursor: b + "-resize",
                        position: "absolute",
                        zIndex: c
                    }).addClass("ord-" + b);
                    return _.support && d.bind("touchstart.jcrop", _.createDragger(b)), K.append(d), d
                }
                function m(a) {
                    var b = d.handleSize;
                    return l(a, c++).css({
                        opacity: d.handleOpacity
                    }).width(b).height(b).addClass(i("handle"))
                }
                function n(a) {
                    return l(a, c++).addClass("jcrop-dragbar")
                }
                function o(a) {
                    var b;
                    for (b = 0; b < a.length; b++) {
                        g[a[b]] = n(a[b])
                    }
                }
                function p(a) {
                    var b, c;
                    for (c = 0; c < a.length; c++) {
                        switch (a[c]) {
                            case "n":
                                b = "hline";
                                break;
                            case "s":
                                b = "hline bottom";
                                break;
                            case "e":
                                b = "vline right";
                                break;
                            case "w":
                                b = "vline"
                        }
                        e[a[c]] = k(b)
                    }
                }
                function q(a) {
                    var b;
                    for (b = 0; b < a.length; b++) {
                        f[a[b]] = m(a[b])
                    }
                }
                function s(a, b) {
                    d.shade || I.css({
                        top: h(-b),
                        left: h(-a)
                    }), L.css({
                        top: h(b),
                        left: h(a)
                    })
                }
                function u(a, b) {
                    L.width(a).height(b)
                }
                function v() {
                    var a = ba.getFixed();
                    ba.setPressed([a.x, a.y]), ba.setCurrent([a.x2, a.y2]), w()
                }
                function w(a) {
                    if (b) {
                        return x(a)
                    }
                }
                function x(a) {
                    var c = ba.getFixed();
                    u(c.w, c.h), s(c.x, c.y), d.shade && bb.updateRaw(c), b || A(), a ? d.onSelect.call(bt, t(c)) : d.onChange.call(bt, t(c))
                }
                function y(a, c, e) {
                    if (!b && !c) {
                        return
                    }
                    d.bgFade && !e ? E.animate({
                        opacity: a
                    }, {
                        queue: !1,
                        duration: d.fadeTime
                    }) : E.css("opacity", a)
                }
                function A() {
                    L.show(), d.shade ? bb.opacity(P) : y(P, !0), b = !0
                }
                function B() {
                    F(), L.hide(), d.shade ? bb.opacity(1) : y(1), b = !1, d.onRelease.call(bt)
                }
                function C() {
                    j && K.show()
                }
                function D() {
                    j = !0;
                    if (d.allowResize) {
                        return K.show(), !0
                    }
                }
                function F() {
                    j = !1, K.hide()
                }
                function G(a) {
                    Y === a ? F() : D()
                }
                function H() {
                    G(!1), v()
                }
                var b, c = 370,
                    e = {},
                    f = {},
                    g = {},
                    j = !1;
                d.dragEdges && a.isArray(d.createDragbars) && o(d.createDragbars), a.isArray(d.createHandles) && q(d.createHandles), d.drawBorders && a.isArray(d.createBorders) && p(d.createBorders), a(document).bind("touchstart.jcrop-ios", function (b) {
                    a(b.currentTarget).hasClass("jcrop-tracker") && b.stopPropagation()
                });
                var M = z().mousedown(r("move")).css({
                    cursor: "move",
                    position: "absolute",
                    zIndex: 360
                });
                return _.support && M.bind("touchstart.jcrop", _.createDragger("move")), J.append(M), F(), {
                    updateVisible: w,
                    update: x,
                    release: B,
                    refresh: v,
                    isAwake: function () {
                        return b
                    },
                    setCursor: function (a) {
                        M.css("cursor", a)
                    },
                    enableHandles: D,
                    enableOnly: function () {
                        j = !0
                    },
                    showHandles: C,
                    disableHandles: F,
                    animMode: G,
                    setBgOpacity: y,
                    done: H
                }
            }(),
            bd = function () {
                function f() {
                    N.css({
                        zIndex: 450
                    }), _.support && a(document).bind("touchmove.jcrop", k).bind("touchend.jcrop", m), e && a(document).bind("mousemove.jcrop", h).bind("mouseup.jcrop", i)
                }
                function g() {
                    N.css({
                        zIndex: 290
                    }), a(document).unbind(".jcrop")
                }
                function h(a) {
                    return b(l(a)), !1
                }
                function i(a) {
                    return a.preventDefault(), a.stopPropagation(), X && (X = !1, c(l(a)), bc.isAwake() && d.onSelect.call(bt, t(ba.getFixed())), g(), b = function () {}, c = function () {}), !1
                }
                function j(a, d) {
                    return X = !0, b = a, c = d, f(), !1
                }
                function k(a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, h(a)
                }
                function m(a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, i(a)
                }
                function n(a) {
                    N.css("cursor", a)
                }
                var b = function () {},
                    c = function () {},
                    e = d.trackDocument;
                return e || N.mousemove(h).mouseup(i).mouseout(i), E.before(N), {
                    activateHandlers: j,
                    setCursor: n
                }
            }(),
            be = function () {
                function e() {
                    d.keySupport && (b.show(), b.focus())
                }
                function f(a) {
                    b.hide()
                }
                function h(a, b, c) {
                    d.allowMove && (ba.moveOffset([b, c]), bc.updateVisible(!0)), a.preventDefault(), a.stopPropagation()
                }
                function i(a) {
                    if (a.ctrlKey || a.metaKey) {
                        return !0
                    }
                    Z = a.shiftKey ? !0 : !1;
                    var b = Z ? 10 : 1;
                    switch (a.keyCode) {
                        case 37:
                            h(a, -b, 0);
                            break;
                        case 39:
                            h(a, b, 0);
                            break;
                        case 38:
                            h(a, 0, -b);
                            break;
                        case 40:
                            h(a, 0, b);
                            break;
                        case 27:
                            d.allowSelect && bc.release();
                            break;
                        case 9:
                            return !0
                    }
                    return !1
                }
                var b = a('<input type="radio" />').css({
                        position: "fixed",
                        left: "-120px",
                        width: "12px"
                    }),
                    c = a("<div />").css({
                        position: "absolute",
                        overflow: "hidden"
                    }).append(b);
                return d.keySupport && (b.keydown(i).blur(f), g || !d.fixedSupport ? (b.css({
                    position: "absolute",
                    left: "-20px"
                }), c.append(b).insertBefore(E)) : b.insertBefore(E)), {
                    watchKeys: e
                }
            }();
        _.support && N.bind("touchstart.jcrop", _.newSelection), K.hide(), bs(!0);
        var bt = {
            setImage: bq,
            animateTo: bg,
            setSelect: bh,
            setOptions: bl,
            tellSelect: bj,
            tellScaled: bk,
            setClass: bf,
            disable: bm,
            enable: bn,
            cancel: bo,
            release: bc.release,
            destroy: bp,
            focus: be.watchKeys,
            getBounds: function () {
                return [F * U, G * V]
            },
            getWidgetSize: function () {
                return [F, G]
            },
            getScaleFactor: function () {
                return [U, V]
            },
            getOptions: function () {
                return d
            },
            ui: {
                holder: H,
                selection: L
            }
        };
        return a.browser.msie && H.bind("selectstart", function () {
            return !1
        }), B.data("Jcrop", bt), bt
    }, a.fn.Jcrop = function (b, c) {
        var d;
        return this.each(function () {
            if (a(this).data("Jcrop")) {
                if (b === "api") {
                    return a(this).data("Jcrop")
                }
                a(this).data("Jcrop").setOptions(b)
            } else {
                this.tagName == "IMG" ? a.Jcrop.Loader(this, function () {
                    a(this).css({
                        display: "block",
                        visibility: "hidden"
                    }), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d)
                }) : (a(this).css({
                    display: "block",
                    visibility: "hidden"
                }), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d))
            }
        }), this
    }, a.Jcrop.Loader = function (b, c, d) {
        function g() {
            f.complete ? (e.unbind(".jcloader"), a.isFunction(c) && c.call(f)) : window.setTimeout(g, 50)
        }
        var e = a(b),
            f = e[0];
        e.bind("load.jcloader", g).bind("error.jcloader", function (b) {
            e.unbind(".jcloader"), a.isFunction(d) && d.call(f)
        }), f.complete && a.isFunction(c) && (e.unbind(".jcloader"), c.call(f))
    }, a.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: 0.6,
        bgFade: !1,
        borderOpacity: 0.4,
        handleOpacity: 0.5,
        handleSize: 7,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {},
        onSelect: function () {},
        onDblClick: function () {},
        onRelease: function () {}
    }
})(jQuery);
(function (window) {
    var P_URL = "/pixel/p.php";
    var R = {
        _state: {},
        _sd: {
            r: 163
        }
    };
    (function () {
        try {
            var d = JSON.parse(window.name);
            if (typeof d === "object" && d.rtr === 163) {
                R._sd = d
            }
        } catch (e) {}
        if (!R._sd.tabId) {
            R._sd.tabId = Math.round(Math.random() * 65536)
        }
        var f = function () {
            window.name = JSON.stringify(R._sd)
        };
        if (window.addEventListener) {
            window.addEventListener("unload", f, false)
        } else {
            if (window.attachEvent) {
                window.attachEvent("onunload", f)
            }
        }
        var RTR_ID = $.cookie("RTR_ID");
        var RTR_SESS = $.cookie("RTR_SESS");
        if (!RTR_ID) {
            var date = new Date();
            var expirationTime = date.getTime() + (2 * 365 * 24 * 60 * 60 * 1000);
            date.setTime(expirationTime);
            $.cookie("RTR_ID", guid(), {
                path: "/",
                expires: date
            })
        }
        if (!RTR_SESS) {
            $.cookie("RTR_SESS", guid() + "." + new Date().getTime(), {
                path: "/"
            })
        }
    })();

    function S4() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
    }
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() + "-" + new Date().getTime())
    }
    R.init = function (state) {
        $.extend(R._state, state);
        R._state.pageId = new Date().getTime() + "" + Math.round(Math.random() * 4096)
    };
    R.set = function (key, value) {
        R._state[key] = value
    };
    R.get = function (key) {
        if (R._state[key]) {
            return R._state[key]
        }
        return null
    };
    R.jsSession = function (key, val) {
        if (typeof val === "undefined") {
            return this._sd[key]
        } else {
            if (val === null) {
                delete this._sd[key]
            } else {
                this._sd[key] = val
            }
        }
    };
    R.log = function (objectType, options) {
        var d = {
            url: window.location.pathname,
            seq: new Date().getTime(),
            tabId: R.jsSession("tabId"),
            pageId: R._state.pageId,
            object_type: objectType,
            uid: R._state.uid
        };
        d.pageType = R._state.pageType;
        $.extend(d, options);
        $.post(P_URL, d)
    };
    window.R = R
})(window);
R.init({
    pageType: ''
});
var setUserId = function (user_id) {
    R.set("uid", user_id)
};
if (typeof (RTR) !== "undefined" && RTR && RTR.UX && RTR.UX.user && RTR.UX.user.basicUserProfile) {
    setUserId(RTR.UX.user.basicUserProfile.userId)
}
$(document).bind("userDataReady", function () {
    if (rtr_prop.user) {
        if (rtr_prop.user.userId) {
            setUserId(rtr_prop.user.userId || 0)
        } else {
            setUserId(rtr_prop.user && rtr_prop.user.basicUserProfile ? rtr_prop.user.basicUserProfile.userId : 0)
        }
    }
});
ClientStorage = function (clientStorage, namespace) {
    this.enabled = typeof (Storage) !== "undefined";
    this.clientStorage = clientStorage;
    this.namespace = namespace
};
ClientStorage.prototype = (function () {
    return {
        key: function (key) {
            return this.namespace + ">" + key
        },
        get: function (key) {
            if (!this.enabled) {
                return undefined
            }
            key = this.key(key);
            return JSON.parse(this.clientStorage.getItem(key))
        },
        set: function (key, val) {
            if (!this.enabled) {
                return undefined
            }
            key = this.key(key);
            this.clientStorage.setItem(key, JSON.stringify(val));
            return val
        },
        remove: function (key) {
            if (!this.enabled) {
                return undefined
            }
            var val;
            key = this.key(key);
            val = this.clientStorage.getItem(key);
            this.clientStorage.removeItem(key);
            return val
        },
        iterate: function (fn, scope) {
            if (!this.enabled) {
                return undefined
            }
            var cs = this.clientStorage,
                key, keys, ct = 0;
            for (var i = 0; i < cs.length; i++) {
                key = cs.key(i);
                keys = key.split(">");
                if ((keys.length == 2) && (keys[0] == this.namespace)) {
                    fn.call(scope || this, keys[1], JSON.parse(cs.getItem(key)));
                    ct++
                }
            }
            return ct
        }
    }
})();
LocalStorage = function (namespace) {
    this.namespace = namespace;
    ClientStorage.call(this, window.localStorage, namespace)
};
LocalStorage.prototype = new ClientStorage();
LocalStorage.prototype.constructor = LocalStorage;
SessionStorage = function (namespace) {
    this.namespace = namespace;
    ClientStorage.call(this, window.sessionStorage, namespace)
};
SessionStorage.prototype = new ClientStorage();
SessionStorage.prototype.constructor = SessionStorage;
RtrUxExperience = function () {
    this.formDataStore = new LocalStorage("ux-formdata")
};
RtrUxExperience.prototype = (function () {
    return {
        storeFormDataForPreload: function (selector) {
            var data = {};
            $(selector).find("input, textarea, select").each(function () {
                var $this = $(this);
                data[$this.attr("name")] = $this.val()
            });
            this.formDataStore.set(selector, data)
        },
        preloadFormDataFromStore: function (selector) {
            var data = this.formDataStore.get(selector);
            if (!data) {
                return false
            }
            return this.preloadFormData(selector, data)
        },
        preloadFormData: function (selector, data) {
            if (!data) {
                return false
            }
            var $form = $(selector),
                $elements = {};
            $form.find("input, textarea, select").each(function () {
                var $this = $(this);
                $elements[$this.attr("name")] = $this
            });
            for (var i in data) {
                if (data.hasOwnProperty(i) && $elements[i]) {
                    if ($elements[i].val() || String(data[i])) {
                        $elements[i].val(data[i]);
                        if ($elements[i].is("select")) {
                            $elements[i].trigger("change")
                        }
                    }
                }
            }
            return true
        }
    }
})();
RtrUx = function (rtrUx) {
    this.init(rtrUx)
};
RtrUx.prototype = (function () {
    function __callIfFunction() {
        var fn = Array.prototype.shift.apply(arguments);
        return !!fn && fn.constructor == Function && fn.apply(this, arguments)
    }
    function __hasData(obj) {
        if (obj == null) {
            return false
        }
        if (obj.length) {
            return true
        }
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return true
            }
        }
        return false
    }
    function __logExperimentData() {
        if (!this.hasExperiments()) {
            return
        }
        var curatedExps = [],
            exps = this.experiments.exp || {},
            segs = this.experiments.seg || [];
        for (var i in exps) {
            if (exps.hasOwnProperty(i)) {
                curatedExps.push([parseInt(i, 10), parseInt(exps[i], 10)])
            }
        }
        var segmentsString = JSON.stringify(segs),
            experimentsString = JSON.stringify(curatedExps),
            unchangedFromPreviousCall = this._previousSegmentsString === segmentsString && this._previousExperimentsString === experimentsString;
        if (unchangedFromPreviousCall) {
            return
        }
        var obj = {
            object_type: "experiment",
            action: "experiment_payload",
            segments: segmentsString,
            experiments: experimentsString
        };
        R.log("top_nav", obj);
        this._previousSegmentsString = segmentsString;
        this._previousExperimentsString = experimentsString
    }
    return {
        experience: new RtrUxExperience(),
        constants: {
            Experiment: {
                Lightbox: 1,
                OurRunwayAnon: 2,
                OurRunwayIdentified: 3,
                OurRunwayAll: 4,
                SemTest: 6,
                YouMayAlsoLike: 7,
                HomeSearchCallToAction: 9,
                RecommendedForYou: 10,
                CheckoutBanner: 11,
                SemRegistration: 12,
                AccessorySideCarousel: 13,
                LoyaltyOffer: 14,
                WlmReviews: 15,
                UrgencyMessaging: 16,
                HeartsPageRecommendation: 18
            },
            Treatment: {
                WlmReviews: {
                    SansWlmReviews: 1,
                    WithWlmReviews: 2
                }
            }
        },
        init: function (rtrUx) {
            var body = document.getElementsByTagName("body")[0];
            for (var i in rtrUx) {
                if (rtrUx.hasOwnProperty(i)) {
                    this[i] = rtrUx[i]
                }
            }
            if (body && this.hasExperiments()) {
                var exp = this.getExperiments(),
                    classes = body.className.replace(/[ ]?experiment\-[0-9]+\-[0-9]+/g, "").replace(/[ ]?auth\-status\-[^ ]+/g, "").split(" ");
                for (var i in exp) {
                    if (exp.hasOwnProperty(i)) {
                        classes.push("experiment-" + i + "-" + exp[i])
                    }
                }
                classes.push("auth-status-" + this.auth_status);
                body.className = classes.join(" ")
            }
            __logExperimentData.call(this)
        },
        hasUserData: function () {
            return !!this && __hasData(this.user)
        },
        hasProfile: function () {
            return this.hasUserData() && __hasData(this.user.basicUserProfile)
        },
        hasExperiments: function () {
            return !!this && this.experiments && __hasData(this.experiments.exp)
        },
        hasExperiment: function (experimentId) {
            return this.hasExperiments() && experimentId in this.experiments.exp
        },
        hasExperimentTreatment: function (experimentId, treatmentId) {
            return this.hasExperiment(experimentId) && this.experiments.exp[experimentId] == treatmentId
        },
        getExperimentTreatment: function (experimentId) {
            return this.hasExperiment(experimentId) ? this.experiments.exp[experimentId] : null
        },
        getExperiments: function () {
            return this.hasExperiments() ? this.experiments.exp : []
        },
        getUserId: function () {
            return this.hasProfile() ? this.user.basicUserProfile.userId : rtr_prop.uid
        },
        getProfile: function () {
            return this.hasProfile() ? this.user.basicUserProfile : null
        },
        getViewedDresses: function () {
            var styles = [];
            if (this.user && this.user.viewedStyles) {
                styles = this.user.viewedStyles
            } else {
                if (localStorage && localStorage.recentItemsCarousel) {
                    styles = JSON.parse(localStorage.recentItemsCarousel)
                }
            }
            return styles
        },
        isDrupal: function () {
            return !this.isRuby()
        },
        isRuby: function () {
            return !!this.auth_status
        },
        hasRackAvailability: function () {
            return __hasData(this.rack_availability)
        },
        getRackAvailability: function () {
            return this.rack_availability
        },
        isFeaturedReviewer: function () {
            return this.hasProfile() && this.getProfile().featuredReviewer
        },
        isAdmin: function () {
            return this.hasProfile() && !! this.getProfile().admin
        },
        fetchUserData: function (opts) {
            var _this = this;
            opts = opts || {};
            var fnSuccess = opts.success,
                fnError = opts.error;
            $.ajax($.extend(opts, {
                url: rtr_prop.appPath + "/personalization",
                type: "GET",
                dataType: "json",
                cache: false,
                success: function (data, status, jq) {
                    if (status == "success") {
                        _this.init(data);
                        __callIfFunction.call(_this, _this.hasUserData() ? fnSuccess : fnError, _this.user, data, status, jq)
                    } else {
                        Airbrake.notify("User Data request failed " + status, "header.js", 291);
                        __callIfFunction.call(_this, fnError, _this.user, data, status, jq)
                    }
                }
            }))
        },
        saveUserProfile: function (data, opts) {
            if (!__hasData(data)) {
                return
            }
            var postData = {};
            for (var i in data) {
                if (data.hasOwnProperty(i) && data[i] !== null && data[i] !== undefined && data[i] !== "") {
                    postData[i] = data[i]
                }
            }
            var _this = this;
            if (__hasData(postData)) {
                $.ajax($.extend(opts, {
                    type: "POST",
                    url: rtr_prop.appPath + "/fashionista/profile",
                    data: postData,
                    dataType: "json",
                    timeout: 3000,
                    success: function (data, status, jq) {
                        if (data.success) {
                            if (!_this.hasUserData()) {
                                _this.user = {}
                            }
                            if (!_this.hasProfile()) {
                                _this.user.basicUserProfile = {}
                            }
                            _this.user.basicUserProfile = $.extend(_this.user.basicUserProfile, data.profile)
                        }
                        if (opts) {
                            __callIfFunction.call(_this, opts.success, _this.user, data, status, jq)
                        }
                    }
                }))
            }
        },
        logExperiment: function (experimentId) {
            if (!this.hasExperiment(experimentId)) {
                return
            }
            R.log("experiment", {
                action: "experiment_applied",
                segments: JSON.stringify(this.experiments.seg),
                experiment: JSON.stringify([parseInt(experimentId, 10), parseInt(this.experiments.exp[experimentId], 10)])
            })
        }
    }
})();
var RTR = RTR || {};
RTR.UX = new RtrUx(RTR.UX || {});
RTR.UX.init();
var RtrEnvironment = (function () {
    return {
        Development: "development",
        Test: "test",
        QA: "qa",
        Stage: "stage",
        Production: "production"
    }
})();
RtrPage = function (rtrPage) {
    this.init(rtrPage)
};
RtrPage.prototype = (function () {
    function __callIfFunction() {
        var fn = Array.prototype.shift.apply(arguments);
        return !!fn && fn.constructor == Function && fn.apply(this, arguments)
    }
    function __hasData(obj) {
        if (obj === null || obj === undefined) {
            return false
        }
        if (obj.length) {
            return true
        }
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return true
            }
        }
        return false
    }
    return {
        init: function (rtrPage) {
            var body = document.getElementsByTagName("body")[0];
            for (var i in rtrPage) {
                if (rtrPage.hasOwnProperty(i)) {
                    this[i] = rtrPage[i]
                }
            }
        },
        appName: function () {
            return this.appName || "storefront"
        },
        appPath: function () {
            return this.appPath || "/"
        },
        getEnvironment: function () {
            return this.environment || RtrEnvironment.Development
        },
        isEnvironment: function (environment) {
            return this.getEnvironment() == environment
        },
        isDevelopment: function () {
            return this.isEnvironment(RtrEnvironment.Development)
        },
        isTest: function () {
            return this.isEnvironment(RtrEnvironment.Test)
        },
        isQa: function () {
            return this.isEnvironment(RtrEnvironment.QA)
        },
        isStage: function () {
            return this.isEnvironment(RtrEnvironment.Stage)
        },
        isProduction: function () {
            return this.isEnvironment(RtrEnvironment.Production)
        }
    }
})();
var RTR = RTR || {};
RTR.Page = new RtrPage(RTR.Page || {});
RTR.Page.init();

function objectToAttributes(obj) {
    var attributes = "";
    if (!obj) {
        return attributes
    }
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            var value = isNaN(obj[i]) ? obj[i].replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : obj[i];
            attributes += " " + i + '="' + value + '"'
        }
    }
    return attributes
}
function elementInViewport(el, offset) {
    if (!offset) {
        offset = {}
    }
    offset.top = el.offsetTop;
    offset.left = el.offsetLeft;
    offset.width = el.offsetWidth;
    offset.height = el.offsetHeight;
    while (el.offsetParent) {
        el = el.offsetParent;
        offset.top += el.offsetTop;
        offset.left += el.offsetLeft
    }
    return (offset.top < (window.pageYOffset + window.innerHeight) && offset.left < (window.pageXOffset + window.innerWidth) && (offset.top + offset.height) > window.pageYOffset && (offset.left + offset.width) > window.pageXOffset)
}
var PageSpeed = {
    TransparentPixel: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
    LazyLoadClassname: "lazy-load",
    LazyLoadedClassname: "loaded-lazily",
    isLazyLoadImage: function (img) {
        return img.className && img.className.indexOf(PageSpeed.LazyLoadClassname) >= 0
    },
    image: function (src, attributes, loadLazily) {
        if (!src) {
            return ""
        }
        if (!attributes) {
            attributes = {}
        }
        if (loadLazily) {
            attributes["data-src"] = src;
            attributes.src = PageSpeed.TransparentPixel;
            attributes["class"] = (attributes["class"] || "") + " " + PageSpeed.LazyLoadClassname
        } else {
            attributes.src = src
        }
        return "<img " + objectToAttributes(attributes) + "/>"
    },
    loadLazyImage: function (img) {
        if (!img || !PageSpeed.isLazyLoadImage(img)) {
            return
        }
        var src = img.getAttribute("data-src");
        if (!src) {
            return
        }
        img.src = src;
        img.className = img.className.replace(PageSpeed.LazyLoadClassname, PageSpeed.LazyLoadedClassname)
    },
    _lazyLoadImages: [],
    addLazyLoadImage: function (img) {
        PageSpeed._lazyLoadImages.push(img)
    }
};
var fnOnload = window.onload,
    fnOnscroll = window.onscroll;
window.onload = function () {
    if (typeof (fnOnload) == "function") {
        fnOnload()
    }
    var PAGE_LOAD_HARD_CAP = window.pageYOffset + 1600,
        all_images = document.getElementsByTagName("img");
    for (var i = 0, ct = all_images.length; i < ct; i++) {
        if (PageSpeed.isLazyLoadImage(all_images[i])) {
            var offset = {},
                img = all_images[i];
            if (elementInViewport(img, offset) && offset.top < PAGE_LOAD_HARD_CAP) {
                PageSpeed.loadLazyImage(img)
            } else {
                PageSpeed.addLazyLoadImage(img)
            }
        }
    }
    window.onscroll = function () {
        if (typeof (fnOnscroll) == "function") {
            fnOnscroll()
        }
        for (var i = 0, ct = PageSpeed._lazyLoadImages.length; i < ct; i++) {
            var img = PageSpeed._lazyLoadImages[i];
            if (PageSpeed.isLazyLoadImage(img) && elementInViewport(img)) {
                PageSpeed.loadLazyImage(img)
            }
        }
    }
};
(function ($) {
    $(document).bind("pdp_detail_images_ready", function () {
        $(".cloud-zoom, .cloud-zoom-gallery").CloudZoom()
    });

    function format(str) {
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace("%" + (i - 1), arguments[i])
        }
        return str
    }
    function CloudZoom(jWin, opts) {
        var sImg = $("img", jWin);
        var img1;
        var img2;
        var zoomDiv = null;
        var $mouseTrap = null;
        var lens = null;
        var $tint = null;
        var softFocus = null;
        var $ie6Fix = null;
        var zoomImage;
        var controlTimer = 0;
        var cw, ch;
        var destU = 0;
        var destV = 0;
        var currV = 0;
        var currU = 0;
        var filesLoaded = 0;
        var mx, my;
        var ctx = this,
            zw;
        setTimeout(function () {
            if ($mouseTrap === null) {
                var w = jWin.width();
                jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>', w / 3, (w / 2) - (w / 6))).find(":last").css("opacity", 0.5)
            }
        }, 200);
        var ie6FixRemove = function () {
            if ($ie6Fix !== null) {
                $ie6Fix.remove();
                $ie6Fix = null
            }
        };
        this.removeBits = function () {
            if (lens) {
                lens.remove();
                lens = null
            }
            if ($tint) {
                $tint.remove();
                $tint = null
            }
            if (softFocus) {
                softFocus.remove();
                softFocus = null
            }
            ie6FixRemove();
            $(".cloud-zoom-loading", jWin.parent()).remove()
        };
        this.destroy = function () {
            jWin.data("zoom", null);
            if ($mouseTrap) {
                $mouseTrap.unbind();
                $mouseTrap.remove();
                $mouseTrap = null
            }
            if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null
            }
            this.removeBits()
        };
        this.fadedOut = function () {
            if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null
            }
            this.removeBits()
        };
        this.controlLoop = function () {
            if (lens) {
                var x = (mx - sImg.offset().left - (cw * 0.5)) >> 0;
                var y = (my - sImg.offset().top - (ch * 0.5)) >> 0;
                if (x < 0) {
                    x = 0
                } else {
                    if (x > (sImg.outerWidth() - cw)) {
                        x = (sImg.outerWidth() - cw)
                    }
                }
                if (y < 0) {
                    y = 0
                } else {
                    if (y > (sImg.outerHeight() - ch)) {
                        y = (sImg.outerHeight() - ch)
                    }
                }
                lens.css({
                    left: x,
                    top: y
                });
                lens.css("background-position", (-x) + "px " + (-y) + "px");
                destU = (((x) / sImg.outerWidth()) * zoomImage.width) >> 0;
                destV = (((y) / sImg.outerHeight()) * zoomImage.height) >> 0;
                currU += (destU - currU) / opts.smoothMove;
                currV += (destV - currV) / opts.smoothMove;
                zoomDiv.css("background-position", (-(currU >> 0) + "px ") + (-(currV >> 0) + "px"))
            }
            controlTimer = setTimeout(function () {
                ctx.controlLoop()
            }, 30)
        };
        this.init2 = function (img, id) {
            filesLoaded++;
            if (id === 1) {
                zoomImage = img
            }
            if (filesLoaded === 2) {
                this.init()
            }
        };
        this.init = function () {
            $(".cloud-zoom-loading", jWin.parent()).remove();
            $mouseTrap = jWin.parent().append(format("<div class='mousetrap' style='background-image:url(/rtr/images/iefix.png);z-index:100;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;'></div>", sImg.outerWidth(), sImg.outerHeight(), 0, 0)).find(":last");
            $mouseTrap.bind("mousemove", this, function (event) {
                mx = event.pageX;
                my = event.pageY
            });
            $mouseTrap.bind("mouseleave", this, function (event) {
                clearTimeout(controlTimer);
                if (lens) {
                    lens.fadeOut(299)
                }
                if ($tint) {
                    $tint.fadeOut(299)
                }
                if (softFocus) {
                    softFocus.fadeOut(299)
                }
                zoomDiv.fadeOut(300, function () {
                    ctx.fadedOut()
                });
                return false
            });
            $mouseTrap.bind("mouseenter", this, function (event) {
                mx = event.pageX;
                my = event.pageY;
                zw = event.data;
                if (zoomDiv) {
                    zoomDiv.stop(true, false);
                    zoomDiv.remove()
                }
                var xPos = opts.adjustX,
                    yPos = opts.adjustY;
                var siw = sImg.outerWidth();
                var sih = sImg.outerHeight();
                var w = opts.zoomWidth;
                var h = opts.zoomHeight;
                if (opts.zoomWidth == "auto") {
                    w = siw
                }
                if (opts.zoomHeight == "auto") {
                    h = sih
                }
                var appendTo = jWin.parent();
                switch (opts.position) {
                    case "top":
                        yPos -= h;
                        break;
                    case "right":
                        xPos += siw;
                        break;
                    case "bottom":
                        yPos += sih;
                        break;
                    case "left":
                        xPos -= w;
                        break;
                    case "inside":
                        w = siw;
                        h = sih;
                        break;
                    default:
                        appendTo = $("#" + opts.position);
                        if (!appendTo.length) {
                            appendTo = jWin;
                            xPos += siw;
                            yPos += sih
                        } else {
                            w = appendTo.innerWidth();
                            h = appendTo.innerHeight()
                        }
                }
                zoomDiv = appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>', xPos, yPos, w, h, zoomImage.src)).find(":last");
                if (sImg.attr("title") && opts.showTitle) {
                    zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>', sImg.attr("title"))).find(":last").css("opacity", opts.titleOpacity)
                }
                if ($.browser.msie && $.browser.version < 7) {
                    $ie6Fix = $('<iframe frameborder="0" src="#"></iframe>').css({
                        position: "absolute",
                        left: xPos,
                        top: yPos,
                        zIndex: 99,
                        width: w,
                        height: h
                    }).insertBefore(zoomDiv)
                }
                zoomDiv.fadeIn(500);
                if (lens) {
                    lens.remove();
                    lens = null
                }
                cw = (sImg.outerWidth() / zoomImage.width) * zoomDiv.width();
                ch = (sImg.outerHeight() / zoomImage.height) * zoomDiv.height();
                lens = jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>", cw, ch)).find(":last");
                $mouseTrap.css("cursor", lens.css("cursor"));
                var noTrans = false;
                if (opts.tint) {
                    lens.css("background", 'url("' + sImg.attr("src") + '")');
                    $tint = jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', sImg.outerWidth(), sImg.outerHeight(), opts.tint)).find(":last");
                    $tint.css("opacity", opts.tintOpacity);
                    noTrans = true;
                    $tint.fadeIn(500)
                }
                if (opts.softFocus) {
                    lens.css("background", 'url("' + sImg.attr("src") + '")');
                    softFocus = jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', sImg.outerWidth() - 2, sImg.outerHeight() - 2, opts.tint)).find(":last");
                    softFocus.css("background", 'url("' + sImg.attr("src") + '")');
                    softFocus.css("opacity", 0.5);
                    noTrans = true;
                    softFocus.fadeIn(500)
                }
                if (!noTrans) {
                    lens.css("opacity", opts.lensOpacity)
                }
                if (opts.position !== "inside") {
                    lens.fadeIn(500)
                }
                zw.controlLoop();
                return
            })
        };
        img1 = new Image();
        $(img1).load(function () {
            ctx.init2(this, 0)
        });
        img1.src = sImg.attr("src");
        img2 = new Image();
        $(img2).load(function () {
            ctx.init2(this, 1)
        });
        img2.src = jWin.attr("href")
    }
    $.fn.CloudZoom = function (options) {
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (e) {}
        this.each(function () {
            var relOpts, opts;
            eval("var	a = {" + $(this).attr("rel") + "}");
            relOpts = a;
            if ($(this).is(".cloud-zoom")) {
                $(this).css({
                    position: "relative",
                    display: "block"
                });
                $("img", $(this)).css({
                    display: "block"
                });
                if ($(this).parent().attr("id") != "wrap") {
                    $(this).wrap('<div id="wrap" style="top:0px;z-index:100;position:relative;"></div>')
                }
                opts = $.extend({}, $.fn.CloudZoom.defaults, options);
                opts = $.extend({}, opts, relOpts);
                $(this).data("zoom", new CloudZoom($(this), opts))
            } else {
                if ($(this).is(".cloud-zoom-gallery")) {
                    opts = $.extend({}, relOpts, options);
                    $(this).data("relOpts", opts);
                    $(this).bind("click", $(this), function (event) {
                        var data = event.data.data("relOpts");
                        if (typeof (logClick) === "function") {
                            logClick($(this))
                        }
                        $(document).trigger("alt_image_clicked");
                        $("#" + data.useZoom).data("zoom").destroy();
                        $("#" + data.useZoom).attr("href", event.data.attr("href"));
                        $("#" + data.useZoom + " img").attr("src", event.data.data("relOpts").smallImage);
                        $("#" + event.data.data("relOpts").useZoom).CloudZoom();
                        return false
                    })
                }
            }
        });
        return this
    };
    $.fn.CloudZoom.defaults = {
        zoomWidth: "auto",
        zoomHeight: "auto",
        position: "right",
        tint: false,
        tintOpacity: 0.5,
        lensOpacity: 0.5,
        softFocus: false,
        smoothMove: 3,
        showTitle: true,
        titleOpacity: 0.5,
        adjustX: 0,
        adjustY: 0
    }
})(jQuery);
(function ($) {
    var defaultOption = {
        appendToBody: false,
        jScrollPane: null,
        onInit: null,
        onFocus: null,
        onBlur: null,
        onOpen: null,
        onClose: null,
        onChange: null,
        onDestroy: null
    };
    var allSelects = [];
    $.browser.mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
    $.browser.operamini = Object.prototype.toString.call(window.operamini) === "[object OperaMini]";

    function CoreUISelect(__elem, __options, __templates) {
        this.domSelect = __elem;
        this.settings = __options || defaultOption;
        this.isSelectShow = false;
        this.isSelectFocus = false;
        this.isJScrollPane = this.isJScrollPane();
        this.templates = __templates || {
            select: {
                container: '<div class="b-core-ui-select"></div>',
                value: '<span class="b-core-ui-select__value"></span>',
                button: '<span class="b-core-ui-select__button"></span>'
            },
            dropdown: {
                container: '<div class="b-core-ui-select__dropdown"></div>',
                wrapper: '<div class="b-core-ui-select__dropdown__wrap"></div>',
                list: '<ul class="b-core-ui-select__dropdown__list"></ul>',
                optionLabel: '<li class="b-core-ui-select__dropdown__label"></li>',
                item: '<li class="b-core-ui-select__dropdown__item"></li>'
            }
        };
        this.init(this.settings)
    }
    CoreUISelect.prototype.init = function () {
        if ($.browser.operamini) {
            return this
        }
        this.buildUI();
        this.hideDomSelect();
        if (this.domSelect.is(":disabled")) {
            this.select.addClass("disabled");
            return this
        }
        if (this.isJScrollPane) {
            this.buildJScrollPane()
        }
        this.bindUIEvents();
        this.settings.onInit && this.settings.onInit.apply(this, [this.domSelect, "init"])
    };
    CoreUISelect.prototype.buildUI = function () {
        this.select = $(this.templates.select.container).insertBefore(this.domSelect);
        this.selectValue = $(this.templates.select.value).appendTo(this.select);
        this.selectButton = $(this.templates.select.button).appendTo(this.select);
        this.dropdown = $(this.templates.dropdown.container);
        this.dropdownWrapper = $(this.templates.dropdown.wrapper).appendTo(this.dropdown);
        this.settings.appendToBody ? this.dropdown.appendTo($("body")) : this.dropdown.insertBefore(this.domSelect);
        this.dropdownList = $(this.templates.dropdown.list).appendTo(this.dropdownWrapper);
        this.domSelect.find("option").each($.proxy(this, "addItems"));
        this.dropdownItem = this.dropdown.find("." + $(this.templates.dropdown.item).attr("class"));
        this.dropdownItem.filter(":first-child").addClass("first");
        this.dropdownItem.filter(":last-child").addClass("last");
        this.addOptionGroup();
        this.setSelectValue(this.getSelectedItem().text());
        this.updateDropdownPosition();
        this.currentItemOfDomSelect = this.currentItemOfDomSelect || this.domSelect.find("option:selected")
    };
    CoreUISelect.prototype.hideDomSelect = function () {
        this.domSelect.addClass("b-core-ui-select__select_state_hide");
        this.domSelect.css({
            top: this.select.position().top,
            left: this.select.position().left
        })
    };
    CoreUISelect.prototype.showDomSelect = function () {
        this.domSelect.css({
            top: "auto",
            left: "auto"
        });
        this.domSelect.removeClass("b-core-ui-select__select_state_hide")
    };
    CoreUISelect.prototype.bindUIEvents = function () {
        this.domSelect.bind("focus", $.proxy(this, "onFocus"));
        this.domSelect.bind("blur", $.proxy(this, "onBlur"));
        this.domSelect.bind("change", $.proxy(this, "onChange"));
        if ($.browser.mobile) {
            this.domSelect.bind("change", $.proxy(this, "changeDropdownData"))
        }
        this.select.bind("click", $.proxy(this, "onSelectClick"));
        this.dropdownItem.bind("click", $.proxy(this, "onDropdownItemClick"))
    };
    CoreUISelect.prototype.getCurrentIndexOfItem = function (__item) {
        return this.domSelect.find("option").index($(this.domSelect).find("option:selected"))
    };
    CoreUISelect.prototype.scrollToCurrentDropdownItem = function (__item) {
        if (this.dropdownWrapper.data("jsp")) {
            this.dropdownWrapper.data("jsp").scrollToElement(__item);
            return this
        }
        $(this.dropdownWrapper).scrollTop($(this.dropdownWrapper).scrollTop() + __item.position().top - $(this.dropdownWrapper).height() / 2 + __item.height() / 2)
    };
    CoreUISelect.prototype.buildJScrollPane = function () {
        this.dropdownWrapper.wrap($('<div class="j-scroll-pane"></div>'))
    };
    CoreUISelect.prototype.isJScrollPane = function () {
        if (this.settings.jScrollPane) {
            if ($.fn.jScrollPane) {
                return true
            } else {
                throw new Error("jScrollPane no found")
            }
        }
    };
    CoreUISelect.prototype.initJScrollPane = function () {
        this.dropdownWrapper.jScrollPane(this.settings.jScrollPane)
    };
    CoreUISelect.prototype.showDropdown = function () {
        this.domSelect.focus();
        this.settings.onOpen && this.settings.onOpen.apply(this, [this.domSelect, "open"]);
        if ($.browser.mobile) {
            return this
        }
        if (!this.isSelectShow) {
            this.isSelectShow = true;
            this.select.addClass("open");
            this.dropdown.addClass("show").removeClass("hide");
            if (this.isJScrollPane) {
                this.initJScrollPane()
            }
            this.scrollToCurrentDropdownItem(this.dropdownItem.eq(this.getCurrentIndexOfItem()));
            this.updateDropdownPosition()
        }
    };
    CoreUISelect.prototype.hideDropdown = function () {
        if (this.isSelectShow) {
            this.isSelectShow = false;
            this.select.removeClass("open");
            this.dropdown.removeClass("show").addClass("hide");
            this.settings.onClose && this.settings.onClose.apply(this, [this.domSelect, "close"])
        }
        if (this.isSelectFocus) {
            this.domSelect.focus()
        }
    };
    CoreUISelect.prototype.hideAllDropdown = function () {
        for (var i in allSelects) {
            if (allSelects[i].hasOwnProperty(i)) {
                allSelects.dropdown.isSelectShow = false;
                allSelects.dropdown.domSelect.blur();
                allSelects.dropdown.addClass("hide").removeClass("show")
            }
        }
    };
    CoreUISelect.prototype.changeDropdownData = function (event) {
        if ((this.isSelectShow || this.isSelectFocus)) {
            this.currentItemOfDomSelect = this.domSelect.find("option:selected");
            this.dropdownItem.removeClass("selected");
            this.dropdownItem.eq(this.getCurrentIndexOfItem()).addClass("selected");
            this.scrollToCurrentDropdownItem(this.dropdownItem.eq(this.getCurrentIndexOfItem()));
            this.setSelectValue(this.currentItemOfDomSelect.text())
        }
        if ($.browser.mobile) {
            this.settings.onChange && this.settings.onChange.apply(this, [this.domSelect, "change"])
        }
    };
    CoreUISelect.prototype.onDomSelectChange = function (_is) {
        this.domSelect.bind("change", $.proxy(this, "onChange"));
        dispatchEvent(this.domSelect.get(0), "change");
        if (!_is) {
            this.settings.onChange && this.settings.onChange.apply(this, [this.domSelect, "change"])
        }
    };
    CoreUISelect.prototype.addListenerByServicesKey = function (event) {
        if (this.isSelectShow) {
            switch (event.which) {
                case 9:
                case 13:
                case 27:
                    this.hideDropdown();
                    break
            }
        }
    };
    CoreUISelect.prototype.onSelectClick = function () {
        if (!this.isSelectShow) {
            this.showDropdown()
        } else {
            this.hideDropdown()
        }
        return false
    };
    CoreUISelect.prototype.onFocus = function () {
        this.isDocumentMouseDown = false;
        this.isSelectFocus = true;
        this.select.addClass("focus");
        this.settings.onFocus && this.settings.onFocus.apply(this, [this.domSelect, "focus"])
    };
    CoreUISelect.prototype.onBlur = function () {
        if (!this.isDocumentMouseDown) {
            this.isSelectFocus = false;
            this.select.removeClass("focus");
            this.settings.onBlur && this.settings.onBlur.apply(this, [this.domSelect, "blur"])
        }
    };
    CoreUISelect.prototype.onChange = function () {
        this.settings.onChange && this.settings.onChange.apply(this, [this.domSelect, "change"])
    };
    CoreUISelect.prototype.onDropdownItemClick = function (event) {
        var item = $(event.currentTarget);
        if (!(item.hasClass("disabled") || item.hasClass("selected"))) {
            this.domSelect.unbind("change", $.proxy(this, "onChange"));
            var index = this.dropdown.find("." + $(this.templates.dropdown.item).attr("class")).index(item);
            this.dropdownItem.removeClass("selected");
            this.dropdownItem.eq(index).addClass("selected");
            this.domSelect.find("option").removeAttr("selected");
            this.domSelect.find("option").eq(index).attr("selected", true);
            this.setSelectValue(this.getSelectedItem().text());
            this.onDomSelectChange(true)
        }
        this.hideDropdown();
        return false
    };
    CoreUISelect.prototype.onDocumentMouseDown = function (event) {
        this.isDocumentMouseDown = true;
        if ($(event.target).closest(this.select).length == 0 && $(event.target).closest(this.dropdown).length == 0) {
            if ($(event.target).closest("option").length == 0) {
                this.isDocumentMouseDown = false;
                this.hideDropdown()
            }
        }
        return false
    };
    CoreUISelect.prototype.updateDropdownPosition = function () {
        if (this.isSelectShow) {
            if (this.settings.appendToBody) {
                this.dropdown.css({
                    position: "absolute",
                    top: this.select.offset().top + this.select.outerHeight(true),
                    left: this.select.offset().left,
                    "z-index": "9999"
                })
            } else {
                this.dropdown.css({
                    position: "absolute",
                    top: this.select.position().top + this.select.outerHeight(true),
                    left: this.select.position().left,
                    "z-index": "9999"
                })
            }
            var marginDifferenceBySelect = this.select.outerWidth() - this.select.width();
            var marginDifferenceByDropdown = this.dropdown.outerWidth() - this.dropdown.width();
            this.dropdown.width(this.select.outerWidth(true));
            if (this.dropdown.width() == this.select.outerWidth()) {
                this.dropdown.width((this.select.width() + marginDifferenceBySelect) - marginDifferenceByDropdown)
            }
            if (this.isJScrollPane) {
                this.initJScrollPane()
            }
        }
    };
    CoreUISelect.prototype.setSelectValue = function (_text) {
        this.selectValue.text(_text)
    };
    CoreUISelect.prototype.isOptionGroup = function () {
        return this.domSelect.find("optgroup").length > 0
    };
    CoreUISelect.prototype.addOptionGroup = function () {
        var optionGroup = this.domSelect.find("optgroup");
        for (var i = 0; i < optionGroup.length; i++) {
            var index = this.domSelect.find("option").index($(optionGroup[i]).find("option:first-child"));
            $(this.templates.dropdown.optionLabel).text($(optionGroup[i]).attr("label")).insertBefore(this.dropdownItem.eq(index))
        }
    };
    CoreUISelect.prototype.addItems = function (index, el) {
        var el = $(el);
        var item = $(this.templates.dropdown.item).text(el.text());
        if (el.attr("disabled")) {
            item.addClass("disabled")
        }
        if (el.attr("selected")) {
            this.domSelect.find("option").removeAttr("selected");
            item.addClass("selected");
            el.attr("selected", "selected")
        }
        item.appendTo(this.dropdownList)
    };
    CoreUISelect.prototype.getSelectedItem = function () {
        return this.dropdown.find(".selected").eq(0)
    };
    CoreUISelect.prototype.update = function () {
        this.destroy();
        this.init()
    };
    CoreUISelect.prototype.destroy = function () {
        this.domSelect.unbind("focus", $.proxy(this, "onFocus"));
        this.domSelect.unbind("blur", $.proxy(this, "onBlur"));
        this.domSelect.unbind("change", $.proxy(this, "onChange"));
        this.select.unbind("click", $.proxy(this, "onSelectClick"));
        this.dropdownItem.unbind("click", $.proxy(this, "onDropdownItemClick"));
        this.select.remove();
        this.dropdown.remove();
        this.showDomSelect();
        this.settings.onDestroy && this.settings.onDestroy.apply(this, [this.domSelect, "destroy"])
    };
    $.fn.coreUISelect = function (__options, __templates) {
        return this.each(function () {
            var select = $(this).data("coreUISelect");
            if (__options == "destroy" && !select) {
                return
            }
            if (select) {
                __options = (typeof __options == "string" && select[__options]) ? __options : "update";
                select[__options].apply(select);
                if (__options == "destroy") {
                    $(this).removeData("coreUISelect");
                    for (var i = 0; i < allSelects.length; i++) {
                        if (allSelects[i] == select) {
                            allSelects.splice(i, 1);
                            break
                        }
                    }
                }
            } else {
                select = new CoreUISelect($(this), __options, __templates);
                allSelects.push(select);
                $(this).data("coreUISelect", select)
            }
        })
    };

    function dispatchEvent(obj, evt, doc) {
        var doc = doc || document;
        if (obj !== undefined || obj !== null) {
            if (doc.createEvent) {
                var evObj = doc.createEvent("MouseEvents");
                evObj.initEvent(evt, true, false);
                obj.dispatchEvent(evObj)
            } else {
                if (doc.createEventObject) {
                    var evObj = doc.createEventObject();
                    obj.fireEvent("on" + evt, evObj)
                }
            }
        }
    }
    $(document).bind("mousedown", function (event) {
        for (var i = 0; i < allSelects.length; i++) {
            allSelects[i].onDocumentMouseDown(event)
        }
    });
    $(document).bind("keyup", function (event) {
        for (var i = 0; i < allSelects.length; i++) {
            if ($.browser.safari || $.browser.msie || $.browser.opera) {
                allSelects[i].changeDropdownData(event)
            }
            allSelects[i].addListenerByServicesKey(event)
        }
    });
    $(document).bind($.browser.safari ? "keydown" : "keypress", function (event) {
        for (var i = 0; i < allSelects.length; i++) {
            allSelects[i].changeDropdownData(event)
        }
    });
    $(window).bind("resize", function (event) {
        for (var i = 0; i < allSelects.length; i++) {
            allSelects[i].updateDropdownPosition(event)
        }
    })
})(jQuery);
(function ($) {
    $.fn.extend({
        autocomplete: function (urlOrData, options) {
            var isUrl = typeof urlOrData == "string";
            options = $.extend({}, $.Autocompleter.defaults, {
                url: isUrl ? urlOrData : null,
                data: isUrl ? null : urlOrData,
                delay: isUrl ? $.Autocompleter.defaults.delay : 10,
                max: options && !options.scroll ? 10 : 150
            }, options);
            options.highlight = options.highlight ||
                function (value) {
                    return value
                };
            options.formatMatch = options.formatMatch || options.formatItem;
            return this.each(function () {
                new $.Autocompleter(this, options)
            })
        },
        result: function (handler) {
            return this.bind("result", handler)
        },
        search: function (handler) {
            return this.trigger("search", [handler])
        },
        flushCache: function () {
            return this.trigger("flushCache")
        },
        setOptions: function (options) {
            return this.trigger("setOptions", [options])
        },
        unautocomplete: function () {
            return this.trigger("unautocomplete")
        }
    });
    $.Autocompleter = function (input, options) {
        var KEY = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        };
        var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
        var timeout;
        var previousValue = "";
        var cache = $.Autocompleter.Cache(options);
        var hasFocus = 0;
        var lastKeyPressCode;
        var config = {
            mouseDownOnSelect: false
        };
        var select = $.Autocompleter.Select(options, input, selectCurrent, config);
        var blockSubmit;
        $.browser.opera && $(input.form).bind("submit.autocomplete", function () {
            if (blockSubmit) {
                blockSubmit = false;
                return false
            }
        });
        $input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function (event) {
            hasFocus = 1;
            lastKeyPressCode = event.keyCode;
            switch (event.keyCode) {
                case KEY.UP:
                    event.preventDefault();
                    if (select.visible()) {
                        select.prev()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case KEY.DOWN:
                    event.preventDefault();
                    if (select.visible()) {
                        select.next()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case KEY.PAGEUP:
                    event.preventDefault();
                    if (select.visible()) {
                        select.pageUp()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case KEY.PAGEDOWN:
                    event.preventDefault();
                    if (select.visible()) {
                        select.pageDown()
                    } else {
                        onChange(0, true)
                    }
                    break;
                case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
                case KEY.TAB:
                case KEY.RETURN:
                    if (selectCurrent()) {
                        event.preventDefault();
                        blockSubmit = true;
                        return false
                    }
                    break;
                case KEY.ESC:
                    select.hide();
                    break;
                default:
                    clearTimeout(timeout);
                    timeout = setTimeout(onChange, options.delay);
                    break
            }
        }).focus(function () {
                hasFocus++
            }).blur(function () {
                hasFocus = 0;
                if (!config.mouseDownOnSelect) {
                    hideResults()
                }
            }).click(function () {
                if (hasFocus++ > 1 && !select.visible()) {
                    onChange(0, true)
                }
            }).bind("search", function () {
                var fn = (arguments.length > 1) ? arguments[1] : null;

                function findValueCallback(q, data) {
                    var result;
                    if (data && data.length) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].result.toLowerCase() == q.toLowerCase()) {
                                result = data[i];
                                break
                            }
                        }
                    }
                    if (typeof fn == "function") {
                        fn(result)
                    } else {
                        $input.trigger("result", result && [result.data, result.value])
                    }
                }
                $.each(trimWords($input.val()), function (i, value) {
                    request(value, findValueCallback, findValueCallback)
                })
            }).bind("flushCache", function () {
                cache.flush()
            }).bind("setOptions", function () {
                $.extend(options, arguments[1]);
                if ("data" in arguments[1]) {
                    cache.populate()
                }
            }).bind("unautocomplete", function () {
                select.unbind();
                $input.unbind();
                $(input.form).unbind(".autocomplete")
            });

        function selectCurrent() {
            var selected = select.selected();
            if (!selected) {
                return false
            }
            var v = selected.result;
            previousValue = v;
            if (options.multiple) {
                var words = trimWords($input.val());
                if (words.length > 1) {
                    var seperator = options.multipleSeparator.length;
                    var cursorAt = $(input).selection().start;
                    var wordAt, progress = 0;
                    $.each(words, function (i, word) {
                        progress += word.length;
                        if (cursorAt <= progress) {
                            wordAt = i;
                            return false
                        }
                        progress += seperator
                    });
                    words[wordAt] = v;
                    v = words.join(options.multipleSeparator)
                }
                v += options.multipleSeparator
            }
            $input.val(v);
            hideResultsNow();
            $input.trigger("result", [selected.data, selected.value]);
            return true
        }
        function onChange(crap, skipPrevCheck) {
            if (lastKeyPressCode == KEY.DEL) {
                select.hide();
                return
            }
            var currentValue = $input.val();
            if (!skipPrevCheck && currentValue == previousValue) {
                return
            }
            previousValue = currentValue;
            currentValue = lastWord(currentValue);
            if (currentValue.length >= options.minChars) {
                $input.addClass(options.loadingClass);
                if (!options.matchCase) {
                    currentValue = currentValue.toLowerCase()
                }
                request(currentValue, receiveData, hideResultsNow)
            } else {
                stopLoading();
                select.hide()
            }
        }
        function trimWords(value) {
            if (!value) {
                return [""]
            }
            if (!options.multiple) {
                return [$.trim(value)]
            }
            return $.map(value.split(options.multipleSeparator), function (word) {
                return $.trim(value).length ? $.trim(word) : null
            })
        }
        function lastWord(value) {
            if (!options.multiple) {
                return value
            }
            var words = trimWords(value);
            if (words.length == 1) {
                return words[0]
            }
            var cursorAt = $(input).selection().start;
            if (cursorAt == value.length) {
                words = trimWords(value)
            } else {
                words = trimWords(value.replace(value.substring(cursorAt), ""))
            }
            return words[words.length - 1]
        }
        function autoFill(q, sValue) {
            if (options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
                $input.val($input.val() + sValue.substring(lastWord(previousValue).length));
                $(input).selection(previousValue.length, previousValue.length + sValue.length)
            }
        }
        function hideResults() {
            clearTimeout(timeout);
            timeout = setTimeout(hideResultsNow, 200)
        }
        function hideResultsNow() {
            var wasVisible = select.visible();
            select.hide();
            clearTimeout(timeout);
            stopLoading();
            if (options.mustMatch) {
                $input.search(function (result) {
                    if (!result) {
                        if (options.multiple) {
                            var words = trimWords($input.val()).slice(0, -1);
                            $input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""))
                        } else {
                            $input.val("");
                            $input.trigger("result", null)
                        }
                    }
                })
            }
        }
        function receiveData(q, data) {
            if (data && data.length && hasFocus) {
                stopLoading();
                select.display(data, q);
                autoFill(q, data[0].value);
                select.show()
            } else {
                hideResultsNow()
            }
        }
        function request(term, success, failure) {
            if (!options.matchCase) {
                term = term.toLowerCase()
            }
            var data = cache.load(term);
            if (data && data.length) {
                success(term, data)
            } else {
                if ((typeof options.url == "string") && (options.url.length > 0)) {
                    var extraParams = {
                        timestamp: +new Date()
                    };
                    $.each(options.extraParams, function (key, param) {
                        extraParams[key] = typeof param == "function" ? param() : param
                    });
                    $.ajax({
                        mode: "abort",
                        port: "autocomplete" + input.name,
                        dataType: options.dataType,
                        url: options.url,
                        data: $.extend({
                            q: lastWord(term),
                            limit: options.max
                        }, extraParams),
                        success: function (data) {
                            var parsed = options.parse && options.parse(data) || parse(data);
                            cache.add(term, parsed);
                            success(term, parsed)
                        }
                    })
                } else {
                    select.emptyList();
                    failure(term)
                }
            }
        }
        function parse(data) {
            var parsed = [];
            var rows = data.split("\n");
            for (var i = 0; i < rows.length; i++) {
                var row = $.trim(rows[i]);
                if (row) {
                    row = row.split("|");
                    parsed[parsed.length] = {
                        data: row,
                        value: row[0],
                        result: options.formatResult && options.formatResult(row, row[0]) || row[0]
                    }
                }
            }
            return parsed
        }
        function stopLoading() {
            $input.removeClass(options.loadingClass)
        }
    };
    $.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        minChars: 1,
        delay: 400,
        matchCase: false,
        matchSubset: true,
        matchContains: false,
        cacheLength: 10,
        max: 100,
        mustMatch: false,
        extraParams: {},
        selectFirst: true,
        formatItem: function (row) {
            return row[0]
        },
        formatMatch: null,
        autoFill: false,
        width: 0,
        multiple: false,
        multipleSeparator: ", ",
        highlight: function (value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
        },
        scroll: true,
        scrollHeight: 180
    };
    $.Autocompleter.Cache = function (options) {
        var data = {};
        var length = 0;

        function matchSubset(s, sub) {
            if (!options.matchCase) {
                s = s.toLowerCase()
            }
            var i = s.indexOf(sub);
            if (options.matchContains == "word") {
                i = s.toLowerCase().search("\\b" + sub.toLowerCase())
            }
            if (i == -1) {
                return false
            }
            return i == 0 || options.matchContains
        }
        function add(q, value) {
            if (length > options.cacheLength) {
                flush()
            }
            if (!data[q]) {
                length++
            }
            data[q] = value
        }
        function populate() {
            if (!options.data) {
                return false
            }
            var stMatchSets = {},
                nullData = 0;
            if (!options.url) {
                options.cacheLength = 1
            }
            stMatchSets[""] = [];
            for (var i = 0, ol = options.data.length; i < ol; i++) {
                var rawValue = options.data[i];
                rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
                var value = options.formatMatch(rawValue, i + 1, options.data.length);
                if (value === false) {
                    continue
                }
                var firstChar = value.charAt(0).toLowerCase();
                if (!stMatchSets[firstChar]) {
                    stMatchSets[firstChar] = []
                }
                var row = {
                    value: value,
                    data: rawValue,
                    result: options.formatResult && options.formatResult(rawValue) || value
                };
                stMatchSets[firstChar].push(row);
                if (nullData++ < options.max) {
                    stMatchSets[""].push(row)
                }
            }
            $.each(stMatchSets, function (i, value) {
                options.cacheLength++;
                add(i, value)
            })
        }
        setTimeout(populate, 25);

        function flush() {
            data = {};
            length = 0
        }
        return {
            flush: flush,
            add: add,
            populate: populate,
            load: function (q) {
                if (!options.cacheLength || !length) {
                    return null
                }
                if (!options.url && options.matchContains) {
                    var csub = [];
                    for (var k in data) {
                        if (k.length > 0) {
                            var c = data[k];
                            $.each(c, function (i, x) {
                                if (matchSubset(x.value, q)) {
                                    csub.push(x)
                                }
                            })
                        }
                    }
                    return csub
                } else {
                    if (data[q]) {
                        return data[q]
                    } else {
                        if (options.matchSubset) {
                            for (var i = q.length - 1; i >= options.minChars; i--) {
                                var c = data[q.substr(0, i)];
                                if (c) {
                                    var csub = [];
                                    $.each(c, function (i, x) {
                                        if (matchSubset(x.value, q)) {
                                            csub[csub.length] = x
                                        }
                                    });
                                    return csub
                                }
                            }
                        }
                    }
                }
                return null
            }
        }
    };
    $.Autocompleter.Select = function (options, input, select, config) {
        var CLASSES = {
            ACTIVE: "ac_over"
        };
        var listItems, active = -1,
            data, term = "",
            needsInit = true,
            element, list;

        function init() {
            if (!needsInit) {
                return
            }
            element = $("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body);
            list = $("<ul/>").appendTo(element).mouseover(function (event) {
                if (target(event).nodeName && target(event).nodeName.toUpperCase() == "LI") {
                    active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
                    $(target(event)).addClass(CLASSES.ACTIVE)
                }
            }).click(function (event) {
                    $(target(event)).addClass(CLASSES.ACTIVE);
                    select();
                    input.focus();
                    return false
                }).mousedown(function () {
                    config.mouseDownOnSelect = true
                }).mouseup(function () {
                    config.mouseDownOnSelect = false
                });
            if (options.width > 0) {
                element.css("width", options.width)
            }
            needsInit = false
        }
        function target(event) {
            var element = event.target;
            while (element && element.tagName != "LI") {
                element = element.parentNode
            }
            if (!element) {
                return []
            }
            return element
        }
        function moveSelect(step) {
            listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
            movePosition(step);
            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            if (options.scroll) {
                var offset = 0;
                listItems.slice(0, active).each(function () {
                    offset += this.offsetHeight
                });
                if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                    list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight())
                } else {
                    if (offset < list.scrollTop()) {
                        list.scrollTop(offset)
                    }
                }
            }
        }
        function movePosition(step) {
            active += step;
            if (active < 0) {
                active = listItems.size() - 1
            } else {
                if (active >= listItems.size()) {
                    active = 0
                }
            }
        }
        function limitNumberOfItems(available) {
            return options.max && options.max < available ? options.max : available
        }
        function fillList() {
            list.empty();
            var max = limitNumberOfItems(data.length);
            for (var i = 0; i < max; i++) {
                if (!data[i]) {
                    continue
                }
                var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
                if (formatted === false) {
                    continue
                }
                var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
                $.data(li, "ac_data", data[i])
            }
            listItems = list.find("li");
            if (options.selectFirst) {
                listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
                active = 0
            }
            if ($.fn.bgiframe) {
                list.bgiframe()
            }
        }
        return {
            display: function (d, q) {
                init();
                data = d;
                term = q;
                fillList()
            },
            next: function () {
                moveSelect(1)
            },
            prev: function () {
                moveSelect(-1)
            },
            pageUp: function () {
                if (active != 0 && active - 8 < 0) {
                    moveSelect(-active)
                } else {
                    moveSelect(-8)
                }
            },
            pageDown: function () {
                if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
                    moveSelect(listItems.size() - 1 - active)
                } else {
                    moveSelect(8)
                }
            },
            hide: function () {
                element && element.hide();
                listItems && listItems.removeClass(CLASSES.ACTIVE);
                active = -1
            },
            visible: function () {
                return element && element.is(":visible")
            },
            current: function () {
                return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0])
            },
            show: function () {
                var offset = $(input).offset();
                element.css({
                    width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
                    top: offset.top + input.offsetHeight,
                    left: offset.left
                }).show();
                if (options.scroll) {
                    list.scrollTop(0);
                    list.css({
                        maxHeight: options.scrollHeight,
                        overflow: "auto"
                    });
                    if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
                        var listHeight = 0;
                        listItems.each(function () {
                            listHeight += this.offsetHeight
                        });
                        var scrollbarsVisible = listHeight > options.scrollHeight;
                        list.css("height", scrollbarsVisible ? options.scrollHeight : listHeight);
                        if (!scrollbarsVisible) {
                            listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")))
                        }
                    }
                }
            },
            selected: function () {
                var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
                return selected && selected.length && $.data(selected[0], "ac_data")
            },
            emptyList: function () {
                list && list.empty()
            },
            unbind: function () {
                element && element.remove()
            }
        }
    };
    $.fn.selection = function (start, end) {
        if (start !== undefined) {
            return this.each(function () {
                if (this.createTextRange) {
                    var selRange = this.createTextRange();
                    if (end === undefined || start == end) {
                        selRange.move("character", start);
                        selRange.select()
                    } else {
                        selRange.collapse(true);
                        selRange.moveStart("character", start);
                        selRange.moveEnd("character", end);
                        selRange.select()
                    }
                } else {
                    if (this.setSelectionRange) {
                        this.setSelectionRange(start, end)
                    } else {
                        if (this.selectionStart) {
                            this.selectionStart = start;
                            this.selectionEnd = end
                        }
                    }
                }
            })
        }
        var field = this[0];
        if (field.createTextRange) {
            var range = document.selection.createRange(),
                orig = field.value,
                teststring = "<->",
                textLength = range.text.length;
            range.text = teststring;
            var caretAt = field.value.indexOf(teststring);
            field.value = orig;
            this.selection(caretAt, caretAt + textLength);
            return {
                start: caretAt,
                end: caretAt + textLength
            }
        } else {
            if (field.selectionStart !== undefined) {
                return {
                    start: field.selectionStart,
                    end: field.selectionEnd
                }
            }
        }
    }
})(jQuery);

function RegLight() {
    var self = this;
    self.register_options = null;
    self.login_options = null;
    self.login_val_options = null;
    self.click_elems = null;
    self.append_to = "body";
    self.id = "#reg-light-wrapper";
    self.register_form = "#registration-form";
    self.login_form = "#login-form";
    self.zip = 'input[name="profile_zipcode"]';
    self.pass = 'input[name="pass"]';
    self.mail = 'input[name="mail"]';
    self.reg_name = '#registration-form input[name="name"]';
    self.bday_container = "#reg_light_bday";
    self.birth_year_select = "#reg_light_birth_year";
    self.school_select = "#reg_light_school_select";
    self.body_inner = "#reg_light_body_inner";
    self.sign_link = "#reg_light_sign_link";
    self.school_link = "#reg_light_school_link";
    self.school_field = 'input[name="school_name"]';
    self.school_type_field = 'select[name="profile_school_type"]';
    self.school_ajaxurl = "/rtr/includes/school.php";
    self.sorority_field = ".sorority_field";
    self.logged_in_meta = 'meta[name="uid"]';
    self.cookie = "reg_light_cookie";
    self.flag = null;
    self.closer = "#reg-light .reg-light-x";
    self.error_box = "div.error-messages";
    self.join_btn = "input.submit-join";
    self.signin_btn = "input.submit-signin";
    self.referrer = "rtr_profile_referral";
    self.referrer_field = 'input[name="profile_referral"]';
    self.loader = "#reg-light .reg-light-loader";
    self.init_flag = false;
    self.init_click_flag = false;
    self.callback = null;
    self.source = null;
    self.countdown = null;
    self.init = function () {
        if (self.init_flag) {
            return false
        }
        self.init_flag = true;
        self.load_template();
        $(document).bind(RTR.UX.hasUserData() ? "ready" : "userDataReady", function () {
            if (!RTR.UX.hasUserData() && !self.is_logged_in()) {
                if (self.is_displayable_on_page_load()) {
                    self.display_modal()
                } else {
                    self.begin_timed_experiment(RTR.UX || rtr_prop)
                }
            }
        });
        $(document).bind("facepileRendered", function () {
            self.facepileRendered = true;
            self.display_fb_facepile()
        });
        var query_string = "";
        var windowURL = $.url(encodeURI(window.location.toString()));
        if (windowURL.param("source") !== undefined || windowURL.param("campaign") !== undefined || windowURL.param("CTA") !== undefined || windowURL.param("Off") !== undefined || windowURL.param("KY") !== undefined) {
            query_string = self.formatted_referral();
            $.cookie("campaign_referral", query_string, {
                path: "/"
            })
        } else {
            if ($.cookie("campaign_referral")) {
                query_string = $.cookie("campaign_referral")
            } else {
                query_string = self.formatted_referral()
            }
        }
        $(self.referrer_field).val(query_string);
        $(self.zip).numericOnly();
        $(document).delegate(self.closer, "click", function () {
            if (self.is_not_closable()) {
                return
            }
            $(self.id).fadeOut(100);
            $("body").removeClass("no-scroll");
            self.source = null;
            $(self.login_form + " input, " + self.register_form + " input").removeClass("error");
            logPixel({
                object_type: "light_reg",
                action: "close_lightreg"
            });
            if (window.location.pathname != "/rtr_home/hplb") {
                $.cookie(self.cookie, "closed", {
                    path: "/"
                });
                $(self.closer).unbind("click")
            }
        });
        $(document).delegate("#reg-light", "click", function (e) {
            e.stopPropagation()
        });
        $(document).delegate("#reg-light .switch-link a", "click", function () {
            self.switch_to_view($(this).data("switchto"))
        });
        $(self.login_form).submit(function () {
            $(this).find("button[type='submit']").focus();
            $(this).ajaxSubmit(self.login_options);
            return false
        });
        $(self.register_form).submit(function () {
            self.update_name_field();
            $(this).find("button[type='submit']").focus();
            $(this).ajaxSubmit(self.register_options);
            return false
        });
        $(document).delegate("#reg-light input.year, #reg-light input.month, #reg-light input.day", "change", function () {
            var year = $("#reg-light input.year").val();
            var month = $("#reg-light input.month").val();
            var day = $("#reg-light input.day").val();
            if (!isNaN(year) || !isNaN(month) || !isNaN(day)) {
                var bday = new Date(year, parseInt(month, 10) - 1, day);
                var now = new Date().getTime();
                var age = (now - bday.getTime()) / 1000 / 60 / 60 / 24 / 365;
                $("#reg-light input[name='age']").val(age.toFixed(1));
                if (!isNaN(age) && 14 <= age && age <= 22.5) {
                    self.switch_to_view("registration-student")
                } else {
                    self.switch_to_view("registration")
                }
            }
        });
        $(self.id).find(self.mail).change(function () {
            self.update_name_field()
        });
        $(self.school_field).bind("keyup", function (event) {
            school_autocomplete(event)
        });

        function school_autocomplete(e) {
            var school_type = $(self.school_type_field).val();
            var school_filter = $(self.school_field).val();
            var keys = ["37", "38", "39", "40"];
            var key_pressed = e.which;
            var in_arr = $.inArray(key_pressed.toString(), keys);
            if (in_arr == -1 && school_filter.length >= 3) {
                $.ajax({
                    type: "GET",
                    url: self.school_ajaxurl,
                    data: "school_type=" + school_type + "&filter=" + school_filter,
                    success: function (msg) {
                        var schoolArray = msg.split(",");
                        $("input[name='school_name']").autocomplete(schoolArray, {
                            matchContains: true,
                            max: 200
                        })
                    }
                })
            }
        }
        $(self.error_box).empty();
        $(self.error_box).hide()
    };
    self.display_modal = function (opts) {
        if (typeof (opts) === "undefined") {
            opts = {}
        }
        self.callback = opts.callback;
        if (opts.source) {
            self.source = opts.source
        }
        if ($(self.id).length === 0) {
            self.load_template()
        }
        self.fade_in(false);
        if (self.is_short_form()) {
            $("#reg-light .reg-light-extra-fields").empty();
            $.cookie("lr_sform", "y", {
                path: "/"
            })
        }
        if (self.has_new_member_offer()) {
            $(".header-caption .view-registration").html("<span class='view-offer'>JOIN NOW + <b>ENJOY $25 OFF</b><br />YOUR FIRST RENTAL</span>");
            $(".header-caption .view-registration").css({
                background: "none",
                "text-indent": 0,
                "margin-top": "8px",
                width: "auto"
            });
            $(".header-title .view-registration").empty()
        }
        if (self.has_social_proof_caption()) {
            $(".header-caption .view-registration").html("Looking beautiful has never been easier.<br />Just ask our fans.");
            $(".header-caption .view-registration").css({
                background: "none",
                "text-indent": 0,
                "margin-top": "8px",
                width: "auto",
                "line-height": "25px"
            });
            $(".header-title .view-registration").empty()
        }
        $("body").addClass("no-scroll");
        (opts.view) ? self.switch_to_view(opts.view) : ($.cookie("euwli")) ? self.switch_to_view("login") : self.switch_to_view();
        var caption = (opts.message) ? opts.message : "The dress is just the beginning";
        $("#reg-light .header-caption .view-login").html(caption);
        pixelSource = (opts.source) ? opts.source : "none";
        var logObj = {
            object_type: "light_reg",
            action: "lightreg_popup",
            source: pixelSource
        };
        if (self.is_short_form()) {
            logObj.sf = "true"
        }
        logPixel(logObj)
    };
    self.fade_in = function (logpixel) {
        $(self.id).show();
        if (typeof (logpixel) === "undefined" || logpixel) {
            logPixel({
                object_type: "light_reg",
                action: "lightreg_popup",
                source: "none"
            })
        }
    };
    self.load_template = function () {
        var rl_tmpl = _.template($("#reg-light-v2-temp").html());
        $(self.append_to).append(rl_tmpl);
        if (typeof (rtr_prop.appPath) === "string") {
            $("#reg-light select").coreUISelect();
            $("#reg-light .b-core-ui-select__button").addClass("s8-arr-8-down-grey")
        }
        var rtrmail = $.parseJSON($.cookie("RTRmail"));
        if (rtrmail && rtrmail.mail) {
            $("#reg-light #login-form input[name='name']").val(rtrmail.mail)
        }
    };
    self.switch_to_view = function (view) {
        $(self.error_box).empty();
        $(self.login_form + " input, " + self.register_form + " input").removeClass("error");
        if (view == "login") {
            $("#reg-light .view-login").show();
            $("#reg-light .view-registration").hide();
            $("#reg-light").css("width", "448px")
        } else {
            $("#reg-light .view-login").hide();
            $("#reg-light .view-registration").show();
            self.display_fb_facepile();
            if (view == "registration-student") {
                $("#reg-light").css("width", "721px");
                $("#reg-light .registration-form-default").css({
                    padding: "0 44px",
                    "border-right": "1px solid #ccc"
                });
                $("#reg-light .registration-form-student").show()
            } else {
                $("#reg-light").css("width", "448px");
                $("#reg-light .registration-form-default").css({
                    padding: "0 88px",
                    "border-right": "0"
                });
                $("#reg-light .registration-form-student").hide()
            }
        }
    };
    self.formatted_referral = function () {
        var windowURL = $.url(encodeURI(window.location.toString()));
        var l_path = windowURL.attr("path").replace(/-/g, "");
        var l_source = windowURL.param("source") || "";
        var l_campaign = windowURL.param("campaign") || "";
        var l_cta = windowURL.param("CTA") || "";
        var l_offer = windowURL.param("Off") || "";
        var l_keyword = windowURL.param("KY") || "";
        var l_shortform = windowURL.param("form") || "";
        var l_adgroup = windowURL.param("adgroup") || "";
        var l_matchtype = windowURL.param("matchtype") || "";
        var l_device = windowURL.param("device") || "";
        return ("light_registration-" + l_source + "-" + l_campaign + "-" + l_cta + "-" + l_offer + "-" + l_keyword + "-" + l_shortform + "-" + l_path + "-" + l_adgroup + "-" + l_matchtype + "-" + l_device).substr(0, 256)
    };
    self.is_visible = function (view) {
        var regLightVisible = $(self.id).css("display") != "none";
        if (view == "registration") {
            return regLightVisible && $(".view-registration").css("display") != "none"
        }
        if (view == "login") {
            return regLightVisible && $(".view-login").css("display") != "none"
        }
        return regLightVisible
    };
    self.is_logged_in = function () {
        return (($(self.logged_in_meta).attr("content") && $(self.logged_in_meta).attr("content") != "0") || (rtr_prop.uid && rtr_prop.uid > 0)) && !getParameterByName("require_auth")
    };
    self.is_displayable_on_page_load = function () {
        var url = $.url(encodeURI(window.location.toString()));
        var campaign = url.param("campaign");
        if (campaign == null) {
            campaign = ""
        }
        return self.has_treatment(19, 2) && !campaign.toLowerCase().match(/goog/) && $.cookie(self.cookie) != "closed"
    };
    self.is_not_closable = function () {
        return false
    };
    self.is_short_form = function () {
        return self.has_non_branded_sem() || $.cookie("paid") || ($.cookie("lr_sform") && $.cookie("lr_sform") == "y")
    };
    self.has_new_member_offer = function () {
        return true
    };
    self.has_fb_facepile = function () {
        return true
    };
    self.display_fb_facepile = function () {
        if (self.is_visible("registration") && self.has_fb_facepile() && self.facepileRendered && !self.tryFacepileDisplay) {
            self.tryFacepileDisplay = true;
            setTimeout(function () {
                var fp = $("#reg-light .header-facepile");
                var fpHeight = fp.outerHeight();
                if (fpHeight > 20) {
                    fp.show();
                    var hasFriends = fpHeight > 40;
                    var obj = {
                        object_type: "light_reg",
                        action: "display_widget_fb",
                        has_friends: hasFriends
                    };
                    logPixel(obj);
                    self.facepileLogged = true
                }
            }, 100)
        }
    };
    self.has_social_proof_caption = function () {
        return false
    };
    self.has_sem_params = function () {
        var windowURL = $.url(encodeURI(window.location.toString()));
        return windowURL.param("source") || windowURL.param("campaign") || windowURL.param("CTA") || windowURL.param("Off") || windowURL.param("KY")
    };
    self.has_non_branded_sem = function () {
        var windowURL = $.url(encodeURI(window.location.toString()));
        return windowURL.param("campaign") && !windowURL.param("campaign").toLowerCase().match(/brand/)
    };
    self.login_success = function (data) {
        self.login_or_register_postback_success(data, "login")
    };
    self.register_success = function (data) {
        self.login_or_register_postback_success(data, "registration")
    };
    self.begin_timed_experiment = function (rtr_prop) {
        var seconds = null;
        if ((rtr_prop.experiments && rtr_prop.experiments.exp && rtr_prop.experiments.exp[12] || RTR.UX.hasExperiment(12)) && $.cookie(self.cookie) != "closed") {
            var treatment = RTR.UX.getExperimentTreatment(12) || rtr_prop.experiments.exp[12];
            if ($.cookie("lrexp12countdown")) {
                seconds = parseInt($.cookie("lrexp12countdown"), 10)
            } else {
                if (treatment == 2) {
                    seconds = 15
                }
            }
            if (seconds) {
                $.cookie("lrexp12countdown", seconds, {
                    path: "/"
                });
                self.countdown = setInterval(self.update_countdown_cookie, 1000)
            }
        } else {
            $.cookie("lrexp12countdown", null, {
                path: "/"
            })
        }
    };
    self.update_countdown_cookie = function () {
        var n = parseInt($.cookie("lrexp12countdown"), 10);
        if (n === 0) {
            self.display_modal();
            $.cookie("lrexp12countdown", null, {
                path: "/"
            });
            clearInterval(self.countdown)
        } else {
            $.cookie("lrexp12countdown", --n, {
                path: "/"
            })
        }
    };
    self.login_or_register_postback_success = function (data, type) {
        $.cookie("login_popup_shown", null);
        $.cookie("campaign_referral", null, {
            path: "/"
        });
        var param = "";
        var extra_param = "";
        var actionPixel = "";
        var actionGA = "";
        if (type == "login") {
            param = "?login=true";
            extra_param = data.qry_str_append;
            actionPixel = "login";
            actionGA = "signin"
        } else {
            if (type == "registration") {
                param = "?registration=new";
                extra_param = "invite=yes";
                actionPixel = "signup_new";
                actionGA = "signupnew"
            }
        }
        $(self.loader).show();
        if (data.error === 0) {
            if (self.callback) {
                if (typeof (self.callback) === "function") {
                    self.callback(param)
                }
                $(document).bind("userDataReady", function () {
                    if (typeof (logPixel) === "function") {
                        logPixel({
                            object_type: "light_reg",
                            action: actionPixel
                        })
                    }
                    var currPage = (page_type) ? page_type.toLowerCase() : "";
                    var userId = (rtr_prop.uid) ? rtr_prop.uid.toString() : "";
                    common_ga_event_track(currPage, actionGA, userId, null, true);
                    displayOffer();
                    if (type == "registration") {
                        displayInviteFriends()
                    }
                });
                var optional_params = typeof (pdp_glob) !== "undefined" && pdp_glob.item && pdp_glob.item.styleName ? {
                    styleName: pdp_glob.item.styleName
                } : null;
                RTR.UX.fetchUserData({
                    success: personalize,
                    data: optional_params
                });
                $(self.id).hide();
                $(self.loader).hide();
                $("body").removeClass("no-scroll")
            } else {
                window.location.search = param
            }
        } else {
            if (data.message.match(/do not match/)) {
                logPixel({
                    object_type: "light_reg",
                    action: "wrong_passw"
                })
            }
            $(self.loader).hide();
            $(self.error_box).empty();
            $(self.error_box).html("<label>" + data.message + "</label>");
            $(self.error_box).show();
            return false
        }
        var query_params = separate_query_style_string(window.location.search.replace(/\?/g, ""));
        if (query_params.require_auth) {
            var destination = query_params.require_auth;
            if (destination.indexOf("%") >= 0) {
                destination = decodeURIComponent(destination)
            }
            window.location.href = destination
        }
    };
    self.login_or_register_postback_fail = function () {
        $(self.loader).hide();
        $(self.error_box).empty();
        $(self.error_box).text("There was an error processing this form. Please try again.");
        $(self.error_box).show();
        return false
    };
    self.update_name_field = function () {
        var mailVal = $(self.id).find(self.mail).val();
        if (mailVal) {
            var milli = new Date().getMilliseconds();
            var newName = mailVal + milli;
            $(self.id).find(self.reg_name).val(newName)
        }
    };
    self.has_treatment = function (eid, tid) {
        if (RTR.UX.hasExperimentTreatment(eid, tid)) {
            return true
        }
        if (!(rtr_prop.experiments && rtr_prop.experiments.exp)) {
            return false
        }
        if (typeof (tid) === "object") {
            return $.inArray(rtr_prop.experiments.exp[eid], tid) != -1
        }
        return rtr_prop.experiments.exp[eid] == tid
    }
}
$(document).ready(function () {
    reg_light_default = new RegLight();
    reg_light_default.register_options = {
        url: "/rtr_static/user/register",
        type: "post",
        dataType: "json",
        beforeSubmit: function () {
            $(reg_light_default.error_box).empty();
            $(reg_light_default.register_form).validate(reg_light_default.register_val_options);
            if ($(reg_light_default.register_form).valid() === false) {
                return false
            } else {
                if (typeof (recordIt) === "function") {
                    recordIt("Signup", "", "")
                }
                $(reg_light_default.loader).show();
                return true
            }
        },
        success: reg_light_default.register_success,
        error: reg_light_default.login_or_register_postback_fail
    };
    reg_light_default.login_options = {
        url: "/rtr_static/user/login",
        type: "post",
        dataType: "json",
        beforeSubmit: function () {
            $(reg_light_default.error_box).empty();
            $(reg_light_default.login_form).validate(reg_light_default.login_val_options);
            if ($(reg_light_default.login_form).valid() === false) {
                return false
            } else {
                $(reg_light_default.loader).show();
                return true
            }
        },
        success: reg_light_default.login_success,
        error: reg_light_default.login_or_register_postback_fail
    };
    reg_light_default.login_val_options = {
        errorLabelContainer: "div.error-messages",
        rules: {
            name: {
                required: true,
                email: true
            },
            pass: {
                required: true
            }
        },
        messages: {
            name: "Please enter a valid email address",
            pass: "Please enter a password"
        }
    };
    $.validator.addMethod("validMonth", function (v, e) {
        var n = parseInt(v, 10);
        return n <= 12 && n >= 1
    });
    $.validator.addMethod("validDay", function (v, e) {
        var n = parseInt(v, 10);
        return n <= 31 && n >= 1
    });
    $.validator.addMethod("validYear", function (v, e) {
        var n = parseInt(v, 10);
        return n >= 1880
    });
    reg_light_default.register_val_options = {
        ignore: "input:hidden",
        errorLabelContainer: "div.error-messages",
        rules: {
            mail: {
                required: true,
                email: true
            },
            profile_first_name: {
                required: true
            },
            profile_last_name: {
                required: true
            },
            month: {
                required: true,
                digits: true,
                validMonth: true
            },
            day: {
                required: true,
                digits: true,
                validDay: true
            },
            year: {
                required: true,
                digits: true,
                validYear: true
            },
            profile_zipcode: {
                required: true,
                minlength: 5,
                digits: true
            },
            pass: {
                required: true
            },
            pass_confirmation: {
                required: false,
                equalTo: "input[name='pass']"
            },
            age: {
                required: true,
                min: 14
            }
        },
        groups: {
            date_of_birth: "month day year"
        },
        messages: {
            mail: "Please enter a valid email address",
            profile_zipcode: "Please enter a valid zip code",
            pass_confirmation: "The passwords you entered do not match",
            pass: "Please enter a password",
            profile_first_name: "Please enter your first name",
            profile_last_name: "Please enter your last name",
            month: "Please enter your birthday",
            day: "Please enter your birthday",
            year: "Please enter your birthday",
            age: "Privacy regulations prevent us from offering you access (minimum age is 14)"
        }
    };
    reg_light_default.init()
});
$(document).ready(function () {
    reg_light_default.init()
});

function ModalPopup(content, pixelDataShow, pixelDataHide) {
    var tmpl = _.template($("#modal-popup-tmpl").html());
    if (content instanceof jQuery) {
        if (!$("#modal-popup-container").length) {
            $("body").append(tmpl({
                content: ""
            }))
        }
        content.appendTo($("#modal-popup-container").find(".modal-popup-content"))
    } else {
        if (!$("#modal-popup-container").length) {
            $("body").append(tmpl({
                content: content
            }))
        } else {
            $("#modal-popup-container").find(".modal-popup-content").html(content)
        }
    }
    this.container = $("#modal-popup-container");
    this.overlay = this.container.find(".modal-popup-overlay");
    this.modal = this.container.find(".modal-popup");
    this.content = this.container.find(".modal-popup-content");
    this.pixelDataShow = pixelDataShow || null;
    this.pixelDataHide = pixelDataHide || null;
    var self = this;
    self.container.delegate(".modal-popup", "click", function (e) {
        e.stopPropagation()
    });
    self.container.delegate(".modal-popup-x, .modal-popup-overlay", "click", function (e) {
        e.stopPropagation();
        self.hide()
    })
}
ModalPopup.prototype.center = function () {
    var self = this;
    if (self.modal.height() > $(window).height()) {
        self.modal.addClass("oversized")
    } else {
        var marginTop = -self.modal.height() / 2;
        self.modal.css("margin-top", marginTop + "px")
    }
    var marginLeft = -self.modal.width() / 2;
    self.modal.css("margin-left", marginLeft + "px")
};
ModalPopup.prototype.show = function () {
    var self = this;
    self.center();
    self.overlay.fadeIn(400);
    self.modal.fadeIn(400);
    if (self.pixelDataShow) {
        self._logPixel(self.pixelDataShow)
    }
};
ModalPopup.prototype.hide = function () {
    var self = this;
    self.modal.fadeOut(400);
    self.overlay.fadeOut(400);
    if (self.pixelDataHide) {
        self._logPixel(self.pixelDataHide)
    }
};
ModalPopup.prototype.setContent = function (content) {
    var self = this;
    self.content.html(content)
};
ModalPopup.prototype.fadeToContent = function (content) {
    var self = this;
    self.modal.fadeOut(200, function () {
        setTimeout(function () {
            self.setContent(content);
            self.center();
            self.modal.fadeIn(200)
        }, 200)
    })
};
ModalPopup.prototype._logPixel = function (data) {
    if (!data) {
        return
    }
    var self = this;
    var params = {
        uid: rtr_prop.uid || "",
        timestamp: new Date().getTime()
    };
    for (var key in data) {
        params[key] = data[key]
    }
    $.post("/pixel/p.php", params)
};
(function (window) {
    var year = 0,
        month = 1,
        day = 2;
    window.DF = {
        mdyy: function (date) {
            var a = this._ymdArray(date);
            return (a) ? this._pad(a[month], 2) + "/" + this._pad(a[day], 2) + "/" + a[year] : null
        },
        yymd: function (date) {
            var a = this._ymdArray(date);
            return (a) ? a[year] + "-" + this._pad(a[month], 2) + "-" + this._pad(a[day], 2) : null
        },
        m: function (date) {
            var a = this._ymdArray(date);
            return (a) ? a[month] : null
        },
        mm: function (date) {
            var months = [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var a = this._ymdArray(date);
            return (a) ? months[parseInt(a[month], 10)] : null
        },
        mmm: function (date) {
            var months = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var a = this._ymdArray(date);
            return (a) ? months[parseInt(a[month], 10)] : null
        },
        d: function (date) {
            var a = this._ymdArray(date);
            return (a) ? a[day] : null
        },
        y: function (date) {
            var a = this._ymdArray(date);
            return (a) ? a[year] % 100 : null
        },
        yy: function (date) {
            var a = this._ymdArray(date);
            return (a) ? a[year] : null
        },
        _ymdArray: function (date) {
            if (!date) {
                return null
            }
            if (typeof date === "string") {
                var s = date.split("-");
                if (s.length === 3 && s[0].length === 4) {
                    return s
                } else {
                    if (s.length === 3 && s[2].length === 4) {
                        return [s[2], s[0], s[1]]
                    }
                }
            }
            var d = new Date(date);
            return (d) ? [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()] : null
        },
        _pad: function (num, size) {
            var s = num + "";
            while (s.length < size) {
                s = "0" + s
            }
            return s
        }
    }
})(window);

function Offer(settings) {
    if (typeof (settings) === "undefined") {
        settings = {}
    }
    this.type = settings.type || "";
    this.copy = settings.copy || "";
    this.details = settings.details || "";
    this.eligibility = settings.eligibility || true;
    this.priority = settings.proirity || 0;
    this.paint = function () {
        if (typeof (this.eligibility) == "function" && this.eligibility() || this.eligibility) {
            var markup = "<div class='promo-bar " + this.type + "'>" + this.copy;
            if (this.details) {
                markup += " <a href='javascript:void(0)' class='promo-details' data-details='" + this.details + "'>details</a>"
            }
            markup += "</div>";
            return markup
        }
        return ""
    }
}
$(document).ready(function () {
    if (isMobile()) {
        $("body").removeClass("hover-on")
    }
    $("body").delegate(".back-to-top", "click", function () {
        $("html, body").animate({
            scrollTop: 0
        }, "fast")
    });
    $(document).bind("userDataReady", function () {
        if (!rtr_prop.mobile) {
            var user = rtr_prop.user;
            if (user) {
                rtr_prop.uid = (user.basicUserProfile) ? user.basicUserProfile.userId : rtr_prop.uid;
                if (typeof (populateWlmForUser) === "function") {
                    populateWlmForUser(user.basicUserProfile)
                }
                if (typeof (add_existing_user_ratings) === "function") {
                    add_existing_user_ratings(user.heartedStyles)
                }
                populateUserData(user);
                trackLoginSignupGAEvent()
            } else {
                if (rtr_prop.experiments && rtr_prop.experiments.exp) {
                    lightRegExperiment(rtr_prop.experiments.exp[1])
                } else {
                    RTR.UX.logExperiment(1)
                }
            }
        }
    })
});

function allCompliments() {
    if (!RTR.UX.hasUserData()) {
        return
    }
    var url = "/ourrunway/complimentedPhotos";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        cache: false,
        success: function (data) {
            addUserCompliments(data)
        },
        error: function (data) {}
    })
}
function populateUserData(data) {
    displayReviewLink();
    reviewPopupEventHandler();
    if (typeof (data) === "object" && typeof (data.user) === "object" && typeof (rtr_prop.uid) != "undefined") {
        $(".hd-myaccount-link").html(data.user.basicUserProfile.firstName + ' Account<span class="hd-arrow-down s8-nav2012_lg_pink_arrow_down"></span>');
        $(".hd-myaccount-name a").html(data.user.basicUserProfile.firstName + ' Account<span class="hd-arrow-down s8-nav2012_lg_pink_arrow_down"></span>');
        if (data.user.heartedStyles !== null) {
            $("#header_heart_count").text(data.user.heartedStyles.length)
        }
        $(".hd-account").prepend('<a href="javascript:rtr_view_cart()" class="hd-bag-count s8-nav2012_Cart2"><span id="cart_item_count" class="hd-count-number">' + data.user.shoppingCartCount + "</span></a>");
        $(".hd-myaccount").append('<li class="hd-myaccount-signout"><a href="/logout?nav_location=user_account&action=click_signOut&object_type=top_nav" onclick="return unset_flag_cookie()">Sign Out</a></li>')
    }
}
function lightRegExperiment(tid) {
    if (tid && tid == 1) {}
}
function isIOS() {
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        return true
    }
    return false
}
function momentLightboxUrl(designerName, displayName, photoId) {
    if (!designerName || !displayName || !photoId) {
        return ""
    }
    var designer = encodeURIComponent(designerName);
    var display = encodeURIComponent(displayName);
    var url = "/ourrunway/moment/" + designer + "-" + display + "--id-" + photoId;
    return url
}
function displayableNameForUser(user) {
    if (user && user.nickName) {
        return user.nickName
    }
    if (user && user.firstName) {
        return user.firstName
    }
    return "RTR Customer"
}
function photoLargeThumbUrl(photoId) {
    if (!photoId) {
        return ""
    }
    return rtr_prop.reviewsCdn + "/" + photoId + "-largeThumb.jpg"
}
function formatDate(timestamp) {
    var d = new Date(timestamp);
    var year = d.getFullYear();
    var month = d.getMonth();
    var monthMatcher = {
        0: "jan",
        1: "feb",
        2: "mar",
        3: "apr",
        4: "may",
        5: "jun",
        6: "jul",
        7: "aug",
        8: "sep",
        9: "oct",
        10: "nov",
        11: "dec"
    };
    return monthMatcher[month] + " " + year
}
function formatDateRemoveTime(dateString) {
    if (!dateString) {
        return ""
    }
    var newDate = dateString.split(" ").splice(0, 3).join(" ");
    return (newDate) ? newDate : ""
}
function formatHeight(inches) {
    return (inches) ? Math.floor(inches / 12) + "'" + inches % 12 + '"' : ""
}
function formatHeightWithSpace(inches) {
    return (inches) ? Math.floor(inches / 12) + "' " + inches % 12 + '"' : ""
}
function getQueryParam(key) {
    key = key.replace(/(\[|\])/g, "\\$1");
    var regexS = "[\\?&]" + key + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results === null) {
        return ""
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "))
    }
}
function formToObject(id) {
    obj = {};
    form = $("#" + id);
    s = form.serialize();
    a = s.split("&");
    for (i = 0; i < a.length; i++) {
        b = a[i].split("=");
        obj[b[0]] = (b[1] !== "") ? decodeURIComponent(b[1]) : null
    }
    return obj
}
function getAgeFromDate(year, month, day) {
    var today = new Date();
    var birthDate = new Date(year, month - 1, day);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}
function ageFromUnixTime(ut) {
    var bday = new Date(ut);
    return (bday) ? getAgeFromDate(bday.getFullYear(), bday.getMonth(), bday.getDate()) : null
}
function pad(num, size) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s
    }
    return s
}
function logPixel(data) {
    if (!data) {
        return
    }
    data.uid = RTR.UX.getUserId();
    data.timestamp = new Date().getTime();
    $.ajax({
        type: "POST",
        url: "/pixel/p.php",
        data: data
    })
}
function logAppliedExperiment(eid, tid, segs) {
    segs = segs || [];
    var obj = {
        object_type: "experiment",
        action: "experiment_applied",
        segments: JSON.stringify(segs),
        experiment: JSON.stringify([parseInt(eid, 10), parseInt(tid, 10)])
    };
    logPixel(obj)
}
function experimentExists(eid) {
    return rtr_prop.experiments && rtr_prop.experiments.exp && rtr_prop.experiments.exp[eid] || RTR.UX.hasExperiment(eid)
}
function guid() {
    var s4 = function () {
        return Math.floor(Math.random() * 65536).toString(16)
    };
    return s4() + s4() + s4() + new Date().getTime()
}
function preloadImages(preload) {
    var images = [];
    for (i = 0; i < preload.length; i++) {
        images[i] = new Image();
        images[i].src = preload[i]
    }
}(function ($) {
    $.fn.numericOnly = function (event) {
        return this.each(function () {
            $(this).bind("keyup", function (event) {
                var oldInput = $(this).val().substring(0, $(this).val().length - 1);
                if (isNaN($(this).val())) {
                    $(this).val(oldInput)
                }
            })
        })
    };
    $.fn.rtrBDaySelects = function (user_options) {
        var self = this;
        var options = {
            id_1: "bday_month",
            id_2: "bday_day",
            id_3: "bday_year",
            class_1: "bday_month",
            class_2: "bday_day",
            class_3: "bday_year",
            name_1: "bday_month",
            name_2: "bday_day",
            name_3: "bday_year"
        };
        $.extend(options, user_options);
        this._validate = function (target_id) {
            var input_value = $("#" + target_id).val();
            var error = false;
            var value = input_value;
            var message = "";
            switch (target_id) {
                case options.id_1:
                    if (isNaN(input_value) || input_value > 12 || input_value < 1) {
                        error = true;
                        value = "mm";
                        message = "Please enter a valid month"
                    }
                    break;
                case options.id_2:
                    if (isNaN(input_value) || input_value > 31 || input_value < 1) {
                        error = true;
                        value = "dd";
                        message = "Please enter a valid day"
                    }
                    break;
                case options.id_3:
                    if (isNaN(input_value) || input_value.length < 4) {
                        error = true;
                        value = "yyyy";
                        message = "Please enter a valid year"
                    }
                    break;
                default:
                    break
            }
            return {
                error: error,
                message: message,
                value: value
            }
        };
        var month_input_attr = {
            id: options.id_1,
            "class": options.class_1,
            name: options.name_1,
            type: "text",
            maxlength: "2",
            value: "mm"
        };
        var day_input_attr = {
            id: options.id_2,
            "class": options.class_2,
            name: options.name_2,
            type: "text",
            maxlength: "2",
            value: "dd"
        };
        var year_input_attr = {
            id: options.id_3,
            "class": options.class_3,
            name: options.name_3,
            type: "text",
            maxlength: "4",
            value: "yyyy"
        };
        var month_input = $("<input>").attr(month_input_attr);
        var day_input = $("<input>").attr(day_input_attr);
        var year_input = $("<input>").attr(year_input_attr);
        $(self).bind("validate", function (e, target_id) {
            var error = self._validate(target_id);
            if (error.error) {
                $("#" + target_id).val(error.value);
                $(self).trigger("form_error", error.message)
            }
        });
        var inputs = [month_input, day_input, year_input];
        for (var i in inputs) {
            $(self).append(inputs[i])
        }
        $("#reg_light_bday input").focusout(function () {
            var target_id = $(this).attr("id");
            $(self).trigger("validate", target_id)
        }).focusin(function () {
                var myVal = $(this).val();
                if (myVal == "dd" || myVal == "mm" || myVal == "yyyy") {
                    $(this).val("")
                }
            });
        return
    }
})(jQuery);

function mdyObjFromUnixTime(ut) {
    var date = new Date(ut);
    if (!date) {
        return null
    }
    return {
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        year: date.getUTCFullYear()
    }
}
function validBirthday(month, day, year) {
    if (isNaN(month) || month < 1 || month > 12) {
        return false
    }
    if (isNaN(day) || day < 1 || day > 31) {
        return false
    }
    if (isNaN(year) || year < 1900) {
        return false
    }
    var date = new Date(month + "-" + day + "-" + year);
    var today = new Date();
    if (!date || date > today) {
        return false
    }
    return true
}
function isMobile() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)
}
function isIOS4() {
    return navigator.userAgent.match(/(iPhone|iPod|iPad)/) && navigator.userAgent.match(/OS 4_/i)
}
function urlQueryParams() {
    var urlParams = {};
    (function () {
        var match, pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "))
            },
            query = window.location.search.substring(1);
        while ((match = search.exec(query))) {
            urlParams[decode(match[1])] = decode(match[2])
        }
    })();
    return urlParams
}
function isRentable(itemType) {
    return (itemType == "Dress" || itemType == "Accessory")
}
function isSaleable(itemType) {
    return (itemType == "SaleableProduct" || itemType == "rtr_clearance")
}
function mapToCanonicalSize(size, map) {
    if (typeof (map) === "undefined") {
        map = pdp_glob.item.canonicalSizesFromSizeScale
    }
    var canonSize = "";
    _.each(map, function (v, k) {
        if (_.contains(v, size)) {
            canonSize = k;
            return false
        }
    });
    return canonSize
}
function mapFromCanonicalSize(canonSize, map) {
    if (typeof (map) === "undefined") {
        map = pdp_glob.item.canonicalSizesFromSizeScale
    }
    return map[canonSize]
}
function highlightSubsequentDays(td, n) {
    var tds = _.filter(td.nextAll(".ui-datepicker-calendar td"), function (a) {
        return $(a).attr("class").indexOf("ui-datepicker-other-month") == -1
    }).slice(0, n);
    var trNext = null;
    var needed = n - tds.length;
    if (needed > 0) {
        trNext = td.parent().next("tr");
        addTdsFromTr(tds, trNext, needed)
    }
    if (needed > 0) {
        var nextDatepicker = td.closest(".ui-datepicker-group").next(".ui-datepicker-group");
        if (nextDatepicker.length > 0) {
            trNext = $(nextDatepicker.find("tbody").find("tr")[0]);
            addTdsFromTr(tds, trNext, needed);
            if (needed > 0) {
                trNext = trNext.next("tr");
                addTdsFromTr(tds, trNext, needed)
            }
        }
    }
    _.each(tds, function (a) {
        $(a).addClass("ui-datepicker-ofr")
    });
    if (tds.length == n) {
        $(tds[tds.length - 1]).addClass("s8-ico-cal-mailback")
    }
    function addTdsFromTr(tds, tr, ndd) {
        var tdsInitialLength = tds.length;
        var tdsAdditional = _.filter(tr.children("td"), function (a) {
            return $(a).attr("class").indexOf("ui-datepicker-other-month") == -1
        }).slice(0, ndd);
        _.each(tdsAdditional, function (t) {
            tds.push(t)
        });
        needed = ndd - (tds.length - tdsInitialLength)
    }
}
function trackLoginSignupGAEvent() {
    var windowURL = $.url(encodeURI(window.location.toString()));
    var page_type = window.page_type || "other";
    var currPage = page_type.toLowerCase();
    var userId = (rtr_prop.uid) ? rtr_prop.uid.toString() : "";
    if (windowURL.param("login") === "true") {
        common_ga_event_track(currPage, "signin", userId, null, true)
    } else {
        if (windowURL.param("registration") === "new") {
            common_ga_event_track(currPage, "signupnew", userId, null, true)
        }
    }
}
function getDotomiWebsiteTag(data) {
    var dotomiMarkup = '<iframe id="dotomi-iframe" height="1" width="1" frameborder="0" scrolling="no" src="http://www.emjcd.com/tags/r?containerTagId=1292';
    if (data.promoId) {
        dotomiMarkup += "&PROMOID=" + data.promoId
    }
    if (data.sku) {
        dotomiMarkup += "&SKU=" + data.sku
    }
    if (data.userId) {
        dotomiMarkup += "&USERID=" + data.userId
    }
    if (data.referrer) {
        dotomiMarkup += "&REFERRER=" + encodeURIComponent(data.referrer)
    }
    if (data.category) {
        dotomiMarkup += "&CATEGORY=" + data.category
    }
    if (data.subcategory) {
        dotomiMarkup += "&SUBCATEGORY=" + data.dsubcategory
    }
    dotomiMarkup += '"></iframe>';
    return dotomiMarkup
}
function lsSetKeyValue(key, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage[key] = value
    }
}
function lsValueForKey(key) {
    if (typeof (Storage) !== "undefined") {
        return localStorage[key]
    }
    return null
}
function lsRemoveKey(key) {
    if (typeof (Storage) !== "undefined" && lsValueForKey(key) !== null) {
        localStorage.removeItem(key)
    }
}
function needsReg(link, e) {
    if (userHasUID() || link.attr("open")) {
        return
    }
    e.preventDefault();
    var src = link.data("source");
    var regMsg = link.data("msg");
    displayLightReg((typeof (rtr_prop.appPath) === "string" && $.inArray(src, ["signInButton", "registerNow"]) == -1) ?
        function (qparam) {
            var href = $(link).attr("href");
            var newLoc;
            qparam = qparam.replace(/^\?/, "");
            if (href.indexOf("?") != -1) {
                newLoc = href.slice(0, href.indexOf("?") + 1) + qparam + "&" + href.slice(href.indexOf("?") + 1)
            } else {
                newLoc = href + "?" + qparam
            }
            window.location.href = newLoc
        } : false, src ? src : link.text(), typeof (regMsg) === "string" ? regMsg : null, src == "signInButton" ? "login" : null)
}
function logPageLoad() {
    var referrer = "";
    if (document.referrer.search("#") >= 0) {
        referrer = document.referrer.split("#")[0]
    } else {
        if (document.referrer.search("/?") >= 0) {
            referrer = document.referrer.split("?")[0]
        } else {
            referrer = ""
        }
    }
    var uid = rtr_prop.uid ? rtr_prop.uid : "";
    var options = {
        event: "page_load",
        object_type: "top_nav",
        context: window.location.href,
        referrer: referrer,
        uid: uid
    };
    logPixel(options)
}
function updateHeader(dontDisplayOffer) {
    if (RTR.UX.hasUserData()) {
        var user = RTR.UX.user;
        try {
            $("#usr-signin, .usr-signin").hide();
            $("#sign-out").show();
            var fn = user.basicUserProfile.firstName;
            if (fn && fn.length < 12) {
                $("#usr-name").text(fn + "'s")
            }
            if (user.heartedStyles && user.heartedStyles.length) {
                $("#usr-heart-count").text(user.heartedStyles.length)
            } else {
                $("#usr-heart-count").text(0)
            }
        } catch (e) {
            try {
                window.Airbrake.notify("Unable to Personalize Nav for UID:" + user.basicUserProfile.userId + ", " + e.message, "header.js", 310)
            } catch (e) {}
        }
    } else {
        $("#usr-signin").css({
            display: "inline-block"
        });
        $(".usr-signin").show();
        $("#sign-out").hide();
        $(document).delegate("a.needsreg", "click", function (e) {
            needsReg($(this), e)
        })
    }
    if (!dontDisplayOffer) {
        displayOffer()
    }
}
if (jQuery && RTR.UX.hasUserData()) {
    updateHeader(true)
}
function updateHeaderCart() {
    $("#usr-cart-count").text(rtr_prop.userCartCount || "0")
}
function isLightRegAuthRequired() {
    var requireAuthParam = getParameterByName("require_auth");
    if (requireAuthParam !== "") {
        var pathsMessages = authorizationRequiredPaths();
        var message = pathsMessages[requireAuthParam];
        displayLightReg(false, requireAuthParam, (typeof (message) === "string") ? message : "Sign in to get the full experience!")
    }
}
var SSP_STYLE_CODE = "XX1";

function purchaseHistoryContainsSsp() {
    if (!rtr_prop || !rtr_prop.reviews || !rtr_prop.reviews.rentalsOrdering) {
        return false
    }
    for (var i in rtr_prop.reviews.rentalsOrdering) {
        if (rtr_prop.reviews.rentalsOrdering.hasOwnProperty(i)) {
            if (rtr_prop.reviews.rentalsOrdering[i] == SSP_STYLE_CODE) {
                return true
            }
        }
    }
    return false
}
var superGrossLoyaltyExperimentLoggedFlag = false;

function displayOffer() {
    var user_data = RTR.UX,
        user = user_data.user || {},
        profile = user.basicUserProfile,
        offerCopy = false,
        detailsCopy, offerType, offerCode, offerUrl, flatDateStringToDateUtc = function (dtString) {
            var tokens = dtString.match(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})?([0-9]{2})?([0-9]{2})?/) || [];
            for (var i = 1; i <= 6 && typeof (tokens[i]) !== "undefined"; i++) {
                tokens[i] = parseInt(tokens[i], 10)
            }
            tokens[2] -= 1;
            return Date.UTC.call(null, tokens[1], tokens[2], tokens[3], tokens[4] || 0, tokens[5] || 0, tokens[6] || 0)
        },
        withinSummerSaleDates = function () {
            var match = window.location.href.match(/debug_now=([^&#]+)/i),
                now = match && match.length ? flatDateStringToDateUtc(match[1]) : new Date().getTime(),
                beginDate = Date.UTC(2013, 8 - 1, 19, 3, 59),
                endDate = Date.UTC(2013, 8 - 1, 27, 3, 59);
            return beginDate < now && now <= endDate
        },
        withinSSPOfferDates = function () {
            var match = window.location.href.match(/debug_now=([^&#]+)/i),
                now = match && match.length ? flatDateStringToDateUtc(match[1]) : new Date().getTime(),
                endDate = Date.UTC(2013, 8 - 1, 19, 3, 59);
            return now <= endDate
        };
    if (profile) {
        var memberForDays = (new Date().getTime() - profile.joined) / (1000 * 60 * 60 * 24) || 0,
            birthday = new Date(profile.birthday),
            now = new Date(new Date().getTime() - (1000 * 60 * 60 * 24)),
            hasOrders = user_data.has_orders || user_data.hasOrders,
            nextBirthdayUtc = new Date(profile.birthday || undefined),
            nextBirthday = new Date(nextBirthdayUtc.getUTCFullYear(), nextBirthdayUtc.getUTCMonth(), nextBirthdayUtc.getUTCDate());
        nextBirthday.setYear(now.getFullYear());
        if (nextBirthday < now) {
            nextBirthday.setYear(now.getFullYear() + 1)
        }
        var birthdayDaysAway = profile.birthday ? Math.floor((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : -1;
        var aDayInMilliseconds = 24 * 60 * 60 * 1000;
        var endoOfDayToday = function () {
                return Math.ceil(new Date().getTime() / aDayInMilliseconds) * aDayInMilliseconds - 1
            },
            hasNewOrderInTimeframe = function (user_ordergroups, tsBegin, tsEnd) {
                if (!user_ordergroups || !user_ordergroups.length) {
                    return false
                }
                for (var i = 0; i < user_ordergroups.length; i++) {
                    var dateTokens = user_ordergroups[i].created.split(/[^0-9]+/g);
                    dateTokens[1] -= 1;
                    var orderPlacedDate = Date.UTC.apply(null, dateTokens) / 1000;
                    if (tsBegin <= orderPlacedDate && orderPlacedDate <= tsEnd) {
                        return true
                    }
                }
                return false
            },
            eligibleForLastChanceLoyaltyOffer = function (user_detail) {
                if (!user_detail || !user_detail.order_groups) {
                    return false
                }
                var tsToday = endoOfDayToday() / 1000,
                    eligibility_cutoff_days = 9;
                for (var i = 0; i < user_detail.order_groups.length; i++) {
                    if (Math.floor((tsToday - user_detail.order_groups[i].rentEnd) / 24 / 60 / 60) == eligibility_cutoff_days && !hasNewOrderInTimeframe(user_detail.order_groups, user_detail.order_groups[i].rentEnd, user_detail.order_groups[i].rentEnd + eligibility_cutoff_days * 24 * 60 * 60)) {
                        return user_detail.order_groups[i]
                    }
                }
                return false
            },
            eligibleForLoyaltyOffer = function (user_detail) {
                if (!user_detail || !user_detail.order_groups) {
                    return false
                }
                var tsToday = endoOfDayToday() / 1000,
                    eligibility_cutoff_days = 9;
                for (var i = 0; i < user_detail.order_groups.length; i++) {
                    if (tsToday > user_detail.order_groups[i].rentEnd && Math.floor((tsToday - user_detail.order_groups[i].rentEnd) / 24 / 60 / 60) <= eligibility_cutoff_days && !hasNewOrderInTimeframe(user_detail.order_groups, user_detail.order_groups[i].rentEnd, user_detail.order_groups[i].rentEnd + eligibility_cutoff_days * 24 * 60 * 60)) {
                        return user_detail.order_groups[i]
                    }
                }
                return false
            };
        var LOYALTY_EXPERIMENT = 14,
            eligibleOrder;
        if (RTR.UX.isProMember && birthdayDaysAway >= 0 && birthdayDaysAway <= 14) {
            var oneWeekAfterBday = nextBirthday;
            oneWeekAfterBday.setDate(nextBirthday.getDate() + 7);
            offerCode = "RTRPROBDAY50";
            offerCopy = "HAPPY BIRTHDAY, PRO! CELEBRATE WITH YOUR $50 CREDIT code: " + offerCode;
            detailsCopy = "Valid on rental orders only. Rental start date must be on or before " + DF.mdyy(oneWeekAfterBday) + ". Promotional offers cannot be combined.";
            $.cookie("bdayOff", "50", {
                path: "/",
                expires: 20
            })
        } else {
            if ($.cookie("bdayOff") != "20" && memberForDays >= 45 && birthdayDaysAway >= 0 && birthdayDaysAway <= 14 && !hasOrders) {
                offerCode = "RTRBDAY50M783";
                offerCopy = "HAPPY BIRTHDAY! GET $50 OFF YOUR NEXT RENTAL code: " + offerCode;
                detailsCopy = "Valid on rental orders of $100 or greater. Offer expires " + DF.mdyy(nextBirthday) + ". Promotional offers cannot be combined.";
                $.cookie("bdayOff", "50", {
                    path: "/",
                    expires: 20
                })
            } else {
                if (!hasOrders) {
                    offerCode = "FIRSTRTR25X754";
                    offerCopy = "ENJOY $25 OFF YOUR FIRST RENTAL code: " + offerCode;
                    detailsCopy = "Offer is valid for new customers only, for a limited time. Valid on rental orders of $75 or greater. This offer is only valid for the account associated with " + profile.email + ". Promotional offers cannot be combined."
                } else {
                    if ($.cookie("bdayOff") != "50" && memberForDays >= 45 && birthdayDaysAway >= 0 && birthdayDaysAway <= 14 && hasOrders) {
                        offerCode = "RTRBDAY20X498";
                        offerCopy = "HAPPY BIRTHDAY! GET $20 OFF YOUR NEXT RENTAL code: " + offerCode;
                        detailsCopy = "Valid on rental orders of $100 or greater. Offer expires " + DF.mdyy(nextBirthday) + ". Promotional offers cannot be combined.";
                        $.cookie("bdayOff", "20", {
                            path: "/",
                            expires: 20
                        })
                    } else {
                        if ((eligibleOrder = eligibleForLastChanceLoyaltyOffer(user_data))) {
                            var experimentOfferCode = [null, "20OFFNEXT88YR3", "25OFFNEXT96NR5"],
                                experimentOfferCopy = ["", "LAST CHANCE - ENJOY $20 OFF YOUR NEXT RENTAL TODAY ONLY code: " + experimentOfferCode[1], "LAST CHANCE - ENJOY $25 OFF YOUR NEXT RENTAL TODAY ONLY code: " + experimentOfferCode[2]],
                                experimentDetailsCopy = ["", "Offer is valid for repeat customers only, until " + DF.mdyy(eligibleOrder.rentEnd * 1000 + 9 * aDayInMilliseconds) + ". Valid on rental orders of $100+. This offer is only valid for the account associated with " + profile.email + ". Promotional offers cannot be combined.", "Offer is valid for repeat customers only, until " + DF.mdyy(eligibleOrder.rentEnd * 1000 + 9 * aDayInMilliseconds) + ". Valid on rental orders of $75+. This offer is only valid for the account associated with " + profile.email + ". Promotional offers cannot be combined."],
                                treatmentInx = user_data.experiments.exp[LOYALTY_EXPERIMENT] - 1;
                            offerCode = experimentOfferCode[treatmentInx];
                            offerCopy = experimentOfferCopy[treatmentInx];
                            detailsCopy = experimentDetailsCopy[treatmentInx];
                            offerType = "last-change-loyalty";
                            if (!superGrossLoyaltyExperimentLoggedFlag) {
                                logAppliedExperiment(LOYALTY_EXPERIMENT, user_data.experiments.exp[LOYALTY_EXPERIMENT], user_data.experiments.seg)
                            }
                            superGrossLoyaltyExperimentLoggedFlag = true
                        } else {
                            if ((eligibleOrder = eligibleForLoyaltyOffer(user_data))) {
                                var experimentOfferCode = [null, "20OFFNEXT88YR3", "25OFFNEXT96NR5"],
                                    experimentOfferCopy = ["", "ONE WEEK ONLY - ENJOY $20 OFF YOUR NEXT RENTAL code: " + experimentOfferCode[1], "ONE WEEK ONLY - ENJOY $25 OFF YOUR NEXT RENTAL code: " + experimentOfferCode[2]],
                                    experimentDetailsCopy = ["", "Offer is valid for repeat customers only, until " + DF.mdyy(eligibleOrder.rentEnd * 1000 + 9 * aDayInMilliseconds) + ". Valid on rental orders of $100+. This offer is only valid for the account associated with " + profile.email + ". Promotional offers cannot be combined.", "Offer is valid for repeat customers only, until " + DF.mdyy(eligibleOrder.rentEnd * 1000 + 9 * aDayInMilliseconds) + ". Valid on rental orders of $75+. This offer is only valid for the account associated with " + profile.email + ". Promotional offers cannot be combined."],
                                    treatmentInx = user_data.experiments.exp[LOYALTY_EXPERIMENT] - 1;
                                offerCode = experimentOfferCode[treatmentInx];
                                offerCopy = experimentOfferCopy[treatmentInx];
                                detailsCopy = experimentDetailsCopy[treatmentInx];
                                offerType = "loyalty";
                                if (!superGrossLoyaltyExperimentLoggedFlag) {
                                    logAppliedExperiment(LOYALTY_EXPERIMENT, user_data.experiments.exp[LOYALTY_EXPERIMENT], user_data.experiments.seg)
                                }
                                superGrossLoyaltyExperimentLoggedFlag = true
                            } else {
                                if (withinSummerSaleDates()) {
                                    offerType = "end-of-summer-sale standard-content";
                                    offerCopy = "END OF SUMMER SALE: <strong>30% OFF* ALL RENTALS</strong> code: SURPRISE2013";
                                    detailsCopy = "*Offer is valid on rentals of $100+ and expires on 08/25/13 at 11:59 pm EST. Offer is not eligible on existing or previously placed orders. Promotional offers cannot be combined.";
                                    offerCode = "SURPRISE2013"
                                } else {
                                    if (withinSSPOfferDates()) {
                                        var sspOfferBar = function () {
                                            if (!purchaseHistoryContainsSsp()) {
                                                offerType = "saleable summer-style-pass";
                                                offerCopy = "<strong>SUMMER STYLE PASS:</strong> 3 OUTFITS ONLY $75 EACH <a href='/pages/summer_style_pass?act_type=click_promo_SSP'><strong>Learn More</strong></a>";
                                                detailsCopy = null;
                                                offerCode = "";
                                                offerUrl = "/pages/summer_style_pass";
                                                paintOfferBar(offerCopy, detailsCopy, offerType, offerCode, offerUrl)
                                            }
                                        };
                                        if (rtr_prop && rtr_prop.reviews && rtr_prop.reviews.callcomplete) {
                                            sspOfferBar()
                                        } else {
                                            $document = $(document);
                                            $document.delegate($document, "reviewsDataRetrievalComplete", sspOfferBar)
                                        }
                                    } else {
                                        offerType = null;
                                        offerCopy = null;
                                        offerCode = null;
                                        detailsCopy = null
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        offerCode = "";
        offerCopy = "ENJOY $25 OFF YOUR FIRST RENTAL&nbsp;&nbsp;<a href='javascript:void(0)' class='pop-lr-registration white'>Join Now</a>";
        detailsCopy = null;
        offerUrl = "/signup"
    }
    paintOfferBar(offerCopy, detailsCopy, offerType, offerCode, offerUrl)
}
$(document).bind("membershipStatusReady", function () {
    if (jQuery && RTR.UX.hasUserData()) {
        displayOffer()
    }
});

function paintOfferBar(offerCopy, detailsCopy, offerType, offerCode, offerUrl) {
    var $offerWrapper = $(".offer-wrapper"),
        previousHtml = $offerWrapper.html();
    if (!previousHtml) {
        previousHtml = ""
    }
    $offerWrapper.empty();
    if (offerCopy) {
        var offerHtml = new Offer({
            copy: offerCopy,
            details: detailsCopy,
            type: offerType
        }).paint();
        $(".offer-wrapper").html(offerHtml);
        if (offerHtml.replace(/"/g, "'") != previousHtml.replace(/"/g, "'")) {
            logPixel({
                action: "dynamic_load",
                object_type: "top_nav",
                nav_location: "promo_banner",
                nav_content: offerCopy,
                promo_code: offerCode || "",
                promo_url: offerUrl || ""
            })
        }
    }
    $(document).trigger("offerBarReady")
}
function displayInviteFriends() {
    if (!$.cookie("inviteShown")) {
        var tmpl = _.template($("#invite-friends-temp").html());
        if ($("#invite-friends-wrapper").length === 0) {
            $("body").append(tmpl())
        }
        $("#invite-friends-wrapper").show();
        $("body").addClass("no-scroll");
        $.cookie("inviteShown", "y", {
            path: "/"
        });
        $("#invite-friends-form").ajaxForm({
            url: "/rtr_invite.php",
            type: "post",
            dataType: "json",
            beforeSend: function () {
                $("#invite-friends .invite-friends-loader").show()
            },
            complete: function () {
                $("#invite-friends .invite-friends-loader").hide();
                $("#invite-friends-wrapper").hide();
                $("body").removeClass("no-scroll")
            }
        });
        $(document).delegate("#invite-friends-wrapper, #invite-friends .invite-friends-x", "click", function () {
            $("#invite-friends-wrapper").hide();
            $("body").removeClass("no-scroll")
        });
        $(document).delegate("#invite-friends", "click", function (e) {
            e.stopPropagation()
        })
    }
}
function highlightNavLink() {
    var path = window.location.pathname;
    if (path.match(/\/ourrunway/)) {
        $(".nv-item-ourrunway").addClass("nv-item-highlight")
    } else {
        if (path.match(/\/whatsnew/)) {
            $(".nv-item-whatsnew").addClass("nv-item-highlight")
        } else {
            if (path.match(/\/dress\/search/) || path.match(/\/dress\/popular/)) {
                $(".nv-item-dresses").addClass("nv-item-highlight")
            } else {
                if (path.match(/\/accessory\/search/)) {
                    $(".nv-item-accessories").addClass("nv-item-highlight")
                } else {
                    if (path.match(/\/essential\/search/)) {
                        $(".nv-item-essentials").addClass("nv-item-highlight")
                    } else {
                        if (path.match(/\/occasion/)) {
                            $(".nv-item-occasions").addClass("nv-item-highlight")
                        } else {
                            if ((path.match(/designers/) && !path.match(/shop\/designers/)) || path.match(/designer_detail/)) {
                                $(".nv-item-designers").addClass("nv-item-highlight")
                            }
                        }
                    }
                }
            }
        }
    }
}
function setSEMCookie() {
    var url = $.url(encodeURI(window.location.toString()));
    var campaign = url.param("campaign");
    if (campaign && campaign.toLowerCase().match(/ppc/) && !campaign.toLowerCase().match(/brand/)) {
        $.cookie("paid", 1, {
            path: "/",
            expires: 30
        })
    }
}
$(document).ready(function () {
    var fnUdr = function () {
        logPageLoad();
        updateHeader();
        var windowURL = $.url(encodeURI(window.location.toString()));
        if (windowURL.param("registration") == "new") {
            displayInviteFriends()
        }
        if (!$.cookie("paid")) {
            RTR.UX.logExperiment(12)
        }
        RTR.UX.logExperiment(17);
        RTR.UX.logExperiment(19)
    };
    if (RTR.UX.hasUserData()) {
        fnUdr()
    } else {
        $(document).bind("userDataReady", fnUdr)
    }
    $(document).bind("userCartCountReady", updateHeaderCart);
    personalize();
    isLightRegAuthRequired();
    setReferralCookie();
    setSEMCookie();
    highlightNavLink();
    setupPlaceholders();
    $(document).delegate(".promo-details", "click", function () {
        rtr_add_popup_mini("", $(this).data("details"), $(this), "left", "diamond", 0, 14)
    });
    $(document).delegate("a.sign-in, button.sign-in", "click", function () {
        var cb = (typeof (rtr_prop.appPath) === "string") ?
            function () {} : null;
        displayLightReg(cb, "myaccount-dropdown", "Sign in to access your account", "login")
    });
    $(document).delegate(".pop-lr-registration", "click", function () {
        log_click_joinnow();
        var cb = (typeof (rtr_prop.appPath) === "string") ?
            function () {} : null;
        displayLightReg(cb, "offer-joinnow", null, "registration")
    });
    $("#nv-search-form").submit(function (e) {
        e.preventDefault();
        var $searchField = $(this).find("input#nv-searchfld"),
            searchText = $searchField.val();
        if (!searchText) {
            window.location.href = "/dress/search";
            return
        }
        var searchUrl = "/search/apachesolr_search/" + encodeURIComponent(searchText);
        window.location.href = searchUrl
    });
    $("#usr-cart-link").click(function () {
        log_click_shopping_bag()
    });
    $(".hd-reviews").click(function () {
        log_click_review_topnav()
    });
    $(".nv-group").hoverIntent({
        over: function () {
            var $navMenu = $(this).find(".nv-menu").show();
            if (PageSpeed) {
                $navMenu.find("img." + PageSpeed.LazyLoadClassname).each(function (index, img) {
                    PageSpeed.loadLazyImage(img)
                })
            }
        },
        out: function () {
            $(this).find(".nv-menu").hide()
        },
        timeout: 300
    });
    $(".nv-group .nv-menu").hoverIntent({
        over: function () {
            $(this).show()
        },
        out: function () {
            $(this).hide()
        },
        timeout: 200
    });
    $("#usr-cart").click(function () {
        rtr_view_cart();
        return false
    })
});

function adjustReviewBackground() {
    var string = $(".hd-notif").text();
    var charCount = string.length;
    if (charCount > 1) {
        $(".hd-review-bg").css({
            right: "-2px",
            position: "relative"
        })
    }
}
function checkUrlForNavHighlighting(string, checkHash) {
    var navHash = window.location.hash;
    var navPath = window.location.pathname;
    if (!checkHash) {
        return navPath.search(string) >= 0
    } else {
        return (navPath.search(string) >= 0) && (navHash.search("Fashion Solutions") >= 0 || navHash.search("Lingerie") >= 0 || navHash.search("Shapewear") >= 0 || navHash.search("Tights") >= 0 || navHash.search("Beauty Products") >= 0)
    }
}
function show_stylist_suggestions_lightbox() {
    var thing = $("#header_top_msg_lightbox_bg, #header_top_msg_lightbox");
    thing.remove();
    $("body").append(thing).fadeIn("slow");
    $("#header_top_msg_lightbox").fadeIn("slow");
    $("#header_top_msg_lightbox_bg").css("display", "block").animate({
        opacity: 0.3
    });
    var action = "fit_guaranteed_click"
}
function userHasUID() {
    return !isNaN(rtr_prop.uid) && rtr_prop.uid > 0
}
function setPersonalizedData(data) {
    if (data.user) {
        rtr_prop.user = data.user;
        rtr_prop.hasOrders = data.has_orders;
        if (typeof (rtr_prop.user) == "object" && typeof (rtr_prop.user.basicUserProfile) == "object") {
            var uid = rtr_prop.user.basicUserProfile.userId;
            rtr_prop.uid = uid;
            $("meta[name='uid']").attr("content", uid);
            if (!$.cookie("RTRmail")) {
                $.cookie("RTRmail", '{"mail":"' + rtr_prop.user.basicUserProfile.email + '"}', {
                    expires: 3650,
                    path: "/"
                })
            } else {
                try {
                    var cookieObj = $.parseJSON($.cookie("RTRmail"));
                    if (cookieObj && cookieObj.mail && cookieObj.mail != rtr_prop.user.basicUserProfile.email) {
                        $.cookie("RTRmail", '{"mail":"' + rtr_prop.user.basicUserProfile.email + '"}', {
                            expires: 3650,
                            path: "/"
                        })
                    }
                } catch (err) {}
            }
        }
    }
    if (data.experiments) {
        rtr_prop.experiments = data.experiments
    }
}
function personalize() {
    if (RTR.UX.isDrupal() && !RTR.UX.hasUserData()) {
        $.extend(RTR.UX, rtr_prop)
    }
    if (RTR.UX.hasUserData()) {
        setPersonalizedData(RTR.UX);
        $(document).trigger("userDataReady")
    } else {
        if (RTR.UX.isDrupal() && typeof (rtr_prop.appPath) === "string") {
            var url = rtr_prop.appPath + "/personalization";
            if (typeof (pdp_glob) !== "undefined" && pdp_glob.item && pdp_glob.item.styleName) {
                url += "?styleName=" + pdp_glob.item.styleName
            }
            $.ajax({
                type: "GET",
                dataType: "json",
                url: url,
                cache: false,
                success: function (data, status, jq) {
                    setPersonalizedData(data);
                    $.extend(window.RTR.UX, data)
                },
                error: function (resp, status, error) {
                    if (resp.status && resp.status != 401) {
                        Airbrake.notify("/personalization failed " + resp.status, "header.js", 291)
                    }
                },
                complete: function () {
                    $(document).trigger("userDataReady")
                }
            })
        } else {
            $(document).trigger("userDataReady")
        }
    }
    if (!RTR.UX.getUserId() || typeof (rtr_prop.appPath) != "string") {
        $(document).trigger("userCartCountReady")
    } else {
        var url = "/ajax/get/user_cart_count";
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url,
            cache: false,
            success: function (data, status, jq) {
                if (data) {
                    rtr_prop.userCartCount = data.count
                } else {
                    rtr_prop.userCartCount = null
                }
            },
            error: function (resp, status, error) {
                if (resp.status && resp.status != 401) {
                    try {
                        window.Airbrake.notify("/ajax/get/user_cart_count failed: " + resp.status, "header.js", 398)
                    } catch (e) {}
                }
                rtr_prop.userCartCount = null
            },
            complete: function () {
                $(document).trigger("userCartCountReady")
            }
        })
    }
}
function logHeaderAnalyticsEvent(analyticsData) {
    analyticsData.object_type = "top_nav";
    analyticsData.context = window.location.href;
    logPixel(analyticsData)
}
function getMyAccountDropdownPosition() {
    var buffers = 24;
    var offset = ($(".hd-myaccount-link").length) ? $(".hd-myaccount-link").position().left : 0;
    var width = $(".hd-myaccount-link").width() + offset + buffers;
    var pos = 330 - width;
    return pos
}
function getHeaderPromoTemplate(promoData) {
    if (promoData) {
        $.ajax({
            url: "/public/templates/header-promo.html",
            success: function (temp) {
                var promoTemplate = _.template(temp);
                var output = $(promoTemplate(promoData));
                $(".nav2012_header").prepend(output);
                logHeaderPromoData()
            },
            error: function (temp) {
                window.Airbrake.notify("getHeaderPromoTemplate failed for Promo " + promoData.promo_title, "header.js", 411)
            }
        })
    }
}
function logHeaderPromoData() {
    analyticsData = {};
    var promoTitle = $(".hd-promo").data("promoId");
    var promoCode = $("#hd-promo-code").text();
    var treatmentId = $(".hd-promo").data("treatmentId");
    if (promoCode) {
        analyticsData.promoTitle = promoTitle;
        analyticsData.promoCode = promoCode
    }
    if (treatmentId) {
        analyticsData.treatmentId = treatmentId
    }
    logHeaderAnalyticsEvent(analyticsData)
}
function displayLightReg(callback, source, message, view) {
    reg_light_default.display_modal({
        callback: callback,
        source: source,
        message: message,
        view: view
    })
}
function hasClientDateTimeElapsed(utcDateTime) {
    if (utcDateTime) {
        var currentTimestamp = new Date().getTime();
        return currentTimestamp >= utcDateTime
    }
    return false
}
function setReferralCookie() {
    var windowURL = $.url(encodeURI(window.location.toString()));
    if (windowURL.param("campaign")) {
        $.cookie("refCampaign", windowURL.param("campaign"), {
            path: "/",
            expires: 30
        })
    }
}
function setupPlaceholders() {
    test = document.createElement("input");
    if (!("placeholder" in test)) {
        var active = document.activeElement;
        $("[placeholder]").focus(function () {
            var input = $(this);
            if (input.val() == input.attr("placeholder")) {
                input.val("");
                input.removeClass("placeholder")
            }
        }).blur(function () {
                var input = $(this);
                if (input.val() == "" || input.val() == input.attr("placeholder")) {
                    input.addClass("placeholder");
                    input.val(input.attr("placeholder"))
                }
            }).blur();
        $("[placeholder]").parents("form").submit(function () {
            $(this).find("[placeholder]").each(function () {
                var input = $(this);
                if (input.val() == input.attr("placeholder")) {
                    input.val("")
                }
            })
        });
        $(active).focus()
    }
}
function ShoppingBag() {
    var _payload = "";
    var _giftcardSubtotal = 0;
    this.reservationBookingIds = [];
    this.skus = [];
    this.template = function (payload) {
        payload = payload || {};
        var tmpl = _.template($("#shopping-bag-tmpl").html());
        var groups = payload.groups ? payload.groups : null;
        var giftcards = payload.giftcards ? payload.giftcards : null;
        _giftcardSubtotal = 0;
        var groupsMarkup = (groups || giftcards) ? this.templateGroups(groups, payload.groupSummary, giftcards) : null;
        var subTotal = this.calculateSubtotal(payload);
        var markup = tmpl({
            groups: groupsMarkup,
            subtotal: subTotal
        });
        $("div#rtr_cart_content").remove();
        $("div#rtr_cart").append(markup)
    };
    this.calculateSubtotal = function (payload) {
        var subtotal = 0;
        if (payload.pricing && payload.pricing.subTotal) {
            subtotal += this.parsePrice(payload.pricing.subTotal)
        }
        if (payload.pricing && payload.pricing.totalInsurance) {
            subtotal += this.parsePrice(payload.pricing.totalInsurance)
        }
        return subtotal
    };
    this.templateGroups = function (groups, groupSummary, giftcards) {
        var markup = [];
        var tmpl = _.template($("#shopping-bag-groups-tmpl").html());
        for (var i in groups) {
            var groupMarkup = [];
            var groupItems = groups[i].items;
            var groupRules = groups[i].rules;
            for (var j in groupItems) {
                var item = groupItems[j];
                var itemMarkup = this.templateItem(item, groupRules, groupSummary);
                groupMarkup.push(itemMarkup)
            }
            markup.push(tmpl({
                items: groupMarkup.join("")
            }))
        }
        if (giftcards && giftcards.length) {
            var gcMarkup = this.templateGiftCards(giftcards);
            markup.push(tmpl({
                items: gcMarkup
            }))
        }
        return markup.join("")
    };
    this.templateItem = function (itemDecorated, groupRules, groupSummary) {
        var self = this;
        var booking = itemDecorated.bookingDecorated.reservationBooking;
        booking.primarySize = this.getSizeFromSku(itemDecorated.sku);
        booking.backupSKU = itemDecorated.backupSKU ? itemDecorated.backupSKU : null;
        booking.backupSize = itemDecorated.backupSKU ? this.getSizeFromSku(itemDecorated.backupSKU) : null;
        booking.backupId = itemDecorated.backupId;
        booking.charge = this.parsePrice(itemDecorated.charge);
        booking.insurance = this.parsePrice(itemDecorated.insurance);
        booking.groupId = itemDecorated.groupId;
        booking.reservationBookingDetail.formattedRentBegin = this.getFormattedDate(booking.reservationBookingDetail.rentalBeginDate);
        booking.reservationBookingDetail.formattedRentEnd = this.getFormattedDate(booking.reservationBookingDetail.rentalEndDate);
        var item = itemDecorated.bookingDecorated.item;
        item.isSecondStyle = itemDecorated.pricingRule == "SECOND_STYLE";
        item.isSaleableProduct = item.type == "SaleableProduct";
        item.isAccessory = item.type == "Accessory";
        item.isDress = item.type == "Dress";
        var tmpl = _.template($("#shopping-bag-item-tmpl").html());
        var selectShippingTmpl = function () {
            var hasBulkOnlyGroups = false;
            for (var i in groupSummary) {
                groupSummary[i].formattedRentBegin = self.getFormattedDate(groupSummary[i].rentBegin);
                if (groupSummary[i].bulkOnly) {
                    hasBulkOnlyGroups = true
                }
            }
            var params = {
                booking: booking,
                groupSummary: groupSummary,
                hasBulkOnlyGroups: hasBulkOnlyGroups
            };
            return _.template($("#shopping-bag-shipping-select").html(), params)
        };
        return tmpl({
            booking: booking,
            item: item,
            rules: groupRules,
            helpers: {
                selectShipping: selectShippingTmpl
            }
        })
    };
    this.templateGiftCards = function (giftcards) {
        var gcMarkup = "";
        var tmpl = _.template($("#shopping-bag-gift-card-tmpl").html());
        for (var i in giftcards) {
            gcMarkup += tmpl({
                giftcard: giftcards[i]
            });
            _giftcardSubtotal += parseFloat(giftcards[i].value)
        }
        return gcMarkup
    };
    this.setSkusAndReservationBookings = function (data) {
        this.skus = [];
        this.reservationBookingIds = [];
        for (var i in data.groups) {
            var group = data.groups[i];
            for (var j in group.items) {
                var item = group.items[j];
                this.reservationBookingIds.push(j);
                if (item.backupId) {
                    this.reservationBookingIds.push(item.backupId)
                }
                if (item.sku) {
                    this.skus.push(item.sku)
                }
                if (item.backupSKU) {
                    this.skus.push(item.backupSKU)
                }
            }
        }
    };
    this.getContents = function (usePreloader, callback) {
        if (typeof (usePreloader) === "undefined") {
            usePreloader = true
        }
        var self = this,
            fnComplete = function (data) {
                if (typeof (callback) === "function") {
                    callback(data)
                } else {
                    self.template(data)
                }
            };
        if (RTR.UX.getUserId()) {
            var xhr = $.ajax({
                type: "GET",
                url: "/rtr_shopping_bag.php",
                data: {
                    action: "getContents"
                },
                dataType: "json",
                cache: "false",
                beforeSend: function () {
                    if (usePreloader) {
                        $("div#rtr_cart_loader").show();
                        $("div#rtr_cart_content").remove()
                    }
                },
                success: function (data) {
                    _payload = data;
                    self.setSkusAndReservationBookings(data);
                    fnComplete(data)
                },
                error: function () {
                    fnComplete()
                },
                complete: function () {
                    if (usePreloader) {
                        $("div#rtr_cart_loader").hide()
                    }
                }
            })
        } else {
            fnComplete()
        }
    };
    this.getSizeFromSku = function (sku) {
        if (sku.length && sku.indexOf("_") > -1) {
            return sku.split("_")[1]
        } else {
            return ""
        }
    };
    this.getFormattedDate = function (date) {
        if (typeof (date) !== "string") {
            return ""
        }
        if (date.indexOf("T") > -1) {
            date = date.split("T")[0].split("-")
        }
        var parsedDate = new Date(parseInt(date[0], 10), parseInt(date[1], 10) - 1, parseInt(date[2], 10));
        var monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthsAbbr[parsedDate.getMonth()] + " " + parsedDate.getDate() + ", " + parsedDate.getFullYear()
    };
    this.parsePrice = function (price) {
        price = price.replace("USD ", "");
        return parseFloat(price)
    }
}
function log_click_joinnow() {
    var options = {
        object_type: "top_nav",
        action: "click_joinnow",
        nav_location: "top_banner"
    };
    logPixel(options)
}
function log_click_stylistchat() {
    var options = {
        object_type: "top_nav",
        action: "click_stylistchat",
        nav_location: "contact_bar"
    };
    logPixel(options)
}
function log_click_review_topnav() {
    var options = {
        object_type: "top_nav",
        action: "click_review_topnav",
        nav_location: "user_account"
    };
    logPixel(options)
}
function log_click_shopping_bag() {
    var options = {
        object_type: "top_nav",
        action: "click_shopping_bag",
        nav_location: "user_account",
        rb_id: "",
        styles: ""
    };
    logPixel(options)
}
function log_click_insurance_help() {
    var options = {
        object_type: "top_nav",
        action: "click_insurance_help",
        nav_location: "shopping_cart"
    };
    logPixel(options)
}
function log_click_second_style_help() {
    var options = {
        object_type: "top_nav",
        action: "click_secondstyle_help",
        nav_location: "shopping_cart"
    };
    logPixel(options)
}
function log_close_cart() {
    var options = {
        object_type: "top_nav",
        action: "close_cart",
        nav_location: "shopping_cart"
    };
    logPixel(options)
}
function log_remove_item() {
    var options = {
        object_type: "top_nav",
        action: "remove_item",
        nav_location: "shopping_cart",
        rb_id: "",
        style_name: ""
    };
    logPixel(options)
}
function log_remove_backup_size() {
    var options = {
        object_type: "top_nav",
        action: "remove_backupsize",
        nav_location: "shopping_cart",
        rb_id: "",
        style_name: ""
    };
    logPixel(options)
}
var experimentOverride = (function () {
    var mapping = {},
        hasCookieSupport = (typeof ($.cookie) === "function"),
        hasJsonSupport = (typeof (JSON) === "object" && typeof (JSON.stringify) === "function"),
        cookieName = "rtr_exp";
    var init = (function () {
        var params = window.location.search.replace(/[\?\[\]]/g, "").split("&");
        for (i in params) {
            var param = params[i].split("=");
            if (param[0] === "exp") {
                var map = param[1].split(",");
                setMapping(map[0], map[1])
            }
        }
        if (hasCookieSupport && hasJsonSupport) {
            var cookie = JSON.parse($.cookie(cookieName));
            for (i in cookie) {
                if (!mapping.hasOwnProperty(i)) {
                    mapping[i] = cookie[i]
                }
            }
        }
        persistAsCookie()
    })();

    function setMapping(experimentId, treatmentId) {
        if (!isNaN(experimentId) && !isNaN(treatmentId)) {
            mapping[experimentId] = parseInt(treatmentId, 10)
        }
    }
    function unsetCookie() {
        return hasCookieSupport ? $.cookie(cookieName, null, "/") : false
    }
    function persistAsCookie() {
        if (hasCookieSupport && hasJsonSupport) {
            return $.cookie(cookieName, JSON.stringify(mapping), "/")
        }
    }
    return {
        get: function () {
            return mapping
        },
        set: function (experimentId, treatmentId) {
            if (experimentId && treatmentId) {
                setMapping(experimentId, treatmentId);
                persistAsCookie();
                return true
            } else {
                return false
            }
        },
        unset: function () {
            mapping = {};
            unsetCookie()
        }
    }
})();
var $shortlistNavigation = $("#shortlist-navigation"),
    navigationTemplateHtml = $("#tpl-shortlist-navigation").html();
$("#usr-favorites").mouseover(function (e) {
    e.preventDefault();
    ShortlistClient.getShortlists(function (success, shortlists) {
        if (success) {
            $shortlistNavigation.html(_.template(navigationTemplateHtml, {
                shortlists: shortlists
            }))
        }
    });
    return false
}).toggleClass("admin-view", RTR.UX.isAdmin());

function get_cart_items() {
    if (rtr_prop.enableShoppingBag) {
        rtr_prop.shoppingBag.getContents(false)
    } else {
        var url_q = "/?q=cart";
        $.ajax({
            type: "GET",
            url: url_q,
            data: "",
            complete: function () {},
            success: function (msg) {
                $("div#rtr_cart_loader").hide();
                $("div#rtr_cart_content").html("");
                $("div#rtr_cart_content").html(msg);
                $("div#rtr_cart_content").show()
            }
        })
    }
}
function remove_cart_item(cart_item_id, cid, query) {
    var url_q = "/?q=cart/remove_item/" + cart_item_id + "/noredirect&" + query;
    $.ajax({
        type: "GET",
        url: url_q,
        data: "",
        complete: function () {},
        success: function () {
            update_cart_item_count();
            get_cart_items()
        }
    })
}
function remove_cart_item_giftcard(group_id) {
    var url_q = "/?q=giftcard/remove/" + group_id + "/noredirect";
    $.ajax({
        type: "GET",
        url: url_q,
        data: "",
        complete: function () {},
        success: function () {
            update_cart_item_count();
            get_cart_items()
        }
    })
}
function remove_cart_item_backup_size(cart_item_id, backup_rid) {
    var url_q = "/?q=cart/remove_backup/" + cart_item_id + "/" + backup_rid + "/noredirect";
    $.ajax({
        type: "GET",
        url: url_q,
        data: "",
        complete: function () {},
        success: function () {
            get_cart_items()
        }
    })
}
function update_cart_item_count() {
    var url_q = "/?q=cart/get_item_count";
    $.ajax({
        type: "GET",
        url: url_q,
        data: "",
        complete: function () {},
        success: function (num_items_remaining) {
            set_cart_item_count(num_items_remaining)
        }
    })
}
function set_cart_item_count(num_items_remaining) {
    ($("#cart_item_count").html(num_items_remaining))
}
function set_sessionvals() {
    var edit_select_bill = document.getElementById("edit-select-bill").value;
    var edit_cc_type = "edit_cc_type^^^" + document.getElementById("edit-cc-type").value;
    var edit_cc_number = "edit_cc_number^^^" + document.getElementById("edit-cc-number").value;
    var edit_cc_exp_month = "edit_cc_exp_month^^^" + document.getElementById("edit-cc-exp-month").value;
    var edit_cc_exp_year = "edit_cc_exp_year^^^" + document.getElementById("edit-cc-exp-year").value;
    var edit_cc_cvv = "edit_cc_cvv^^^" + document.getElementById("edit-cc-cvv").value;
    var edit_chk_ship = "edit_chk_ship^^^" + document.getElementById("edit-chk-ship").value;
    var total_orders_value = document.getElementById("edit-total-order").value;
    var CNT = 0;
    var select_ship_cookee = "";
    var select_data_cookee = "";
    var ccvalues = edit_cc_type + "***" + edit_cc_number + "***" + edit_cc_exp_month + "***" + edit_cc_exp_year + "***" + edit_cc_cvv + "***" + edit_chk_ship;
    SetCookie("cc_values", ccvalues);
    SetCookie("edit_select_bill", edit_select_bill);
    for (CNT = 1; CNT <= total_orders_value; CNT++) {
        select_ship_cookee += "edit_select_ship_" + CNT + "^^^" + document.getElementById("edit-select-ship-" + CNT).value + "***";
        var value_data = document.getElementById("edit-ship-" + CNT + "-" + document.getElementById("edit-select-ship-" + CNT).value).value;
        select_data_cookee += "edit_ship_" + CNT + "_" + document.getElementById("edit-select-ship-" + CNT).value + "^^^" + value_data + "***"
    }
    SetCookie("ss_values", "***" + select_ship_cookee);
    SetCookie("sh_values", "***" + select_data_cookee)
}
function unset_flag_cookie() {
    $.cookie("home_page_nov_2011", null);
    SetCookie("flag", "0", -1)
}
function rtr_view_cart() {
    if (!RTR.UX.hasProfile()) {
        return false
    }
    $("#rtr_cart").show();
    if (!rtr_prop.shoppingBag) {
        rtr_prop.shoppingBag = new ShoppingBag()
    }
    rtr_prop.shoppingBag.getContents()
}
function view_cart() {
    $("div#rtr_cart_loader").show();
    $("div#rtr_cart_content").hide();
    get_cart_items()
}
function close_cart() {
    if (rtr_prop.enableShoppingBag) {
        $("div#rtr_cart_content").remove();
        $("#rtr_cart").hide()
    } else {
        $("div#rtr_cart_content").html("");
        $("#rtr_cart").hide()
    }
}
function close_cart_subproduct() {
    $("div#rtr_cart_content_subproduct").html("");
    $("#rtr_cart_subproduct").hide()
}
function rtr_view_subproduct(how_id) {
    $("#rtr_cart_subproduct").show();
    view_subproducts(how_id)
}
function view_subproducts(how_id) {
    $("div#rtr_cart_loader_subproduct").show();
    $("div#rtr_cart_content_subproduct").hide();
    get_cart_subproducts(how_id)
}
function get_cart_subproducts(how_id) {
    var url_q = "/precheckout/showproductpopup/" + how_id;
    $.ajax({
        type: "GET",
        url: url_q,
        data: "",
        complete: function () {},
        success: function (msg) {
            $("div#rtr_cart_loader_subproduct").hide();
            $("div#rtr_cart_content_subproduct").html("");
            $("div#rtr_cart_content_subproduct").html(msg);
            $("div#rtr_cart_content_subproduct").show()
        }
    })
}
function submitgroupform(autosubmit, id) {
    $(id).val(1);
    if (autosubmit == 1) {
        document.getElementById("rtr-cart-checkout-form").submit()
    }
}
var rtr_globals = {};
rtr_globals.prop = {};
rtr_globals.prop.routes = function () {
    var self = this;
    this.base = window.location.hostname;
    this.set_rating = "/ajax/set_user_rating_and_favorite_node";
    this.set_rating_legacy = "/ajax/set/set_user_rating";
    this.get_styles_to_rate = "/ajax/get/nodes_to_rate/";
    this.gridStatsLog = "/ajax/grid/statslog";
    this.queryParams = function (url, params) {
        return url
    }
};
rtr_globals.prop.routes.prototype.integration = function (scope, type, params) {
    var url = "/api/integration/";
    switch (scope) {
        case "dress_designer":
            url += "dresses/filter/";
            break;
        case "accessory_designer":
            url += "accessories/filter/";
            break;
        case "dress":
            switch (type) {
                case "whatsnew":
                    url += "whats_new/filter/";
                    break;
                case "popular":
                    url += "most_popular/filter/";
                    break;
                default:
                    url += "dresses/filter/";
                    break
            }
            break;
        case "accessory":
            switch (type) {
                case "whatsnew":
                    url += "whats_new/filter/";
                    break;
                case "popular":
                    url += "most_popular/filter/";
                    break;
                default:
                    url += "accessories/filter/";
                    break
            }
            break;
        case "essential":
            url += "saleable_products/filter/";
            break;
        case "all":
            switch (type) {
                case "occasions":
                    url += "occasions/filter/";
                    break;
                case "whatsnew":
                    url += "whats_new/filter/";
                    break;
                case "popular":
                    url += "most_popular/filter/";
                    break;
                default:
                    break
            }
            break;
        case "hearts":
            url += "hearted/filter/";
            break;
        default:
            break
    }
    if (typeof (params) === "object") {
        url = self.queryParams(params)
    }
    return url
};
rtr_globals.prop.routes.prototype.productcatalog = function (scope, params) {
    var url = "/api/productcatalog/";
    switch (scope) {
        case "accessory_designer":
            url += "filters/accessories";
            break;
        case "dress_designer":
            url += "filters/dresses";
            break;
        case "dress":
            url += "filters/dresses";
            break;
        case "accessory":
            url += "filters/accessories";
            break;
        case "essential":
            url += "filters/saleable_products";
            break;
        case "all":
        case "hearts":
            url += "filters/all";
            break;
        default:
            break
    }
    if (typeof (params) === "object") {
        url = self.queryParams(params)
    }
    return url
};
var rtr_routes = new rtr_globals.prop.routes();
(function ($) {
    var m = {};
    $.fn.tooltip = function (options) {
        var settings = $.extend({
            width: 200,
            css: {},
            html: "boom",
            clickClose: true,
            esc: false,
            openOnClick: false
        }, options);
        return this.each(function () {
            var self = $(this);
            var position = self.position();
            var _tooltip = $("<span>").addClass("tooltip").css({
                right: "-70px",
                width: settings.width + "px",
                display: "none"
            });
            _tooltip.css(settings.css);
            self.css("position", "relative").after(_tooltip);
            _tooltip.html(settings.html);
            if (settings.openOnClick) {
                $(this).on("click", function () {
                    _tooltip.fadeIn()
                });
                $("body").on("click", function (e) {})
            } else {
                if (settings.esc) {
                    _tooltip.fadeIn().delay(settings.esc).fadeOut()
                } else {
                    _tooltip.fadeIn()
                }
                if (settings.clickClose == true) {
                    _tooltip.click(function () {
                        _tooltip.fadeOut()
                    })
                }
            }
        })
    }
})(jQuery);

function displayReviewLink() {
    rtr_prop.reviews = {
        metadata: {},
        lsExpTime: 30 * 60 * 1000
    };
    var uid = rtr_prop.uid;
    if (uid > 0) {
        getReviewsDataForUser(uid)
    }
    $(document).delegate(".hd-write-review", "click", function () {
        if ($(".rp-modal").length && $(".rp-modal").is(":visible")) {
            $(".rp-modal").hide()
        } else {
            var selectorClass = $(this).attr("class");
            if (rtr_prop.reviews.callcomplete) {
                appendAndDisplayReviewModal(selectorClass);
                var action = "review_topnav=" + JSON.stringify({
                    source: window.location.origin + window.location.pathname
                });
                ext_stats_log(action, "review_notif", "", rtr_prop.uid)
            }
        }
    });
    $(document).delegate(".open_review_form", "click", function () {
        $(".rp-modal").hide();
        var reviewType = $(this).data("reviewtype");
        var action = reviewType + "=" + JSON.stringify({
            styleName: $(this).data("style")
        });
        ext_stats_log(action, "review_notif", "", rtr_prop.uid)
    });
    $(document).delegate(".b-notif, .hd-reviews .hd-notif", "click", function () {
        $(".hd-write-review").click()
    });
    $("body").delegate(".rp-close-x", "mouseenter mouseleave", function (e) {
        if (e.type == "mouseenter") {
            $(this).removeClass("s8-btn-x").addClass("s8-btn-x-on")
        } else {
            $(this).removeClass("s8-btn-x-on").addClass("s8-btn-x")
        }
    });
    $("body").delegate(".rp-close-x", "click", function (e) {
        $(".rp-modal").hide()
    });
    $("body").click(function (event) {
        if (!$(event.target).closest(".rp-modal").length && $(event.target).attr("class") != "hd-write-review") {
            $(".rp-modal").hide()
        }
    })
}
function getReviewsDataForUser(uid) {
    var lsVal = lsValueForKey("revdata");
    var lsObj = (lsVal) ? JSON.parse(lsVal) : null;
    if (lsObj && typeof (lsObj) === "object" && lsObj.uid == uid && (new Date().getTime() - lsObj.timestamp) < rtr_prop.reviews.lsExpTime) {
        rtr_prop.reviews.callcomplete = true;
        curateReviewData(lsObj);
        $(document).trigger("reviewsDataRetrievalComplete")
    } else {
        var url = "/api/benhur/user/reviews/" + uid;
        var nav2012 = $('meta[name="new-nav"]').attr("content");
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url,
            cache: false,
            success: function (data, status, jq) {
                rtr_prop.reviews.callcomplete = true;
                if (jq.status == 200) {
                    data.timestamp = new Date().getTime();
                    data.uid = rtr_prop.uid;
                    lsSetKeyValue("revdata", JSON.stringify(data));
                    curateReviewData(data)
                } else {
                    if (jq.status == 204) {
                        rtr_prop.reviews.no_rentals = true;
                        var obj = {
                            timestamp: new Date().getTime(),
                            uid: rtr_prop.uid,
                            noRentals: true
                        };
                        lsSetKeyValue("revdata", JSON.stringify(obj))
                    }
                }
                $(document).trigger("reviewsDataRetrievalComplete")
            }
        })
    }
}
function curateReviewData(data) {
    rtr_prop.reviews.reviewCount = data.reviewCount;
    rtr_prop.reviews.data = data.styles;
    rtr_prop.reviews.rentalsOrdering = data.rentalsOrdering;
    if (data.noRentals) {
        rtr_prop.reviews.no_rentals = true
    }
    var styles = data.styles;
    rtr_prop.reviews.incomplete = [];
    _.each(styles, function (v, k) {
        if ((!v || (v.photoCount < 1 && v.rating > 5)) && !k.match(/^CLEARANCE_/)) {
            rtr_prop.reviews.incomplete.push(k)
        }
    });
    if (rtr_prop.reviews.rentalsOrdering) {
        rtr_prop.reviews.incomplete.sort(sortFuncIncompleteReviews)
    }
    if (_.size(rtr_prop.reviews.incomplete) > 0) {
        $(".my_reviews_link").append('<span class="b-notif s32-bg-notification">' + _.size(rtr_prop.reviews.incomplete) + "</span>");
        $("#hd-reviews-count").html("(" + _.size(rtr_prop.reviews.incomplete) + ")");
        $(".hd-myaccount").css("right", getMyAccountDropdownPosition());
        adjustReviewBackground();
        if (reviewModalAutoExpand()) {
            appendAndDisplayReviewModal()
        }
    }
    if (typeof (displayNoMomentsMessage) !== "undefined") {
        displayNoMomentsMessage()
    }
}
function reviewModalAutoExpand() {
    var count = _.size(rtr_prop.reviews.incomplete);
    var cookieCount = $.cookie("inc_style_count" + rtr_prop.uid);
    if (window.location.pathname.search("ourrunway") < 0 && (!cookieCount || count > parseInt(cookieCount, 10)) && !isCartNotificationVisible()) {
        $.cookie("inc_style_count" + rtr_prop.uid, count, {
            expires: 7,
            path: "/"
        });
        return true
    }
    $.cookie("inc_style_count" + rtr_prop.uid, count, {
        expires: 7,
        path: "/"
    });
    return false
}
function appendAndDisplayReviewModal(selectorClass) {
    var uid = rtr_prop.uid;
    if ($(".rp-modal").length) {
        if (selectorClass != "hd-write-review") {
            displayReviewModal()
        } else {
            displayReviewModalNav2012()
        }
        appendIncompleteReviews()
    } else {
        var rp_tmpl = _.template($("#review_picker_template").html());
        var obj = {
            uid: uid
        };
        $("body").prepend(rp_tmpl(obj));
        if (selectorClass != "hd-write-review") {
            displayReviewModal()
        } else {
            displayReviewModalNav2012()
        }
        if (rtr_prop.reviews.incomplete && _.size(rtr_prop.reviews.incomplete) > 0) {
            rtr_prop.reviews.shown_styles = [];
            if (rtr_prop.reviews.incomplete.length > 3) {
                for (var i = 0; i < 3; i++) {
                    rtr_prop.reviews.shown_styles.push(rtr_prop.reviews.incomplete[i])
                }
            } else {
                rtr_prop.reviews.shown_styles = rtr_prop.reviews.incomplete
            }
            var url = rtr_routes.productcatalog("all") + "?";
            _.each(rtr_prop.reviews.shown_styles, function (style) {
                url += "styleNames=" + style + "&"
            });
            url += "orderBy=queryStringStyleNames";
            getProductMetadataFromProductCatalog(url, appendIncompleteReviews)
        } else {
            $(".rp-modal .rp-modal-incompletereviews").remove();
            $(".rp-modal .rp-header").html('<img src="/rtr/images/topnavreviews_hdr_welcome.gif" />')
        }
    }
}
function isCartNotificationVisible() {
    var v = false;
    ($(".notif-checkout").length > 0) ? v = true : v = false;
    return v
}
function getProductMetadataFromProductCatalog(url, callbackFunction) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function (data) {
            var products = {};
            _.each(data, function (pt) {
                _.each(pt, function (item) {
                    rtr_prop.reviews.metadata[item.styleName] = item;
                    if (rtr_prop.reviews && rtr_prop.reviews.data && rtr_prop.reviews.data[item.styleName]) {
                        rtr_prop.reviews.metadata[item.styleName].photoCount = rtr_prop.reviews.data[item.styleName].photoCount;
                        rtr_prop.reviews.metadata[item.styleName].rating = rtr_prop.reviews.data[item.styleName].rating
                    }
                })
            });
            callbackFunction();
            if (typeof (Reviews) == "object") {
                Reviews.InitMin()
            }
        }
    })
}
function appendIncompleteReviews() {
    if (rtr_prop.reviews.shown_styles) {
        var rpt_tmpl = _.template($("#review_picker_thumb_template").html());
        var output = "";
        _.each(rtr_prop.reviews.shown_styles, function (style) {
            output += rpt_tmpl(rtr_prop.reviews.metadata[style])
        });
        $(".rp-modal-incompletereviews").html(output)
    }
}
function displayReviewModal() {
    appendReviewModalHeader();
    var pos = $(".hd-write-review").offset();
    var hOffset = $("body").css("margin-top") ? parseInt($("body").css("margin-top")) : 0;
    var linkWidth = $(".hd-write-review").outerWidth();
    var modalWidth = $(".rp-modal").outerWidth();
    $(".rp-modal").css({
        top: (pos.top - hOffset + 25) + "px",
        left: (pos.left - (modalWidth / 2) + (linkWidth / 2)) + "px"
    }).show()
}
function displayReviewModalNav2012() {
    appendReviewModalHeader();
    var pos = $(".hd-reviews").offset();
    var hOffset = $("body").css("margin-top") ? parseInt($("body").css("margin-top")) : 0;
    var linkWidth = $(".hd-reviews").outerWidth();
    var modalWidth = $(".rp-modal").outerWidth();
    $(".rp-modal").css({
        top: (pos.top - hOffset + 20) + "px",
        left: (pos.left - (modalWidth / 2) + (linkWidth / 2)) + "px"
    }).show()
}
function appendReviewModalHeader() {
    var headerTitle = "";
    var headerSubtitle = "";
    var topContributor = "<span class='s32-top_contributor rp-top-contributor'></span>";
    if (rtr_prop.reviews.incomplete && _.size(rtr_prop.reviews.incomplete) > 0) {
        if (rtr_prop.reviews.reviewCount > 2) {
            headerTitle = topContributor + "TOP CONTRIBUTOR";
            headerSubtitle = "Thanks for making RTR better!"
        } else {
            if (rtr_prop.reviews.reviewCount > 0) {
                headerTitle = topContributor + (3 - rtr_prop.reviews.reviewCount) + " reviews away";
                headerSubtitle = "from being a Top Contributor"
            } else {
                headerTitle = "Got a minute?";
                headerSubtitle = "Share your review + photo"
            }
        }
    } else {
        if (rtr_prop.reviews.no_rentals) {
            headerTitle = "Welcome";
            headerSubtitle = "You have no rentals to review"
        } else {
            headerTitle = "Thank you!";
            headerSubtitle = "All your reviews are complete"
        }
    }
    var headerHTML = ["<div class='rp-header-ttl'>", headerTitle, "</div>", "<div class='rp-header-sbttl'>", headerSubtitle, "</div>"].join("");
    $(".rp-modal .rp-header").html(headerHTML)
}
function removeIncompleteStyle(nid) {
    if (typeof (Storage) !== "undefined") {
        localStorage.removeItem("revdata")
    }
    var uid = rtr_prop.uid;
    if (uid > 0) {
        var url = "/api/benhur/user/reviews/" + uid;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url,
            complete: function () {},
            cache: false,
            success: function (data, status, jq) {
                if (jq.status == 200) {
                    rtr_prop.reviews.reviewCount = data.reviewCount;
                    rtr_prop.reviews.data = data.styles;
                    rtr_prop.reviews.rentalsOrdering = data.rentalsOrdering;
                    var styles = data.styles;
                    rtr_prop.reviews.incomplete = [];
                    _.each(styles, function (v, k) {
                        if ((!v || (v.photoCount < 1 && v.rating > 5)) && !k.match(/^CLEARANCE_/)) {
                            rtr_prop.reviews.incomplete.push(k)
                        }
                    });
                    if (rtr_prop.reviews.rentalsOrdering) {
                        rtr_prop.reviews.incomplete.sort(sortFuncIncompleteReviews)
                    }
                    if (_.size(rtr_prop.reviews.incomplete) > 0) {
                        $(".hd-notif").html(_.size(rtr_prop.reviews.incomplete))
                    } else {
                        $(".hd-notif").remove()
                    }
                } else {
                    if (jq.status == 204) {
                        rtr_prop.reviews.no_rentals = true
                    }
                }
                if ($(".rp-modal").is(":visible")) {
                    $(".rp-modal").remove();
                    appendAndDisplayReviewModal()
                } else {
                    $(".rp-modal").remove()
                }
            }
        })
    }
}
function sortFuncIncompleteReviews(a, b) {
    var order = rtr_prop.reviews.rentalsOrdering;
    if ($.inArray(a, order) == -1 || $.inArray(b, order) == -1) {
        return -1
    }
    if ($.inArray(b, order) < $.inArray(a, order)) {
        return 1
    }
    if ($.inArray(b, order) == $.inArray(a, order)) {
        return 0
    }
    if ($.inArray(b, order) > $.inArray(a, order)) {
        return -1
    }
}
function lsSetKeyValue(key, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage[key] = value
    }
}
function lsValueForKey(key) {
    if (typeof (Storage) !== "undefined") {
        return localStorage[key]
    }
    return null
}
$(document).ready(function () {
    if (!getCartNotificationCookie() && RTR.UX.getUserId()) {
        $.get("/rtr_shopping_bag.php?action=getContents", function (data) {
            if (data.groups && typeof (data.groups === "Object")) {
                var cartNotifData = organizeCartData(data);
                popCartRestorationNotification(cartNotifData);
                setCartNotificationUIHandlers(cartNotifData)
            } else {
                setCartNotificationCookie()
            }
        })
    }
});

function setCartNotificationUIHandlers(cartNotifData) {
    $(".notif-close").click(function () {
        $(".tooltip").hide();
        logPixel(logCartNotification("closed", cartNotifData))
    });
    $(".notif-cart-btn").click(function () {
        $(".tooltip").hide();
        logPixel(logCartNotification("view_cart", cartNotifData))
    })
}
function organizeCartData(data) {
    cartNotifData = {};
    for (var groupKey in data.groups) {
        if (data.groups.hasOwnProperty(groupKey)) {
            var t = groupKey.split("rentBegin=")[1];
            var rBegin = t.split("T", 1)[0];
            cartNotifData.rentBegin = rBegin;
            cartNotifData.prettyRentBegin = formatCartNotificationDate(rBegin);
            var u = groupKey.split("rentEnd=")[1];
            var rEnd = u.split("T", 1)[0];
            cartNotifData.rentEnd = rEnd;
            cartNotifData.prettyRentEnd = formatCartNotificationDate(rEnd);
            var count = 0;
            var styles = [];
            for (var i in data.groups[groupKey].items) {
                styles.push(data.groups[groupKey].items[i].bookingDecorated.item.styleName);
                count++
            }
            cartNotifData.itemCount = count;
            cartNotifData.styles = styles.join(",");
            break
        }
    }
    return cartNotifData
}
function formatCartNotificationDate(date) {
    var date = date.split("-", 3);
    var day = parseInt(date[2]);
    var month = (parseInt(date[1]) - 1);
    var year = parseInt(date[0]);
    return $.datepicker.formatDate("MM d, yy", new Date(year, month, day))
}
function userGetsCartNotification() {
    var getsNotification = false;
    if (rtr_prop.user && rtr_prop.user.experiments && rtr_prop.user.experiments["Cart Notification"]) {
        (rtr_prop.user.experiments["Cart Notification"].treatment_name === "getsNotification") ? getsNotification = true : getsNotification = false
    }
    return getsNotification
}
function popCartRestorationNotification(data) {
    var notificationData = {};
    var notificationData = setNotificationData(data);
    var template = _.template($("#cart-notif").html());
    var markup = template(notificationData);
    $("#usr-cart-link").tooltip({
        html: markup,
        clickClose: true,
        esc: 10000
    });
    logPixel(logCartNotification("shown", data));
    setCartNotificationCookie()
}
function setNotificationData(data) {
    var notificationData = {};
    if (data.itemCount > 1) {
        notificationData.verbage = "items are";
        notificationData.date = data.prettyRentBegin
    } else {
        notificationData.verbage = "item is";
        notificationData.date = data.prettyRentBegin
    }
    return notificationData
}
function logCartNotification(action, cartData) {
    analyticsData = {
        object_type: "cart_notification",
        action: action,
        rent_begin_date: cartData.rentBegin,
        rent_end_date: cartData.rentBegin,
        styles: cartData.styles
    };
    return analyticsData
}
function setCartNotificationCookie() {
    $.cookie("cart_notification", 1, {
        path: "/"
    })
}
function getCartNotificationCookie() {
    var val = $.cookie("cart_notification");
    (val == 1) ? val = true : val = false;
    return val
}
ga_constants = {
    carousel_id: {
        pdp_carousel_pairing: "click_completeyourlook_product",
        pdp_carousel_recommendation: "click_youmaylike_product",
        pdp_carousel_recent: "click_recentlyviewed_product",
        pdp_carousel_rand_accessories: "click_morestylistsuggestions_product"
    },
    categoryProduct: "Product",
    categoryHome: "Home",
    categoryHeader: "Header",
    categoryCheckout: "Checkout",
    categoryPrecheckout: "Precheckout",
    categoryReviewForm: "ReviewForm",
    lioliType: {
        product: "Dress",
        accessories: "Accessory"
    },
    categoryOurrunway: "RunwayGrid",
    categoryMyMoments: "MyMoments"
};

function common_ga_event_track(category, action, label, value, opt_noninteraction) {
    _gaq.push(["_trackEvent", category, action, label, value, opt_noninteraction])
}
var bigMinWidth = 360;
var bigMinHeight = 540;
var smallMinWidth = 183;
var smallMinHeight = 275;
var cropAbilityNone = 0;
var cropAbilitySmall = 1;
var cropAbilityBig = 2;
var shortTimeout = 60000;
var longTimeout = 120000;
var rtr_prop = {}
var GA = ga_constants;
var GA_TYPE_DRESS = "D";
var GA_TYPE_ACCESSORY = "A";
var GA_TYPE_SALEABLE = "S";

function gaTrackEvent(action, value) {
    if (!rtr_prop.reviewForm || !rtr_prop.reviewForm.type || !rtr_prop.reviewForm.styleName || !rtr_prop.reviewForm.displayName || !action) {
        return
    }
    if (value === undefined) {
        value = null
    }
    var label = rtr_prop.reviewForm.type + "-" + rtr_prop.reviewForm.styleName + "-" + rtr_prop.reviewForm.displayName;
    common_ga_event_track(GA.categoryReviewForm, action, label, value, true)
}
function enableProfileEditing() {
    $("#review-profile-not-editable").hide();
    $("#review-profile-editable").show()
}
function disableProfileEditing() {
    $("#review-profile-editable").hide();
    $("#review-profile-not-editable").show()
}
function defaultImgError() {
    imgLoadingSpinner(false);
    stopSubmitLoadingSpinner();
    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "Image Error: Sorry, we were unable to load your image at this time. Please try again later.");
    alert("Sorry, we were unable to load your image at this time. Please try again later.")
}
function photoThumbUrl(img) {
    if (img) {
        var urlPrefix = rtr_prop.reviewsCdn + "/";
        var url = urlPrefix + img._id + "-thumb.jpg?" + new Date().getTime();
        return url
    }
    return null
}
function photoOriginalUrl(img) {
    if (img) {
        var urlPrefix = rtr_prop.reviewsCdn + "/";
        var url = urlPrefix + img._id + ".jpg?" + new Date().getTime();
        return url
    }
    return null
}
function setMarginForImage(image, imageBox) {
    var maxHeight = 84;
    var mult = image.height / image.width;
    var margin = Math.max(maxHeight * (1 - mult) / 2, 1);
    imageBox.css("margin-top", margin + "px")
}
function displayCurrentReviewImages() {
    if (rtr_prop.reviewImages === undefined || !rtr_prop.reviewImages) {
        rtr_prop.reviewImages = []
    }
    var imageBoxes = [$("#review-img-box-0"), $("#review-img-box-1"), $("#review-img-box-2")];
    var images = [$("#review-img-0"), $("#review-img-1"), $("#review-img-2")];
    var maxImages = 3;
    for (i = 0; i < imageBoxes.length; i++) {
        if (i >= maxImages) {
            break
        }
        if (i < rtr_prop.reviewImages.length) {
            images[i].attr("src", photoThumbUrl(rtr_prop.reviewImages[i]));
            setMarginForImage(rtr_prop.reviewImages[i], imageBoxes[i]);
            imageBoxes[i].show()
        } else {
            imageBoxes[i].hide()
        }
    }
    if (rtr_prop.reviewImages.length >= maxImages) {
        $("#review-upload-photo-button").hide()
    } else {
        $("#review-upload-photo-button").show();
        renderReviewFormIE($("#review-form-iframe"))
    }
    if (rtr_prop.reviewImages.length === 0) {
        $("#review-tag-img").hide()
    } else {
        $("#review-tag-img").show()
    }
}
function postDeleteImage(image) {
    var imageInfo = {
        action: "delete_photo",
        id: image._id
    };
    $.ajax({
        type: "POST",
        url: "/rtr_reviewsservice.php?postDeleteImage=" + image._id,
        data: imageInfo,
        timeout: longTimeout,
        success: function (resp) {},
        error: function (resp) {
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "postDeleteImage failed: " + JSON.stringify(resp));
                window.Airbrake.notify("postDeleteImage failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        }
    })
}
function removeReviewImg(i) {
    if (rtr_prop.reviewImages && rtr_prop.reviewImages[i] !== undefined) {
        postDeleteImage(rtr_prop.reviewImages[i]);
        rtr_prop.reviewImages.splice(i, 1)
    }
    displayCurrentReviewImages();
    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "delete_review_photo", null)
}
function addReviewImg(image) {
    if (!image) {
        return
    }
    if (!rtr_prop.reviewImages) {
        rtr_prop.reviewImages = []
    }
    var img = new Image();
    img.src = photoOriginalUrl(image);
    $(img).load(function () {
        imgLoadingSpinner(false);
        setCropAbilityImage(image, img);
        rtr_prop.reviewImages.push(image);
        displayCurrentReviewImages();
        gaTrackEvent("upload_photo", rtr_prop.reviewImages.length)
    }).error(function () {
            defaultImgError();
            window.Airbrake.notify("Review Thumb load failed for " + JSON.stringify(image), "review-popup.js", 166)
        })
}
function fillExistingTagsForImage(image) {
    if (image && image.products) {
        image.existingTags = {};
        for (j = 0; j < image.products.length; j++) {
            var styleName = image.products[j];
            var itemInfo = getDesignerAndDisplayNameForStyleName(styleName);
            image.existingTags[styleName] = {
                designerName: itemInfo.designerName,
                productName: itemInfo.displayName
            };
            addTagToReviewForm(styleName, itemInfo.designerName, itemInfo.displayName)
        }
    }
}
function loadAndDisplayImage(image) {
    var img = new Image();
    img.src = photoOriginalUrl(image);
    $(img).load(function () {
        rtr_prop.loadingExistingImages--;
        setCropAbilityImage(image, img);
        if (!rtr_prop.reviewImages) {
            rtr_prop.reviewImages = []
        }
        rtr_prop.reviewImages.push(image);
        fillExistingTagsForImage(image);
        if (rtr_prop.loadingExistingImages <= 0) {
            imgLoadingSpinner(false);
            displayCurrentReviewImages()
        }
    }).error(function () {
            defaultImgError()
        })
}
function handleExistingPhotosAndTags(photos) {
    if (!photos || photos.length < 1) {
        return
    }
    if (photos.length > 0) {
        imgLoadingSpinner(true);
        rtr_prop.loadingExistingImages = 0
    }
    for (i = 0; i < photos.length; i++) {
        if (i > 2) {
            return
        }
        rtr_prop.loadingExistingImages++;
        var image = photos[i];
        image._id = image.photoId;
        loadAndDisplayImage(image)
    }
}
function unloadWarning() {
    return "You are currently in the process of uploading a photo."
}
function imageSizeWarning() {
    alert("Your photo upload failed. Please try again with a file size smaller than 5MB.");
    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "Photo upload error: Your photo upload failed. Please try again with a file size smaller than 5MB.")
}
function imageUploadErrorWarning() {
    alert("Sorry, there was an error reading your photo. Please try again with an image under 5MB.");
    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "Photo upload error: Sorry, there was an error reading your photo. Please try again later.")
}
function addUploadPhotoFormInteractions() {
    $("#review-upload-photo-form").change(function () {
        $("#review-upload-photo-form").submit();
        logAnalyticsJSONPost(rtr_prop.reviewStyleName, "click_upload_button", null)
    });
    $("#review-upload-photo-form").ajaxForm({
        beforeSubmit: function () {
            imgLoadingSpinner(true);
            window.onbeforeunload = unloadWarning
        },
        timeout: longTimeout,
        success: function (data) {
            if (data && data != 0) {
                try {
                    var image = $.parseJSON(data);
                    addReviewImg(image);
                    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "receive_review_photo", null)
                } catch (e) {
                    imgLoadingSpinner(false);
                    imageUploadErrorWarning()
                }
            } else {
                imgLoadingSpinner(false);
                imageSizeWarning()
            }
        },
        error: function (data, status, errorThrown) {
            imgLoadingSpinner(false);
            if (data.status == 0 || errorThrown.indexOf("Too Large") !== -1) {
                imageSizeWarning()
            } else {
                if (data.responseText) {
                    if (data.responseText == 0) {
                        imageSizeWarning()
                    } else {
                        imageUploadErrorWarning()
                    }
                } else {
                    try {
                        imageUploadErrorWarning()
                    } catch (e) {}
                }
            }
        },
        complete: function () {
            document.getElementById("review-upload-photo-form").reset();
            window.onbeforeunload = null
        }
    })
}
function postActionsForRotateFinished() {
    rtr_prop.waitingOnRotatePostActions = false;
    if (!rtr_prop.waitingOnSubmitReviewPost) {
        stopSubmitLoadingSpinner()
    }
    displayEditImagesScreen()
}
function postRotationForImage(image) {
    startSubmitLoadingSpinner();
    rtr_prop.postingRotationForImages++;
    rtr_prop.waitingOnRotatePostActions = true;
    var imageInfo = {
        action: "update_photo_rotation",
        id: image._id,
        rotation: image.photoAngle
    };
    $.ajax({
        type: "POST",
        url: "/rtr_reviewsservice.php?postRotationForImage=" + image._id,
        data: imageInfo,
        timeout: longTimeout,
        success: function (resp) {
            if (imageInfo.rotation === 90 || imageInfo.rotation === 270) {
                var tempWidth = image.width;
                image.width = image.height;
                image.height = tempWidth
            }
        },
        error: function (resp) {
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "postRotationForImage failed: " + JSON.stringify(resp));
                window.Airbrake.notify("postRotationForImage failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        },
        complete: function () {
            image.photoAngle = null;
            rtr_prop.postingRotationForImages--;
            if (rtr_prop.postingRotationForImages <= 0) {
                setCropAbilityForAllImagesWithCallback(postActionsForRotateFinished)
            }
        }
    })
}
function checkImagesForRotationThatNeedsPost() {
    if (rtr_prop.reviewImages === undefined || !rtr_prop.reviewImages) {
        return false
    }
    rtr_prop.postingRotationForImages = 0;
    var updatingPhotos = false;
    for (i = 0; i < rtr_prop.reviewImages.length; i++) {
        var image = rtr_prop.reviewImages[i];
        if (image.photoAngle && image.photoAngle !== 0) {
            postRotationForImage(image);
            updatingPhotos = true
        }
    }
    return updatingPhotos
}
function displayRotatedImage(imgId, image) {
    if (image.photoAngle === undefined || !image.photoAngle) {
        image.photoAngle = 0
    }
    imgId.parent().rotate(image.photoAngle);
    var xBtn = imgId.next();
    xBtn.removeClass();
    xBtn.addClass("img-dlt-container");
    var pos;
    switch (image.photoAngle) {
        case 0:
            pos = "top-right";
            break;
        case 90:
            pos = "top-left";
            break;
        case 180:
            pos = "bottom-left";
            break;
        case 270:
            pos = "bottom-right";
            break
    }
    xBtn.addClass(pos)
}
function resetRotationForThumbnails() {
    var imgIds = [$("#review-img-0"), $("#review-img-1"), $("#review-img-2")];
    if (rtr_prop.reviewImages) {
        for (i = 0; i < rtr_prop.reviewImages.length; i++) {
            displayRotatedImage(imgIds[i], rtr_prop.reviewImages[i])
        }
    }
}
function rotateImage(imgId, image) {
    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "rotate_photo", null);
    if (image.photoAngle) {
        image.photoAngle += 90
    } else {
        image.photoAngle = 90
    }
    if (image.photoAngle === 360) {
        image.photoAngle = 0
    }
    displayRotatedImage(imgId, image)
}
function rotateImage0() {
    var image = rtr_prop.reviewImages[0];
    var imgId = $("#review-img-0");
    rotateImage(imgId, image)
}
function rotateImage1() {
    var image = rtr_prop.reviewImages[1];
    var imgId = $("#review-img-1");
    rotateImage(imgId, image)
}
function rotateImage2() {
    var image = rtr_prop.reviewImages[2];
    var imgId = $("#review-img-2");
    rotateImage(imgId, image)
}
function startCropSubmitLoading() {
    $("#submit-crop-loading-spinner").show();
    $("#edit-img-done-cropping-btn").attr("disabled", "disabled")
}
function stopCropSubmitLoading() {
    $("#submit-crop-loading-spinner").hide();
    $("#edit-img-done-cropping-btn").removeAttr("disabled")
}
function cropSubmitIsLoading() {
    return $("#submit-crop-loading-spinner").is(":visible")
}
function checkCropIsValidForPhoto(image) {
    var crop = image.photoCrop;
    if (crop) {
        crop.x = Math.max(crop.x, 0);
        crop.y = Math.max(crop.y, 0);
        crop.width = crop.width;
        crop.height = crop.height;
        var totalX = crop.x + crop.width;
        var totalY = crop.y + crop.height;
        if (totalX > image.width || totalY > image.height) {
            getJcropSelectOptionsForImage(image)
        }
    }
}
function normalizedCropForImage(image) {
    if (!image || !image.photoCrop) {
        return null
    }
    var normalizedCrop = {
        x: parseFloat((image.photoCrop.x / image.width).toFixed(2)),
        width: parseFloat((image.photoCrop.width / image.width).toFixed(2)),
        y: parseFloat((image.photoCrop.y / image.height).toFixed(2)),
        height: parseFloat((image.photoCrop.height / image.height).toFixed(2))
    };
    return normalizedCrop
}
function postCropForImage(image) {
    if (image.photoCrop === undefined || !image.photoCrop || !image.cropAbility) {
        return
    }
    checkCropIsValidForPhoto(image);
    var cropParams = normalizedCropForImage(image);
    if (!cropParams) {
        return
    }
    var imageInfo = {
        action: "update_photo_crop_normalized",
        id: image._id,
        x: cropParams.x,
        y: cropParams.y,
        width: cropParams.width,
        height: cropParams.height
    };
    startCropSubmitLoading();
    $.ajax({
        type: "POST",
        url: "/rtr_reviewsservice.php?postCropForImage=" + image._id,
        data: imageInfo,
        timeout: longTimeout,
        success: function (resp) {
            rtr_prop.postingCropImages--;
            if (rtr_prop.postingCropImages == 0 && rtr_prop.coverPhotoPosted) {
                displayReviewSubmitSuccess();
                stopCropSubmitLoading()
            }
        },
        error: function (resp) {
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "postCropForImage failed: " + JSON.stringify(resp));
                window.Airbrake.notify("postCropForImage failed: " + JSON.stringify(resp), "review-popup.js", 380)
            } catch (e) {}
            rtr_prop.postingCropImages = -1;
            if (cropSubmitIsLoading()) {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "Crop error: Sorry, we were unable to save your cropped images.");
                alert("Sorry, we were unable to save your cropped images.  Please check your crops and try again.")
            }
            stopCropSubmitLoading()
        }
    })
}
function postCropsForAllImages() {
    if (rtr_prop.reviewImages) {
        rtr_prop.postingCropImages = 0;
        for (i = 0; i < rtr_prop.reviewImages.length; i++) {
            if (rtr_prop.reviewImages[i].cropAbility !== cropAbilityNone) {
                rtr_prop.postingCropImages++;
                postCropForImage(rtr_prop.reviewImages[i])
            }
        }
    }
    if (!rtr_prop.postingCropImages && rtr_prop.coverPhotoPosted) {
        displayReviewSubmitSuccess()
    }
}
function setCropAbilityImage(img, loadedImg) {
    if (!img || !loadedImg) {
        return
    } else {
        img.width = loadedImg.width;
        img.height = loadedImg.height
    }
    if (img.width < smallMinWidth || img.height < smallMinHeight) {
        img.cropAbility = cropAbilityNone;
        img.minCropWidth = 0;
        img.minCropHeight = 0
    } else {
        if (img.width < bigMinWidth || img.height < bigMinHeight) {
            img.cropAbility = cropAbilitySmall;
            img.minCropWidth = smallMinWidth;
            img.minCropHeight = smallMinHeight
        } else {
            img.cropAbility = cropAbilityBig;
            img.minCropWidth = bigMinWidth;
            img.minCropHeight = bigMinHeight
        }
    }
}
function setCropAbilityForAllImagesWithCallback(callbackFunction) {
    if (rtr_prop.reviewImages) {
        var imagesToLoad = rtr_prop.reviewImages.length;
        for (i = 0; i < rtr_prop.reviewImages.length; i++) {
            var image = rtr_prop.reviewImages[i];
            var img = new Image();
            img.src = photoOriginalUrl(image);
            $(img).load(function () {
                imagesToLoad--;
                image.width = img.width;
                image.height = img.height;
                setCropAbilityImage(image, img);
                if (imagesToLoad <= 0) {
                    callbackFunction()
                }
            }).error(function () {
                    defaultImgError()
                })
        }
    }
}
function recordCoords(c) {
    var image = rtr_prop.currentCropImage;
    image.photoCrop = {
        x: c.x,
        y: c.y,
        width: c.w,
        height: c.h
    }
}
function setDefaultCropSelectionForImageWithSelectOptions(image, selectOptions) {
    var x = Math.max(selectOptions.x1, 0);
    var y = Math.max(selectOptions.y1, 0);
    var width = Math.min(Math.abs(selectOptions.x2 - selectOptions.x1), image.width);
    var height = Math.min(Math.abs(selectOptions.y2 - selectOptions.y1), image.height);
    if (image.photoCrop) {
        image.photoCrop.x = x;
        image.photoCrop.y = y;
        image.photoCrop.width = width;
        image.photoCrop.height = height
    } else {
        image.photoCrop = {
            x: x,
            y: y,
            width: width,
            height: height
        }
    }
}
function selectionForExistingCrop(image) {
    var nX = image.cropXNormalized;
    var nY = image.cropYNormalized;
    var nWidth = image.cropWidthNormalized;
    var nHeight = image.cropHeightNormalized;
    if (nX !== undefined && nX !== null && nY !== undefined && nY !== null && nWidth !== undefined && nWidth !== null && nHeight !== undefined && nHeight !== null) {
        var x = Math.max(Math.floor(nX * image.width), 0);
        var width = Math.floor(nWidth * image.width);
        var y = Math.max(Math.floor(nY * image.height), 0);
        var height = Math.floor(nHeight * image.height);
        if ((x + width) > image.width || (y + height) > image.height) {
            return getJcropSelectOptionsForImage(image)
        }
        var selection = {
            x1: x,
            x2: x + width,
            y1: y,
            y2: y + height
        };
        setDefaultCropSelectionForImageWithSelectOptions(image, selection);
        return selection
    } else {
        return getJcropSelectOptionsForImage(image)
    }
}
function getJcropSelectOptionsForImage(image) {
    var width = image.width;
    var height = image.height;
    var centerX = image.width / 2;
    var centerY = image.height / 2;
    var defaultWidth = image.minCropWidth;
    var defaultHeight = image.minCropHeight;
    var maxFitWidth;
    var maxFitHeight;
    if ((width / defaultWidth) < (height / defaultHeight)) {
        maxFitWidth = defaultWidth * (width / defaultWidth);
        maxFitHeight = defaultHeight * (width / defaultWidth)
    } else {
        maxFitWidth = defaultWidth * (height / defaultHeight);
        maxFitHeight = defaultHeight * (height / defaultHeight)
    }
    var selectOptions = {
        x1: (centerX - maxFitWidth / 2),
        x2: (centerX + maxFitWidth / 2),
        y1: (centerY - maxFitHeight / 2),
        y2: (centerY + maxFitHeight / 2)
    };
    setDefaultCropSelectionForImageWithSelectOptions(image, selectOptions);
    return selectOptions
}
function enableCropForHolder(holder) {
    var oldCropImage = rtr_prop.currentCropImage;
    rtr_prop.currentCropImage = imageForImageHolder(holder);
    var jcrop = jcropForImageHolder(holder);
    if (jcrop === undefined || !jcrop) {
        addJcropToHolder(holder)
    }
    jcrop = jcropForImageHolder(holder);
    var allJcrops = jcropForImageHolder();
    if (!jcrop || !allJcrops) {
        rtr_prop.currentCropImage = oldCropImage;
        return
    }
    for (i = 0; i < allJcrops.length; i++) {
        allJcrops[i].disable()
    }
    jcrop.enable()
}
function addJcropToHolder(holder) {
    var image = imageForImageHolder(holder);
    var imageId = imageIdForImageHolderPosition(holder);
    if (image.cropAbility === cropAbilityNone) {
        var labelId = "#img-not-croppable-" + holder;
        $(labelId).html("Photo dimensions are too small for cropping.");
        imageId.css("margin-top", ((160 - (image.height / 2)) + "px"));
        return
    }
    rtr_prop.currentCropImage = image;
    var selectOptions = selectionForExistingCrop(image);
    imageId.Jcrop({
        boxWidth: 320,
        boxHeight: 320,
        aspectRatio: bigMinWidth / bigMinHeight,
        setImage: image,
        minSize: [image.minCropWidth, image.minCropHeight],
        onSelect: recordCoords,
        onChange: recordCoords,
        setSelect: [selectOptions.x1, selectOptions.y1, selectOptions.x2, selectOptions.y2]
    }, function () {
        _.each($("#review-popup-edit-images-content .jcrop-holder"), function (h) {
            $(h).css("margin-left", ((320 - $(h).width()) / 2) + "px");
            $(h).css("top", ((320 - $(h).height()) / 2) + "px")
        });
        this.disable();
        switch (holder) {
            case "left":
                rtr_prop.jCropLeft = this;
                break;
            case "right":
                rtr_prop.jCropRight = this;
                break;
            case "middle":
                rtr_prop.jCropMiddle = this;
                break
        }
    })
}
function addJcrop() {
    if (rtr_prop.reviewImages) {
        if (rtr_prop.reviewImages.length > 1) {
            rtr_prop.currentCropImage = imageForImageHolder("left")
        } else {
            rtr_prop.currentCropImage = imageForImageHolder("middle")
        }
        switch (rtr_prop.reviewImages.length) {
            case 1:
                addJcropToHolder("middle");
                break;
            case 2:
                addJcropToHolder("left");
                addJcropToHolder("right");
                break;
            case 3:
                addJcropToHolder("left");
                addJcropToHolder("right");
                addJcropToHolder("middle")
        }
    }
}
function cropImageBtnPressedForImgHolder(holder) {
    var image = imageForImageHolder(holder);
    rtr_prop.currentCropImage = image;
    enableCropForHolder(holder)
}
function imageIdForImageHolderPosition(holder) {
    switch (holder) {
        case "left":
            return $("#review-img-left");
        case "right":
            return $("#review-img-right");
        case "middle":
            return $("#review-img-middle")
    }
    return null
}
function imageForImageHolder(holder) {
    var numImages;
    if (rtr_prop.reviewImages && rtr_prop.reviewImages.length > 0) {
        numImages = rtr_prop.reviewImages.length
    } else {
        return null
    }
    switch (holder) {
        case "left":
            return (rtr_prop.reviewImages[0]) ? rtr_prop.reviewImages[0] : null;
        case "right":
            return (rtr_prop.reviewImages[1]) ? rtr_prop.reviewImages[1] : null;
        case "middle":
            if (numImages == 1) {
                return (rtr_prop.reviewImages[0]) ? rtr_prop.reviewImages[0] : null
            }
            return (rtr_prop.reviewImages[2]) ? rtr_prop.reviewImages[2] : null
    }
    return null
}
function jcropForImageHolder(holder) {
    var allJcrops = [];
    if (rtr_prop.jCropLeft) {
        allJcrops.push(rtr_prop.jCropLeft)
    }
    if (rtr_prop.jCropRight) {
        allJcrops.push(rtr_prop.jCropRight)
    }
    if (rtr_prop.jCropMiddle) {
        allJcrops.push(rtr_prop.jCropMiddle)
    }
    if (holder === undefined) {
        return allJcrops
    }
    switch (holder) {
        case "left":
            return (rtr_prop.jCropLeft) ? rtr_prop.jCropLeft : null;
        case "right":
            return (rtr_prop.jCropRight) ? rtr_prop.jCropRight : null;
        case "middle":
            return (rtr_prop.jCropMiddle) ? rtr_prop.jCropMiddle : null
    }
}
function destroyJcrop() {
    var jcrops = jcropForImageHolder();
    if (jcrops === undefined || !jcrops) {
        return
    }
    for (i = 0; i < jcrops.length; i++) {
        jcrops[i].destroy();
        jcrops[i] = null
    }
}
function jqueryCoverPhotoIdForHolder(holder) {
    var middle = $("#radio-cover-photo-middle");
    var left = $("#radio-cover-photo-left");
    var right = $("#radio-cover-photo-right");
    if (holder) {
        switch (holder) {
            case "left":
                return left;
            case "right":
                return right;
            case "middle":
                return middle
        }
    }
    return [left, right, middle]
}
function setDefaultCoverPhoto() {
    if (rtr_prop.reviewImages) {
        var coverPhotoIndex = 0;
        rtr_prop.reviewImages[0].isCoverPhoto = true;
        for (i = 0; i < rtr_prop.reviewImages.length; i++) {
            if (rtr_prop.reviewImages[i]._id === rtr_prop.coverPhotoImgId) {
                rtr_prop.reviewImages[i].isCoverPhoto = true;
                coverPhotoIndex = i
            } else {
                rtr_prop.reviewImages[i].isCoverPhoto = false
            }
        }
        if (rtr_prop.reviewImages.length > 1) {
            switch (coverPhotoIndex) {
                case 0:
                    setCoverPhotoForHolder("left");
                    break;
                case 1:
                    setCoverPhotoForHolder("right");
                    break;
                case 2:
                    setCoverPhotoForHolder("middle");
                    break
            }
        } else {
            setCoverPhotoForHolder("middle")
        }
    }
}
function setCoverPhotoForHolder(holder) {
    if (rtr_prop.reviewImages) {
        for (i = 0; i < rtr_prop.reviewImages.length; i++) {
            rtr_prop.reviewImages[i].isCoverPhoto = false
        }
        var buttons = jqueryCoverPhotoIdForHolder();
        for (j = 0; j < buttons.length; j++) {
            buttons[j].attr("checked", false)
        }
        var selectedButton = jqueryCoverPhotoIdForHolder(holder);
        if (selectedButton) {
            selectedButton.attr("checked", true)
        }
        var image = imageForImageHolder(holder);
        if (image) {
            image.isCoverPhoto = true
        }
    }
}
function tagsBoxIdForImageHolderPosition(holder) {
    switch (holder) {
        case "left":
            return $("#review-img-left-tags-box");
        case "right":
            return $("#review-img-right-tags-box");
        case "middle":
            return $("#review-img-middle-tags-box")
    }
    return null
}
function tagIdForHolderAndKey(holder, key) {
    var tagId = "img-tag-" + holder + "-" + key;
    return tagId
}
function removeTagBtnIdForHolderAndKey(holder, key) {
    var btnId = tagIdForHolderAndKey(holder, key) + "-remove-btn";
    return btnId
}
function jqueryRemoveTagBtnIdForHolderAndKey(holder, key) {
    var btnId = "#" + removeTagBtnIdForHolderAndKey(holder, key);
    return $(btnId)
}
function jqueryTagIdObjectForHolderAndKey(holder, key) {
    var tagId = "#" + tagIdForHolderAndKey(holder, key);
    return $(tagId)
}
function removeTagFromImageHolder(holder, tagKey, tagId) {
    var image = imageForImageHolder(holder);
    if (image) {
        var tag = jqueryTagIdObjectForHolderAndKey(holder, key);
        tag.removew();
        delete image.reviewTags[tagKey]
    }
}
function addRemoveTagButtonActions(holder, key) {
    var tagIdObject = jqueryTagIdObjectForHolderAndKey(holder, key);
    var removeTagObject = jqueryRemoveTagBtnIdForHolderAndKey(holder, key);
    var image = imageForImageHolder(holder);
    removeTagObject.click(function () {
        tagIdObject.remove();
        delete image.reviewTags[key]
    });
    removeTagObject.hover(function () {
        $(this).removeClass("s8-ico-delete");
        $(this).addClass("s8-ico-delete-on")
    }, function () {
        $(this).removeClass("s8-ico-delete-on");
        $(this).addClass("s8-ico-delete")
    })
}
function displayTagsForImageHolderPosition(holder) {
    var tagsBox = tagsBoxIdForImageHolderPosition(holder);
    var image = imageForImageHolder(holder);
    if (!tagsBox || !image) {
        return
    }
    tagsBox.empty();
    image.reviewTags = {};
    for (var key in rtr_prop.reviewTags) {
        image.reviewTags[key] = rtr_prop.reviewTags[key];
        var pId = tagIdForHolderAndKey(holder, key);
        var removeBtnId = removeTagBtnIdForHolderAndKey(holder, key);
        var removeBtnClass = "s8-ico-delete edit-images-remove-tag-btn";
        var removeButton = "<span class='" + removeBtnClass + "' id='" + removeBtnId + "'></span>";
        var html = "<p class='edit-images-tag-holder' id='" + pId + "'><span>" + image.reviewTags[key].productName + "</span>" + removeButton + "</p>";
        tagsBox.append(html);
        var removeTagButton = jqueryRemoveTagBtnIdForHolderAndKey(holder, key);
        addRemoveTagButtonActions(holder, key)
    }
}
function displayTagsForEditImagesScreen() {
    if (rtr_prop.reviewImages) {
        var numImages = rtr_prop.reviewImages.length;
        if (numImages > 1) {
            displayTagsForImageHolderPosition("left");
            displayTagsForImageHolderPosition("right")
        }
        if (numImages === 1 || numImages > 2) {
            displayTagsForImageHolderPosition("middle")
        }
    }
}
function addTagsForEditImagesScreen() {
    if (rtr_prop.reviewImages === undefined || !rtr_prop.reviewImages) {
        return
    }
    for (i = 0; i < rtr_prop.reviewImages.length; i++) {
        rtr_prop.reviewImages[i].reviewTags = rtr_prop.reviewTags
    }
    displayTagsForEditImagesScreen()
}
function addEditImagesFormInteractions() {
    $("#review-img-crop-btn-left").click(function () {
        cropImageBtnPressedForImgHolder("left")
    });
    $("#review-img-crop-btn-right").click(function () {
        cropImageBtnPressedForImgHolder("right")
    });
    $("#review-img-crop-btn-middle").click(function () {
        cropImageBtnPressedForImgHolder("middle")
    });
    $("#review-image-bg-left").click(function () {
        cropImageBtnPressedForImgHolder("left")
    });
    $("#review-image-bg-right").click(function () {
        cropImageBtnPressedForImgHolder("right")
    });
    $("#review-image-bg-middle").click(function () {
        cropImageBtnPressedForImgHolder("middle")
    })
}
function reviewPopupEventHandler() {
    reviewPopupQueryStringHandler();
    reviewPopupButtonClickHandler()
}
function reviewPopupStarClickHandler() {
    $("#star-1").click(function (e) {
        setReviewRating(2)
    });
    $("#star-2").click(function (e) {
        setReviewRating(4)
    });
    $("#star-3").click(function (e) {
        setReviewRating(6)
    });
    $("#star-4").click(function (e) {
        setReviewRating(8)
    });
    $("#star-5").click(function (e) {
        setReviewRating(10)
    });
    $("#fit-btn-small").click(function (e) {
        setReviewFit(0)
    });
    $("#fit-btn-true").click(function (e) {
        setReviewFit(1)
    });
    $("#fit-btn-large").click(function (e) {
        setReviewFit(2)
    })
}
function addCoverPhotoButtonInteractions() {
    $("#radio-cover-photo-middle").change(function () {
        if (this.checked) {
            setCoverPhotoForHolder("middle")
        }
    });
    $("#radio-cover-photo-left").change(function () {
        if (this.checked) {
            setCoverPhotoForHolder("left")
        }
    });
    $("#radio-cover-photo-right").change(function () {
        if (this.checked) {
            setCoverPhotoForHolder("right")
        }
    })
}
function identifyUnfilledFields(reviewData, profileData) {
    var unfilledFields = [];
    var emptyFieldsValues = ["-1", "", "Select one", "--"];
    for (var key in reviewData) {
        if ($.inArray($.trim(reviewData[key]), emptyFieldsValues) != -1) {
            unfilledFields.push(key)
        }
    }
    if (rtr_prop.reviewImages.length == 0) {
        unfilledFields.push("photos")
    }
    for (var key in profileData) {
        if ($.inArray($.trim(profileData[key]), emptyFieldsValues) != -1) {
            if (key == "usStandardSize") {
                unfilledFields.push("usuallyWears")
            } else {
                unfilledFields.push(key)
            }
        }
    }
    return unfilledFields
}
function hasUnfilledUserProfileFields(profileData) {
    var unfilledFields = [];
    var emptyFieldsValues = ["-1", "", "Select one", "--"];
    for (var key in profileData) {
        if (key != "bustSize" && key != "weightPounds") {
            if ($.inArray($.trim(profileData[key]), emptyFieldsValues) != -1) {
                unfilledFields.push(key)
            }
        }
    }
    if (unfilledFields.length > 0) {
        return true
    }
    return false
}
function closeReviewPopupButtonClickHandler() {
    $(".review-close-btn").click(function () {
        closeReviewPopup();
        if ($(".review-close-btn").data("popup") == "crop") {
            logAnalyticsJSONPost(rtr_prop.reviewStyleName, "skip_crop", null)
        } else {
            if ($(".review-close-btn").data("popup") == "submit-success") {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "close_review_popup_thank_you", null)
            } else {
                var reviewData = grabReviewDataFromForm();
                var profileData = grabReviewUserProfileInput();
                var unfilledFields = identifyUnfilledFields(reviewData, profileData);
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "cancel_review", unfilledFields, null);
                gaTrackEvent("click_cancel")
            }
        }
    })
}
function addFormInteractions() {
    addUploadPhotoFormInteractions();
    addEditImagesFormInteractions();
    reviewPopupStarClickHandler();
    addCoverPhotoButtonInteractions();
    closeReviewPopupButtonClickHandler();
    $("#review-popup-submit-button").hover(function () {
        $(this).removeClass();
        $(this).addClass("s8-btn-submit-review-on")
    }, function () {
        $(this).removeClass();
        $(this).addClass("s8-btn-submit-review")
    });
    $(".review-close-btn").removeClass("s8-btn-x");
    $(".review-close-btn").addClass("s8-btn-x-on");
    $(".review-close-btn").hover(function () {
        $(this).removeClass("s8-btn-x-on");
        $(this).addClass("s8-btn-x")
    }, function () {
        $(this).removeClass("s8-btn-x");
        $(this).addClass("s8-btn-x-on")
    });
    $("#review-upload-photo-button").hover(function () {
        $(this).removeClass();
        $(this).addClass("s8-btn-upload-on")
    }, function () {
        $(this).removeClass();
        $(this).addClass("s8-btn-upload")
    });
    $("#review-upload-photo-button").click(function () {});
    $(".s32-rotate").hover(function () {
        $(this).removeClass("s32-rotate");
        $(this).addClass("s32-rotate_on")
    }, function () {
        $(this).removeClass("s32-rotate_on");
        $(this).addClass("s32-rotate")
    });
    $(document).delegate(".review-dlt-btn", "mouseenter mouseleave", function (e) {
        if (e.type == "mouseenter") {
            $(this).removeClass("s8-ico-delete");
            $(this).addClass("s8-ico-delete-on")
        } else {
            $(this).removeClass("s8-ico-delete-on");
            $(this).addClass("s8-ico-delete")
        }
    });
    $("#edit-img-done-cropping-btn").hover(function () {
        $(this).removeClass("s8-btn-update");
        $(this).addClass("s8-btn-update-on")
    }, function () {
        $(this).removeClass("s8-btn-update-on");
        $(this).addClass("s8-btn-update")
    })
}
function isOnPDPPages() {
    if (location.href.match("/shop/")) {
        return true
    }
    return false
}
function closeReviewPopup(time) {
    $("body").css("overflow", "scroll");
    if (time && time > 0) {
        rtr_prop.waitingForAutoClose = true;
        setTimeout(function () {
            closeReviewPopup(-1)
        }, time)
    } else {
        if (time && time < 0) {
            if (rtr_prop.waitingForAutoClose) {
                closeReviewPopup()
            }
        } else {
            $("#review-popup").fadeOut("slow", function () {
                if ($(".review-close-btn").data("popup") == "submit-success") {
                    reviewSubmittedSuccessfully = true
                } else {
                    reviewSubmittedSuccessfully = false
                }
                $("#review-popup").remove();
                rtr_prop.currentReviewPopupScreen = null;
                rtr_prop.waitingForAutoClose = false;
                cleanUpReviewData;
                window.onbeforeunload = null;
                rtr_prop.isShowingReviewPopup = false;
                if (isOnPDPPages() && reviewSubmittedSuccessfully) {
                    reloadPageWithoutPopup()
                }
            })
        }
    }
}
function reloadPageWithoutPopup() {
    window.location.href = window.location.href.replace(window.location.search, "").replace(window.location.hash, "")
}
function startSubmitLoadingSpinner() {
    $("#submit-review-loading-spinner").show();
    $("#review-popup-submit-button").attr("disabled", "disabled")
}
function stopSubmitLoadingSpinner() {
    $("#submit-review-loading-spinner").hide();
    $("#review-popup-submit-button").removeAttr("disabled")
}
function submitIsLoading() {
    return $("#submit-review-loading-spinner").is(":visible")
}
function imgLoadingSpinner(showSpinner) {
    if (showSpinner) {
        $("#review-upload-photo-form").hide();
        if (!rtr_prop.reviewImages || rtr_prop.reviewImages.length < 3) {
            $("#inactive-upload-image-button").show()
        }
    } else {
        $("#review-upload-photo-form").show();
        $("#inactive-upload-image-button").hide()
    }
}
function imgIsLoading() {
    return $("#inactive-upload-image-button").is(":visible")
}
function cleanUpReviewData() {
    destroyJcrop();
    rtr_prop.reviewId = null;
    rtr_prop.reviewStyleName = null;
    rtr_prop.reviewImages = null;
    rtr_prop.reviewRating = null;
    rtr_prop.reviewFit = null;
    rtr_prop.itemIsDress = null;
    rtr_prop.itemIsSaleable = null;
    rtr_prop.reviewTags = null;
    rtr_prop.possibleSizes = null;
    rtr_prop.productMetadata = null;
    if (rtr_prop.jcrop_api) {
        rtr_prop.jcrop_api.destroy()
    }
}
function setReviewRating(numStarsString) {
    numStars = parseInt(numStarsString);
    rtr_prop.reviewRating = numStars;
    numStars = Math.ceil(numStars / 2);
    var filledStar = "s8-star-on";
    var blankStar = "s8-star-off";
    var stars = [$("#star-1"), $("#star-2"), $("#star-3"), $("#star-4"), $("#star-5")];
    for (i = 0; i < numStars; i++) {
        stars[i].removeClass();
        stars[i].addClass(filledStar)
    }
    while (i < stars.length) {
        stars[i].removeClass();
        stars[i].addClass(blankStar);
        i++
    }
}
function getReviewRating() {
    return (rtr_prop.reviewRating === undefined || !rtr_prop.reviewRating) ? -1 : rtr_prop.reviewRating
}
function dressFitDescriptions(index) {
    var descriptions = ["Runs small", "True to size", "Runs Large"];
    return (descriptions[index] !== undefined) ? descriptions[index] : descriptions
}
function itemFitDescriptions(index) {
    var descriptions = ["Smaller than expected", "As expected", "Larger than expected"];
    return (descriptions[index] !== undefined) ? descriptions[index] : descriptions
}
function serverFitDescriptions(index) {
    var descriptions = ["Small", "True to Size", "Large"];
    return (descriptions[index] !== undefined) ? descriptions[index] : descriptions
}
function serverFitDescriptionFromDisplayedFit(fit) {
    for (i = 0; i < itemFitDescriptions().length; i++) {
        if (fit === itemFitDescriptions(i)) {
            return serverFitDescriptions(i)
        }
    }
    for (j = 0; j < dressFitDescriptions().length; j++) {
        if (fit === dressFitDescriptions(j)) {
            return serverFitDescriptions(j)
        }
    }
    return null
}
function parseDescriptionForFitIndex(fit) {
    var fitIndex = null;
    for (i = 0; i < itemFitDescriptions().length; i++) {
        if (fit === itemFitDescriptions(i)) {
            fitIndex = i
        }
    }
    for (j = 0; j < dressFitDescriptions().length; j++) {
        if (fit === dressFitDescriptions(j)) {
            fitIndex = j
        }
    }
    for (k = 0; k < serverFitDescriptions().length; k++) {
        if (fit === serverFitDescriptions(k)) {
            fitIndex = k
        }
    }
    return fitIndex
}
function setReviewFit(fit) {
    if (fit === undefined) {
        rtr_prop.reviewFit = null
    }
    if (fit !== 0 && fit !== 1 && fit !== 2) {
        fit = parseDescriptionForFitIndex(fit)
    }
    if (!fit) {
        rtr_prop.reviewFit = null
    }
    var fitBtns = [$("#fit-btn-small"), $("#fit-btn-true"), $("#fit-btn-large")];
    var btnDefault = "fit-btn";
    var btnSelected = "fit-btn-selected";
    for (var i = 0; i < fitBtns.length; i++) {
        fitBtns[i].removeClass();
        fitBtns[i].addClass((i === fit) ? btnSelected : btnDefault);
        if (i === fit) {
            rtr_prop.reviewFit = (rtr_prop.itemIsDress) ? dressFitDescriptions(i) : itemFitDescriptions(i)
        }
    }
}
function getReviewFit() {
    return (rtr_prop.reviewFit === undefined || !rtr_prop.reviewFit) ? -1 : rtr_prop.reviewFit
}
function onProductTagSelectedEventHandler() {
    $("#tag-img-product").change(function () {
        var designer = $("#tag-img-designer").val();
        var productSelected = $("#tag-img-product").val();
        var styleNameOfProductSelected = $(this).find(":selected").data("styleName");
        addTagToReviewForm(styleNameOfProductSelected, designer, productSelected)
    })
}
function logAnalyticsJSONPost(styleName, action, additionalInfo) {
    analyticsData = {
        uid: rtr_prop.uid,
        timestamp: new Date().getTime(),
        styleName: styleName,
        action: action,
        object_type: "reviews"
    };
    if (action == "cancel_review") {
        analyticsData.unfilled = additionalInfo.join(",")
    }
    if (action == "open_review" || action == "edit_review") {
        analyticsData.source = additionalInfo
    }
    if (action == "submit_review" && additionalInfo.length > 0) {
        analyticsData.changedUserProfileData = additionalInfo.join(",")
    }
    if (action == "error") {
        analyticsData.errorMessage = additionalInfo
    }
    $.ajax({
        type: "POST",
        url: "/pixel/p.php",
        data: analyticsData
    })
}
function reviewPopupButtonClickHandler() {
    $("body").delegate(".new-review-popup", "click", function (e) {
        e.preventDefault();
        if ($(this).data("style")) {
            var productStyle = $(this).data("style")
        } else {
            var productStyle = pdp_glob.item.styleName
        }
        var popupSource = $(this).data("review-popup-source");
        displayReviewPopup(productStyle, popupSource)
    })
}
function reviewEditProfileButtonClickHandler() {
    $("#review-edit-profile-edit").click(function () {
        logAnalyticsJSONPost(rtr_prop.reviewStyleName, "edit_about_you", null);
        enableProfileEditing()
    })
}
function beginFormLoading() {
    var spinnerHTML = '<div id="loading-spinner-container"><div class="loading-spinner"></div></div>';
    $("body").append(spinnerHTML)
}
function formLoadingFinished() {
    $("#loading-spinner-container").remove()
}
function displayReviewPopup(productStyle, popupSource) {
    if (rtr_prop.isShowingReviewPopup) {
        return
    }
    rtr_prop.isShowingReviewPopup = true;
    beginFormLoading();
    cleanUpReviewData();
    var userProfileData;
    var reviewData;
    var analyticsType;
    var dataRetrievedFlag = {
        userProfileData: false,
        reviewData: false,
        productData: false
    };
    var userServiceAjaxCall = $.ajax({
        type: "GET",
        url: "/rtr_userservice.php",
        data: {
            action: "get_user_profile_for_review_popup"
        },
        timeout: shortTimeout,
        success: function (data) {
            dataRetrievedFlag.userProfileData = true;
            userProfileData = data;
            renderReviewPopup(dataRetrievedFlag, userProfileData, reviewData, productStyle, popupSource, analyticsType)
        },
        error: function (resp) {
            reviewsServiceAjaxCall.abort();
            rtr_prop.isShowingReviewPopup = false;
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "displayReviewPopup--retrieve user profile data failed: " + JSON.stringify(resp));
                window.Airbrake.notify("displayReviewPopup--retrieve user profile data failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
            formLoadingFinished();
            if (resp.status == "401") {
                var refreshOnClose = true;
                displayErrorMessage("You are not logged in or your session timed out. Please log in and try again.", refreshOnClose)
            } else {
                displayErrorMessage("Oops... we encountered a problem retrieving your user profile information for your review. Please refresh the page and try again.")
            }
            return
        }
    });
    var reviewPOSTData = {
        styleName: productStyle
    };
    var reviewsServiceAjaxCall = $.ajax({
        type: "GET",
        url: "/rtr_reviewsservice.php",
        cache: false,
        data: reviewPOSTData,
        timeout: shortTimeout,
        success: function (data) {
            if ($.trim(data) == "") {
                analyticsType = "open_review"
            } else {
                analyticsType = "edit_review"
            }
            dataRetrievedFlag.reviewData = true;
            reviewData = data;
            renderReviewPopup(dataRetrievedFlag, userProfileData, reviewData, productStyle, popupSource, analyticsType)
        },
        error: function (resp) {
            userServiceAjaxCall.abort();
            rtr_prop.isShowingReviewPopup = false;
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "displayReviewPopup--retrieve review data failed: " + JSON.stringify(resp));
                window.Airbrake.notify("displayReviewPopup--retrieve review data failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
            formLoadingFinished();
            if (resp.status == "401") {
                var refreshOnClose = true;
                displayErrorMessage("You are not logged in or your session timed out. Please log in and try again.", refreshOnClose)
            } else {
                displayErrorMessage("Oops... we hit a snag. Please try again.")
            }
            return
        }
    });
    var productURL = rtr_routes.productcatalog("all") + "?styleNames=" + productStyle;
    getProductMetadataFromProductCatalog(productURL, function () {
        dataRetrievedFlag.productData = true;
        renderReviewPopup(dataRetrievedFlag, userProfileData, reviewData, productStyle, popupSource, analyticsType)
    })
}
function displayDefaultProductTag(styleName, designer, productName) {
    $("#tagged-items-box").append("<p id='review-popup-default-tag' data-designer='" + designer + "'><span class='tag-product-name'>" + productName + "</span></p>");
    if (rtr_prop.reviewTags === undefined || !rtr_prop.reviewTags) {
        rtr_prop.reviewTags = new Object()
    }
}
function addTagToAllImages(styleName, designer, productName) {
    if (!rtr_prop.reviewImages) {
        return
    }
    for (m = 0; m < rtr_prop.reviewImages.length; m++) {
        if (!rtr_prop.reviewImages[m].reviewTags) {
            rtr_prop.reviewImages[m].reviewTags = new Object()
        }
        if (styleName in rtr_prop.reviewImages[m].reviewTags) {
            continue
        }
        rtr_prop.reviewImages[m].reviewTags[styleName] = {
            designerName: designer,
            productName: productName
        }
    }
}
function addTagToReviewForm(styleName, designer, productName) {
    addTagToAllImages(styleName, designer, productName);
    if (rtr_prop.reviewTags && styleName in rtr_prop.reviewTags) {
        return
    }
    var tagID = "tag-" + styleName;
    var tagHTML = "<p id='" + tagID + "' data-styleName='" + styleName + "'><span class='tag-product-name'>" + productName + "</span><span class='s8-ico-delete remove-tag-btn review-dlt-btn' onclick='removeTag(\"" + styleName + "\")'></span></p>";
    $("#tagged-items-box").append(tagHTML);
    if (rtr_prop.reviewTags === undefined || !rtr_prop.reviewTags) {
        rtr_prop.reviewTags = new Object()
    }
    rtr_prop.reviewTags[styleName] = {
        designerName: designer,
        productName: productName
    }
}
function removeTag(styleName) {
    var tagID = "#tag-" + styleName;
    delete rtr_prop.reviewTags[styleName];
    if (rtr_prop.reviewImages) {
        for (i = 0; i < rtr_prop.reviewImages.length; i++) {
            if (rtr_prop.reviewImages[i].reviewTags && styleName in rtr_prop.reviewImages[i].reviewTags) {
                delete rtr_prop.reviewImages[i].reviewTags[styleName]
            }
        }
    }
    $(tagID).remove()
}
function renderReviewPopup(dataRetrievedFlag, userProfileData, reviewData, productStyle, popupSource, analyticsType) {
    if (!dataRetrievedFlag || !dataRetrievedFlag.userProfileData || !dataRetrievedFlag.reviewData || !dataRetrievedFlag.productData) {
        return
    }
    logAnalyticsJSONPost(productStyle, analyticsType, popupSource);

    function getEnvURL(fileNameString) {
        if (false) {
            return RTR.config.cdn.main_host + "/" + fileNameString
        } else {
            return "/public/" + fileNameString
        }
    }
    $.ajax({
        url: getEnvURL("templates/review-popup.html"),
        timeout: shortTimeout,
        success: function (reviewPopupTemplate) {
            var productMetadata = rtr_prop.reviews.metadata[productStyle];
            var newReviewPopupTemplate = _.template(reviewPopupTemplate);
            if (reviewData && reviewData.coverPhotoId) {
                rtr_prop.coverPhotoImgId = reviewData.coverPhotoId
            } else {
                rtr_prop.coverPhotoImgId = -1
            }
            rtr_prop.reviewStyleName = productMetadata.styleName;
            rtr_prop.productMetadata = productMetadata;
            rtr_prop.possibleSizes = productMetadata.sizes;
            var itemType = productMetadata.type;
            rtr_prop.itemIsDress = (itemType.toLowerCase() === "dress") ? true : false;
            rtr_prop.itemIsSaleable = (itemType.toLowerCase() === "saleableproduct") ? true : false;
            var obj = {
                sizes: productMetadata.sizes,
                itemIsDress: rtr_prop.itemIsDress,
                itemIsSaleable: rtr_prop.itemIsSaleable,
                itemFitDescriptions: itemFitDescriptions(),
                metadata: productMetadata,
                img_url: productMetadata.imgProductTeaserFrontURL,
                styleName: productMetadata.styleName
            };
            formLoadingFinished();
            $("body").css("overflow", "hidden");
            var htmlOutput = newReviewPopupTemplate(obj);
            $("body").append(htmlOutput);
            $("#submit-crop-loading-spinner").hide();
            $("#inactive-upload-image-button").hide();
            $("#review-popup-container").hide();
            $("#review-popup-submit-success").hide();
            $("#review-popup-edit-images").hide();
            stopSubmitLoadingSpinner();
            imgLoadingSpinner(false);
            enableProfileEditing();
            rtr_prop.waitingOnSubmitReviewPost = false;
            rtr_prop.waitingOnRotatePostActions = false;
            displayExistingReviewInformation(reviewData);
            loadUserProfileData(userProfileData);
            addFormInteractions();
            displayCurrentReviewImages();
            disableTaggingDesigners();
            disableTaggingProducts();
            getAndFillListOfDesigners();
            $("#review-popup-container").fadeIn("slow", function () {
                rtr_prop.currentReviewPopupScreen = "review-popup-content"
            });
            onProductTagSelectedEventHandler();
            reviewEditProfileButtonClickHandler();
            reviewPopupSubmitButtonClickHandler();
            $("#review-summary").keydown(function () {
                updateSumItUpCharacterCount()
            });
            $("#review-summary").keyup(function () {
                updateSumItUpCharacterCount()
            });
            updateSumItUpCharacterCount();
            $("#tag-img-designer").change(function () {
                var designerSelected = $("#tag-img-designer").val();
                retrieveListOfItemsForDesignerAndCall(designerSelected, updateProductOptionDropdown)
            });
            rtr_prop.userProfileDataForAnalyticsComparison = grabReviewUserProfileInput();
            rtr_prop.reviewForm = {
                type: (rtr_prop.itemIsDress) ? GA_TYPE_DRESS : ((rtr_prop.itemIsSaleable) ? GA_TYPE_SALEABLE : GA_TYPE_ACCESSORY),
                styleName: productMetadata.styleName,
                displayName: productMetadata.displayName
            };
            gaTrackEvent("click_openreview")
        },
        error: function (resp) {
            formLoadingFinished();
            displayErrorMessage("Oops... we hit a snag. Please try again.");
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "renderReviewPopup failed: " + JSON.stringify(resp));
                window.Airbrake.notify("renderReviewPopup failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        }
    })
}
function renderReviewFormIE(iframe, caller) {
    caller = caller || "default";
    if (typeof ($.browser.msie) === "undefined" || ($.browser.msie && $.browser.version >= 9)) {
        return false
    }
    iframe = $(iframe);
    var container = $("#review-form-upload-ie");
    $("#review-upload-photo-form").hide();
    if ((iframe.data("framestate") == 0 && caller != "default") || iframe.data("framestate") == 1) {
        rtr_prop.reviewFormIE = rtr_prop.reviewFormIE || $("#review-upload-photo-form").remove();
        var reviewForm = rtr_prop.reviewFormIE.clone();
        reviewForm.attr("id", "review-upload-photo-form-ie");
        var submitButton = $("<input>").attr({
            type: "submit",
            value: "Upload Photo"
        }).click(function (evt, ele) {
                if (iframe.contents().find("#upload-photo-file-input").val().length) {
                    $(this).hide();
                    imgLoadingSpinner(true);
                    iframe.data("framestate", 2)
                } else {
                    evt.preventDefault();
                    alert("Please select an image")
                }
            });
        reviewForm.append(submitButton);
        reviewForm.show();
        iframe.contents().find("body").html(reviewForm);
        container.show()
    } else {
        if (iframe.data("framestate") == 2) {
            container.hide();
            iframe.data("framestate", 1);
            var responseBody = $.trim(iframe.contents().find("body").text());
            if (responseBody.length) {
                try {
                    responseBody = $.parseJSON(responseBody);
                    addReviewImg(responseBody)
                } catch (e) {
                    renderReviewFormIEError(iframe)
                }
            } else {
                renderReviewFormIEError(iframe)
            }
            imgLoadingSpinner(false)
        } else {
            return false
        }
    }
}
function renderReviewFormIEError(iframe) {
    alert("Your photo upload failed. Please try again with a file size smaller than 2MB.");
    renderReviewFormIE(iframe)
}
function displayPopupReviewContentScreen() {
    if (rtr_prop.reviewImages) {
        resetRotationForThumbnails();
        displayCurrentReviewImages()
    }
    if (rtr_prop.currentReviewPopupScreen && rtr_prop.currentReviewPopupScreen === "review-popup-edit-images") {
        destroyJcrop();
        $("#review-popup-edit-images").fadeOut("fast", function () {
            $("#review-popup-content").fadeIn("fast", function () {
                rtr_prop.currentReviewPopupScreen = "review-popup-content"
            })
        })
    } else {
        $("#review-popup-content").fadeIn("slow", function () {
            rtr_prop.currentReviewPopupScreen = "review-popup-content"
        })
    }
}
function displayEditImagesScreen() {
    if (rtr_prop.waitingOnSubmitReviewPost || rtr_prop.waitingOnRotatePostActions) {
        return
    }
    $(".review-close-btn").attr("data-popup", "crop");
    var row2 = $("#review-edit-images-2");
    var row1_3 = $("#review-edit-images-1-3");
    var imageMiddle = $("#review-img-middle");
    var imageLeft = $("#review-img-left");
    var imageRight = $("#review-img-right");
    var numImages = (rtr_prop.reviewImages) ? rtr_prop.reviewImages.length : -1;
    switch (numImages) {
        case 1:
            imageMiddle.attr("src", photoOriginalUrl(rtr_prop.reviewImages[0]));
            row1_3.show();
            row2.hide();
            break;
        case 2:
            imageLeft.attr("src", photoOriginalUrl(rtr_prop.reviewImages[0]));
            imageRight.attr("src", photoOriginalUrl(rtr_prop.reviewImages[1]));
            row2.show();
            row1_3.hide();
            break;
        case 3:
            imageLeft.attr("src", photoOriginalUrl(rtr_prop.reviewImages[0]));
            imageRight.attr("src", photoOriginalUrl(rtr_prop.reviewImages[1]));
            imageMiddle.attr("src", photoOriginalUrl(rtr_prop.reviewImages[2]));
            row2.show();
            row1_3.show();
            break;
        default:
            submitReview(true, function () {});
            return
    }
    addJcrop();
    addTagsForEditImagesScreen();
    setDefaultCoverPhoto();
    $("#review-popup-content").fadeOut("fast", function () {
        $("#review-popup-edit-images").fadeIn("fast", function () {
            rtr_prop.currentReviewPopupScreen = "review-popup-edit-images";
            doneCroppingAndSubmitButtonClickHandler()
        })
    });
    $("body").css("overflow", "hidden")
}
function displayReviewSubmitSuccess() {
    $(".review-close-btn").attr("data-popup", "submit-success");
    switch (rtr_prop.currentReviewPopupScreen) {
        case "review-popup-content":
            $("#review-popup-content").fadeOut("fast", function () {
                $("#review-popup-submit-success").fadeIn("fast", function () {
                    $("body").css("overflow", "hidden");
                    rtr_prop.currentReviewPopupScreen = "review-popup-submit-success";
                    closeReviewPopup(10000)
                })
            });
            break;
        case "review-popup-edit-images":
            var momentLink = "/ourrunway/moment/" + encodeURIComponent(rtr_prop.productMetadata.designerName.toLowerCase()) + "-" + encodeURIComponent(rtr_prop.productMetadata.displayName.toLowerCase() + "--id-" + rtr_prop.postedCoverPhotoId);
            $("#text-bottom").html("<p class='submit-success-content'>You will receive notification once your review has been approved.</p><a href='" + momentLink + "'><div class='submit-success-subheader'>See your photo review<div class='review-success-right-arrow s8-arr-5-left-black'></div></a></div>");
            $(".submit-success-subheader a").hover(function () {
                $(".review-success-right-arrow").removeClass("s8-arr-5-left-black").addClass("s8-arr-5-left-pink")
            }, function () {
                $(".review-success-right-arrow").removeClass("s8-arr-5-left-pink").addClass("s8-arr-5-left-black")
            });
            $("#review-popup-edit-images").fadeOut("fast", function () {
                $("#review-popup-submit-success").fadeIn("fast", function () {
                    $("body").css("overflow", "hidden");
                    rtr_prop.currentReviewPopupScreen = "review-popup-submit-success"
                })
            });
            break
    }
}
function updateProductOptionDropdown(products) {
    $("#tag-img-product").find("option").remove();
    $("#tag-img-product").append("<option>Product</option>");
    for (i = 0; i < products.length; i++) {
        var productOptionHTML = "<option value='" + products[i].displayName + "' data-styleName='" + products[i].styleName + "'>" + products[i].displayName + "</option>";
        $("#tag-img-product").append(productOptionHTML)
    }
}
function updateSumItUpCharacterCount() {
    var maxCount = 100;
    var textCharacterCount = $("#review-summary").val().length;
    var isShowing = $("#sum-it-up-char-cnt-txt").is(":visible");
    var remainingCharacterCount = maxCount - textCharacterCount;
    if (remainingCharacterCount > 50) {
        $("#sum-it-up-char-cnt-txt").hide()
    } else {
        if (remainingCharacterCount >= 0 && remainingCharacterCount <= 50) {
            $("#sum-it-up-char-cnt-txt").html('<span id="sum-it-up-char-cnt-txt">' + remainingCharacterCount + " characters left</span>");
            if (!isShowing) {
                $("#sum-it-up-char-cnt-txt").show()
            }
        } else {
            if (remainingCharacterCount < 0) {
                $("#sum-it-up-char-cnt-txt").text("Response exceeds 100 character limit");
                if (!isShowing) {
                    $("#sum-it-up-char-cnt-txt").show()
                }
            } else {
                if (isShowing) {
                    $("#sum-it-up-char-cnt-txt").hide()
                }
            }
        }
    }
}
function reviewPopupQueryStringHandler() {
    var url = window.document.location.href;
    if (url.indexOf("writereview") != -1) {
        var data = {
            action: "can_user_review",
            styleName: pdp_glob.item.styleName
        };
        $.ajax({
            type: "GET",
            cache: false,
            url: "/rtr_reviewsservice.php",
            data: data,
            timeout: shortTimeout,
            success: function (resp) {
                if (resp) {
                    displayReviewPopup(pdp_glob.item.styleName, "writereviewstring")
                }
            },
            error: function (resp) {
                displayErrorMessage("Oops... we hit a snag. Please try again.");
                try {
                    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "reviewPopupQueryStringHandler failed: " + JSON.stringify(resp));
                    window.Airbrake.notify("reviewPopupQueryStringHandler failed: " + JSON.stringify(resp), "review-popup.js", 0)
                } catch (e) {}
            }
        })
    }
}
function ajaxReviewPopupSubmitReview(reviewData, profileData, showSubmitSuccess, callbackFunction) {
    reviewData.action = "update_review";
    if (rtr_prop.reviewImages.length != 0) {
        var photoDataArray = [];
        for (var i = 0; i < rtr_prop.reviewImages.length; i++) {
            if (rtr_prop.reviewImages[i].isCoverPhoto) {
                reviewData.coverPhotoId = rtr_prop.reviewImages[i]._id
            }
            var tagsArray = [];
            for (var key in rtr_prop.reviewImages[i].reviewTags) {
                tagsArray.push(key)
            }
            var photoDataObject = {
                photoId: rtr_prop.reviewImages[i]._id,
                tags: tagsArray
            };
            photoDataArray.push(photoDataObject)
        }
        reviewData.photosJSON = JSON.stringify(photoDataArray)
    }
    startSubmitLoadingSpinner();
    var dataObject = $.extend({}, reviewData, profileData);
    rtr_prop.waitingOnSubmitReviewPost = true;
    $.ajax({
        type: "POST",
        url: "/rtr_reviewsservice.php?submitReview",
        data: dataObject,
        timeout: longTimeout,
        success: function (response) {
            rtr_prop.reviewId = JSON.parse(response)["reviewId"];
            if (showSubmitSuccess) {
                displayReviewSubmitSuccess()
            }
            removeIncompleteStyle();
            if (callbackFunction) {
                rtr_prop.waitingOnSubmitReviewPost = false;
                if (!rtr_prop.waitingOnRotatePostActions) {
                    stopSubmitLoadingSpinner()
                }
                callbackFunction()
            }
        },
        error: function (resp) {
            stopSubmitLoadingSpinner();
            if (resp.status == "401") {
                var refreshOnClose = true;
                displayErrorMessage("You are not logged in or your session timed out. Please log in and try again.", refreshOnClose)
            } else {
                displayErrorMessage("Oops... we hit a snag and are unable to submit your review. Please try again.")
            }
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "ajaxReviewPopupSubmitReview failed: " + JSON.stringify(resp));
                window.Airbrake.notify("ajaxReviewPopupSubmitReview failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        }
    })
}
function postCoverPhoto() {
    rtr_prop.coverPhotoPosted = false;
    startCropSubmitLoading();
    var coverPhotoId;
    for (var i = 0; i < rtr_prop.reviewImages.length; i++) {
        if (rtr_prop.reviewImages[i].isCoverPhoto) {
            var coverPhotoId = rtr_prop.reviewImages[i]._id
        }
    }
    var coverPhotoData = {
        action: "associate_cover_photo",
        coverPhotoId: coverPhotoId,
        reviewId: rtr_prop.reviewId
    };
    $.ajax({
        url: "/rtr_reviewsservice.php?postCoverPhoto",
        data: coverPhotoData,
        type: "POST",
        timeout: shortTimeout,
        success: function (resp) {
            rtr_prop.coverPhotoPosted = true;
            rtr_prop.postedCoverPhotoId = JSON.parse(resp).coverPhotoId;
            if (rtr_prop.postingCropImages == 0) {
                displayReviewSubmitSuccess();
                stopCropSubmitLoading()
            }
        },
        error: function (resp) {
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "postCoverPhoto failed: " + JSON.stringify(resp));
                window.Airbrake.notify("postCoverPhoto failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        }
    })
}
function doneCroppingAndSubmitButtonClickHandler() {
    $("#edit-img-done-cropping-btn").click(function (e) {
        e.preventDefault();
        postCoverPhoto();
        postCropsForAllImages();
        logAnalyticsJSONPost(rtr_prop.reviewStyleName, "done_crop", null)
    })
}
function identifyChangedUserProfileDataForAnalytics(newProfileData) {
    if (typeof (rtr_prop.userProfileDataForAnalyticsComparison) == "undefined" || rtr_prop.userProfileDataForAnalyticsComparison === null) {
        return
    }
    var listOfChangedUserProfileData = [];
    var currentProfileData = rtr_prop.userProfileDataForAnalyticsComparison;
    for (var key in currentProfileData) {
        if (newProfileData[key] != currentProfileData[key]) {
            listOfChangedUserProfileData.push(key)
        }
    }
    return listOfChangedUserProfileData
}
function submitReview(showSubmitSuccess, callbackFunction) {
    var reviewData = grabReviewDataFromForm();
    var profileData = grabReviewUserProfileInput();
    ajaxReviewPopupSubmitReview(reviewData, profileData, showSubmitSuccess, callbackFunction);
    ajaxReviewPopupUpdateProfile(profileData, null);
    var listOfChangedUserProfileData = identifyChangedUserProfileDataForAnalytics(profileData);
    logAnalyticsJSONPost(rtr_prop.reviewStyleName, "submit_review", listOfChangedUserProfileData);
    gaTrackEvent("click_submit")
}
function reviewPopupSubmitButtonClickHandler() {
    $("#review-popup-submit-button").click(function (e) {
        e.preventDefault();
        if (submitIsLoading() || imgIsLoading()) {
            return
        }
        var validReview = validateReviewForm();
        if (!validReview) {
            return
        }
        if (rtr_prop.reviewImages && rtr_prop.reviewImages.length > 0) {
            submitReview(false, function () {
                if (!checkImagesForRotationThatNeedsPost()) {
                    displayEditImagesScreen()
                }
            })
        } else {
            submitReview(true, null)
        }
    })
}
function grabReviewDataFromForm() {
    var reviewData = {
        styleName: rtr_prop.reviewStyleName,
        rating: getReviewRating(),
        eventType: $("#rental-occasion").val(),
        summary: $("#review-summary").val(),
        details: $("#review-details").val()
    };
    var fit = serverFitDescriptionFromDisplayedFit(getReviewFit());
    if (!rtr_prop.itemIsSaleable) {
        reviewData.fit = fit
    }
    if (rtr_prop.itemIsDress) {
        reviewData.sizeWorn = $("#size-worn").val()
    }
    return reviewData
}
function grabReviewUserProfileInput() {
    var userInput = {
        nickName: $("#review-input-nickname").val(),
        usStandardSize: $("#review-input-preferred-size").val(),
        heightInches: $("#review-input-height-inches").val(),
        birthday: $("#review-input-birthday-year").val() + "-" + $("#review-input-birthday-month").val() + "-" + $("#review-input-birthday-day").val()
    };
    var bustBackSize = $("#review-input-bust-back-size").val();
    var bustCupSize = $("#review-input-bust-cup-size").val();
    var bodyType = $("#review-input-body-type").val();
    if (bustBackSize == "-1" || bustCupSize == "-1") {
        var bustSize = ""
    } else {
        var bustSize = bustBackSize + bustCupSize
    }
    userInput.bustSize = bustSize;
    if (bodyType == "-1") {
        bodyType = ""
    }
    if ($("#review-input-weight-pounds").val() == "") {
        var weightPounds = -1
    } else {
        var weightPounds = $("#review-input-weight-pounds").val()
    }
    userInput.weightPounds = weightPounds;
    userInput.bodyType = bodyType;
    return userInput
}
function isValidFit(fit) {
    var possibleFitValues = ["Small", "True to Size", "Large"];
    if ($.inArray(fit, possibleFitValues) != -1) {
        return true
    } else {
        return false
    }
}
function isValidEventType(eventType) {
    var possibleEventTypes = ["Formal Affair", "Date", "Party", "Wedding", "Vacation", "Other"];
    if ($.inArray(eventType, possibleEventTypes) != -1) {
        return true
    } else {
        return false
    }
}
function isValidSizeWorn(sizeWorn) {
    var possibleSizes = rtr_prop.possibleSizes;
    possibleSizes.push("None");
    if ($.inArray(sizeWorn, possibleSizes) != -1) {
        return true
    } else {
        return false
    }
}
function validateReviewData(data, errorFieldsList) {
    var isValid = true;
    if (!data || !data.rating || !data.eventType) {
        isValid = setFalseAndDisplayReviewFormErrorMessage("Some fields have not been completed.")
    }
    if (!data.rating || data.rating == -1) {
        $(".stars-container").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Overall rating")
    }
    if (!rtr_prop.itemIsSaleable) {
        if (!data.fit || !isValidFit(data.fit)) {
            $(".fit-buttons-container").addClass("review-popup-error");
            isValid = false;
            errorFieldsList.push("Fit")
        }
    }
    if (!data.eventType || data.eventType == "-1" || !isValidEventType(data.eventType)) {
        $("#rental-occasion").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("I rented this for")
    }
    if (rtr_prop.itemIsDress) {
        if (!data.sizeWorn || data.sizeWorn == "-1" || !isValidSizeWorn(data.sizeWorn)) {
            $("#size-worn").addClass("review-popup-error");
            isValid = false;
            errorFieldsList.push("Size worn")
        }
    }
    if ($.trim(data.summary) == "") {
        $("#review-summary").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Summary")
    }
    if (data.summary && data.summary.length > 100) {
        $("#review-summary").addClass("review-popup-error");
        isValid = setFalseAndDisplayReviewFormErrorMessage("Your response to SUM IT UP has exceeded the limit of 100 characters. Please shorten and try again.")
    }
    if ($.trim(data.details) == "") {
        $("#review-details").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Review details")
    }
    if (data.details && data.details.length > 2000) {
        $("#review-details").addClass("review-popup-error");
        isValid = setFalseAndDisplayReviewFormErrorMessage("Your response to NOW, FOR THE DETAILS has exceeded the limit of 2,000 characters. Please shorten and try again.")
    }
    return isValid
}
function setFalseAndDisplayReviewFormErrorMessage(errorMessage) {
    var errorHTML = $("#review-popup-form-errors").html(errorMessage);
    return false
}
function validateReviewUserProfileData(input, errorFieldsList) {
    $("#review-profile-box .review-popup-error").removeClass("review-popup-error");
    var isValid = true;
    if ($.trim(input.nickName) == "") {
        $("#review-input-nickname").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Nickname")
    }
    if (!isValidDate(input.birthday)) {
        $("#review-input-birthday-month").addClass("review-popup-error");
        $("#review-input-birthday-day").addClass("review-popup-error");
        $("#review-input-birthday-year").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Birthday")
    }
    if (input.heightInches == "-1") {
        $("#review-input-height-inches").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Height")
    } else {
        if (input.heightInches < 54 || input.heightInches > 78) {
            $("#review-input-height-inches").addClass("review-popup-error");
            isValid = false;
            errorFieldsList.push("Height")
        }
    }
    if (input.weightPounds != -1 && (input.weightPounds < 50 || input.weightPounds > 300)) {
        $("#review-input-weight-pounds").addClass("review-popup-error");
        isValid = setFalseAndDisplayReviewFormErrorMessage("Please enter a weight between 50 to 300, or leave blank.")
    }
    if (!input.usStandardSize || !input.usStandardSize.match(/^(0|2|4|6|8|10|12|14|16|18|20|22)$/)) {
        $("#review-input-preferred-size").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Usually wears")
    }
    if (input.bodyType != "" && !isValidBodyType(input.bodyType)) {
        $("#review-input-body-type").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Body type")
    }
    if (input.bustSize && input.bustSize !== null && input.bustSize !== undefined && input.bustSize != "" && !input.bustSize.match(/^(32|34|36|38)(AA|A|B|C|D|D\+)$/)) {
        $("#review-input-bust-back-size").addClass("review-popup-error");
        $("#review-input-bust-cup-size").addClass("review-popup-error");
        isValid = false;
        errorFieldsList.push("Bust")
    }
    return isValid
}
function validateReviewForm() {
    $(".review-popup-error").removeClass("review-popup-error");
    $("#review-popup-form-errors").html("");
    var reviewData = grabReviewDataFromForm();
    var profileData = grabReviewUserProfileInput();
    var passedValidations = true;
    var errorFieldsList = [];
    if (!validateReviewData(reviewData, errorFieldsList)) {
        passedValidations = false
    }
    if (!validateReviewUserProfileData(profileData, errorFieldsList)) {
        passedValidations = false
    }
    if (errorFieldsList != 0) {
        $("#review-popup-form-errors").append("<p>Please complete required fields.</p>")
    }
    return passedValidations
}
function displayErrorMessage(message, refreshOnClose) {
    stopSubmitLoadingSpinner();
    formLoadingFinished();
    var spinnerHTML = '<div class="error-message-popup"><div class="error-message-popup-container"><div class="error-popup-close-button s8-btn-x"></div><div class="error-message-popup-content"><p>' + message + "</p></div></div>";
    $("body").append(spinnerHTML);
    $(".error-popup-close-button").click(function () {
        $(".error-message-popup").remove();
        if (refreshOnClose) {
            reloadPageWithoutPopup()
        }
    });
    setTimeout(function () {
        $(".error-message-popup").fadeOut("slow", function () {
            if (refreshOnClose) {
                reloadPageWithoutPopup()
            }
        })
    }, 2000)
}
function ajaxReviewPopupUpdateProfile(profileData, callbackFunction) {
    profileData.action = "update_user_profile";
    profileData.context = "reviewpopup";
    $.ajax({
        type: "POST",
        url: "/rtr_userservice.php",
        data: profileData,
        timeout: longTimeout,
        success: function (response) {
            if (callbackFunction) {
                callbackFunction()
            }
        },
        error: function (resp) {
            if (resp.status == "401") {
                var refreshOnClose = true;
                displayErrorMessage("You are not logged in or your session timed out. Please log in and try again.", refreshOnClose)
            } else {
                displayErrorMessage("Oops... we encountered a problem updating your profile. Please try again.")
            }
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "ajaxReviewPopupUpdateProfile failed: " + JSON.stringify(resp));
                window.Airbrake.notify("ajaxReviewPopupUpdateProfile failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        }
    })
}
function displayExistingReviewInformation(reviewData) {
    if (reviewData) {
        setReviewRating(reviewData.rating);
        setReviewFit(parseDescriptionForFitIndex(reviewData.fit));
        $("#rental-occasion").val(reviewData.eventType);
        $("#review-summary").val(reviewData.caption);
        $("#review-details").val(reviewData.content);
        $("#size-worn").val(reviewData.sizeWorn);
        handleExistingPhotosAndTags(reviewData.photos)
    }
}
function getDesignerAndDisplayNameForStyleName(styleName) {
    var productURL = rtr_routes.productcatalog("all") + "?styleNames=" + styleName;
    var productData = {};
    $.ajax({
        async: false,
        type: "GET",
        dataType: "json",
        url: productURL,
        success: function (data) {
            _.each(data, function (pt) {
                _.each(pt, function (item) {
                    rtr_prop.reviews.metadata[item.styleName] = item;
                    productData.designerName = rtr_prop.reviews.metadata[styleName].designerName;
                    productData.displayName = rtr_prop.reviews.metadata[styleName].displayName
                })
            })
        }
    });
    return productData
}
function enableTaggingDesigners() {
    $("#tag-img-designer").removeAttr("disabled")
}
function disableTaggingDesigners() {
    $("#tag-img-designer").attr("disabled", "disabled")
}
function enableTaggingProducts() {
    $("#tag-img-product").removeAttr("disabled")
}
function disableTaggingProducts() {
    $("#tag-img-product").attr("disabled", "disabled")
}
function retrieveListOfItemsForDesignerAndCall(designer, callbackFunction) {
    disableTaggingProducts();
    $.ajax({
        type: "GET",
        url: "/api/productcatalog/filters/all?designer=" + encodeURIComponent(designer) + "&active=true",
        dataType: "json",
        timeout: longTimeout,
        success: function (data) {
            var itemsList = [];
            for (var key in data) {
                var itemsInCategory = data[key];
                for (var i = 0; i < itemsInCategory.length; i++) {
                    itemsList.push(itemsInCategory[i])
                }
            }
            callbackFunction(itemsList);
            enableTaggingProducts()
        },
        error: function (resp) {
            try {
                logAnalyticsJSONPost(rtr_prop.reviewStyleName, "error", "retrieveListOfItemsForDesignerAndCall failed: " + JSON.stringify(resp));
                window.Airbrake.notify("retrieveListOfItemsForDesignerAndCall failed: " + JSON.stringify(resp), "review-popup.js", 0)
            } catch (e) {}
        }
    })
}
function fillListOfDesigners(designers) {
    var designers = rtr_prop.allDesigners;
    for (i = 0; i < designers.length; i++) {
        var designerOptionHTML = "<option value='" + designers[i] + "'>" + designers[i] + "</option>";
        $("#tag-img-designer").append(designerOptionHTML)
    }
}
function getAndFillListOfDesigners() {
    disableTaggingDesigners();
    $.ajax({
        type: "GET",
        url: "/api/productcatalog/attributes/designers",
        dataType: "json",
        timeout: longTimeout,
        success: function (data) {
            var listOfDesigners = [];
            for (var i = 0; i < data.length; i++) {
                listOfDesigners.push(data[i].name)
            }
            rtr_prop.allDesigners = listOfDesigners;
            fillListOfDesigners(rtr_prop.allDesigners);
            enableTaggingDesigners()
        },
        error: function (data) {}
    })
}
function loadUserProfileData(obj) {
    if (obj === null || obj === undefined) {
        return
    }
    $("#review-input-nickname").val(obj.nickName);
    $("#review-input-preferred-size").val(obj.usStandardSize);
    $("#review-input-body-type").val(obj.bodyType);
    $("#review-input-height-inches").val(obj.heightInches);
    $("#review-input-weight-pounds").val(obj.weightPounds);
    if ($.trim(obj.nickName) == "") {
        $("#review-input-nickname").val(obj.firstName);
        $("#review-span-nickname").text(obj.firstName)
    }
    if (obj.birthday !== null) {
        var unformattedUTCBirthday = new Date(obj.birthday);
        if (unformattedUTCBirthday != "Invalid Date") {
            $("#review-input-birthday-month").val(unformattedUTCBirthday.getUTCMonth() + 1);
            $("#review-input-birthday-day").val(unformattedUTCBirthday.getUTCDate());
            $("#review-input-birthday-year").val(unformattedUTCBirthday.getUTCFullYear())
        }
    }
    if (obj.bustSize !== undefined && obj.bustSize !== null) {
        var bustBackSize = obj.bustSize.match(/\d+/);
        var bustCupSize = obj.bustSize.match(/\D+\+?/);
        $("#review-input-bust-back-size").val(bustBackSize);
        $("#review-input-bust-cup-size").val(bustCupSize);
        $("#review-span-bust-size").val(bustBackSize + bustCupSize)
    } else {
        $("#review-input-bust-back-size").val("-1");
        $("#review-input-bust-cup-size").val("-1")
    }
    $("#review-span-nickname").text(obj.nickName);
    $("#review-span-age").text(getAge(obj.birthday));
    $("#review-span-height-inches").text(inchesToFeetAndInches(obj.heightInches));
    $("#review-span-weight").text(obj.weightPounds);
    $("#review-span-preferred-size").text(obj.usStandardSize);
    $("#review-span-body-type").text(obj.bodyType);
    $("#review-span-bust").html(obj.bustSize);
    displayAddButtonForAboutYou(obj);
    var profileData = grabReviewUserProfileInput();
    if (!hasUnfilledUserProfileFields(profileData)) {
        disableProfileEditing()
    } else {
        $(".review-popup-error").removeClass("review-popup-error")
    }
}
function displayAddButtonForAboutYou(obj) {
    if (obj.nickName === null || obj.nickName === undefined) {
        $("#review-span-nickname").html('<span class="review-edit-profile-button" onclick="enableProfileEditing()">+add</span>')
    }
    if (obj.weightPounds === null || obj.weightPounds === undefined) {
        $("#review-span-weight").html('<span class="review-edit-profile-button" onclick="enableProfileEditing()">+add</span>')
    }
    if (obj.bustSize === null || obj.bustSize === undefined) {
        $("#review-span-bust").html('<span class="review-edit-profile-button" onclick="enableProfileEditing()">+add</span>')
    }
}
function getAge(unixTime) {
    if (unixTime === null) {
        return
    }
    var unformattedUTCBirthday = new Date(unixTime);
    if (unformattedUTCBirthday != "Invalid Date") {
        var currentDate = new Date();
        var millisecondsInAYear = 365.25 * 24 * 60 * 60 * 1000;
        var ageInYears = (currentDate - unformattedUTCBirthday) / millisecondsInAYear;
        return Math.floor(ageInYears)
    }
    return ""
}
function isValidDate(isoDate) {
    if (typeof (isoDate) != "string") {
        return false
    }
    var dateArray = isoDate.split("-");
    var year = dateArray[0];
    var month = dateArray[1];
    var day = dateArray[2];
    var currentDate = new Date();
    if (year < 1900 || year > currentDate.getFullYear()) {
        return false
    }
    if (month < 1 || (year == currentDate.getFullYear() && month > currentDate.getMonth() + 1)) {
        return false
    }
    if (day < 1 || (year == currentDate.getFullYear() && month == currentDate.getMonth() + 1 && day > currentDate.getDate() - 1)) {
        return false
    }
    var d = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return (d.getFullYear() == year) && (d.getMonth() + 1 == month) && (d.getDate() == day)
}
function isValidBodyType(bodyType) {
    if (bodyType == "Apple" || bodyType == "Athletic" || bodyType == "Full Bust" || bodyType == "Hourglass" || bodyType == "Pear" || bodyType == "Petite" || bodyType == "Straight & narrow") {
        return true
    } else {
        return false
    }
}
function truncateStringWithDots(longString, maxLength) {
    return longString.slice(0, maxLength).replace(/...$/, "...")
}
function inchesToFeetAndInches(inches) {
    inches = Math.floor(inches);
    var inchesPerFoot = 12;
    var feet = (inches - (inches % inchesPerFoot)) / inchesPerFoot;
    var remainingInches = inches - (feet * inchesPerFoot);
    return feet + "' " + remainingInches + '"'
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) {
        return ""
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "))
    }
}
function authorizationRequiredPaths() {
    return {
        "redir/checkout/cart": "Please enter your password to continue",
        "/checkout/cart": "Sign in to proceed with checkout",
        "redir/my_rtr": "Please enter your password to continue",
        "/my_rtr": "Sign in to access your account"
    }
}
function rtr_add_popup_mini(title, content, parentelement, floatdirection, color, overridetop, overrideleft) {
    var popupheight = ((parseInt(content.length / 55, 10)) * 15) + 53;
    if (popupheight < 75) {
        popupheight = 75
    }
    var questionmark;
    if (color == "pink") {
        questionmark = '<img src="/sites/all/themes/custom/rtr/images/checkout/questionmark_pink.png">'
    } else {
        if (color == "diamond") {
            questionmark = '<img src="http://cdn.rtrcdn.com/public/images/sprites/s8/ico-help-2_hover.png">'
        } else {
            if (color == "none") {
                questionmark = ""
            } else {
                questionmark = '<img src="/sites/all/themes/custom/rtr/images/checkout/questionmark.png">'
            }
        }
    }
    questionmark = "<div class='shipping-help-x s8-ico-close'></div>";
    var popup = "<div id='rtr-popup-mini'>";
    if ((floatdirection == "left") || (floatdirection == "right")) {
        popup += "<div id='rtr-popup-mini-questionmark' onclick='rtr_popup_mini_close()'>" + questionmark + "</div>"
    }
    popup += "<div id='rtr-popup-mini-inner'><div id='rtr-popup-mini-title'><strong>" + title + "</strong></div><div id='rtr-popup-mini-content'><p>" + content + "</p>";
    if ((floatdirection == "bottomleft") || (floatdirection == "bottomright")) {
        popup += "<div id='rtr-popup-mini-questionmark'>" + questionmark + "</div>"
    }
    popup += "</div></div></div>";
    $("body").prepend(popup);
    var position = $(parentelement).offset();
    if (overridetop === undefined) {
        overridetop = 0
    }
    if (overrideleft === undefined) {
        overrideleft = 0
    }
    overridetop -= 2;
    overrideleft += 2;
    var dynamicmargin = parseInt($("body").offset().left, 10) - overrideleft;
    switch (floatdirection) {
        case "left":
            $("#rtr-popup-mini").css("top", (position.top - 6 + overridetop) + "px");
            $("#rtr-popup-mini").css("margin-left", (position.left - dynamicmargin - 254) + "px");
            if (navigator.platform == "Win32") {
                if (navigator.userAgent.indexOf("Firefox") != -1) {
                    $("#rtr-popup-mini-questionmark").css("margin-top", "3px")
                } else {
                    if (navigator.userAgent.indexOf("MSIE") != -1) {
                        $("#rtr-popup-mini-questionmark").css("margin-top", "5px")
                    } else {
                        $("#rtr-popup-mini-questionmark").css("margin-top", "4px")
                    }
                }
            }
            break;
        case "right":
            $("#rtr-popup-mini").css("top", (position.top - 6 + overridetop) + "px");
            $("#rtr-popup-mini").css("margin-left", (position.left - dynamicmargin - 6) + "px");
            $("#rtr-popup-mini-questionmark").css("float", "left");
            $("#rtr-popup-mini-questionmark").css("margin-right", "0px");
            $("#rtr-popup-mini-questionmark").css("margin-left", "5px");
            if (navigator.platform == "Win32") {
                if (navigator.userAgent.indexOf("Firefox") != -1) {
                    $("#rtr-popup-mini-questionmark").css("margin-top", "3px")
                } else {
                    if (navigator.userAgent.indexOf("MSIE") != -1) {
                        $("#rtr-popup-mini-questionmark").css("margin-top", "5px")
                    } else {
                        $("#rtr-popup-mini-questionmark").css("margin-top", "4px")
                    }
                }
            }
            break;
        case "bottomleft":
            $("#rtr-popup-mini").css("top", (position.top - popupheight + 18 + overridetop) + "px");
            $("#rtr-popup-mini").css("margin-left", (position.left - dynamicmargin - 254) + "px");
            $("#rtr-popup-mini-questionmark").css("position", "relative");
            if (navigator.platform == "Win32") {
                $("#rtr-popup-mini-questionmark").css("top", "6px");
                $("#rtr-popup-mini-questionmark").css("left", "28px")
            } else {
                $("#rtr-popup-mini-questionmark").css("left", "28px");
                if (navigator.userAgent.indexOf("Firefox") != -1) {
                    $("#rtr-popup-mini").css("top", (position.top - popupheight + 36) + "px");
                    $("#rtr-popup-mini-questionmark").css("top", "1px")
                }
                if (navigator.userAgent.indexOf("Safari") != -1) {
                    $("#rtr-popup-mini").css("top", (position.top - popupheight + 64) + "px");
                    $("#rtr-popup-mini-questionmark").css("top", "2px")
                }
            }
            break;
        case "bottomright":
            $("#rtr-popup-mini").css("top", (position.top - popupheight + 18 + overridetop) + "px");
            $("#rtr-popup-mini").css("margin-left", (position.left - dynamicmargin - 6) + "px");
            $("#rtr-popup-mini-questionmark").css("float", "left");
            $("#rtr-popup-mini-questionmark").css("top", "-6px");
            $("#rtr-popup-mini-questionmark").css("left", "-17px");
            $("#rtr-popup-mini-questionmark").css("position", "relative");
            break;
        default:
            $("#rtr-popup-mini").css("top", (position.top - 6) + "px");
            $("#rtr-popup-mini").css("margin-left", (position.left - dynamicmargin - 254) + "px")
    }
    $("#rtr-popup-mini").fadeIn("fast", function () {
        $(document).click(rtr_popup_mini_close)
    });
    $("#rtr-popup-mini").click(function (e) {
        e.stopPropagation()
    })
}
function rtr_popup_mini_close() {
    $("#rtr-popup-mini").fadeOut("fast");
    $("#rtr-popup-mini").remove();
    $(document).unbind("click", rtr_popup_mini_close)
}
function getParameterByName(name) {
    name = name.replace(/(\[|\])/g, "\\$1");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results === null) {
        return ""
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "))
    }
}
function ext_stats_log(act, obj_type, obj_id, userid) {
    var url_q = "/stats_log";
    $.ajax({
        type: "GET",
        url: url_q,
        data: {
            action: act,
            object_type: obj_type,
            object_id: obj_id,
            uid: userid
        }
    })
}
function separate_query_style_string(str) {
    var arr = str.split("&");
    var out = {};
    for (var i in arr) {
        var arr1 = arr[i].split("=");
        var key = arr1[0];
        var val = arr1[1];
        out[key] = val
    }
    return out
}
function append_user_data() {
    if (u) {
        rtr_prop.user_favorites = u.heartedStyles;
        set_heart_count(rtr_prop.user_favorites.length);
        u = null
    }
}
var UtilityMethods = {
    inArray: function (array, obj) {
        var i = array.length;
        while (i--) {
            if (array[i] === obj) {
                return true
            }
        }
        return false
    },
    removeFromArray: function (array, obj) {
        var i = array.length;
        while (i--) {
            if (array[i] === obj) {
                return array.splice(i, 1)[0]
            }
        }
        return undefined
    }
};
var FAVORITE_IMG_ON = "s32-heart-lg-on";
var FAVORITE_IMG_OFF = "s32-heart-lg-off";
var ALLOWED_SHORTLIST_PAGES = ["PDP", "SHORTLIST"];
var CAROUSEL_FLAG = false;
var ADMIN_FLAG = true;
$(document).ready(function () {
    $("body").delegate(".favorite_add, .favorite_added, .favorite_remove", "click", function (e) {
        e.preventDefault();
        favorite_click_handler(this, e)
    });
    $("body").delegate(".favorite_add", "mouseenter mouseleave", function (e) {
        var hover = (e.type == "mouseenter") ? true : false;
        hover_favorite(this, hover)
    });
    $("body").delegate("#add-shortlist-form", "submit", function (e) {
        e.preventDefault();
        if ($("#add-shortlist").val().length) {
            createShortlist($("#add-shortlist").val())
        }
        return false
    });
    $("body").delegate(".shortlist-item", "click", function (e) {
        addOrRemoveDressToShortlist(this)
    });
    $("body").delegate(".shortlist-wrapper", "click", function (e) {
        hideShortlistModal()
    });
    $("body").delegate(".shortlist-item", "mouseenter mouseleave", function (e) {
        var hover = (e.type == "mouseenter") ? true : false;
        hoverShortlistItem(this, hover)
    });
    $(document).bind(RTR.UX.hasUserData() ? "ready" : "userDataReady", function () {
        show_favorite_icons()
    })
});

function show_favorite_icons() {
    _.each($(".favorite_add, .favorite_added, .favorite_remove"), function (ele) {
        var params = separate_query_style_string($(ele).attr("rel"));
        var stylename = params.stylename;
        if (rtr_prop.user_favorites && $.inArray(String(stylename), rtr_prop.user_favorites) >= 0) {
            $(ele).removeClass(FAVORITE_IMG_OFF).removeClass("favorite_add");
            $(ele).removeClass("favorite_remove");
            $(ele).addClass(FAVORITE_IMG_ON).addClass("favorite_added").attr("title", "View Shortlist")
        } else {
            $(ele).removeClass(FAVORITE_IMG_ON).removeClass("favorite_added");
            $(ele).removeClass("favorite_remove");
            $(ele).addClass(FAVORITE_IMG_OFF).addClass("favorite_add").attr("title", "Add to favorites")
        }
    })
}
function favorite_click_handler(ele, e) {
    var params = separate_query_style_string($(ele).attr("rel"));
    var stylename = params.stylename;
    $(ele).data("stylename", stylename);
    var lightRegUsed = false;
    if (rtr_prop.uid) {
        $(document).trigger("favorite_click", e.target);
        rtr_favorite_rate_product(ele, lightRegUsed)
    } else {
        lightRegUsed = true;
        displayLightReg(function () {
            rtr_prop.uid = (rtr_prop.uid) ? rtr_prop.uid : true;
            $(document).trigger("favorite_click", e.target);
            rtr_favorite_rate_product(ele, lightRegUsed)
        }, "heart", "Sign in to heart this style")
    }
}
function getObjectType() {
    if (page_type) {
        if (page_type === "PDP") {
            return "node"
        } else {
            if (page_type === "GRID") {
                return "grid"
            } else {
                if (page_type === "HOME") {
                    return "home"
                } else {
                    if (page_type === "RunwayGrid") {
                        return "moments_grid"
                    } else {
                        return page_type
                    }
                }
            }
        }
    } else {
        return "none"
    }
}
function isWidgetDisplayed(ele) {
    var isPageAllowed = ALLOWED_SHORTLIST_PAGES.indexOf(page_type) > -1;
    if (ADMIN_FLAG) {
        if (RTR.UX.isAdmin()) {
            if (isPageAllowed) {
                if (isCarousel(ele)) {
                    return CAROUSEL_FLAG
                } else {
                    return true
                }
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        if (isPageAllowed) {
            if (isCarousel(ele)) {
                return CAROUSEL_FLAG
            } else {
                return true
            }
        } else {
            return false
        }
    }
}
function isCarousel(ele) {
    return $(ele).closest(".carousel-wrapper").length
}
function hover_favorite(ele, hover) {
    var params = separate_query_style_string($(ele).attr("rel"));
    var stylename = params.stylename;
    if (hover) {
        $(ele).removeClass(FAVORITE_IMG_OFF).addClass(FAVORITE_IMG_ON)
    } else {
        if (!rtr_prop.user_favorites || $.inArray(String(stylename), rtr_prop.user_favorites) < 0) {
            $(ele).removeClass(FAVORITE_IMG_ON).addClass(FAVORITE_IMG_OFF)
        }
    }
}
function hoverShortlistItem(ele, hover) {
    if (hover) {
        $(ele).addClass("hover")
    } else {
        $(ele).removeClass("hover")
    }
}
function update_heart_count() {
    var favs = rtr_prop.user_favorites;
    var count = (favs && favs.length > 0) ? favs.length : "";
    $("#header_heart_count").text(count);
    $("#usr-heart-count").text(count)
}
function rtr_favorite_rate_product(ele, lightRegUsed) {
    var stylename;
    if (isWidgetDisplayed(ele)) {
        if ($(ele).data("req") == "true") {
            return false
        } else {
            stylename = $(ele).data("stylename");
            if ($(ele).hasClass("favorite_add")) {
                $(ele).attr("data-action", "click_heart");
                rtr_favorite_add(stylename, ele);
                displayShortlists(ele, stylename, lightRegUsed)
            } else {
                if ($(ele).hasClass("favorite_remove")) {
                    $(ele).attr("data-action", "click_unheart");
                    rtr_favorite_remove(stylename, ele);
                    hideShortlistModal()
                } else {
                    if ($(ele).hasClass("favorite_added")) {
                        displayShortlists(ele, stylename, lightRegUsed)
                    } else {
                        return false
                    }
                }
            }
            rtr_favorite_update_heart_status(ele, stylename)
        }
    } else {
        if ($(ele).data("req") == "true") {
            return false
        } else {
            stylename = $(ele).data("stylename");
            if ($(ele).hasClass("favorite_add")) {
                $(ele).attr("data-action", "click_heart");
                rtr_favorite_add(stylename, ele)
            } else {
                if ($(ele).hasClass("favorite_added") || $(ele).hasClass("favorite_remove")) {
                    $(ele).attr("data-action", "click_unheart");
                    rtr_favorite_remove(stylename, ele)
                }
            }
            rtr_favorite_update_heart_status(ele, stylename)
        }
    }
}
function displayShortlists(ele, stylename, lightRegUsed) {
    if (!$(".shortlist-modal").length) {
        var shortlistTmpl = _.template($("#shortlist-modal").html());
        var parentElement = $(ele).parent();
        $(parentElement).prepend(shortlistTmpl({
            uid: true
        }))
    }
    $(".shortlist-modal").data("stylename", stylename);
    var leftOffset = 472;
    if (lightRegUsed) {
        leftOffset = -222
    }
    displayShortlistsModal(ele, leftOffset)
}
function displayShortlistsModal(ele, leftOffset) {
    pos = $(ele).offset();
    var topOffset = 52;
    $(".shortlist-modal").css({
        top: topOffset + "px",
        left: leftOffset + "px"
    });
    $(".shortlist-modal").show();
    $(".shortlist-wrapper").show();
    storeStylenameInHeader(ele);
    populateShortlistModal()
}
function storeStylenameInHeader(ele) {
    var relStyleName = $(ele).attr("rel");
    $(".shortlist-header").attr("rel", relStyleName)
}
function populateShortlistModal() {
    ShortlistClient.getShortlists(shortlistHandler)
}
function shortlistHandler(success, shortlists) {
    if (shortlists.length === 0) {
        $(".shortlist-no-items").show()
    } else {
        $(".shortlist-inner-modal").empty();
        for (slCount = 0; slCount < shortlists.length; slCount++) {
            var shortlist = shortlists[slCount];
            var slName = shortlist.name;
            var slNameId = slName.replace(/\s+/g, "-");
            modifyModalHeight(shortlists.length);
            $(".shortlist-inner-modal").append($("<div>").addClass("shortlist-item unchecked standard-content").addClass(shortlist.id).attr("id", slNameId).text(slName).data("shortlist", shortlist));
            if (shortlist.styleNames) {
                var curDress = $(".shortlist-modal").data("stylename");
                if (shortlist.hasStyle(curDress)) {
                    console.log("This dress is in the following shortlist");
                    $("." + shortlist.id).removeClass("unchecked").addClass("checked")
                }
                console.log(slName + ":");
                console.log(shortlist.styleNames)
            }
        }
    }
}
function modifyModalHeight(numShortlists) {
    if (numShortlists > 3 && $(".add-shortlist").hasClass("position-absolute")) {
        $(".add-shortlist").removeClass("position-absolute").addClass("position-inherit")
    }
}
function hideShortlistModal() {
    $(".shortlist-modal").hide();
    $(".shortlist-wrapper").hide()
}
function createShortlist(shortlistName) {
    var curDress = $(".shortlist-modal").data("stylename");
    ShortlistClient.createShortlist({
        name: shortlistName,
        styleNames: [curDress]
    }, populateShortlistModal);
    $("#add-shortlist").val("");
    R.log("shortlist", {
        action: "create",
        sub_type1: "dropdowndefined",
        name: shortlistName,
        source: page_type,
        styleName: curDress
    })
}
function addOrRemoveDressToShortlist(ele) {
    var slData = $(ele).data("shortlist");
    console.log(slData);
    var curDress = $(".shortlist-modal").data("stylename");
    if (slData.styleNames && slData.styleNames.indexOf(curDress) > -1) {
        ShortlistClient.removeFromShortlist(slData.id, {
            ownershipToken: slData.ownershipToken,
            styleNames: [curDress]
        }, changeModalCheck(ele));
        console.log("Removed " + curDress + " from " + slData.name);
        R.log("shortlist", {
            action: "remove_item",
            sub_type1: "dropdowndefined",
            name: slData.name,
            collectionID: slData.id,
            rent_begin_date: slData.eventDate,
            source: page_type,
            styleName: curDress
        })
    } else {
        ShortlistClient.addToShortlist(slData.id, {
            ownershipToken: slData.ownershipToken,
            styleNames: [curDress]
        }, changeModalCheck(ele));
        console.log("Added " + curDress + " to " + slData.name);
        R.log("shortlist", {
            action: "add_item",
            sub_type1: "dropdowndefined",
            name: slData.name,
            collectionID: slData.id,
            rent_begin_date: slData.eventDate,
            source: page_type,
            styleName: curDress
        })
    }
}
function changeModalCheck(ele) {
    if ($(ele).hasClass("checked")) {
        $(ele).removeClass("checked").addClass("unchecked")
    } else {
        $(ele).removeClass("unchecked").addClass("checked")
    }
}
function rtr_favorite_update_heart_status(ele, stylename) {
    var h = $(".favorite-" + stylename);
    if (isWidgetDisplayed(ele)) {
        if (h.hasClass("favorite_add")) {
            h.removeClass("favorite_add").addClass("favorite_added").removeClass(FAVORITE_IMG_OFF).addClass(FAVORITE_IMG_ON);
            h.attr("title", "View shortlist");
            $(document).trigger("favorite")
        } else {
            if ($(ele).hasClass("shortlist-header")) {
                h.removeClass("favorite_added").removeClass(FAVORITE_IMG_ON).addClass("favorite_add").addClass(FAVORITE_IMG_OFF);
                h.attr("title", "Add to favorites");
                $(document).trigger("unfavorite")
            }
        }
    } else {
        if (h.hasClass("favorite_add")) {
            h.removeClass("favorite_add").addClass("favorite_added").removeClass(FAVORITE_IMG_OFF).addClass(FAVORITE_IMG_ON);
            h.attr("title", "View shortlist");
            $(document).trigger("favorite")
        } else {
            h.removeClass("favorite_added").removeClass(FAVORITE_IMG_ON).addClass("favorite_add").addClass(FAVORITE_IMG_OFF);
            h.attr("title", "Add to favorites");
            $(document).trigger("unfavorite")
        }
    }
    update_heart_count()
}
function addOrRemoveFavoritePixelLog(ele, add) {
    var params = separate_query_style_string($(ele).attr("rel"));
    if (!params) {
        return
    }
    var objectType = getObjectType();
    if (objectType === "moments_grid") {
        R.log(objectType, {
            action: (add) ? "heart_moment_true" : "heart_moment_false",
            momentID: params.photoid,
            styleName: params.stylename,
            moment_uid: params.uid
        })
    } else {
        R.log(objectType, {
            action: (add) ? "click_heart" : "click_unheart",
            styleName: params.stylename
        })
    }
}
function rtr_favorite_add(stylename, ele) {
    if (!rtr_prop.user_favorites) {
        rtr_prop.user_favorites = []
    }
    rtr_set_user_rating(stylename, ele, 1);
    rtr_prop.user_favorites.push(stylename);
    addOrRemoveFavoritePixelLog(ele, true)
}
function rtr_favorite_remove(stylename, ele) {
    if (!rtr_prop.user_favorites) {
        return
    }
    rtr_set_user_rating(stylename, ele, -1);
    rtr_prop.user_favorites.splice($.inArray(stylename, rtr_prop.user_favorites), 1);
    addOrRemoveFavoritePixelLog(ele, false)
}
function rtr_set_user_rating(stylename, ele, rating) {
    var requests = 0;
    $(ele).data("req", true);
    $.ajax({
        type: "POST",
        url: rtr_routes.set_rating,
        data: {
            styleName: stylename,
            rating: rating
        },
        success: function (d) {
            $(ele).data("req", false);
            $(document).trigger("setUserRating", {
                styleName: stylename,
                rating: rating
            })
        },
        complete: function () {},
        error: function () {
            $(ele).data("req", false)
        }
    })
}
function add_user_favorite(stylename) {
    var i = $.inArray(String(stylename), rtr_prop.user_favorites);
    if (i < 0) {
        rtr_prop.user_favorites.push(stylename)
    }
    var ele = $(".favorite-" + stylename);
    ele.attr("title", "Remove from favorites");
    ele.removeClass("favorite_add").removeClass(FAVORITE_IMG_OFF).addClass("favorite_remove").addClass(FAVORITE_IMG_ON)
}
function add_existing_user_ratings(stylenames) {
    if (!rtr_prop.user_favorites) {
        rtr_prop.user_favorites = []
    }
    _.each(stylenames, function (stylename) {
        add_user_favorite(stylename)
    });
    update_heart_count()
}
var HANDLINGCLICK;
$(document).ready(function () {
    if (!rtr_prop.user_compliments) {
        rtr_prop.user_compliments = []
    }
    $("body").delegate(".compliment_add, .compliment_remove", "click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        complimentClickHandler(this)
    });
    $("body").delegate(".compliment_add, .compliment_remove", "mouseenter mouseleave", function (e) {
        var hover = (e.type == "mouseenter") ? true : false;
        var params = separate_query_style_string($(this).attr("rel"));
        var photoId = params.photoid;
        setComplimentText(photoId, hover)
    });
    showComplimentIcons()
});

function showComplimentIcons() {
    _.each($(".compliment_remove, .compliment_add"), function (ele) {
        var params = separate_query_style_string($(ele).attr("rel"));
        var photoId = params.photoid;
        var complimented = photoIsComplimented(photoId);
        setComplimentClass(photoId, complimented)
    })
}
function complimentClickHandler(ele) {
    if (HANDLINGCLICK) {
        return
    }
    HANDLINGCLICK = true;
    if (rtr_prop.uid) {
        switchComplimentStatus(ele)
    } else {
        displayLightReg(function () {
            rtr_prop.uid = (rtr_prop.uid) ? rtr_prop.uid : true;
            switchComplimentStatus(ele)
        }, "compliment", "Sign in to compliment")
    }
    setTimeout(function () {
        HANDLINGCLICK = false
    }, 300)
}
function logCompliment(ele, add) {
    var params = separate_query_style_string($(ele).attr("rel"));
    if (!params) {
        return
    }
    $.post("/pixel/p.php", {
        uid: rtr_prop.uid,
        timestamp: new Date().getTime(),
        object_type: params.type,
        action: (add) ? "compliment_moment_true" : "compliment_moment_false",
        momentID: params.photoid,
        styleName: params.stylename,
        moment_uid: params.uid
    })
}
function switchComplimentStatus(ele) {
    if ($(ele).data("req") == "true") {
        return false
    }
    var params = separate_query_style_string($(ele).attr("rel"));
    var photoId = params.photoid;
    if ($(ele).hasClass("compliment_add")) {
        addCompliment(photoId, ele);
        increaseComplimentCount(photoId);
        setComplimentClass(photoId, true);
        postComplimentStatus(photoId, ele, true);
        logCompliment(ele, true)
    } else {
        removeCompliment(photoId, ele);
        decreaseComplimentCount(photoId);
        setComplimentClass(photoId, false);
        postComplimentStatus(photoId, ele, false);
        logCompliment(ele, false)
    }
}
function setComplimentClass(photoId, complimented) {
    var ele = $(".compliment-" + photoId);
    if (complimented) {
        $(ele).removeClass("compliment_add").addClass("compliment_remove");
        $(ele).attr("title", "Remove compliment.")
    } else {
        $(ele).removeClass("compliment_remove").addClass("compliment_add");
        $(ele).attr("title", "We'll save this for you and send her a compliment.")
    }
    setComplimentText(photoId)
}
function setComplimentText(photoId, hover) {
    var ele = $(".compliment-" + photoId);
    var count = ($(ele).attr("count")) ? $(ele).attr("count") : "0";
    var html;
    if ($(ele).hasClass("compliment_add")) {
        html = "Love her look  "
    } else {
        html = "<i>You love this!</i>  "
    }
    if (parseInt(count, 10) && (!hover || $(ele).hasClass("compliment_remove"))) {
        html += "(" + count + ")"
    } else {
        if (hover && !photoIsComplimented(photoId)) {
            html += "+1"
        }
    }
    $(ele).html(html)
}
function increaseComplimentCount(photoId) {
    var ele = $(".compliment-" + photoId);
    var count = parseInt($(ele).attr("count"), 10) + 1;
    count = (count) ? count : 1;
    $(ele).attr("count", count)
}
function decreaseComplimentCount(photoId) {
    var ele = $(".compliment-" + photoId);
    var count = Math.max(parseInt($(ele).attr("count"), 10) - 1, 0);
    count = (count) ? count : 0;
    $(ele).attr("count", count)
}
function setComplimentCount(photoId, count) {
    if (!photoId || isNaN(count)) {
        return
    }
    var ele = $(".compliment-" + photoId);
    count = (parseInt(count, 10)) ? Math.max(parseInt(count, 10), 0) : 0;
    $(ele).attr("count", count);
    setComplimentText(photoId)
}
function photoIsComplimented(photoId) {
    return ($.inArray(String(photoId), rtr_prop.user_compliments) >= 0)
}
function addCompliment(photoId) {
    var i = $.inArray(String(photoId), rtr_prop.user_compliments);
    if (i < 0) {
        rtr_prop.user_compliments.push(String(photoId))
    }
}
function removeCompliment(photoId) {
    var i = $.inArray(String(photoId), rtr_prop.user_compliments);
    rtr_prop.user_compliments.splice(i, 1)
}
function postComplimentStatus(photoId, ele, addCompliment) {
    $(ele).data("req", true);
    if (addCompliment) {
        $.ajax({
            type: "POST",
            url: "/ourrunway/compliment",
            data: {
                photoId: photoId
            },
            success: function (data) {},
            error: function () {},
            complete: function () {
                $(ele).data("req", false)
            }
        })
    } else {
        var url = "/ourrunway/compliment/" + photoId;
        $.ajax({
            type: "DELETE",
            dataType: "json",
            url: url,
            cache: false,
            success: function (data, status, jq) {},
            error: function () {},
            complete: function () {
                $(ele).data("req", false)
            }
        })
    }
}
function addUserCompliments(photoIds) {
    _.each(photoIds, function (photoId) {
        addCompliment(photoId);
        setComplimentClass(photoId, true)
    })
}
function getAndUpdateComplimentCounts(photoIds) {
    if (!photoIds) {
        return
    }
    var url = rtr_prop.appPath + "/dynamicData";
    $.getJSON(url, {
        photoIds: photoIds
    }, function (data) {
        if (data.momentThumbs) {
            _.each(data.momentThumbs, function (thumb) {
                setComplimentCount(thumb.coverPhotoId, thumb.numCompliments)
            })
        }
    })
}
$(document).ready(function () {
    var lightbox = new momentLightbox();
    lightbox.momentsPopupEventHandler();
    if ($(".hd-myaccount").length) {
        $(".hd-myaccount").css("right", getMyAccountDropdownPosition())
    }
});
(function ($) {
    $.fn.jTruncate = function (options) {
        var defaults = {
            length: 300,
            minTrail: 20,
            moreText: "more",
            lessText: "less",
            ellipsisText: "...",
            moreAni: "",
            lessAni: ""
        };
        var options = $.extend(defaults, options);
        return this.each(function () {
            obj = $(this);
            var body = obj.html();
            if (body.length > options.length + options.minTrail) {
                var splitLocation = body.indexOf(" ", options.length);
                if (splitLocation != -1) {
                    var splitLocation = body.indexOf(" ", options.length);
                    var str1 = body.substring(0, splitLocation);
                    var str2 = body.substring(splitLocation, body.length - 1);
                    obj.html(str1 + '<span class="truncate_ellipsis">' + options.ellipsisText + '</span><span class="truncate_more">' + str2 + "</span>");
                    obj.find(".truncate_more").css("display", "none");
                    obj.append('<div class="clearboth"><a href="#" class="truncate_more_link">' + options.moreText + "</a></div>");
                    var moreLink = $(".truncate_more_link", obj);
                    var moreContent = $(".truncate_more", obj);
                    var ellipsis = $(".truncate_ellipsis", obj);
                    moreLink.click(function () {
                        if (moreLink.text() == options.moreText) {
                            moreContent.show(options.moreAni);
                            moreLink.text(options.lessText);
                            ellipsis.css("display", "none")
                        } else {
                            moreContent.hide(options.lessAni);
                            moreLink.text(options.moreText);
                            ellipsis.css("display", "inline")
                        }
                        return false
                    })
                }
            }
        })
    }
})(jQuery);

function momentLightbox() {
    this.lightboxSource = "unknown";
    this.lightboxTemplateAvailable = false;
    this.listOfCoverPhotoIdsAvailable = false;
    this.initialPopup = true;
    this.lightboxPhotoId = null;
    this.keypressHandlerIsBound = false;
    this.shortTimeout = 60000;
    this.longTimeout = 120000;
    this.currentCarouselPhotoCount = 20;
    this.defaultMomentsCarouselSliderWidth = 4000;
    this.loadedCarouselImageCount = 0;
    this.widthToReduceToGetCarouselWidth = 416;
    this.carouselImageBorderWidth = 4;
    this.navigateStyleByStyleOnMomentsGrid = false;
    this.showMomentAsFirstThumbnailOnCarousel = true
}
momentLightbox.prototype.logAnalyticsMomentsLightbox = function (action, additionalInfo) {
    var self = this;
    var styleName = "";
    if (typeof (rtr_prop.lightboxData) === "object" && typeof (rtr_prop.lightboxData.item)) {
        styleName = rtr_prop.lightboxData.item.styleName
    }
    analyticsData = {
        uid: rtr_prop.uid,
        timestamp: new Date().getTime(),
        styleName: styleName,
        coverPhotoId: rtr_prop.lightboxData.moment.coverPhotoId,
        photoId: this.lightboxPhotoId,
        action: action
    };
    if (self.lightboxSource == "individual-lightbox") {
        analyticsData.object_type = "moments_url"
    } else {
        if (self.lightboxSource == "my-moments") {
            analyticsData.object_type = "mymoments"
        } else {
            analyticsData.object_type = "moments_lb"
        }
    }
    if (action == "view_moment") {
        analyticsData.source = additionalInfo
    }
    if (action == "click_ghl") {
        if (additionalInfo != analyticsData.styleName) {
            analyticsData.clickedStyleName = additionalInfo
        }
    }
    if (action == "error") {
        analyticsData.errorMessage = additionalInfo
    }
    $.ajax({
        type: "POST",
        url: "/pixel/p.php",
        data: analyticsData
    })
};
momentLightbox.prototype.logAnalyticsViewLightbox = function (source, additionalInfo) {
    var self = this;
    analyticsData = {
        uid: (rtr_prop.uid > 0) ? rtr_prop.uid : 0,
        timestamp: new Date().getTime(),
        styleName: rtr_prop.lightboxData.item.styleName,
        coverPhotoId: rtr_prop.lightboxData.moment.coverPhotoId,
        photoId: this.lightboxPhotoId,
        action: "view_moment",
        source: source,
        otherTaggedProducts: rtr_prop.lightboxData.moment.products.join(","),
        num_photos: rtr_prop.lightboxData.moment.photoIds.length,
        num_moments: rtr_prop.listOfCoverPhotoIds.length
    };
    if (self.lightboxSource == "individual-lightbox") {
        analyticsData.object_type = "moments_url"
    } else {
        if (self.lightboxSource == "my-moments") {
            analyticsData.object_type = "user_moments"
        } else {
            analyticsData.object_type = "moments_lb"
        }
    }
    if (source.match("nav_arrow")) {
        analyticsData.arrowIndex = additionalInfo
    }
    if (source == "click_pdp_moment") {
        analyticsData.context = additionalInfo;
        var label = rtr_prop.lightboxData.item.type + "-" + rtr_prop.lightboxData.item.styleName + "-" + rtr_prop.lightboxData.item.displayName;
        var action;
        if (self.lightboxSource == "top-summary-link") {
            action = "click_viewphotos"
        }
        if (self.lightboxSource == "mini-moments-carousel") {
            action = "click_viewmoments"
        }
        if (self.lightboxSource == "view-moments-thumbnail" || self.lightboxSource == "view-moments") {
            action = "click_individualmoment"
        }
        if (self.lightboxSource == "alt-cust-image") {
            action = "click_altcustimage"
        }
    }
    if (source == "click_grid") {
        analyticsData.imageIndex = additionalInfo;
        var label = rtr_prop.lightboxData.item.type + "-" + rtr_prop.lightboxData.item.styleName + "-" + rtr_prop.lightboxData.item.displayName
    }
    if (source == "click_mymoments") {
        analyticsData.imageIndex = additionalInfo;
        var label = rtr_prop.lightboxData.item.type + "-" + rtr_prop.lightboxData.item.styleName + "-" + rtr_prop.lightboxData.item.displayName
    }
    if (typeof (or) === "object" && typeof (or.req_id) === "string") {
        analyticsData.reqID = or.req_id
    }
    $.ajax({
        type: "POST",
        url: "/pixel/p.php",
        data: analyticsData
    })
};
momentLightbox.prototype.attachDelegates = function () {
    var self = this;
    self.previousMomentClickHandler();
    self.nextMomentClickHandler();
    self.productInfoEventHandler();
    if (self.lightboxSource !== "moments-app") {
        self.dualHeartToMomentsHandler();
        self.dualHeartToPDPHandler()
    }
    self.analyticsEventHandler();
    self.htmlContainer.delegate(".other-moment-link", "click", function (e) {
        e.preventDefault();
        var photoId = $(this).data("photoid");
        var pageLink = $(this).attr("href");
        self.retrieveLightboxDataAndCall(photoId, function (data) {
            if (self.lightboxSource != "individual-lightbox") {
                self.initialPopup = false;
                self.displayMomentsLightbox(data)
            }
            self.logAnalyticsViewLightbox("click_other_moments", data.coverIdPosition + 1);
            if (self.lightboxSource == "individual-lightbox") {
                window.location.href = pageLink
            }
        })
    });
    self.htmlContainer.delegate(".other-moment-link", "hover", function (e) {
        var divWidth = $(this).parent().width() - self.carouselImageBorderWidth * 2;
        var borderDiv = $(this).parent().find(".carousel-image-border").css("width", divWidth).show()
    });
    self.htmlContainer.delegate(".carousel-image-border", "click", function () {
        $(this).parent().find(".other-moment-link").click()
    });
    self.htmlContainer.delegate(".relative-product .product-image, .relative-product .designer, .relative-product .style-name, .relative-product .retail-price, .relative-product .rental-price", "click", function (e) {
        e.preventDefault();
        if (self.lightboxSource !== "moments-app" && self.lightboxSource !== "my-moments" && self.lightboxSource !== "individual-lightbox") {
            self.logAnalyticsMomentsLightbox("click_rent", null);
            self.closeMomentsLightbox();
            return
        }
        document.location.href = $(this).data("link")
    });
    self.htmlContainer.delegate(".moment-lightbox .photos", "hover", function (e) {
        if (e.type == "mouseenter") {
            $(this).find(".moment-thumbs").fadeIn("fast")
        } else {
            $(this).find(".moment-thumbs").fadeOut("fast")
        }
    });
    self.htmlContainer.delegate(".info-shop-this-style", "hover", function (e) {
        if (e.type == "mouseenter") {
            $(this).removeClass("s8-shop_this_style_off");
            $(this).addClass("s8-shop_this_style_on")
        } else {
            $(this).removeClass("s8-shop_this_style_on");
            $(this).addClass("s8-shop_this_style_off")
        }
    });
    self.htmlContainer.delegate(".comment-input", "keydown", function (e) {
        var comment = $(this).val();
        if (rtr_prop.uid > 0) {
            if (e.keyCode === 13) {
                e.preventDefault();
                if (!e.shiftKey) {
                    self.submitCommentWithAjax(comment);
                    return false
                }
            }
        } else {
            e.preventDefault();
            displayLightReg(function () {}, "lightbox", "Sign in to comment")
        }
    }).keyup(function (e) {
            var comment = $(".comment-input").val();
            var scrollHeight = $(".comment-input")[0].scrollHeight;
            var height = $(".comment-input").outerHeight();
            var scrollWidth = $(".comment-input")[0].scrollWidth;
            var pre = $("#testSpanWidth");
            if (pre.length === 0) {
                pre = $(document.createElement("pre"));
                pre.attr("id", "testSpanWidth");
                pre.css("font-size", "12px");
                pre.css("font-family", "Arial, sans-serif");
                pre.hide();
                $("body").append(pre)
            }
            pre.text(comment);
            var rows = $(".comment-input").attr("rows");
            var textWidth = pre.width() - ((rows - 1) * scrollWidth);
            if (scrollHeight > height || textWidth > scrollWidth) {
                rows++;
                $(".comment-input").attr("rows", rows)
            } else {
                if (pre.width() < scrollWidth) {
                    $(".comment-input").attr("rows", 1)
                }
            }
        });
    self.htmlContainer.delegate(".thumb, .tagged-thumb", "click", function () {
        if ($(this).data("photoid")) {
            self.lightboxPhotoId = $(this).data("photoid")
        }
        var newImgSrc = $(this).data("originalimageurl");
        $("img.photo").attr("src", newImgSrc)
    });
    self.htmlContainer.delegate(".thumb-wrapper, .tagged-thumb", "click", function () {
        _.each($(".thumb-wrapper, .tagged-thumb"), function (thumb) {
            $(thumb).removeClass("thumb-border")
        });
        $(this).addClass("thumb-border")
    })
};
momentLightbox.prototype.individualLightboxEventHandler = function () {
    var self = this;
    self.htmlContainer = $("body");
    self.lightboxSource = "individual-lightbox";
    if (typeof (momentData) == "object") {
        rtr_prop.lightboxData = momentData;
        self.lightboxPhotoId = rtr_prop.lightboxData.moment.coverPhotoId
    }
    self.attachDelegates();
    if (typeof (embeddedListOfCoverPhotoObjects) == "object") {
        rtr_prop.listOfCoverPhotoObjects = embeddedListOfCoverPhotoObjects;
        rtr_prop.listOfCoverPhotoIds = [];
        $.each(embeddedListOfCoverPhotoObjects, function (index, photoObject) {
            rtr_prop.listOfCoverPhotoIds.push(photoObject.photoId)
        });
        rtr_prop.lightboxData.coverIdPosition = $.inArray(self.lightboxPhotoId, rtr_prop.listOfCoverPhotoIds);
        self.setupLightboxCarousel()
    }
    show_favorite_icons();
    self.fillCommentsSection();
    $(".back-to-our-runway-link").hover(function () {
        $(".ourrunway-moment-back").removeClass("s32-back-arrow-black").addClass("s32-back-arrow-pink")
    }, function () {
        $(".ourrunway-moment-back").removeClass("s32-back-arrow-pink").addClass("s32-back-arrow-black")
    })
};
momentLightbox.prototype.momentsPopupEventHandler = function () {
    var self = this;
    if (self.lightboxSource == "individual-lightbox") {
        return
    }
    $(document).delegate(".new-moments-popup", "click", function (e) {
        e.preventDefault();
        beginFormLoading();
        self.htmlContainer = $("<div>").addClass("moments-lightbox-container");
        self.lightboxSource = $(this).data("lightbox-source");
        var photoId;
        if (self.lightboxSource == "top-summary-link") {
            photoId = rtr_prop.listOfCoverPhotoIds[0]
        } else {
            photoId = $(this).data("photoid")
        }
        self.lightboxPhotoId = photoId;
        var styleName = $(this).data("stylename");
        if (!styleName) {
            styleName = pdp_glob.item.styleName
        }
        self.attachDelegates();
        if (!self.listOfCoverPhotoIdsAvailable) {
            self.ajaxGetListOfCoverPhotos(styleName, function () {
                if (self.lightboxSource == "my-moments" || (self.navigateStyleByStyleOnMomentsGrid && self.lightboxSource == "moments-app")) {
                    self.coverPhotoIds = or.coverPhotoIds
                } else {
                    self.coverPhotoIds = rtr_prop.listOfCoverPhotoIds
                }
                self.retrieveLightboxDataAndCall(photoId, function (data) {
                    self.initialPopup = true;
                    self.displayMomentsLightbox(data);
                    if (!self.keypressHandlerIsBound) {
                        self.keypressHandler()
                    }
                    self.identifyContextAndLogAnalytics()
                })
            })
        } else {
            if (self.lightboxSource == "my-moments" || (self.navigateStyleByStyleOnMomentsGrid && self.lightboxSource == "moments-app")) {
                self.coverPhotoIds = or.coverPhotoIds
            } else {
                self.coverPhotoIds = rtr_prop.listOfCoverPhotoIds
            }
            self.retrieveLightboxDataAndCall(photoId, function (data) {
                self.initialPopup = true;
                self.displayMomentsLightbox(data);
                if (!self.keypressHandlerIsBound) {
                    self.keypressHandler()
                }
                self.identifyContextAndLogAnalytics()
            })
        }
    })
};
momentLightbox.prototype.ajaxGetListOfCoverPhotos = function (styleName, callbackFunction) {
    var self = this;
    $.ajax({
        type: "GET",
        url: rtr_prop.appPath + "/momentCoverPhotos/" + styleName,
        dataType: "json",
        timeout: 20000,
        success: function (listOfCoverPhotoObjects) {
            var found = false;
            if (self.showMomentAsFirstThumbnailOnCarousel) {
                for (var i = 0; i < listOfCoverPhotoObjects.length; i++) {
                    if (self.lightboxPhotoId == listOfCoverPhotoObjects[i].photoId) {
                        found = true;
                        break
                    }
                }
                if (found) {
                    var tempObj = listOfCoverPhotoObjects[i];
                    listOfCoverPhotoObjects[i] = listOfCoverPhotoObjects[0];
                    listOfCoverPhotoObjects[0] = tempObj
                } else {
                    listOfCoverPhotoObjects.unshift({
                        photoId: self.lightboxPhotoId
                    })
                }
            }
            rtr_prop.listOfCoverPhotoIds = [];
            $.each(listOfCoverPhotoObjects, function (index, photoObject) {
                rtr_prop.listOfCoverPhotoIds.push(photoObject.photoId)
            });
            rtr_prop.listOfCoverPhotoObjects = listOfCoverPhotoObjects;
            callbackFunction()
        },
        error: function (resp) {
            self.errorHandler("Error in get_list_of_moment_cover_photos", resp.responseText);
            alert("Oops... we hit a snag. Please try again.")
        }
    })
};
momentLightbox.prototype.identifyContextAndLogAnalytics = function () {
    var self = this;
    var actionSource = "click_pdp_moment";
    if (lsValueForKey("moment_lightbox_source")) {
        var payload = JSON.parse(lsValueForKey("moment_lightbox_source"));
        if (payload.styleName && payload.styleName === pdp_glob.item.styleName) {
            actionSource = payload.source;
            lsRemoveKey("moment_lightbox_source")
        }
    }
    var context = "other";
    switch (self.lightboxSource) {
        case "top-summary-link":
            common_ga_event_track("Product", "click_viewphotos", pdp_glob.item.type + "-" + pdp_glob.item.styleName + "-" + pdp_glob.item.displayName, null, true);
            context = "link_top";
            break;
        case "mini-moments-carousel":
            common_ga_event_track("Product", "click_minimomentscarousel", pdp_glob.item.type + "-" + pdp_glob.item.styleName + "-" + pdp_glob.item.displayName, null, true);
            context = "mini_moments_carousel";
            break;
        case "view-moments-thumbnail":
            common_ga_event_track("Product", "click_momentreview", pdp_glob.item.type + "-" + pdp_glob.item.styleName + "-" + pdp_glob.item.displayName, null, true);
            context = "thumbnail";
            break;
        case "view-moments":
            context = "view_moment";
            break;
        case "alt-cust-image":
            common_ga_event_track("Product", "click_custaltimg", pdp_glob.item.type + "-" + pdp_glob.item.styleName + "-" + pdp_glob.item.displayName, null, true);
            context = "cust_alt_image";
            break;
        case "moments-app":
            actionSource = "click_grid";
            if (typeof (or) == "object") {
                context = $.inArray(self.lightboxPhotoId, or.coverPhotoIds)
            }
            break;
        case "my-moments":
            actionSource = "click_mymoments";
            if (typeof (or) == "object") {
                context = $.inArray(self.lightboxPhotoId, or.coverPhotoIds)
            }
            break
    }
    self.logAnalyticsViewLightbox(actionSource, context)
};
momentLightbox.prototype.getNextPhotoId = function (currentPhotoId) {
    var self = this;
    var i = $.inArray(currentPhotoId, self.coverPhotoIds);
    if (i == -1) {
        return -1
    }
    if (i + 1 >= self.coverPhotoIds.length) {
        return self.coverPhotoIds[0]
    } else {
        return self.coverPhotoIds[i + 1]
    }
};
momentLightbox.prototype.retrieveLightboxDataAndCall = function (photoId, onSuccessCallback) {
    var self = this;
    $.ajax({
        type: "GET",
        url: rtr_prop.appPath + "/momentBasic/" + photoId,
        dataType: "json",
        timeout: self.shortTimeout,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-rtr-accept", "basic")
        },
        success: function (data, textStatus, jqXHR) {
            if (jqXHR.status == 204) {
                self.errorHandler("Error in retrieveLightboxDataAndCall", "Benhur returns 204 for photoId" + photoId);
                alert("Oops... we hit a snag. Please try again.");
                return
            }
            self.lightboxPhotoId = photoId;
            data.coverIdPosition = $.inArray(data.moment.coverPhotoId, self.coverPhotoIds);
            if (data.coverIdPosition > -1) {
                var nextPhotoId = self.getNextPhotoId(data.moment.coverPhotoId);
                data.nextLightboxPhotoId = nextPhotoId;
                self.nextLightboxPhotoId = nextPhotoId;
                if (data.coverIdPosition === 0) {
                    data.previousLightboxPhotoId = self.coverPhotoIds[self.coverPhotoIds.length - 1];
                    self.previousLightboxPhotoId = self.coverPhotoIds[self.coverPhotoIds.length - 1]
                } else {
                    data.previousLightboxPhotoId = self.coverPhotoIds[data.coverIdPosition - 1];
                    self.previousLightboxPhotoId = self.coverPhotoIds[data.coverIdPosition - 1]
                }
            }
            delete data.mapOfStyleNamesToItems[data.item.styleName];
            if (typeof (data.userProfile) == "object" && data.userProfile !== null) {
                data.age = self.getMomentUserAge(data.userProfile.birthday);
                data.heightInchesDisplayFormat = self.heightFromInches(data.userProfile.heightInches)
            }
            rtr_prop.lightboxData = data;
            onSuccessCallback(data)
        },
        error: function (resp) {
            self.errorHandler("retrieveLightboxDataAndCall failed", resp.responseText);
            alert("Oops... we hit a snag. Please try again.")
        }
    })
};
momentLightbox.prototype.getLightboxTemplate = function () {
    var self = this;
    $.ajax({
        url: "/public/templates/_moment-lightbox.html",
        timeout: self.shortTimeout,
        success: function (momentsLightboxTemplate) {
            self.lightboxTemplate = momentsLightboxTemplate;
            self.lightboxTemplateAvailable = true;
            $(document).trigger("lightboxTemplateLoaded")
        },
        error: function (resp) {
            self.errorHandler("getLightboxTemplate error", resp.responseText);
            alert("Oops... we hit a snag. Please try again.")
        }
    })
};

function formattedCommentDate(date) {
    if (!date) {
        return ""
    }
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date(date);
    if (d) {
        var p1 = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " at ";
        var p2 = ((d.getHours() % 12 !== 0) ? d.getHours() % 12 : 12) + ":" + ((d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes()) + " ";
        var d1 = p1 + p2 + ((d.getHours() >= 12) ? "PM" : "AM");
        return d1
    }
    return ""
}
momentLightbox.prototype.fillCommentsSection = function () {
    var self = this;
    $.ajax({
        type: "GET",
        url: rtr_prop.appPath + "/momentFeedback/" + self.lightboxPhotoId,
        dataType: "json",
        timeout: self.shortTimeout,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            if (typeof (data.aggregateComments) != "undefined" && data.aggregateComments.length > 0) {
                $(".comment-label").after('<p class="comment-count">(<span class="comment-count-integer">' + data.aggregateComments.length + "</span>)</p>");
                commentsHTMLOutput = [];
                $.each(data.aggregateComments, function (index, commentObj) {
                    commentsHTMLOutput.push('<div class="moment-comment"><h6 class="comment-title">' + (commentObj.isRtrOfficial ? "RTR Response" : (commentObj.userNickName ? commentObj.userNickName : "RTR Member")) + '<span class="comment-time">' + formattedCommentDate(commentObj.uploadedAt) + '</span></h6><p class="comment-body">' + commentObj.content + "</p></div>")
                });
                $(".comment-entry").after(commentsHTMLOutput.join(""))
            }
            if (data.aggregateLikes) {
                setComplimentCount(self.lightboxPhotoId, data.aggregateLikes.length)
            }
        },
        error: function (resp) {
            self.errorHandler("Error in moment lightbox", "Comments for photoId" + self.lightboxPhotoId + "can't be retrieved - " + resp.responseText)
        }
    })
};
momentLightbox.prototype.fillLightboxTemplateWithDataAndHandlers = function (lightboxData) {
    var self = this;
    if (self.lightboxSource == "individual-lightbox") {
        return
    } else {
        if ($.inArray(self.lightboxSource, ["moments-app", "my-moments", "mini-moments-carousel", "view-moments-thumbnail"]) != -1) {
            if ($.inArray(lightboxData.moment.styleName, rtr_prop.user_favorites) > -1) {
                lightboxData.favorite_class = "favorite_remove s32-heart-lg-on"
            } else {
                lightboxData.favorite_class = "favorite_add s32-heart-lg-off"
            }
        } else {
            if (pdp_glob.item.userRating) {
                lightboxData.favorite_class = "favorite_remove"
            } else {
                lightboxData.favorite_class = "favorite_add"
            }
        }
    }
    var lightboxTemplate = _.template(self.lightboxTemplate);
    var htmlOutput = lightboxTemplate(lightboxData);
    self.htmlContainer.html(htmlOutput);
    self.renderDynamicTemplate(lightboxData)
};
momentLightbox.prototype.displayMomentsLightbox = function (moment) {
    var self = this;
    try {
        $(".moments-lightbox").remove();
        $("body").css("overflow", "hidden");
        if (!self.lightboxTemplateAvailable) {
            self.getLightboxTemplate();
            $(document).bind("lightboxTemplateLoaded", function () {
                self.fillLightboxTemplateWithDataAndHandlers(moment)
            })
        } else {
            self.fillLightboxTemplateWithDataAndHandlers(moment)
        }
    } catch (error) {
        self.errorHandler("displayMomentsLightbox", error)
    }
};
momentLightbox.prototype.displayCarouselPhotos = function () {
    var self = this;
    var carouselCoverPhotoIdList = rtr_prop.listOfCoverPhotoIds;
    var carouselCoverPhotoObjects = rtr_prop.listOfCoverPhotoObjects;
    if (self.lightboxSource == "my-moments") {
        carouselCoverPhotoIdList = or.coverPhotoIds;
        carouselCoverPhotoObjects = or.coverPhotoObjects
    }
    var carouselOutput = '<ul class="other-moments-slider">';
    var carouselItemStringArray = [];
    self.currentCarouselPhotoCount = carouselCoverPhotoIdList.length;
    for (var i = 0; i < self.currentCarouselPhotoCount; i++) {
        var photoObj = carouselCoverPhotoObjects[i];
        carouselItemStringArray.push('<li><div class="moment-carousel-box"><a class="other-moment-link"data-photoid="' + photoObj.photoId + '" href="/ourrunway/moment/' + encodeURIComponent(rtr_prop.lightboxData.item.designer.name.toLowerCase()) + "-" + encodeURIComponent(rtr_prop.lightboxData.item.displayName.toLowerCase()) + "--id-" + photoObj.photoId + '"><img class="other-moment"' + ((photoObj.hasCroppedPhoto) ? 'style="height: 120px !important"' : "") + '" src="' + rtr_prop.reviewsCdn + "/" + photoObj.photoId + ((photoObj.hasCroppedPhoto) ? "-cropped" : "") + '-thumb.jpg" /><div class="carousel-image-border"></div></a></div></li>')
    }
    carouselOutput += carouselItemStringArray.join("");
    carouselOutput += "</ul>";
    $(".other-moments").html(carouselOutput)
};
momentLightbox.prototype.renderLightbox = function () {
    var self = this;
    self.adjustLightboxDimensions();
    if (self.lightboxSource == "my-moments") {
        if ($.trim(rtr_prop.lightboxData.userProfile.nickName) !== "") {
            $(".other-title").html("All " + rtr_prop.lightboxData.userProfile.nickName + "'s Moments <span class='other-count'>(" + or.coverPhotoIds.length + ")</span>")
        } else {
            $(".other-title").html("Her Moments <span class='other-count'>(" + or.coverPhotoIds.length + ")</span>")
        }
    }
    if (rtr_prop.listOfCoverPhotoIds.length <= 1 && self.lightboxSource != "my-moments") {
        $(".moment-lightbox .moment-relatives .relative-other-moments").remove();
        $(".moment-lightbox .moment-relatives .relative-product").css("border", "none");
        $(".moment-lightbox .reviews-comments").css({
            height: self.lightboxHeight - 60 + "px",
            position: "absolute",
            top: "0px",
            right: "0px"
        })
    } else {
        self.displayCarouselPhotos();
        $(".moment-lightbox .reviews-comments").css({
            height: self.lightboxHeight - 260 + "px",
            position: "absolute",
            top: "0px",
            right: "0px"
        })
    }
    $(".moments-lightbox-container").fadeIn("fast")
};
momentLightbox.prototype.renderDynamicTemplate = function (lightboxData) {
    var self = this;
    if (lightboxData.item.type == "SaleableProduct") {
        $(".lightbox-rental-price").text("Buy for " + lightboxData.item.rentalFee.toFixed(2))
    }
    if (self.coverPhotoIds.length == 1) {
        this.htmlContainer.find(".moment-next-arrow").remove();
        this.htmlContainer.find(".moment-previous-arrow").remove()
    }
    if (this.initialPopup) {
        this.htmlContainer.appendTo("body");
        var img = new Image();
        img.src = self.getPhotoURL(lightboxData.moment.coverPhotoId);
        $(img).load(function () {
            formLoadingFinished();
            self.renderLightbox();
            self.momentReadyEventHandler();
            self.fillCommentsSection();
            self.initialPopup = false;
            if (self.lightboxSource == "moments-app" || self.lightboxSource === "my-moments") {
                show_favorite_icons()
            }
        }).error(function () {
                self.errorHandler("Image preloading error", this.src);
                self.renderLightbox();
                self.momentReadyEventHandler();
                self.fillCommentsSection();
                self.initialPopup = false;
                if (self.lightboxSource == "moments-app" || self.lightboxSource === "my-moments") {
                    show_favorite_icons()
                }
            })
    } else {
        self.renderLightbox();
        self.momentReadyEventHandler();
        self.fillCommentsSection();
        self.initialPopup = false;
        if (self.lightboxSource == "moments-app" || self.lightboxSource === "my-moments") {
            show_favorite_icons()
        }
    }
    showComplimentIcons()
};
momentLightbox.prototype.getPhotoURL = function (photoId) {
    return rtr_prop.reviewsCdn + "/" + photoId + ".jpg"
};
momentLightbox.prototype.shiftCarouselToCorrectPosition = function () {
    var self = this;
    if (self.navigateStyleByStyleOnMomentsGrid && self.lightboxSource == "moments-app") {
        return
    }
    if (self.carouselWidthFitsAllThumbnails()) {
        return
    }
    var imagePlusSpaceWidth = 88;
    var numberOfThumbnailsPrecedingHighlightedThumbnail = 2;
    if (self.lightboxSource == "individual-lightbox") {
        numberOfThumbnailsPrecedingHighlightedThumbnail = 1
    }
    var distanceToShift;
    if (typeof (rtr_prop.lightboxData.coverIdPosition) === "number" && rtr_prop.lightboxData.coverIdPosition > 2) {
        distanceToShift = 0;
        $(".other-moments-slider li").each(function (index) {
            if (index == rtr_prop.lightboxData.coverIdPosition - numberOfThumbnailsPrecedingHighlightedThumbnail) {
                return false
            }
            distanceToShift += $(this).width()
        })
    }
    $(".other-moments-slider").css("left", -distanceToShift);
    if (self.carouselRightEndReached()) {
        $(".other-moments-slider").css("left", -(parseInt($(".other-moments-slider").width(), 10) - $(".other-moments").width()))
    }
    if (self.carouselLeftEndReached()) {
        $(".other-arrow-left").removeClass("s8-arrow-carousel-left").addClass("s8-arrow-carousel-left-inactive")
    }
};
momentLightbox.prototype.adjustLightboxDimensions = function () {
    var self = this;
    var agentSearchIpad = navigator.userAgent.search("iPad");
    var agentSearchIphone = navigator.userAgent.search("iPhone");
    if (agentSearchIpad !== -1 || agentSearchIphone !== -1) {
        self.isIpadOrIphone = true
    } else {
        self.isIpadOrIphone = false
    }
    self.xBrowserCurrentWindowProperties = {};
    self.xBrowserCurrentWindowProperties.windowDimensions = self.getWinSize();
    self.xBrowserCurrentWindowProperties.width = self.xBrowserCurrentWindowProperties.windowDimensions[0];
    self.xBrowserCurrentWindowProperties.height = $(window).height();
    if ((self.xBrowserCurrentWindowProperties.height - 110) > 600) {
        self.lightboxHeight = (self.xBrowserCurrentWindowProperties.height - 110)
    } else {
        self.lightboxHeight = 600
    }
    if (self.lightboxHeight > 800) {
        self.lightboxWidth = self.lightboxHeight
    } else {
        self.lightboxWidth = 800
    }
    if (self.xBrowserCurrentWindowProperties.width < self.xBrowserCurrentWindowProperties.height) {
        self.lightboxWidth = (self.xBrowserCurrentWindowProperties.width - 200);
        if (self.lightboxWidth < 660) {
            self.lightboxWidth = 660
        }
    }
    self.photoboxWidth = (self.lightboxWidth - 340);
    self.photoboxHeight = (self.lightboxHeight - 200);
    self.halfLightboxHeight = (self.lightboxHeight / 2);
    $(".lightbox-width-wrapper").css({
        width: (self.lightboxWidth + 200) + "px",
        margin: "0 auto"
    });
    $(".moment-lightbox").css({
        width: self.lightboxWidth,
        height: self.lightboxHeight
    });
    $(".moment-lightbox .photos").css({
        width: self.photoboxWidth,
        height: self.photoboxHeight
    });
    $(".moment-lightbox .photo").css({
        "max-width": (self.photoboxWidth - 6) + "px",
        "max-height": self.photoboxHeight
    });
    $(".moment-lightbox .photos .thumb-wrapper").css({
        "max-width": 48
    });
    $(".moment-previous-arrow, .moment-next-arrow").css("top", self.halfLightboxHeight - 105 + "px");
    $(".relative-other-moments").css("width", self.lightboxWidth - self.widthToReduceToGetCarouselWidth)
};
momentLightbox.prototype.momentReadyEventHandler = function () {
    var self = this;
    $(".moments-lightbox-close").click(function () {
        self.logAnalyticsMomentsLightbox("close_lightbox", null);
        self.closeMomentsLightbox()
    });
    $(".moment-overlay").click(function (e) {
        if (e.target.className == "moment-overlay") {
            self.closeMomentsLightbox()
        }
    });
    $(".moments-lightbox-close").hover(function () {
        $(this).removeClass("s8-btn-x-on");
        $(this).addClass("s8-btn-x")
    }, function () {
        $(this).removeClass("s8-btn-x");
        $(this).addClass("s8-btn-x-on")
    });
    $(".moment-previous-arrow").hover(function () {
        $(this).find("a").removeClass("s8-prev");
        $(this).find("a").addClass("s32-previous-moment")
    }, function () {
        $(this).find("a").removeClass("s32-previous-moment");
        $(this).find("a").addClass("s8-prev")
    });
    $(".moment-next-arrow").hover(function () {
        $(this).find("a").removeClass("s8-next");
        $(this).find("a").addClass("s32-next-moment")
    }, function () {
        $(this).find("a").removeClass("s32-next-moment");
        $(this).find("a").addClass("s8-next")
    });
    self.setupLightboxCarousel();
    return false
};
momentLightbox.prototype.productThumbnailShopThisStyleClickHandler = function (link) {
    var self = this;
    $(".lightbox-moment-product-info .info-shop-this-style").click(function () {
        var queryString = "?action=click_shoplb";
        if (self.lightboxSource == "individual-lightbox") {
            queryString = "?action=click_shopurl"
        }
        document.location.href = link + queryString
    })
};
momentLightbox.prototype.closeMomentsLightbox = function () {
    var self = this;
    self.htmlContainer.fadeOut("slow", function () {
        $("body").css("overflow", "scroll");
        self.htmlContainer.remove()
    });
    rtr_prop.lightboxData = null;
    self.lightboxPhotoId = null;
    self.currentCarouselPhotoCount = 20
};
momentLightbox.prototype.displayPreviousMoment = function () {
    var self = this;
    self.retrieveLightboxDataAndCall(self.previousLightboxPhotoId, function (data) {
        if (self.lightboxSource == "my-moments" || (self.navigateStyleByStyleOnMomentsGrid && self.lightboxSource == "moments-app")) {
            self.ajaxGetListOfCoverPhotos(data.moment.styleName, function () {
                self.initialPopup = false;
                self.displayMomentsLightbox(data);
                if (self.coverPhotoIds.length > 1) {
                    self.logAnalyticsViewLightbox("nav_arrow_left", data.coverIdPosition + 1)
                }
            })
        } else {
            self.initialPopup = false;
            self.displayMomentsLightbox(data);
            if (self.coverPhotoIds.length > 1) {
                self.logAnalyticsViewLightbox("nav_arrow_left", data.coverIdPosition + 1)
            }
        }
    })
};
momentLightbox.prototype.displayNextMoment = function () {
    var self = this;
    self.retrieveLightboxDataAndCall(self.nextLightboxPhotoId, function (data) {
        if (self.lightboxSource == "my-moments" || (self.navigateStyleByStyleOnMomentsGrid && self.lightboxSource == "moments-app")) {
            self.ajaxGetListOfCoverPhotos(data.moment.styleName, function () {
                self.initialPopup = false;
                self.displayMomentsLightbox(data);
                if (self.coverPhotoIds.length > 1) {
                    self.logAnalyticsViewLightbox("nav_arrow_right", data.coverIdPosition + 1)
                }
            })
        } else {
            self.initialPopup = false;
            self.displayMomentsLightbox(data);
            if (self.coverPhotoIds.length > 1) {
                self.logAnalyticsViewLightbox("nav_arrow_right", data.coverIdPosition + 1)
            }
        }
    })
};
momentLightbox.prototype.keypressHandler = function () {
    var self = this;
    $(document).keydown(function (e) {
        if ($(".comment-input").is(":focus")) {
            return
        }
        var escKeycode = 27;
        var rightArrowKeycode = 39;
        var leftArrowKeycode = 37;
        switch (e.keyCode) {
            case escKeycode:
                self.closeMomentsLightbox();
                break;
            case rightArrowKeycode:
                self.displayNextMoment();
                break;
            case leftArrowKeycode:
                self.displayPreviousMoment();
                break
        }
    });
    self.keypressHandlerIsBound = true
};
momentLightbox.prototype.getWinSize = function () {
    if (window.innerWidth !== undefined) {
        return [window.innerWidth, window.innerHeight]
    } else {
        var B = document.body;
        var D = document.documentElement;
        return [Math.max(D.clientWidth, B.clientWidth), Math.max(D.clientHeight, B.clientHeight)]
    }
};
momentLightbox.prototype.getMomentUserAge = function (dateString) {
    if (dateString === null) {
        return ""
    }
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
};
momentLightbox.prototype.heightFromInches = function (heightInches) {
    if (heightInches) {
        var feet = Math.floor(heightInches / 12);
        var inches = heightInches % 12;
        var height = feet + "'" + inches + "&quot";
        return height
    }
    return null
};
momentLightbox.prototype.submitCommentWithAjax = function (comment) {
    var self = this;
    var userId = rtr_prop.uid;
    var userNickname;
    if (self.lightboxSource == "moments-app" || self.lightboxSource == "individual-lightbox" || self.lightboxSource === "my-moments") {
        try {
            userNickname = rtr_prop.user.basicUserProfile.nickName
        } catch (e) {
            userNickname = "Me"
        }
    } else {
        userNickname = $('meta[name="user"]').attr("content")
    }
    var altNickname = "RTR Member";
    var commentData;
    var isReviewComment;
    if (rtr_prop.lightboxData && rtr_prop.lightboxData.moment.reviewId) {
        isReviewComment = true;
        commentData = {
            review_id: rtr_prop.lightboxData.moment.reviewId,
            content: comment
        }
    } else {
        isReviewComment = false;
        commentData = {
            photo_id: rtr_prop.lightboxData.moment.coverPhotoId,
            content: comment
        }
    }
    var dispName = (userNickname) ? userNickname : altNickname;
    var commentRow = '<div class="moment-comment"><h6 class="comment-title">' + dispName + '<span class="comment-time">&nbsp;A moment ago</span></h6><p class="comment-body">' + comment + "</p></div>";
    if (rtr_prop.uid > 0) {
        $.ajax({
            type: "POST",
            url: (isReviewComment) ? rtr_prop.appPath + "/commentReview" : rtr_prop.appPath + "/commentPhoto",
            data: commentData,
            beforeSend: function () {
                $(".comment-submit-overlay").show();
                $(".comment-input").blur()
            },
            success: function (response) {
                self.addCommentSuccessHandler(commentRow)
            },
            error: function (response) {
                self.addCommentErrorHandler(response)
            },
            complete: function (response) {
                self.resetCommentText();
                $(".comment-submit-overlay").hide()
            }
        })
    } else {
        reg_light_default.fade_in()
    }
};
momentLightbox.prototype.addCommentSuccessHandler = function (commentRow) {
    this.resetCommentText();
    $(".comment-submit-overlay").hide();
    $(commentRow).hide().insertBefore(".comment-submit-overlay").fadeIn("fast");
    if ($(".comment-count-integer").length === 0) {
        $(".comment-count").html("(<span class='comment-count-integer'>0</span>)")
    }
    var commentCount = parseInt($(".comment-count-integer").text(), 10);
    var newCommentCount = commentCount + 1;
    $(".comment-count-integer").text(newCommentCount);
    this.logAnalyticsMomentsLightbox("ask_q", null);
    var label = rtr_prop.lightboxData.item.type + "-" + rtr_prop.lightboxData.item.styleName + "-" + rtr_prop.lightboxData.item.displayName;
    var numberOfPreviousComments = $(".moment-comment").length - 1;
    return false
};
momentLightbox.prototype.addCommentErrorHandler = function (response) {
    alert("There was an error processing your comment. Please try again.");
    this.resetCommentText();
    $(".comment-submit-overlay").hide();
    try {
        window.Airbrake.notify("Add comment error: " + response.responseText, "moment-lightbox.js", 0)
    } catch (e) {}
    return false
};
momentLightbox.prototype.resetCommentText = function () {
    $(".comment-input").val("");
    $(".comment-input").attr("rows", "1")
};
momentLightbox.prototype.errorHandler = function (description, errorDetails) {
    formLoadingFinished();
    $("body").css("overflow", "scroll");
    try {
        window.Airbrake.notify(description + ": " + errorDetails, "moment-lightbox.js", 0)
    } catch (e) {}
};
momentLightbox.prototype.carouselWidthFitsAllThumbnails = function () {
    if ($(".other-moments-slider").width() <= $(".other-moments").width()) {
        return true
    } else {
        return false
    }
};
momentLightbox.prototype.carouselRightEndReached = function () {
    var slider = $(".other-moments-slider");
    var clip = $(".other-moments");
    var leftShiftDistance = parseInt(slider.css("left"), 10);
    var remainingSliderLength = slider.width() + leftShiftDistance;
    if (remainingSliderLength <= clip.width()) {
        return true
    } else {
        return false
    }
};
momentLightbox.prototype.carouselLeftEndReached = function () {
    if (parseInt($(".other-moments-slider").css("left"), 10) >= 0) {
        return true
    } else {
        return false
    }
};
momentLightbox.prototype.setupLightboxCarousel = function () {
    var self = this;
    if (self.lightboxSource != "my-moments" && rtr_prop.listOfCoverPhotoIds.length <= 1) {
        return
    }
    var elm = $(".relative-other-moments");
    var leftArrow = elm.find(".other-arrow-left");
    var rightArrow = elm.find(".other-arrow-right");
    var clip = elm.find(".other-moments");
    var strip = elm.find(".other-moments-slider");
    var rightFunc = function (e) {
        rightArrow.unbind("mousedown");
        self.loadAdditionalCarouselPhotos();
        self.calculateCarouselSliderWidthResizeAndDisplayArrows();
        if (strip.width() < clip.width()) {
            return
        }
        var currentLeft = parseInt(strip.css("left"), 10);
        var remainingStripLength = strip.width() + currentLeft;
        var left;
        if (remainingStripLength < (clip.width() * 2)) {
            left = parseInt(strip.css("left"), 10) - remainingStripLength + clip.width()
        } else {
            var leftDistanceToShift = 360;
            if (self.lightboxSource == "individual-lightbox") {
                leftDistanceToShift = 250
            }
            left = parseInt(strip.css("left"), 10) - leftDistanceToShift
        }
        strip.animate({
            left: left
        }, 300, "swing", function () {
            if (self.carouselLeftEndReached()) {
                $(".other-arrow-left").removeClass("s8-arrow-carousel-left").addClass("s8-arrow-carousel-left-inactive")
            } else {
                leftArrow.unbind("mousedown").bind("mousedown", leftFunc);
                $(".other-arrow-left").removeClass("s8-arrow-carousel-left-inactive").addClass("s8-arrow-carousel-left")
            }
            if (self.carouselRightEndReached()) {
                $(".other-arrow-right").removeClass("s8-arrow-carousel-right").addClass("s8-arrow-carousel-right-inactive")
            } else {
                rightArrow.unbind("mousedown").bind("mousedown", rightFunc)
            }
            self.logAnalyticsMomentsLightbox("click_other_moments_arrow_right", null)
        });
        e.preventDefault();
        e.stopPropagation();
        return false
    };
    var leftFunc = function (e) {
        leftArrow.unbind("mousedown");
        var left = parseInt(strip.css("left"), 10);
        left += 360;
        if (self.lightboxSource == "individual-lightbox") {
            left -= 110
        }
        if (left > -40) {
            left = 0
        }
        strip.animate({
            left: left
        }, 300, "swing", function () {
            if (self.carouselRightEndReached()) {
                $(".other-arrow-right").removeClass("s8-arrow-carousel-right").addClass("s8-arrow-carousel-right-inactive")
            } else {
                rightArrow.unbind("mousedown").bind("mousedown", rightFunc);
                $(".other-arrow-right").removeClass("s8-arrow-carousel-right-inactive").addClass("s8-arrow-carousel-right")
            }
            if (self.carouselLeftEndReached()) {
                $(".other-arrow-left").removeClass("s8-arrow-carousel-left").addClass("s8-arrow-carousel-left-inactive")
            } else {
                leftArrow.unbind("mousedown").bind("mousedown", leftFunc)
            }
            self.logAnalyticsMomentsLightbox("click_other_moments_arrow_left", null)
        });
        e.preventDefault();
        e.stopPropagation();
        return false
    };
    rightArrow.unbind("mousedown").bind("mousedown", rightFunc);
    leftArrow.unbind("mousedown").bind("mousedown", leftFunc);
    if (rtr_prop.lightboxData.coverIdPosition >= self.currentCarouselPhotoCount) {
        self.loadAdditionalCarouselPhotos(rtr_prop.lightboxData.coverIdPosition + 1)
    }
    self.calculateCarouselSliderWidthResizeAndDisplayArrows()
};
momentLightbox.prototype.carouselImagesLoadComplete = function (imageIndex, expectedNumberOfImages, callbackFunction) {
    var self = this;
    self.loadedCarouselImageCount++;
    if (self.loadedCarouselImageCount == expectedNumberOfImages || self.loadedCarouselImageCount == rtr_prop.listOfCoverPhotoIds.length) {
        window.setTimeout(function () {
            callbackFunction()
        }, 1)
    }
};
momentLightbox.prototype.calculateCarouselSliderWidthResizeAndDisplayArrows = function () {
    var self = this;
    self.loadedCarouselImageCount = 0;
    $(".other-moments-slider li").each(function (index) {
        var img = new Image();
        img.src = $(this).find(".other-moment").attr("src");
        $(img).load(function () {
            self.carouselImagesLoadComplete(index, self.currentCarouselPhotoCount, function () {
                var totalWidth = 0;
                $(".other-moments-slider li").each(function (index) {
                    totalWidth += $(this).width()
                });
                $(".other-moments-slider").css("width", totalWidth);
                if ($(".other-moments-slider").width() <= $(".other-moments").width()) {
                    $(".other-arrow-left").remove();
                    $(".other-arrow-right").remove()
                } else {
                    $(".other-arrow-left").show();
                    $(".other-arrow-right").show()
                }
                if (!self.navigateStyleByStyleOnMomentsGrid || self.lightboxSource != "moments-app") {
                    $(".moment-carousel-box").each(function (index) {
                        if (self.lightboxPhotoId == $(this).find(".other-moment-link").data("photoid")) {
                            var divWidth = $(this).width() - self.carouselImageBorderWidth * 2;
                            $(this).find(".carousel-image-border").css("width", divWidth).css("border", "4px solid #000").show()
                        }
                    })
                }
                self.shiftCarouselToCorrectPosition()
            })
        })
    })
};
momentLightbox.prototype.loadAdditionalCarouselPhotos = function (arbitraryCountToLoad, callbackFunction) {
    var self = this;
    var carouselItemStringArray = [];
    if (self.currentCarouselPhotoCount < rtr_prop.listOfCoverPhotoIds.length) {
        var i = self.currentCarouselPhotoCount;
        if (typeof (arbitraryCountToLoad) != "undefined" && self.currentCarouselPhotoCount < arbitraryCountToLoad) {
            self.currentCarouselPhotoCount = arbitraryCountToLoad + 20
        } else {
            if (!this.initialPopup || self.lightboxSource == "individual-lightbox") {
                self.currentCarouselPhotoCount += 20
            }
        }
        if (self.currentCarouselPhotoCount > rtr_prop.listOfCoverPhotoIds.length) {
            self.currentCarouselPhotoCount = rtr_prop.listOfCoverPhotoIds.length
        }
        while (i < self.currentCarouselPhotoCount) {
            var photoObj = rtr_prop.listOfCoverPhotoObjects[i];
            carouselItemStringArray.push('<li><div class="moment-carousel-box"><a class="other-moment-link"data-photoid="' + photoObj.photoId + '" href="/ourrunway/moment/' + encodeURIComponent(rtr_prop.lightboxData.item.designer.name.toLowerCase()) + "-" + encodeURIComponent(rtr_prop.lightboxData.item.displayName.toLowerCase()) + "--id-" + photoObj.photoId + '"><img class="other-moment"' + ((photoObj.hasCroppedPhoto) ? 'style="height: 120px !important"' : "") + '" src="' + rtr_prop.reviewsCdn + "/" + photoObj.photoId + ((photoObj.hasCroppedPhoto) ? "-cropped" : "") + '-thumb.jpg" /><div class="carousel-image-border"></div></a></div></li>');
            i += 1
        }
    }
    carouselOutput = carouselItemStringArray.join("");
    $(".other-moments-slider").append(carouselOutput)
};
momentLightbox.prototype.previousMomentClickHandler = function () {
    var self = this;
    self.htmlContainer.delegate(".moment-previous-arrow", "click", function () {
        self.displayPreviousMoment()
    })
};
momentLightbox.prototype.nextMomentClickHandler = function () {
    var self = this;
    self.htmlContainer.delegate(".moment-next-arrow", "click", function (data) {
        self.displayNextMoment()
    })
};
momentLightbox.prototype.analyticsEventHandler = function () {
    var self = this;
    self.htmlContainer.delegate(".tagged-thumb", "click", function () {
        var clickedStyleName = $(this).data("stylename");
        self.logAnalyticsMomentsLightbox("click_ghl", clickedStyleName)
    });
    self.htmlContainer.delegate(".thumb", "click", function () {
        if ($(this).data("photoid") != self.lightboxPhotoId) {
            self.logAnalyticsViewLightbox("click_other_photos", null)
        }
    });
    if (self.lightboxSource !== "moments-app" && self.lightboxSource !== "individual-lightbox" && self.lightboxSource !== "my-moments") {
        self.htmlContainer.delegate(".relative-product .favorite_add", "click", function () {
            self.logAnalyticsMomentsLightbox("heart_moment_true", null)
        });
        self.htmlContainer.delegate(".relative-product .favorite_remove", "click", function () {
            self.logAnalyticsMomentsLightbox("heart_moment_false", null)
        })
    }
};
momentLightbox.prototype.dualHeartToMomentsHandler = function () {
    var self = this;
    self.htmlContainer.delegate("#product-detail-top .favorite_add", "click", function () {
        pdp_glob.item.userRating = true
    });
    self.htmlContainer.delegate("#product-detail-top .favorite_remove", "click", function () {
        pdp_glob.item.userRating = false
    })
};
momentLightbox.prototype.dualHeartToPDPHandler = function () {
    var self = this;
    self.htmlContainer.delegate("relative-product .favorite_add", "click", function () {
        $("#product-detail-top .favorite_add").attr("class", "favorite_remove")
    });
    self.htmlContainer.delegate(".relative-product .favorite_remove", "click", function () {
        $("#product-detail-top .favorite_remove").attr("class", "favorite_add")
    })
};
momentLightbox.prototype.productInfoEventHandler = function () {
    var self = this;
    self.currentProductProperties = {};
    self.currentProductProperties.isReady = false;
    self.currentProductProperties.position = "up";
    self.htmlContainer.delegate(".tagged-thumb", "click", function () {
        $(".lb-multiple-photos").remove();
        self.currentProductProperties.designer = $(this).data("designer");
        self.currentProductProperties.rentalPrice = $(this).data("rentalfee");
        self.currentProductProperties.link = $(this).data("link");
        self.currentProductProperties.isReady = true;
        $(".lightbox-moment-product-info .info-designer span").text(self.currentProductProperties.designer);
        var priceText;
        if ($(this).data("item-type") == "SaleableProduct" || $(this).data("clearance")) {
            priceText = "Buy for $" + self.currentProductProperties.rentalPrice.toFixed(2)
        } else {
            priceText = "Rent for $" + self.currentProductProperties.rentalPrice.toFixed(2)
        }
        $(".lightbox-moment-product-info .info-rental-price span").text(priceText);
        $(".lightbox-moment-product-info").fadeIn("fast");
        self.productThumbnailShopThisStyleClickHandler(self.currentProductProperties.link)
    });
    self.htmlContainer.delegate(".moment-lightbox .photos", "hover", function (e) {
        if (e.type == "mouseenter") {
            $(".lb-multiple-photos").fadeOut("fast");
            if (self.currentProductProperties.isReady) {
                if (self.currentProductProperties.position == "down") {
                    $(this).find(".lightbox-moment-product-info").animate({
                        bottom: 100
                    }, 100, "linear", function () {
                        self.currentProductProperties.position = "up"
                    })
                } else {
                    $(this).find(".lightbox-moment-product-info").fadeIn("fast")
                }
            }
        } else {
            $(".lb-multiple-photos").fadeIn("fast");
            if (self.currentProductProperties.isReady) {
                $(this).find(".lightbox-moment-product-info").animate({
                    bottom: 0
                }, 300, "linear", function () {
                    self.currentProductProperties.position = "down"
                })
            }
        }
    });
    self.htmlContainer.delegate(".thumb", "click", function () {
        self.currentProductProperties.isReady = false;
        $(".lightbox-moment-product-info").fadeOut("fast")
    })
};
$(document).ready(function () {
    var moment_id = $.url().param("moment_id");
    var moments = $(".new-moments-popup");
    if (moment_id && moments.size()) {
        for (var i = 0; i < moments.size(); i++) {
            if ($(moments[i]).attr("data-photoid") == moment_id) {
                $(moments[i]).click();
                return
            }
        }
    }
});

function fnAddPopulatedClass() {
    var $select = $(this);
    $select.closest(".pretty-select, .pretty-input").toggleClass("populated", !! $select.val())
}
function beautifySelects() {
    var $selects = $(".pretty-select");
    $selects.find("select").coreUISelect().each(function (inx, obj) {
        fnAddPopulatedClass.call(obj)
    }).change(function () {
            var $this = $(this),
                text = $this.find("option[value='" + $this.val() + "']").text() || "";
            $this.siblings(".b-core-ui-select").find(".b-core-ui-select__value").text(text);
            fnAddPopulatedClass.call(this)
        });
    $selects.find(".b-core-ui-select").prepend(function (index, html) {
        var $this = $(this),
            label = $this.siblings("select:first").data("label"),
            $select;
        if (label) {
            return '<span class="b-core-ui-select__label">' + label + ": </span>"
        } else {
            if (!($select = $this.siblings("select")).val() && !$select.find(":selected").text()) {
                return '<span class="b-core-ui-select__label">&nbsp;</span>'
            }
        }
        return ""
    });
    $selects.find(".b-core-ui-select__button").addClass("s8-arr-8-down-grey")
}
$(function () {
    beautifySelects()
});

function BaseClient() {
    if (!(this instanceof BaseClient)) {
        return new BaseClient()
    }
}
BaseClient.prototype.get = function (url, params, callback, dataType, timeout) {
    return this._request({
        type: "GET",
        url: url,
        callback: callback,
        params: params,
        dataType: dataType,
        timeout: timeout
    })
};
BaseClient.prototype.post = function (url, params, callback, dataType, timeout) {
    return this._request({
        type: "POST",
        url: url,
        callback: callback,
        params: params,
        dataType: dataType,
        timeout: timeout
    })
};
BaseClient.prototype.del = function (url, params, callback, dataType, timeout) {
    return this._request({
        type: "DELETE",
        url: url,
        callback: callback,
        params: params,
        dataType: dataType,
        timeout: timeout
    })
};
BaseClient.prototype._respond = function (success, data, callback) {
    if (callback && typeof (callback) === "function") {
        callback(success, data)
    }
};
BaseClient.prototype._request = function (request) {
    var self = this;
    if (!request || !request.url) {
        var response = {
            error: "BaseClient Error: Bad Request",
            request: request
        };
        self._respond(false, response, callback);
        return
    }
    return $.ajax({
        url: request.url,
        type: request.type || "GET",
        data: request.params || {},
        dataType: request.dataType || "json",
        timeout: request.timeout || 30000,
        success: function (data) {
            self._respond(true, data, request.callback)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errMessage = requestErrorMessage(request, xhr);
            if (window.Airbrake && airbrakeWorthyStatusCode(xhr.status) && errMessage) {
                window.Airbrake.notify(errMessage, "BaseClient.js", 73)
            }
            self._respond(false, xhr, request.callback)
        }
    })
};

function requestErrorMessage(request, response) {
    if (typeof (request) !== "object" || typeof (response) !== "object") {
        return null
    }
    var type = request.type || "GET";
    var params = request.params || {};
    var err = ["BC: HTTP status[", response.status, "] on: ", type, " '", request.url, "' with params: ", JSON.stringify(params), " -- Received response: ", JSON.stringify(response.responseText)].join("");
    return err
}
function airbrakeWorthyStatusCode(status) {
    if (!status) {
        return false
    }
    var s = parseInt(status, 10);
    if (!s || s === 200 || s === 204 || (s > 400 && s < 500)) {
        return false
    }
    return true
}
function CMSClient(baseUrl) {
    if (!(this instanceof CMSClient)) {
        return new CMSClient(baseUrl)
    }
    this.baseUrl = (typeof (baseUrl) === "string") ? baseUrl + "/CMS" : "error"
}
CMSClient.prototype = new BaseClient();
CMSClient.prototype.getContent = function (path, callback) {
    if (!path) {
        path = location.pathname + location.search
    }
    return this.get(this.baseUrl + "/content", {
        path: path
    }, callback)
};

function AvailabilityFilter(data) {
    this.availableFrom = null;
    this.sizes = null;
    this._init(data)
}
AvailabilityFilter.prototype._init = function (data) {
    if (!data) {
        return
    }
    if (data.availableFrom) {
        this.deliveryDate = data.availableFrom[0]
    }
    this.sizes = data.sizes
};

function Shortlist(data) {
    var shortlist = data || {};
    this.id = shortlist.id;
    this.userId = shortlist.userId;
    this.name = shortlist.name;
    this.styleNames = shortlist.styleNames || [];
    this.rejectedStyleNames = shortlist.rejectedStyleNames || [];
    this.created = shortlist.created;
    this.modified = shortlist.modified;
    this.eventDate = shortlist.eventDate;
    this.eventId = shortlist.eventId;
    this.productFilters = shortlist.productFilters;
    this.availabilityFilters = new AvailabilityFilter(shortlist.availabilityFilters);
    this.ownershipToken = shortlist.ownershipToken
}
Shortlist.prototype.hasStyle = function (styleName) {
    return this.styleNames && UtilityMethods.inArray(this.styleNames, styleName)
};
var Collection = Shortlist;
var __callIfFunction = __callIfFunction ||
    function () {
        var fn = Array.prototype.shift.apply(arguments);
        return !!fn && fn.constructor == Function && fn.apply(this, arguments)
    };
ShortlistCache = function (shortlists) {
    this.cacheKey = "meta";
    SessionStorage.call(this, "shortlists");
    this.userShortlists = null;
    this.shortlists = {};
    this._load();
    if (arguments.length && shortlists) {
        this.init(shortlists)
    }
};
ShortlistCache.prototype = new SessionStorage();
ShortlistCache.prototype.constructor = ShortlistCache;
ShortlistCache.prototype._load = function () {
    var cached = this.get(this.cacheKey);
    if (!cached) {
        return
    }
    this.userShortlists = cached.userShortlists;
    for (var i in cached.shortlists) {
        if (cached.shortlists.hasOwnProperty(i)) {
            this.saveShortlist(new Shortlist(cached.shortlists[i]))
        }
    }
};
ShortlistCache.prototype._save = function () {
    this.set(this.cacheKey, {
        userShortlists: this.userShortlists,
        shortlists: this.shortlists
    })
};
ShortlistCache.prototype.init = function (shortlists) {
    if (shortlists && shortlists.length) {
        this.userShortlists = [];
        for (var i = 0, ct = shortlists.length; i < ct; i++) {
            var s = new Shortlist(shortlists[i]);
            this.userShortlists.push(s.id);
            this.shortlists[s.id] = s
        }
    }
    this._save()
};
ShortlistCache.prototype.getShortlists = function () {
    if (!this.userShortlists) {
        return null
    }
    var _shortlists = [];
    for (var i = 0, ct = this.userShortlists.length; i < ct; i++) {
        _shortlists.push(this.getShortlist(this.userShortlists[i]))
    }
    return _shortlists
};
ShortlistCache.prototype.getShortlist = function (id) {
    return this.shortlists[id]
};
ShortlistCache.prototype.addToShortlists = function (shortlist) {
    this.saveShortlist(shortlist);
    if (!this.userShortlists) {
        this.userShortlists = []
    }
    UtilityMethods.removeFromArray(this.userShortlists, shortlist.id);
    this.userShortlists.unshift(shortlist.id);
    this._save()
};
ShortlistCache.prototype.saveShortlist = function (shortlist) {
    this.shortlists[shortlist.id] = shortlist;
    if (this.userShortlists) {
        if (UtilityMethods.removeFromArray(this.userShortlists, shortlist.id)) {
            this.userShortlists.unshift(shortlist.id)
        }
    }
    this._save()
};
ShortlistCache.prototype.deleteShortlist = function (id) {
    delete this.shortlists[id];
    if (this.userShortlists) {
        UtilityMethods.removeFromArray(this.userShortlists, id)
    }
    this._save()
};

function CollectionClient(baseUrl) {
    if (!(this instanceof CollectionClient)) {
        return new CollectionClient(baseUrl)
    }
    this.baseUrl = baseUrl + "/shortlist";
    this.persistence = new ShortlistCache()
}
CollectionClient.prototype = new BaseClient();
CollectionClient.prototype.getShortlists = function (callback, cacheless) {
    var _client = this,
        url = this.baseUrl;
    var shortlists = this.persistence.getShortlists();
    if (!shortlists || cacheless === true) {
        return this.get(url, null, function (success, data) {
            var shortlists = [];
            if (success) {
                for (var i = 0, ct = data.length; i < ct; i++) {
                    var s = new Shortlist(data[i]);
                    shortlists.push(s)
                }
                _client.persistence.init(shortlists)
            }
            __callIfFunction.call(_client, callback, success, shortlists)
        })
    } else {
        __callIfFunction.call(_client, callback, true, shortlists)
    }
    return null
};
CollectionClient.prototype.getUserShortlists = function (userId, callback) {
    var _client = this,
        url = this.baseUrl + "/user/" + userId;
    return this.get(url, form, function (success, data) {
        var shortlists = [];
        if (success) {
            for (var i = 0, ct = data.length; i < ct; i++) {
                var s = new Shortlist(data[i]);
                _client.persistence.saveShortlist(s);
                shortlists.push(s)
            }
        }
        __callIfFunction.call(_client, callback, success, shortlists)
    })
};
CollectionClient.prototype.getShortlist = function (id, callback, cacheless) {
    var _client = this,
        url = this.baseUrl + "/" + id;
    var shortlist = this.persistence.getShortlist(id);
    if (!shortlist || cacheless === true) {
        return this.get(url, null, function (success, data) {
            var shortlist = data ? new Shortlist(data) : null;
            if (success) {
                _client.persistence.saveShortlist(shortlist)
            }
            __callIfFunction.call(_client, callback, success, shortlist)
        })
    } else {
        __callIfFunction.call(_client, callback, true, shortlist)
    }
    return null
};
CollectionClient.prototype.createShortlist = function (form, callback) {
    var _client = this,
        url = this.baseUrl + "/new";
    return this.post(url, form, function (success, data) {
        var shortlist = data ? new Shortlist(data) : null;
        if (success) {
            _client.persistence.addToShortlists(shortlist)
        }
        __callIfFunction.call(_client, callback, success, shortlist)
    })
};
CollectionClient.prototype.updateShortlist = function (id, form, callback) {
    var _client = this,
        url = this.baseUrl + "/" + id;
    return this.post(url, form, function (success, data) {
        var shortlist = data ? new Shortlist(data) : null;
        if (success) {
            _client.persistence.saveShortlist(shortlist)
        }
        __callIfFunction.call(_client, callback, success, shortlist)
    })
};
CollectionClient.prototype.deleteShortlist = function (id, form, callback) {
    var _client = this,
        url = this.baseUrl + "/" + id + "/delete";
    return this.post(url, form, function (success, data) {
        if (success) {
            _client.persistence.deleteShortlist(id)
        }
        __callIfFunction.call(_client, callback, success, data)
    })
};
CollectionClient.prototype.addToShortlist = function (id, form, callback) {
    var _client = this,
        url = this.baseUrl + "/" + id + "/add";
    return this.post(url, form, function (success, data) {
        if (success) {
            var shortlist = _client.persistence.getShortlist(id);
            for (var i = 0, ct = form.styleNames.length; i < ct; i++) {
                shortlist.styleNames.push(form.styleNames[i])
            }
            _client.persistence.saveShortlist(shortlist)
        }
        __callIfFunction.call(_client, callback, success, data)
    })
};
CollectionClient.prototype.removeFromShortlist = function (id, form, callback) {
    var _client = this,
        url = this.baseUrl + "/" + id + "/remove";
    return this.post(url, form, function (success, data) {
        if (success) {
            var shortlist = _client.persistence.getShortlist(id);
            for (var i = 0, ct = form.styleNames.length; i < ct; i++) {
                UtilityMethods.removeFromArray(shortlist.styleNames, form.styleNames[i])
            }
            _client.persistence.saveShortlist(shortlist)
        }
        __callIfFunction.call(_client, callback, success, data)
    })
};
CollectionClient.prototype.removeFromAllShortlists = function (styleName) {
    var shortlists = this.persistence.getShortlists();
    var shortlist, id;
    var _len = shortlists.length;
    for (var i = 0; i < _len; i++) {
        shortlist = shortlists[i];
        UtilityMethods.removeFromArray(shortlist.styleNames, styleName)
    }
};
var ShortlistClient = new CollectionClient(rtr_prop.appPath);
$(function () {
    if (!RTR.CMS) {
        RTR.CMS = new CMSClient(rtr_prop.appPath)
    }
    RTR.CMS.getContent(null, function (status, data) {
        var emergencyBanner = data["emergency-banner"];
        if (emergencyBanner) {
            $("#emergency-banner").append(emergencyBanner);
            $("#emergency-banner").find("img").css("margin-left", "auto");
            $("#emergency-banner").find("img").css("margin-right", "auto");
            $("#emergency-banner").find("img").css("display", "block");
            $("#emergency-banner").css("text-align", "center")
        }
    })
});

function ShowroomClient(baseUrl) {
    if (!(this instanceof ShowroomClient)) {
        return new ShowroomClient(baseUrl)
    }
    this.baseUrl = (typeof (baseUrl) === "string") ? baseUrl + "/appointments" : "error"
}
ShowroomClient.prototype = new BaseClient();
ShowroomClient.prototype.submitWishlist = function (appointmentId, callback) {
    if (!appointmentId) {
        return
    }
    return this.post(this.baseUrl + "/wishlist/submit", {
        appointmentId: appointmentId
    }, callback)
};
ShowroomClient.prototype.removeFromWishList = function (appointmentId, requestId, callback) {
    if (!requestId || requestId.length == 0) {
        return
    }
    return this.post(this.baseUrl + "/wishlist/deleteSku", {
        requestId: requestId,
        appointmentId: appointmentId
    }, callback)
};
ShowroomClient.prototype.addToWishlist = function (appointmentId, sku, callback) {
    return this.post(this.baseUrl + "/wishlist/add", {
        sku: sku,
        appointmentId: appointmentId
    }, callback)
};
ShowroomClient.prototype.getAppointment = function (appointmentId, callback) {
    return this.get(this.baseUrl + "/appointment", {
        appointmentId: appointmentId
    }, callback)
};
ShowroomClient.prototype.sendVirtualAppointmentFeedback = function (appointmentId, sku, liked, notes, callback) {
    return this.post(this.baseUrl + "/virtual_closet", {
        appointmentId: appointmentId,
        sku: sku,
        liked: liked,
        notes: notes
    }, callback)
};
var wishlist_items_limit = 6;
$(document).ready(function () {
    if (rtr_prop.appPath == "/home" || rtr_prop.appPath == "/pdp" || rtr_prop.appPath == "/grid" || rtr_prop.appPath == "/ourrunway") {
        render_showroom_wishlist()
    }
});

function render_showroom_wishlist() {
    if (!RTR.Showroom) {
        RTR.Showroom = new ShowroomClient(rtr_prop.appPath);
        RTR.Showroom.wishlist_items_limit = 6
    }
    defineWishlistHideButton();
    var profile = RTR.UX.getProfile();
    var appointmentId = 0;
    if (RTR.UX && RTR.UX.user && RTR.UX.user.appointmentId) {
        appointmentId = RTR.UX.user.appointmentId
    }
    if (appointmentId) {
        RTR.Showroom.getAppointment(appointmentId, function (status, appointment) {
            if (status && appointment) {
                if (appointment.requestsComplete) {} else {
                    $("#wishlist-container").addClass("visible");
                    defineWishlistSubmitButton(appointment, appointmentId);
                    defineRemoveDressFromWishlist(appointmentId);
                    actOnAppointment(appointment)
                }
            }
        })
    }
}
function actOnAppointment(appointment) {
    parseDateAndDatestring(appointment);
    var wishlistDisplayStatus = lsValueForKey("wishlist-display-status");
    if (!appointment.styleAssessment) {
        showroomLog({
            action: "view_assessment_call_to_action"
        });
        var template = _.template($("#wishlist-no-assessment-template").html());
        $("#wishlist-container").html(template({
            date: RTR.Showroom.date
        }));
        if (wishlistDisplayStatus == null || wishlistDisplayStatus == "show") {
            displayWishlist(true)
        }
    } else {
        if (appointment.styleAssessment && appointment.requestsComplete) {
            displayWishlist(false)
        } else {
            if (appointment.requests != null) {
                showroomLog({
                    action: "view",
                    items: appointment.requests
                });
                defineWishlistAddSkuButton(appointment.id);
                if (appointment.requests.length == 0) {
                    var template = _.template($("#wishlist-empty-template").html());
                    $("#wishlist-container").html(template({
                        date: RTR.Showroom.date
                    }));
                    if (wishlistDisplayStatus == null || wishlistDisplayStatus == "show") {
                        displayWishlist(true)
                    }
                    displayAddToWishlistButton(true)
                } else {
                    if (appointment.requests_expanded != null) {
                        var clones = 0;
                        for (var i = 0; i < appointment.requests.length; i++) {
                            for (var j = clones; j < appointment.requests_expanded.length; j++) {
                                var sku = appointment.requests[i];
                                var styleName = sku.split("_")[0];
                                if (styleName == appointment.requests_expanded[j].styleName) {
                                    appointment.requests_expanded[j].sku = sku;
                                    clones = j + 1;
                                    break
                                }
                            }
                        }
                        appointment.requests_expanded.splice(6);
                        var wishlist_template = _.template($("#wishlist-template").html());
                        $("#wishlist-container").html(wishlist_template({
                            date: RTR.Showroom.date,
                            items: appointment.requests_expanded,
                            datestring: RTR.Showroom.datestring
                        }));
                        prettifyWishlistDropdowns();
                        if (wishlistDisplayStatus == null || wishlistDisplayStatus == "show") {
                            displayWishlist(true)
                        }
                        defineRequestSizeChange();
                        if (appointment.requests.length < wishlist_items_limit) {
                            displayAddToWishlistButton(true)
                        }
                    }
                }
            }
        }
    }
}
function prettifyWishlistDropdowns() {
    $(".wishlist-item-sizes-wrapper").coreUISelect()
}
function parseDateAndDatestring(appointment) {
    var datestring = "";
    var date = "";
    if (appointment.timeStart) {
        var apptDate = new Date(appointment.timeStart);
        date = (apptDate.getUTCMonth() + 1) + "/" + apptDate.getUTCDate() + "/" + apptDate.getFullYear();
        datestring = getDateString(apptDate)
    }
    RTR.Showroom.date = date;
    RTR.Showroom.datestring = datestring
}
function defineRequestSizeChange() {
    var wishlist_item_sizes = $(".wishlist-item-sizes");
    for (var i = 0; i < wishlist_item_sizes.length; i++) {
        setupRequestSizeChangeListener($(wishlist_item_sizes[i]))
    }
}
function setupRequestSizeChangeListener($wishlist_item_size) {
    var parent = $wishlist_item_size.parent();
    $(parent).change(function (e) {
        var $wishlist_item = $($(this).closest(".wishlist-item"));
        var skuOld = $wishlist_item.attr("sku");
        var sizeNew = $wishlist_item_size.val();
        var skuNew = skuOld.split("_")[0] + "_" + sizeNew;
        $wishlist_item.attr("sku", skuNew);
        $wishlist_item.attr("requestid", skuNew);
        RTR.Showroom.removeFromWishList(RTR.UX.user.appointmentId, skuOld, function (status, data) {});
        RTR.Showroom.addToWishlist(RTR.UX.user.appointmentId, skuNew, function (status, data) {});
        showroomLog({
            action: "modify",
            skuOld: skuOld,
            skuNew: skuNew
        })
    })
}
function getDateString(date) {
    var hours = date.getHours() % 12;
    var minutes = date.getMinutes();
    if (minutes == undefined) {
        minutes = 0
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var am = (hours == date.getHours() ? "am" : "pm");
    var dayOfMonth = date.getDate();
    var month = convertNumericToMonth(date.getMonth());
    var day = convertNumericToDay(date.getDay());
    if (am == "pm" && hours == 0) {
        hours = 12
    }
    return day + ", " + month + " " + dayOfMonth + " (" + hours + ":" + minutes + " " + am + ")"
}
function convertNumericToDay(num) {
    switch (num) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
        default:
            return ""
    }
}
function convertNumericToMonth(num) {
    switch (num) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return ""
    }
}
function displayAddToWishlistButton(isShown) {
    if (isShown) {
        $("#wishlist-add-sku-button-wrapper").addClass("show")
    } else {
        $("#wishlist-add-sku-button-wrapper").removeClass("show")
    }
}
function displayWishlist(isShown) {
    if (isShown) {
        $("#wishlist-container").removeClass("hide");
        $("#wishlist-container").addClass("show");
        $("#footer").addClass("makeRoom")
    } else {
        $("#wishlist-container").addClass("hide");
        $("#wishlist-container").removeClass("show");
        $("#footer").removeClass("makeRoom")
    }
}
function defineWishlistHideButton() {
    $(document).delegate("#wishlist-hide-button", "click", function () {
        if ($("#wishlist-container").hasClass("hide")) {
            displayWishlist(true);
            lsSetKeyValue("wishlist-display-status", "show")
        } else {
            displayWishlist(false);
            lsSetKeyValue("wishlist-display-status", "hide")
        }
    })
}
function defineWishlistAddSkuButton(appointmentId) {
    $(document).delegate("#wishlist-add-sku-button", "click", function (e) {
        e.preventDefault();
        var styleName = pdp_glob.item.styleName;
        var size = $("#product-sizemain").val();
        if (size == null || size.length == 0) {
            alert("Choose a size");
            return
        }
        var sku = styleName + "_" + size;
        if ($("#wishlist").find("#wishlist-items-wrapper").length == 0) {
            var item = pdp_glob.item;
            item.sku = sku;
            var items = [item];
            var wishlist_template = _.template($("#wishlist-template").html());
            var $wishlist_container = $("#wishlist-container");
            wishlist_fade($wishlist_container, true);
            RTR.Showroom.addToWishlist(appointmentId, sku, function (status, data) {
                showroomLog({
                    action: "add_item",
                    sku: sku,
                    style_name: styleName
                })
            });
            setTimeout(function () {
                $wishlist_container.html(wishlist_template({
                    date: RTR.Showroom.date,
                    items: items,
                    datestring: RTR.Showroom.datestring
                }));
                wishlist_fade($wishlist_container, false);
                var wishlist_item_sizes = $wishlist_container.find(".wishlist-item-sizes")[0];
                setupRequestSizeChangeListener($(wishlist_item_sizes));
                prettifyWishlistDropdowns();
                displayWishlist(true);
                lsSetKeyValue("wishlist-display-status", "show")
            }, 1000);
            return
        } else {
            addToWishlist(sku);
            displayWishlist(true);
            lsSetKeyValue("wishlist-display-status", "show")
        }
    })
}
function wishlist_fade($obj, fade) {
    if (fade) {
        $obj.addClass("fade")
    } else {
        $obj.removeClass("fade")
    }
}
function addToWishlist(sku) {
    var currentRequests = $(".wishlist-item");
    for (var i = 0; i < currentRequests.length; i++) {
        if (sku == $(currentRequests[i]).attr("requestid")) {
            return
        }
    }
    RTR.Showroom.addToWishlist(RTR.UX.user.appointmentId, sku, function (status, data) {
        if (status) {
            var empty_slot = $(".wishlist-no-item")[0];
            pdp_glob.item.sku = sku;
            var wishlist_item_template = _.template($("#wishlist-item-template").html());
            var $empty_slot = $(empty_slot);
            $empty_slot.removeClass("wishlist-no-item");
            $empty_slot.addClass("wishlist-item");
            $empty_slot.attr("href", pdp_glob.item.legacyRelativeProductURL);
            $empty_slot.attr("sku", sku);
            $empty_slot.attr("requestid", sku);
            $empty_slot.html(wishlist_item_template({
                item: pdp_glob.item
            }));
            var wishlist_item_sizes = $empty_slot.find(".wishlist-item-sizes")[0];
            setupRequestSizeChangeListener($(wishlist_item_sizes));
            if ($(".wishlist-item").length >= wishlist_items_limit) {
                displayAddToWishlistButton(false)
            }
            prettifyWishlistDropdowns();
            showroomLog({
                action: "add_item",
                sku: sku,
                style_name: sku.split("_")[0]
            })
        }
    })
}
function defineWishlistSubmitButton(appointment, appointmentId) {
    $(document).delegate("#wishlist-submit-button", "click", function () {
        RTR.Showroom.submitWishlist(appointmentId, function (status, data) {
            var $wishlist_container = $("#wishlist-container");
            var template = _.template($("#wishlist-submit-template").html());
            $wishlist_container.html(template({
                date: RTR.Showroom.date
            }));
            displayAddToWishlistButton(false);
            showroomLog({
                action: "share",
                recipient: "showroom",
                items: appointment.requests
            });
            setTimeout(function () {
                wishlist_fade($wishlist_container, true);
                setTimeout(function () {
                    $wishlist_container.remove()
                }, 1000)
            }, 5000)
        })
    })
}
function defineRemoveDressFromWishlist(appointmentId) {
    $(document).delegate(".wishlist-item-remove", "click", function (e) {
        e.preventDefault();
        var $wishlist_item = $(e.target).closest(".wishlist-item");
        removeDressFromWishlist($wishlist_item)
    })
}
function removeDressFromWishlist($wishlist_item) {
    var requestId = $wishlist_item.attr("requestid");
    RTR.Showroom.removeFromWishList(RTR.UX.user.appointmentId, requestId, function (status, data) {
        $wishlist_item.removeClass("wishlist-item");
        $wishlist_item.addClass("wishlist-no-item");
        var wishlist_no_item_template = _.template($("#wishlist-no-item-template").html());
        $wishlist_item.html(wishlist_no_item_template({}));
        displayAddToWishlistButton(true);
        showroomLog({
            action: "remove_item",
            sku: requestId,
            style_name: requestId.split("_")[0]
        })
    })
}
function showroomLog(options) {
    options.sub_type1 = "showroom";
    options.appointmentID = RTR.UX.user.appointmentId;
    R.log("shortlist", options)
}
function MembershipClient(baseUrl) {
    if (!(this instanceof MembershipClient)) {
        return new MembershipClient(baseUrl)
    }
    this.baseUrl = (typeof (baseUrl) === "string") ? baseUrl + "/membership" : "error"
}
MembershipClient.prototype = new BaseClient();
MembershipClient.prototype.isProMember = function (userId, callback) {
    if (!userId) {
        return
    }
    return this.get(this.baseUrl + "/" + userId + "/is_pro_member", null, callback)
};
MembershipClient.prototype.getMembership = function (userId, callback) {
    if (!userId) {
        return
    }
    return this.get(this.baseUrl + "/" + userId, null, callback)
};
$(document).ready(function () {
    if (false) {
        return
    }
    if (!RTR.Membership && typeof (MembershipClient) === "function") {
        RTR.Membership = new MembershipClient(rtr_prop.appPath);
        prepareLogEvents();
        prepareCommonQuestionsEvent();
        if (rtr_prop.uid) {
            RTR.Membership.getMembership(rtr_prop.uid, function (status, response) {
                RTR.UX.membership = response ? response : null;
                RTR.UX.isProMember = response.memberId ? true : false;
                $(document).trigger("membershipStatusReady");
                if (RTR.UX.isProMember) {
                    show_pro_member_promotions()
                } else {
                    show_non_pro_member_promotions()
                }
            })
        } else {
            RTR.UX.isProMember = false;
            RTR.UX.membership = null;
            show_non_pro_member_promotions();
            $(document).trigger("membershipStatusReady")
        }
    }
    function prepareLogEvents() {
        var lightBoxSource = "";
        $(".pro-info-init").on("mfpOpen", function () {
            R.log("lightbox", {
                type: "pro",
                action: "open",
                sub_type1: "pro",
                url: window.location.href
            })
        });
        $(".pro-info-init").on("mfpClose", function () {
            R.log("lightbox", {
                type: "pro",
                action: "close",
                sub_type1: "pro",
                url: window.location.href
            })
        });
        if ($(".rtr-pro-landing").length && RTR.Page.appPath === "/pages") {
            R.log("node", {
                action: "view",
                object_id: 14778,
                prod_type: "saleable",
                num_reviews: 0,
                price: 29.95,
                retail_price: 29.95,
                psize: "One Size",
                bsize: null,
                rentbegindate: null,
                styleName: "XX8"
            })
        }
        logProLandingInfer()
    }
    function show_pro_member_promotions() {
        show_pro_logo();
        if (rtr_prop.appPath == "/user") {
            if (RTR.UX.isProMember && RTR.UX.membership) {
                var startDate = new Date(RTR.UX.membership.startDate);
                var formattedDate = (startDate.getMonth() + 1).toString() + "/" + startDate.getDate().toString() + "/" + startDate.getFullYear().toString();
                $("#pro-top-promotional").html($("#pro-top-promotional").html().replace("[DATE]", formattedDate))
            }
        }
        $("body").addClass("pro-member")
    }
    function show_pro_logo() {
        $("#nv-logo").removeClass("s32-rent-the-runway-logo").addClass("s32-rent-the-runway-logo-pro")
    }
    function show_non_pro_member_promotions() {
        init_tooltip();
        if (rtr_prop.appPath == "/pdp" || rtr_prop.appPath == "/order") {
            prepareProModal();
            prepareAddToCartEvent()
        } else {
            if (rtr_prop.appPath == "/pages") {
                prepareAddToCartEvent()
            }
        }
        $("body").addClass("non-pro-member")
    }
    function prepareCommonQuestionsEvent() {
        if (window.location.hash == "#questions") {
            $(".common-questions ul").show()
        }
        $("#common-questions-header").on("click", function () {
            if (!$(".common-questions ul").is(":visible")) {
                $(".common-questions ul").slideDown()
            } else {
                $(".common-questions ul").slideUp()
            }
        })
    }
    function init_tooltip() {
        if (rtr_prop.appPath == "/order") {
            $("body").tooltip({
                tooltipClass: "checkout-tooltip",
                content: $(".tooltip-content").html(),
            })
        }
    }
    function prepareProModal() {
        $(".pro-info-init").magnificPopup({
            items: {
                src: "#rtr-pro-modal",
                type: "inline"
            },
            closeOnBgClick: true,
            enableEscapeKey: true,
            showCloseBtn: true,
            callbacks: {
                open: function () {
                    $("#rtr-pro-modal").show()
                },
                close: function () {
                    this.close()
                }
            }
        })
    }
    function prepareAddToCartEvent() {
        $(document).delegate(".add-pro-to-cart", "mouseup", function (e) {
            if (!rtr_prop.uid) {
                if (typeof ($.magnificPopup) === "object") {
                    $.magnificPopup.close()
                }
                displayLightReg(function () {
                    $(document).bind("userDataReady", function () {
                        if (rtr_prop.uid) {
                            pro_hold(function () {
                                afterAddToCartAction();
                                return false
                            }, null, null)
                        }
                    })
                }, "pdp-addtobag", "Sign in to get the full experience");
                return
            }
            pro_hold(function () {
                afterAddToCartAction();
                return false
            }, null, null)
        })
    }
    function afterAddToCartAction() {
        if (isMobileUserAgent()) {
            window.location.href = "/shoppingbag"
        } else {
            $("html, body").animate({
                scrollTop: 0
            }, "fast");
            if (rtr_prop.appPath == "/pdp" || rtr_prop.appPath == "/order") {
                $.magnificPopup.close()
            }
            logAddToCartEvent();
            rtr_view_cart()
        }
        return false
    }
    function isMobileUserAgent() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|HTC|Windows Mobile|Opera Mobi|Ipod|GooglebotMobile|MSN Mobile Proxy)/)
    }
    function logAddToCartEvent() {
        var opts = getProductInfoForLogging("rezo_add_to_cart");
        var date = new Date();
        var expiration = date.getTime() + 5 * 60 * 1000;
        opts.seq = date.getTime();
        opts.tabId = R.jsSession("tabId");
        opts.pageId = R._state.pageId;
        $.cookie("rezo_add_to_cart", JSON.stringify(opts), {
            path: "/",
            expires: expiration
        });
        opts.action = "click_add_to_cart";
        R.log("node", opts)
    }
    function logProLandingInfer() {
        $(".pro-tooltip .learn-more").on("click", function () {
            R.log("node", {
                type: "pro",
                action: "infer",
                url: window.location.pathname,
                style_name: "XX8",
                context: RTR.Page.appPath == "/pdp" ? "pdp" : "top_banner"
            })
        })
    }
    function getProductInfoForLogging(action) {
        var options = {};
        if (!action) {
            return
        }
        options.action = action;
        options.zip = $("#product-zipcode").val();
        options.styleName = "XX8";
        options.object_id = 14778;
        if ($("#inp-rentalstart").val()) {
            options.rentbegin = $("#inp-rentalstart").val()
        }
        return options
    }
    function pro_hold(successCallback, failureCallback, completeCallback) {
        $.ajax({
            url: "/pdp/pro_hold",
            type: "POST",
            dataType: "json",
            success: function (data) {
                if (typeof (successCallback) == "function") {
                    successCallback.call()
                }
            },
            error: function (jq, status, err) {
                if (typeof (failureCallback) == "function") {
                    failureCallback.call()
                }
            },
            complete: function () {
                if (typeof (completeCallback) == "function") {
                    completeCallback.call()
                }
            }
        })
    }
});