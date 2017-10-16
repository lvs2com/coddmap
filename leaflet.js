!function(q, h, n) {
    function e() {
        var a = q.L;
        b.noConflict = function() {
            return q.L = a,
            this
        }
        ;
        q.L = b
    }
    var b = {
        version: "1.0.1+ffcfcc1"
    };
    "object" == typeof module && "object" == typeof module.exports ? module.exports = b : "function" == typeof define && define.amd && define(b);
    "undefined" != typeof q && e();
    b.Util = {
        extend: function(a) {
            var c, b, f, k;
            b = 1;
            for (f = arguments.length; b < f; b++)
                for (c in k = arguments[b],
                k)
                    a[c] = k[c];
            return a
        },
        create: Object.create || function() {
            function a() {}
            return function(c) {
                return a.prototype = c,
                new a
            }
        }(),
        bind: function(a, c) {
            var b = Array.prototype.slice;
            if (a.bind)
                return a.bind.apply(a, b.call(arguments, 1));
            var f = b.call(arguments, 2);
            return function() {
                return a.apply(c, f.length ? f.concat(b.call(arguments)) : arguments)
            }
        },
        stamp: function(a) {
            return a._leaflet_id = a._leaflet_id || ++b.Util.lastId,
            a._leaflet_id
        },
        lastId: 0,
        throttle: function(a, c, b) {
            var d, k, e, g;
            return g = function() {
                d = !1;
                k && (e.apply(b, k),
                k = !1)
            }
            ,
            e = function() {
                d ? k = arguments : (a.apply(b, arguments),
                setTimeout(g, c),
                d = !0)
            }
        },
        wrapNum: function(a, c, b) {
            var d = c[1];
            c = c[0];
            var k = d - c;
            return a === d && b ? a : ((a - c) % k + k) % k + c
        },
        falseFn: function() {
            return !1
        },
        formatNum: function(a, c) {
            var b = Math.pow(10, c || 5);
            return Math.round(a * b) / b
        },
        trim: function(a) {
            return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
        },
        splitWords: function(a) {
            return b.Util.trim(a).split(/\s+/)
        },
        setOptions: function(a, c) {
            a.hasOwnProperty("options") || (a.options = a.options ? b.Util.create(a.options) : {});
            for (var d in c)
                a.options[d] = c[d];
            return a.options
        },
        getParamString: function(a, c, b) {
            var d = [], k;
            for (k in a)
                d.push(encodeURIComponent(b ? k.toUpperCase() : k) + "=" + encodeURIComponent(a[k]));
            return (c && -1 !== c.indexOf("?") ? "&" : "?") + d.join("&")
        },
        template: function(a, c) {
            return a.replace(b.Util.templateRe, function(a, b) {
                var d = c[b];
                if (d === n)
                    throw Error("No value provided for variable " + a);
                return "function" == typeof d && (d = d(c)),
                d
            })
        },
        templateRe: /\{ *([\w_\-]+) *\}/g,
        isArray: Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
        ,
        indexOf: function(a, c) {
            for (var b = 0; b < a.length; b++)
                if (a[b] === c)
                    return b;
            return -1
        },
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    };
    (function() {
        function a(a) {
            return q["webkit" + a] || q["moz" + a] || q["ms" + a]
        }
        function c(a) {
            var c = +new Date
              , b = Math.max(0, 16 - (c - d));
            return d = c + b,
            q.setTimeout(a, b)
        }
        var d = 0
          , f = q.requestAnimationFrame || a("RequestAnimationFrame") || c
          , k = q.cancelAnimationFrame || a("CancelAnimationFrame") || a("CancelRequestAnimationFrame") || function(a) {
            q.clearTimeout(a)
        }
        ;
        b.Util.requestAnimFrame = function(a, d, k) {
            return k && f === c ? void a.call(d) : f.call(q, b.bind(a, d))
        }
        ;
        b.Util.cancelAnimFrame = function(a) {
            a && k.call(q, a)
        }
    })();
    b.extend = b.Util.extend;
    b.bind = b.Util.bind;
    b.stamp = b.Util.stamp;
    b.setOptions = b.Util.setOptions;
    b.Class = function() {}
    ;
    b.Class.extend = function(a) {
        var c = function() {
            this.initialize && this.initialize.apply(this, arguments);
            this.callInitHooks()
        }
          , d = c.__super__ = this.prototype
          , f = b.Util.create(d);
        f.constructor = c;
        c.prototype = f;
        for (var k in this)
            this.hasOwnProperty(k) && "prototype" !== k && (c[k] = this[k]);
        return a.statics && (b.extend(c, a.statics),
        delete a.statics),
        a.includes && (b.Util.extend.apply(null, [f].concat(a.includes)),
        delete a.includes),
        f.options && (a.options = b.Util.extend(b.Util.create(f.options), a.options)),
        b.extend(f, a),
        f._initHooks = [],
        f.callInitHooks = function() {
            if (!this._initHooksCalled) {
                d.callInitHooks && d.callInitHooks.call(this);
                this._initHooksCalled = !0;
                for (var a = 0, c = f._initHooks.length; a < c; a++)
                    f._initHooks[a].call(this)
            }
        }
        ,
        c
    }
    ;
    b.Class.include = function(a) {
        return b.extend(this.prototype, a),
        this
    }
    ;
    b.Class.mergeOptions = function(a) {
        return b.extend(this.prototype.options, a),
        this
    }
    ;
    b.Class.addInitHook = function(a) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.prototype._initHooks = this.prototype._initHooks || [],
        this.prototype._initHooks.push("function" == typeof a ? a : function() {
            this[a].apply(this, c)
        }
        ),
        this
    }
    ;
    b.Evented = b.Class.extend({
        on: function(a, c, d) {
            if ("object" == typeof a)
                for (var f in a)
                    this._on(f, a[f], c);
            else {
                a = b.Util.splitWords(a);
                f = 0;
                for (var k = a.length; f < k; f++)
                    this._on(a[f], c, d)
            }
            return this
        },
        off: function(a, c, d) {
            if (a)
                if ("object" == typeof a)
                    for (var f in a)
                        this._off(f, a[f], c);
                else {
                    a = b.Util.splitWords(a);
                    f = 0;
                    for (var k = a.length; f < k; f++)
                        this._off(a[f], c, d)
                }
            else
                delete this._events;
            return this
        },
        _on: function(a, c, b) {
            this._events = this._events || {};
            var d = this._events[a];
            d || (d = [],
            this._events[a] = d);
            b === this && (b = n);
            a = {
                fn: c,
                ctx: b
            };
            for (var k = d, e = 0, g = k.length; e < g; e++)
                if (k[e].fn === c && k[e].ctx === b)
                    return;
            k.push(a);
            d.count++
        },
        _off: function(a, c, d) {
            var f, k, e;
            if (this._events && (f = this._events[a])) {
                if (!c) {
                    k = 0;
                    for (e = f.length; k < e; k++)
                        f[k].fn = b.Util.falseFn;
                    return void delete this._events[a]
                }
                if (d === this && (d = n),
                f)
                    for (k = 0,
                    e = f.length; k < e; k++) {
                        var g = f[k];
                        if (g.ctx === d && g.fn === c)
                            return g.fn = b.Util.falseFn,
                            this._firingCount && (this._events[a] = f = f.slice()),
                            void f.splice(k, 1)
                    }
            }
        },
        fire: function(a, c, d) {
            if (!this.listens(a, d))
                return this;
            c = b.Util.extend({}, c, {
                type: a,
                target: this
            });
            if (this._events && (a = this._events[a])) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var f = 0, k = a.length; f < k; f++) {
                    var e = a[f];
                    e.fn.call(e.ctx || this, c)
                }
                this._firingCount--
            }
            return d && this._propagateEvent(c),
            this
        },
        listens: function(a, c) {
            var b = this._events && this._events[a];
            if (b && b.length)
                return !0;
            if (c)
                for (var f in this._eventParents)
                    if (this._eventParents[f].listens(a, c))
                        return !0;
            return !1
        },
        once: function(a, c, d) {
            if ("object" == typeof a) {
                for (var f in a)
                    this.once(f, a[f], c);
                return this
            }
            var k = b.bind(function() {
                this.off(a, c, d).off(a, k, d)
            }, this);
            return this.on(a, c, d).on(a, k, d)
        },
        addEventParent: function(a) {
            return this._eventParents = this._eventParents || {},
            this._eventParents[b.stamp(a)] = a,
            this
        },
        removeEventParent: function(a) {
            return this._eventParents && delete this._eventParents[b.stamp(a)],
            this
        },
        _propagateEvent: function(a) {
            for (var c in this._eventParents)
                this._eventParents[c].fire(a.type, b.extend({
                    layer: a.target
                }, a), !0)
        }
    });
    var g = b.Evented.prototype;
    g.addEventListener = g.on;
    g.removeEventListener = g.clearAllEventListeners = g.off;
    g.addOneTimeEventListener = g.once;
    g.fireEvent = g.fire;
    g.hasEventListeners = g.listens;
    b.Mixin = {
        Events: g
    };
    (function() {
        var a = navigator.userAgent.toLowerCase()
          , c = h.documentElement
          , d = "ActiveXObject"in q
          , f = -1 !== a.indexOf("webkit")
          , k = -1 !== a.indexOf("phantom")
          , e = -1 !== a.search("android [23]")
          , g = -1 !== a.indexOf("chrome")
          , m = -1 !== a.indexOf("gecko") && !f && !q.opera && !d
          , p = 0 === navigator.platform.indexOf("Win")
          , n = "undefined" != typeof orientation || -1 !== a.indexOf("mobile")
          , v = !q.PointerEvent && q.MSPointerEvent
          , u = q.PointerEvent || v
          , r = d && "transition"in c.style
          , t = "WebKitCSSMatrix"in q && "m11"in new q.WebKitCSSMatrix && !e
          , w = "MozPerspective"in c.style
          , c = "OTransition"in c.style
          , x = !q.L_NO_TOUCH && (u || "ontouchstart"in q || q.DocumentTouch && h instanceof q.DocumentTouch);
        b.Browser = {
            ie: d,
            ielt9: d && !h.addEventListener,
            edge: "msLaunchUri"in navigator && !("documentMode"in h),
            webkit: f,
            gecko: m,
            android: -1 !== a.indexOf("android"),
            android23: e,
            chrome: g,
            safari: !g && -1 !== a.indexOf("safari"),
            win: p,
            ie3d: r,
            webkit3d: t,
            gecko3d: w,
            opera12: c,
            any3d: !q.L_DISABLE_3D && (r || t || w) && !c && !k,
            mobile: n,
            mobileWebkit: n && f,
            mobileWebkit3d: n && t,
            mobileOpera: n && q.opera,
            mobileGecko: n && m,
            touch: !!x,
            msPointer: !!v,
            pointer: !!u,
            retina: 1 < (q.devicePixelRatio || q.screen.deviceXDPI / q.screen.logicalXDPI)
        }
    })();
    b.Point = function(a, c, b) {
        this.x = b ? Math.round(a) : a;
        this.y = b ? Math.round(c) : c
    }
    ;
    b.Point.prototype = {
        clone: function() {
            return new b.Point(this.x,this.y)
        },
        add: function(a) {
            return this.clone()._add(b.point(a))
        },
        _add: function(a) {
            return this.x += a.x,
            this.y += a.y,
            this
        },
        subtract: function(a) {
            return this.clone()._subtract(b.point(a))
        },
        _subtract: function(a) {
            return this.x -= a.x,
            this.y -= a.y,
            this
        },
        divideBy: function(a) {
            return this.clone()._divideBy(a)
        },
        _divideBy: function(a) {
            return this.x /= a,
            this.y /= a,
            this
        },
        multiplyBy: function(a) {
            return this.clone()._multiplyBy(a)
        },
        _multiplyBy: function(a) {
            return this.x *= a,
            this.y *= a,
            this
        },
        scaleBy: function(a) {
            return new b.Point(this.x * a.x,this.y * a.y)
        },
        unscaleBy: function(a) {
            return new b.Point(this.x / a.x,this.y / a.y)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this
        },
        ceil: function() {
            return this.clone()._ceil()
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x),
            this.y = Math.ceil(this.y),
            this
        },
        distanceTo: function(a) {
            a = b.point(a);
            var c = a.x - this.x;
            a = a.y - this.y;
            return Math.sqrt(c * c + a * a)
        },
        equals: function(a) {
            return a = b.point(a),
            a.x === this.x && a.y === this.y
        },
        contains: function(a) {
            return a = b.point(a),
            Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + b.Util.formatNum(this.x) + ", " + b.Util.formatNum(this.y) + ")"
        }
    };
    b.point = function(a, c, d) {
        return a instanceof b.Point ? a : b.Util.isArray(a) ? new b.Point(a[0],a[1]) : a === n || null === a ? a : "object" == typeof a && "x"in a && "y"in a ? new b.Point(a.x,a.y) : new b.Point(a,c,d)
    }
    ;
    b.Bounds = function(a, c) {
        if (a)
            for (var b = c ? [a, c] : a, f = 0, k = b.length; f < k; f++)
                this.extend(b[f])
    }
    ;
    b.Bounds.prototype = {
        extend: function(a) {
            return a = b.point(a),
            this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x),
            this.max.x = Math.max(a.x, this.max.x),
            this.min.y = Math.min(a.y, this.min.y),
            this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(),
            this.max = a.clone()),
            this
        },
        getCenter: function(a) {
            return new b.Point((this.min.x + this.max.x) / 2,(this.min.y + this.max.y) / 2,a)
        },
        getBottomLeft: function() {
            return new b.Point(this.min.x,this.max.y)
        },
        getTopRight: function() {
            return new b.Point(this.max.x,this.min.y)
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(a) {
            var c, d;
            return a = "number" == typeof a[0] || a instanceof b.Point ? b.point(a) : b.bounds(a),
            a instanceof b.Bounds ? (c = a.min,
            d = a.max) : c = d = a,
            c.x >= this.min.x && d.x <= this.max.x && c.y >= this.min.y && d.y <= this.max.y
        },
        intersects: function(a) {
            a = b.bounds(a);
            var c = this.min
              , d = this.max
              , f = a.min;
            a = a.max;
            var k = a.y >= c.y && f.y <= d.y;
            return a.x >= c.x && f.x <= d.x && k
        },
        overlaps: function(a) {
            a = b.bounds(a);
            var c = this.min
              , d = this.max
              , f = a.min;
            a = a.max;
            var k = a.y > c.y && f.y < d.y;
            return a.x > c.x && f.x < d.x && k
        },
        isValid: function() {
            return !(!this.min || !this.max)
        }
    };
    b.bounds = function(a, c) {
        return !a || a instanceof b.Bounds ? a : new b.Bounds(a,c)
    }
    ;
    b.Transformation = function(a, c, b, f) {
        this._a = a;
        this._b = c;
        this._c = b;
        this._d = f
    }
    ;
    b.Transformation.prototype = {
        transform: function(a, c) {
            return this._transform(a.clone(), c)
        },
        _transform: function(a, c) {
            return c = c || 1,
            a.x = c * (this._a * a.x + this._b),
            a.y = c * (this._c * a.y + this._d),
            a
        },
        untransform: function(a, c) {
            return c = c || 1,
            new b.Point((a.x / c - this._b) / this._a,(a.y / c - this._d) / this._c)
        }
    };
    b.DomUtil = {
        get: function(a) {
            return "string" == typeof a ? h.getElementById(a) : a
        },
        getStyle: function(a, c) {
            var b = a.style[c] || a.currentStyle && a.currentStyle[c];
            b && "auto" !== b || !h.defaultView || (b = (b = h.defaultView.getComputedStyle(a, null)) ? b[c] : null);
            return "auto" === b ? null : b
        },
        create: function(a, c, b) {
            a = h.createElement(a);
            return a.className = c || "",
            b && b.appendChild(a),
            a
        },
        remove: function(a) {
            var c = a.parentNode;
            c && c.removeChild(a)
        },
        empty: function(a) {
            for (; a.firstChild; )
                a.removeChild(a.firstChild)
        },
        toFront: function(a) {
            a.parentNode.appendChild(a)
        },
        toBack: function(a) {
            var c = a.parentNode;
            c.insertBefore(a, c.firstChild)
        },
        hasClass: function(a, c) {
            if (a.classList !== n)
                return a.classList.contains(c);
            var d = b.DomUtil.getClass(a);
            return 0 < d.length && (new RegExp("(^|\\s)" + c + "(\\s|$)")).test(d)
        },
        addClass: function(a, c) {
            if (a.classList !== n)
                for (var d = b.Util.splitWords(c), f = 0, k = d.length; f < k; f++)
                    a.classList.add(d[f]);
            else
                b.DomUtil.hasClass(a, c) || (d = b.DomUtil.getClass(a),
                b.DomUtil.setClass(a, (d ? d + " " : "") + c))
        },
        removeClass: function(a, c) {
            a.classList !== n ? a.classList.remove(c) : b.DomUtil.setClass(a, b.Util.trim((" " + b.DomUtil.getClass(a) + " ").replace(" " + c + " ", " ")))
        },
        setClass: function(a, c) {
            a.className.baseVal === n ? a.className = c : a.className.baseVal = c
        },
        getClass: function(a) {
            return a.className.baseVal === n ? a.className : a.className.baseVal
        },
        setOpacity: function(a, c) {
            "opacity"in a.style ? a.style.opacity = c : "filter"in a.style && b.DomUtil._setOpacityIE(a, c)
        },
        _setOpacityIE: function(a, c) {
            var b = !1;
            try {
                b = a.filters.item("DXImageTransform.Microsoft.Alpha")
            } catch (f) {
                if (1 === c)
                    return
            }
            c = Math.round(100 * c);
            b ? (b.Enabled = 100 !== c,
            b.Opacity = c) : a.style.filter += " progid:DXImageTransform.Microsoft.Alpha(opacity=" + c + ")"
        },
        testProp: function(a) {
            for (var c = h.documentElement.style, b = 0; b < a.length; b++)
                if (a[b]in c)
                    return a[b];
            return !1
        },
        setTransform: function(a, c, d) {
            c = c || new b.Point(0,0);
            a.style[b.DomUtil.TRANSFORM] = (b.Browser.ie3d ? "translate(" + c.x + "px," + c.y + "px)" : "translate3d(" + c.x + "px," + c.y + "px,0)") + (d ? " scale(" + d + ")" : "")
        },
        setPosition: function(a, c) {
            a._leaflet_pos = c;
            b.Browser.any3d ? b.DomUtil.setTransform(a, c) : (a.style.left = c.x + "px",
            a.style.top = c.y + "px")
        },
        getPosition: function(a) {
            return a._leaflet_pos || new b.Point(0,0)
        }
    };
    (function() {
        b.DomUtil.TRANSFORM = b.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
        var a = b.DomUtil.TRANSITION = b.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
        if (b.DomUtil.TRANSITION_END = "webkitTransition" === a || "OTransition" === a ? a + "End" : "transitionend",
        "onselectstart"in h)
            b.DomUtil.disableTextSelection = function() {
                b.DomEvent.on(q, "selectstart", b.DomEvent.preventDefault)
            }
            ,
            b.DomUtil.enableTextSelection = function() {
                b.DomEvent.off(q, "selectstart", b.DomEvent.preventDefault)
            }
            ;
        else {
            var c = b.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            b.DomUtil.disableTextSelection = function() {
                if (c) {
                    var a = h.documentElement.style;
                    this._userSelect = a[c];
                    a[c] = "none"
                }
            }
            ;
            b.DomUtil.enableTextSelection = function() {
                c && (h.documentElement.style[c] = this._userSelect,
                delete this._userSelect)
            }
        }
        b.DomUtil.disableImageDrag = function() {
            b.DomEvent.on(q, "dragstart", b.DomEvent.preventDefault)
        }
        ;
        b.DomUtil.enableImageDrag = function() {
            b.DomEvent.off(q, "dragstart", b.DomEvent.preventDefault)
        }
        ;
        b.DomUtil.preventOutline = function(a) {
            for (; -1 === a.tabIndex; )
                a = a.parentNode;
            a && a.style && (b.DomUtil.restoreOutline(),
            this._outlineElement = a,
            this._outlineStyle = a.style.outline,
            a.style.outline = "none",
            b.DomEvent.on(q, "keydown", b.DomUtil.restoreOutline, this))
        }
        ;
        b.DomUtil.restoreOutline = function() {
            this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle,
            delete this._outlineElement,
            delete this._outlineStyle,
            b.DomEvent.off(q, "keydown", b.DomUtil.restoreOutline, this))
        }
    })();
    b.LatLng = function(a, c, b) {
        if (isNaN(a) || isNaN(c))
            throw Error("Invalid LatLng object: (" + a + ", " + c + ")");
        this.lat = +a;
        this.lng = +c;
        b !== n && (this.alt = +b)
    }
    ;
    b.LatLng.prototype = {
        equals: function(a, c) {
            if (!a)
                return !1;
            a = b.latLng(a);
            return Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng)) <= (c === n ? 1E-9 : c)
        },
        toString: function(a) {
            return "LatLng(" + b.Util.formatNum(this.lat, a) + ", " + b.Util.formatNum(this.lng, a) + ")"
        },
        distanceTo: function(a) {
            return b.CRS.Earth.distance(this, b.latLng(a))
        },
        wrap: function() {
            return b.CRS.Earth.wrapLatLng(this)
        },
        toBounds: function(a) {
            a = 180 * a / 40075017;
            var c = a / Math.cos(Math.PI / 180 * this.lat);
            return b.latLngBounds([this.lat - a, this.lng - c], [this.lat + a, this.lng + c])
        },
        clone: function() {
            return new b.LatLng(this.lat,this.lng,this.alt)
        }
    };
    b.latLng = function(a, c, d) {
        return a instanceof b.LatLng ? a : b.Util.isArray(a) && "object" != typeof a[0] ? 3 === a.length ? new b.LatLng(a[0],a[1],a[2]) : 2 === a.length ? new b.LatLng(a[0],a[1]) : null : a === n || null === a ? a : "object" == typeof a && "lat"in a ? new b.LatLng(a.lat,"lng"in a ? a.lng : a.lon,a.alt) : c === n ? null : new b.LatLng(a,c,d)
    }
    ;
    b.LatLngBounds = function(a, c) {
        if (a)
            for (var b = c ? [a, c] : a, f = 0, k = b.length; f < k; f++)
                this.extend(b[f])
    }
    ;
    b.LatLngBounds.prototype = {
        extend: function(a) {
            var c, d, f = this._southWest, k = this._northEast;
            if (a instanceof b.LatLng)
                d = c = a;
            else {
                if (!(a instanceof b.LatLngBounds))
                    return a ? this.extend(b.latLng(a) || b.latLngBounds(a)) : this;
                if (c = a._southWest,
                d = a._northEast,
                !c || !d)
                    return this
            }
            return f || k ? (f.lat = Math.min(c.lat, f.lat),
            f.lng = Math.min(c.lng, f.lng),
            k.lat = Math.max(d.lat, k.lat),
            k.lng = Math.max(d.lng, k.lng)) : (this._southWest = new b.LatLng(c.lat,c.lng),
            this._northEast = new b.LatLng(d.lat,d.lng)),
            this
        },
        pad: function(a) {
            var c = this._southWest
              , d = this._northEast
              , f = Math.abs(c.lat - d.lat) * a;
            a *= Math.abs(c.lng - d.lng);
            return new b.LatLngBounds(new b.LatLng(c.lat - f,c.lng - a),new b.LatLng(d.lat + f,d.lng + a))
        },
        getCenter: function() {
            return new b.LatLng((this._southWest.lat + this._northEast.lat) / 2,(this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new b.LatLng(this.getNorth(),this.getWest())
        },
        getSouthEast: function() {
            return new b.LatLng(this.getSouth(),this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(a) {
            a = "number" == typeof a[0] || a instanceof b.LatLng ? b.latLng(a) : b.latLngBounds(a);
            var c, d, f = this._southWest, k = this._northEast;
            return a instanceof b.LatLngBounds ? (c = a.getSouthWest(),
            d = a.getNorthEast()) : c = d = a,
            c.lat >= f.lat && d.lat <= k.lat && c.lng >= f.lng && d.lng <= k.lng
        },
        intersects: function(a) {
            a = b.latLngBounds(a);
            var c = this._southWest
              , d = this._northEast
              , f = a.getSouthWest();
            a = a.getNorthEast();
            var k = a.lng >= c.lng && f.lng <= d.lng;
            return a.lat >= c.lat && f.lat <= d.lat && k
        },
        overlaps: function(a) {
            a = b.latLngBounds(a);
            var c = this._southWest
              , d = this._northEast
              , f = a.getSouthWest();
            a = a.getNorthEast();
            var k = a.lng > c.lng && f.lng < d.lng;
            return a.lat > c.lat && f.lat < d.lat && k
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join()
        },
        equals: function(a) {
            return !!a && (a = b.latLngBounds(a),
            this._southWest.equals(a.getSouthWest()) && this._northEast.equals(a.getNorthEast()))
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    };
    b.latLngBounds = function(a, c) {
        return a instanceof b.LatLngBounds ? a : new b.LatLngBounds(a,c)
    }
    ;
    b.Projection = {};
    b.Projection.LonLat = {
        project: function(a) {
            return new b.Point(a.lng,a.lat)
        },
        unproject: function(a) {
            return new b.LatLng(a.y,a.x)
        },
        bounds: b.bounds([-180, -90], [180, 90])
    };
    b.Projection.SphericalMercator = {
        R: 6378137,
        MAX_LATITUDE: 85.0511287798,
        project: function(a) {
            var c = Math.PI / 180
              , d = this.MAX_LATITUDE
              , d = Math.sin(Math.max(Math.min(d, a.lat), -d) * c);
            return new b.Point(this.R * a.lng * c,this.R * Math.log((1 + d) / (1 - d)) / 2)
        },
        unproject: function(a) {
            var c = 180 / Math.PI;
            return new b.LatLng((2 * Math.atan(Math.exp(a.y / this.R)) - Math.PI / 2) * c,a.x * c / this.R)
        },
        bounds: function() {
            var a = 6378137 * Math.PI;
            return b.bounds([-a, -a], [a, a])
        }()
    };
    b.CRS = {
        latLngToPoint: function(a, c) {
            var b = this.projection.project(a)
              , f = this.scale(c);
            return this.transformation._transform(b, f)
        },
        pointToLatLng: function(a, c) {
            var b = this.scale(c)
              , b = this.transformation.untransform(a, b);
            return this.projection.unproject(b)
        },
        project: function(a) {
            return this.projection.project(a)
        },
        unproject: function(a) {
            return this.projection.unproject(a)
        },
        scale: function(a) {
            return 256 * Math.pow(2, a)
        },
        zoom: function(a) {
            return Math.log(a / 256) / Math.LN2
        },
        getProjectedBounds: function(a) {
            if (this.infinite)
                return null;
            var c = this.projection.bounds
              , d = this.scale(a);
            a = this.transformation.transform(c.min, d);
            c = this.transformation.transform(c.max, d);
            return b.bounds(a, c)
        },
        infinite: !1,
        wrapLatLng: function(a) {
            var c = this.wrapLng ? b.Util.wrapNum(a.lng, this.wrapLng, !0) : a.lng
              , d = this.wrapLat ? b.Util.wrapNum(a.lat, this.wrapLat, !0) : a.lat;
            return b.latLng(d, c, a.alt)
        }
    };
    b.CRS.Simple = b.extend({}, b.CRS, {
        projection: b.Projection.LonLat,
        transformation: new b.Transformation(1,0,-1,0),
        scale: function(a) {
            return Math.pow(2, a)
        },
        zoom: function(a) {
            return Math.log(a) / Math.LN2
        },
        distance: function(a, c) {
            var b = c.lng - a.lng
              , f = c.lat - a.lat;
            return Math.sqrt(b * b + f * f)
        },
        infinite: !0
    });
    b.CRS.Earth = b.extend({}, b.CRS, {
        wrapLng: [-180, 180],
        R: 6371E3,
        distance: function(a, c) {
            var b = Math.PI / 180
              , f = a.lat * b
              , k = c.lat * b;
            return this.R * Math.acos(Math.min(Math.sin(f) * Math.sin(k) + Math.cos(f) * Math.cos(k) * Math.cos((c.lng - a.lng) * b), 1))
        }
    });
    b.CRS.EPSG3857 = b.extend({}, b.CRS.Earth, {
        code: "EPSG:3857",
        projection: b.Projection.SphericalMercator,
        transformation: function() {
            var a = .5 / (Math.PI * b.Projection.SphericalMercator.R);
            return new b.Transformation(a,.5,-a,.5)
        }()
    });
    b.CRS.EPSG900913 = b.extend({}, b.CRS.EPSG3857, {
        code: "EPSG:900913"
    });
    b.CRS.EPSG4326 = b.extend({}, b.CRS.Earth, {
        code: "EPSG:4326",
        projection: b.Projection.LonLat,
        transformation: new b.Transformation(1 / 180,1,-1 / 180,.5)
    });
    b.Map = b.Evented.extend({
        options: {
            crs: b.CRS.EPSG3857,
            center: n,
            zoom: n,
            minZoom: n,
            maxZoom: n,
            layers: [],
            maxBounds: n,
            renderer: n,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
        },
        initialize: function(a, c) {
            c = b.setOptions(this, c);
            this._initContainer(a);
            this._initLayout();
            this._onResize = b.bind(this._onResize, this);
            this._initEvents();
            c.maxBounds && this.setMaxBounds(c.maxBounds);
            c.zoom !== n && (this._zoom = this._limitZoom(c.zoom));
            c.center && c.zoom !== n && this.setView(b.latLng(c.center), c.zoom, {
                reset: !0
            });
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._sizeChanged = !0;
            this.callInitHooks();
            this._addLayers(this.options.layers)
        },
        setView: function(a, c) {
            return c = c === n ? this.getZoom() : c,
            this._resetView(b.latLng(a), c),
            this
        },
        setZoom: function(a, c) {
            return this._loaded ? this.setView(this.getCenter(), a, {
                zoom: c
            }) : (this._zoom = a,
            this)
        },
        zoomIn: function(a, c) {
            return a = a || (b.Browser.any3d ? this.options.zoomDelta : 1),
            this.setZoom(this._zoom + a, c)
        },
        zoomOut: function(a, c) {
            return a = a || (b.Browser.any3d ? this.options.zoomDelta : 1),
            this.setZoom(this._zoom - a, c)
        },
        setZoomAround: function(a, c, d) {
            var f = this.getZoomScale(c)
              , k = this.getSize().divideBy(2);
            a = (a instanceof b.Point ? a : this.latLngToContainerPoint(a)).subtract(k).multiplyBy(1 - 1 / f);
            k = this.containerPointToLatLng(k.add(a));
            return this.setView(k, c, {
                zoom: d
            })
        },
        _getBoundsCenterZoom: function(a, c) {
            c = c || {};
            a = a.getBounds ? a.getBounds() : b.latLngBounds(a);
            var d = b.point(c.paddingTopLeft || c.padding || [0, 0])
              , f = b.point(c.paddingBottomRight || c.padding || [0, 0])
              , k = this.getBoundsZoom(a, !1, d.add(f))
              , k = "number" == typeof c.maxZoom ? Math.min(c.maxZoom, k) : k
              , d = f.subtract(d).divideBy(2)
              , f = this.project(a.getSouthWest(), k)
              , e = this.project(a.getNorthEast(), k);
            return {
                center: this.unproject(f.add(e).divideBy(2).add(d), k),
                zoom: k
            }
        },
        fitBounds: function(a, c) {
            if (a = b.latLngBounds(a),
            !a.isValid())
                throw Error("Bounds are not valid.");
            var d = this._getBoundsCenterZoom(a, c);
            return this.setView(d.center, d.zoom, c)
        },
        fitWorld: function(a) {
            return this.fitBounds([[-90, -180], [90, 180]], a)
        },
        panTo: function(a, c) {
            return this.setView(a, this._zoom, {
                pan: c
            })
        },
        panBy: function(a) {
            return this.fire("movestart"),
            this._rawPanBy(b.point(a)),
            this.fire("move"),
            this.fire("moveend")
        },
        setMaxBounds: function(a) {
            return a = b.latLngBounds(a),
            a.isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds),
            this.options.maxBounds = a,
            this._loaded && this._panInsideMaxBounds(),
            this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null,
            this.off("moveend", this._panInsideMaxBounds))
        },
        setMinZoom: function(a) {
            return this.options.minZoom = a,
            this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(a) : this
        },
        setMaxZoom: function(a) {
            return this.options.maxZoom = a,
            this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(a) : this
        },
        panInsideBounds: function(a, c) {
            this._enforcingBounds = !0;
            var d = this.getCenter()
              , f = this._limitCenter(d, this._zoom, b.latLngBounds(a));
            return d.equals(f) || this.panTo(f, c),
            this._enforcingBounds = !1,
            this
        },
        invalidateSize: function(a) {
            if (!this._loaded)
                return this;
            a = b.extend({
                animate: !1,
                pan: !0
            }, !0 === a ? {
                animate: !0
            } : a);
            var c = this.getSize();
            this._sizeChanged = !0;
            this._lastCenter = null;
            var d = this.getSize()
              , f = c.divideBy(2).round()
              , k = d.divideBy(2).round()
              , f = f.subtract(k);
            return f.x || f.y ? (a.animate && a.pan ? this.panBy(f) : (a.pan && this._rawPanBy(f),
            this.fire("move"),
            a.debounceMoveend ? (clearTimeout(this._sizeTimer),
            this._sizeTimer = setTimeout(b.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")),
            this.fire("resize", {
                oldSize: c,
                newSize: d
            })) : this
        },
        stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)),
            this.options.zoomSnap || this.fire("viewreset"),
            this._stop()
        },
        addHandler: function(a, c) {
            if (!c)
                return this;
            var b = this[a] = new c(this);
            return this._handlers.push(b),
            this.options[a] && b.enable(),
            this
        },
        remove: function() {
            if (this._initEvents(!0),
            this._containerId !== this._container._leaflet_id)
                throw Error("Map container is being reused by another instance");
            try {
                delete this._container._leaflet_id,
                delete this._containerId
            } catch (c) {
                this._containerId = this._container._leaflet_id = n
            }
            b.DomUtil.remove(this._mapPane);
            this._clearControlPos && this._clearControlPos();
            this._clearHandlers();
            this._loaded && this.fire("unload");
            for (var a in this._layers)
                this._layers[a].remove();
            return this
        },
        createPane: function(a, c) {
            var d = "leaflet-pane" + (a ? " leaflet-" + a.replace("Pane", "") + "-pane" : "")
              , d = b.DomUtil.create("div", d, c || this._mapPane);
            return a && (this._panes[a] = d),
            d
        },
        getCenter: function() {
            return this._checkIfLoaded(),
            this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function() {
            return this._zoom
        },
        getBounds: function() {
            var a = this.getPixelBounds()
              , c = this.unproject(a.getBottomLeft())
              , a = this.unproject(a.getTopRight());
            return new b.LatLngBounds(c,a)
        },
        getMinZoom: function() {
            return this.options.minZoom === n ? this._layersMinZoom || 0 : this.options.minZoom
        },
        getMaxZoom: function() {
            return this.options.maxZoom === n ? this._layersMaxZoom === n ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function(a, c, d) {
            a = b.latLngBounds(a);
            d = b.point(d || [0, 0]);
            var f = this.getZoom() || 0
              , k = this.getMinZoom()
              , e = this.getMaxZoom()
              , g = a.getNorthWest();
            a = a.getSouthEast();
            d = this.getSize().subtract(d);
            g = this.project(a, f).subtract(this.project(g, f));
            a = b.Browser.any3d ? this.options.zoomSnap : 1;
            return f = this.getScaleZoom(Math.min(d.x / g.x, d.y / g.y), f),
            a && (f = a / 100 * Math.round(f / (a / 100)),
            f = c ? Math.ceil(f / a) * a : Math.floor(f / a) * a),
            Math.max(k, Math.min(e, f))
        },
        getSize: function() {
            return this._size && !this._sizeChanged || (this._size = new b.Point(this._container.clientWidth,this._container.clientHeight),
            this._sizeChanged = !1),
            this._size.clone()
        },
        getPixelBounds: function(a, c) {
            var d = this._getTopLeftPoint(a, c);
            return new b.Bounds(d,d.add(this.getSize()))
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(),
            this._pixelOrigin
        },
        getPixelWorldBounds: function(a) {
            return this.options.crs.getProjectedBounds(a === n ? this.getZoom() : a)
        },
        getPane: function(a) {
            return "string" == typeof a ? this._panes[a] : a
        },
        getPanes: function() {
            return this._panes
        },
        getContainer: function() {
            return this._container
        },
        getZoomScale: function(a, c) {
            var b = this.options.crs;
            return c = c === n ? this._zoom : c,
            b.scale(a) / b.scale(c)
        },
        getScaleZoom: function(a, c) {
            var b = this.options.crs;
            c = c === n ? this._zoom : c;
            b = b.zoom(a * b.scale(c));
            return isNaN(b) ? 1 / 0 : b
        },
        project: function(a, c) {
            return c = c === n ? this._zoom : c,
            this.options.crs.latLngToPoint(b.latLng(a), c)
        },
        unproject: function(a, c) {
            return c = c === n ? this._zoom : c,
            this.options.crs.pointToLatLng(b.point(a), c)
        },
        layerPointToLatLng: function(a) {
            a = b.point(a).add(this.getPixelOrigin());
            return this.unproject(a)
        },
        latLngToLayerPoint: function(a) {
            return this.project(b.latLng(a))._round()._subtract(this.getPixelOrigin())
        },
        wrapLatLng: function(a) {
            return this.options.crs.wrapLatLng(b.latLng(a))
        },
        distance: function(a, c) {
            return this.options.crs.distance(b.latLng(a), b.latLng(c))
        },
        containerPointToLayerPoint: function(a) {
            return b.point(a).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function(a) {
            return b.point(a).add(this._getMapPanePos())
        },
        containerPointToLatLng: function(a) {
            a = this.containerPointToLayerPoint(b.point(a));
            return this.layerPointToLatLng(a)
        },
        latLngToContainerPoint: function(a) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(b.latLng(a)))
        },
        mouseEventToContainerPoint: function(a) {
            return b.DomEvent.getMousePosition(a, this._container)
        },
        mouseEventToLayerPoint: function(a) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
        },
        mouseEventToLatLng: function(a) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
        },
        _initContainer: function(a) {
            a = this._container = b.DomUtil.get(a);
            if (!a)
                throw Error("Map container not found.");
            if (a._leaflet_id)
                throw Error("Map container is already initialized.");
            b.DomEvent.addListener(a, "scroll", this._onScroll, this);
            this._containerId = b.Util.stamp(a)
        },
        _initLayout: function() {
            var a = this._container;
            this._fadeAnimated = this.options.fadeAnimation && b.Browser.any3d;
            b.DomUtil.addClass(a, "leaflet-container" + (b.Browser.touch ? " leaflet-touch" : "") + (b.Browser.retina ? " leaflet-retina" : "") + (b.Browser.ielt9 ? " leaflet-oldie" : "") + (b.Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var c = b.DomUtil.getStyle(a, "position");
            "absolute" !== c && "relative" !== c && "fixed" !== c && (a.style.position = "relative");
            this._initPanes();
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function() {
            var a = this._panes = {};
            this._paneRenderers = {};
            this._mapPane = this.createPane("mapPane", this._container);
            b.DomUtil.setPosition(this._mapPane, new b.Point(0,0));
            this.createPane("tilePane");
            this.createPane("shadowPane");
            this.createPane("overlayPane");
            this.createPane("markerPane");
            this.createPane("tooltipPane");
            this.createPane("popupPane");
            this.options.markerZoomAnimation || (b.DomUtil.addClass(a.markerPane, "leaflet-zoom-hide"),
            b.DomUtil.addClass(a.shadowPane, "leaflet-zoom-hide"))
        },
        _resetView: function(a, c) {
            b.DomUtil.setPosition(this._mapPane, new b.Point(0,0));
            var d = !this._loaded;
            this._loaded = !0;
            c = this._limitZoom(c);
            this.fire("viewprereset");
            var f = this._zoom !== c;
            this._moveStart(f)._move(a, c)._moveEnd(f);
            this.fire("viewreset");
            d && this.fire("load")
        },
        _moveStart: function(a) {
            return a && this.fire("zoomstart"),
            this.fire("movestart")
        },
        _move: function(a, c, b) {
            c === n && (c = this._zoom);
            var d = this._zoom !== c;
            return this._zoom = c,
            this._lastCenter = a,
            this._pixelOrigin = this._getNewPixelOrigin(a),
            (d || b && b.pinch) && this.fire("zoom", b),
            this.fire("move", b)
        },
        _moveEnd: function(a) {
            return a && this.fire("zoomend"),
            this.fire("moveend")
        },
        _stop: function() {
            return b.Util.cancelAnimFrame(this._flyToFrame),
            this._panAnim && this._panAnim.stop(),
            this
        },
        _rawPanBy: function(a) {
            b.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(a))
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _panInsideMaxBounds: function() {
            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function() {
            if (!this._loaded)
                throw Error("Set map center and zoom first.");
        },
        _initEvents: function(a) {
            b.DomEvent && (this._targets = {},
            this._targets[b.stamp(this._container)] = this,
            a = a ? "off" : "on",
            b.DomEvent[a](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this),
            this.options.trackResize && b.DomEvent[a](q, "resize", this._onResize, this),
            b.Browser.any3d && this.options.transform3DLimit && this[a]("moveend", this._onMoveEnd))
        },
        _onResize: function() {
            b.Util.cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = b.Util.requestAnimFrame(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            }, this)
        },
        _onScroll: function() {
            this._container.scrollTop = 0;
            this._container.scrollLeft = 0
        },
        _onMoveEnd: function() {
            var a = this._getMapPanePos();
            Math.max(Math.abs(a.x), Math.abs(a.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
        },
        _findEventTargets: function(a, c) {
            for (var d, f = [], e = "mouseout" === c || "mouseover" === c, g = a.target || a.srcElement, l = !1; g; ) {
                if (d = this._targets[b.stamp(g)],
                d && ("click" === c || "preclick" === c) && !a._simulated && this._draggableMoved(d)) {
                    l = !0;
                    break
                }
                if (d && d.listens(c, !0)) {
                    if (e && !b.DomEvent._isExternalTarget(g, a))
                        break;
                    if (f.push(d),
                    e)
                        break
                }
                if (g === this._container)
                    break;
                g = g.parentNode
            }
            return f.length || l || e || !b.DomEvent._isExternalTarget(g, a) || (f = [this]),
            f
        },
        _handleDOMEvent: function(a) {
            if (this._loaded && !b.DomEvent._skipped(a)) {
                var c = "keypress" === a.type && 13 === a.keyCode ? "click" : a.type;
                "mousedown" === c && b.DomUtil.preventOutline(a.target || a.srcElement);
                this._fireDOMEvent(a, c)
            }
        },
        _fireDOMEvent: function(a, c, d) {
            if ("click" === a.type) {
                var f = b.Util.extend({}, a);
                f.type = "preclick";
                this._fireDOMEvent(f, f.type, d)
            }
            if (!a._stopped && (d = (d || []).concat(this._findEventTargets(a, c)),
            d.length)) {
                var e = d[0];
                "contextmenu" === c && e.listens(c, !0) && b.DomEvent.preventDefault(a);
                f = {
                    originalEvent: a
                };
                if ("keypress" !== a.type) {
                    var g = e instanceof b.Marker;
                    f.containerPoint = g ? this.latLngToContainerPoint(e.getLatLng()) : this.mouseEventToContainerPoint(a);
                    f.layerPoint = this.containerPointToLayerPoint(f.containerPoint);
                    f.latlng = g ? e.getLatLng() : this.layerPointToLatLng(f.layerPoint)
                }
                for (a = 0; a < d.length && !(d[a].fire(c, f, !0),
                f.originalEvent._stopped || d[a].options.nonBubblingEvents && -1 !== b.Util.indexOf(d[a].options.nonBubblingEvents, c)); a++)
                    ;
            }
        },
        _draggableMoved: function(a) {
            return a = a.dragging && a.dragging.enabled() ? a : this,
            a.dragging && a.dragging.moved() || this.boxZoom && this.boxZoom.moved()
        },
        _clearHandlers: function() {
            for (var a = 0, c = this._handlers.length; a < c; a++)
                this._handlers[a].disable()
        },
        whenReady: function(a, c) {
            return this._loaded ? a.call(c || this, {
                target: this
            }) : this.on("load", a, c),
            this
        },
        _getMapPanePos: function() {
            return b.DomUtil.getPosition(this._mapPane) || new b.Point(0,0)
        },
        _moved: function() {
            var a = this._getMapPanePos();
            return a && !a.equals([0, 0])
        },
        _getTopLeftPoint: function(a, c) {
            return (a && c !== n ? this._getNewPixelOrigin(a, c) : this.getPixelOrigin()).subtract(this._getMapPanePos())
        },
        _getNewPixelOrigin: function(a, c) {
            var b = this.getSize()._divideBy(2);
            return this.project(a, c)._subtract(b)._add(this._getMapPanePos())._round()
        },
        _latLngToNewLayerPoint: function(a, c, b) {
            b = this._getNewPixelOrigin(b, c);
            return this.project(a, c)._subtract(b)
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function(a) {
            return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function(a, c, d) {
            if (!d)
                return a;
            var f = this.project(a, c)
              , e = this.getSize().divideBy(2)
              , e = new b.Bounds(f.subtract(e),f.add(e));
            d = this._getBoundsOffset(e, d, c);
            return d.round().equals([0, 0]) ? a : this.unproject(f.add(d), c)
        },
        _limitOffset: function(a, c) {
            if (!c)
                return a;
            var d = this.getPixelBounds()
              , d = new b.Bounds(d.min.add(a),d.max.add(a));
            return a.add(this._getBoundsOffset(d, c))
        },
        _getBoundsOffset: function(a, c, d) {
            d = b.bounds(this.project(c.getNorthEast(), d), this.project(c.getSouthWest(), d));
            c = d.min.subtract(a.min);
            d = d.max.subtract(a.max);
            a = this._rebound(c.x, -d.x);
            c = this._rebound(c.y, -d.y);
            return new b.Point(a,c)
        },
        _rebound: function(a, c) {
            return 0 < a + c ? Math.round(a - c) / 2 : Math.max(0, Math.ceil(a)) - Math.max(0, Math.floor(c))
        },
        _limitZoom: function(a) {
            var c = this.getMinZoom()
              , d = this.getMaxZoom()
              , f = b.Browser.any3d ? this.options.zoomSnap : 1;
            return f && (a = Math.round(a / f) * f),
            Math.max(c, Math.min(d, a))
        }
    });
    b.map = function(a, c) {
        return new b.Map(a,c)
    }
    ;
    b.Layer = b.Evented.extend({
        options: {
            pane: "overlayPane",
            nonBubblingEvents: []
        },
        addTo: function(a) {
            return a.addLayer(this),
            this
        },
        remove: function() {
            return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function(a) {
            return a && a.removeLayer(this),
            this
        },
        getPane: function(a) {
            return this._map.getPane(a ? this.options[a] || a : this.options.pane)
        },
        addInteractiveTarget: function(a) {
            return this._map._targets[b.stamp(a)] = this,
            this
        },
        removeInteractiveTarget: function(a) {
            return delete this._map._targets[b.stamp(a)],
            this
        },
        _layerAdd: function(a) {
            var c = a.target;
            if (c.hasLayer(this)) {
                if (this._map = c,
                this._zoomAnimated = c._zoomAnimated,
                this.getEvents) {
                    var b = this.getEvents();
                    c.on(b, this);
                    this.once("remove", function() {
                        c.off(b, this)
                    }, this)
                }
                this.onAdd(c);
                this.getAttribution && this._map.attributionControl && this._map.attributionControl.addAttribution(this.getAttribution());
                this.fire("add");
                c.fire("layeradd", {
                    layer: this
                })
            }
        }
    });
    b.Map.include({
        addLayer: function(a) {
            var c = b.stamp(a);
            return this._layers[c] ? this : (this._layers[c] = a,
            a._mapToAdd = this,
            a.beforeAdd && a.beforeAdd(this),
            this.whenReady(a._layerAdd, a),
            this)
        },
        removeLayer: function(a) {
            var c = b.stamp(a);
            return this._layers[c] ? (this._loaded && a.onRemove(this),
            a.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(a.getAttribution()),
            delete this._layers[c],
            this._loaded && (this.fire("layerremove", {
                layer: a
            }),
            a.fire("remove")),
            a._map = a._mapToAdd = null,
            this) : this
        },
        hasLayer: function(a) {
            return !!a && b.stamp(a)in this._layers
        },
        eachLayer: function(a, c) {
            for (var b in this._layers)
                a.call(c, this._layers[b]);
            return this
        },
        _addLayers: function(a) {
            a = a ? b.Util.isArray(a) ? a : [a] : [];
            for (var c = 0, d = a.length; c < d; c++)
                this.addLayer(a[c])
        },
        _addZoomLimit: function(a) {
            !isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[b.stamp(a)] = a,
            this._updateZoomLevels())
        },
        _removeZoomLimit: function(a) {
            a = b.stamp(a);
            this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a],
            this._updateZoomLevels())
        },
        _updateZoomLevels: function() {
            var a = 1 / 0, c = -(1 / 0), b = this._getZoomSpan(), f;
            for (f in this._zoomBoundLayers)
                var e = this._zoomBoundLayers[f].options, a = e.minZoom === n ? a : Math.min(a, e.minZoom), c = e.maxZoom === n ? c : Math.max(c, e.maxZoom);
            this._layersMaxZoom = c === -(1 / 0) ? n : c;
            this._layersMinZoom = a === 1 / 0 ? n : a;
            b !== this._getZoomSpan() && this.fire("zoomlevelschange")
        }
    });
    b.Projection.Mercator = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: b.bounds([-2.003750834279E7, -1.549657073972E7], [2.003750834279E7, 1.876465623138E7]),
        project: function(a) {
            var c = Math.PI / 180
              , d = this.R
              , f = a.lat * c
              , e = this.R_MINOR / d
              , e = Math.sqrt(1 - e * e)
              , g = e * Math.sin(f);
            return f = -d * Math.log(Math.max(Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - g) / (1 + g), e / 2), 1E-10)),
            new b.Point(a.lng * c * d,f)
        },
        unproject: function(a) {
            var c, d = 180 / Math.PI, f = this.R, e = this.R_MINOR / f, e = Math.sqrt(1 - e * e), g = Math.exp(-a.y / f), l = Math.PI / 2 - 2 * Math.atan(g), m = 0;
            for (c = .1; 15 > m && 1E-7 < Math.abs(c); m++)
                c = e * Math.sin(l),
                c = Math.pow((1 - c) / (1 + c), e / 2),
                c = Math.PI / 2 - 2 * Math.atan(g * c) - l,
                l += c;
            return new b.LatLng(l * d,a.x * d / f)
        }
    };
    b.CRS.EPSG3395 = b.extend({}, b.CRS.Earth, {
        code: "EPSG:3395",
        projection: b.Projection.Mercator,
        transformation: function() {
            var a = .5 / (Math.PI * b.Projection.Mercator.R);
            return new b.Transformation(a,.5,-a,.5)
        }()
    });
    b.GridLayer = b.Layer.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: b.Browser.mobile,
            updateWhenZooming: !0,
            updateInterval: 200,
            attribution: null,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: n,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function(a) {
            b.setOptions(this, a)
        },
        onAdd: function() {
            this._initContainer();
            this._levels = {};
            this._tiles = {};
            this._resetView();
            this._update()
        },
        beforeAdd: function(a) {
            a._addZoomLimit(this)
        },
        onRemove: function(a) {
            this._removeAllTiles();
            b.DomUtil.remove(this._container);
            a._removeZoomLimit(this);
            this._tileZoom = this._container = null
        },
        bringToFront: function() {
            return this._map && (b.DomUtil.toFront(this._container),
            this._setAutoZIndex(Math.max)),
            this
        },
        bringToBack: function() {
            return this._map && (b.DomUtil.toBack(this._container),
            this._setAutoZIndex(Math.min)),
            this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._updateOpacity(),
            this
        },
        setZIndex: function(a) {
            return this.options.zIndex = a,
            this._updateZIndex(),
            this
        },
        isLoading: function() {
            return this._loading
        },
        redraw: function() {
            return this._map && (this._removeAllTiles(),
            this._update()),
            this
        },
        getEvents: function() {
            var a = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = b.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)),
            a.move = this._onMove),
            this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        createTile: function() {
            return h.createElement("div")
        },
        getTileSize: function() {
            var a = this.options.tileSize;
            return a instanceof b.Point ? a : new b.Point(a,a)
        },
        _updateZIndex: function() {
            this._container && this.options.zIndex !== n && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(a) {
            for (var c, b = this.getPane().children, f = -a(-(1 / 0), 1 / 0), e = 0, g = b.length; e < g; e++)
                c = b[e].style.zIndex,
                b[e] !== this._container && c && (f = a(f, +c));
            isFinite(f) && (this.options.zIndex = f + a(-1, 1),
            this._updateZIndex())
        },
        _updateOpacity: function() {
            if (this._map && !b.Browser.ielt9) {
                b.DomUtil.setOpacity(this._container, this.options.opacity);
                var a = +new Date, c = !1, d = !1, f;
                for (f in this._tiles) {
                    var e = this._tiles[f];
                    if (e.current && e.loaded) {
                        var g = Math.min(1, (a - e.loaded) / 200);
                        b.DomUtil.setOpacity(e.el, g);
                        1 > g ? c = !0 : (e.active && (d = !0),
                        e.active = !0)
                    }
                }
                d && !this._noPrune && this._pruneTiles();
                c && (b.Util.cancelAnimFrame(this._fadeFrame),
                this._fadeFrame = b.Util.requestAnimFrame(this._updateOpacity, this))
            }
        },
        _initContainer: function() {
            this._container || (this._container = b.DomUtil.create("div", "leaflet-layer " + (this.options.className || "")),
            this._updateZIndex(),
            1 > this.options.opacity && this._updateOpacity(),
            this.getPane().appendChild(this._container))
        },
        _updateLevels: function() {
            var a = this._tileZoom
              , c = this.options.maxZoom;
            if (a === n)
                return n;
            for (var d in this._levels)
                this._levels[d].el.children.length || d === a ? this._levels[d].el.style.zIndex = c - Math.abs(a - d) : (b.DomUtil.remove(this._levels[d].el),
                this._removeTilesAtZoom(d),
                delete this._levels[d]);
            d = this._levels[a];
            var f = this._map;
            return d || (d = this._levels[a] = {},
            d.el = b.DomUtil.create("div", "leaflet-tile-container leaflet-zoom-animated", this._container),
            d.el.style.zIndex = c,
            d.origin = f.project(f.unproject(f.getPixelOrigin()), a).round(),
            d.zoom = a,
            this._setZoomTransform(d, f.getCenter(), f.getZoom()),
            b.Util.falseFn(d.el.offsetWidth)),
            this._level = d,
            d
        },
        _pruneTiles: function() {
            if (this._map) {
                var a, c, b = this._map.getZoom();
                if (b > this.options.maxZoom || b < this.options.minZoom)
                    return void this._removeAllTiles();
                for (a in this._tiles)
                    c = this._tiles[a],
                    c.retain = c.current;
                for (a in this._tiles)
                    if (c = this._tiles[a],
                    c.current && !c.active)
                        b = c.coords,
                        this._retainParent(b.x, b.y, b.z, b.z - 5) || this._retainChildren(b.x, b.y, b.z, b.z + 2);
                for (a in this._tiles)
                    this._tiles[a].retain || this._removeTile(a)
            }
        },
        _removeTilesAtZoom: function(a) {
            for (var c in this._tiles)
                this._tiles[c].coords.z === a && this._removeTile(c)
        },
        _removeAllTiles: function() {
            for (var a in this._tiles)
                this._removeTile(a)
        },
        _invalidateAll: function() {
            for (var a in this._levels)
                b.DomUtil.remove(this._levels[a].el),
                delete this._levels[a];
            this._removeAllTiles();
            this._tileZoom = null
        },
        _retainParent: function(a, c, d, f) {
            a = Math.floor(a / 2);
            c = Math.floor(c / 2);
            --d;
            var e = new b.Point(+a,+c);
            e.z = +d;
            e = this._tileCoordsToKey(e);
            return (e = this._tiles[e]) && e.active ? (e.retain = !0,
            !0) : (e && e.loaded && (e.retain = !0),
            d > f && this._retainParent(a, c, d, f))
        },
        _retainChildren: function(a, c, d, f) {
            for (var e = 2 * a; e < 2 * a + 2; e++)
                for (var g = 2 * c; g < 2 * c + 2; g++) {
                    var l = new b.Point(e,g);
                    l.z = d + 1;
                    l = this._tileCoordsToKey(l);
                    (l = this._tiles[l]) && l.active ? l.retain = !0 : (l && l.loaded && (l.retain = !0),
                    d + 1 < f && this._retainChildren(e, g, d + 1, f))
                }
        },
        _resetView: function(a) {
            a = a && (a.pinch || a.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), a, a)
        },
        _animateZoom: function(a) {
            this._setView(a.center, a.zoom, !0, a.noUpdate)
        },
        _setView: function(a, c, b, f) {
            var d = Math.round(c);
            (this.options.maxZoom !== n && d > this.options.maxZoom || this.options.minZoom !== n && d < this.options.minZoom) && (d = n);
            var e = this.options.updateWhenZooming && d !== this._tileZoom;
            f && !e || (this._tileZoom = d,
            this._abortLoading && this._abortLoading(),
            this._updateLevels(),
            this._resetGrid(),
            d !== n && this._update(a),
            b || this._pruneTiles(),
            this._noPrune = !!b);
            this._setZoomTransforms(a, c)
        },
        _setZoomTransforms: function(a, c) {
            for (var b in this._levels)
                this._setZoomTransform(this._levels[b], a, c)
        },
        _setZoomTransform: function(a, c, d) {
            var f = this._map.getZoomScale(d, a.zoom);
            c = a.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(c, d)).round();
            b.Browser.any3d ? b.DomUtil.setTransform(a.el, c, f) : b.DomUtil.setPosition(a.el, c)
        },
        _resetGrid: function() {
            var a = this._map
              , c = a.options.crs
              , b = this._tileSize = this.getTileSize()
              , f = this._tileZoom
              , e = this._map.getPixelWorldBounds(this._tileZoom);
            e && (this._globalTileRange = this._pxBoundsToTileRange(e));
            this._wrapX = c.wrapLng && !this.options.noWrap && [Math.floor(a.project([0, c.wrapLng[0]], f).x / b.x), Math.ceil(a.project([0, c.wrapLng[1]], f).x / b.y)];
            this._wrapY = c.wrapLat && !this.options.noWrap && [Math.floor(a.project([c.wrapLat[0], 0], f).y / b.x), Math.ceil(a.project([c.wrapLat[1], 0], f).y / b.y)]
        },
        _onMoveEnd: function() {
            this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function(a) {
            var c = this._map
              , d = c._animatingZoom ? Math.max(c._animateToZoom, c.getZoom()) : c.getZoom()
              , d = c.getZoomScale(d, this._tileZoom);
            a = c.project(a, this._tileZoom).floor();
            c = c.getSize().divideBy(2 * d);
            return new b.Bounds(a.subtract(c),a.add(c))
        },
        _update: function(a) {
            var c = this._map;
            if (c) {
                var d = c.getZoom();
                if (a === n && (a = c.getCenter()),
                this._tileZoom !== n) {
                    var c = this._getTiledPixelBounds(a), f = this._pxBoundsToTileRange(c), e = f.getCenter(), c = [], g = this.options.keepBuffer, g = new b.Bounds(f.getBottomLeft().subtract([g, -g]),f.getTopRight().add([g, -g])), l;
                    for (l in this._tiles) {
                        var m = this._tiles[l].coords;
                        m.z === this._tileZoom && g.contains(b.point(m.x, m.y)) || (this._tiles[l].current = !1)
                    }
                    if (1 < Math.abs(d - this._tileZoom))
                        return void this._setView(a, d);
                    for (d = f.min.y; d <= f.max.y; d++)
                        for (a = f.min.x; a <= f.max.x; a++)
                            if (l = new b.Point(a,d),
                            l.z = this._tileZoom,
                            this._isValidTile(l))
                                (g = this._tiles[this._tileCoordsToKey(l)]) ? g.current = !0 : c.push(l);
                    if (c.sort(function(a, c) {
                        return a.distanceTo(e) - c.distanceTo(e)
                    }),
                    0 !== c.length) {
                        this._loading || (this._loading = !0,
                        this.fire("loading"));
                        f = h.createDocumentFragment();
                        for (a = 0; a < c.length; a++)
                            this._addTile(c[a], f);
                        this._level.el.appendChild(f)
                    }
                }
            }
        },
        _isValidTile: function(a) {
            var c = this._map.options.crs;
            if (!c.infinite) {
                var d = this._globalTileRange;
                if (!c.wrapLng && (a.x < d.min.x || a.x > d.max.x) || !c.wrapLat && (a.y < d.min.y || a.y > d.max.y))
                    return !1
            }
            if (!this.options.bounds)
                return !0;
            a = this._tileCoordsToBounds(a);
            return b.latLngBounds(this.options.bounds).overlaps(a)
        },
        _keyToBounds: function(a) {
            return this._tileCoordsToBounds(this._keyToTileCoords(a))
        },
        _tileCoordsToBounds: function(a) {
            var c = this._map
              , d = this.getTileSize()
              , f = a.scaleBy(d)
              , d = f.add(d)
              , f = c.unproject(f, a.z);
            a = c.unproject(d, a.z);
            return this.options.noWrap || (f = c.wrapLatLng(f),
            a = c.wrapLatLng(a)),
            new b.LatLngBounds(f,a)
        },
        _tileCoordsToKey: function(a) {
            return a.x + ":" + a.y + ":" + a.z
        },
        _keyToTileCoords: function(a) {
            a = a.split(":");
            var c = new b.Point(+a[0],+a[1]);
            return c.z = +a[2],
            c
        },
        _removeTile: function(a) {
            var c = this._tiles[a];
            c && (b.DomUtil.remove(c.el),
            delete this._tiles[a],
            this.fire("tileunload", {
                tile: c.el,
                coords: this._keyToTileCoords(a)
            }))
        },
        _initTile: function(a) {
            b.DomUtil.addClass(a, "leaflet-tile");
            var c = this.getTileSize();
            a.style.width = c.x + "px";
            a.style.height = c.y + "px";
            a.onselectstart = b.Util.falseFn;
            a.onmousemove = b.Util.falseFn;
            b.Browser.ielt9 && 1 > this.options.opacity && b.DomUtil.setOpacity(a, this.options.opacity);
            b.Browser.android && !b.Browser.android23 && (a.style.WebkitBackfaceVisibility = "hidden")
        },
        _addTile: function(a, c) {
            var d = this._getTilePos(a)
              , f = this._tileCoordsToKey(a)
              , e = this.createTile(this._wrapCoords(a), b.bind(this._tileReady, this, a));
            this._initTile(e);
            2 > this.createTile.length && b.Util.requestAnimFrame(b.bind(this._tileReady, this, a, null, e));
            b.DomUtil.setPosition(e, d);
            this._tiles[f] = {
                el: e,
                coords: a,
                current: !0
            };
            c.appendChild(e);
            this.fire("tileloadstart", {
                tile: e,
                coords: a
            })
        },
        _tileReady: function(a, c, d) {
            this._map && (c && this.fire("tileerror", {
                error: c,
                tile: d,
                coords: a
            }),
            d = this._tileCoordsToKey(a),
            (d = this._tiles[d]) && (d.loaded = +new Date,
            this._map._fadeAnimated ? (b.DomUtil.setOpacity(d.el, 0),
            b.Util.cancelAnimFrame(this._fadeFrame),
            this._fadeFrame = b.Util.requestAnimFrame(this._updateOpacity, this)) : (d.active = !0,
            this._pruneTiles()),
            c || (b.DomUtil.addClass(d.el, "leaflet-tile-loaded"),
            this.fire("tileload", {
                tile: d.el,
                coords: a
            })),
            this._noTilesToLoad() && (this._loading = !1,
            this.fire("load"),
            b.Browser.ielt9 || !this._map._fadeAnimated ? b.Util.requestAnimFrame(this._pruneTiles, this) : setTimeout(b.bind(this._pruneTiles, this), 250))))
        },
        _getTilePos: function(a) {
            return a.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function(a) {
            var c = new b.Point(this._wrapX ? b.Util.wrapNum(a.x, this._wrapX) : a.x,this._wrapY ? b.Util.wrapNum(a.y, this._wrapY) : a.y);
            return c.z = a.z,
            c
        },
        _pxBoundsToTileRange: function(a) {
            var c = this.getTileSize();
            return new b.Bounds(a.min.unscaleBy(c).floor(),a.max.unscaleBy(c).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function() {
            for (var a in this._tiles)
                if (!this._tiles[a].loaded)
                    return !1;
            return !0
        }
    });
    b.gridLayer = function(a) {
        return new b.GridLayer(a)
    }
    ;
    b.TileLayer = b.GridLayer.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            maxNativeZoom: null,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function(a, c) {
            this._url = a;
            c = b.setOptions(this, c);
            c.detectRetina && b.Browser.retina && 0 < c.maxZoom && (c.tileSize = Math.floor(c.tileSize / 2),
            c.zoomReverse ? (c.zoomOffset--,
            c.minZoom++) : (c.zoomOffset++,
            c.maxZoom--),
            c.minZoom = Math.max(0, c.minZoom));
            "string" == typeof c.subdomains && (c.subdomains = c.subdomains.split(""));
            b.Browser.android || this.on("tileunload", this._onTileRemove)
        },
        setUrl: function(a, c) {
            return this._url = a,
            c || this.redraw(),
            this
        },
        createTile: function(a, c) {
            var d = h.createElement("img");
            return b.DomEvent.on(d, "load", b.bind(this._tileOnLoad, this, c, d)),
            b.DomEvent.on(d, "error", b.bind(this._tileOnError, this, c, d)),
            this.options.crossOrigin && (d.crossOrigin = ""),
            d.alt = "",
            d.src = this.getTileUrl(a),
            d
        },
        getTileUrl: function(a) {
            var c = {
                r: b.Browser.retina ? "@2x" : "",
                s: this._getSubdomain(a),
                x: a.x,
                y: a.y,
                z: this._getZoomForUrl()
            };
            this._map && !this._map.options.crs.infinite && (a = this._globalTileRange.max.y - a.y,
            this.options.tms && (c.y = a),
            c["-y"] = a);
            return b.Util.template(this._url, b.extend(c, this.options))
        },
        _tileOnLoad: function(a, c) {
            b.Browser.ielt9 ? setTimeout(b.bind(a, this, null, c), 0) : a(null, c)
        },
        _tileOnError: function(a, c, b) {
            var d = this.options.errorTileUrl;
            d && (c.src = d);
            a(b, c)
        },
        getTileSize: function() {
            var a = this._map
              , c = b.GridLayer.prototype.getTileSize.call(this)
              , d = this._tileZoom + this.options.zoomOffset
              , f = this.options.maxNativeZoom;
            return null !== f && d > f ? c.divideBy(a.getZoomScale(f, d)).round() : c
        },
        _onTileRemove: function(a) {
            a.tile.onload = null
        },
        _getZoomForUrl: function() {
            var a = this.options
              , c = this._tileZoom;
            return a.zoomReverse && (c = a.maxZoom - c),
            c += a.zoomOffset,
            null !== a.maxNativeZoom ? Math.min(c, a.maxNativeZoom) : c
        },
        _getSubdomain: function(a) {
            return this.options.subdomains[Math.abs(a.x + a.y) % this.options.subdomains.length]
        },
        _abortLoading: function() {
            var a, c;
            for (a in this._tiles)
                this._tiles[a].coords.z !== this._tileZoom && (c = this._tiles[a].el,
                c.onload = b.Util.falseFn,
                c.onerror = b.Util.falseFn,
                c.complete || (c.src = b.Util.emptyImageUrl,
                b.DomUtil.remove(c)))
        }
    });
    b.tileLayer = function(a, c) {
        return new b.TileLayer(a,c)
    }
    ;
    b.TileLayer.WMS = b.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function(a, c) {
            this._url = a;
            var d = b.extend({}, this.defaultWmsParams), f;
            for (f in c)
                f in this.options || (d[f] = c[f]);
            c = b.setOptions(this, c);
            d.width = d.height = c.tileSize * (c.detectRetina && b.Browser.retina ? 2 : 1);
            this.wmsParams = d
        },
        onAdd: function(a) {
            this._crs = this.options.crs || a.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            this.wmsParams[1.3 <= this._wmsVersion ? "crs" : "srs"] = this._crs.code;
            b.TileLayer.prototype.onAdd.call(this, a)
        },
        getTileUrl: function(a) {
            var c = this._tileCoordsToBounds(a)
              , d = this._crs.project(c.getNorthWest())
              , c = this._crs.project(c.getSouthEast())
              , d = (1.3 <= this._wmsVersion && this._crs === b.CRS.EPSG4326 ? [c.y, d.x, d.y, c.x] : [d.x, c.y, c.x, d.y]).join(",");
            a = b.TileLayer.prototype.getTileUrl.call(this, a);
            return a + b.Util.getParamString(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + d
        },
        setParams: function(a, c) {
            return b.extend(this.wmsParams, a),
            c || this.redraw(),
            this
        }
    });
    b.tileLayer.wms = function(a, c) {
        return new b.TileLayer.WMS(a,c)
    }
    ;
    b.ImageOverlay = b.Layer.extend({
        options: {
            opacity: 1,
            alt: "",
            interactive: !1,
            attribution: null,
            crossOrigin: !1
        },
        initialize: function(a, c, d) {
            this._url = a;
            this._bounds = b.latLngBounds(c);
            b.setOptions(this, d)
        },
        onAdd: function() {
            this._image || (this._initImage(),
            1 > this.options.opacity && this._updateOpacity());
            this.options.interactive && (b.DomUtil.addClass(this._image, "leaflet-interactive"),
            this.addInteractiveTarget(this._image));
            this.getPane().appendChild(this._image);
            this._reset()
        },
        onRemove: function() {
            b.DomUtil.remove(this._image);
            this.options.interactive && this.removeInteractiveTarget(this._image)
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._image && this._updateOpacity(),
            this
        },
        setStyle: function(a) {
            return a.opacity && this.setOpacity(a.opacity),
            this
        },
        bringToFront: function() {
            return this._map && b.DomUtil.toFront(this._image),
            this
        },
        bringToBack: function() {
            return this._map && b.DomUtil.toBack(this._image),
            this
        },
        setUrl: function(a) {
            return this._url = a,
            this._image && (this._image.src = a),
            this
        },
        setBounds: function(a) {
            return this._bounds = a,
            this._map && this._reset(),
            this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        getEvents: function() {
            var a = {
                zoom: this._reset,
                viewreset: this._reset
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        getBounds: function() {
            return this._bounds
        },
        getElement: function() {
            return this._image
        },
        _initImage: function() {
            var a = this._image = b.DomUtil.create("img", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated" : ""));
            a.onselectstart = b.Util.falseFn;
            a.onmousemove = b.Util.falseFn;
            a.onload = b.bind(this.fire, this, "load");
            this.options.crossOrigin && (a.crossOrigin = "");
            a.src = this._url;
            a.alt = this.options.alt
        },
        _animateZoom: function(a) {
            var c = this._map.getZoomScale(a.zoom);
            a = this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(), a.zoom, a.center);
            b.DomUtil.setTransform(this._image, a, c)
        },
        _reset: function() {
            var a = this._image
              , c = new b.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast()))
              , d = c.getSize();
            b.DomUtil.setPosition(a, c.min);
            a.style.width = d.x + "px";
            a.style.height = d.y + "px"
        },
        _updateOpacity: function() {
            b.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    });
    b.imageOverlay = function(a, c, d) {
        return new b.ImageOverlay(a,c,d)
    }
    ;
    b.Icon = b.Class.extend({
        initialize: function(a) {
            b.setOptions(this, a)
        },
        createIcon: function(a) {
            return this._createIcon("icon", a)
        },
        createShadow: function(a) {
            return this._createIcon("shadow", a)
        },
        _createIcon: function(a, c) {
            var b = this._getIconUrl(a);
            if (!b) {
                if ("icon" === a)
                    throw Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            b = this._createImg(b, c && "IMG" === c.tagName ? c : null);
            return this._setIconStyles(b, a),
            b
        },
        _setIconStyles: function(a, c) {
            var d = this.options
              , f = d[c + "Size"];
            "number" == typeof f && (f = [f, f]);
            var f = b.point(f)
              , e = b.point("shadow" === c && d.shadowAnchor || d.iconAnchor || f && f.divideBy(2, !0));
            a.className = "leaflet-marker-" + c + " " + (d.className || "");
            e && (a.style.marginLeft = -e.x + "px",
            a.style.marginTop = -e.y + "px");
            f && (a.style.width = f.x + "px",
            a.style.height = f.y + "px")
        },
        _createImg: function(a, c) {
            return c = c || h.createElement("img"),
            c.src = a,
            c
        },
        _getIconUrl: function(a) {
            return b.Browser.retina && this.options[a + "RetinaUrl"] || this.options[a + "Url"]
        }
    });
    b.icon = function(a) {
        return new b.Icon(a)
    }
    ;
    b.Icon.Default = b.Icon.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(a) {
            return b.Icon.Default.imagePath || (b.Icon.Default.imagePath = this._detectIconPath()),
            (this.options.imagePath || b.Icon.Default.imagePath) + b.Icon.prototype._getIconUrl.call(this, a)
        },
        _detectIconPath: function() {
            var a = b.DomUtil.create("div", "leaflet-default-icon-path", h.body)
              , c = b.DomUtil.getStyle(a, "background-image") || b.DomUtil.getStyle(a, "backgroundImage");
            return h.body.removeChild(a),
            0 === c.indexOf("url") ? c.replace(/^url\([\"\']?/, "").replace(/marker-icon\.png[\"\']?\)$/, "") : ""
        }
    });
    b.Marker = b.Layer.extend({
        options: {
            icon: new b.Icon.Default,
            interactive: !0,
            draggable: !1,
            keyboard: !0,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: "markerPane",
            nonBubblingEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"]
        },
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._latlng = b.latLng(a)
        },
        onAdd: function(a) {
            (this._zoomAnimated = this._zoomAnimated && a.options.markerZoomAnimation) && a.on("zoomanim", this._animateZoom, this);
            this._initIcon();
            this.update()
        },
        onRemove: function(a) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0,
            this.dragging.removeHooks());
            this._zoomAnimated && a.off("zoomanim", this._animateZoom, this);
            this._removeIcon();
            this._removeShadow()
        },
        getEvents: function() {
            return {
                zoom: this.update,
                viewreset: this.update
            }
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(a) {
            var c = this._latlng;
            return this._latlng = b.latLng(a),
            this.update(),
            this.fire("move", {
                oldLatLng: c,
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(a) {
            return this.options.zIndexOffset = a,
            this.update()
        },
        setIcon: function(a) {
            return this.options.icon = a,
            this._map && (this._initIcon(),
            this.update()),
            this._popup && this.bindPopup(this._popup, this._popup.options),
            this
        },
        getElement: function() {
            return this._icon
        },
        update: function() {
            if (this._icon) {
                var a = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(a)
            }
            return this
        },
        _initIcon: function() {
            var a = this.options
              , c = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide")
              , d = a.icon.createIcon(this._icon)
              , f = !1;
            d !== this._icon && (this._icon && this._removeIcon(),
            f = !0,
            a.title && (d.title = a.title),
            a.alt && (d.alt = a.alt));
            b.DomUtil.addClass(d, c);
            a.keyboard && (d.tabIndex = "0");
            this._icon = d;
            a.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var d = a.icon.createShadow(this._shadow)
              , e = !1;
            d !== this._shadow && (this._removeShadow(),
            e = !0);
            d && b.DomUtil.addClass(d, c);
            this._shadow = d;
            1 > a.opacity && this._updateOpacity();
            f && this.getPane().appendChild(this._icon);
            this._initInteraction();
            d && e && this.getPane("shadowPane").appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            b.DomUtil.remove(this._icon);
            this.removeInteractiveTarget(this._icon);
            this._icon = null
        },
        _removeShadow: function() {
            this._shadow && b.DomUtil.remove(this._shadow);
            this._shadow = null
        },
        _setPos: function(a) {
            b.DomUtil.setPosition(this._icon, a);
            this._shadow && b.DomUtil.setPosition(this._shadow, a);
            this._zIndex = a.y + this.options.zIndexOffset;
            this._resetZIndex()
        },
        _updateZIndex: function(a) {
            this._icon.style.zIndex = this._zIndex + a
        },
        _animateZoom: function(a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
            this._setPos(a)
        },
        _initInteraction: function() {
            if (this.options.interactive && (b.DomUtil.addClass(this._icon, "leaflet-interactive"),
            this.addInteractiveTarget(this._icon),
            b.Handler.MarkerDrag)) {
                var a = this.options.draggable;
                this.dragging && (a = this.dragging.enabled(),
                this.dragging.disable());
                this.dragging = new b.Handler.MarkerDrag(this);
                a && this.dragging.enable()
            }
        },
        setOpacity: function(a) {
            return this.options.opacity = a,
            this._map && this._updateOpacity(),
            this
        },
        _updateOpacity: function() {
            var a = this.options.opacity;
            b.DomUtil.setOpacity(this._icon, a);
            this._shadow && b.DomUtil.setOpacity(this._shadow, a)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        }
    });
    b.marker = function(a, c) {
        return new b.Marker(a,c)
    }
    ;
    b.DivIcon = b.Icon.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(a) {
            a = a && "DIV" === a.tagName ? a : h.createElement("div");
            var c = this.options;
            if (a.innerHTML = !1 !== c.html ? c.html : "",
            c.bgPos)
                c = b.point(c.bgPos),
                a.style.backgroundPosition = -c.x + "px " + -c.y + "px";
            return this._setIconStyles(a, "icon"),
            a
        },
        createShadow: function() {
            return null
        }
    });
    b.divIcon = function(a) {
        return new b.DivIcon(a)
    }
    ;
    b.DivOverlay = b.Layer.extend({
        options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
        },
        initialize: function(a, c) {
            b.setOptions(this, a);
            this._source = c
        },
        onAdd: function(a) {
            this._zoomAnimated = a._zoomAnimated;
            this._container || this._initLayout();
            a._fadeAnimated && b.DomUtil.setOpacity(this._container, 0);
            clearTimeout(this._removeTimeout);
            this.getPane().appendChild(this._container);
            this.update();
            a._fadeAnimated && b.DomUtil.setOpacity(this._container, 1);
            this.bringToFront()
        },
        onRemove: function(a) {
            a._fadeAnimated ? (b.DomUtil.setOpacity(this._container, 0),
            this._removeTimeout = setTimeout(b.bind(b.DomUtil.remove, b.DomUtil, this._container), 200)) : b.DomUtil.remove(this._container)
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(a) {
            return this._latlng = b.latLng(a),
            this._map && (this._updatePosition(),
            this._adjustPan()),
            this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(a) {
            return this._content = a,
            this.update(),
            this
        },
        getElement: function() {
            return this._container
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden",
            this._updateContent(),
            this._updateLayout(),
            this._updatePosition(),
            this._container.style.visibility = "",
            this._adjustPan())
        },
        getEvents: function() {
            var a = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom),
            a
        },
        isOpen: function() {
            return !!this._map && this._map.hasLayer(this)
        },
        bringToFront: function() {
            return this._map && b.DomUtil.toFront(this._container),
            this
        },
        bringToBack: function() {
            return this._map && b.DomUtil.toBack(this._container),
            this
        },
        _updateContent: function() {
            if (this._content) {
                var a = this._contentNode
                  , c = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof c)
                    a.innerHTML = c;
                else {
                    for (; a.hasChildNodes(); )
                        a.removeChild(a.firstChild);
                    a.appendChild(c)
                }
                this.fire("contentupdate")
            }
        },
        _updatePosition: function() {
            if (this._map) {
                var a = this._map.latLngToLayerPoint(this._latlng)
                  , c = b.point(this.options.offset)
                  , d = this._getAnchor();
                this._zoomAnimated ? b.DomUtil.setPosition(this._container, a.add(d)) : c = c.add(a).add(d);
                a = this._containerBottom = -c.y;
                c = this._containerLeft = -Math.round(this._containerWidth / 2) + c.x;
                this._container.style.bottom = a + "px";
                this._container.style.left = c + "px"
            }
        },
        _getAnchor: function() {
            return [0, 0]
        }
    });
    b.Popup = b.DivOverlay.extend({
        options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            className: ""
        },
        openOn: function(a) {
            return a.openPopup(this),
            this
        },
        onAdd: function(a) {
            b.DivOverlay.prototype.onAdd.call(this, a);
            a.fire("popupopen", {
                popup: this
            });
            this._source && (this._source.fire("popupopen", {
                popup: this
            }, !0),
            this._source instanceof b.Path || this._source.on("preclick", b.DomEvent.stopPropagation))
        },
        onRemove: function(a) {
            b.DivOverlay.prototype.onRemove.call(this, a);
            a.fire("popupclose", {
                popup: this
            });
            this._source && (this._source.fire("popupclose", {
                popup: this
            }, !0),
            this._source instanceof b.Path || this._source.off("preclick", b.DomEvent.stopPropagation))
        },
        getEvents: function() {
            var a = b.DivOverlay.prototype.getEvents.call(this);
            return ("closeOnClick"in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (a.preclick = this._close),
            this.options.keepInView && (a.moveend = this._adjustPan),
            a
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var a = this._container = b.DomUtil.create("div", "leaflet-popup " + (this.options.className || "") + " leaflet-zoom-animated");
            if (this.options.closeButton) {
                var c = this._closeButton = b.DomUtil.create("a", "leaflet-popup-close-button", a);
                c.href = "#close";
                c.innerHTML = "&#215;";
                b.DomEvent.on(c, "click", this._onCloseButtonClick, this)
            }
            c = this._wrapper = b.DomUtil.create("div", "leaflet-popup-content-wrapper", a);
            this._contentNode = b.DomUtil.create("div", "leaflet-popup-content", c);
            b.DomEvent.disableClickPropagation(c).disableScrollPropagation(this._contentNode).on(c, "contextmenu", b.DomEvent.stopPropagation);
            this._tipContainer = b.DomUtil.create("div", "leaflet-popup-tip-container", a);
            this._tip = b.DomUtil.create("div", "leaflet-popup-tip", this._tipContainer)
        },
        _updateLayout: function() {
            var a = this._contentNode
              , c = a.style;
            c.width = "";
            c.whiteSpace = "nowrap";
            var d = a.offsetWidth
              , d = Math.min(d, this.options.maxWidth)
              , d = Math.max(d, this.options.minWidth);
            c.width = d + 1 + "px";
            c.whiteSpace = "";
            c.height = "";
            var d = a.offsetHeight
              , f = this.options.maxHeight;
            f && d > f ? (c.height = f + "px",
            b.DomUtil.addClass(a, "leaflet-popup-scrolled")) : b.DomUtil.removeClass(a, "leaflet-popup-scrolled");
            this._containerWidth = this._container.offsetWidth
        },
        _animateZoom: function(a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
            var c = this._getAnchor();
            b.DomUtil.setPosition(this._container, a.add(c))
        },
        _adjustPan: function() {
            if (!(!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                var a = this._map
                  , c = parseInt(b.DomUtil.getStyle(this._container, "marginBottom"), 10) || 0
                  , c = this._container.offsetHeight + c
                  , d = this._containerWidth
                  , f = new b.Point(this._containerLeft,-c - this._containerBottom);
                f._add(b.DomUtil.getPosition(this._container));
                var f = a.layerPointToContainerPoint(f)
                  , e = b.point(this.options.autoPanPadding)
                  , g = b.point(this.options.autoPanPaddingTopLeft || e)
                  , e = b.point(this.options.autoPanPaddingBottomRight || e)
                  , l = a.getSize()
                  , m = 0
                  , p = 0;
                f.x + d + e.x > l.x && (m = f.x + d - l.x + e.x);
                0 > f.x - m - g.x && (m = f.x - g.x);
                f.y + c + e.y > l.y && (p = f.y + c - l.y + e.y);
                0 > f.y - p - g.y && (p = f.y - g.y);
                (m || p) && a.fire("autopanstart").panBy([m, p])
            }
        },
        _onCloseButtonClick: function(a) {
            this._close();
            b.DomEvent.stop(a)
        },
        _getAnchor: function() {
            return b.point(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
        }
    });
    b.popup = function(a, c) {
        return new b.Popup(a,c)
    }
    ;
    b.Map.mergeOptions({
        closePopupOnClick: !0
    });
    b.Map.include({
        openPopup: function(a, c, d) {
            return a instanceof b.Popup || (a = (new b.Popup(d)).setContent(a)),
            c && a.setLatLng(c),
            this.hasLayer(a) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(),
            this._popup = a,
            this.addLayer(a))
        },
        closePopup: function(a) {
            return a && a !== this._popup || (a = this._popup,
            this._popup = null),
            a && this.removeLayer(a),
            this
        }
    });
    b.Layer.include({
        bindPopup: function(a, c) {
            return a instanceof b.Popup ? (b.setOptions(a, c),
            this._popup = a,
            a._source = this) : (this._popup && !c || (this._popup = new b.Popup(c,this)),
            this._popup.setContent(a)),
            this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }),
            this._popupHandlersAdded = !0),
            this
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }),
            this._popupHandlersAdded = !1,
            this._popup = null),
            this
        },
        openPopup: function(a, c) {
            if (a instanceof b.Layer || (c = a,
            a = this),
            a instanceof b.FeatureGroup)
                for (var d in this._layers) {
                    a = this._layers[d];
                    break
                }
            return c || (c = a.getCenter ? a.getCenter() : a.getLatLng()),
            this._popup && this._map && (this._popup._source = a,
            this._popup.update(),
            this._map.openPopup(this._popup, c)),
            this
        },
        closePopup: function() {
            return this._popup && this._popup._close(),
            this
        },
        togglePopup: function(a) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(a)),
            this
        },
        isPopupOpen: function() {
            return this._popup.isOpen()
        },
        setPopupContent: function(a) {
            return this._popup && this._popup.setContent(a),
            this
        },
        getPopup: function() {
            return this._popup
        },
        _openPopup: function(a) {
            var c = a.layer || a.target;
            if (this._popup && this._map)
                return b.DomEvent.stop(a),
                c instanceof b.Path ? void this.openPopup(a.layer || a.target, a.latlng) : void (this._map.hasLayer(this._popup) && this._popup._source === c ? this.closePopup() : this.openPopup(c, a.latlng))
        },
        _movePopup: function(a) {
            this._popup.setLatLng(a.latlng)
        }
    });
    b.Marker.include({
        _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor || [0, 0]
        }
    });
    b.Tooltip = b.DivOverlay.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function(a) {
            b.DivOverlay.prototype.onAdd.call(this, a);
            this.setOpacity(this.options.opacity);
            a.fire("tooltipopen", {
                tooltip: this
            });
            this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0)
        },
        onRemove: function(a) {
            b.DivOverlay.prototype.onRemove.call(this, a);
            a.fire("tooltipclose", {
                tooltip: this
            });
            this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0)
        },
        getEvents: function() {
            var a = b.DivOverlay.prototype.getEvents.call(this);
            return b.Browser.touch && !this.options.permanent && (a.preclick = this._close),
            a
        },
        _close: function() {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function() {
            this._contentNode = this._container = b.DomUtil.create("div", "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"))
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(a) {
            var c = this._map
              , d = this._container
              , f = c.latLngToContainerPoint(c.getCenter())
              , c = c.layerPointToContainerPoint(a)
              , e = this.options.direction
              , g = d.offsetWidth
              , l = d.offsetHeight
              , m = b.point(this.options.offset)
              , p = this._getAnchor();
            "top" === e ? a = a.add(b.point(-g / 2 + m.x, -l + m.y + p.y)) : "bottom" === e ? a = a.subtract(b.point(g / 2 - m.x, -m.y)) : "center" === e ? a = a.subtract(b.point(g / 2 + m.x, l / 2 - p.y + m.y)) : "right" === e || "auto" === e && c.x < f.x ? (e = "right",
            a = a.add([m.x + p.x, p.y - l / 2 + m.y])) : (e = "left",
            a = a.subtract(b.point(g + p.x - m.x, l / 2 - p.y - m.y)));
            b.DomUtil.removeClass(d, "leaflet-tooltip-right");
            b.DomUtil.removeClass(d, "leaflet-tooltip-left");
            b.DomUtil.removeClass(d, "leaflet-tooltip-top");
            b.DomUtil.removeClass(d, "leaflet-tooltip-bottom");
            b.DomUtil.addClass(d, "leaflet-tooltip-" + e);
            b.DomUtil.setPosition(d, a)
        },
        _updatePosition: function() {
            var a = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(a)
        },
        setOpacity: function(a) {
            this.options.opacity = a;
            this._container && b.DomUtil.setOpacity(this._container, a)
        },
        _animateZoom: function(a) {
            a = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
            this._setPosition(a)
        },
        _getAnchor: function() {
            return b.point(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    });
    b.tooltip = function(a, c) {
        return new b.Tooltip(a,c)
    }
    ;
    b.Map.include({
        openTooltip: function(a, c, d) {
            return a instanceof b.Tooltip || (a = (new b.Tooltip(d)).setContent(a)),
            c && a.setLatLng(c),
            this.hasLayer(a) ? this : this.addLayer(a)
        },
        closeTooltip: function(a) {
            return a && this.removeLayer(a),
            this
        }
    });
    b.Layer.include({
        bindTooltip: function(a, c) {
            return a instanceof b.Tooltip ? (b.setOptions(a, c),
            this._tooltip = a,
            a._source = this) : (this._tooltip && !c || (this._tooltip = b.tooltip(c, this)),
            this._tooltip.setContent(a)),
            this._initTooltipInteractions(),
            this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
            this
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0),
            this.closeTooltip(),
            this._tooltip = null),
            this
        },
        _initTooltipInteractions: function(a) {
            if (a || !this._tooltipHandlersAdded) {
                var c = {
                    remove: this.closeTooltip,
                    move: this._moveTooltip
                };
                this._tooltip.options.permanent ? c.add = this._openTooltip : (c.mouseover = this._openTooltip,
                c.mouseout = this.closeTooltip,
                this._tooltip.options.sticky && (c.mousemove = this._moveTooltip),
                b.Browser.touch && (c.click = this._openTooltip));
                this[a ? "off" : "on"](c);
                this._tooltipHandlersAdded = !a
            }
        },
        openTooltip: function(a, c) {
            if (a instanceof b.Layer || (c = a,
            a = this),
            a instanceof b.FeatureGroup)
                for (var d in this._layers) {
                    a = this._layers[d];
                    break
                }
            return c || (c = a.getCenter ? a.getCenter() : a.getLatLng()),
            this._tooltip && this._map && (this._tooltip._source = a,
            this._tooltip.update(),
            this._map.openTooltip(this._tooltip, c),
            this._tooltip.options.interactive && this._tooltip._container && (b.DomUtil.addClass(this._tooltip._container, "leaflet-clickable"),
            this.addInteractiveTarget(this._tooltip._container))),
            this
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(),
            this._tooltip.options.interactive && this._tooltip._container && (b.DomUtil.removeClass(this._tooltip._container, "leaflet-clickable"),
            this.removeInteractiveTarget(this._tooltip._container))),
            this
        },
        toggleTooltip: function(a) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(a)),
            this
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function(a) {
            return this._tooltip && this._tooltip.setContent(a),
            this
        },
        getTooltip: function() {
            return this._tooltip
        },
        _openTooltip: function(a) {
            var c = a.layer || a.target;
            this._tooltip && this._map && this.openTooltip(c, this._tooltip.options.sticky ? a.latlng : n)
        },
        _moveTooltip: function(a) {
            var c, b, f = a.latlng;
            this._tooltip.options.sticky && a.originalEvent && (c = this._map.mouseEventToContainerPoint(a.originalEvent),
            b = this._map.containerPointToLayerPoint(c),
            f = this._map.layerPointToLatLng(b));
            this._tooltip.setLatLng(f)
        }
    });
    b.Marker.include({
        _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor || [0, 0]
        }
    });
    b.LayerGroup = b.Layer.extend({
        initialize: function(a) {
            this._layers = {};
            var c, b;
            if (a)
                for (c = 0,
                b = a.length; c < b; c++)
                    this.addLayer(a[c])
        },
        addLayer: function(a) {
            var c = this.getLayerId(a);
            return this._layers[c] = a,
            this._map && this._map.addLayer(a),
            this
        },
        removeLayer: function(a) {
            a = a in this._layers ? a : this.getLayerId(a);
            return this._map && this._layers[a] && this._map.removeLayer(this._layers[a]),
            delete this._layers[a],
            this
        },
        hasLayer: function(a) {
            return !!a && (a in this._layers || this.getLayerId(a)in this._layers)
        },
        clearLayers: function() {
            for (var a in this._layers)
                this.removeLayer(this._layers[a]);
            return this
        },
        invoke: function(a) {
            var c, b, f = Array.prototype.slice.call(arguments, 1);
            for (c in this._layers)
                b = this._layers[c],
                b[a] && b[a].apply(b, f);
            return this
        },
        onAdd: function(a) {
            for (var c in this._layers)
                a.addLayer(this._layers[c])
        },
        onRemove: function(a) {
            for (var c in this._layers)
                a.removeLayer(this._layers[c])
        },
        eachLayer: function(a, c) {
            for (var b in this._layers)
                a.call(c, this._layers[b]);
            return this
        },
        getLayer: function(a) {
            return this._layers[a]
        },
        getLayers: function() {
            var a = [], c;
            for (c in this._layers)
                a.push(this._layers[c]);
            return a
        },
        setZIndex: function(a) {
            return this.invoke("setZIndex", a)
        },
        getLayerId: function(a) {
            return b.stamp(a)
        }
    });
    b.layerGroup = function(a) {
        return new b.LayerGroup(a)
    }
    ;
    b.FeatureGroup = b.LayerGroup.extend({
        addLayer: function(a) {
            return this.hasLayer(a) ? this : (a.addEventParent(this),
            b.LayerGroup.prototype.addLayer.call(this, a),
            this.fire("layeradd", {
                layer: a
            }))
        },
        removeLayer: function(a) {
            return this.hasLayer(a) ? (a in this._layers && (a = this._layers[a]),
            a.removeEventParent(this),
            b.LayerGroup.prototype.removeLayer.call(this, a),
            this.fire("layerremove", {
                layer: a
            })) : this
        },
        setStyle: function(a) {
            return this.invoke("setStyle", a)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var a = new b.LatLngBounds, c;
            for (c in this._layers) {
                var d = this._layers[c];
                a.extend(d.getBounds ? d.getBounds() : d.getLatLng())
            }
            return a
        }
    });
    b.featureGroup = function(a) {
        return new b.FeatureGroup(a)
    }
    ;
    b.Renderer = b.Layer.extend({
        options: {
            padding: .1
        },
        initialize: function(a) {
            b.setOptions(this, a);
            b.stamp(this)
        },
        onAdd: function() {
            this._container || (this._initContainer(),
            this._zoomAnimated && b.DomUtil.addClass(this._container, "leaflet-zoom-animated"));
            this.getPane().appendChild(this._container);
            this._update()
        },
        onRemove: function() {
            b.DomUtil.remove(this._container)
        },
        getEvents: function() {
            var a = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update
            };
            return this._zoomAnimated && (a.zoomanim = this._onAnimZoom),
            a
        },
        _onAnimZoom: function(a) {
            this._updateTransform(a.center, a.zoom)
        },
        _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
        },
        _updateTransform: function(a, c) {
            var d = this._map.getZoomScale(c, this._zoom)
              , f = b.DomUtil.getPosition(this._container)
              , e = this._map.getSize().multiplyBy(.5 + this.options.padding)
              , g = this._map.project(this._center, c)
              , g = this._map.project(a, c).subtract(g)
              , f = e.multiplyBy(-d).add(f).add(e).subtract(g);
            b.Browser.any3d ? b.DomUtil.setTransform(this._container, f, d) : b.DomUtil.setPosition(this._container, f)
        },
        _reset: function() {
            this._update();
            this._updateTransform(this._center, this._zoom)
        },
        _update: function() {
            var a = this.options.padding
              , c = this._map.getSize()
              , d = this._map.containerPointToLayerPoint(c.multiplyBy(-a)).round();
            this._bounds = new b.Bounds(d,d.add(c.multiplyBy(1 + 2 * a)).round());
            this._center = this._map.getCenter();
            this._zoom = this._map.getZoom()
        }
    });
    b.Map.include({
        getRenderer: function(a) {
            a = a.options.renderer || this._getPaneRenderer(a.options.pane) || this.options.renderer || this._renderer;
            return a || (a = this._renderer = this.options.preferCanvas && b.canvas() || b.svg()),
            this.hasLayer(a) || this.addLayer(a),
            a
        },
        _getPaneRenderer: function(a) {
            if ("overlayPane" === a || a === n)
                return !1;
            var c = this._paneRenderers[a];
            return c === n && (c = b.SVG && b.svg({
                pane: a
            }) || b.Canvas && b.canvas({
                pane: a
            }),
            this._paneRenderers[a] = c),
            c
        }
    });
    b.Path = b.Layer.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0
        },
        beforeAdd: function(a) {
            this._renderer = a.getRenderer(this)
        },
        onAdd: function() {
            this._renderer._initPath(this);
            this._reset();
            this._renderer._addPath(this);
            this._renderer.on("update", this._update, this)
        },
        onRemove: function() {
            this._renderer._removePath(this);
            this._renderer.off("update", this._update, this)
        },
        getEvents: function() {
            return {
                zoomend: this._project,
                viewreset: this._reset
            }
        },
        redraw: function() {
            return this._map && this._renderer._updatePath(this),
            this
        },
        setStyle: function(a) {
            return b.setOptions(this, a),
            this._renderer && this._renderer._updateStyle(this),
            this
        },
        bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this),
            this
        },
        bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this),
            this
        },
        getElement: function() {
            return this._path
        },
        _reset: function() {
            this._project();
            this._update()
        },
        _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (b.Browser.touch ? 10 : 0)
        }
    });
    b.LineUtil = {
        simplify: function(a, c) {
            if (!c || !a.length)
                return a.slice();
            var b = c * c;
            return a = this._reducePoints(a, b),
            this._simplifyDP(a, b)
        },
        pointToSegmentDistance: function(a, c, b) {
            return Math.sqrt(this._sqClosestPointOnSegment(a, c, b, !0))
        },
        closestPointOnSegment: function(a, c, b) {
            return this._sqClosestPointOnSegment(a, c, b)
        },
        _simplifyDP: function(a, c) {
            var b = a.length
              , f = new (typeof Uint8Array != n + "" ? Uint8Array : Array)(b);
            f[0] = f[b - 1] = 1;
            this._simplifyDPStep(a, f, c, 0, b - 1);
            var e, g = [];
            for (e = 0; e < b; e++)
                f[e] && g.push(a[e]);
            return g
        },
        _simplifyDPStep: function(a, b, d, f, e) {
            var c, k, g, p = 0;
            for (k = f + 1; k <= e - 1; k++)
                g = this._sqClosestPointOnSegment(a[k], a[f], a[e], !0),
                g > p && (c = k,
                p = g);
            p > d && (b[c] = 1,
            this._simplifyDPStep(a, b, d, f, c),
            this._simplifyDPStep(a, b, d, c, e))
        },
        _reducePoints: function(a, b) {
            for (var c = [a[0]], f = 1, e = 0, g = a.length; f < g; f++)
                this._sqDist(a[f], a[e]) > b && (c.push(a[f]),
                e = f);
            return e < g - 1 && c.push(a[g - 1]),
            c
        },
        clipSegment: function(a, b, d, f, e) {
            var c, g, k = f ? this._lastCode : this._getBitCode(a, d), p = this._getBitCode(b, d);
            for (this._lastCode = p; ; ) {
                if (!(k | p))
                    return [a, b];
                if (k & p)
                    return !1;
                f = k || p;
                c = this._getEdgeIntersection(a, b, f, d, e);
                g = this._getBitCode(c, d);
                f === k ? (a = c,
                k = g) : (b = c,
                p = g)
            }
        },
        _getEdgeIntersection: function(a, c, d, f, e) {
            var g, k, m = c.x - a.x;
            c = c.y - a.y;
            var p = f.min;
            f = f.max;
            return 8 & d ? (g = a.x + m * (f.y - a.y) / c,
            k = f.y) : 4 & d ? (g = a.x + m * (p.y - a.y) / c,
            k = p.y) : 2 & d ? (g = f.x,
            k = a.y + c * (f.x - a.x) / m) : 1 & d && (g = p.x,
            k = a.y + c * (p.x - a.x) / m),
            new b.Point(g,k,e)
        },
        _getBitCode: function(a, b) {
            var c = 0;
            return a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2),
            a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8),
            c
        },
        _sqDist: function(a, b) {
            var c = b.x - a.x
              , f = b.y - a.y;
            return c * c + f * f
        },
        _sqClosestPointOnSegment: function(a, c, d, f) {
            var e, g = c.x;
            c = c.y;
            var l = d.x - g
              , m = d.y - c
              , p = l * l + m * m;
            return 0 < p && (e = ((a.x - g) * l + (a.y - c) * m) / p,
            1 < e ? (g = d.x,
            c = d.y) : 0 < e && (g += l * e,
            c += m * e)),
            l = a.x - g,
            m = a.y - c,
            f ? l * l + m * m : new b.Point(g,c)
        }
    };
    b.Polyline = b.Path.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._setLatLngs(a)
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(a) {
            return this._setLatLngs(a),
            this.redraw()
        },
        isEmpty: function() {
            return !this._latlngs.length
        },
        closestLayerPoint: function(a) {
            for (var c, d, f = 1 / 0, e = null, g = b.LineUtil._sqClosestPointOnSegment, l = 0, m = this._parts.length; l < m; l++)
                for (var p = this._parts[l], h = 1, n = p.length; h < n; h++) {
                    c = p[h - 1];
                    d = p[h];
                    var q = g(a, c, d, !0);
                    q < f && (f = q,
                    e = g(a, c, d))
                }
            return e && (e.distance = Math.sqrt(f)),
            e
        },
        getCenter: function() {
            if (!this._map)
                throw Error("Must add layer to map before using getCenter()");
            var a, b, d, f, e, g, l, m = this._rings[0], p = m.length;
            if (!p)
                return null;
            for (b = a = 0; a < p - 1; a++)
                b += m[a].distanceTo(m[a + 1]) / 2;
            if (0 === b)
                return this._map.layerPointToLatLng(m[0]);
            for (f = a = 0; a < p - 1; a++)
                if (e = m[a],
                g = m[a + 1],
                d = e.distanceTo(g),
                f += d,
                f > b)
                    return l = (f - b) / d,
                    this._map.layerPointToLatLng([g.x - l * (g.x - e.x), g.y - l * (g.y - e.y)])
        },
        getBounds: function() {
            return this._bounds
        },
        addLatLng: function(a, c) {
            return c = c || this._defaultShape(),
            a = b.latLng(a),
            c.push(a),
            this._bounds.extend(a),
            this.redraw()
        },
        _setLatLngs: function(a) {
            this._bounds = new b.LatLngBounds;
            this._latlngs = this._convertLatLngs(a)
        },
        _defaultShape: function() {
            return b.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0]
        },
        _convertLatLngs: function(a) {
            for (var c = [], d = b.Polyline._flat(a), f = 0, e = a.length; f < e; f++)
                d ? (c[f] = b.latLng(a[f]),
                this._bounds.extend(c[f])) : c[f] = this._convertLatLngs(a[f]);
            return c
        },
        _project: function() {
            var a = new b.Bounds;
            this._rings = [];
            this._projectLatlngs(this._latlngs, this._rings, a);
            var c = this._clickTolerance()
              , c = new b.Point(c,c);
            this._bounds.isValid() && a.isValid() && (a.min._subtract(c),
            a.max._add(c),
            this._pxBounds = a)
        },
        _projectLatlngs: function(a, c, d) {
            var f, e, g = a.length;
            if (a[0]instanceof b.LatLng) {
                e = [];
                for (f = 0; f < g; f++)
                    e[f] = this._map.latLngToLayerPoint(a[f]),
                    d.extend(e[f]);
                c.push(e)
            } else
                for (f = 0; f < g; f++)
                    this._projectLatlngs(a[f], c, d)
        },
        _clipPoints: function() {
            var a = this._renderer._bounds;
            if (this._parts = [],
            this._pxBounds && this._pxBounds.intersects(a)) {
                if (this.options.noClip)
                    return void (this._parts = this._rings);
                var c, d, f, e, g, l, m, p = this._parts;
                f = c = 0;
                for (e = this._rings.length; c < e; c++)
                    for (m = this._rings[c],
                    d = 0,
                    g = m.length; d < g - 1; d++)
                        (l = b.LineUtil.clipSegment(m[d], m[d + 1], a, d, !0)) && (p[f] = p[f] || [],
                        p[f].push(l[0]),
                        l[1] === m[d + 1] && d !== g - 2 || (p[f].push(l[1]),
                        f++))
            }
        },
        _simplifyPoints: function() {
            for (var a = this._parts, c = this.options.smoothFactor, d = 0, f = a.length; d < f; d++)
                a[d] = b.LineUtil.simplify(a[d], c)
        },
        _update: function() {
            this._map && (this._clipPoints(),
            this._simplifyPoints(),
            this._updatePath())
        },
        _updatePath: function() {
            this._renderer._updatePoly(this)
        }
    });
    b.polyline = function(a, c) {
        return new b.Polyline(a,c)
    }
    ;
    b.Polyline._flat = function(a) {
        return !b.Util.isArray(a[0]) || "object" != typeof a[0][0] && "undefined" != typeof a[0][0]
    }
    ;
    b.PolyUtil = {};
    b.PolyUtil.clipPolygon = function(a, c, d) {
        var f, e, g, l, m, p, h, n, q = [1, 4, 2, 8], r = b.LineUtil;
        e = 0;
        for (p = a.length; e < p; e++)
            a[e]._code = r._getBitCode(a[e], c);
        for (l = 0; 4 > l; l++) {
            h = q[l];
            f = [];
            e = 0;
            p = a.length;
            for (g = p - 1; e < p; g = e++)
                m = a[e],
                g = a[g],
                m._code & h ? g._code & h || (n = r._getEdgeIntersection(g, m, h, c, d),
                n._code = r._getBitCode(n, c),
                f.push(n)) : (g._code & h && (n = r._getEdgeIntersection(g, m, h, c, d),
                n._code = r._getBitCode(n, c),
                f.push(n)),
                f.push(m));
            a = f
        }
        return a
    }
    ;
    b.Polygon = b.Polyline.extend({
        options: {
            fill: !0
        },
        isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function() {
            if (!this._map)
                throw Error("Must add layer to map before using getCenter()");
            var a, b, d, f, e, g, l, m, p = this._rings[0], h = p.length;
            if (!h)
                return null;
            a = e = g = l = 0;
            for (b = h - 1; a < h; b = a++)
                d = p[a],
                b = p[b],
                f = d.y * b.x - b.y * d.x,
                g += (d.x + b.x) * f,
                l += (d.y + b.y) * f,
                e += 3 * f;
            return m = 0 === e ? p[0] : [g / e, l / e],
            this._map.layerPointToLatLng(m)
        },
        _convertLatLngs: function(a) {
            a = b.Polyline.prototype._convertLatLngs.call(this, a);
            var c = a.length;
            return 2 <= c && a[0]instanceof b.LatLng && a[0].equals(a[c - 1]) && a.pop(),
            a
        },
        _setLatLngs: function(a) {
            b.Polyline.prototype._setLatLngs.call(this, a);
            b.Polyline._flat(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function() {
            return b.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function() {
            var a = this._renderer._bounds
              , c = this.options.weight
              , c = new b.Point(c,c);
            if (a = new b.Bounds(a.min.subtract(c),a.max.add(c)),
            this._parts = [],
            this._pxBounds && this._pxBounds.intersects(a)) {
                if (this.options.noClip)
                    return void (this._parts = this._rings);
                for (var d = 0, f = this._rings.length; d < f; d++)
                    c = b.PolyUtil.clipPolygon(this._rings[d], a, !0),
                    c.length && this._parts.push(c)
            }
        },
        _updatePath: function() {
            this._renderer._updatePoly(this, !0)
        }
    });
    b.polygon = function(a, c) {
        return new b.Polygon(a,c)
    }
    ;
    b.Rectangle = b.Polygon.extend({
        initialize: function(a, c) {
            b.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), c)
        },
        setBounds: function(a) {
            return this.setLatLngs(this._boundsToLatLngs(a))
        },
        _boundsToLatLngs: function(a) {
            return a = b.latLngBounds(a),
            [a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
        }
    });
    b.rectangle = function(a, c) {
        return new b.Rectangle(a,c)
    }
    ;
    b.CircleMarker = b.Path.extend({
        options: {
            fill: !0,
            radius: 10
        },
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._latlng = b.latLng(a);
            this._radius = this.options.radius
        },
        setLatLng: function(a) {
            return this._latlng = b.latLng(a),
            this.redraw(),
            this.fire("move", {
                latlng: this._latlng
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setRadius: function(a) {
            return this.options.radius = this._radius = a,
            this.redraw()
        },
        getRadius: function() {
            return this._radius
        },
        setStyle: function(a) {
            var c = a && a.radius || this._radius;
            return b.Path.prototype.setStyle.call(this, a),
            this.setRadius(c),
            this
        },
        _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._updateBounds()
        },
        _updateBounds: function() {
            var a = this._radius
              , c = this._radiusY || a
              , d = this._clickTolerance()
              , a = [a + d, c + d];
            this._pxBounds = new b.Bounds(this._point.subtract(a),this._point.add(a))
        },
        _update: function() {
            this._map && this._updatePath()
        },
        _updatePath: function() {
            this._renderer._updateCircle(this)
        },
        _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        }
    });
    b.circleMarker = function(a, c) {
        return new b.CircleMarker(a,c)
    }
    ;
    b.Circle = b.CircleMarker.extend({
        initialize: function(a, c, d) {
            if ("number" == typeof c && (c = b.extend({}, d, {
                radius: c
            })),
            b.setOptions(this, c),
            this._latlng = b.latLng(a),
            isNaN(this.options.radius))
                throw Error("Circle radius cannot be NaN");
            this._mRadius = this.options.radius
        },
        setRadius: function(a) {
            return this._mRadius = a,
            this.redraw()
        },
        getRadius: function() {
            return this._mRadius
        },
        getBounds: function() {
            var a = [this._radius, this._radiusY || this._radius];
            return new b.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(a)),this._map.layerPointToLatLng(this._point.add(a)))
        },
        setStyle: b.Path.prototype.setStyle,
        _project: function() {
            var a = this._latlng.lng
              , c = this._latlng.lat
              , d = this._map
              , f = d.options.crs;
            if (f.distance === b.CRS.Earth.distance) {
                var e = Math.PI / 180
                  , f = this._mRadius / b.CRS.Earth.R / e
                  , g = d.project([c + f, a])
                  , l = d.project([c - f, a])
                  , l = g.add(l).divideBy(2)
                  , m = d.unproject(l).lat
                  , e = Math.acos((Math.cos(f * e) - Math.sin(c * e) * Math.sin(m * e)) / (Math.cos(c * e) * Math.cos(m * e))) / e;
                (isNaN(e) || 0 === e) && (e = f / Math.cos(Math.PI / 180 * c));
                this._point = l.subtract(d.getPixelOrigin());
                this._radius = isNaN(e) ? 0 : Math.max(Math.round(l.x - d.project([m, a - e]).x), 1);
                this._radiusY = Math.max(Math.round(l.y - g.y), 1)
            } else
                a = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0])),
                this._point = d.latLngToLayerPoint(this._latlng),
                this._radius = this._point.x - d.latLngToLayerPoint(a).x;
            this._updateBounds()
        }
    });
    b.circle = function(a, c, d) {
        return new b.Circle(a,c,d)
    }
    ;
    b.SVG = b.Renderer.extend({
        getEvents: function() {
            var a = b.Renderer.prototype.getEvents.call(this);
            return a.zoomstart = this._onZoomStart,
            a
        },
        _initContainer: function() {
            this._container = b.SVG.create("svg");
            this._container.setAttribute("pointer-events", "none");
            this._rootGroup = b.SVG.create("g");
            this._container.appendChild(this._rootGroup)
        },
        _onZoomStart: function() {
            this._update()
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                b.Renderer.prototype._update.call(this);
                var a = this._bounds
                  , c = a.getSize()
                  , d = this._container;
                this._svgSize && this._svgSize.equals(c) || (this._svgSize = c,
                d.setAttribute("width", c.x),
                d.setAttribute("height", c.y));
                b.DomUtil.setPosition(d, a.min);
                d.setAttribute("viewBox", [a.min.x, a.min.y, c.x, c.y].join(" "));
                this.fire("update")
            }
        },
        _initPath: function(a) {
            var c = a._path = b.SVG.create("path");
            a.options.className && b.DomUtil.addClass(c, a.options.className);
            a.options.interactive && b.DomUtil.addClass(c, "leaflet-interactive");
            this._updateStyle(a)
        },
        _addPath: function(a) {
            this._rootGroup.appendChild(a._path);
            a.addInteractiveTarget(a._path)
        },
        _removePath: function(a) {
            b.DomUtil.remove(a._path);
            a.removeInteractiveTarget(a._path)
        },
        _updatePath: function(a) {
            a._project();
            a._update()
        },
        _updateStyle: function(a) {
            var b = a._path;
            a = a.options;
            b && (a.stroke ? (b.setAttribute("stroke", a.color),
            b.setAttribute("stroke-opacity", a.opacity),
            b.setAttribute("stroke-width", a.weight),
            b.setAttribute("stroke-linecap", a.lineCap),
            b.setAttribute("stroke-linejoin", a.lineJoin),
            a.dashArray ? b.setAttribute("stroke-dasharray", a.dashArray) : b.removeAttribute("stroke-dasharray"),
            a.dashOffset ? b.setAttribute("stroke-dashoffset", a.dashOffset) : b.removeAttribute("stroke-dashoffset")) : b.setAttribute("stroke", "none"),
            a.fill ? (b.setAttribute("fill", a.fillColor || a.color),
            b.setAttribute("fill-opacity", a.fillOpacity),
            b.setAttribute("fill-rule", a.fillRule || "evenodd")) : b.setAttribute("fill", "none"))
        },
        _updatePoly: function(a, c) {
            this._setPath(a, b.SVG.pointsToPath(a._parts, c))
        },
        _updateCircle: function(a) {
            var b = a._point
              , d = a._radius
              , f = "a" + d + "," + (a._radiusY || d) + " 0 1,0 "
              , b = a._empty() ? "M0 0" : "M" + (b.x - d) + "," + b.y + f + 2 * d + ",0 " + f + 2 * -d + ",0 ";
            this._setPath(a, b)
        },
        _setPath: function(a, b) {
            a._path.setAttribute("d", b)
        },
        _bringToFront: function(a) {
            b.DomUtil.toFront(a._path)
        },
        _bringToBack: function(a) {
            b.DomUtil.toBack(a._path)
        }
    });
    b.extend(b.SVG, {
        create: function(a) {
            return h.createElementNS("http://www.w3.org/2000/svg", a)
        },
        pointsToPath: function(a, c) {
            var d, f, e, g, l, m, p = "";
            d = 0;
            for (e = a.length; d < e; d++) {
                l = a[d];
                f = 0;
                for (g = l.length; f < g; f++)
                    m = l[f],
                    p += (f ? "L" : "M") + m.x + " " + m.y;
                p += c ? b.Browser.svg ? "z" : "x" : ""
            }
            return p || "M0 0"
        }
    });
    b.Browser.svg = !(!h.createElementNS || !b.SVG.create("svg").createSVGRect);
    b.svg = function(a) {
        return b.Browser.svg || b.Browser.vml ? new b.SVG(a) : null
    }
    ;
    b.Browser.vml = !b.Browser.svg && function() {
        try {
            var a = h.createElement("div");
            a.innerHTML = '<v:shape adj="1"/>';
            var b = a.firstChild;
            return b.style.behavior = "url(#default#VML)",
            b && "object" == typeof b.adj
        } catch (d) {
            return !1
        }
    }();
    b.SVG.include(b.Browser.vml ? {
        _initContainer: function() {
            this._container = b.DomUtil.create("div", "leaflet-vml-container")
        },
        _update: function() {
            this._map._animatingZoom || (b.Renderer.prototype._update.call(this),
            this.fire("update"))
        },
        _initPath: function(a) {
            var c = a._container = b.SVG.create("shape");
            b.DomUtil.addClass(c, "leaflet-vml-shape " + (this.options.className || ""));
            c.coordsize = "1 1";
            a._path = b.SVG.create("path");
            c.appendChild(a._path);
            this._updateStyle(a)
        },
        _addPath: function(a) {
            var b = a._container;
            this._container.appendChild(b);
            a.options.interactive && a.addInteractiveTarget(b)
        },
        _removePath: function(a) {
            var c = a._container;
            b.DomUtil.remove(c);
            a.removeInteractiveTarget(c)
        },
        _updateStyle: function(a) {
            var c = a._stroke
              , d = a._fill
              , f = a.options
              , e = a._container;
            e.stroked = !!f.stroke;
            e.filled = !!f.fill;
            f.stroke ? (c || (c = a._stroke = b.SVG.create("stroke")),
            e.appendChild(c),
            c.weight = f.weight + "px",
            c.color = f.color,
            c.opacity = f.opacity,
            f.dashArray ? c.dashStyle = b.Util.isArray(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : c.dashStyle = "",
            c.endcap = f.lineCap.replace("butt", "flat"),
            c.joinstyle = f.lineJoin) : c && (e.removeChild(c),
            a._stroke = null);
            f.fill ? (d || (d = a._fill = b.SVG.create("fill")),
            e.appendChild(d),
            d.color = f.fillColor || f.color,
            d.opacity = f.fillOpacity) : d && (e.removeChild(d),
            a._fill = null)
        },
        _updateCircle: function(a) {
            var b = a._point.round()
              , d = Math.round(a._radius)
              , f = Math.round(a._radiusY || d);
            this._setPath(a, a._empty() ? "M0 0" : "AL " + b.x + "," + b.y + " " + d + "," + f + " 0,23592600")
        },
        _setPath: function(a, b) {
            a._path.v = b
        },
        _bringToFront: function(a) {
            b.DomUtil.toFront(a._container)
        },
        _bringToBack: function(a) {
            b.DomUtil.toBack(a._container)
        }
    } : {});
    b.Browser.vml && (b.SVG.create = function() {
        try {
            return h.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
            function(a) {
                return h.createElement("<lvml:" + a + ' class="lvml">')
            }
        } catch (a) {
            return function(a) {
                return h.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }());
    b.Canvas = b.Renderer.extend({
        onAdd: function() {
            b.Renderer.prototype.onAdd.call(this);
            this._layers = this._layers || {};
            this._draw()
        },
        _initContainer: function() {
            var a = this._container = h.createElement("canvas");
            b.DomEvent.on(a, "mousemove", b.Util.throttle(this._onMouseMove, 32, this), this).on(a, "click dblclick mousedown mouseup contextmenu", this._onClick, this).on(a, "mouseout", this._handleMouseOut, this);
            this._ctx = a.getContext("2d")
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                this._drawnLayers = {};
                b.Renderer.prototype._update.call(this);
                var a = this._bounds
                  , c = this._container
                  , d = a.getSize()
                  , f = b.Browser.retina ? 2 : 1;
                b.DomUtil.setPosition(c, a.min);
                c.width = f * d.x;
                c.height = f * d.y;
                c.style.width = d.x + "px";
                c.style.height = d.y + "px";
                b.Browser.retina && this._ctx.scale(2, 2);
                this._ctx.translate(-a.min.x, -a.min.y);
                this.fire("update")
            }
        },
        _initPath: function(a) {
            this._updateDashArray(a);
            this._layers[b.stamp(a)] = a
        },
        _addPath: b.Util.falseFn,
        _removePath: function(a) {
            a._removed = !0;
            this._requestRedraw(a)
        },
        _updatePath: function(a) {
            this._redrawBounds = a._pxBounds;
            this._draw(!0);
            a._project();
            a._update();
            this._draw();
            this._redrawBounds = null
        },
        _updateStyle: function(a) {
            this._updateDashArray(a);
            this._requestRedraw(a)
        },
        _updateDashArray: function(a) {
            if (a.options.dashArray) {
                var b, d = a.options.dashArray.split(","), f = [];
                for (b = 0; b < d.length; b++)
                    f.push(Number(d[b]));
                a.options._dashArray = f
            }
        },
        _requestRedraw: function(a) {
            if (this._map) {
                var c = (a.options.weight || 0) + 1;
                this._redrawBounds = this._redrawBounds || new b.Bounds;
                this._redrawBounds.extend(a._pxBounds.min.subtract([c, c]));
                this._redrawBounds.extend(a._pxBounds.max.add([c, c]));
                this._redrawRequest = this._redrawRequest || b.Util.requestAnimFrame(this._redraw, this)
            }
        },
        _redraw: function() {
            this._redrawRequest = null;
            this._draw(!0);
            this._draw();
            this._redrawBounds = null
        },
        _draw: function(a) {
            this._clear = a;
            var b, d = this._redrawBounds;
            this._ctx.save();
            d && (this._ctx.beginPath(),
            this._ctx.rect(d.min.x, d.min.y, d.max.x - d.min.x, d.max.y - d.min.y),
            this._ctx.clip());
            for (var f in this._layers)
                b = this._layers[f],
                (!d || b._pxBounds && b._pxBounds.intersects(d)) && b._updatePath(),
                a && b._removed && (delete b._removed,
                delete this._layers[f]);
            this._ctx.restore()
        },
        _updatePoly: function(a, b) {
            var c, f, e, g, l = a._parts, m = l.length, p = this._ctx;
            if (m) {
                this._drawnLayers[a._leaflet_id] = a;
                p.beginPath();
                p.setLineDash && p.setLineDash(a.options && a.options._dashArray || []);
                for (c = 0; c < m; c++) {
                    f = 0;
                    for (e = l[c].length; f < e; f++)
                        g = l[c][f],
                        p[f ? "lineTo" : "moveTo"](g.x, g.y);
                    b && p.closePath()
                }
                this._fillStroke(p, a)
            }
        },
        _updateCircle: function(a) {
            if (!a._empty()) {
                var b = a._point
                  , d = this._ctx
                  , f = a._radius
                  , e = (a._radiusY || f) / f;
                this._drawnLayers[a._leaflet_id] = a;
                1 !== e && (d.save(),
                d.scale(1, e));
                d.beginPath();
                d.arc(b.x, b.y / e, f, 0, 2 * Math.PI, !1);
                1 !== e && d.restore();
                this._fillStroke(d, a)
            }
        },
        _fillStroke: function(a, b) {
            var c = this._clear
              , f = b.options;
            a.globalCompositeOperation = c ? "destination-out" : "source-over";
            f.fill && (a.globalAlpha = c ? 1 : f.fillOpacity,
            a.fillStyle = f.fillColor || f.color,
            a.fill(f.fillRule || "evenodd"));
            f.stroke && 0 !== f.weight && (a.globalAlpha = c ? 1 : f.opacity,
            b._prevWeight = a.lineWidth = c ? b._prevWeight + 1 : f.weight,
            a.strokeStyle = f.color,
            a.lineCap = f.lineCap,
            a.lineJoin = f.lineJoin,
            a.stroke())
        },
        _onClick: function(a) {
            var c, d = this._map.mouseEventToLayerPoint(a), f = [], e;
            for (e in this._layers)
                c = this._layers[e],
                c.options.interactive && c._containsPoint(d) && !this._map._draggableMoved(c) && (b.DomEvent._fakeStop(a),
                f.push(c));
            f.length && this._fireEvent(f, a)
        },
        _onMouseMove: function(a) {
            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                var b = this._map.mouseEventToLayerPoint(a);
                this._handleMouseOut(a, b);
                this._handleMouseHover(a, b)
            }
        },
        _handleMouseOut: function(a, c) {
            var d = this._hoveredLayer;
            !d || "mouseout" !== a.type && d._containsPoint(c) || (b.DomUtil.removeClass(this._container, "leaflet-interactive"),
            this._fireEvent([d], a, "mouseout"),
            this._hoveredLayer = null)
        },
        _handleMouseHover: function(a, c) {
            var d, f;
            for (d in this._drawnLayers)
                f = this._drawnLayers[d],
                f.options.interactive && f._containsPoint(c) && (b.DomUtil.addClass(this._container, "leaflet-interactive"),
                this._fireEvent([f], a, "mouseover"),
                this._hoveredLayer = f);
            this._hoveredLayer && this._fireEvent([this._hoveredLayer], a)
        },
        _fireEvent: function(a, b, d) {
            this._map._fireDOMEvent(b, d || b.type, a)
        },
        _bringToFront: b.Util.falseFn,
        _bringToBack: b.Util.falseFn
    });
    b.Browser.canvas = !!h.createElement("canvas").getContext;
    b.canvas = function(a) {
        return b.Browser.canvas ? new b.Canvas(a) : null
    }
    ;
    b.Polyline.prototype._containsPoint = function(a, c) {
        var d, f, e, g, l, m, p = this._clickTolerance();
        if (!this._pxBounds.contains(a))
            return !1;
        d = 0;
        for (g = this._parts.length; d < g; d++)
            for (m = this._parts[d],
            f = 0,
            l = m.length,
            e = l - 1; f < l; e = f++)
                if ((c || 0 !== f) && b.LineUtil.pointToSegmentDistance(a, m[e], m[f]) <= p)
                    return !0;
        return !1
    }
    ;
    b.Polygon.prototype._containsPoint = function(a) {
        var c, d, f, e, g, l, m, p = !1;
        if (!this._pxBounds.contains(a))
            return !1;
        e = 0;
        for (l = this._parts.length; e < l; e++)
            for (c = this._parts[e],
            g = 0,
            m = c.length,
            f = m - 1; g < m; f = g++)
                d = c[g],
                f = c[f],
                d.y > a.y != f.y > a.y && a.x < (f.x - d.x) * (a.y - d.y) / (f.y - d.y) + d.x && (p = !p);
        return p || b.Polyline.prototype._containsPoint.call(this, a, !0)
    }
    ;
    b.CircleMarker.prototype._containsPoint = function(a) {
        return a.distanceTo(this._point) <= this._radius + this._clickTolerance()
    }
    ;
    b.GeoJSON = b.FeatureGroup.extend({
        initialize: function(a, c) {
            b.setOptions(this, c);
            this._layers = {};
            a && this.addData(a)
        },
        addData: function(a) {
            var c, d, f = b.Util.isArray(a) ? a : a.features;
            if (f) {
                a = 0;
                for (c = f.length; a < c; a++)
                    d = f[a],
                    (d.geometries || d.geometry || d.features || d.coordinates) && this.addData(d);
                return this
            }
            f = this.options;
            return f.filter && !f.filter(a) ? this : (c = b.GeoJSON.geometryToLayer(a, f)) ? (c.feature = b.GeoJSON.asFeature(a),
            c.defaultOptions = c.options,
            this.resetStyle(c),
            f.onEachFeature && f.onEachFeature(a, c),
            this.addLayer(c)) : this
        },
        resetStyle: function(a) {
            return a.options = b.Util.extend({}, a.defaultOptions),
            this._setLayerStyle(a, this.options.style),
            this
        },
        setStyle: function(a) {
            return this.eachLayer(function(b) {
                this._setLayerStyle(b, a)
            }, this)
        },
        _setLayerStyle: function(a, b) {
            "function" == typeof b && (b = b(a.feature));
            a.setStyle && a.setStyle(b)
        }
    });
    b.extend(b.GeoJSON, {
        geometryToLayer: function(a, c) {
            var d, f, e, g = "Feature" === a.type ? a.geometry : a, l = g ? g.coordinates : null, m = [], p = c && c.pointToLayer, h = c && c.coordsToLatLng || this.coordsToLatLng;
            if (!l && !g)
                return null;
            switch (g.type) {
            case "Point":
                return d = h(l),
                p ? p(a, d) : new b.Marker(d);
            case "MultiPoint":
                f = 0;
                for (e = l.length; f < e; f++)
                    d = h(l[f]),
                    m.push(p ? p(a, d) : new b.Marker(d));
                return new b.FeatureGroup(m);
            case "LineString":
            case "MultiLineString":
                return f = this.coordsToLatLngs(l, "LineString" === g.type ? 0 : 1, h),
                new b.Polyline(f,c);
            case "Polygon":
            case "MultiPolygon":
                return f = this.coordsToLatLngs(l, "Polygon" === g.type ? 1 : 2, h),
                new b.Polygon(f,c);
            case "GeometryCollection":
                f = 0;
                for (e = g.geometries.length; f < e; f++)
                    (d = this.geometryToLayer({
                        geometry: g.geometries[f],
                        type: "Feature",
                        properties: a.properties
                    }, c)) && m.push(d);
                return new b.FeatureGroup(m);
            default:
                throw Error("Invalid GeoJSON object.");
            }
        },
        coordsToLatLng: function(a) {
            return new b.LatLng(a[1],a[0],a[2])
        },
        coordsToLatLngs: function(a, b, d) {
            for (var c, e = [], g = 0, l = a.length; g < l; g++)
                c = b ? this.coordsToLatLngs(a[g], b - 1, d) : (d || this.coordsToLatLng)(a[g]),
                e.push(c);
            return e
        },
        latLngToCoords: function(a) {
            return a.alt !== n ? [a.lng, a.lat, a.alt] : [a.lng, a.lat]
        },
        latLngsToCoords: function(a, c, d) {
            for (var e = [], g = 0, B = a.length; g < B; g++)
                e.push(c ? b.GeoJSON.latLngsToCoords(a[g], c - 1, d) : b.GeoJSON.latLngToCoords(a[g]));
            return !c && d && e.push(e[0]),
            e
        },
        getFeature: function(a, c) {
            return a.feature ? b.extend({}, a.feature, {
                geometry: c
            }) : b.GeoJSON.asFeature(c)
        },
        asFeature: function(a) {
            return "Feature" === a.type ? a : {
                type: "Feature",
                properties: {},
                geometry: a
            }
        }
    });
    g = {
        toGeoJSON: function() {
            return b.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: b.GeoJSON.latLngToCoords(this.getLatLng())
            })
        }
    };
    b.Marker.include(g);
    b.Circle.include(g);
    b.CircleMarker.include(g);
    b.Polyline.prototype.toGeoJSON = function() {
        var a = !b.Polyline._flat(this._latlngs)
          , c = b.GeoJSON.latLngsToCoords(this._latlngs, a ? 1 : 0);
        return b.GeoJSON.getFeature(this, {
            type: (a ? "Multi" : "") + "LineString",
            coordinates: c
        })
    }
    ;
    b.Polygon.prototype.toGeoJSON = function() {
        var a = !b.Polyline._flat(this._latlngs)
          , c = a && !b.Polyline._flat(this._latlngs[0])
          , d = b.GeoJSON.latLngsToCoords(this._latlngs, c ? 2 : a ? 1 : 0, !0);
        return a || (d = [d]),
        b.GeoJSON.getFeature(this, {
            type: (c ? "Multi" : "") + "Polygon",
            coordinates: d
        })
    }
    ;
    b.LayerGroup.include({
        toMultiPoint: function() {
            var a = [];
            return this.eachLayer(function(b) {
                a.push(b.toGeoJSON().geometry.coordinates)
            }),
            b.GeoJSON.getFeature(this, {
                type: "MultiPoint",
                coordinates: a
            })
        },
        toGeoJSON: function() {
            var a = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === a)
                return this.toMultiPoint();
            var c = "GeometryCollection" === a
              , d = [];
            return this.eachLayer(function(a) {
                a.toGeoJSON && (a = a.toGeoJSON(),
                d.push(c ? a.geometry : b.GeoJSON.asFeature(a)))
            }),
            c ? b.GeoJSON.getFeature(this, {
                geometries: d,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: d
            }
        }
    });
    b.geoJSON = function(a, c) {
        return new b.GeoJSON(a,c)
    }
    ;
    b.geoJson = b.geoJSON;
    b.DomEvent = {
        on: function(a, c, d, e) {
            if ("object" == typeof c)
                for (var f in c)
                    this._on(a, f, c[f], d);
            else {
                c = b.Util.splitWords(c);
                f = 0;
                for (var g = c.length; f < g; f++)
                    this._on(a, c[f], d, e)
            }
            return this
        },
        off: function(a, c, d, e) {
            if ("object" == typeof c)
                for (var f in c)
                    this._off(a, f, c[f], d);
            else {
                c = b.Util.splitWords(c);
                f = 0;
                for (var g = c.length; f < g; f++)
                    this._off(a, c[f], d, e)
            }
            return this
        },
        _on: function(a, c, d, e) {
            var f = c + b.stamp(d) + (e ? "_" + b.stamp(e) : "");
            if (a._leaflet_events && a._leaflet_events[f])
                return this;
            var g = function(b) {
                return d.call(e || a, b || q.event)
            }
              , l = g;
            return b.Browser.pointer && 0 === c.indexOf("touch") ? this.addPointerListener(a, c, g, f) : b.Browser.touch && "dblclick" === c && this.addDoubleTapListener ? this.addDoubleTapListener(a, g, f) : "addEventListener"in a ? "mousewheel" === c ? a.addEventListener("onwheel"in a ? "wheel" : "mousewheel", g, !1) : "mouseenter" === c || "mouseleave" === c ? (g = function(c) {
                c = c || q.event;
                b.DomEvent._isExternalTarget(a, c) && l(c)
            }
            ,
            a.addEventListener("mouseenter" === c ? "mouseover" : "mouseout", g, !1)) : ("click" === c && b.Browser.android && (g = function(a) {
                return b.DomEvent._filterClick(a, l)
            }
            ),
            a.addEventListener(c, g, !1)) : "attachEvent"in a && a.attachEvent("on" + c, g),
            a._leaflet_events = a._leaflet_events || {},
            a._leaflet_events[f] = g,
            this
        },
        _off: function(a, c, d, e) {
            d = c + b.stamp(d) + (e ? "_" + b.stamp(e) : "");
            return (e = a._leaflet_events && a._leaflet_events[d]) ? (b.Browser.pointer && 0 === c.indexOf("touch") ? this.removePointerListener(a, c, d) : b.Browser.touch && "dblclick" === c && this.removeDoubleTapListener ? this.removeDoubleTapListener(a, d) : "removeEventListener"in a ? "mousewheel" === c ? a.removeEventListener("onwheel"in a ? "wheel" : "mousewheel", e, !1) : a.removeEventListener("mouseenter" === c ? "mouseover" : "mouseleave" === c ? "mouseout" : c, e, !1) : "detachEvent"in a && a.detachEvent("on" + c, e),
            a._leaflet_events[d] = null,
            this) : this
        },
        stopPropagation: function(a) {
            return a.stopPropagation ? a.stopPropagation() : a.originalEvent ? a.originalEvent._stopped = !0 : a.cancelBubble = !0,
            b.DomEvent._skipped(a),
            this
        },
        disableScrollPropagation: function(a) {
            return b.DomEvent.on(a, "mousewheel", b.DomEvent.stopPropagation)
        },
        disableClickPropagation: function(a) {
            var c = b.DomEvent.stopPropagation;
            return b.DomEvent.on(a, b.Draggable.START.join(" "), c),
            b.DomEvent.on(a, {
                click: b.DomEvent._fakeStop,
                dblclick: c
            })
        },
        preventDefault: function(a) {
            return a.preventDefault ? a.preventDefault() : a.returnValue = !1,
            this
        },
        stop: function(a) {
            return b.DomEvent.preventDefault(a).stopPropagation(a)
        },
        getMousePosition: function(a, c) {
            if (!c)
                return new b.Point(a.clientX,a.clientY);
            var d = c.getBoundingClientRect();
            return new b.Point(a.clientX - d.left - c.clientLeft,a.clientY - d.top - c.clientTop)
        },
        _wheelPxFactor: b.Browser.win && b.Browser.chrome ? 2 : b.Browser.gecko ? q.devicePixelRatio : 1,
        getWheelDelta: function(a) {
            return b.Browser.edge ? a.wheelDeltaY / 2 : a.deltaY && 0 === a.deltaMode ? -a.deltaY / b.DomEvent._wheelPxFactor : a.deltaY && 1 === a.deltaMode ? 20 * -a.deltaY : a.deltaY && 2 === a.deltaMode ? 60 * -a.deltaY : a.deltaX || a.deltaZ ? 0 : a.wheelDelta ? (a.wheelDeltaY || a.wheelDelta) / 2 : a.detail && 32765 > Math.abs(a.detail) ? 20 * -a.detail : a.detail ? a.detail / -32765 * 60 : 0
        },
        _skipEvents: {},
        _fakeStop: function(a) {
            b.DomEvent._skipEvents[a.type] = !0
        },
        _skipped: function(a) {
            var b = this._skipEvents[a.type];
            return this._skipEvents[a.type] = !1,
            b
        },
        _isExternalTarget: function(a, b) {
            var c = b.relatedTarget;
            if (!c)
                return !0;
            try {
                for (; c && c !== a; )
                    c = c.parentNode
            } catch (f) {
                return !1
            }
            return c !== a
        },
        _filterClick: function(a, c) {
            var d = a.timeStamp || a.originalEvent && a.originalEvent.timeStamp
              , e = b.DomEvent._lastClick && d - b.DomEvent._lastClick;
            return e && 100 < e && 500 > e || a.target._simulatedClick && !a._simulated ? void b.DomEvent.stop(a) : (b.DomEvent._lastClick = d,
            void c(a))
        }
    };
    b.DomEvent.addListener = b.DomEvent.on;
    b.DomEvent.removeListener = b.DomEvent.off;
    b.Draggable = b.Evented.extend({
        options: {
            clickTolerance: 3
        },
        statics: {
            START: b.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                pointerdown: "touchend",
                MSPointerDown: "touchend"
            },
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        },
        initialize: function(a, b, d) {
            this._element = a;
            this._dragStartTarget = b || a;
            this._preventOutline = d
        },
        enable: function() {
            this._enabled || (b.DomEvent.on(this._dragStartTarget, b.Draggable.START.join(" "), this._onDown, this),
            this._enabled = !0)
        },
        disable: function() {
            this._enabled && (b.DomEvent.off(this._dragStartTarget, b.Draggable.START.join(" "), this._onDown, this),
            this._enabled = !1,
            this._moved = !1)
        },
        _onDown: function(a) {
            if (!a._simulated && this._enabled && (this._moved = !1,
            !(b.DomUtil.hasClass(this._element, "leaflet-zoom-anim") || b.Draggable._dragging || a.shiftKey || 1 !== a.which && 1 !== a.button && !a.touches) && this._enabled && (b.Draggable._dragging = !0,
            this._preventOutline && b.DomUtil.preventOutline(this._element),
            b.DomUtil.disableImageDrag(),
            b.DomUtil.disableTextSelection(),
            !this._moving))) {
                this.fire("down");
                var c = a.touches ? a.touches[0] : a;
                this._startPoint = new b.Point(c.clientX,c.clientY);
                b.DomEvent.on(h, b.Draggable.MOVE[a.type], this._onMove, this).on(h, b.Draggable.END[a.type], this._onUp, this)
            }
        },
        _onMove: function(a) {
            if (!a._simulated && this._enabled) {
                if (a.touches && 1 < a.touches.length)
                    return void (this._moved = !0);
                var c = a.touches && 1 === a.touches.length ? a.touches[0] : a
                  , c = (new b.Point(c.clientX,c.clientY)).subtract(this._startPoint);
                (c.x || c.y) && (Math.abs(c.x) + Math.abs(c.y) < this.options.clickTolerance || (b.DomEvent.preventDefault(a),
                this._moved || (this.fire("dragstart"),
                this._moved = !0,
                this._startPos = b.DomUtil.getPosition(this._element).subtract(c),
                b.DomUtil.addClass(h.body, "leaflet-dragging"),
                this._lastTarget = a.target || a.srcElement,
                q.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement),
                b.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")),
                this._newPos = this._startPos.add(c),
                this._moving = !0,
                b.Util.cancelAnimFrame(this._animRequest),
                this._lastEvent = a,
                this._animRequest = b.Util.requestAnimFrame(this._updatePosition, this, !0)))
            }
        },
        _updatePosition: function() {
            var a = {
                originalEvent: this._lastEvent
            };
            this.fire("predrag", a);
            b.DomUtil.setPosition(this._element, this._newPos);
            this.fire("drag", a)
        },
        _onUp: function(a) {
            if (!a._simulated && this._enabled) {
                b.DomUtil.removeClass(h.body, "leaflet-dragging");
                this._lastTarget && (b.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"),
                this._lastTarget = null);
                for (var c in b.Draggable.MOVE)
                    b.DomEvent.off(h, b.Draggable.MOVE[c], this._onMove, this).off(h, b.Draggable.END[c], this._onUp, this);
                b.DomUtil.enableImageDrag();
                b.DomUtil.enableTextSelection();
                this._moved && this._moving && (b.Util.cancelAnimFrame(this._animRequest),
                this.fire("dragend", {
                    distance: this._newPos.distanceTo(this._startPos)
                }));
                this._moving = !1;
                b.Draggable._dragging = !1
            }
        }
    });
    b.Handler = b.Class.extend({
        initialize: function(a) {
            this._map = a
        },
        enable: function() {
            return this._enabled ? this : (this._enabled = !0,
            this.addHooks(),
            this)
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1,
            this.removeHooks(),
            this) : this
        },
        enabled: function() {
            return !!this._enabled
        }
    });
    b.Map.mergeOptions({
        dragging: !0,
        inertia: !b.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    });
    b.Map.Drag = b.Handler.extend({
        addHooks: function() {
            if (!this._draggable) {
                var a = this._map;
                this._draggable = new b.Draggable(a._mapPane,a._container);
                this._draggable.on({
                    down: this._onDown,
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this);
                this._draggable.on("predrag", this._onPreDragLimit, this);
                a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this),
                a.on("zoomend", this._onZoomEnd, this),
                a.whenReady(this._onZoomEnd, this))
            }
            b.DomUtil.addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
            this._draggable.enable();
            this._positions = [];
            this._times = []
        },
        removeHooks: function() {
            b.DomUtil.removeClass(this._map._container, "leaflet-grab");
            b.DomUtil.removeClass(this._map._container, "leaflet-touch-drag");
            this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        moving: function() {
            return this._draggable && this._draggable._moving
        },
        _onDown: function() {
            this._map._stop()
        },
        _onDragStart: function() {
            var a = this._map;
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var c = b.latLngBounds(this._map.options.maxBounds);
                this._offsetLimit = b.bounds(this._map.latLngToContainerPoint(c.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(c.getSouthEast()).multiplyBy(-1).add(this._map.getSize()));
                this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else
                this._offsetLimit = null;
            a.fire("movestart").fire("dragstart");
            a.options.inertia && (this._positions = [],
            this._times = [])
        },
        _onDrag: function(a) {
            if (this._map.options.inertia) {
                var b = this._lastTime = +new Date
                  , d = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(d);
                this._times.push(b);
                50 < b - this._times[0] && (this._positions.shift(),
                this._times.shift())
            }
            this._map.fire("move", a).fire("drag", a)
        },
        _onZoomEnd: function() {
            var a = this._map.getSize().divideBy(2);
            this._initialWorldOffset = this._map.latLngToLayerPoint([0, 0]).subtract(a).x;
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(a, b) {
            return a - (a - b) * this._viscosity
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var a = this._draggable._newPos.subtract(this._draggable._startPos)
                  , b = this._offsetLimit;
                a.x < b.min.x && (a.x = this._viscousLimit(a.x, b.min.x));
                a.y < b.min.y && (a.y = this._viscousLimit(a.y, b.min.y));
                a.x > b.max.x && (a.x = this._viscousLimit(a.x, b.max.x));
                a.y > b.max.y && (a.y = this._viscousLimit(a.y, b.max.y));
                this._draggable._newPos = this._draggable._startPos.add(a)
            }
        },
        _onPreDragWrap: function() {
            var a = this._worldWidth
              , b = Math.round(a / 2)
              , d = this._initialWorldOffset
              , e = this._draggable._newPos.x
              , g = (e - b + d) % a + b - d
              , a = (e + b + d) % a - b - d
              , d = Math.abs(g + d) < Math.abs(a + d) ? g : a;
            this._draggable._absPos = this._draggable._newPos.clone();
            this._draggable._newPos.x = d
        },
        _onDragEnd: function(a) {
            var c = this._map
              , d = c.options
              , e = !d.inertia || 2 > this._times.length;
            if (c.fire("dragend", a),
            e)
                c.fire("moveend");
            else {
                a = this._lastPos.subtract(this._positions[0]);
                var g = d.easeLinearity
                  , e = a.multiplyBy(g / ((this._lastTime - this._times[0]) / 1E3))
                  , h = e.distanceTo([0, 0]);
                a = Math.min(d.inertiaMaxSpeed, h);
                var e = e.multiplyBy(a / h)
                  , l = a / (d.inertiaDeceleration * g)
                  , m = e.multiplyBy(-l / 2).round();
                m.x || m.y ? (m = c._limitOffset(m, c.options.maxBounds),
                b.Util.requestAnimFrame(function() {
                    c.panBy(m, {
                        duration: l,
                        easeLinearity: g,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : c.fire("moveend")
            }
        }
    });
    b.Map.addInitHook("addHandler", "dragging", b.Map.Drag);
    b.Map.mergeOptions({
        doubleClickZoom: !0
    });
    b.Map.DoubleClickZoom = b.Handler.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(a) {
            var b = this._map
              , d = b.getZoom()
              , e = b.options.zoomDelta
              , d = a.originalEvent.shiftKey ? d - e : d + e;
            "center" === b.options.doubleClickZoom ? b.setZoom(d) : b.setZoomAround(a.containerPoint, d)
        }
    });
    b.Map.addInitHook("addHandler", "doubleClickZoom", b.Map.DoubleClickZoom);
    b.Map.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    });
    b.Map.ScrollWheelZoom = b.Handler.extend({
        addHooks: function() {
            b.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this);
            this._delta = 0
        },
        removeHooks: function() {
            b.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function(a) {
            var c = b.DomEvent.getWheelDelta(a)
              , d = this._map.options.wheelDebounceTime;
            this._delta += c;
            this._lastMousePos = this._map.mouseEventToContainerPoint(a);
            this._startTime || (this._startTime = +new Date);
            c = Math.max(d - (+new Date - this._startTime), 0);
            clearTimeout(this._timer);
            this._timer = setTimeout(b.bind(this._performZoom, this), c);
            b.DomEvent.stop(a)
        },
        _performZoom: function() {
            var a = this._map
              , b = a.getZoom()
              , d = this._map.options.zoomSnap || 0;
            a._stop();
            var e = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(this._delta / (4 * this._map.options.wheelPxPerZoomLevel))))) / Math.LN2
              , d = d ? Math.ceil(e / d) * d : e
              , d = a._limitZoom(b + (0 < this._delta ? d : -d)) - b;
            this._delta = 0;
            this._startTime = null;
            d && ("center" === a.options.scrollWheelZoom ? a.setZoom(b + d) : a.setZoomAround(this._lastMousePos, b + d))
        }
    });
    b.Map.addInitHook("addHandler", "scrollWheelZoom", b.Map.ScrollWheelZoom);
    b.extend(b.DomEvent, {
        _touchstart: b.Browser.msPointer ? "MSPointerDown" : b.Browser.pointer ? "pointerdown" : "touchstart",
        _touchend: b.Browser.msPointer ? "MSPointerUp" : b.Browser.pointer ? "pointerup" : "touchend",
        addDoubleTapListener: function(a, c, d) {
            function e(a) {
                var c;
                if (c = b.Browser.pointer ? b.DomEvent._pointersCount : a.touches.length,
                !(1 < c)) {
                    c = Date.now();
                    var d = c - (h || c);
                    l = a.touches ? a.touches[0] : a;
                    m = 0 < d && d <= p;
                    h = c
                }
            }
            function g() {
                if (m && !l.cancelBubble) {
                    if (b.Browser.pointer) {
                        var a, d, e = {};
                        for (d in l)
                            a = l[d],
                            e[d] = a && a.bind ? a.bind(l) : a;
                        l = e
                    }
                    l.type = "dblclick";
                    c(l);
                    h = null
                }
            }
            var h, l, m = !1, p = 250, n = this._touchstart, q = this._touchend;
            return a["_leaflet_" + n + d] = e,
            a["_leaflet_" + q + d] = g,
            a["_leaflet_dblclick" + d] = c,
            a.addEventListener(n, e, !1),
            a.addEventListener(q, g, !1),
            b.Browser.edge || a.addEventListener("dblclick", c, !1),
            this
        },
        removeDoubleTapListener: function(a, c) {
            var d = a["_leaflet_" + this._touchend + c]
              , e = a["_leaflet_dblclick" + c];
            return a.removeEventListener(this._touchstart, a["_leaflet_" + this._touchstart + c], !1),
            a.removeEventListener(this._touchend, d, !1),
            b.Browser.edge || a.removeEventListener("dblclick", e, !1),
            this
        }
    });
    b.extend(b.DomEvent, {
        POINTER_DOWN: b.Browser.msPointer ? "MSPointerDown" : "pointerdown",
        POINTER_MOVE: b.Browser.msPointer ? "MSPointerMove" : "pointermove",
        POINTER_UP: b.Browser.msPointer ? "MSPointerUp" : "pointerup",
        POINTER_CANCEL: b.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
        TAG_WHITE_LIST: ["INPUT", "SELECT", "OPTION"],
        _pointers: {},
        _pointersCount: 0,
        addPointerListener: function(a, b, d, e) {
            return "touchstart" === b ? this._addPointerStart(a, d, e) : "touchmove" === b ? this._addPointerMove(a, d, e) : "touchend" === b && this._addPointerEnd(a, d, e),
            this
        },
        removePointerListener: function(a, b, d) {
            d = a["_leaflet_" + b + d];
            return "touchstart" === b ? a.removeEventListener(this.POINTER_DOWN, d, !1) : "touchmove" === b ? a.removeEventListener(this.POINTER_MOVE, d, !1) : "touchend" === b && (a.removeEventListener(this.POINTER_UP, d, !1),
            a.removeEventListener(this.POINTER_CANCEL, d, !1)),
            this
        },
        _addPointerStart: function(a, c, d) {
            var e = b.bind(function(a) {
                if ("mouse" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_MOUSE) {
                    if (!(0 > this.TAG_WHITE_LIST.indexOf(a.target.tagName)))
                        return;
                    b.DomEvent.preventDefault(a)
                }
                this._handlePointer(a, c)
            }, this);
            (a["_leaflet_touchstart" + d] = e,
            a.addEventListener(this.POINTER_DOWN, e, !1),
            this._pointerDocListener) || (a = b.bind(this._globalPointerUp, this),
            h.documentElement.addEventListener(this.POINTER_DOWN, b.bind(this._globalPointerDown, this), !0),
            h.documentElement.addEventListener(this.POINTER_MOVE, b.bind(this._globalPointerMove, this), !0),
            h.documentElement.addEventListener(this.POINTER_UP, a, !0),
            h.documentElement.addEventListener(this.POINTER_CANCEL, a, !0),
            this._pointerDocListener = !0)
        },
        _globalPointerDown: function(a) {
            this._pointers[a.pointerId] = a;
            this._pointersCount++
        },
        _globalPointerMove: function(a) {
            this._pointers[a.pointerId] && (this._pointers[a.pointerId] = a)
        },
        _globalPointerUp: function(a) {
            delete this._pointers[a.pointerId];
            this._pointersCount--
        },
        _handlePointer: function(a, b) {
            a.touches = [];
            for (var c in this._pointers)
                a.touches.push(this._pointers[c]);
            a.changedTouches = [a];
            b(a)
        },
        _addPointerMove: function(a, c, d) {
            var e = b.bind(function(a) {
                (a.pointerType !== a.MSPOINTER_TYPE_MOUSE && "mouse" !== a.pointerType || 0 !== a.buttons) && this._handlePointer(a, c)
            }, this);
            a["_leaflet_touchmove" + d] = e;
            a.addEventListener(this.POINTER_MOVE, e, !1)
        },
        _addPointerEnd: function(a, c, d) {
            var e = b.bind(function(a) {
                this._handlePointer(a, c)
            }, this);
            a["_leaflet_touchend" + d] = e;
            a.addEventListener(this.POINTER_UP, e, !1);
            a.addEventListener(this.POINTER_CANCEL, e, !1)
        }
    });
    b.Map.mergeOptions({
        touchZoom: b.Browser.touch && !b.Browser.android23,
        bounceAtZoomLimits: !0
    });
    b.Map.TouchZoom = b.Handler.extend({
        addHooks: function() {
            b.DomUtil.addClass(this._map._container, "leaflet-touch-zoom");
            b.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            b.DomUtil.removeClass(this._map._container, "leaflet-touch-zoom");
            b.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(a) {
            var c = this._map;
            if (a.touches && 2 === a.touches.length && !c._animatingZoom && !this._zooming) {
                var d = c.mouseEventToContainerPoint(a.touches[0])
                  , e = c.mouseEventToContainerPoint(a.touches[1]);
                this._centerPoint = c.getSize()._divideBy(2);
                this._startLatLng = c.containerPointToLatLng(this._centerPoint);
                "center" !== c.options.touchZoom && (this._pinchStartLatLng = c.containerPointToLatLng(d.add(e)._divideBy(2)));
                this._startDist = d.distanceTo(e);
                this._startZoom = c.getZoom();
                this._moved = !1;
                this._zooming = !0;
                c._stop();
                b.DomEvent.on(h, "touchmove", this._onTouchMove, this).on(h, "touchend", this._onTouchEnd, this);
                b.DomEvent.preventDefault(a)
            }
        },
        _onTouchMove: function(a) {
            if (a.touches && 2 === a.touches.length && this._zooming) {
                var c = this._map
                  , d = c.mouseEventToContainerPoint(a.touches[0])
                  , e = c.mouseEventToContainerPoint(a.touches[1])
                  , g = d.distanceTo(e) / this._startDist;
                if (this._zoom = c.getScaleZoom(g, this._startZoom),
                !c.options.bounceAtZoomLimits && (this._zoom < c.getMinZoom() && 1 > g || this._zoom > c.getMaxZoom() && 1 < g) && (this._zoom = c._limitZoom(this._zoom)),
                "center" === c.options.touchZoom) {
                    if (this._center = this._startLatLng,
                    1 === g)
                        return
                } else {
                    d = d._add(e)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === g && 0 === d.x && 0 === d.y)
                        return;
                    this._center = c.unproject(c.project(this._pinchStartLatLng, this._zoom).subtract(d), this._zoom)
                }
                this._moved || (c._moveStart(!0),
                this._moved = !0);
                b.Util.cancelAnimFrame(this._animRequest);
                c = b.bind(c._move, c, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = b.Util.requestAnimFrame(c, this, !0);
                b.DomEvent.preventDefault(a)
            }
        },
        _onTouchEnd: function() {
            return this._moved && this._zooming ? (this._zooming = !1,
            b.Util.cancelAnimFrame(this._animRequest),
            b.DomEvent.off(h, "touchmove", this._onTouchMove).off(h, "touchend", this._onTouchEnd),
            void (this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)))) : void (this._zooming = !1)
        }
    });
    b.Map.addInitHook("addHandler", "touchZoom", b.Map.TouchZoom);
    b.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    b.Map.Tap = b.Handler.extend({
        addHooks: function() {
            b.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            b.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(a) {
            if (a.touches) {
                if (b.DomEvent.preventDefault(a),
                this._fireClick = !0,
                1 < a.touches.length)
                    return this._fireClick = !1,
                    void clearTimeout(this._holdTimeout);
                var c = a.touches[0];
                a = c.target;
                this._startPos = this._newPos = new b.Point(c.clientX,c.clientY);
                a.tagName && "a" === a.tagName.toLowerCase() && b.DomUtil.addClass(a, "leaflet-active");
                this._holdTimeout = setTimeout(b.bind(function() {
                    this._isTapValid() && (this._fireClick = !1,
                    this._onUp(),
                    this._simulateEvent("contextmenu", c))
                }, this), 1E3);
                this._simulateEvent("mousedown", c);
                b.DomEvent.on(h, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        },
        _onUp: function(a) {
            if (clearTimeout(this._holdTimeout),
            b.DomEvent.off(h, {
                touchmove: this._onMove,
                touchend: this._onUp
            }, this),
            this._fireClick && a && a.changedTouches) {
                a = a.changedTouches[0];
                var c = a.target;
                c && c.tagName && "a" === c.tagName.toLowerCase() && b.DomUtil.removeClass(c, "leaflet-active");
                this._simulateEvent("mouseup", a);
                this._isTapValid() && this._simulateEvent("click", a)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(a) {
            a = a.touches[0];
            this._newPos = new b.Point(a.clientX,a.clientY);
            this._simulateEvent("mousemove", a)
        },
        _simulateEvent: function(a, b) {
            var c = h.createEvent("MouseEvents");
            c._simulated = !0;
            b.target._simulatedClick = !0;
            c.initMouseEvent(a, !0, !0, q, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null);
            b.target.dispatchEvent(c)
        }
    });
    b.Browser.touch && !b.Browser.pointer && b.Map.addInitHook("addHandler", "tap", b.Map.Tap);
    b.Map.mergeOptions({
        boxZoom: !0
    });
    b.Map.BoxZoom = b.Handler.extend({
        initialize: function(a) {
            this._map = a;
            this._container = a._container;
            this._pane = a._panes.overlayPane
        },
        addHooks: function() {
            b.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            b.DomEvent.off(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function() {
            return this._moved
        },
        _resetState: function() {
            this._moved = !1
        },
        _onMouseDown: function(a) {
            return !(!a.shiftKey || 1 !== a.which && 1 !== a.button) && (this._resetState(),
            b.DomUtil.disableTextSelection(),
            b.DomUtil.disableImageDrag(),
            this._startPoint = this._map.mouseEventToContainerPoint(a),
            void b.DomEvent.on(h, {
                contextmenu: b.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this))
        },
        _onMouseMove: function(a) {
            this._moved || (this._moved = !0,
            this._box = b.DomUtil.create("div", "leaflet-zoom-box", this._container),
            b.DomUtil.addClass(this._container, "leaflet-crosshair"),
            this._map.fire("boxzoomstart"));
            this._point = this._map.mouseEventToContainerPoint(a);
            a = new b.Bounds(this._point,this._startPoint);
            var c = a.getSize();
            b.DomUtil.setPosition(this._box, a.min);
            this._box.style.width = c.x + "px";
            this._box.style.height = c.y + "px"
        },
        _finish: function() {
            this._moved && (b.DomUtil.remove(this._box),
            b.DomUtil.removeClass(this._container, "leaflet-crosshair"));
            b.DomUtil.enableTextSelection();
            b.DomUtil.enableImageDrag();
            b.DomEvent.off(h, {
                contextmenu: b.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseUp: function(a) {
            1 !== a.which && 1 !== a.button || (this._finish(),
            !this._moved) || (setTimeout(b.bind(this._resetState, this), 0),
            a = new b.LatLngBounds(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point)),
            this._map.fitBounds(a).fire("boxzoomend", {
                boxZoomBounds: a
            }))
        },
        _onKeyDown: function(a) {
            27 === a.keyCode && this._finish()
        }
    });
    b.Map.addInitHook("addHandler", "boxZoom", b.Map.BoxZoom);
    b.Map.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    });
    b.Map.Keyboard = b.Handler.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function(a) {
            this._map = a;
            this._setPanDelta(a.options.keyboardPanDelta);
            this._setZoomDelta(a.options.zoomDelta)
        },
        addHooks: function() {
            var a = this._map._container;
            0 >= a.tabIndex && (a.tabIndex = "0");
            b.DomEvent.on(a, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this);
            this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        removeHooks: function() {
            this._removeHooks();
            b.DomEvent.off(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this);
            this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var a = h.body
                  , b = h.documentElement
                  , d = a.scrollTop || b.scrollTop
                  , a = a.scrollLeft || b.scrollLeft;
                this._map._container.focus();
                q.scrollTo(a, d)
            }
        },
        _onFocus: function() {
            this._focused = !0;
            this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1;
            this._map.fire("blur")
        },
        _setPanDelta: function(a) {
            var b, d, e = this._panKeys = {}, g = this.keyCodes;
            b = 0;
            for (d = g.left.length; b < d; b++)
                e[g.left[b]] = [-1 * a, 0];
            b = 0;
            for (d = g.right.length; b < d; b++)
                e[g.right[b]] = [a, 0];
            b = 0;
            for (d = g.down.length; b < d; b++)
                e[g.down[b]] = [0, a];
            b = 0;
            for (d = g.up.length; b < d; b++)
                e[g.up[b]] = [0, -1 * a]
        },
        _setZoomDelta: function(a) {
            var b, d, e = this._zoomKeys = {}, g = this.keyCodes;
            b = 0;
            for (d = g.zoomIn.length; b < d; b++)
                e[g.zoomIn[b]] = a;
            b = 0;
            for (d = g.zoomOut.length; b < d; b++)
                e[g.zoomOut[b]] = -a
        },
        _addHooks: function() {
            b.DomEvent.on(h, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            b.DomEvent.off(h, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(a) {
            if (!(a.altKey || a.ctrlKey || a.metaKey)) {
                var c;
                c = a.keyCode;
                var d = this._map;
                if (c in this._panKeys) {
                    if (d._panAnim && d._panAnim._inProgress)
                        return;
                    c = this._panKeys[c];
                    a.shiftKey && (c = b.point(c).multiplyBy(3));
                    d.panBy(c);
                    d.options.maxBounds && d.panInsideBounds(d.options.maxBounds)
                } else if (c in this._zoomKeys)
                    d.setZoom(d.getZoom() + (a.shiftKey ? 3 : 1) * this._zoomKeys[c]);
                else {
                    if (27 !== c)
                        return;
                    d.closePopup()
                }
                b.DomEvent.stop(a)
            }
        }
    });
    b.Map.addInitHook("addHandler", "keyboard", b.Map.Keyboard);
    b.Handler.MarkerDrag = b.Handler.extend({
        initialize: function(a) {
            this._marker = a
        },
        addHooks: function() {
            var a = this._marker._icon;
            this._draggable || (this._draggable = new b.Draggable(a,a,!0));
            this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).enable();
            b.DomUtil.addClass(a, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).disable();
            this._marker._icon && b.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng();
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onDrag: function(a) {
            var c = this._marker
              , d = c._shadow
              , e = b.DomUtil.getPosition(c._icon)
              , g = c._map.layerPointToLatLng(e);
            d && b.DomUtil.setPosition(d, e);
            c._latlng = g;
            a.latlng = g;
            a.oldLatLng = this._oldLatLng;
            c.fire("move", a).fire("drag", a)
        },
        _onDragEnd: function(a) {
            delete this._oldLatLng;
            this._marker.fire("moveend").fire("dragend", a)
        }
    });
    b.Control = b.Class.extend({
        options: {
            position: "topright"
        },
        initialize: function(a) {
            b.setOptions(this, a)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(a) {
            var b = this._map;
            return b && b.removeControl(this),
            this.options.position = a,
            b && b.addControl(this),
            this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(a) {
            this.remove();
            this._map = a;
            var c = this._container = this.onAdd(a)
              , d = this.getPosition();
            a = a._controlCorners[d];
            return b.DomUtil.addClass(c, "leaflet-control"),
            -1 !== d.indexOf("bottom") ? a.insertBefore(c, a.firstChild) : a.appendChild(c),
            this
        },
        remove: function() {
            return this._map ? (b.DomUtil.remove(this._container),
            this.onRemove && this.onRemove(this._map),
            this._map = null,
            this) : this
        },
        _refocusOnMap: function(a) {
            this._map && a && 0 < a.screenX && 0 < a.screenY && this._map.getContainer().focus()
        }
    });
    b.control = function(a) {
        return new b.Control(a)
    }
    ;
    b.Map.include({
        addControl: function(a) {
            return a.addTo(this),
            this
        },
        removeControl: function(a) {
            return a.remove(),
            this
        },
        _initControlPos: function() {
            function a(a, f) {
                c[a + f] = b.DomUtil.create("div", d + a + " " + d + f, e)
            }
            var c = this._controlCorners = {}
              , d = "leaflet-"
              , e = this._controlContainer = b.DomUtil.create("div", d + "control-container", this._container);
            a("top", "left");
            a("top", "right");
            a("bottom", "left");
            a("bottom", "right")
        },
        _clearControlPos: function() {
            b.DomUtil.remove(this._controlContainer)
        }
    });
    b.Control.Zoom = b.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(a) {
            var c = b.DomUtil.create("div", "leaflet-control-zoom leaflet-bar")
              , d = this.options;
            return this._zoomInButton = this._createButton(d.zoomInText, d.zoomInTitle, "leaflet-control-zoom-in", c, this._zoomIn),
            this._zoomOutButton = this._createButton(d.zoomOutText, d.zoomOutTitle, "leaflet-control-zoom-out", c, this._zoomOut),
            this._updateDisabled(),
            a.on("zoomend zoomlevelschange", this._updateDisabled, this),
            c
        },
        onRemove: function(a) {
            a.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        disable: function() {
            return this._disabled = !0,
            this._updateDisabled(),
            this
        },
        enable: function() {
            return this._disabled = !1,
            this._updateDisabled(),
            this
        },
        _zoomIn: function(a) {
            !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
        },
        _zoomOut: function(a) {
            !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1))
        },
        _createButton: function(a, c, d, e, g) {
            d = b.DomUtil.create("a", d, e);
            return d.innerHTML = a,
            d.href = "#",
            d.title = c,
            b.DomEvent.on(d, "mousedown dblclick", b.DomEvent.stopPropagation).on(d, "click", b.DomEvent.stop).on(d, "click", g, this).on(d, "click", this._refocusOnMap, this),
            d
        },
        _updateDisabled: function() {
            var a = this._map;
            b.DomUtil.removeClass(this._zoomInButton, "leaflet-disabled");
            b.DomUtil.removeClass(this._zoomOutButton, "leaflet-disabled");
            (this._disabled || a._zoom === a.getMinZoom()) && b.DomUtil.addClass(this._zoomOutButton, "leaflet-disabled");
            (this._disabled || a._zoom === a.getMaxZoom()) && b.DomUtil.addClass(this._zoomInButton, "leaflet-disabled")
        }
    });
    b.Map.mergeOptions({
        zoomControl: !0
    });
    b.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new b.Control.Zoom,
        this.addControl(this.zoomControl))
    });
    b.control.zoom = function(a) {
        return new b.Control.Zoom(a)
    }
    ;
    b.Control.Attribution = b.Control.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(a) {
            b.setOptions(this, a);
            this._attributions = {}
        },
        onAdd: function(a) {
            a.attributionControl = this;
            this._container = b.DomUtil.create("div", "leaflet-control-attribution");
            b.DomEvent && b.DomEvent.disableClickPropagation(this._container);
            for (var c in a._layers)
                a._layers[c].getAttribution && this.addAttribution(a._layers[c].getAttribution());
            return this._update(),
            this._container
        },
        setPrefix: function(a) {
            return this.options.prefix = a,
            this._update(),
            this
        },
        addAttribution: function(a) {
            return a ? (this._attributions[a] || (this._attributions[a] = 0),
            this._attributions[a]++,
            this._update(),
            this) : this
        },
        removeAttribution: function(a) {
            return a ? (this._attributions[a] && (this._attributions[a]--,
            this._update()),
            this) : this
        },
        _update: function() {
            if (this._map) {
                var a = [], b;
                for (b in this._attributions)
                    this._attributions[b] && a.push(b);
                b = [];
                this.options.prefix && b.push(this.options.prefix);
                a.length && b.push(a.join(", "));
                this._container.innerHTML = b.join(" | ")
            }
        }
    });
    b.Map.mergeOptions({
        attributionControl: !0
    });
    b.Map.addInitHook(function() {
        this.options.attributionControl && (new b.Control.Attribution).addTo(this)
    });
    b.control.attribution = function(a) {
        return new b.Control.Attribution(a)
    }
    ;
    b.Control.Scale = b.Control.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function(a) {
            var c = b.DomUtil.create("div", "leaflet-control-scale")
              , d = this.options;
            return this._addScales(d, "leaflet-control-scale-line", c),
            a.on(d.updateWhenIdle ? "moveend" : "move", this._update, this),
            a.whenReady(this._update, this),
            c
        },
        onRemove: function(a) {
            a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function(a, c, d) {
            a.metric && (this._mScale = b.DomUtil.create("div", c, d));
            a.imperial && (this._iScale = b.DomUtil.create("div", c, d))
        },
        _update: function() {
            var a = this._map
              , b = a.getSize().y / 2
              , a = a.distance(a.containerPointToLatLng([0, b]), a.containerPointToLatLng([this.options.maxWidth, b]));
            this._updateScales(a)
        },
        _updateScales: function(a) {
            this.options.metric && a && this._updateMetric(a);
            this.options.imperial && a && this._updateImperial(a)
        },
        _updateMetric: function(a) {
            var b = this._getRoundNum(a);
            this._updateScale(this._mScale, 1E3 > b ? b + " m" : b / 1E3 + " km", b / a)
        },
        _updateImperial: function(a) {
            var b, d, e;
            a *= 3.2808399;
            5280 < a ? (b = a / 5280,
            d = this._getRoundNum(b),
            this._updateScale(this._iScale, d + " mi", d / b)) : (e = this._getRoundNum(a),
            this._updateScale(this._iScale, e + " ft", e / a))
        },
        _updateScale: function(a, b, d) {
            a.style.width = Math.round(this.options.maxWidth * d) + "px";
            a.innerHTML = b
        },
        _getRoundNum: function(a) {
            var b = Math.pow(10, (Math.floor(a) + "").length - 1);
            a /= b;
            return a = 10 <= a ? 10 : 5 <= a ? 5 : 3 <= a ? 3 : 2 <= a ? 2 : 1,
            b * a
        }
    });
    b.control.scale = function(a) {
        return new b.Control.Scale(a)
    }
    ;
    b.Control.Layers = b.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1
        },
        initialize: function(a, c, d) {
            b.setOptions(this, d);
            this._layers = [];
            this._lastZIndex = 0;
            this._handlingClick = !1;
            for (var e in a)
                this._addLayer(a[e], e);
            for (e in c)
                this._addLayer(c[e], e, !0)
        },
        onAdd: function(a) {
            return this._initLayout(),
            this._update(),
            this._map = a,
            a.on("zoomend", this._checkDisabledLayers, this),
            this._container
        },
        onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var a = 0; a < this._layers.length; a++)
                this._layers[a].layer.off("add remove", this._onLayerChange, this)
        },
        addBaseLayer: function(a, b) {
            return this._addLayer(a, b),
            this._map ? this._update() : this
        },
        addOverlay: function(a, b) {
            return this._addLayer(a, b, !0),
            this._map ? this._update() : this
        },
        removeLayer: function(a) {
            a.off("add remove", this._onLayerChange, this);
            a = this._getLayer(b.stamp(a));
            return a && this._layers.splice(this._layers.indexOf(a), 1),
            this._map ? this._update() : this
        },
        expand: function() {
            b.DomUtil.addClass(this._container, "leaflet-control-layers-expanded");
            this._form.style.height = null;
            var a = this._map.getSize().y - (this._container.offsetTop + 50);
            return a < this._form.clientHeight ? (b.DomUtil.addClass(this._form, "leaflet-control-layers-scrollbar"),
            this._form.style.height = a + "px") : b.DomUtil.removeClass(this._form, "leaflet-control-layers-scrollbar"),
            this._checkDisabledLayers(),
            this
        },
        collapse: function() {
            return b.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded"),
            this
        },
        _initLayout: function() {
            var a = this._container = b.DomUtil.create("div", "leaflet-control-layers");
            a.setAttribute("aria-haspopup", !0);
            b.DomEvent.disableClickPropagation(a);
            b.Browser.touch || b.DomEvent.disableScrollPropagation(a);
            var c = this._form = b.DomUtil.create("form", "leaflet-control-layers-list");
            if (this.options.collapsed) {
                b.Browser.android || b.DomEvent.on(a, {
                    mouseenter: this.expand,
                    mouseleave: this.collapse
                }, this);
                var d = this._layersLink = b.DomUtil.create("a", "leaflet-control-layers-toggle", a);
                d.href = "#";
                d.title = "Layers";
                b.Browser.touch ? b.DomEvent.on(d, "click", b.DomEvent.stop).on(d, "click", this.expand, this) : b.DomEvent.on(d, "focus", this.expand, this);
                b.DomEvent.on(c, "click", function() {
                    setTimeout(b.bind(this._onInputClick, this), 0)
                }, this);
                this._map.on("click", this.collapse, this)
            } else
                this.expand();
            this._baseLayersList = b.DomUtil.create("div", "leaflet-control-layers-base", c);
            this._separator = b.DomUtil.create("div", "leaflet-control-layers-separator", c);
            this._overlaysList = b.DomUtil.create("div", "leaflet-control-layers-overlays", c);
            a.appendChild(c)
        },
        _getLayer: function(a) {
            for (var c = 0; c < this._layers.length; c++)
                if (this._layers[c] && b.stamp(this._layers[c].layer) === a)
                    return this._layers[c]
        },
        _addLayer: function(a, b, d) {
            a.on("add remove", this._onLayerChange, this);
            this._layers.push({
                layer: a,
                name: b,
                overlay: d
            });
            this.options.autoZIndex && a.setZIndex && (this._lastZIndex++,
            a.setZIndex(this._lastZIndex))
        },
        _update: function() {
            if (!this._container)
                return this;
            b.DomUtil.empty(this._baseLayersList);
            b.DomUtil.empty(this._overlaysList);
            var a, c, d, e, g = 0;
            for (d = 0; d < this._layers.length; d++)
                e = this._layers[d],
                this._addItem(e),
                c = c || e.overlay,
                a = a || !e.overlay,
                g += e.overlay ? 0 : 1;
            return this.options.hideSingleBase && (a = a && 1 < g,
            this._baseLayersList.style.display = a ? "" : "none"),
            this._separator.style.display = c && a ? "" : "none",
            this
        },
        _onLayerChange: function(a) {
            this._handlingClick || this._update();
            var c = this._getLayer(b.stamp(a.target));
            (a = c.overlay ? "add" === a.type ? "overlayadd" : "overlayremove" : "add" === a.type ? "baselayerchange" : null) && this._map.fire(a, c)
        },
        _createRadioElement: function(a, b) {
            var c = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"' + (b ? ' checked="checked"' : "") + "/>"
              , e = h.createElement("div");
            return e.innerHTML = c,
            e.firstChild
        },
        _addItem: function(a) {
            var c, d = h.createElement("label"), e = this._map.hasLayer(a.layer);
            a.overlay ? (c = h.createElement("input"),
            c.type = "checkbox",
            c.className = "leaflet-control-layers-selector",
            c.defaultChecked = e) : c = this._createRadioElement("leaflet-base-layers", e);
            c.layerId = b.stamp(a.layer);
            b.DomEvent.on(c, "click", this._onInputClick, this);
            e = h.createElement("span");
            e.innerHTML = " " + a.name;
            var g = h.createElement("div");
            d.appendChild(g);
            g.appendChild(c);
            g.appendChild(e);
            return (a.overlay ? this._overlaysList : this._baseLayersList).appendChild(d),
            this._checkDisabledLayers(),
            d
        },
        _onInputClick: function() {
            var a, b, d, e = this._form.getElementsByTagName("input"), g = [], h = [];
            this._handlingClick = !0;
            for (var l = e.length - 1; 0 <= l; l--)
                a = e[l],
                b = this._getLayer(a.layerId).layer,
                d = this._map.hasLayer(b),
                a.checked && !d ? g.push(b) : !a.checked && d && h.push(b);
            for (l = 0; l < h.length; l++)
                this._map.removeLayer(h[l]);
            for (l = 0; l < g.length; l++)
                this._map.addLayer(g[l]);
            this._handlingClick = !1;
            this._refocusOnMap()
        },
        _checkDisabledLayers: function() {
            for (var a, b, d = this._form.getElementsByTagName("input"), e = this._map.getZoom(), g = d.length - 1; 0 <= g; g--)
                a = d[g],
                b = this._getLayer(a.layerId).layer,
                a.disabled = b.options.minZoom !== n && e < b.options.minZoom || b.options.maxZoom !== n && e > b.options.maxZoom
        },
        _expand: function() {
            return this.expand()
        },
        _collapse: function() {
            return this.collapse()
        }
    });
    b.control.layers = function(a, c, d) {
        return new b.Control.Layers(a,c,d)
    }
    ;
    b.PosAnimation = b.Evented.extend({
        run: function(a, c, d, e) {
            this.stop();
            this._el = a;
            this._inProgress = !0;
            this._duration = d || .25;
            this._easeOutPower = 1 / Math.max(e || .5, .2);
            this._startPos = b.DomUtil.getPosition(a);
            this._offset = c.subtract(this._startPos);
            this._startTime = +new Date;
            this.fire("start");
            this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0),
            this._complete())
        },
        _animate: function() {
            this._animId = b.Util.requestAnimFrame(this._animate, this);
            this._step()
        },
        _step: function(a) {
            var b = +new Date - this._startTime
              , d = 1E3 * this._duration;
            b < d ? this._runFrame(this._easeOut(b / d), a) : (this._runFrame(1),
            this._complete())
        },
        _runFrame: function(a, c) {
            var d = this._startPos.add(this._offset.multiplyBy(a));
            c && d._round();
            b.DomUtil.setPosition(this._el, d);
            this.fire("step")
        },
        _complete: function() {
            b.Util.cancelAnimFrame(this._animId);
            this._inProgress = !1;
            this.fire("end")
        },
        _easeOut: function(a) {
            return 1 - Math.pow(1 - a, this._easeOutPower)
        }
    });
    b.Map.include({
        setView: function(a, c, d) {
            if (c = c === n ? this._zoom : this._limitZoom(c),
            a = this._limitCenter(b.latLng(a), c, this.options.maxBounds),
            d = d || {},
            this._stop(),
            this._loaded && !d.reset && !0 !== d)
                if (d.animate !== n && (d.zoom = b.extend({
                    animate: d.animate
                }, d.zoom),
                d.pan = b.extend({
                    animate: d.animate,
                    duration: d.duration
                }, d.pan)),
                this._zoom !== c ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, c, d.zoom) : this._tryAnimatedPan(a, d.pan))
                    return clearTimeout(this._sizeTimer),
                    this;
            return this._resetView(a, c),
            this
        },
        panBy: function(a, c) {
            if (a = b.point(a).round(),
            c = c || {},
            !a.x && !a.y)
                return this.fire("moveend");
            if (!0 !== c.animate && !this.getSize().contains(a))
                return this._resetView(this.unproject(this.project(this.getCenter()).add(a)), this.getZoom()),
                this;
            if (this._panAnim || (this._panAnim = new b.PosAnimation,
            this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)),
            c.noMoveStart || this.fire("movestart"),
            !1 !== c.animate) {
                b.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var d = this._getMapPanePos().subtract(a).round();
                this._panAnim.run(this._mapPane, d, c.duration || .25, c.easeLinearity)
            } else
                this._rawPanBy(a),
                this.fire("move").fire("moveend");
            return this
        },
        _onPanTransitionStep: function() {
            this.fire("move")
        },
        _onPanTransitionEnd: function() {
            b.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim");
            this.fire("moveend")
        },
        _tryAnimatedPan: function(a, b) {
            var c = this._getCenterOffset(a)._floor();
            return !(!0 !== (b && b.animate) && !this.getSize().contains(c)) && (this.panBy(c, b),
            !0)
        }
    });
    b.Map.mergeOptions({
        zoomAnimation: !0,
        zoomAnimationThreshold: 4
    });
    (g = b.DomUtil.TRANSITION && b.Browser.any3d && !b.Browser.mobileOpera) && b.Map.addInitHook(function() {
        (this._zoomAnimated = this.options.zoomAnimation) && (this._createAnimProxy(),
        b.DomEvent.on(this._proxy, b.DomUtil.TRANSITION_END, this._catchTransitionEnd, this))
    });
    b.Map.include(g ? {
        _createAnimProxy: function() {
            var a = this._proxy = b.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(a);
            this.on("zoomanim", function(c) {
                var d = b.DomUtil.TRANSFORM
                  , e = a.style[d];
                b.DomUtil.setTransform(a, this.project(c.center, c.zoom), this.getZoomScale(c.zoom, 1));
                e === a.style[d] && this._animatingZoom && this._onZoomTransitionEnd()
            }, this);
            this.on("load moveend", function() {
                var c = this.getCenter()
                  , d = this.getZoom();
                b.DomUtil.setTransform(a, this.project(c, d), this.getZoomScale(d, 1))
            }, this)
        },
        _catchTransitionEnd: function(a) {
            this._animatingZoom && 0 <= a.propertyName.indexOf("transform") && this._onZoomTransitionEnd()
        },
        _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
        },
        _tryAnimatedZoom: function(a, c, d) {
            if (this._animatingZoom)
                return !0;
            if (d = d || {},
            !this._zoomAnimated || !1 === d.animate || this._nothingToAnimate() || Math.abs(c - this._zoom) > this.options.zoomAnimationThreshold)
                return !1;
            var e = this.getZoomScale(c)
              , e = this._getCenterOffset(a)._divideBy(1 - 1 / e);
            return !(!0 !== d.animate && !this.getSize().contains(e)) && (b.Util.requestAnimFrame(function() {
                this._moveStart(!0)._animateZoom(a, c, !0)
            }, this),
            !0)
        },
        _animateZoom: function(a, c, d, e) {
            d && (this._animatingZoom = !0,
            this._animateToCenter = a,
            this._animateToZoom = c,
            b.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"));
            this.fire("zoomanim", {
                center: a,
                zoom: c,
                noUpdate: e
            });
            setTimeout(b.bind(this._onZoomTransitionEnd, this), 250)
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (b.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"),
            this._animatingZoom = !1,
            this._move(this._animateToCenter, this._animateToZoom),
            b.Util.requestAnimFrame(function() {
                this._moveEnd(!0)
            }, this))
        }
    } : {});
    b.Map.include({
        flyTo: function(a, c, d) {
            function e(a) {
                a = (t * t - r * r + (a ? -1 : 1) * z * z * w * w) / (2 * (a ? t : r) * z * w);
                a = Math.sqrt(a * a + 1) - a;
                return 1E-9 > a ? -18 : Math.log(a)
            }
            function g(a) {
                return (Math.exp(a) + Math.exp(-a)) / 2
            }
            function h(a) {
                return r * (g(y) / g(y + x * a))
            }
            function l(a) {
                var b = r
                  , c = g(y);
                a = y + x * a;
                a = (Math.exp(a) - Math.exp(-a)) / 2 / g(a);
                return b * (c * a - (Math.exp(y) - Math.exp(-y)) / 2) / z
            }
            function m() {
                var d = (Date.now() - C) / D
                  , e = (1 - Math.pow(1 - d, 1.5)) * A;
                1 >= d ? (this._flyToFrame = b.Util.requestAnimFrame(m, this),
                this._move(this.unproject(p.add(q.subtract(p).multiplyBy(l(e) / w)), u), this.getScaleZoom(r / h(e), u), {
                    flyTo: !0
                })) : this._move(a, c)._moveEnd(!0)
            }
            if (d = d || {},
            !1 === d.animate || !b.Browser.any3d)
                return this.setView(a, c, d);
            this._stop();
            var p = this.project(this.getCenter())
              , q = this.project(a)
              , v = this.getSize()
              , u = this._zoom;
            a = b.latLng(a);
            c = c === n ? u : c;
            var r = Math.max(v.x, v.y)
              , t = r * this.getZoomScale(u, c)
              , w = q.distanceTo(p) || 1
              , x = 1.42
              , z = x * x
              , y = e(0)
              , C = Date.now()
              , A = (e(1) - y) / x
              , D = d.duration ? 1E3 * d.duration : 800 * A;
            return this._moveStart(!0),
            m.call(this),
            this
        },
        flyToBounds: function(a, b) {
            var c = this._getBoundsCenterZoom(a, b);
            return this.flyTo(c.center, c.zoom, b)
        }
    });
    b.Map.include({
        _defaultLocateOptions: {
            timeout: 1E4,
            watch: !1
        },
        locate: function(a) {
            if (a = this._locateOptions = b.extend({}, this._defaultLocateOptions, a),
            !("geolocation"in navigator))
                return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }),
                this;
            var c = b.bind(this._handleGeolocationResponse, this)
              , d = b.bind(this._handleGeolocationError, this);
            return a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(c, d, a) : navigator.geolocation.getCurrentPosition(c, d, a),
            this
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
            this._locateOptions && (this._locateOptions.setView = !1),
            this
        },
        _handleGeolocationError: function(a) {
            var b = a.code;
            a = a.message || (1 === b ? "permission denied" : 2 === b ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld();
            this.fire("locationerror", {
                code: b,
                message: "Geolocation error: " + a + "."
            })
        },
        _handleGeolocationResponse: function(a) {
            var c = new b.LatLng(a.coords.latitude,a.coords.longitude)
              , d = c.toBounds(a.coords.accuracy)
              , e = this._locateOptions;
            if (e.setView) {
                var g = this.getBoundsZoom(d);
                this.setView(c, e.maxZoom ? Math.min(g, e.maxZoom) : g)
            }
            var c = {
                latlng: c,
                bounds: d,
                timestamp: a.timestamp
            }, h;
            for (h in a.coords)
                "number" == typeof a.coords[h] && (c[h] = a.coords[h]);
            this.fire("locationfound", c)
        }
    })
}(window, document);
!function(q, h, n) {
    L.MarkerClusterGroup = L.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            removeOutsideVisibleBounds: !0,
            animate: !0,
            animateAddingMarkers: !1,
            spiderfyDistanceMultiplier: 1,
            spiderLegPolylineOptions: {
                weight: 1.5,
                color: "#222",
                opacity: .5
            },
            chunkedLoading: !1,
            chunkInterval: 200,
            chunkDelay: 50,
            chunkProgress: null,
            polygonOptions: {}
        },
        initialize: function(e) {
            L.Util.setOptions(this, e);
            this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction);
            this._featureGroup = L.featureGroup();
            this._featureGroup.addEventParent(this);
            this._nonPointGroup = L.featureGroup();
            this._nonPointGroup.addEventParent(this);
            this._inZoomAnimation = 0;
            this._needsClustering = [];
            this._needsRemoving = [];
            this._currentShownBounds = null;
            this._queue = [];
            e = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, e ? this._withAnimation : this._noAnimation);
            this._markerCluster = e ? L.MarkerCluster : L.MarkerClusterNonAnimated
        },
        addLayer: function(e) {
            if (e instanceof L.LayerGroup)
                return this.addLayers([e]);
            if (!e.getLatLng)
                return this._nonPointGroup.addLayer(e),
                this;
            if (!this._map)
                return this._needsClustering.push(e),
                this;
            if (this.hasLayer(e))
                return this;
            this._unspiderfy && this._unspiderfy();
            this._addLayer(e, this._maxZoom);
            this._topClusterLevel._recalculateBounds();
            this._refreshClustersIcons();
            var b = e
              , g = this._zoom;
            if (e.__parent)
                for (; b.__parent._zoom >= g; )
                    b = b.__parent;
            return this._currentShownBounds.contains(b.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(e, b) : this._animationAddLayerNonAnimated(e, b)),
            this
        },
        removeLayer: function(e) {
            return e instanceof L.LayerGroup ? this.removeLayers([e]) : e.getLatLng ? this._map ? e.__parent ? (this._unspiderfy && (this._unspiderfy(),
            this._unspiderfyLayer(e)),
            this._removeLayer(e, !0),
            this._topClusterLevel._recalculateBounds(),
            this._refreshClustersIcons(),
            e.off("move", this._childMarkerMoved, this),
            this._featureGroup.hasLayer(e) && (this._featureGroup.removeLayer(e),
            e.clusterShow && e.clusterShow()),
            this) : this : (!this._arraySplice(this._needsClustering, e) && this.hasLayer(e) && this._needsRemoving.push(e),
            this) : (this._nonPointGroup.removeLayer(e),
            this)
        },
        addLayers: function(e) {
            if (!L.Util.isArray(e))
                return this.addLayer(e);
            var b, g = this._featureGroup, a = this._nonPointGroup, c = this.options.chunkedLoading, d = this.options.chunkInterval, f = this.options.chunkProgress, k = e.length, h = 0, l = !0;
            if (this._map) {
                var m = (new Date).getTime()
                  , p = L.bind(function() {
                    for (var n = (new Date).getTime(); k > h && !(c && 0 === h % 200 && (new Date).getTime() - n > d); h++)
                        if (b = e[h],
                        b instanceof L.LayerGroup)
                            l && (e = e.slice(),
                            l = !1),
                            this._extractNonGroupLayers(b, e),
                            k = e.length;
                        else if (b.getLatLng) {
                            if (!this.hasLayer(b) && (this._addLayer(b, this._maxZoom),
                            b.__parent && 2 === b.__parent.getChildCount())) {
                                var q = b.__parent.getAllChildMarkers();
                                g.removeLayer(q[0] === b ? q[1] : q[0])
                            }
                        } else
                            a.addLayer(b);
                    f && f(h, k, (new Date).getTime() - m);
                    h === k ? (this._topClusterLevel._recalculateBounds(),
                    this._refreshClustersIcons(),
                    this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(p, this.options.chunkDelay)
                }, this);
                p()
            } else
                for (var n = this._needsClustering; k > h; h++)
                    b = e[h],
                    b instanceof L.LayerGroup ? (l && (e = e.slice(),
                    l = !1),
                    this._extractNonGroupLayers(b, e),
                    k = e.length) : b.getLatLng ? this.hasLayer(b) || n.push(b) : a.addLayer(b);
            return this
        },
        removeLayers: function(e) {
            var b, g, a = e.length, c = this._featureGroup, d = this._nonPointGroup, f = !0;
            if (!this._map) {
                for (b = 0; a > b; b++)
                    g = e[b],
                    g instanceof L.LayerGroup ? (f && (e = e.slice(),
                    f = !1),
                    this._extractNonGroupLayers(g, e),
                    a = e.length) : (this._arraySplice(this._needsClustering, g),
                    d.removeLayer(g),
                    this.hasLayer(g) && this._needsRemoving.push(g));
                return this
            }
            if (this._unspiderfy) {
                this._unspiderfy();
                var k = e.slice()
                  , h = a;
                for (b = 0; h > b; b++)
                    g = k[b],
                    g instanceof L.LayerGroup ? (this._extractNonGroupLayers(g, k),
                    h = k.length) : this._unspiderfyLayer(g)
            }
            for (b = 0; a > b; b++)
                g = e[b],
                g instanceof L.LayerGroup ? (f && (e = e.slice(),
                f = !1),
                this._extractNonGroupLayers(g, e),
                a = e.length) : g.__parent ? (this._removeLayer(g, !0, !0),
                c.hasLayer(g) && (c.removeLayer(g),
                g.clusterShow && g.clusterShow())) : d.removeLayer(g);
            return this._topClusterLevel._recalculateBounds(),
            this._refreshClustersIcons(),
            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds),
            this
        },
        clearLayers: function() {
            return this._map || (this._needsClustering = [],
            delete this._gridClusters,
            delete this._gridUnclustered),
            this._noanimationUnspiderfy && this._noanimationUnspiderfy(),
            this._featureGroup.clearLayers(),
            this._nonPointGroup.clearLayers(),
            this.eachLayer(function(e) {
                e.off("move", this._childMarkerMoved, this);
                delete e.__parent
            }),
            this._map && this._generateInitialClusters(),
            this
        },
        getBounds: function() {
            var e = new L.LatLngBounds;
            this._topClusterLevel && e.extend(this._topClusterLevel._bounds);
            for (var b = this._needsClustering.length - 1; 0 <= b; b--)
                e.extend(this._needsClustering[b].getLatLng());
            return e.extend(this._nonPointGroup.getBounds()),
            e
        },
        eachLayer: function(e, b) {
            var g, a = this._needsClustering.slice(), c = this._needsRemoving;
            this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(a);
            for (g = a.length - 1; 0 <= g; g--)
                -1 === c.indexOf(a[g]) && e.call(b, a[g]);
            this._nonPointGroup.eachLayer(e, b)
        },
        getLayers: function() {
            var e = [];
            return this.eachLayer(function(b) {
                e.push(b)
            }),
            e
        },
        getLayer: function(e) {
            var b = null;
            return e = parseInt(e, 10),
            this.eachLayer(function(g) {
                L.stamp(g) === e && (b = g)
            }),
            b
        },
        hasLayer: function(e) {
            if (!e)
                return !1;
            var b, g = this._needsClustering;
            for (b = g.length - 1; 0 <= b; b--)
                if (g[b] === e)
                    return !0;
            g = this._needsRemoving;
            for (b = g.length - 1; 0 <= b; b--)
                if (g[b] === e)
                    return !1;
            return !(!e.__parent || e.__parent._group !== this) || this._nonPointGroup.hasLayer(e)
        },
        zoomToShowLayer: function(e, b) {
            "function" != typeof b && (b = function() {}
            );
            var g = function() {
                !e._icon && !e.__parent._icon || this._inZoomAnimation || (this._map.off("moveend", g, this),
                this.off("animationend", g, this),
                e._icon ? b() : e.__parent._icon && (this.once("spiderfied", b, this),
                e.__parent.spiderfy()))
            };
            if (e._icon && this._map.getBounds().contains(e.getLatLng()))
                b();
            else if (e.__parent._zoom < Math.round(this._map._zoom))
                this._map.on("moveend", g, this),
                this._map.panTo(e.getLatLng());
            else {
                var a = function() {
                    this._map.off("movestart", a, this);
                    a = null
                };
                this._map.on("movestart", a, this);
                this._map.on("moveend", g, this);
                this.on("animationend", g, this);
                e.__parent.zoomToBounds();
                a && g.call(this)
            }
        },
        onAdd: function(e) {
            this._map = e;
            var b, g;
            if (!isFinite(this._map.getMaxZoom()))
                throw "Map has no maxZoom specified";
            this._featureGroup.addTo(e);
            this._nonPointGroup.addTo(e);
            this._gridClusters || this._generateInitialClusters();
            this._maxLat = e.options.crs.projection.MAX_LATITUDE;
            e = 0;
            for (b = this._needsRemoving.length; b > e; e++)
                g = this._needsRemoving[e],
                this._removeLayer(g, !0);
            this._needsRemoving = [];
            this._zoom = Math.round(this._map._zoom);
            this._currentShownBounds = this._getExpandedVisibleBounds();
            this._map.on("zoomend", this._zoomEnd, this);
            this._map.on("moveend", this._moveEnd, this);
            this._spiderfierOnAdd && this._spiderfierOnAdd();
            this._bindEvents();
            b = this._needsClustering;
            this._needsClustering = [];
            this.addLayers(b)
        },
        onRemove: function(e) {
            e.off("zoomend", this._zoomEnd, this);
            e.off("moveend", this._moveEnd, this);
            this._unbindEvents();
            this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
            this._spiderfierOnRemove && this._spiderfierOnRemove();
            delete this._maxLat;
            this._hideCoverage();
            this._featureGroup.remove();
            this._nonPointGroup.remove();
            this._featureGroup.clearLayers();
            this._map = null
        },
        getVisibleParent: function(e) {
            for (; e && !e._icon; )
                e = e.__parent;
            return e || null
        },
        _arraySplice: function(e, b) {
            for (var g = e.length - 1; 0 <= g; g--)
                if (e[g] === b)
                    return e.splice(g, 1),
                    !0
        },
        _removeFromGridUnclustered: function(e, b) {
            for (var g = this._map, a = this._gridUnclustered; 0 <= b && a[b].removeObject(e, g.project(e.getLatLng(), b)); b--)
                ;
        },
        _childMarkerMoved: function(e) {
            this._ignoreMove || (e.target._latlng = e.oldLatLng,
            this.removeLayer(e.target),
            e.target._latlng = e.latlng,
            this.addLayer(e.target))
        },
        _removeLayer: function(e, b, g) {
            var a = this._gridClusters
              , c = this._gridUnclustered
              , d = this._featureGroup
              , f = this._map;
            b && this._removeFromGridUnclustered(e, this._maxZoom);
            var k, h = e.__parent;
            for (this._arraySplice(h._markers, e); h && (h._childCount--,
            h._boundsNeedUpdate = !0,
            !(0 > h._zoom)); )
                b && 1 >= h._childCount ? (k = h._markers[0] === e ? h._markers[1] : h._markers[0],
                a[h._zoom].removeObject(h, f.project(h._cLatLng, h._zoom)),
                c[h._zoom].addObject(k, f.project(k.getLatLng(), h._zoom)),
                this._arraySplice(h.__parent._childClusters, h),
                h.__parent._markers.push(k),
                k.__parent = h.__parent,
                h._icon && (d.removeLayer(h),
                g || d.addLayer(k))) : h._iconNeedsUpdate = !0,
                h = h.__parent;
            delete e.__parent
        },
        _isOrIsParent: function(e, b) {
            for (; b; ) {
                if (e === b)
                    return !0;
                b = b.parentNode
            }
            return !1
        },
        fire: function(e, b, g) {
            if (b && b.layer instanceof L.MarkerCluster) {
                if (b.originalEvent && this._isOrIsParent(b.layer._icon, b.originalEvent.relatedTarget))
                    return;
                e = "cluster" + e
            }
            L.FeatureGroup.prototype.fire.call(this, e, b, g)
        },
        listens: function(e, b) {
            return L.FeatureGroup.prototype.listens.call(this, e, b) || L.FeatureGroup.prototype.listens.call(this, "cluster" + e, b)
        },
        _defaultIconCreateFunction: function(e) {
            e = e.getChildCount();
            var b = " marker-cluster-";
            return b += 10 > e ? "small" : 100 > e ? "medium" : "large",
            new L.DivIcon({
                html: "<div><span>" + e + "</span></div>",
                className: "marker-cluster" + b,
                iconSize: new L.Point(40,40)
            })
        },
        _bindEvents: function() {
            var e = this._map
              , b = this.options.showCoverageOnHover
              , g = this.options.zoomToBoundsOnClick;
            (this.options.spiderfyOnMaxZoom || g) && this.on("clusterclick", this._zoomOrSpiderfy, this);
            b && (this.on("clustermouseover", this._showCoverage, this),
            this.on("clustermouseout", this._hideCoverage, this),
            e.on("zoomend", this._hideCoverage, this))
        },
        _zoomOrSpiderfy: function(e) {
            for (var b = e.layer, g = b; 1 === g._childClusters.length; )
                g = g._childClusters[0];
            g._zoom === this._maxZoom && g._childCount === b._childCount && this.options.spiderfyOnMaxZoom ? b.spiderfy() : this.options.zoomToBoundsOnClick && b.zoomToBounds();
            e.originalEvent && 13 === e.originalEvent.keyCode && this._map._container.focus()
        },
        _showCoverage: function(e) {
            var b = this._map;
            this._inZoomAnimation || (this._shownPolygon && b.removeLayer(this._shownPolygon),
            2 < e.layer.getChildCount() && e.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),
            b.addLayer(this._shownPolygon)))
        },
        _hideCoverage: function() {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon),
            this._shownPolygon = null)
        },
        _unbindEvents: function() {
            var e = this.options.showCoverageOnHover
              , b = this.options.zoomToBoundsOnClick
              , g = this._map;
            (this.options.spiderfyOnMaxZoom || b) && this.off("clusterclick", this._zoomOrSpiderfy, this);
            e && (this.off("clustermouseover", this._showCoverage, this),
            this.off("clustermouseout", this._hideCoverage, this),
            g.off("zoomend", this._hideCoverage, this))
        },
        _zoomEnd: function() {
            this._map && (this._mergeSplitClusters(),
            this._zoom = Math.round(this._map._zoom),
            this._currentShownBounds = this._getExpandedVisibleBounds())
        },
        _moveEnd: function() {
            if (!this._inZoomAnimation) {
                var e = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, e);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), e);
                this._currentShownBounds = e
            }
        },
        _generateInitialClusters: function() {
            var e = this._map.getMaxZoom()
              , b = this.options.maxClusterRadius
              , g = b;
            "function" != typeof b && (g = function() {
                return b
            }
            );
            this.options.disableClusteringAtZoom && (e = this.options.disableClusteringAtZoom - 1);
            this._maxZoom = e;
            this._gridClusters = {};
            for (this._gridUnclustered = {}; 0 <= e; e--)
                this._gridClusters[e] = new L.DistanceGrid(g(e)),
                this._gridUnclustered[e] = new L.DistanceGrid(g(e));
            this._topClusterLevel = new this._markerCluster(this,-1)
        },
        _addLayer: function(e, b) {
            var g, a, c = this._gridClusters;
            a = this._gridUnclustered;
            this.options.singleMarkerMode && this._overrideMarkerIcon(e);
            for (e.on("move", this._childMarkerMoved, this); 0 <= b; b--) {
                g = this._map.project(e.getLatLng(), b);
                var d = c[b].getNearObject(g);
                if (d)
                    return d._addChild(e),
                    e.__parent = d,
                    void 0;
                if (d = a[b].getNearObject(g)) {
                    (g = d.__parent) && this._removeLayer(d, !1);
                    a = new this._markerCluster(this,b,d,e);
                    c[b].addObject(a, this._map.project(a._cLatLng, b));
                    d.__parent = a;
                    var f = e.__parent = a;
                    for (a = b - 1; a > g._zoom; a--)
                        f = new this._markerCluster(this,a,f),
                        c[a].addObject(f, this._map.project(d.getLatLng(), a));
                    return g._addChild(f),
                    this._removeFromGridUnclustered(d, b),
                    void 0
                }
                a[b].addObject(e, g)
            }
            this._topClusterLevel._addChild(e);
            e.__parent = this._topClusterLevel
        },
        _refreshClustersIcons: function() {
            this._featureGroup.eachLayer(function(e) {
                e instanceof L.MarkerCluster && e._iconNeedsUpdate && e._updateIcon()
            })
        },
        _enqueue: function(e) {
            this._queue.push(e);
            this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300))
        },
        _processQueue: function() {
            for (var e = 0; e < this._queue.length; e++)
                this._queue[e].call(this);
            this._queue.length = 0;
            clearTimeout(this._queueTimeout);
            this._queueTimeout = null
        },
        _mergeSplitClusters: function() {
            var e = Math.round(this._map._zoom);
            this._processQueue();
            this._zoom < e && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(),
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds()),
            this._animationZoomIn(this._zoom, e)) : this._zoom > e ? (this._animationStart(),
            this._animationZoomOut(this._zoom, e)) : this._moveEnd()
        },
        _getExpandedVisibleBounds: function() {
            return this.options.removeOutsideVisibleBounds ? L.Browser.mobile ? this._checkBoundsMaxLat(this._map.getBounds()) : this._checkBoundsMaxLat(this._map.getBounds().pad(1)) : this._mapBoundsInfinite
        },
        _checkBoundsMaxLat: function(e) {
            var b = this._maxLat;
            return b !== n && (e.getNorth() >= b && (e._northEast.lat = 1 / 0),
            e.getSouth() <= -b && (e._southWest.lat = -1 / 0)),
            e
        },
        _animationAddLayerNonAnimated: function(e, b) {
            if (b === e)
                this._featureGroup.addLayer(e);
            else if (2 === b._childCount) {
                b._addToMap();
                var g = b.getAllChildMarkers();
                this._featureGroup.removeLayer(g[0]);
                this._featureGroup.removeLayer(g[1])
            } else
                b._updateIcon()
        },
        _extractNonGroupLayers: function(e, b) {
            var g, a = e.getLayers(), c = 0;
            for (b = b || []; c < a.length; c++)
                g = a[c],
                g instanceof L.LayerGroup ? this._extractNonGroupLayers(g, b) : b.push(g);
            return b
        },
        _overrideMarkerIcon: function(e) {
            return e.options.icon = this.options.iconCreateFunction({
                getChildCount: function() {
                    return 1
                },
                getAllChildMarkers: function() {
                    return [e]
                }
            })
        }
    });
    L.MarkerClusterGroup.include({
        _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0,-1 / 0),new L.LatLng(1 / 0,1 / 0))
    });
    L.MarkerClusterGroup.include({
        _noAnimation: {
            _animationStart: function() {},
            _animationZoomIn: function(e, b) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, e);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds());
                this.fire("animationend")
            },
            _animationZoomOut: function(e, b) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, e);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds());
                this.fire("animationend")
            },
            _animationAddLayer: function(e, b) {
                this._animationAddLayerNonAnimated(e, b)
            }
        },
        _withAnimation: {
            _animationStart: function() {
                this._map._mapPane.className += " leaflet-cluster-anim";
                this._inZoomAnimation++
            },
            _animationZoomIn: function(e, b) {
                var g, a = this._getExpandedVisibleBounds(), c = this._featureGroup;
                this._ignoreMove = !0;
                this._topClusterLevel._recursively(a, e, 0, function(d) {
                    var f = d._latlng
                      , k = d._markers;
                    a.contains(f) || (f = null);
                    d._isSingleParent() && e + 1 === b ? (c.removeLayer(d),
                    d._recursivelyAddChildrenToMap(null, b, a)) : (d.clusterHide(),
                    d._recursivelyAddChildrenToMap(f, b, a));
                    for (g = k.length - 1; 0 <= g; g--)
                        d = k[g],
                        a.contains(d._latlng) || c.removeLayer(d)
                });
                this._forceLayout();
                this._topClusterLevel._recursivelyBecomeVisible(a, b);
                c.eachLayer(function(a) {
                    a instanceof L.MarkerCluster || !a._icon || a.clusterShow()
                });
                this._topClusterLevel._recursively(a, e, b, function(a) {
                    a._recursivelyRestoreChildPositions(b)
                });
                this._ignoreMove = !1;
                this._enqueue(function() {
                    this._topClusterLevel._recursively(a, e, 0, function(a) {
                        c.removeLayer(a);
                        a.clusterShow()
                    });
                    this._animationEnd()
                })
            },
            _animationZoomOut: function(e, b) {
                this._animationZoomOutSingle(this._topClusterLevel, e - 1, b);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds());
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, e, this._getExpandedVisibleBounds())
            },
            _animationAddLayer: function(e, b) {
                var g = this
                  , a = this._featureGroup;
                a.addLayer(e);
                b !== e && (2 < b._childCount ? (b._updateIcon(),
                this._forceLayout(),
                this._animationStart(),
                e._setPos(this._map.latLngToLayerPoint(b.getLatLng())),
                e.clusterHide(),
                this._enqueue(function() {
                    a.removeLayer(e);
                    e.clusterShow();
                    g._animationEnd()
                })) : (this._forceLayout(),
                g._animationStart(),
                g._animationZoomOutSingle(b, this._map.getMaxZoom(), this._zoom)))
            }
        },
        _animationZoomOutSingle: function(e, b, g) {
            var a = this._getExpandedVisibleBounds();
            e._recursivelyAnimateChildrenInAndAddSelfToMap(a, b + 1, g);
            var c = this;
            this._forceLayout();
            e._recursivelyBecomeVisible(a, g);
            this._enqueue(function() {
                if (1 === e._childCount) {
                    var d = e._markers[0];
                    this._ignoreMove = !0;
                    d.setLatLng(d.getLatLng());
                    this._ignoreMove = !1;
                    d.clusterShow && d.clusterShow()
                } else
                    e._recursively(a, g, 0, function(c) {
                        c._recursivelyRemoveChildrenFromMap(a, b + 1)
                    });
                c._animationEnd()
            })
        },
        _animationEnd: function() {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""));
            this._inZoomAnimation--;
            this.fire("animationend")
        },
        _forceLayout: function() {
            L.Util.falseFn(h.body.offsetWidth)
        }
    });
    L.markerClusterGroup = function(e) {
        return new L.MarkerClusterGroup(e)
    }
    ;
    L.MarkerCluster = L.Marker.extend({
        initialize: function(e, b, g, a) {
            L.Marker.prototype.initialize.call(this, g ? g._cLatLng || g.getLatLng() : new L.LatLng(0,0), {
                icon: this
            });
            this._group = e;
            this._zoom = b;
            this._markers = [];
            this._childClusters = [];
            this._childCount = 0;
            this._boundsNeedUpdate = this._iconNeedsUpdate = !0;
            this._bounds = new L.LatLngBounds;
            g && this._addChild(g);
            a && this._addChild(a)
        },
        getAllChildMarkers: function(e) {
            e = e || [];
            for (var b = this._childClusters.length - 1; 0 <= b; b--)
                this._childClusters[b].getAllChildMarkers(e);
            for (b = this._markers.length - 1; 0 <= b; b--)
                e.push(this._markers[b]);
            return e
        },
        getChildCount: function() {
            return this._childCount
        },
        zoomToBounds: function() {
            var e, b = this._childClusters.slice();
            e = this._group._map;
            for (var g = e.getBoundsZoom(this._bounds), a = this._zoom + 1, c = e.getZoom(); 0 < b.length && g > a; ) {
                a++;
                var d = [];
                for (e = 0; e < b.length; e++)
                    d = d.concat(b[e]._childClusters);
                b = d
            }
            g > a ? this._group._map.setView(this._latlng, a) : c >= g ? this._group._map.setView(this._latlng, c + 1) : this._group._map.fitBounds(this._bounds)
        },
        getBounds: function() {
            var e = new L.LatLngBounds;
            return e.extend(this._bounds),
            e
        },
        _updateIcon: function() {
            this._iconNeedsUpdate = !0;
            this._icon && this.setIcon(this)
        },
        createIcon: function() {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this),
            this._iconNeedsUpdate = !1),
            this._iconObj.createIcon()
        },
        createShadow: function() {
            return this._iconObj.createShadow()
        },
        _addChild: function(e, b) {
            this._boundsNeedUpdate = this._iconNeedsUpdate = !0;
            this._setClusterCenter(e);
            e instanceof L.MarkerCluster ? (b || (this._childClusters.push(e),
            e.__parent = this),
            this._childCount += e._childCount) : (b || this._markers.push(e),
            this._childCount++);
            this.__parent && this.__parent._addChild(e, !0)
        },
        _setClusterCenter: function(e) {
            this._cLatLng || (this._cLatLng = e._cLatLng || e._latlng)
        },
        _resetBounds: function() {
            var e = this._bounds;
            e._southWest && (e._southWest.lat = 1 / 0,
            e._southWest.lng = 1 / 0);
            e._northEast && (e._northEast.lat = -1 / 0,
            e._northEast.lng = -1 / 0)
        },
        _recalculateBounds: function() {
            var e, b, g;
            b = this._markers;
            var a = this._childClusters
              , c = 0
              , d = 0
              , f = this._childCount;
            if (0 !== f) {
                this._resetBounds();
                for (e = 0; e < b.length; e++)
                    g = b[e]._latlng,
                    this._bounds.extend(g),
                    c += g.lat,
                    d += g.lng;
                for (e = 0; e < a.length; e++)
                    b = a[e],
                    b._boundsNeedUpdate && b._recalculateBounds(),
                    this._bounds.extend(b._bounds),
                    g = b._wLatLng,
                    b = b._childCount,
                    c += g.lat * b,
                    d += g.lng * b;
                this._latlng = this._wLatLng = new L.LatLng(c / f,d / f);
                this._boundsNeedUpdate = !1
            }
        },
        _addToMap: function(e) {
            e && (this._backupLatlng = this._latlng,
            this.setLatLng(e));
            this._group._featureGroup.addLayer(this)
        },
        _recursivelyAnimateChildrenIn: function(e, b, g) {
            this._recursively(e, 0, g - 1, function(a) {
                var c, d = a._markers;
                for (a = d.length - 1; 0 <= a; a--)
                    c = d[a],
                    c._icon && (c._setPos(b),
                    c.clusterHide())
            }, function(a) {
                var c, d = a._childClusters;
                for (a = d.length - 1; 0 <= a; a--)
                    c = d[a],
                    c._icon && (c._setPos(b),
                    c.clusterHide())
            })
        },
        _recursivelyAnimateChildrenInAndAddSelfToMap: function(e, b, g) {
            this._recursively(e, g, 0, function(a) {
                a._recursivelyAnimateChildrenIn(e, a._group._map.latLngToLayerPoint(a.getLatLng()).round(), b);
                a._isSingleParent() && b - 1 === g ? (a.clusterShow(),
                a._recursivelyRemoveChildrenFromMap(e, b)) : a.clusterHide();
                a._addToMap()
            })
        },
        _recursivelyBecomeVisible: function(e, b) {
            this._recursively(e, 0, b, null, function(b) {
                b.clusterShow()
            })
        },
        _recursivelyAddChildrenToMap: function(e, b, g) {
            this._recursively(g, -1, b, function(a) {
                if (b !== a._zoom)
                    for (var c = a._markers.length - 1; 0 <= c; c--) {
                        var d = a._markers[c];
                        g.contains(d._latlng) && (e && (d._backupLatlng = d.getLatLng(),
                        d.setLatLng(e),
                        d.clusterHide && d.clusterHide()),
                        a._group._featureGroup.addLayer(d))
                    }
            }, function(a) {
                a._addToMap(e)
            })
        },
        _recursivelyRestoreChildPositions: function(e) {
            for (var b = this._markers.length - 1; 0 <= b; b--) {
                var g = this._markers[b];
                g._backupLatlng && (g.setLatLng(g._backupLatlng),
                delete g._backupLatlng)
            }
            if (e - 1 === this._zoom)
                for (e = this._childClusters.length - 1; 0 <= e; e--)
                    this._childClusters[e]._restorePosition();
            else
                for (b = this._childClusters.length - 1; 0 <= b; b--)
                    this._childClusters[b]._recursivelyRestoreChildPositions(e)
        },
        _restorePosition: function() {
            this._backupLatlng && (this.setLatLng(this._backupLatlng),
            delete this._backupLatlng)
        },
        _recursivelyRemoveChildrenFromMap: function(e, b, g) {
            var a, c;
            this._recursively(e, -1, b - 1, function(b) {
                for (c = b._markers.length - 1; 0 <= c; c--)
                    a = b._markers[c],
                    g && g.contains(a._latlng) || (b._group._featureGroup.removeLayer(a),
                    a.clusterShow && a.clusterShow())
            }, function(b) {
                for (c = b._childClusters.length - 1; 0 <= c; c--)
                    a = b._childClusters[c],
                    g && g.contains(a._latlng) || (b._group._featureGroup.removeLayer(a),
                    a.clusterShow && a.clusterShow())
            })
        },
        _recursively: function(e, b, g, a, c) {
            var d, f, k = this._childClusters;
            d = this._zoom;
            if (d >= b && (a && a(this),
            c && d === g && c(this)),
            b > d || g > d)
                for (d = k.length - 1; 0 <= d; d--)
                    f = k[d],
                    e.intersects(f._bounds) && f._recursively(e, b, g, a, c)
        },
        _isSingleParent: function() {
            return 0 < this._childClusters.length && this._childClusters[0]._childCount === this._childCount
        }
    });
    L.Marker.include({
        clusterHide: function() {
            return this.options.opacityWhenUnclustered = this.options.opacity || 1,
            this.setOpacity(0)
        },
        clusterShow: function() {
            var e = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
            return delete this.options.opacityWhenUnclustered,
            e
        }
    });
    L.DistanceGrid = function(e) {
        this._cellSize = e;
        this._sqCellSize = e * e;
        this._grid = {};
        this._objectPoint = {}
    }
    ;
    L.DistanceGrid.prototype = {
        addObject: function(e, b) {
            var g = this._getCoord(b.x)
              , a = this._getCoord(b.y)
              , c = this._grid
              , a = c[a] = c[a] || {}
              , g = a[g] = a[g] || []
              , a = L.Util.stamp(e);
            this._objectPoint[a] = b;
            g.push(e)
        },
        updateObject: function(e, b) {
            this.removeObject(e);
            this.addObject(e, b)
        },
        removeObject: function(e, b) {
            var g, a, c = this._getCoord(b.x);
            g = this._getCoord(b.y);
            a = this._grid;
            var d = a[g] = a[g] || {}
              , f = d[c] = d[c] || [];
            delete this._objectPoint[L.Util.stamp(e)];
            g = 0;
            for (a = f.length; a > g; g++)
                if (f[g] === e)
                    return f.splice(g, 1),
                    1 === a && delete d[c],
                    !0
        },
        eachObject: function(e, b) {
            var g, a, c, d, f, k, h = this._grid;
            for (g in h)
                for (a in f = h[g],
                f)
                    for (k = f[a],
                    c = 0,
                    d = k.length; d > c; c++)
                        e.call(b, k[c]) && (c--,
                        d--)
        },
        getNearObject: function(e) {
            var b, g, a, c, d, f, k, h, l = this._getCoord(e.x), m = this._getCoord(e.y), p = this._objectPoint, n = this._sqCellSize, q = null;
            for (b = m - 1; m + 1 >= b; b++)
                if (c = this._grid[b])
                    for (g = l - 1; l + 1 >= g; g++)
                        if (d = c[g])
                            for (a = 0,
                            f = d.length; f > a; a++)
                                k = d[a],
                                h = this._sqDist(p[L.Util.stamp(k)], e),
                                n > h && (n = h,
                                q = k);
            return q
        },
        _getCoord: function(e) {
            return Math.floor(e / this._cellSize)
        },
        _sqDist: function(e, b) {
            var g = b.x - e.x
              , a = b.y - e.y;
            return g * g + a * a
        }
    };
    (function() {
        L.QuickHull = {
            getDistant: function(e, b) {
                return (b[0].lng - b[1].lng) * (e.lat - b[0].lat) + (b[1].lat - b[0].lat) * (e.lng - b[0].lng)
            },
            findMostDistantPointFromBaseLine: function(e, b) {
                var g, a, c, d = 0, f = null, k = [];
                for (g = b.length - 1; 0 <= g; g--)
                    a = b[g],
                    c = this.getDistant(a, e),
                    0 < c && (k.push(a),
                    c > d && (d = c,
                    f = a));
                return {
                    maxPoint: f,
                    newPoints: k
                }
            },
            buildConvexHull: function(e, b) {
                var g = []
                  , a = this.findMostDistantPointFromBaseLine(e, b);
                return a.maxPoint ? (g = g.concat(this.buildConvexHull([e[0], a.maxPoint], a.newPoints)),
                g.concat(this.buildConvexHull([a.maxPoint, e[1]], a.newPoints))) : [e[0]]
            },
            getConvexHull: function(e) {
                var b, g = !1, a = !1, c = !1, d = !1, f = null, k = null, h = null, l = null, m = null, p = null;
                for (b = e.length - 1; 0 <= b; b--) {
                    var n = e[b];
                    (!1 === g || n.lat > g) && (f = n,
                    g = n.lat);
                    (!1 === a || n.lat < a) && (k = n,
                    a = n.lat);
                    (!1 === c || n.lng > c) && (h = n,
                    c = n.lng);
                    (!1 === d || n.lng < d) && (l = n,
                    d = n.lng)
                }
                a !== g ? (p = k,
                m = f) : (p = l,
                m = h);
                return [].concat(this.buildConvexHull([p, m], e), this.buildConvexHull([m, p], e))
            }
        }
    })();
    L.MarkerCluster.include({
        getConvexHull: function() {
            var e, b, g = this.getAllChildMarkers(), a = [];
            for (b = g.length - 1; 0 <= b; b--)
                e = g[b].getLatLng(),
                a.push(e);
            return L.QuickHull.getConvexHull(a)
        }
    });
    L.MarkerCluster.include({
        _2PI: 2 * Math.PI,
        _circleFootSeparation: 25,
        _circleStartAngle: Math.PI / 6,
        _spiralFootSeparation: 28,
        _spiralLengthStart: 11,
        _spiralLengthFactor: 5,
        _circleSpiralSwitchover: 9,
        spiderfy: function() {
            if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                var e, b = this.getAllChildMarkers(), g = this._group._map.latLngToLayerPoint(this._latlng);
                this._group._unspiderfy();
                this._group._spiderfied = this;
                b.length >= this._circleSpiralSwitchover ? e = this._generatePointsSpiral(b.length, g) : (g.y += 10,
                e = this._generatePointsCircle(b.length, g));
                this._animationSpiderfy(b, e)
            }
        },
        unspiderfy: function(e) {
            this._group._inZoomAnimation || (this._animationUnspiderfy(e),
            this._group._spiderfied = null)
        },
        _generatePointsCircle: function(e, b) {
            var g, a, c = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + e) / this._2PI, d = this._2PI / e, f = [];
            f.length = e;
            for (g = e - 1; 0 <= g; g--)
                a = this._circleStartAngle + g * d,
                f[g] = (new L.Point(b.x + c * Math.cos(a),b.y + c * Math.sin(a)))._round();
            return f
        },
        _generatePointsSpiral: function(e, b) {
            var g;
            g = this._group.options.spiderfyDistanceMultiplier;
            var a = g * this._spiralLengthStart
              , c = g * this._spiralFootSeparation
              , d = g * this._spiralLengthFactor * this._2PI
              , f = 0
              , k = [];
            k.length = e;
            for (g = e - 1; 0 <= g; g--)
                f += c / a + 5E-4 * g,
                k[g] = (new L.Point(b.x + a * Math.cos(f),b.y + a * Math.sin(f)))._round(),
                a += d / f;
            return k
        },
        _noanimationUnspiderfy: function() {
            var e, b, g = this._group, a = g._map, c = g._featureGroup, d = this.getAllChildMarkers();
            g._ignoreMove = !0;
            this.setOpacity(1);
            for (b = d.length - 1; 0 <= b; b--)
                e = d[b],
                c.removeLayer(e),
                e._preSpiderfyLatlng && (e.setLatLng(e._preSpiderfyLatlng),
                delete e._preSpiderfyLatlng),
                e.setZIndexOffset && e.setZIndexOffset(0),
                e._spiderLeg && (a.removeLayer(e._spiderLeg),
                delete e._spiderLeg);
            g.fire("unspiderfied", {
                cluster: this,
                markers: d
            });
            g._ignoreMove = !1;
            g._spiderfied = null
        }
    });
    L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
        _animationSpiderfy: function(e, b) {
            var g, a, c, d, f = this._group, k = f._map, h = f._featureGroup, l = this._group.options.spiderLegPolylineOptions;
            f._ignoreMove = !0;
            for (g = 0; g < e.length; g++)
                d = k.layerPointToLatLng(b[g]),
                a = e[g],
                c = new L.Polyline([this._latlng, d],l),
                k.addLayer(c),
                a._spiderLeg = c,
                a._preSpiderfyLatlng = a._latlng,
                a.setLatLng(d),
                a.setZIndexOffset && a.setZIndexOffset(1E6),
                h.addLayer(a);
            this.setOpacity(.3);
            f._ignoreMove = !1;
            f.fire("spiderfied", {
                cluster: this,
                markers: e
            })
        },
        _animationUnspiderfy: function() {
            this._noanimationUnspiderfy()
        }
    });
    L.MarkerCluster.include({
        _animationSpiderfy: function(e, b) {
            var g, a, c, d, f, k, h = this, l = this._group, m = l._map, p = l._featureGroup, q = this._latlng, v = m.latLngToLayerPoint(q), u = L.Path.SVG, r = L.extend({}, this._group.options.spiderLegPolylineOptions), t = r.opacity;
            t === n && (t = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity);
            u ? (r.opacity = 0,
            r.className = (r.className || "") + " leaflet-cluster-spider-leg") : r.opacity = t;
            l._ignoreMove = !0;
            for (g = 0; g < e.length; g++)
                a = e[g],
                k = m.layerPointToLatLng(b[g]),
                c = new L.Polyline([q, k],r),
                m.addLayer(c),
                a._spiderLeg = c,
                u && (d = c._path,
                f = d.getTotalLength() + .1,
                d.style.strokeDasharray = f,
                d.style.strokeDashoffset = f),
                a.setZIndexOffset && a.setZIndexOffset(1E6),
                a.clusterHide && a.clusterHide(),
                p.addLayer(a),
                a._setPos && a._setPos(v);
            l._forceLayout();
            l._animationStart();
            for (g = e.length - 1; 0 <= g; g--)
                k = m.layerPointToLatLng(b[g]),
                a = e[g],
                a._preSpiderfyLatlng = a._latlng,
                a.setLatLng(k),
                a.clusterShow && a.clusterShow(),
                u && (c = a._spiderLeg,
                d = c._path,
                d.style.strokeDashoffset = 0,
                c.setStyle({
                    opacity: t
                }));
            this.setOpacity(.3);
            l._ignoreMove = !1;
            setTimeout(function() {
                l._animationEnd();
                l.fire("spiderfied", {
                    cluster: h,
                    markers: e
                })
            }, 200)
        },
        _animationUnspiderfy: function(e) {
            var b, g, a, c, d, f, k = this, h = this._group, l = h._map, m = h._featureGroup;
            e = e ? l._latLngToNewLayerPoint(this._latlng, e.zoom, e.center) : l.latLngToLayerPoint(this._latlng);
            var n = this.getAllChildMarkers()
              , q = L.Path.SVG;
            h._ignoreMove = !0;
            h._animationStart();
            this.setOpacity(1);
            for (g = n.length - 1; 0 <= g; g--)
                b = n[g],
                b._preSpiderfyLatlng && (b.setLatLng(b._preSpiderfyLatlng),
                delete b._preSpiderfyLatlng,
                f = !0,
                b._setPos && (b._setPos(e),
                f = !1),
                b.clusterHide && (b.clusterHide(),
                f = !1),
                f && m.removeLayer(b),
                q && (a = b._spiderLeg,
                c = a._path,
                d = c.getTotalLength() + .1,
                c.style.strokeDashoffset = d,
                a.setStyle({
                    opacity: 0
                })));
            h._ignoreMove = !1;
            setTimeout(function() {
                var a = 0;
                for (g = n.length - 1; 0 <= g; g--)
                    b = n[g],
                    b._spiderLeg && a++;
                for (g = n.length - 1; 0 <= g; g--)
                    b = n[g],
                    b._spiderLeg && (b.clusterShow && b.clusterShow(),
                    b.setZIndexOffset && b.setZIndexOffset(0),
                    1 < a && m.removeLayer(b),
                    l.removeLayer(b._spiderLeg),
                    delete b._spiderLeg);
                h._animationEnd();
                h.fire("unspiderfied", {
                    cluster: k,
                    markers: n
                })
            }, 200)
        }
    });
    L.MarkerClusterGroup.include({
        _spiderfied: null,
        unspiderfy: function() {
            this._unspiderfy.apply(this, arguments)
        },
        _spiderfierOnAdd: function() {
            this._map.on("click", this._unspiderfyWrapper, this);
            this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this);
            this._map.on("zoomend", this._noanimationUnspiderfy, this);
            L.Browser.touch || this._map.getRenderer(this)
        },
        _spiderfierOnRemove: function() {
            this._map.off("click", this._unspiderfyWrapper, this);
            this._map.off("zoomstart", this._unspiderfyZoomStart, this);
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
            this._map.off("zoomend", this._noanimationUnspiderfy, this);
            this._noanimationUnspiderfy()
        },
        _unspiderfyZoomStart: function() {
            this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
        },
        _unspiderfyZoomAnim: function(e) {
            L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this),
            this._unspiderfy(e))
        },
        _unspiderfyWrapper: function() {
            this._unspiderfy()
        },
        _unspiderfy: function(e) {
            this._spiderfied && this._spiderfied.unspiderfy(e)
        },
        _noanimationUnspiderfy: function() {
            this._spiderfied && this._spiderfied._noanimationUnspiderfy()
        },
        _unspiderfyLayer: function(e) {
            e._spiderLeg && (this._featureGroup.removeLayer(e),
            e.clusterShow && e.clusterShow(),
            e.setZIndexOffset && e.setZIndexOffset(0),
            this._map.removeLayer(e._spiderLeg),
            delete e._spiderLeg)
        }
    });
    L.MarkerClusterGroup.include({
        refreshClusters: function(e) {
            return e ? e instanceof L.MarkerClusterGroup ? e = e._topClusterLevel.getAllChildMarkers() : e instanceof L.LayerGroup ? e = e._layers : e instanceof L.MarkerCluster ? e = e.getAllChildMarkers() : e instanceof L.Marker && (e = [e]) : e = this._topClusterLevel.getAllChildMarkers(),
            this._flagParentsIconsNeedUpdate(e),
            this._refreshClustersIcons(),
            this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(e),
            this
        },
        _flagParentsIconsNeedUpdate: function(e) {
            var b, g;
            for (b in e)
                for (g = e[b].__parent; g; )
                    g._iconNeedsUpdate = !0,
                    g = g.__parent
        },
        _refreshSingleMarkerModeMarkers: function(e) {
            var b, g;
            for (b in e)
                g = e[b],
                this.hasLayer(g) && g.setIcon(this._overrideMarkerIcon(g))
        }
    });
    L.Marker.include({
        refreshIconOptions: function(e, b) {
            var g = this.options.icon;
            return L.setOptions(g, e),
            this.setIcon(g),
            b && this.__parent && this.__parent._group.refreshClusters(this),
            this
        }
    })
}(window, document);
