(function(l, m) {
    'use strict';
    if (!l)
        return;
    var $ = l.$;
    var n = baron;
    var o = ['left', 'top', 'right', 'bottom', 'width', 'height'];
    var p = [];
    var q = {
        v: {
            x: 'Y',
            pos: o[1],
            oppos: o[3],
            crossPos: o[0],
            crossOpPos: o[2],
            size: o[5],
            crossSize: o[4],
            crossMinSize: 'min-' + o[4],
            crossMaxSize: 'max-' + o[4],
            client: 'clientHeight',
            crossClient: 'clientWidth',
            scrollEdge: 'scrollLeft',
            offset: 'offsetHeight',
            crossOffset: 'offsetWidth',
            offsetPos: 'offsetTop',
            scroll: 'scrollTop',
            scrollSize: 'scrollHeight'
        },
        h: {
            x: 'X',
            pos: o[0],
            oppos: o[2],
            crossPos: o[1],
            crossOpPos: o[3],
            size: o[4],
            crossSize: o[5],
            crossMinSize: 'min-' + o[5],
            crossMaxSize: 'max-' + o[5],
            client: 'clientWidth',
            crossClient: 'clientHeight',
            scrollEdge: 'scrollTop',
            offset: 'offsetWidth',
            crossOffset: 'offsetHeight',
            offsetPos: 'offsetLeft',
            scroll: 'scrollLeft',
            scrollSize: 'scrollWidth'
        }
    };
    function baron(e) {
        var f;
        var g;
        var h = !e;
        var i = {
            $: l.jQuery,
            direction: 'v',
            barOnCls: '_scrollbar',
            resizeDebounce: 0,
            event: function(a, b, c, d) {
                e.$(a)[d || 'on'](b, c)
            },
            cssGuru: !1
        };
        e = e || {};
        for (var j in i) {
            if (e[j] === m) {
                e[j] = i[j]
            }
        }
        ;f = this instanceof e.$;
        if (f) {
            e.root = g = this
        } else {
            g = e.$(e.root || e.scroller)
        }
        var k = new baron.fn.constructor(g,e,h);
        if (k.autoUpdate && !h) {
            k.autoUpdate()
        }
        return k
    }
    function arrayEach(a, b) {
        var i = 0;
        if (a.length === m || a === l)
            a = [a];
        while (a[i]) {
            b.call(this, a[i], i);
            i++
        }
    }
    function getTime() {
        return new Date().getTime()
    }
    baron._instances = p;
    baron.fn = {
        constructor: function(f, g, h) {
            var j = clone(g);
            j.event = function(b, e, c, d) {
                arrayEach(b, function(a) {
                    g.event(a, e, c, d)
                })
            }
            ;
            this.length = 0;
            arrayEach.call(this, f, function(a, i) {
                var b = manageAttr(a, j.direction);
                var c = +b;
                if (c == c && b != m && p[c] && h) {
                    this[i] = p[c]
                } else {
                    var d = clone(j);
                    if (j.root && j.scroller) {
                        d.scroller = j.$(j.scroller, a);
                        if (!d.scroller.length) {
                            d.scroller = a
                        }
                    } else {
                        d.scroller = a
                    }
                    d.root = a;
                    this[i] = init(d)
                }
                this.length = i + 1
            });
            this.params = j
        },
        dispose: function() {
            var b = this.params;
            arrayEach(this, function(a) {
                a.dispose(b)
            });
            this.params = null
        },
        update: function() {
            var i = 0;
            while (this[i]) {
                this[i].update.apply(this[i], arguments);
                i++
            }
        },
        baron: function(b) {
            b.root = [];
            b.scroller = this.params.scroller;
            arrayEach.call(this, this, function(a) {
                b.root.push(a.root)
            });
            b.direction = (this.params.direction == 'v') ? 'h' : 'v';
            b._chain = !0;
            return baron(b)
        }
    };
    function manageEvents(b, c, d) {
        b._eventHandlers = b._eventHandlers || [{
            element: b.scroller,
            handler: function(e) {
                b.scroll(e)
            },
            type: 'scroll'
        }, {
            element: b.root,
            handler: function() {
                b.update()
            },
            type: 'transitionend animationend'
        }, {
            element: b.scroller,
            handler: function() {
                b.update()
            },
            type: 'keyup'
        }, {
            element: b.bar,
            handler: function(e) {
                e.preventDefault();
                b.selection();
                b.drag.now = 1;
                if (b.draggingCls) {
                    $(b.bar).addClass(b.draggingCls)
                }
            },
            type: 'touchstart mousedown'
        }, {
            element: document,
            handler: function() {
                b.selection(1);
                b.drag.now = 0;
                if (b.draggingCls) {
                    $(b.bar).removeClass(b.draggingCls)
                }
            },
            type: 'mouseup blur touchend'
        }, {
            element: document,
            handler: function(e) {
                if (e.button != 2) {
                    b._pos0(e)
                }
            },
            type: 'touchstart mousedown'
        }, {
            element: document,
            handler: function(e) {
                if (b.drag.now) {
                    b.drag(e)
                }
            },
            type: 'mousemove touchmove'
        }, {
            element: l,
            handler: function() {
                b.update()
            },
            type: 'resize'
        }, {
            element: b.root,
            handler: function() {
                b.update()
            },
            type: 'sizeChange'
        }, {
            element: b.clipper,
            handler: function() {
                b.clipperOnScroll()
            },
            type: 'scroll'
        }];
        arrayEach(b._eventHandlers, function(a) {
            if (a.element) {
                c(a.element, a.type, a.handler, d)
            }
        })
    }
    function manageAttr(a, b, c, d) {
        var e = 'data-baron-' + b + '-id';
        if (c == 'on') {
            a.setAttribute(e, d)
        } else if (c == 'off') {
            a.removeAttribute(e)
        } else {
            return a.getAttribute(e)
        }
    }
    function init(a) {
        if (manageAttr(a.root, a.direction)) {
            console.log('Error! Baron for this node already initialized', a.root)
        }
        var b = new s.prototype.constructor(a);
        manageEvents(b, a.event, 'on');
        manageAttr(b.root, a.direction, 'on', p.length);
        p.push(b);
        b.update();
        b.scrollEdge = 0;
        if (a.rtl) {
            b.scrollEdge = b.clipper[b.origin.scrollEdge]
        }
        return b
    }
    function clone(a) {
        var b = {};
        a = a || {};
        for (var c in a) {
            if (a.hasOwnProperty(c)) {
                b[c] = a[c]
            }
        }
        return b
    }
    function validate(f) {
        var g = clone(f);
        g.event = function(b, e, c, d) {
            arrayEach(b, function(a) {
                f.event(a, e, c, d)
            })
        }
        ;
        return g
    }
    function fire(a) {
        if (this.events && this.events[a]) {
            for (var i = 0; i < this.events[a].length; i++) {
                var b = Array.prototype.slice.call(arguments, 1);
                this.events[a][i].apply(this, b)
            }
        }
    }
    var s = {};
    s.prototype = {
        _debounce: function(b, c) {
            var d = this, timeout, timestamp;
            var e = function() {
                if (d._disposed) {
                    clearTimeout(timeout);
                    timeout = d = null;
                    return
                }
                var a = getTime() - timestamp;
                if (a < c && a >= 0) {
                    timeout = setTimeout(e, c - a)
                } else {
                    timeout = null;
                    b()
                }
            };
            return function() {
                timestamp = getTime();
                if (!timeout) {
                    timeout = setTimeout(e, c)
                }
            }
        },
        constructor: function(j) {
            var $, barPos, scrollerPos0, track, resizePauseTimer, scrollingTimer, scrollLastFire, resizeLastFire, oldBarSize;
            resizeLastFire = scrollLastFire = getTime();
            $ = this.$ = j.$;
            this.event = j.event;
            this.events = {};
            function getNode(a, b) {
                return $(a, b)[0]
            }
            this.root = j.root;
            this.scroller = getNode(j.scroller);
            this.bar = getNode(j.bar, this.root);
            track = this.track = getNode(j.track, this.root);
            if (!this.track && this.bar) {
                track = this.bar.parentNode
            }
            this.clipper = this.scroller.parentNode;
            this.direction = j.direction;
            this.origin = q[this.direction];
            this.barOnCls = j.barOnCls || '_baron';
            this.scrollingCls = j.scrollingCls;
            this.draggingCls = j.draggingCls;
            this.impact = j.impact;
            this.barTopLimit = 0;
            this.resizeDebounce = j.resizeDebounce;
            function setBarSize(a) {
                var b = this.barMinSize || 20;
                if (a > 0 && a < b) {
                    a = b
                }
                if (this.bar) {
                    $(this.bar).css(this.origin.size, parseInt(a, 10) + 'px')
                }
            }
            function posBar(a) {
                if (this.bar) {
                    var b = $(this.bar).css(this.origin.pos)
                      , will = +a + 'px';
                    if (will && will != b) {
                        $(this.bar).css(this.origin.pos, will)
                    }
                }
            }
            function k() {
                return track[this.origin.client] - this.barTopLimit - this.bar[this.origin.offset]
            }
            function relToPos(r) {
                return r * k.call(this) + this.barTopLimit
            }
            function posToRel(t) {
                return (t - this.barTopLimit) / k.call(this)
            }
            this.cursor = function(e) {
                return e['client' + this.origin.x] || (((e.originalEvent || e).touches || {})[0] || {})['page' + this.origin.x]
            }
            ;
            function dontPosSelect() {
                return !1
            }
            this.pos = function(x) {
                var a = 'page' + this.origin.x + 'Offset'
                  , key = (this.scroller[a]) ? a : this.origin.scroll;
                if (x !== m)
                    this.scroller[key] = x;
                return this.scroller[key]
            }
            ;
            this.rpos = function(r) {
                var a = this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client], x;
                if (r) {
                    x = this.pos(r * a)
                } else {
                    x = this.pos()
                }
                return x / (a || 1)
            }
            ;
            this.barOn = function(a) {
                if (this.barOnCls) {
                    if (a || this.scroller[this.origin.client] >= this.scroller[this.origin.scrollSize]) {
                        if ($(this.root).hasClass(this.barOnCls)) {
                            $(this.root).removeClass(this.barOnCls)
                        }
                    } else {
                        if (!$(this.root).hasClass(this.barOnCls)) {
                            $(this.root).addClass(this.barOnCls)
                        }
                    }
                }
            }
            ;
            this._pos0 = function(e) {
                scrollerPos0 = this.cursor(e) - barPos
            }
            ;
            this.drag = function(e) {
                var a = posToRel.call(this, this.cursor(e) - scrollerPos0);
                var k = (this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client]);
                this.scroller[this.origin.scroll] = a * k
            }
            ;
            this.selection = function(a) {
                this.event(document, 'selectpos selectstart', dontPosSelect, a ? 'off' : 'on')
            }
            ;
            this.resize = function() {
                var g = this;
                var h = (g.resizeDebounce === m) ? 300 : g.resizeDebounce;
                var i = 0;
                if (getTime() - resizeLastFire < h) {
                    clearTimeout(resizePauseTimer);
                    i = h
                }
                function upd() {
                    var a;
                    var b;
                    var c = g.scroller[g.origin.crossOffset];
                    var d = g.scroller[g.origin.crossClient];
                    if (d > 0 && c === 0) {
                        c = d + 17
                    }
                    if (c) {
                        g.barOn();
                        d = g.scroller[g.origin.crossClient];
                        var e = g.impact ? (g.impact == 'scroller') : (g.direction == 'v');
                        if (e) {
                            var f = c - d;
                            a = $(g.clipper).css(g.origin.crossSize);
                            b = g.clipper[g.origin.crossClient] + f + 'px';
                            if (a != b) {
                                g._setCrossSizes(g.scroller, b)
                            }
                        } else {
                            a = $(g.clipper).css(g.origin.crossSize);
                            b = d + 'px';
                            if (a != b) {
                                g._setCrossSizes(g.clipper, b)
                            }
                        }
                    }
                    Array.prototype.unshift.call(arguments, 'resize');
                    fire.apply(g, arguments);
                    resizeLastFire = getTime()
                }
                if (i) {
                    resizePauseTimer = setTimeout(upd, i)
                } else {
                    upd()
                }
            }
            ;
            this.updatePositions = function() {
                var a, self = this;
                if (self.bar) {
                    a = (track[self.origin.client] - self.barTopLimit) * self.scroller[self.origin.client] / self.scroller[self.origin.scrollSize];
                    if (parseInt(oldBarSize, 10) != parseInt(a, 10)) {
                        setBarSize.call(self, a);
                        oldBarSize = a
                    }
                    barPos = relToPos.call(self, self.rpos());
                    posBar.call(self, barPos)
                }
                Array.prototype.unshift.call(arguments, 'scroll');
                fire.apply(self, arguments);
                scrollLastFire = getTime()
            }
            ;
            this.scroll = function() {
                var a = this;
                a.updatePositions();
                if (a.scrollingCls) {
                    if (!scrollingTimer) {
                        a.$(a.root).addClass(a.scrollingCls)
                    }
                    clearTimeout(scrollingTimer);
                    scrollingTimer = setTimeout(function() {
                        a.$(a.root).removeClass(a.scrollingCls);
                        scrollingTimer = m
                    }, 300)
                }
            }
            ;
            this.clipperOnScroll = function() {
                if (this.direction == 'h')
                    return;
                this.clipper[this.origin.scrollEdge] = this.scrollEdge
            }
            ;
            this._setCrossSizes = function(a, b) {
                var c = {};
                c[this.origin.crossSize] = b;
                c[this.origin.crossMinSize] = b;
                c[this.origin.crossMaxSize] = b;
                this.$(a).css(c)
            }
            ;
            this._dumbCss = function(a) {
                if (j.cssGuru)
                    return;
                var b = a ? 'hidden' : null;
                var c = a ? 'none' : null;
                this.$(this.clipper).css({
                    overflow: b,
                    msOverflowStyle: c
                });
                var d = a ? 'scroll' : null;
                var e = this.direction == 'v' ? 'y' : 'x';
                var f = {};
                f['overflow-' + e] = d;
                f['box-sizing'] = 'border-box';
                f.margin = '0';
                f.border = '0';
                this.$(this.scroller).css(f)
            }
            ;
            return this
        },
        update: function(a) {
            fire.call(this, 'upd', a);
            this._dumbCss(!0);
            this.resize(1);
            this.updatePositions();
            return this
        },
        dispose: function(a) {
            manageEvents(this, this.event, 'off');
            manageAttr(this.root, a.direction, 'off');
            if (a.direction == 'v') {
                this._setCrossSizes(this.scroller, '')
            } else {
                this._setCrossSizes(this.clipper, '')
            }
            this._dumbCss(!1);
            this.barOn(!0);
            fire.call(this, 'dispose');
            this._disposed = !0
        },
        on: function(b, c, d) {
            var e = b.split(' ');
            for (var i = 0; i < e.length; i++) {
                if (e[i] == 'init') {
                    c.call(this, d)
                } else {
                    this.events[e[i]] = this.events[e[i]] || [];
                    this.events[e[i]].push(function(a) {
                        c.call(this, a || d)
                    })
                }
            }
        }
    };
    baron.fn.constructor.prototype = baron.fn;
    s.prototype.constructor.prototype = s.prototype;
    baron.noConflict = function() {
        l.baron = n;
        return baron
    }
    ;
    baron.version = '1.2.1';
    if ($ && $.fn) {
        $.fn.baron = baron
    }
    l.baron = baron;
    if (typeof module != 'undefined') {
        module.exports = baron.noConflict()
    }
}
)(window);
(function(k, l) {
    var m = function(g) {
        var h, viewPortSize, params = {
            outside: '',
            inside: '',
            before: '',
            after: '',
            past: '',
            future: '',
            radius: 0,
            minView: 0
        }, topFixHeights = [], topRealHeights = [], headerTops = [], scroller = this.scroller, eventManager = this.event, $ = this.$, self = this;
        function fixElement(i, a, b) {
            var c = b == 1 ? 'pos' : 'oppos';
            if (viewPortSize < (params.minView || 0)) {
                a = l
            }
            this.$(h[i]).css(this.origin.pos, '').css(this.origin.oppos, '').removeClass(params.outside);
            if (a !== l) {
                a += 'px';
                this.$(h[i]).css(this.origin[c], a).addClass(params.outside)
            }
        }
        function bubbleWheel(e) {
            try {
                i = document.createEvent('WheelEvent');
                i.initWebKitWheelEvent(e.originalEvent.wheelDeltaX, e.originalEvent.wheelDeltaY);
                scroller.dispatchEvent(i);
                e.preventDefault()
            } catch (e) {}
        }
        function init(c) {
            var d;
            for (var e in c) {
                params[e] = c[e]
            }
            h = this.$(params.elements, this.scroller);
            if (h) {
                viewPortSize = this.scroller[this.origin.client];
                for (var i = 0; i < h.length; i++) {
                    d = {};
                    d[this.origin.size] = h[i][this.origin.offset];
                    if (h[i].parentNode !== this.scroller) {
                        this.$(h[i].parentNode).css(d)
                    }
                    d = {};
                    d[this.origin.crossSize] = h[i].parentNode[this.origin.crossClient];
                    this.$(h[i]).css(d);
                    viewPortSize -= h[i][this.origin.offset];
                    headerTops[i] = h[i].parentNode[this.origin.offsetPos];
                    topFixHeights[i] = (topFixHeights[i - 1] || 0);
                    topRealHeights[i] = (topRealHeights[i - 1] || Math.min(headerTops[i], 0));
                    if (h[i - 1]) {
                        topFixHeights[i] += h[i - 1][this.origin.offset];
                        topRealHeights[i] += h[i - 1][this.origin.offset]
                    }
                    if (!(i == 0 && headerTops[i] == 0)) {
                        this.event(h[i], 'mousewheel', bubbleWheel, 'off');
                        this.event(h[i], 'mousewheel', bubbleWheel)
                    }
                }
                if (params.limiter && h[0]) {
                    if (this.track && this.track != this.scroller) {
                        d = {};
                        d[this.origin.pos] = h[0].parentNode[this.origin.offset];
                        this.$(this.track).css(d)
                    } else {
                        this.barTopLimit = h[0].parentNode[this.origin.offset]
                    }
                    this.scroll()
                }
                if (params.limiter === !1) {
                    this.barTopLimit = 0
                }
            }
            var f = {
                element: h,
                handler: function() {
                    var a = $(this)[0].parentNode, top = a.offsetTop, num;
                    for (var i = 0; i < h.length; i++) {
                        if (h[i] === this)
                            num = i
                    }
                    var b = top - topFixHeights[num];
                    if (params.scroll) {
                        params.scroll({
                            x1: self.scroller.scrollTop,
                            x2: b
                        })
                    } else {
                        self.scroller.scrollTop = b
                    }
                },
                type: 'click'
            };
            if (params.clickable) {
                this._eventHandlers.push(f);
                eventManager(f.element, f.type, f.handler, 'on')
            }
        }
        this.on('init', init, g);
        var j = []
          , gradFlag = [];
        this.on('init scroll', function() {
            var a, hTop, gradState;
            if (h) {
                var b;
                for (var i = 0; i < h.length; i++) {
                    a = 0;
                    if (headerTops[i] - this.pos() < topRealHeights[i] + params.radius) {
                        a = 1;
                        hTop = topFixHeights[i]
                    } else if (headerTops[i] - this.pos() > topRealHeights[i] + viewPortSize - params.radius) {
                        a = 2;
                        hTop = this.scroller[this.origin.client] - h[i][this.origin.offset] - topFixHeights[i] - viewPortSize
                    } else {
                        a = 3;
                        hTop = l
                    }
                    gradState = !1;
                    if (headerTops[i] - this.pos() < topRealHeights[i] || headerTops[i] - this.pos() > topRealHeights[i] + viewPortSize) {
                        gradState = !0
                    }
                    if (a != j[i] || gradState != gradFlag[i]) {
                        fixElement.call(this, i, hTop, a);
                        j[i] = a;
                        gradFlag[i] = gradState;
                        b = !0
                    }
                }
                if (b) {
                    for (i = 0; i < h.length; i++) {
                        if (j[i] == 1 && params.past) {
                            this.$(h[i]).addClass(params.past).removeClass(params.future)
                        }
                        if (j[i] == 2 && params.future) {
                            this.$(h[i]).addClass(params.future).removeClass(params.past)
                        }
                        if (j[i] == 3) {
                            if (params.future || params.past)
                                this.$(h[i]).removeClass(params.past).removeClass(params.future);
                            if (params.inside)
                                this.$(h[i]).addClass(params.inside)
                        } else if (params.inside) {
                            this.$(h[i]).removeClass(params.inside)
                        }
                        if (j[i] != j[i + 1] && j[i] == 1 && params.before) {
                            this.$(h[i]).addClass(params.before).removeClass(params.after)
                        } else if (j[i] != j[i - 1] && j[i] == 2 && params.after) {
                            this.$(h[i]).addClass(params.after).removeClass(params.before)
                        } else {
                            this.$(h[i]).removeClass(params.before).removeClass(params.after)
                        }
                        if (params.grad) {
                            if (gradFlag[i]) {
                                this.$(h[i]).addClass(params.grad)
                            } else {
                                this.$(h[i]).removeClass(params.grad)
                            }
                        }
                    }
                }
            }
        });
        this.on('resize upd', function(a) {
            init.call(this, a && a.fix)
        })
    };
    baron.fn.fix = function(a) {
        var i = 0;
        while (this[i]) {
            m.call(this[i], a);
            i++
        }
        return this
    }
}
)(window);
(function(d) {
    var e = d.MutationObserver || d.WebKitMutationObserver || d.MozMutationObserver || null;
    var f = function() {
        var a = this;
        var b;
        function actualizeWatcher() {
            if (!a.root[a.origin.offset]) {
                startWatch()
            } else {
                stopWatch()
            }
        }
        function startWatch() {
            if (b)
                return;
            b = setInterval(function() {
                if (a.root[a.origin.offset]) {
                    stopWatch();
                    a.update()
                }
            }, 300)
        }
        function stopWatch() {
            clearInterval(b);
            b = null
        }
        var c = a._debounce(function() {
            a.update()
        }, 300);
        this._observer = new e(function() {
            actualizeWatcher();
            a.update();
            c()
        }
        );
        this.on('init', function() {
            a._observer.observe(a.root, {
                childList: !0,
                subtree: !0,
                characterData: !0
            });
            actualizeWatcher()
        });
        this.on('dispose', function() {
            a._observer.disconnect();
            stopWatch();
            delete a._observer
        })
    };
    baron.fn.autoUpdate = function(a) {
        if (!e)
            return this;
        var i = 0;
        while (this[i]) {
            f.call(this[i], a);
            i++
        }
        return this
    }
}
)(window);
(function(c, d) {
    var f = function(a) {
        var b, backward, track, screen, self = this, event;
        screen = a.screen || 0.9;
        if (a.forward) {
            b = this.$(a.forward, this.clipper);
            event = {
                element: b,
                handler: function() {
                    var y = self.pos() + (a.delta || 30);
                    self.pos(y)
                },
                type: 'click'
            };
            this._eventHandlers.push(event);
            this.event(event.element, event.type, event.handler, 'on')
        }
        if (a.backward) {
            backward = this.$(a.backward, this.clipper);
            event = {
                element: backward,
                handler: function() {
                    var y = self.pos() - (a.delta || 30);
                    self.pos(y)
                },
                type: 'click'
            };
            this._eventHandlers.push(event);
            this.event(event.element, event.type, event.handler, 'on')
        }
        if (a.track) {
            if (a.track === !0) {
                track = this.track
            } else {
                track = this.$(a.track, this.clipper)[0]
            }
            if (track) {
                event = {
                    element: track,
                    handler: function(e) {
                        if (e.target != track)
                            return;
                        var x = e['offset' + self.origin.x]
                          , xBar = self.bar[self.origin.offsetPos]
                          , sign = 0;
                        if (x < xBar) {
                            sign = -1
                        } else if (x > xBar + self.bar[self.origin.offset]) {
                            sign = 1
                        }
                        var y = self.pos() + sign * screen * self.scroller[self.origin.client];
                        self.pos(y)
                    },
                    type: 'mousedown'
                };
                this._eventHandlers.push(event);
                this.event(event.element, event.type, event.handler, 'on')
            }
        }
    };
    baron.fn.controls = function(a) {
        var i = 0;
        while (this[i]) {
            f.call(this[i], a);
            i++
        }
        return this
    }
}
)(window);
(function(d, f) {
    var g = function(b) {
        var c = this.$(b.block), size = b.size || this.origin.size, limit = b.limit || 80, onExpand = b.onExpand, elements = b.elements || [], inProgress = b.inProgress || '', self = this, _insistence = 0, _zeroXCount = 0, _interval, _timer, _x = 0, _onExpandCalled, _waiting = b.waiting || 500, _on;
        function getSize() {
            return self.scroller[self.origin.scroll] + self.scroller[self.origin.offset]
        }
        function getContentSize() {
            return self.scroller[self.origin.scrollSize]
        }
        function getScrollerSize() {
            return self.scroller[self.origin.client]
        }
        function step(x, a) {
            var k = x * 0.0005;
            return Math.floor(a - k * (x + 550))
        }
        function toggle(a) {
            _on = a;
            if (a) {
                update();
                _interval = setInterval(update, 200)
            } else {
                clearInterval(_interval)
            }
        }
        function update() {
            var a = {}, height = getSize(), scrollHeight = getContentSize(), dx, op4, scrollInProgress = _insistence == 1;
            op4 = 0;
            if (_insistence > 0) {
                op4 = 40
            }
            dx = step(_x, op4);
            if (height >= scrollHeight - _x && _insistence > -1) {
                if (scrollInProgress) {
                    _x += dx
                }
            } else {
                _x = 0
            }
            if (_x < 0)
                _x = 0;
            a[size] = _x + 'px';
            if (getScrollerSize() <= getContentSize()) {
                self.$(c).css(a);
                for (var i = 0; i < elements.length; i++) {
                    self.$(elements[i].self).css(elements[i].property, Math.min(_x / limit * 100, 100) + '%')
                }
            }
            if (inProgress && _x) {
                self.$(self.root).addClass(inProgress)
            }
            if (_x == 0) {
                if (b.onCollapse) {
                    b.onCollapse()
                }
            }
            _insistence = 0;
            _timer = setTimeout(function() {
                _insistence = -1
            }, _waiting);
            if (onExpand && _x > limit && !_onExpandCalled) {
                onExpand();
                _onExpandCalled = !0
            }
            if (_x == 0) {
                _zeroXCount++
            } else {
                _zeroXCount = 0
            }
            if (_zeroXCount > 1) {
                toggle(!1);
                _onExpandCalled = !1;
                if (inProgress) {
                    self.$(self.root).removeClass(inProgress)
                }
            }
        }
        this.on('init', function() {
            toggle(!0)
        });
        this.on('dispose', function() {
            toggle(!1)
        });
        this.event(this.scroller, 'mousewheel DOMMouseScroll', function(e) {
            var a = e.wheelDelta < 0 || (e.originalEvent && e.originalEvent.wheelDelta < 0) || e.detail > 0;
            if (a) {
                _insistence = 1;
                clearTimeout(_timer);
                if (!_on && getSize() >= getContentSize()) {
                    toggle(!0)
                }
            }
        })
    };
    baron.fn.pull = function(a) {
        var i = 0;
        while (this[i]) {
            g.call(this[i], a);
            i++
        }
        return this
    }
}
)(window);
var CryptoJS = CryptoJS || function(p, h) {
    var i = {}
      , l = i.lib = {}
      , r = l.Base = function() {
        function a() {}
        return {
            extend: function(e) {
                a.prototype = this;
                var c = new a;
                e && c.mixIn(e);
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a)
                    a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.$super.extend(this)
            }
        }
    }()
      , o = l.WordArray = r.extend({
        init: function(a, e) {
            a = this.words = a || [];
            this.sigBytes = e != h ? e : 4 * a.length
        },
        toString: function(a) {
            return (a || s).stringify(this)
        },
        concat: function(a) {
            var e = this.words
              , c = a.words
              , b = this.sigBytes
              , a = a.sigBytes;
            this.clamp();
            if (b % 4)
                for (var d = 0; d < a; d++)
                    e[b + d >>> 2] |= (c[d >>> 2] >>> 24 - 8 * (d % 4) & 255) << 24 - 8 * ((b + d) % 4);
            else if (65535 < c.length)
                for (d = 0; d < a; d += 4)
                    e[b + d >>> 2] = c[d >>> 2];
            else
                e.push.apply(e, c);
            this.sigBytes += a;
            return this
        },
        clamp: function() {
            var a = this.words
              , e = this.sigBytes;
            a[e >>> 2] &= 4294967295 << 32 - 8 * (e % 4);
            a.length = p.ceil(e / 4)
        },
        clone: function() {
            var a = r.clone.call(this);
            a.words = this.words.slice(0);
            return a
        },
        random: function(a) {
            for (var e = [], c = 0; c < a; c += 4)
                e.push(4294967296 * p.random() | 0);
            return o.create(e, a)
        }
    })
      , m = i.enc = {}
      , s = m.Hex = {
        stringify: function(a) {
            for (var e = a.words, a = a.sigBytes, c = [], b = 0; b < a; b++) {
                var d = e[b >>> 2] >>> 24 - 8 * (b % 4) & 255;
                c.push((d >>> 4).toString(16));
                c.push((d & 15).toString(16))
            }
            return c.join("")
        },
        parse: function(a) {
            for (var e = a.length, c = [], b = 0; b < e; b += 2)
                c[b >>> 3] |= parseInt(a.substr(b, 2), 16) << 24 - 4 * (b % 8);
            return o.create(c, e / 2)
        }
    }
      , n = m.Latin1 = {
        stringify: function(a) {
            for (var e = a.words, a = a.sigBytes, c = [], b = 0; b < a; b++)
                c.push(String.fromCharCode(e[b >>> 2] >>> 24 - 8 * (b % 4) & 255));
            return c.join("")
        },
        parse: function(a) {
            for (var e = a.length, c = [], b = 0; b < e; b++)
                c[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4);
            return o.create(c, e)
        }
    }
      , k = m.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(n.stringify(a)))
            } catch (e) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(a) {
            return n.parse(unescape(encodeURIComponent(a)))
        }
    }
      , f = l.BufferedBlockAlgorithm = r.extend({
        reset: function() {
            this._data = o.create();
            this._nDataBytes = 0
        },
        _append: function(a) {
            "string" == typeof a && (a = k.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        },
        _process: function(a) {
            var e = this._data
              , c = e.words
              , b = e.sigBytes
              , d = this.blockSize
              , q = b / (4 * d)
              , q = a ? p.ceil(q) : p.max((q | 0) - this._minBufferSize, 0)
              , a = q * d
              , b = p.min(4 * a, b);
            if (a) {
                for (var j = 0; j < a; j += d)
                    this._doProcessBlock(c, j);
                j = c.splice(0, a);
                e.sigBytes -= b
            }
            return o.create(j, b)
        },
        clone: function() {
            var a = r.clone.call(this);
            a._data = this._data.clone();
            return a
        },
        _minBufferSize: 0
    });
    l.Hasher = f.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            f.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        },
        clone: function() {
            var a = f.clone.call(this);
            a._hash = this._hash.clone();
            return a
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(e, c) {
                return a.create(c).finalize(e)
            }
        },
        _createHmacHelper: function(a) {
            return function(e, c) {
                return g.HMAC.create(a, c).finalize(e)
            }
        }
    });
    var g = i.algo = {};
    return i
}(Math);
(function() {
    var p = CryptoJS
      , h = p.lib.WordArray;
    p.enc.Base64 = {
        stringify: function(i) {
            var l = i.words
              , h = i.sigBytes
              , o = this._map;
            i.clamp();
            for (var i = [], m = 0; m < h; m += 3)
                for (var s = (l[m >>> 2] >>> 24 - 8 * (m % 4) & 255) << 16 | (l[m + 1 >>> 2] >>> 24 - 8 * ((m + 1) % 4) & 255) << 8 | l[m + 2 >>> 2] >>> 24 - 8 * ((m + 2) % 4) & 255, n = 0; 4 > n && m + 0.75 * n < h; n++)
                    i.push(o.charAt(s >>> 6 * (3 - n) & 63));
            if (l = o.charAt(64))
                for (; i.length % 4; )
                    i.push(l);
            return i.join("")
        },
        parse: function(i) {
            var i = i.replace(/\s/g, "")
              , l = i.length
              , r = this._map
              , o = r.charAt(64);
            o && (o = i.indexOf(o),
            -1 != o && (l = o));
            for (var o = [], m = 0, s = 0; s < l; s++)
                if (s % 4) {
                    var n = r.indexOf(i.charAt(s - 1)) << 2 * (s % 4)
                      , k = r.indexOf(i.charAt(s)) >>> 6 - 2 * (s % 4);
                    o[m >>> 2] |= (n | k) << 24 - 8 * (m % 4);
                    m++
                }
            return h.create(o, m)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}
)();
(function(p) {
    function h(f, g, a, e, c, b, d) {
        f = f + (g & a | ~g & e) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    function i(f, g, a, e, c, b, d) {
        f = f + (g & e | a & ~e) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    function l(f, g, a, e, c, b, d) {
        f = f + (g ^ a ^ e) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    function r(f, g, a, e, c, b, d) {
        f = f + (a ^ (g | ~e)) + c + d;
        return (f << b | f >>> 32 - b) + g
    }
    var o = CryptoJS
      , m = o.lib
      , s = m.WordArray
      , m = m.Hasher
      , n = o.algo
      , k = [];
    (function() {
        for (var f = 0; 64 > f; f++)
            k[f] = 4294967296 * p.abs(p.sin(f + 1)) | 0
    }
    )();
    n = n.MD5 = m.extend({
        _doReset: function() {
            this._hash = s.create([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(f, g) {
            for (var a = 0; 16 > a; a++) {
                var e = g + a
                  , c = f[e];
                f[e] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360
            }
            for (var e = this._hash.words, c = e[0], b = e[1], d = e[2], q = e[3], a = 0; 64 > a; a += 4)
                16 > a ? (c = h(c, b, d, q, f[g + a], 7, k[a]),
                q = h(q, c, b, d, f[g + a + 1], 12, k[a + 1]),
                d = h(d, q, c, b, f[g + a + 2], 17, k[a + 2]),
                b = h(b, d, q, c, f[g + a + 3], 22, k[a + 3])) : 32 > a ? (c = i(c, b, d, q, f[g + (a + 1) % 16], 5, k[a]),
                q = i(q, c, b, d, f[g + (a + 6) % 16], 9, k[a + 1]),
                d = i(d, q, c, b, f[g + (a + 11) % 16], 14, k[a + 2]),
                b = i(b, d, q, c, f[g + a % 16], 20, k[a + 3])) : 48 > a ? (c = l(c, b, d, q, f[g + (3 * a + 5) % 16], 4, k[a]),
                q = l(q, c, b, d, f[g + (3 * a + 8) % 16], 11, k[a + 1]),
                d = l(d, q, c, b, f[g + (3 * a + 11) % 16], 16, k[a + 2]),
                b = l(b, d, q, c, f[g + (3 * a + 14) % 16], 23, k[a + 3])) : (c = r(c, b, d, q, f[g + 3 * a % 16], 6, k[a]),
                q = r(q, c, b, d, f[g + (3 * a + 7) % 16], 10, k[a + 1]),
                d = r(d, q, c, b, f[g + (3 * a + 14) % 16], 15, k[a + 2]),
                b = r(b, d, q, c, f[g + (3 * a + 5) % 16], 21, k[a + 3]));
            e[0] = e[0] + c | 0;
            e[1] = e[1] + b | 0;
            e[2] = e[2] + d | 0;
            e[3] = e[3] + q | 0
        },
        _doFinalize: function() {
            var f = this._data
              , g = f.words
              , a = 8 * this._nDataBytes
              , e = 8 * f.sigBytes;
            g[e >>> 5] |= 128 << 24 - e % 32;
            g[(e + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            f.sigBytes = 4 * (g.length + 1);
            this._process();
            f = this._hash.words;
            for (g = 0; 4 > g; g++)
                a = f[g],
                f[g] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360
        }
    });
    o.MD5 = m._createHelper(n);
    o.HmacMD5 = m._createHmacHelper(n)
}
)(Math);
(function() {
    var p = CryptoJS
      , h = p.lib
      , i = h.Base
      , l = h.WordArray
      , h = p.algo
      , r = h.EvpKDF = i.extend({
        cfg: i.extend({
            keySize: 4,
            hasher: h.MD5,
            iterations: 1
        }),
        init: function(i) {
            this.cfg = this.cfg.extend(i)
        },
        compute: function(i, m) {
            for (var h = this.cfg, n = h.hasher.create(), k = l.create(), f = k.words, g = h.keySize, h = h.iterations; f.length < g; ) {
                a && n.update(a);
                var a = n.update(i).finalize(m);
                n.reset();
                for (var e = 1; e < h; e++)
                    a = n.finalize(a),
                    n.reset();
                k.concat(a)
            }
            k.sigBytes = 4 * g;
            return k
        }
    });
    p.EvpKDF = function(i, l, h) {
        return r.create(h).compute(i, l)
    }
}
)();
CryptoJS.lib.Cipher || function(p) {
    var h = CryptoJS
      , i = h.lib
      , l = i.Base
      , r = i.WordArray
      , o = i.BufferedBlockAlgorithm
      , m = h.enc.Base64
      , s = h.algo.EvpKDF
      , n = i.Cipher = o.extend({
        cfg: l.extend(),
        createEncryptor: function(b, d) {
            return this.create(this._ENC_XFORM_MODE, b, d)
        },
        createDecryptor: function(b, d) {
            return this.create(this._DEC_XFORM_MODE, b, d)
        },
        init: function(b, d, a) {
            this.cfg = this.cfg.extend(a);
            this._xformMode = b;
            this._key = d;
            this.reset()
        },
        reset: function() {
            o.reset.call(this);
            this._doReset()
        },
        process: function(b) {
            this._append(b);
            return this._process()
        },
        finalize: function(b) {
            b && this._append(b);
            return this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function() {
            return function(b) {
                return {
                    encrypt: function(a, q, j) {
                        return ("string" == typeof q ? c : e).encrypt(b, a, q, j)
                    },
                    decrypt: function(a, q, j) {
                        return ("string" == typeof q ? c : e).decrypt(b, a, q, j)
                    }
                }
            }
        }()
    });
    i.StreamCipher = n.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var k = h.mode = {}
      , f = i.BlockCipherMode = l.extend({
        createEncryptor: function(b, a) {
            return this.Encryptor.create(b, a)
        },
        createDecryptor: function(b, a) {
            return this.Decryptor.create(b, a)
        },
        init: function(b, a) {
            this._cipher = b;
            this._iv = a
        }
    })
      , k = k.CBC = function() {
        function b(b, a, d) {
            var c = this._iv;
            c ? this._iv = p : c = this._prevBlock;
            for (var e = 0; e < d; e++)
                b[a + e] ^= c[e]
        }
        var a = f.extend();
        a.Encryptor = a.extend({
            processBlock: function(a, d) {
                var c = this._cipher
                  , e = c.blockSize;
                b.call(this, a, d, e);
                c.encryptBlock(a, d);
                this._prevBlock = a.slice(d, d + e)
            }
        });
        a.Decryptor = a.extend({
            processBlock: function(a, d) {
                var c = this._cipher
                  , e = c.blockSize
                  , f = a.slice(d, d + e);
                c.decryptBlock(a, d);
                b.call(this, a, d, e);
                this._prevBlock = f
            }
        });
        return a
    }()
      , g = (h.pad = {}).Pkcs7 = {
        pad: function(b, a) {
            for (var c = 4 * a, c = c - b.sigBytes % c, e = c << 24 | c << 16 | c << 8 | c, f = [], g = 0; g < c; g += 4)
                f.push(e);
            c = r.create(f, c);
            b.concat(c)
        },
        unpad: function(b) {
            b.sigBytes -= b.words[b.sigBytes - 1 >>> 2] & 255
        }
    };
    i.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: k,
            padding: g
        }),
        reset: function() {
            n.reset.call(this);
            var b = this.cfg
              , a = b.iv
              , b = b.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
                var c = b.createEncryptor;
            else
                c = b.createDecryptor,
                this._minBufferSize = 1;
            this._mode = c.call(b, this, a && a.words)
        },
        _doProcessBlock: function(b, a) {
            this._mode.processBlock(b, a)
        },
        _doFinalize: function() {
            var b = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                b.pad(this._data, this.blockSize);
                var a = this._process(!0)
            } else
                a = this._process(!0),
                b.unpad(a);
            return a
        },
        blockSize: 4
    });
    var a = i.CipherParams = l.extend({
        init: function(a) {
            this.mixIn(a)
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this)
        }
    })
      , k = (h.format = {}).OpenSSL = {
        stringify: function(a) {
            var d = a.ciphertext
              , a = a.salt
              , d = (a ? r.create([1398893684, 1701076831]).concat(a).concat(d) : d).toString(m);
            return d = d.replace(/(.{64})/g, "$1\n")
        },
        parse: function(b) {
            var b = m.parse(b)
              , d = b.words;
            if (1398893684 == d[0] && 1701076831 == d[1]) {
                var c = r.create(d.slice(2, 4));
                d.splice(0, 4);
                b.sigBytes -= 16
            }
            return a.create({
                ciphertext: b,
                salt: c
            })
        }
    }
      , e = i.SerializableCipher = l.extend({
        cfg: l.extend({
            format: k
        }),
        encrypt: function(b, d, c, e) {
            var e = this.cfg.extend(e)
              , f = b.createEncryptor(c, e)
              , d = f.finalize(d)
              , f = f.cfg;
            return a.create({
                ciphertext: d,
                key: c,
                iv: f.iv,
                algorithm: b,
                mode: f.mode,
                padding: f.padding,
                blockSize: b.blockSize,
                formatter: e.format
            })
        },
        decrypt: function(a, c, e, f) {
            f = this.cfg.extend(f);
            c = this._parse(c, f.format);
            return a.createDecryptor(e, f).finalize(c.ciphertext)
        },
        _parse: function(a, c) {
            return "string" == typeof a ? c.parse(a) : a
        }
    })
      , h = (h.kdf = {}).OpenSSL = {
        compute: function(b, c, e, f) {
            f || (f = r.random(8));
            b = s.create({
                keySize: c + e
            }).compute(b, f);
            e = r.create(b.words.slice(c), 4 * e);
            b.sigBytes = 4 * c;
            return a.create({
                key: b,
                iv: e,
                salt: f
            })
        }
    }
      , c = i.PasswordBasedCipher = e.extend({
        cfg: e.cfg.extend({
            kdf: h
        }),
        encrypt: function(a, c, f, j) {
            j = this.cfg.extend(j);
            f = j.kdf.compute(f, a.keySize, a.ivSize);
            j.iv = f.iv;
            a = e.encrypt.call(this, a, c, f.key, j);
            a.mixIn(f);
            return a
        },
        decrypt: function(a, c, f, j) {
            j = this.cfg.extend(j);
            c = this._parse(c, j.format);
            f = j.kdf.compute(f, a.keySize, a.ivSize, c.salt);
            j.iv = f.iv;
            return e.decrypt.call(this, a, c, f.key, j)
        }
    })
}();
(function() {
    var p = CryptoJS
      , h = p.lib.BlockCipher
      , i = p.algo
      , l = []
      , r = []
      , o = []
      , m = []
      , s = []
      , n = []
      , k = []
      , f = []
      , g = []
      , a = [];
    (function() {
        for (var c = [], b = 0; 256 > b; b++)
            c[b] = 128 > b ? b << 1 : b << 1 ^ 283;
        for (var d = 0, e = 0, b = 0; 256 > b; b++) {
            var j = e ^ e << 1 ^ e << 2 ^ e << 3 ^ e << 4
              , j = j >>> 8 ^ j & 255 ^ 99;
            l[d] = j;
            r[j] = d;
            var i = c[d]
              , h = c[i]
              , p = c[h]
              , t = 257 * c[j] ^ 16843008 * j;
            o[d] = t << 24 | t >>> 8;
            m[d] = t << 16 | t >>> 16;
            s[d] = t << 8 | t >>> 24;
            n[d] = t;
            t = 16843009 * p ^ 65537 * h ^ 257 * i ^ 16843008 * d;
            k[j] = t << 24 | t >>> 8;
            f[j] = t << 16 | t >>> 16;
            g[j] = t << 8 | t >>> 24;
            a[j] = t;
            d ? (d = i ^ c[c[c[p ^ i]]],
            e ^= c[c[e]]) : d = e = 1
        }
    }
    )();
    var e = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
      , i = i.AES = h.extend({
        _doReset: function() {
            for (var c = this._key, b = c.words, d = c.sigBytes / 4, c = 4 * ((this._nRounds = d + 6) + 1), i = this._keySchedule = [], j = 0; j < c; j++)
                if (j < d)
                    i[j] = b[j];
                else {
                    var h = i[j - 1];
                    j % d ? 6 < d && 4 == j % d && (h = l[h >>> 24] << 24 | l[h >>> 16 & 255] << 16 | l[h >>> 8 & 255] << 8 | l[h & 255]) : (h = h << 8 | h >>> 24,
                    h = l[h >>> 24] << 24 | l[h >>> 16 & 255] << 16 | l[h >>> 8 & 255] << 8 | l[h & 255],
                    h ^= e[j / d | 0] << 24);
                    i[j] = i[j - d] ^ h
                }
            b = this._invKeySchedule = [];
            for (d = 0; d < c; d++)
                j = c - d,
                h = d % 4 ? i[j] : i[j - 4],
                b[d] = 4 > d || 4 >= j ? h : k[l[h >>> 24]] ^ f[l[h >>> 16 & 255]] ^ g[l[h >>> 8 & 255]] ^ a[l[h & 255]]
        },
        encryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._keySchedule, o, m, s, n, l)
        },
        decryptBlock: function(c, b) {
            var d = c[b + 1];
            c[b + 1] = c[b + 3];
            c[b + 3] = d;
            this._doCryptBlock(c, b, this._invKeySchedule, k, f, g, a, r);
            d = c[b + 1];
            c[b + 1] = c[b + 3];
            c[b + 3] = d
        },
        _doCryptBlock: function(a, b, d, e, f, h, i, g) {
            for (var l = this._nRounds, k = a[b] ^ d[0], m = a[b + 1] ^ d[1], o = a[b + 2] ^ d[2], n = a[b + 3] ^ d[3], p = 4, r = 1; r < l; r++)
                var s = e[k >>> 24] ^ f[m >>> 16 & 255] ^ h[o >>> 8 & 255] ^ i[n & 255] ^ d[p++]
                  , u = e[m >>> 24] ^ f[o >>> 16 & 255] ^ h[n >>> 8 & 255] ^ i[k & 255] ^ d[p++]
                  , v = e[o >>> 24] ^ f[n >>> 16 & 255] ^ h[k >>> 8 & 255] ^ i[m & 255] ^ d[p++]
                  , n = e[n >>> 24] ^ f[k >>> 16 & 255] ^ h[m >>> 8 & 255] ^ i[o & 255] ^ d[p++]
                  , k = s
                  , m = u
                  , o = v;
            s = (g[k >>> 24] << 24 | g[m >>> 16 & 255] << 16 | g[o >>> 8 & 255] << 8 | g[n & 255]) ^ d[p++];
            u = (g[m >>> 24] << 24 | g[o >>> 16 & 255] << 16 | g[n >>> 8 & 255] << 8 | g[k & 255]) ^ d[p++];
            v = (g[o >>> 24] << 24 | g[n >>> 16 & 255] << 16 | g[k >>> 8 & 255] << 8 | g[m & 255]) ^ d[p++];
            n = (g[n >>> 24] << 24 | g[k >>> 16 & 255] << 16 | g[m >>> 8 & 255] << 8 | g[o & 255]) ^ d[p++];
            a[b] = s;
            a[b + 1] = u;
            a[b + 2] = v;
            a[b + 3] = n
        },
        keySize: 8
    });
    p.AES = h._createHelper(i)
}
)();
var config_engine = {
    segments: {
        swarmId: 'fileq_' + id,
        forwardSegmentCount: 100
    },
    loader: {
        trackerAnnounce: ['wss://swamp-10.alloha.tv:8434'],
        rtcConfig: {
            iceServers: [{
                urls: 'stun:stun.comtube.ru:3478'
            }, {
                urls: 'stun:global.stun.twilio.com:3478?transport=udp'
            }]
        },
        cachedSegmentExpiration: 3600000,
        cachedSegmentsCount: 235,
        requiredSegmentsPriority: 10,
        httpDownloadMaxPriority: 10,
        httpDownloadProbability: 0.05,
        httpDownloadProbabilityInterval: 1000,
        httpDownloadProbabilitySkipIfNoPeers: true,
        p2pDownloadMaxPriority: 500,
        webRtcMaxMessageSize: 16 * 1024 - 1,
        httpFailedSegmentTimeout: 500,
        simultaneousP2PDownloads: 1,
        simultaneousHttpDownloads: 2,
        p2pSegmentDownloadTimeout: 2000,
        httpDownloadInitialTimeout: 0,
        httpDownloadInitialTimeoutPerSegment: 4000,
        httpUseRanges: false,
        peerRequestsPerAnnounce: 9
    }
};
