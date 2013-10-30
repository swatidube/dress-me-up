(function ($) {
    var methods = {
        init: function (options) {
            var o = $.extend({
                items: 1,
                itemsOnPage: 1,
                pages: 0,
                displayedPages: 5,
                edges: 2,
                currentPage: 1,
                hrefText: "#page-",
                prevText: "Prev",
                nextText: "Next",
                ellipseText: "&hellip;",
                cssStyle: "light-theme",
                selectOnClick: true,
                onPageClick: function (pageNumber) {},
                onInit: function () {},
                onPaint: function () {}
            }, options || {});
            return this.each(function () {
                o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
                o.currentPage = o.currentPage - 1;
                o.halfDisplayed = o.displayedPages / 2;
                $(this).addClass(o.cssStyle).data("pagination", o);
                methods._draw.call(this);
                o.onInit()
            })
        },
        selectPage: function (page) {
            methods._selectPage.call(this, page - 1)
        },
        prevPage: function () {
            var o = $(this).data("pagination");
            if (o.currentPage > 0) {
                methods._selectPage.call(this, o.currentPage - 1)
            }
        },
        nextPage: function () {
            var o = $(this).data("pagination");
            if (o.currentPage < o.pages - 1) {
                methods._selectPage.call(this, o.currentPage + 1)
            }
        },
        _draw: function () {
            var $panel = $(this).empty(),
                o = $panel.data("pagination"),
                interval = methods._getInterval(o),
                i;
            if (o.prevText) {
                methods._appendItem(this, o.currentPage - 1, {
                    type: "arrow",
                    facing: "back",
                    classPrepend: "prev"
                });
                methods._appendItem(this, o.currentPage - 1, {
                    text: o.prevText,
                    classes: "prev"
                })
            }
            $panel.append('<span class="page-text">Page:</span>');
            if (interval.start > 0 && o.edges > 0) {
                var end = Math.min(o.edges, interval.start);
                for (i = 0; i < end; i++) {
                    methods._appendItem(this, i, {
                        classes: "start-edge"
                    })
                }
                if (o.edges < interval.start && o.ellipseText) {
                    $panel.append('<span class="ellipse-start">' + o.ellipseText + "</span>")
                }
            }
            for (i = interval.start; i < interval.end; i++) {
                methods._appendItem(this, i, {
                    classes: "page-number"
                })
            }
            if (interval.end < o.pages && o.edges > 0) {
                if (o.pages - o.edges > interval.end && o.ellipseText) {
                    $panel.append('<span class="ellipse-end">' + o.ellipseText + "</span>")
                }
                var begin = Math.max(o.pages - o.edges, interval.end);
                for (i = begin; i < o.pages; i++) {
                    methods._appendItem(this, i, {
                        classes: "end-edge"
                    })
                }
            }
            if (o.nextText) {
                methods._appendItem(this, o.currentPage + 1, {
                    text: o.nextText,
                    classes: "next"
                });
                methods._appendItem(this, o.currentPage + 1, {
                    type: "arrow",
                    facing: "next",
                    classPrepend: "next"
                })
            }
        },
        _getInterval: function (o) {
            return {
                start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
                end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
            }
        },
        _appendItem: function (panel, pageIndex, opts) {
            var options, $link, o = $(panel).data("pagination");
            pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);
            options = $.extend({
                text: pageIndex + 1,
                classes: ""
            }, opts || {});
            if (options.type && options.type == "arrow") {
                if (pageIndex == o.currentPage) {
                    options.classes = "faded-arrow"
                }
                $link = $("<div class='" + options.classPrepend + "-arrow s32-" + options.facing + "-arrow-black'></div>")
            } else {
                if (pageIndex == o.currentPage) {
                    $link = $('<span class="current">' + (options.text) + "</span>")
                } else {
                    $link = $('<a href="javascript:void(0)" class="page-link" data-page="' + (pageIndex + 1) + '">' + (options.text) + "</a>");
                    $link.click(function () {
                        methods._selectPage.call(panel, pageIndex)
                    })
                }
            }
            if (options.classes) {
                $link.addClass(options.classes)
            }
            $(panel).append($link)
        },
        _selectPage: function (pageIndex) {
            var o = $(this).data("pagination");
            o.currentPage = pageIndex;
            if (o.selectOnClick) {
                o.onPageClick(pageIndex + 1);
                methods._draw.call(this)
            } else {
                o.onPageClick(pageIndex + 1)
            }
            o.onPaint()
        }
    };
    $.fn.pagination = function (method) {
        if (methods[method] && method.charAt(0) != "_") {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments)
            } else {
                $.error("Method " + method + " does not exist on jQuery.pagination")
            }
        }
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
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.5 (10-APR-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
(function ($, undefined) {
    var ver = "2.9999.5";
    if ($.support === undefined) {
        $.support = {
            opacity: !($.browser.msie)
        }
    }
    function debug(s) {
        if ($.fn.cycle.debug) {
            log(s)
        }
    }
    function log() {
        if (window.console && console.log) {
            console.log("[cycle] " + Array.prototype.join.call(arguments, " "))
        }
    }
    $.expr[":"].paused = function (el) {
        return el.cyclePause
    };
    $.fn.cycle = function (options, arg2) {
        var o = {
            s: this.selector,
            c: this.context
        };
        if (this.length === 0 && options != "stop") {
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing slideshow");
                $(function () {
                    $(o.s, o.c).cycle(options, arg2)
                });
                return this
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)"));
            return this
        }
        return this.each(function () {
            var opts = handleArguments(this, options, arg2);
            if (opts === false) {
                return
            }
            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout) {
                clearTimeout(this.cycleTimeout)
            }
            this.cycleTimeout = this.cyclePause = 0;
            this.cycleStop = 0;
            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            if (els.length < 2) {
                return
            }
            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false) {
                return
            }
            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10) {
                    startTime = 10
                }
                debug("first timeout: " + startTime);
                this.cycleTimeout = setTimeout(function () {
                    go(els, opts2, 0, !opts.backwards)
                }, startTime)
            }
        })
    };

    function triggerPause(cont, byHover, onPager) {
        var opts = $(cont).data("cycle.opts");
        var paused = !! cont.cyclePause;
        if (paused && opts.paused) {
            opts.paused(cont, opts, byHover, onPager)
        } else {
            if (!paused && opts.resumed) {
                opts.resumed(cont, opts, byHover, onPager)
            }
        }
    }
    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop === undefined) {
            cont.cycleStop = 0
        }
        if (options === undefined || options === null) {
            options = {}
        }
        if (options.constructor == String) {
            switch (options) {
                case "destroy":
                case "stop":
                    var opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        return false
                    }
                    cont.cycleStop++;
                    if (cont.cycleTimeout) {
                        clearTimeout(cont.cycleTimeout)
                    }
                    cont.cycleTimeout = 0;
                    if (opts.elements) {
                        $(opts.elements).stop()
                    }
                    $(cont).removeData("cycle.opts");
                    if (options == "destroy") {
                        destroy(cont, opts)
                    }
                    return false;
                case "toggle":
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    triggerPause(cont);
                    return false;
                case "pause":
                    cont.cyclePause = 1;
                    triggerPause(cont);
                    return false;
                case "resume":
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    triggerPause(cont);
                    return false;
                case "prev":
                case "next":
                    opts = $(cont).data("cycle.opts");
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = {
                        fx: options
                    }
            }
            return options
        } else {
            if (options.constructor == Number) {
                var num = options;
                options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not advance slide");
                    return false
                }
                if (num < 0 || num >= options.elements.length) {
                    log("invalid slide index: " + num);
                    return false
                }
                options.nextSlide = num;
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0
                }
                if (typeof arg2 == "string") {
                    options.oneTimeFx = arg2
                }
                go(options.elements, options, 1, num >= options.currSlide);
                return false
            }
        }
        return options;

        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) {
                var options = $(cont).data("cycle.opts");
                if (!options) {
                    log("options not found, can not resume");
                    return false
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0
                }
                go(options.elements, options, 1, !options.backwards)
            }
        }
    }
    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute("filter")
            } catch (smother) {}
        }
    }
    function destroy(cont, opts) {
        if (opts.next) {
            $(opts.next).unbind(opts.prevNextEvent)
        }
        if (opts.prev) {
            $(opts.prev).unbind(opts.prevNextEvent)
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            $.each(opts.pagerAnchors || [], function () {
                this.unbind().remove()
            })
        }
        opts.pagerAnchors = null;
        $(cont).children("img").show();
        if (opts.destroy) {
            opts.destroy(opts)
        }
    }
    function buildOptions($cont, $slides, els, options, o) {
        var startingSlideSpecified;
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
        if (meta) {
            opts = $.extend(opts, meta)
        }
        if (opts.autostop) {
            opts.countdown = opts.autostopCount || els.length
        }
        var cont = $cont[0];
        $cont.data("cycle.opts", opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        if (!$.support.opacity && opts.cleartype) {
            opts.after.push(function () {
                removeFilter(this, opts)
            })
        }
        if (opts.continuous) {
            opts.after.push(function () {
                go(els, opts, 0, !opts.backwards)
            })
        }
        saveOriginalOpts(opts);
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
            clearTypeFix($slides)
        }
        if ($cont.css("position") == "static") {
            $cont.css("position", "relative")
        }
        if (opts.width) {
            $cont.width(opts.width)
        }
        if (opts.height && opts.height != "auto") {
            $cont.height(opts.height)
        }
        if (opts.startingSlide !== undefined) {
            opts.startingSlide = parseInt(opts.startingSlide, 10);
            if (opts.startingSlide >= els.length || opts.startSlide < 0) {
                opts.startingSlide = 0
            } else {
                startingSlideSpecified = true
            }
        } else {
            if (opts.backwards) {
                opts.startingSlide = els.length - 1
            } else {
                opts.startingSlide = 0
            }
        }
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++) {
                opts.randomMap.push(i)
            }
            opts.randomMap.sort(function (a, b) {
                return Math.random() - 0.5
            });
            if (startingSlideSpecified) {
                for (var cnt = 0; cnt < els.length; cnt++) {
                    if (opts.startingSlide == opts.randomMap[cnt]) {
                        opts.randomIndex = cnt
                    }
                }
            } else {
                opts.randomIndex = 1;
                opts.startingSlide = opts.randomMap[1]
            }
        } else {
            if (opts.startingSlide >= els.length) {
                opts.startingSlide = 0
            }
        }
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;
        $slides.css({
            position: "absolute",
            top: 0,
            left: 0
        }).hide().each(function (i) {
                var z;
                if (opts.backwards) {
                    z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i
                } else {
                    z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i
                }
                $(this).css("z-index", z)
            });
        $(els[first]).css("opacity", 1).show();
        removeFilter(els[first], opts);
        if (opts.fit) {
            if (!opts.aspect) {
                if (opts.width) {
                    $slides.width(opts.width)
                }
                if (opts.height && opts.height != "auto") {
                    $slides.height(opts.height)
                }
            } else {
                $slides.each(function () {
                    var $slide = $(this);
                    var ratio = (opts.aspect === true) ? $slide.width() / $slide.height() : opts.aspect;
                    if (opts.width && $slide.width() != opts.width) {
                        $slide.width(opts.width);
                        $slide.height(opts.width / ratio)
                    }
                    if (opts.height && $slide.height() < opts.height) {
                        $slide.height(opts.height);
                        $slide.width(opts.height * ratio)
                    }
                })
            }
        }
        if (opts.center && ((!opts.fit) || opts.aspect)) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
                    "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
                })
            })
        }
        if (opts.center && !opts.fit && !opts.slideResize) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
                    "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
                })
            })
        }
        var reshape = opts.containerResize && !$cont.innerHeight();
        if (reshape) {
            var maxw = 0,
                maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]),
                    e = $e[0],
                    w = $e.outerWidth(),
                    h = $e.outerHeight();
                if (!w) {
                    w = e.offsetWidth || e.width || $e.attr("width")
                }
                if (!h) {
                    h = e.offsetHeight || e.height || $e.attr("height")
                }
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh
            }
            if (maxw > 0 && maxh > 0) {
                $cont.css({
                    width: maxw + "px",
                    height: maxh + "px"
                })
            }
        }
        var pauseFlag = false;
        if (opts.pause) {
            $cont.bind("mouseenter.cycle", function () {
                pauseFlag = true;
                this.cyclePause++;
                triggerPause(cont, true)
            }).bind("mouseleave.cycle", function () {
                    if (pauseFlag) {
                        this.cyclePause--
                    }
                    triggerPause(cont, true)
                })
        }
        if (supportMultiTransitions(opts) === false) {
            return false
        }
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function () {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr("height") || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr("width") || 0);
            if ($el.is("img")) {
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) {
                        log(options.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH);
                        setTimeout(function () {
                            $(o.s, o.c).cycle(options)
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false
                    } else {
                        log("could not determine size of image: " + this.src, this.cycleW, this.cycleH)
                    }
                }
            }
            return true
        });
        if (requeue) {
            return false
        }
        opts.cssBefore = opts.cssBefore || {};
        opts.cssAfter = opts.cssAfter || {};
        opts.cssFirst = opts.cssFirst || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};
        $slides.not(":eq(" + first + ")").css(opts.cssBefore);
        $($slides[first]).css(opts.cssFirst);
        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout, 10);
            if (opts.speed.constructor == String) {
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed, 10)
            }
            if (!opts.sync) {
                opts.speed = opts.speed / 2
            }
            var buffer = opts.fx == "none" ? 0 : opts.fx == "shuffle" ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer) {
                opts.timeout += opts.speed
            }
        }
        if (opts.easing) {
            opts.easeIn = opts.easeOut = opts.easing
        }
        if (!opts.speedIn) {
            opts.speedIn = opts.speed
        }
        if (!opts.speedOut) {
            opts.speedOut = opts.speed
        }
        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length) {
                opts.randomIndex = 0
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex]
        } else {
            if (opts.backwards) {
                opts.nextSlide = opts.startingSlide === 0 ? (els.length - 1) : opts.startingSlide - 1
            } else {
                opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1
            }
        }
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init)) {
                init($cont, $slides, opts)
            } else {
                if (opts.fx != "custom" && !opts.multiFx) {
                    log("unknown transition: " + opts.fx, "; slideshow terminating");
                    return false
                }
            }
        }
        var e0 = $slides[first];
        if (!opts.skipInitializationCallbacks) {
            if (opts.before.length) {
                opts.before[0].apply(e0, [e0, e0, opts, true])
            }
            if (opts.after.length) {
                opts.after[0].apply(e0, [e0, e0, opts, true])
            }
        }
        if (opts.next) {
            $(opts.next).bind(opts.prevNextEvent, function () {
                return advance(opts, 1)
            })
        }
        if (opts.prev) {
            $(opts.prev).bind(opts.prevNextEvent, function () {
                return advance(opts, 0)
            })
        }
        if (opts.pager || opts.pagerAnchorBuilder) {
            buildPager(els, opts)
        }
        exposeAddSlide(opts, els);
        return opts
    }
    function saveOriginalOpts(opts) {
        opts.original = {
            before: [],
            after: []
        };
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function () {
            opts.original.before.push(this)
        });
        $.each(opts.after, function () {
            opts.original.after.push(this)
        })
    }
    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        if (opts.fx.indexOf(",") > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, "").split(",");
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log("discarding unknown transition: ", fx);
                    opts.fxs.splice(i, 1);
                    i--
                }
            }
            if (!opts.fxs.length) {
                log("No valid transitions named; slideshow terminating.");
                return false
            }
        } else {
            if (opts.fx == "all") {
                opts.multiFx = true;
                opts.fxs = [];
                for (var p in txs) {
                    if (txs.hasOwnProperty(p)) {
                        tx = txs[p];
                        if (txs.hasOwnProperty(p) && $.isFunction(tx)) {
                            opts.fxs.push(p)
                        }
                    }
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0])
            }
            debug("randomized fx sequence: ", opts.fxs)
        }
        return true
    }
    function exposeAddSlide(opts, els) {
        opts.addSlide = function (newSlide, prepend) {
            var $s = $(newSlide),
                s = $s[0];
            if (!opts.autostopCount) {
                opts.countdown++
            }
            els[prepend ? "unshift" : "push"](s);
            if (opts.els) {
                opts.els[prepend ? "unshift" : "push"](s)
            }
            opts.slideCount = els.length;
            if (opts.random) {
                opts.randomMap.push(opts.slideCount - 1);
                opts.randomMap.sort(function (a, b) {
                    return Math.random() - 0.5
                })
            }
            $s.css("position", "absolute");
            $s[prepend ? "prependTo" : "appendTo"](opts.$cont);
            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++
            }
            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) {
                clearTypeFix($s)
            }
            if (opts.fit && opts.width) {
                $s.width(opts.width)
            }
            if (opts.fit && opts.height && opts.height != "auto") {
                $s.height(opts.height)
            }
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();
            $s.css(opts.cssBefore);
            if (opts.pager || opts.pagerAnchorBuilder) {
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts)
            }
            if ($.isFunction(opts.onAddSlide)) {
                opts.onAddSlide($s)
            } else {
                $s.hide()
            }
        }
    }
    $.fn.cycle.resetState = function (opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function () {
            opts.before.push(this)
        });
        $.each(opts.original.after, function () {
            opts.after.push(this)
        });
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init)) {
            init(opts.$cont, $(opts.elements), opts)
        }
    };

    function go(els, opts, manual, fwd) {
        var p = opts.$cont[0],
            curr = els[opts.currSlide],
            next = els[opts.nextSlide];
        if (manual && opts.busy && opts.manualTrump) {
            debug("manualTrump in go(), stopping active transition");
            $(els).stop(true, true);
            opts.busy = 0;
            clearTimeout(p.cycleTimeout)
        }
        if (opts.busy) {
            debug("transition active, ignoring new tx request");
            return
        }
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual) {
            return
        }
        if (!manual && !p.cyclePause && !opts.bounce && ((opts.autostop && (--opts.countdown <= 0)) || (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end) {
                opts.end(opts)
            }
            return
        }
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();
            if (opts.multiFx) {
                if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length)) {
                    opts.lastFx = 0
                } else {
                    if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0)) {
                        opts.lastFx = opts.fxs.length - 1
                    }
                }
                fx = opts.fxs[opts.lastFx]
            }
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null
            }
            $.fn.cycle.resetState(opts, fx);
            if (opts.before.length) {
                $.each(opts.before, function (i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return
                    }
                    o.apply(next, [curr, next, opts, fwd])
                })
            }
            var after = function () {
                opts.busy = 0;
                $.each(opts.after, function (i, o) {
                    if (p.cycleStop != opts.stopCount) {
                        return
                    }
                    o.apply(next, [curr, next, opts, fwd])
                });
                if (!p.cycleStop) {
                    queueNext()
                }
            };
            debug("tx firing(" + fx + "); currSlide: " + opts.currSlide + "; nextSlide: " + opts.nextSlide);
            opts.busy = 1;
            if (opts.fxFn) {
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent)
            } else {
                if ($.isFunction($.fn.cycle[opts.fx])) {
                    $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent)
                } else {
                    $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent)
                }
            }
        } else {
            queueNext()
        }
        if (changed || opts.nextSlide == opts.currSlide) {
            var roll;
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                    opts.randomMap.sort(function (a, b) {
                        return Math.random() - 0.5
                    })
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide) {
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1
                }
            } else {
                if (opts.backwards) {
                    roll = (opts.nextSlide - 1) < 0;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = 1;
                        opts.currSlide = 0
                    } else {
                        opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                        opts.currSlide = roll ? 0 : opts.nextSlide + 1
                    }
                } else {
                    roll = (opts.nextSlide + 1) == els.length;
                    if (roll && opts.bounce) {
                        opts.backwards = !opts.backwards;
                        opts.nextSlide = els.length - 2;
                        opts.currSlide = els.length - 1
                    } else {
                        opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                        opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1
                    }
                }
            }
        }
        if (changed && opts.pager) {
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass)
        }
        function queueNext() {
            var ms = 0,
                timeout = opts.timeout;
            if (opts.timeout && !opts.continuous) {
                ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
                if (opts.fx == "shuffle") {
                    ms -= opts.speedOut
                }
            } else {
                if (opts.continuous && p.cyclePause) {
                    ms = 10
                }
            }
            if (ms > 0) {
                p.cycleTimeout = setTimeout(function () {
                    go(els, opts, 0, !opts.backwards)
                }, ms)
            }
        }
    }
    $.fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
        $(pager).each(function () {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName)
        })
    };

    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while (opts.fx != "none" && (t - opts.speed) < 250) {
                t += opts.speed
            }
            debug("calculated timeout: " + t + "; speed: " + opts.speed);
            if (t !== false) {
                return t
            }
        }
        return opts.timeout
    }
    $.fn.cycle.next = function (opts) {
        advance(opts, 1)
    };
    $.fn.cycle.prev = function (opts) {
        advance(opts, 0)
    };

    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0],
            timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0
        }
        if (opts.random && val < 0) {
            opts.randomIndex--;
            if (--opts.randomIndex == -2) {
                opts.randomIndex = els.length - 2
            } else {
                if (opts.randomIndex == -1) {
                    opts.randomIndex = els.length - 1
                }
            }
            opts.nextSlide = opts.randomMap[opts.randomIndex]
        } else {
            if (opts.random) {
                opts.nextSlide = opts.randomMap[opts.randomIndex]
            } else {
                opts.nextSlide = opts.currSlide + val;
                if (opts.nextSlide < 0) {
                    if (opts.nowrap) {
                        return false
                    }
                    opts.nextSlide = els.length - 1
                } else {
                    if (opts.nextSlide >= els.length) {
                        if (opts.nowrap) {
                            return false
                        }
                        opts.nextSlide = 0
                    }
                }
            }
        }
        var cb = opts.onPrevNextEvent || opts.prevNextClick;
        if ($.isFunction(cb)) {
            cb(val > 0, opts.nextSlide, els[opts.nextSlide])
        }
        go(els, opts, 1, moveForward);
        return false
    }
    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function (i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts)
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass)
    }
    $.fn.cycle.createPagerAnchor = function (i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug("pagerAnchorBuilder(" + i + ", el) returned: " + a)
        } else {
            a = '<a href="#">' + (i + 1) + "</a>"
        }
        if (!a) {
            return
        }
        var $a = $(a);
        if ($a.parents("body").length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function () {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0])
                });
                $a = $(arr)
            } else {
                $a.appendTo($p)
            }
        }
        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);
        var pagerFn = function (e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0],
                timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0
            }
            var cb = opts.onPagerEvent || opts.pagerClick;
            if ($.isFunction(cb)) {
                cb(opts.nextSlide, els[opts.nextSlide])
            }
            go(els, opts, 1, opts.currSlide < i)
        };
        if (/mouseenter|mouseover/i.test(opts.pagerEvent)) {
            $a.hover(pagerFn, function () {})
        } else {
            $a.bind(opts.pagerEvent, pagerFn)
        }
        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble) {
            $a.bind("click.cycle", function () {
                return false
            })
        }
        var cont = opts.$cont[0];
        var pauseFlag = false;
        if (opts.pauseOnPagerHover) {
            $a.hover(function () {
                pauseFlag = true;
                cont.cyclePause++;
                triggerPause(cont, true, true)
            }, function () {
                if (pauseFlag) {
                    cont.cyclePause--
                }
                triggerPause(cont, true, true)
            })
        }
    };
    $.fn.cycle.hopsFromLast = function (opts, fwd) {
        var hops, l = opts.lastSlide,
            c = opts.currSlide;
        if (fwd) {
            hops = c > l ? c - l : opts.slideCount - l
        } else {
            hops = c < l ? l - c : l + opts.slideCount - c
        }
        return hops
    };

    function clearTypeFix($slides) {
        debug("applying clearType background-color hack");

        function hex(s) {
            s = parseInt(s, 10).toString(16);
            return s.length < 2 ? "0" + s : s
        }
        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != "html"; e = e.parentNode) {
                var v = $.css(e, "background-color");
                if (v && v.indexOf("rgb") >= 0) {
                    var rgb = v.match(/\d+/g);
                    return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2])
                }
                if (v && v != "transparent") {
                    return v
                }
            }
            return "#ffffff"
        }
        $slides.each(function () {
            $(this).css("background-color", getBg(this))
        })
    }
    $.fn.cycle.commonReset = function (curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        if (typeof opts.cssBefore.opacity == "undefined") {
            opts.cssBefore.opacity = 1
        }
        opts.cssBefore.display = "block";
        if (opts.slideResize && w !== false && next.cycleW > 0) {
            opts.cssBefore.width = next.cycleW
        }
        if (opts.slideResize && h !== false && next.cycleH > 0) {
            opts.cssBefore.height = next.cycleH
        }
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = "none";
        $(curr).css("zIndex", opts.slideCount + (rev === true ? 1 : 0));
        $(next).css("zIndex", opts.slideCount + (rev === true ? 0 : 1))
    };
    $.fn.cycle.custom = function (curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr),
            $n = $(next);
        var speedIn = opts.speedIn,
            speedOut = opts.speedOut,
            easeIn = opts.easeIn,
            easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == "number") {
                speedIn = speedOut = speedOverride
            } else {
                speedIn = speedOut = 1
            }
            easeIn = easeOut = null
        }
        var fn = function () {
            $n.animate(opts.animIn, speedIn, easeIn, function () {
                cb()
            })
        };
        $l.animate(opts.animOut, speedOut, easeOut, function () {
            $l.css(opts.cssAfter);
            if (!opts.sync) {
                fn()
            }
        });
        if (opts.sync) {
            fn()
        }
    };
    $.fn.cycle.transitions = {
        fade: function ($cont, $slides, opts) {
            $slides.not(":eq(" + opts.currSlide + ")").css("opacity", 0);
            opts.before.push(function (curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0
            });
            opts.animIn = {
                opacity: 1
            };
            opts.animOut = {
                opacity: 0
            };
            opts.cssBefore = {
                top: 0,
                left: 0
            }
        }
    };
    $.fn.cycle.ver = function () {
        return ver
    };
    $.fn.cycle.defaults = {
        activePagerClass: "activeSlide",
        after: null,
        allowPagerClickBubble: false,
        animIn: null,
        animOut: null,
        aspect: false,
        autostop: 0,
        autostopCount: 0,
        backwards: false,
        before: null,
        center: null,
        cleartype: !$.support.opacity,
        cleartypeNoBg: false,
        containerResize: 1,
        continuous: 0,
        cssAfter: null,
        cssBefore: null,
        delay: 0,
        easeIn: null,
        easeOut: null,
        easing: null,
        end: null,
        fastOnEvent: 0,
        fit: 0,
        fx: "fade",
        fxFn: null,
        height: "auto",
        manualTrump: true,
        metaAttr: "cycle",
        next: null,
        nowrap: 0,
        onPagerEvent: null,
        onPrevNextEvent: null,
        pager: null,
        pagerAnchorBuilder: null,
        pagerEvent: "click.cycle",
        pause: 0,
        pauseOnPagerHover: 0,
        prev: null,
        prevNextEvent: "click.cycle",
        random: 0,
        randomizeEffects: 1,
        requeueOnImageNotLoaded: true,
        requeueTimeout: 250,
        rev: 0,
        shuffle: null,
        skipInitializationCallbacks: false,
        slideExpr: null,
        slideResize: 1,
        speed: 1000,
        speedIn: null,
        speedOut: null,
        startingSlide: undefined,
        sync: 1,
        timeout: 4000,
        timeoutFn: null,
        updateActivePagerLink: null,
        width: null
    }
})(jQuery);
/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    $.fn.cycle.transitions.none = function ($cont, $slides, opts) {
        opts.fxFn = function (curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after()
        }
    };
    $.fn.cycle.transitions.fadeout = function ($cont, $slides, opts) {
        $slides.not(":eq(" + opts.currSlide + ")").css({
            display: "block",
            opacity: 1
        });
        opts.before.push(function (curr, next, opts, w, h, rev) {
            $(curr).css("zIndex", opts.slideCount + (rev !== true ? 1 : 0));
            $(next).css("zIndex", opts.slideCount + (rev !== true ? 0 : 1))
        });
        opts.animIn.opacity = 1;
        opts.animOut.opacity = 0;
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = "block";
        opts.cssAfter.zIndex = 0
    };
    $.fn.cycle.transitions.scrollUp = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.cssFirst.top = 0;
        opts.animIn.top = 0;
        opts.animOut.top = -h
    };
    $.fn.cycle.transitions.scrollDown = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst.top = 0;
        opts.cssBefore.top = -h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h
    };
    $.fn.cycle.transitions.scrollLeft = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0 - w
    };
    $.fn.cycle.transitions.scrollRight = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = -w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w
    };
    $.fn.cycle.transitions.scrollHorz = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden").width();
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev) {
                fwd = !fwd
            }
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW
        });
        opts.cssFirst.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = 0
    };
    $.fn.cycle.transitions.scrollVert = function ($cont, $slides, opts) {
        $cont.css("overflow", "hidden");
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev) {
                fwd = !fwd
            }
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.left = 0
    };
    $.fn.cycle.transitions.slideX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.width = "show";
        opts.animOut.width = 0
    };
    $.fn.cycle.transitions.slideY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animIn.height = "show";
        opts.animOut.height = 0
    };
    $.fn.cycle.transitions.shuffle = function ($cont, $slides, opts) {
        var i, w = $cont.css("overflow", "visible").width();
        $slides.css({
            left: 0,
            top: 0
        });
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true)
        });
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2;
            opts.speedAdjusted = true
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {
            left: -w,
            top: 15
        };
        opts.els = [];
        for (i = 0; i < $slides.length; i++) {
            opts.els.push($slides[i])
        }
        for (i = 0; i < opts.currSlide; i++) {
            opts.els.push(opts.els.shift())
        }
        opts.fxFn = function (curr, next, opts, cb, fwd) {
            if (opts.rev) {
                fwd = !fwd
            }
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function () {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++) {
                    if (fwd) {
                        opts.els.push(opts.els.shift())
                    } else {
                        opts.els.unshift(opts.els.pop())
                    }
                }
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++) {
                        $(opts.els[i]).css("z-index", len - i + count)
                    }
                } else {
                    var z = $(curr).css("z-index");
                    $el.css("z-index", parseInt(z, 10) + 1 + count)
                }
                $el.animate({
                    left: 0,
                    top: 0
                }, opts.speedOut, opts.easeOut, function () {
                    $(fwd ? this : curr).hide();
                    if (cb) {
                        cb()
                    }
                })
            })
        };
        $.extend(opts.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        })
    };
    $.fn.cycle.transitions.turnUp = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
            opts.animOut.width = next.cycleW
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.height = 0;
        opts.animIn.top = 0;
        opts.animOut.height = 0
    };
    $.fn.cycle.transitions.turnDown = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animOut.height = 0
    };
    $.fn.cycle.transitions.turnLeft = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.left = 0;
        opts.animOut.width = 0
    };
    $.fn.cycle.transitions.turnRight = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW
        });
        $.extend(opts.cssBefore, {
            top: 0,
            left: 0,
            width: 0
        });
        opts.animIn.left = 0;
        opts.animOut.width = 0
    };
    $.fn.cycle.transitions.zoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            $.extend(opts.animIn, {
                top: 0,
                left: 0,
                width: next.cycleW,
                height: next.cycleH
            });
            $.extend(opts.animOut, {
                width: 0,
                height: 0,
                top: curr.cycleH / 2,
                left: curr.cycleW / 2
            })
        });
        opts.cssFirst.top = 0;
        opts.cssFirst.left = 0;
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0
    };
    $.fn.cycle.transitions.fadeZoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            $.extend(opts.animIn, {
                top: 0,
                left: 0,
                width: next.cycleW,
                height: next.cycleH
            })
        });
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
        opts.animOut.opacity = 0
    };
    $.fn.cycle.transitions.blindX = function ($cont, $slides, opts) {
        var w = $cont.css("overflow", "hidden").width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW
        });
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w
    };
    $.fn.cycle.transitions.blindY = function ($cont, $slides, opts) {
        var h = $cont.css("overflow", "hidden").height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h
    };
    $.fn.cycle.transitions.blindZ = function ($cont, $slides, opts) {
        var h = $cont.css("overflow", "hidden").height();
        var w = $cont.width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = w;
        opts.animIn.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = h;
        opts.animOut.left = w
    };
    $.fn.cycle.transitions.growX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = 0
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0
    };
    $.fn.cycle.transitions.growY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = this.cycleH;
            opts.animOut.top = 0
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0
    };
    $.fn.cycle.transitions.curtainX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = curr.cycleW / 2;
            opts.animOut.width = 0
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0
    };
    $.fn.cycle.transitions.curtainY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH / 2;
            opts.animOut.height = 0
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0
    };
    $.fn.cycle.transitions.cover = function ($cont, $slides, opts) {
        var d = opts.direction || "left";
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            if (d == "right") {
                opts.cssBefore.left = -w
            } else {
                if (d == "up") {
                    opts.cssBefore.top = h
                } else {
                    if (d == "down") {
                        opts.cssBefore.top = -h
                    } else {
                        opts.cssBefore.left = w
                    }
                }
            }
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0
    };
    $.fn.cycle.transitions.uncover = function ($cont, $slides, opts) {
        var d = opts.direction || "left";
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == "right") {
                opts.animOut.left = w
            } else {
                if (d == "up") {
                    opts.animOut.top = -h
                } else {
                    if (d == "down") {
                        opts.animOut.top = h
                    } else {
                        opts.animOut.left = -w
                    }
                }
            }
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0
    };
    $.fn.cycle.transitions.toss = function ($cont, $slides, opts) {
        var w = $cont.css("overflow", "visible").width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (!opts.animOut.left && !opts.animOut.top) {
                $.extend(opts.animOut, {
                    left: w * 2,
                    top: -h / 2,
                    opacity: 0
                })
            } else {
                opts.animOut.opacity = 0
            }
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0
    };
    $.fn.cycle.transitions.wipe = function ($cont, $slides, opts) {
        var w = $cont.css("overflow", "hidden").width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip)) {
                clip = "rect(0px 0px " + h + "px 0px)"
            } else {
                if (/r2l/.test(opts.clip)) {
                    clip = "rect(0px " + w + "px " + h + "px " + w + "px)"
                } else {
                    if (/t2b/.test(opts.clip)) {
                        clip = "rect(0px " + w + "px 0px 0px)"
                    } else {
                        if (/b2t/.test(opts.clip)) {
                            clip = "rect(" + h + "px " + w + "px " + h + "px 0px)"
                        } else {
                            if (/zoom/.test(opts.clip)) {
                                var top = parseInt(h / 2, 10);
                                var left = parseInt(w / 2, 10);
                                clip = "rect(" + top + "px " + left + "px " + top + "px " + left + "px)"
                            }
                        }
                    }
                }
            }
        }
        opts.cssBefore.clip = opts.cssBefore.clip || clip || "rect(0px 0px 0px 0px)";
        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0], 10),
            r = parseInt(d[1], 10),
            b = parseInt(d[2], 10),
            l = parseInt(d[3], 10);
        opts.before.push(function (curr, next, opts) {
            if (curr == next) {
                return
            }
            var $curr = $(curr),
                $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = "block";
            var step = 1,
                count = parseInt((opts.speedIn / 13), 10) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count), 10) : 0;
                var ll = l ? l - parseInt(step * (l / count), 10) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1), 10) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1), 10) : w;
                $next.css({
                    clip: "rect(" + tt + "px " + rr + "px " + bb + "px " + ll + "px)"
                });
                (step++ <= count) ? setTimeout(f, 13) : $curr.css("display", "none")
            })()
        });
        $.extend(opts.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        });
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            left: 0
        }
    }
})(jQuery);
(function ($, window, document) {
    var methods = {},
        tabIconNormal = "s32-price_slider",
        tabIconHighlighted = "s32-price_slider_on",
        priceSliderTemplate = ['<div class="price-slider">', '<div class="price-labels">', '<div class="min-price-label">$0</div>', '<div class="max-price-label">$400</div>', '<div class="clear"></div>', "</div>", '<div class="slider-bg">', '<div class="min-price-tab s32-price_slider"></div>', '<div class="max-price-tab s32-price_slider"></div>', "</div>", "</div>"].join(""),
        defaults = {
            maxRange: 450,
            minPrice: 0,
            maxPrice: 450,
            pricePrefix: "$",
            priceInterval: 10,
            onChange: function (min, max) {}
        };
    methods.minPrice = function (price) {
        var data = $(this).data("priceslider"),
            $slider = data.$slider;
        if (price >= 0) {
            _setMinPrice($slider, price, data)
        } else {
            return data.minPrice
        }
    };
    methods.maxPrice = function (price) {
        var data = $(this).data("priceslider"),
            $slider = data.$slider;
        if (price >= 0) {
            _setMaxPrice($slider, price, data)
        } else {
            return data.maxPrice
        }
    };
    methods.rangeMax = function () {
        var data = $(this).data("priceslider"),
            $slider = data.$slider;
        return data.maxRange
    };
    methods.reset = function () {
        var data = $(this).data("priceslider"),
            $slider = data.$slider;
        _setMinPrice($slider, 0, data);
        _setMaxPrice($slider, data.maxRange, data)
    };
    methods.init = function (settings) {
        for (key in defaults) {
            settings[key] = (settings[key]) ? settings[key] : defaults[key]
        }
        return this.each(function () {
            var $container = $(this),
                data = $container.data("priceslider") || settings,
                id = $container.attr("id") || $container.attr("name"),
                $slider = false;
            if (data.id) {
                return $container
            } else {
                data.id = id;
                data.minRange = 0;
                data.priceInterval = (data.priceInterval) ? data.priceInterval : 1
            }
            $slider = $(priceSliderTemplate);
            data.$slider = $slider;
            $slider.data("priceslider", data);
            $container.data("priceslider", data);
            $container.html($slider);
            _setMinPrice($slider, settings.minPrice, data);
            _setMaxPrice($slider, settings.maxPrice, data);
            _slideActions($slider, data)
        })
    };
    $.fn.priceSlider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments)
            }
        }
    };

    function _slideActions($slider, settings) {
        var drag = {
                elem: null,
                left: 0,
                x: 0,
                state: false,
                isMin: false
            },
            width = _sliderWidth($slider),
            leftMin = parseInt(_minTab($slider).css("left"), 10),
            leftMax = parseInt(_maxTab($slider).css("left"), 10),
            dragStartMin = settings.minPrice,
            dragStartMax = settings.maxPrice,
            zTop = 10,
            interval = settings.priceInterval;
        var cursorHighlightingEnabled = function (enable) {
            document.onselectstart = function () {
                return enable
            }
        };
        var highlightTab = function (ele, hl) {
            var add = (hl) ? tabIconHighlighted : tabIconNormal;
            var remove = (hl) ? tabIconNormal : tabIconHighlighted;
            $(ele).addClass(add).removeClass(remove)
        };
        $slider.delegate(".min-price-tab, .max-price-tab", "mouseenter mouseleave", function (e) {
            if (e.type === "mouseenter" && !drag.state) {
                highlightTab(this, true)
            } else {
                if (e.type === "mouseleave" && !drag.state) {
                    highlightTab(this, false)
                }
            }
        });
        $slider.delegate(".min-price-tab, .max-price-tab", "mousedown", function (e) {
            cursorHighlightingEnabled(false);
            drag.ele = this;
            drag.left = parseInt($(this).css("left"), 10);
            drag.x = e.pageX;
            drag.state = true;
            var data = $slider.data("priceslider");
            dragStartMin = data.minPrice;
            dragStartMax = data.maxPrice;
            if (e.target.className.search("min-price-tab") >= 0) {
                drag.isMin = true;
                $(".min-price-tab").css("z-index", zTop);
                $(".max-price-tab").css("z-index", zTop - 1);
                $(".min-price-label").addClass("highlighted-price")
            } else {
                drag.isMin = false;
                $(".min-price-tab").css("z-index", zTop - 1);
                $(".max-price-tab").css("z-index", zTop);
                $(".max-price-label").addClass("highlighted-price")
            }
            highlightTab(this, true)
        });
        $(document).mousemove(function (e) {
            if (drag.state) {
                var deltaX = drag.x - e.pageX;
                var left = 0;
                var price = null;
                if (drag.isMin) {
                    left = Math.min(Math.max(0, drag.left - deltaX), leftMax);
                    leftMin = left;
                    price = Math.round(leftMin / width * settings.maxRange / interval) * interval;
                    settings.minPrice = price;
                    $slider.find(".min-price-label").html(settings.pricePrefix + price)
                } else {
                    left = Math.max(Math.min(width, drag.left - deltaX), leftMin);
                    leftMax = left;
                    price = Math.round(leftMax / width * settings.maxRange / interval) * interval;
                    settings.maxPrice = price;
                    $slider.find(".max-price-label").html(settings.pricePrefix + price)
                }
                $(drag.ele).css("left", left + "px")
            }
        });
        $(document).mouseup(function (e) {
            if (drag.state) {
                cursorHighlightingEnabled(true);
                drag.state = false;
                drag.ele = null;
                highlightTab(".min-price-tab, .max-price-tab", false);
                if (dragStartMin !== settings.minPrice || dragStartMax !== settings.maxPrice) {
                    settings.onChange(settings.minPrice, settings.maxPrice)
                }
                dragStartMin = settings.minPrice;
                dragStartMax = settings.maxPrice
            }
            $(".min-price-label").removeClass("highlighted-price");
            $(".max-price-label").removeClass("highlighted-price")
        })
    }
    function _sliderWidth($slider) {
        return $slider.width() - _maxTab($slider).width()
    }
    function _setDefaults($slider, settings) {
        _setMinPrice($slider, 0, settings);
        _setMaxPrice($slider, settings.maxRange, settings)
    }
    function _setMinPrice($slider, price, settings) {
        var minTab = _minTab($slider),
            maxTab = _maxTab($slider),
            minLabel = _minLabel($slider),
            maxLabel = _maxLabel($slider),
            interval = settings.priceInterval;
        var pricePercent = price / settings.maxRange;
        var maxLeft = parseInt(maxTab.css("left"), 10) || _sliderWidth($slider);
        var left = Math.max(Math.min(pricePercent * _sliderWidth($slider), maxLeft), 0);
        minTab.css("left", left + "px");
        price = Math.max(0, Math.min(settings.maxPrice, price));
        minLabel.html(settings.pricePrefix + price);
        settings.minPrice = price
    }
    function _setMaxPrice($slider, price, settings) {
        var minTab = _minTab($slider),
            maxTab = _maxTab($slider),
            minLabel = _minLabel($slider),
            maxLabel = _maxLabel($slider),
            interval = settings.priceInterval;
        var pricePercent = price / settings.maxRange;
        var sliderWidth = _sliderWidth($slider);
        var minLeft = parseInt(minTab.css("left"), 10) || 0;
        var left = Math.min(Math.max(pricePercent * sliderWidth, minLeft), sliderWidth);
        maxTab.css("left", left + "px");
        price = Math.min(settings.maxRange, Math.max(settings.minPrice, price));
        maxLabel.html(settings.pricePrefix + price);
        settings.maxPrice = price
    }
    function _minTab($slider) {
        return $slider.find(".min-price-tab")
    }
    function _maxTab($slider) {
        return $slider.find(".max-price-tab")
    }
    function _minLabel($slider) {
        return $slider.find(".min-price-label")
    }
    function _maxLabel($slider) {
        return $slider.find(".max-price-label")
    }
})(jQuery, window, document);

function GridCalendar(settings) {
    var self = this;
    var template = ['<div id="grid-calendar" style="display:none;">', '<div class="s8-ico-close log" data-action="rezo_close"></div>', '<div class="week-bar-extender"></div>', '<div class="calendar-holder"></div>', '<div class="calendar-banner">', "<span>Renting for Thanksgiving weekend?</span><br />", "Enjoy an extended rental on us!<br />", "Rent for 11/27 and return 12/1.", "</div>", "</div>"].join("");
    self.inputEle = $("#" + settings.inputId);
    self.defaultText = typeof (settings.defaultText) !== "undefined" ? settings.defaultText : "Rental Delivery Date";
    self.inputEle.parent().addClass("rescal-datepicker-wrapper");
    self.inputEle.after(template);
    self.onSelectDate = settings.onSelectDate;
    self.onChangeMonthYear = settings.onChangeMonthYear;
    self.container = $("#grid-calendar");
    self.calendar = self.container.find(".calendar-holder");
    self.blackoutDays = settings.blackoutDays || [];
    var formatTimeout = null;
    self.formatCalendar = function () {
        clearTimeout(formatTimeout);
        formatTimeout = setTimeout(function () {
            self.calendar.find("a.ui-datepicker-next").addClass("s8-arr-9-right-black");
            self.calendar.find("a.ui-datepicker-prev").addClass("s8-arr-9-left-black");
            if (!self.date()) {
                self.calendar.find(".ui-state-active").removeClass("ui-state-active").removeClass("ui-state-hover")
            }
        }, 10)
    };
    self.calendar.datepicker({
        hideIfNoPrevNext: true,
        changeMonth: false,
        changeYear: false,
        showOtherMonths: false,
        selectOtherMonths: true,
        minDate: "+0d",
        maxDate: "+120d",
        gotoCurrent: true,
        beforeShowDay: function (date) {
            var selectable_date = date.getDay() !== 0,
                addtlClass = selectable_date ? "" : "ui-datepicker-sunday";
            return [selectable_date && $.inArray(DF.mdyy(date), self.blackoutDays) == -1, addtlClass, selectable_date ? "" : "We do not deliver on this date"]
        },
        onSelect: function (date, inst) {
            if (DF.mdyy(self.prevDate) === DF.mdyy(date)) {
                self.clearDate()
            } else {
                self.date(date)
            }
            self.hideCalendar();
            if (typeof (self.onSelectDate) === "function") {
                self.onSelectDate(self.date(), inst)
            }
        },
        onChangeMonthYear: function (year, month, inst) {
            self.formatCalendar();
            if (typeof (self.onChangeMonthYear) === "function") {
                self.onChangeMonthYear(year, month, inst)
            }
        },
        showOn: "both",
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    });
    if (settings.initialDate) {
        self.date(settings.initialDate)
    } else {
        self.clearDate()
    }
    self.inputEle.click(function () {
        self.showCalendar()
    });
    self.container.find(".s8-ico-close").click(function () {
        self.hideCalendar()
    })
}
GridCalendar.prototype.updateBlackoutDays = function (blackoutDays) {
    self.blackoutDays = blackoutDays
};
GridCalendar.prototype.clearDate = function () {
    this.calendar.datepicker("setDate", null);
    this.inputEle.val(this.defaultText);
    this.prevDate = null;
    this.calendar.find(".ui-state-active").removeClass("ui-state-active").removeClass("ui-state-hover")
};
GridCalendar.prototype.date = function (date) {
    if (date && (date = DF.mdyy(date))) {
        this.calendar.datepicker("setDate", date);
        this.inputEle.val(DF.mdyy(date));
        this.prevDate = date
    }
    var selectedDate = this.calendar.datepicker("getDate");
    if (!selectedDate || selectedDate === new Date(0)) {
        return null
    } else {
        return DF.mdyy(selectedDate)
    }
};
GridCalendar.prototype.showCalendar = function () {
    if (!this.date()) {
        this.clearDate()
    }
    this.formatCalendar();
    this.container.fadeIn("fast");
    this.container.find(".week-bar-extender").css({
        height: ($(this.container.find("th span")[0]).outerHeight() + 2) + "px",
        top: ($(this.container.find("table")[0]).position().top + 4) + "px"
    })
};
GridCalendar.prototype.hideCalendar = function () {
    this.container.hide()
};
var EVENT_TMPL, EVENT_SHOW_COUNT = 4,
    EVENT_TO_CREATE = null;
$(document).ready(function () {
    if ($("#event_details_panel_template").length) {
        EVENT_TMPL = _.template($("#event_details_panel_template").html())
    }
    $(document).bind("click", function (e) {
        if ($(e.target).closest(".ui-datepicker,.ui-datepicker-header").length === 0) {
            cancelAllEdits()
        }
    });
    $(document).bind("refresh_events", function () {
        refreshEventContainer()
    });
    $("body").delegate(".event_selected", "click", function (e) {
        e.stopPropagation()
    });
    $("body").delegate(".save_event", "click", function (e) {
        saveEvent($(this).closest(".event"))
    });
    $("body").delegate(".event_edit_name", "focus", function (e) {
        focusEdit($(this).closest(".event"))
    });
    $("body").delegate("#events_view_all", "click", function (e) {
        toggleEventContainerSize()
    });
    $("body").delegate(".icon_pen", "click", function (e) {
        editEvent($(this).parent(".event"));
        e.stopPropagation()
    });
    $("body").delegate(".icon_x", "click", function (e) {
        deleteEvent($(this).parent(".event"))
    });
    $("body").delegate(".event_selected", "keyup", function (e) {
        if (e.which == 13) {
            saveEvent($(this).closest(".event"))
        }
        if (e.keyCode == 27) {
            cancelEditEvent($(this).closest(".event"))
        }
    });
    $("body").delegate(".event a", "click", function (e) {
        var eventEle = $(this).parent();
        if (!eventEle.hasClass("event_selected")) {
            var date = eventEle.data("date");
            if (gridFilters && typeof (gridApplyFilters) === "function" && GridCalendar) {
                date = GridCalendar.date(date);
                gridFilters.selectedDate = date;
                gridFilters.gridDateUsed = true;
                gridApplyFilters()
            }
        }
        e.stopPropagation();
        e.preventDefault()
    })
});

function tryToCreateEvent(date, sizes) {
    EVENT_TO_CREATE = {
        date: date,
        sizes: sizes
    }
}
function createEvent(date, sizes) {
    $.ajax({
        url: rtr_prop.appPath + "/events",
        type: "PUT",
        data: {
            date: DF.yymd(date),
            sizes: sizes || null
        },
        success: function () {
            refreshEvents()
        }
    })
}
function editEvent(event) {
    var name = event.find(".event_name");
    var edit = $('<input type="text" maxlength="30" class="event_edit_name" onclick="return false;" />');
    edit.val($.trim(name.text()));
    name.html(edit);
    name.insertAfter(event.find(".event_link"));
    edit.focus()
}
function focusEdit(event) {
    if (!event.hasClass("event_selected")) {
        cancelAllEdits();
        event.addClass("event_selected");
        var editName = event.find(".event_edit_name");
        if (editName.val().toLowerCase() == "name your event") {
            editName.val("")
        }
        var date = DF.yymd(event.attr("data-date"));
        var event_data = {
            date: DF.mdyy(date),
            type: (event.attr("data-type") !== null) ? event.attr("data-type") : ""
        };
        event.append(EVENT_TMPL(event_data));
        formatEventCal = function (cal) {
            var holder = "#event-calendar-holder";
            if (!$(holder).length) {
                cal.after('<div id="event-calendar-holder" class="has-grid-cal"></div>')
            }
            cal.appendTo(holder);
            setTimeout(function () {
                var details = $(document).find(".event_selected");
                var left = "120px";
                var top = String(details.offset().top + 35) + "px";
                cal.css("z-index", "10");
                cal.css("top", top);
                cal.css("margin-left", left);
                var nextArrow = cal.find("a.ui-datepicker-next");
                if (nextArrow.hasClass("ui-state-disabled")) {
                    nextArrow.hide()
                } else {
                    nextArrow.addClass("s8-arr-9-right-black")
                }
                var prevArrow = cal.find("a.ui-datepicker-prev");
                if (prevArrow.hasClass("ui-state-disabled")) {
                    prevArrow.hide()
                } else {
                    prevArrow.addClass("s8-arr-9-left-black")
                }
            }, 1)
        };
        event.find(".event_date_field").datepicker({
            defaultDate: date,
            minDate: "+0d",
            beforeShow: function (input, inst) {
                formatEventCal(inst.dpDiv)
            },
            onSelect: function (dateText, inst) {
                $(this).val(dateText)
            },
            onChangeMonthYear: function (year, month, inst) {
                formatEventCal(inst.dpDiv)
            },
            dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        })
    }
}
function cancelAllEdits() {
    $(document).find(".event_selected").each(function () {
        cancelEditEvent($(this))
    })
}
function cancelEditEvent(event, name) {
    name = (name) ? $.trim(name) : event.attr("data-name");
    if (name.toLowerCase() === "my event") {
        var edit = event.find(".event_edit_name");
        if (edit.val() === "") {
            edit.val("Name your Event");
            edit.blur()
        }
    } else {
        event.find(".event_name").text(name).appendTo(event.find(".event_link"))
    }
    event.removeClass("event_selected");
    event.find(".event_details").remove()
}
function saveEvent(event) {
    var data = {
        name: event.attr("data-name"),
        date: event.attr("data-date")
    };
    var editName = event.find(".event_edit_name");
    data.new_name = event.find(".event_edit_name").val() || data.name;
    if (data.new_name === null || data.new_name === "" || data.new_name.toLowerCase() === "name your event" || data.new_name.toLowerCase() === "my event") {
        editName.focus();
        return false
    }
    var newDate = DF.yymd(event.find(".event_date_field").val());
    data.new_date = newDate;
    data.type = event.find(".event_types input:checked").val() || "";
    $.post(rtr_prop.appPath + "/events", data, function (data) {});
    event.attr("data-name", data.new_name);
    event.attr("data-date", data.new_date);
    var new_href = "/dress/search/date" + DF.yymd(newDate) + "--sizes" + event.attr("data-sizes");
    event.find(".event_link").attr("href", new_href);
    event.attr("data-type", data.type);
    var day = DF.d(newDate);
    var month = DF.mm(newDate);
    event.find(".event_date").html(month + "<div>" + day + "</div>");
    cancelEditEvent(event, data.new_name);
    return true
}
function deleteEvent(event) {
    $.ajax({
        type: "DELETE",
        data: {
            name: event.attr("data-name"),
            date: event.attr("data-date")
        },
        url: rtr_prop.appPath + "/events"
    });
    event.remove();
    refreshEventContainer()
}
function refreshEventContainer() {
    var event_container = $("#user_events");
    var remaining_events = event_container.find(".event");
    if (remaining_events.length === 0) {
        $("#user_events").html("");
        $(document).trigger("user_events_empty")
    } else {
        for (var i = 0; i < EVENT_SHOW_COUNT; i++) {
            if (remaining_events[i] !== null) {
                $(remaining_events[i]).removeClass("event_date_hidden").show()
            }
        }
        if (remaining_events.length <= EVENT_SHOW_COUNT) {
            $(document).trigger("user_events_contracted");
            $("#events_view_all").remove();
            if ($("#user_events").hasClass("expanded")) {
                $("#user_events").removeClass("expanded")
            }
        }
    }
}
function toggleEventContainerSize() {
    if ($("#user_events").hasClass("expanded")) {
        $(document).trigger("user_events_contracted");
        $("#user_events").removeClass("expanded");
        $(".event_date_hidden").hide();
        $("#events_view_all").html('view more<span class="icon-caret-down"></span>')
    } else {
        $(document).trigger("user_events_expanded");
        $("#user_events").addClass("expanded");
        $(".event_date_hidden").show();
        $("#events_view_all").html('view less<span class="icon-caret-up"></span>')
    }
}
function refreshEvents() {
    if (grid.gridType == "hearts") {
        return
    }
    var eventsBlock = $("#user_events");
    var eventsTmpl = _.template($("#events_template").html());
    var selectedDate = null;
    if (gridFilters && gridFilters.selectedDate) {
        selectedDate = DF.yymd(gridFilters.selectedDate)
    }
    $.ajax({
        url: rtr_prop.appPath + "/events",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (events) {
            if (events && events.length) {
                eventsBlock.html(eventsTmpl({
                    events: events,
                    showCount: EVENT_SHOW_COUNT,
                    showExpanded: eventsBlock.hasClass("expanded"),
                    selectedDate: selectedDate
                }));
                eventsBlock.show();
                if (EVENT_TO_CREATE) {
                    var createNew = true;
                    _.each(events, function (event) {
                        if (DF.mdyy(event.date) === DF.mdyy(EVENT_TO_CREATE.date)) {
                            createNew = false
                        }
                    });
                    if (createNew) {
                        createEvent(EVENT_TO_CREATE.date, EVENT_TO_CREATE.sizes);
                        EVENT_TO_CREATE = null
                    }
                }
            } else {
                eventsBlock.hide()
            }
        },
        error: function () {
            eventsBlock.hide()
        }
    })
}
function Carousel(settings) {
    this.title = settings.title;
    this.items = settings.items;
    this.numberOfStylesToDisplay = settings.numberOfStylesToDisplay || 3;
    this.tmpl_id = settings.template_id || "pdp-carousel"
}
Carousel.prototype.paint = function () {
    var tmpl = _.template($("#" + this.tmpl_id).html());
    var obj = {
        title: this.title,
        items: this.items
    };
    return tmpl(obj)
};
var all_carousels;

function HorizontalCarousel(settings) {
    if (settings.arrSize) {
        this.arrNext = "s32-arr-" + settings.arrSize + "px-" + this.nextDirection;
        this.arrPrev = "s32-arr-" + settings.arrSize + "px-" + this.prevDirection;
        this.arrNextInactive = "s32-arr-" + settings.arrSize + "px-" + this.nextDirection + "-inactive";
        this.arrPrevInactive = "s32-arr-" + settings.arrSize + "px-" + this.prevDirection + "-inactive";
        delete settings.arrSize
    }
    if (settings.expandable) {
        this.thumb_tmpl_id = "carousel-thumb-temp-expandable"
    }
    var newCarousel = this;
    $.each(settings, function (key, val) {
        if (val) {
            newCarousel[key] = val
        }
    });
    if (this.items && this.items.length > 0) {
        this.setStyleNames(this.items)
    }
    if (all_carousels === undefined && !this.setup) {
        all_carousels = {};
        bindListeners()
    }
    if (this.title) {
        all_carousels[this.title.replace(/<span class=\"highlight\">♥<\/span>/g, "♥")] = this
    } else {
        if (this.containerId) {
            all_carousels[this.containerId] = this
        }
    }
    if (settings.placehold !== false) {
        this.paintDummy()
    }
    return this
}
$.extend(HorizontalCarousel.prototype, {
    tmpl_id: "carousel-temp",
    thumb_tmpl_id: "carousel-thumb-temp-default",
    scrollSpeed: 500,
    arrNext: "s32-arr-34px-next",
    arrPrev: "s32-arr-34px-prev",
    arrNextInactive: "s32-arr-34px-next-inactive",
    arrPrevInactive: "s32-arr-34px-prev-inactive",
    viewLogged: false,
    items: [],
    marginSelector: "left",
    nextDirection: "next",
    prevDirection: "prev",
    primaryDimension: "width",
    sizeOf: function (item) {
        return item.width()
    },
    outerSizeOf: function (item, includeMargin) {
        return item.outerWidth(includeMargin)
    },
    thumbSize: function (thumb) {
        if (!thumb) {
            thumb = this.find(".carousel-thumb")
        }
        return thumb.outerWidth(true)
    },
    thumbCount: function (thumb) {
        if (!thumb) {
            thumb = this.find(".carousel-thumb")
        }
        return thumb.length
    },
    numDisplayed: function () {
        return Math.round(this.sizeOf(this.find(".carousel-thumbs-wrapper")) / this.thumbSize())
    },
    scrollSize: function () {
        var thumbSize = this.thumbSize();
        return Math.floor(this.sizeOf(this.find(".carousel-thumbs-wrapper")) / thumbSize) * thumbSize
    },
    currentPage: function () {
        var offset = Math.abs(parseInt(this.find(".carousel-thumbs").css(this.marginSelector), 10));
        return Math.floor(offset / this.scrollSize()) + 1
    },
    pageStart: function () {
        var offset = Math.abs(parseInt(this.find(".carousel-thumbs").css(this.marginSelector), 10));
        return Math.round(offset / this.thumbSize())
    },
    find: function (selector) {
        return this.jqueryCarousel.find(selector)
    },
    getTitleForLogging: function () {
        return this.title.toLowerCase().replace(/<span class=\"highlight\">♥<\/span>/g, "heart").replace(/ /g, "_")
    },
    getStylesForLogging: function () {
        return this.styleNames.join(",")
    }
});
HorizontalCarousel.prototype.setStyleNames = function (items) {
    var carousel = this;
    carousel.styleNames = [];
    $.each(items, function (index, item) {
        carousel.styleNames.push(item.styleName)
    });
    return this
};
HorizontalCarousel.prototype.setArrows = function (numOnLeft, numOnRight) {
    var inactive = "carousel-arrow-inactive";
    var next = this.find(".carousel-next");
    var prev = this.find(".carousel-prev");
    if (numOnRight === 0) {
        next.addClass(this.arrNextInactive).removeClass(this.arrNext).addClass(inactive)
    } else {
        next.addClass(this.arrNext).removeClass(this.arrNextInactive).removeClass(inactive)
    }
    if (numOnLeft === 0) {
        prev.addClass(this.arrPrevInactive).removeClass(this.arrPrev).addClass(inactive)
    } else {
        prev.addClass(this.arrPrev).removeClass(this.arrPrevInactive).removeClass(inactive)
    }
    return this
};
HorizontalCarousel.prototype.initDimensions = function () {
    this.jqueryCarousel.addClass("horizontal-carousel");
    var thumbWidth = this.find("img").css("width");
    var thumbHeight = this.find("img").css("height");
    this.find(".carousel-thumb").css("width", thumbWidth).css("height", thumbHeight);
    this.find(".carousel-thumbs-wrapper").css("height", this.find(".carousel-thumb").css("height")).css("min-width", this.thumbSize() + "px");
    this.find(".carousel-thumbs").css("width", (this.thumbSize() * this.thumbCount()) + "px");
    return this
};
HorizontalCarousel.prototype.makeExpandable = function () {
    this.find(".carousel-wrapper").addClass("carousel-expandable");
    var popup = $("<div>").addClass("carousel-popup").attr("data-title", this.title).hide();
    this.jqueryCarousel.before(popup);
    return this
};
HorizontalCarousel.prototype.paintDummy = function () {
    var $tmpl = $("#" + this.tmpl_id);
    if (!$tmpl.length) {
        return
    }
    var tmpl = _.template($tmpl.html()),
        dummyItem = {
            classname: "placeholder",
            legacyRelativeProductURL: "#",
            img270xFrontURL: ""
        },
        obj = {
            title: "",
            subtitle: "",
            viewableThumbs: 0,
            items: [dummyItem],
            thumb_tmpl_id: this.thumb_tmpl_id
        };
    this.jqueryCarousel = $(this.containerClass ? "." + this.containerClass : "#" + this.containerId).html(tmpl(obj));
    this.jqueryCarousel.addClass("carousel");
    this.initDimensions();
    if ($.isFunction(this.resize)) {
        this.resize()
    }
};
HorizontalCarousel.prototype.paint = function () {
    if (this.items.length > 0) {
        var tmpl = _.template($("#" + this.tmpl_id).html());
        var obj = {
            title: this.title,
            subtitle: this.subtitle,
            items: this.items,
            thumb_tmpl_id: this.thumb_tmpl_id,
            viewableThumbs: this.numDisplayed()
        };
        if (!this.containerClass && !this.containerId) {
            return tmpl(obj)
        }
        this.jqueryCarousel = $(this.containerClass ? "." + this.containerClass : "#" + this.containerId).html(tmpl(obj))
    } else {
        this.jqueryCarousel = $(this.containerClass ? "." + this.containerClass : "#" + this.containerId)
    }
    this.jqueryCarousel.addClass("carousel");
    if (this.subtitle) {
        this.find(".carousel-subtitle").show()
    }
    if ($.isFunction(show_favorite_icons)) {
        show_favorite_icons()
    }
    this.initDimensions();
    this.resetArrows();
    if (this.expandable) {
        this.makeExpandable()
    }
    if ($.isFunction(this.resize)) {
        this.resize()
    }
    this.find(".carousel-title").addClass(this.titleText || "");
    this.find(".carousel-subtitle").addClass(this.subtitleText || "");
    if ($.isFunction(this.onCreate)) {
        this.onCreate()
    }
    this.loadNextPage(this.currentPage() - 1);
    this.loadNextPage();
    return this
};
HorizontalCarousel.prototype.loadNextPage = function (currentPageOverride) {
    var $images = this.find(".carousel-thumb img"),
        currentPage = currentPageOverride !== undefined ? currentPageOverride : this.currentPage();
    for (var i = 0, ct = this.numDisplayed(); i < ct; i++) {
        var inx = currentPage * this.numDisplayed() + i;
        if (inx > $images.length) {
            break
        }
        PageSpeed.loadLazyImage($images.get(inx))
    }
};
HorizontalCarousel.prototype.resetArrows = function () {
    var margin = parseInt(this.find(".carousel-thumbs").css(this.marginSelector), 10);
    var numOnLeft = Math.abs(margin / this.thumbSize());
    var numShown = Math.round(this.sizeOf(this.find(".carousel-thumbs-wrapper")) / this.thumbSize());
    var numOnRight = this.thumbCount() - numShown - numOnLeft;
    if (Math.abs(margin) + this.sizeOf(this.find(".carousel-thumbs-wrapper")) === this.sizeOf(this.find(".carousel-thumbs"))) {
        numOnRight = 0
    }
    this.setArrows(numOnLeft, numOnRight);
    return this
};
HorizontalCarousel.prototype.scroll = function (scrollNext) {
    var thumbsWrapper = this.find(".carousel-thumbs-wrapper");
    var thumbs = thumbsWrapper.find(".carousel-thumbs");
    var thumb = thumbs.find(".carousel-thumb");
    var thumbSize = this.thumbSize(thumb);
    var numShown = Math.round(this.sizeOf(thumbsWrapper) / thumbSize);
    var thumbCount = thumb.length;
    var margin = parseInt(thumbs.css(this.marginSelector), 10);
    var marginDelta = (scrollNext ? Math.ceil(-1 * this.sizeOf(thumbsWrapper) / thumbSize) : Math.floor(this.sizeOf(thumbsWrapper) / thumbSize)) * thumbSize;
    margin = Math.max(Math.min(margin + marginDelta, 0), this.sizeOf(thumbsWrapper) - this.sizeOf(thumbs));
    var carouselObj = this;
    var animateTo = {};
    var oldMargin = parseInt(thumbs.css(this.marginSelector), 10);
    if (oldMargin !== margin) {
        animateTo[this.marginSelector] = margin + "px";
        thumbs.animate(animateTo, this.scrollSpeed, function () {
            var numOnLeft = Math.abs(margin / thumbSize);
            var numOnRight = thumbCount - numShown - numOnLeft;
            if (Math.abs(margin) + carouselObj.sizeOf(thumbsWrapper) === carouselObj.sizeOf(thumbs)) {
                numOnRight = 0
            }
            carouselObj.setArrows(numOnLeft, numOnRight);
            if ($.isFunction(carouselObj.onArrowClick)) {
                carouselObj.onArrowClick(scrollNext)
            }
            carouselObj.loadNextPage()
        })
    }
    return this
};
HorizontalCarousel.prototype.scrollCorrection = function () {
    var thumbs = this.find(".carousel-thumbs");
    var margin = Math.abs(parseInt(thumbs.css(this.marginSelector), 10));
    var displaySize = this.sizeOf(this.find(".carousel-thumbs-wrapper"));
    var allThumbsSize = this.sizeOf(this.find(".carousel-thumbs"));
    var carousel = this;
    if (margin + displaySize > allThumbsSize) {
        var animateTo = {};
        animateTo[this.marginSelector] = (-1 * (allThumbsSize - displaySize)) + "px";
        carousel = this;
        var callback = function () {
            carousel.resetArrows()
        };
        thumbs.animate(animateTo, this.scrollSpeed, callback)
    } else {
        this.resetArrows()
    }
    return this
};
HorizontalCarousel.prototype.setNumDisplayed = function (numberOfStylesToDisplay) {
    if (0 < numberOfStylesToDisplay && numberOfStylesToDisplay <= this.styleNames.length) {
        this.find(".carousel-thumbs-wrapper").css(this.primaryDimension, carousel.thumbSize() * numberOfStylesToDisplay);
        this.scrollCorrection()
    }
    return this
};
HorizontalCarousel.prototype.scale = function (scalar) {
    var numDisplayed = this.numDisplayed();
    var img = this.find("img");
    var oldWidth = parseInt(img.css("width"), 10);
    var oldHeight = parseInt(img.css("height"), 10);
    img.css("width", (oldWidth * scalar) + "px").css("height", (oldHeight * scalar) + "px");
    this.initDimensions();
    this.setNumDisplayed(numDisplayed);
    return this
};

function VerticalCarousel(settings) {
    HorizontalCarousel.call(this, settings)
}
VerticalCarousel.prototype = new HorizontalCarousel({
    setup: true
});
$.extend(VerticalCarousel.prototype, {
    constructor: VerticalCarousel,
    marginSelector: "top",
    nextDirection: "down",
    prevDirection: "up",
    arrNext: "s32-CarouselArrow_down",
    arrPrev: "s32-CarouselArrow_up",
    arrNextInactive: "s32-CarouselArrow_down_grey",
    arrPrevInactive: "s32-CarouselArrow_up_grey",
    primaryDimension: "height",
    scrollSpeed: 400,
    setup: false,
    sizeOf: function (item) {
        return item.height()
    },
    outerSizeOf: function (item, includeSizeOf) {
        return item.outerHeight(includeSizeOf)
    },
    thumbSize: function (thumb) {
        if (!thumb) {
            thumb = this.find(".carousel-thumb")
        }
        return (thumb.outerHeight(true) + thumb.height()) / 2
    },
    thumbCount: function (thumb) {
        if (!thumb) {
            thumb = this.find(".carousel-thumb")
        }
        return thumb.length
    },
    initDimensions: function () {
        this.jqueryCarousel.addClass("vertical-carousel");
        var thumbWidth = this.find("img").css("width");
        var thumbHeight = this.find("img").css("height");
        this.find(".carousel-thumb").css("width", thumbWidth).css("height", thumbHeight);
        this.find(".carousel-wrapper").css("width", thumbWidth);
        this.find(".carousel-thumbs-wrapper").css("min-height", this.thumbSize() + "px").css("max-height", (this.thumbSize() * this.thumbCount()) + "px");
        this.find(".carousel-thumbs").css("height", (this.thumbSize() * this.thumbCount()) + "px");
        return this
    }
});

function bindListeners() {
    var $document = $(document),
        $window = $(window);
    $document.delegate(".carousel-prev, .carousel-next", "click", function () {
        var carousel = all_carousels[$(this).parents(".carousel-wrapper").find(".carousel-title").text()];
        carousel = carousel ? carousel : all_carousels[$(this).parents(".carousel-wrapper").parent().attr("id")];
        if (carousel) {
            carousel.scroll($(this).attr("class").match("next"))
        }
    });
    $document.delegate(".carousel-thumb", "mouseenter mouseleave", function (e) {
        var thumbInfo = $(this).find(".carousel-thumb-info");
        if (typeof (thumbInfo) !== "undefined") {
            if (e.type === "mouseenter") {
                thumbInfo.show()
            } else {
                thumbInfo.hide()
            }
        }
    });
    $document.delegate(".carousel-thumb a", "click mousedown", function (e) {
        if (!$(e.target).hasClass("favorite_add") && !$(e.target).hasClass("favorite_remove")) {
            var carousel = all_carousels[$(this).parents(".carousel-wrapper").find(".carousel-title").text()];
            carousel = carousel ? carousel : all_carousels[$(this).parents(".carousel-wrapper").parent().attr("id")];
            var styleName = $(this).attr("data-style");
            if ($.isFunction(carousel.onThumbClick)) {
                carousel.onThumbClick(styleName)
            }
        }
    });
    $document.delegate(".carousel-expandable .carousel-thumb", "mouseenter", function () {
        var popup = $(".carousel-popup");
        var offset = $(this).offset();
        popup.html($(this).html());
        popup.css({
            left: (offset.left - 37.5) + "px",
            top: 0 + "px"
        });
        popup.show()
    });
    $document.delegate(".carousel-popup", "mouseleave", function () {
        $(this).hide()
    });
    $document.delegate(".carousel-popup", "click mousedown", function (e) {
        var carousel = all_carousels[$(this).attr("data-title")];
        if (!$(e.target).hasClass("favorite_add") && !$(e.target).hasClass("favorite_remove")) {
            if ($.isFunction(carousel.onPopupClick)) {
                carousel.onPopupClick($(this))
            }
        }
    });
    $window.scroll(function () {
        $.each(all_carousels || {}, function (title, carousel) {
            if ($.isFunction(carousel.onWindowScroll)) {
                carousel.onWindowScroll();
                carousel.scrollCorrection()
            }
        })
    });
    $window.resize(function () {
        $.each(all_carousels || {}, function (title, carousel) {
            if ($.isFunction(carousel.onWindowResize)) {
                carousel.onWindowResize();
                carousel.scrollCorrection()
            }
        })
    })
}
var dancingTO;
$(document).ready(function () {
    var filters = filtersFromURL(document.URL, grid.urlSplit);
    highlightFilters(filters);
    initGridFilters(filters, grid.blackoutDays);
    if (grid.renderClientSide) {
        gridApplyFilters(true)
    } else {
        if (!grid.styleNames.length) {
            gridFetchRequestEmpty()
        }
    }
    show_favorite_icons();
    gridScrollOnBack();
    gridInteractions();
    gridPushStateSetup();
    updatePlusSizeLink();
    $(".back-to-top").remove();
    $(document).bind(RTR.UX.hasUserData() ? "ready" : "userDataReady", function () {
        if (RTR.UX.hasUserData()) {
            $("#grid-filters-favorites").show()
        } else {
            $(document).bind("userDataReady", function () {
                if (RTR.UX.hasUserData() && window.location.pathname.indexOf("/dress/search") != -1) {
                    gridApplyFilters()
                }
            })
        }
        if (RTR.UX.hasProfile() && RTR.UX.getProfile().admin) {
            grid.adminView = true;
            $(".thumb-admin-sizes").show();
            updateBlackoutDaysForAdmin()
        } else {
            grid.adminView = false;
            $(".thumb-admin-sizes").hide()
        }
        show_favorite_icons();
        if (!grid.renderClientSide) {
            logGridItems("grid");
            logExp100()
        }
        googleAnalyticsLog()
    });
    $(window).scroll(function () {
        gridSetLoaderPosition()
    });
    $(window).resize(function () {
        gridSetLoaderPosition()
    });
    gridSetLoaderPosition();
    getCMSContent()
});

function getCMSContent() {
    if (!grid.cms) {
        grid.cms = new CMSClient(rtr_prop.appPath)
    }
    grid.cms.getContent(null, function (status, data) {
        var grid_banner = data["grid-banner"];
        if (grid_banner) {
            $(".grid-wrapper").find(".little-content-banner").append(grid_banner)
        }
    })
}
function logExp100() {
    var exp = grid.exp100;
    if (!exp || !rtr_prop || !rtr_prop.experiments) {
        return
    }
    var treatment = exp[100];
    logAppliedExperiment(100, treatment, rtr_prop.experiments.seg)
}
function gridPushStateSetup() {
    if (history && history.pushState) {
        history.replaceState({
            gridReset: true
        }, "", document.URL)
    }
    window.onpopstate = function (event) {
        if (event && event.state && event.state.gridReset) {
            var filters = filtersFromURL(document.URL, grid.urlSplit);
            clearFilters();
            highlightFilters(filters);
            gridApplyFilters(true)
        }
    }
}
function clearGridScrollCookies() {
    var cookies = document.cookie.split("; ");
    for (i in cookies) {
        var key = cookies[i].split("=")[0];
        if (key.search("grid_scroll_") >= 0) {
            var cKey = key.replace(/\%2F|\%2f/gi, "/");
            $.cookie(cKey, null, {
                path: "/"
            })
        }
    }
}
function gridScrollOnBack() {
    var cookieKey = "grid_scroll_" + window.location.pathname;
    $(document).delegate(".grid-thumb a", "click", function () {
        var top = $(window).scrollTop();
        var d = new Date();
        d.setTime(d.getTime() + (5 * 60 * 1000));
        $.cookie(cookieKey, top, {
            path: "/",
            expires: d
        })
    });
    grid.scrollToTop = ($.cookie(cookieKey)) ? $.cookie(cookieKey) : null;
    clearGridScrollCookies()
}
function gridInteractions() {
    gridUpdatePagination();
    gridShowPagination();
    $(document).delegate(".grid-thumbs .grid-thumb .thumb-heart", "mouseenter", function (e) {
        clearTimeout(dancingTO)
    });
    $(document).delegate(".grid-thumbs .grid-thumb, .grid-thumbs .grid-thumb .grid-thumb-images", "mouseenter", function (e) {
        e.stopPropagation();
        var gridThumb = (e.target.className.search("thumb-img") >= 0) ? $(this).parent() : $(this);
        var popup = $(".product-popup");
        popup.find(".grid-thumb").html(gridThumb.html());
        var styleName = popup.find(".grid-thumb-images").attr("stylename");
        var item;
        if (grid && grid.items && grid.items[styleName]) {
            item = grid.items[styleName].item
        } else {
            return
        }
        var imageTmpl = _.template($("#grid-thumb-popup-images-tmpl").html());
        popup.find(".grid-thumb-images").append(imageTmpl({
            item: item
        }));
        gridPreloadImagesForItem(item);
        var top = gridThumb.position().top - ((popup.height() - gridThumb.height()) / 2);
        var left = gridThumb.position().left - ((popup.width() - gridThumb.width()) / 2);
        popup.css("top", top + "px");
        popup.css("left", left + "px");
        dancingTO = setTimeout(function () {
            popup.show();
            gridCycleDancingLadies(e)
        }, 700)
    });
    $(document).delegate(".grid-thumbs .grid-thumb", "mouseleave", function () {
        clearTimeout(dancingTO)
    });
    $(document).delegate(".grid-no-items-clear", "mouseenter mouseleave", function (e) {
        if (e.type === "mouseenter") {
            $(".grid-no-items-clear span").addClass("s32-arr-9px-next").removeClass("s32-arr-9px-next-pink")
        } else {
            $(".grid-no-items-clear span").removeClass("s32-arr-9px-next").addClass("s32-arr-9px-next-pink")
        }
    });
    $(document).delegate(".product-popup .grid-thumb", "mouseleave", function (e) {
        $(".product-popup").hide()
    })
}
function gridCycleDancingLadies(event) {
    var imageWrapper = $(".product-popup").find(".grid-thumb-images");
    imageWrapper.cycle("destroy");
    clearInterval(rtr_prop.dancing_lady_interval);
    if ($(imageWrapper).children(".dancing-image").length == 1) {
        var target = $(event.target).closest(".grid-thumb-images");
        rtr_prop.dancing_lady_interval = setTimeout(function () {
            gridCycleDancingLadies(event)
        }, 250)
    } else {
        imageWrapper.children(".dancing-image").css("opacity", "1.0").css("display", "block");
        imageWrapper.cycle({
            fx: "fade",
            speed: 1000,
            timeout: 1000,
            delay: -600,
            continuous: 0
        })
    }
}
function gridPreloadImagesForItem(item) {
    if (!item) {
        return
    }
    gridPreloadImage(item.img270xSideURL);
    gridPreloadImage(item.img270xBackURL);
    gridPreloadImage(item.img270xWithModelURL);
    gridPreloadImage(item.img270xTopURL)
}
function gridPreloadImage(src) {
    if (!src) {
        return
    }
    var img = $("<img>");
    img.src = src;
    img.load()
}
function gridCurrentStylenames() {
    var page = grid.pagination.page || 1;
    var max = grid.pagination.displayMax || 100;
    var start = (page - 1) * max;
    return grid.styleNames.slice(start, start + max)
}
function gridShowPage(page, initialRendering) {
    $(window).scrollTop(0);
    grid.pagination.page = page || 1;
    gridUpdatePagination();
    var filters = getSelectedFilters();
    appendUrl(filters, grid.urlSplit, grid.pagination.page);
    gridFetchItems()
}
function gridApplyFilters(forPopState) {
    grid.pagination.page = 1;
    if (forPopState) {
        var filters = filtersFromURL(document.URL, grid.urlSplit);
        if (filters && filters.page && parseInt(filters.page[0], 10) > 0) {
            grid.pagination.page = filters.page
        }
    } else {
        appendUrl(getSelectedFilters(), grid.urlSplit, grid.pagination.page);
        updatePlusSizeLink()
    }
    gridFetchStylenames()
}
function gridFetchStylenames(callback) {
    var responseHandler = function (status, data) {
        if (status) {
            try {
                if (!data) {
                    data = {}
                }
                if (grid.gridType === "similar" && $.isArray(data.style_names)) {
                    data.style_names = data.style_names.slice(0, grid.pagination.displayMax || 100)
                }
                grid.styleNames = data.style_names || [];
                grid.items = data.item_map || {};
                grid.requestId = data.request_id;
                grid.exp100 = data.exp100;
                logExp100();
                logGridItems("grid");
                gridUpdatePagination();
                gridAddItems(data.items)
            } catch (err) {
                gridFetchRequestFailure("GridFetchStylenames try-catch failure.", data, err)
            }
        } else {
            gridFetchRequestFailure("GridFetchStylenames bad status response.", data)
        }
    };
    var filterParams = function () {
        var params = {
            gridType: grid.gridType || "all",
            scope: gridRequestScope(),
            page: grid.pagination.page,
            filters: getSelectedFilters()
        };
        _.each(grid.extraFilters, function (v, k) {
            params.filters[k] = v
        });
        if (!params.filters.postalCode) {
            var profile = RTR.UX.getProfile();
            if (profile) {
                params.filters.postalCode = profile.zipcode
            }
        }
        if (params.filters.postalCode) {
            $.cookie("lastFilteredZip", params.filters.postalCode, {
                path: "/"
            })
        }
        if (grid.occasion) {
            params.occasion = grid.occasion
        }
        if (grid.designerName) {
            params.designerName = grid.designerName
        }
        if (grid.gridType === "hearts" && document.URL.search("/all/hearts/") >= 0) {
            var shared_id = window.location.pathname.split("/all/hearts/")[1].split("/")[0];
            if (shared_id !== "") {
                params.filters.user_id = shared_id
            }
        }
        return params
    };
    if (grid.request) {
        grid.request.abort()
    }
    gridShowLoader();
    if (grid.gridType == "similar" && (window.location.pathname.match("^/hearts/similar") || window.location.pathname.match("^/views/similar"))) {
        if (!grid.uc) {
            grid.uc = new UserClient(rtr_prop.appPath)
        }
        var params = filterParams();
        var seedsResponseHandler = function (status, seeds) {
            if (status && seeds.length > 0) {
                params.filters["seed"] = seeds;
                grid.request = BBClient.getComboGridItems(params, responseHandler)
            } else {
                gridFetchRequestEmpty()
            }
        };
        if (window.location.pathname.match("^/hearts/similar")) {
            grid.uc.getHeartedItems(20, function (status, data) {
                var seeds = filterDresses(data || [], 5);
                seedsResponseHandler(status, seeds)
            })
        } else {
            if (window.location.pathname.match("^/views/similar")) {
                $(document).bind(RTR.UX.hasUserData() ? "ready" : "userDataReady", function () {
                    var user = RTR.UX.hasUserData() ? RTR.UX.user : rtr_prop ? rtr_prop.user : null;
                    if (user && user.viewedStyles && user.viewedStyles.length > 0) {
                        seeds = rtr_prop.user.viewedStyles.slice(0, 3);
                        seedsResponseHandler(true, seeds)
                    } else {
                        seedsResponseHandler(false)
                    }
                })
            } else {
                gridFetchRequestEmpty()
            }
        }
    } else {
        grid.request = BBClient.getComboGridItems(filterParams(), responseHandler)
    }
}
var gridRequestScope = function () {
    var filters = getSelectedFilters();
    var scope = grid.scope;
    if (filters.categories) {
        _.each(filters.categories, function (f) {
            if (f.search("forsale") >= 0) {
                scope = "saleable_products"
            }
        })
    }
    return scope
};

function gridFetchItems() {
    var styleNames = gridCurrentStylenames();
    if (!styleNames || !styleNames.length) {
        gridFetchRequestEmpty();
        return
    }
    function handlePCData(data) {
        if (!data || !(data instanceof Array) || !data.length) {
            return []
        }
        var items = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item && item.styleName) {
                items.push(item);
                if (grid.items[item.styleName]) {
                    grid.items[item.styleName].item = item
                } else {
                    grid.items[item.styleName] = {
                        item: item
                    }
                }
            }
        }
        return items
    }
    var responseHandler = function (status, data) {
        if (status) {
            try {
                var items = handlePCData(data);
                logGridItems("grid");
                gridAddItems(items)
            } catch (err) {
                gridFetchRequestFailure("GridFetchItems try-catch failure.", data, err)
            }
        } else {
            gridFetchRequestFailure("GridFetchItems bad status response.", data)
        }
    };
    if (grid.request) {
        grid.request.abort()
    }
    gridShowLoader();
    grid.request = PCClient.getItems(styleNames, responseHandler, gridRequestScope())
}
function gridAddItems(items) {
    gridHideLoader();
    if (!items || !items.length) {
        gridFetchRequestEmpty();
        return
    } else {
        gridHideNoItems()
    }
    var html = [];
    var thumb = _.template($("#grid-thumb-tmpl").html());
    _.each(items, function (item) {
        var sizes = (grid.items[item.styleName]) ? grid.items[item.styleName].admin_sizes : [];
        html.push(thumb({
            item: item,
            sizes: sizes
        }))
    });
    $("#grid-thumbs").html(html.join(""));
    if (grid.adminView) {
        $(".thumb-admin-sizes").show()
    }
    gridShowPagination();
    show_favorite_icons();
    if (grid.scrollToTop) {
        $(window).scrollTop(grid.scrollToTop);
        grid.scrollToTop = null
    }
}
function gridFetchRequestEmpty() {
    $(".grid-no-items").show();
    gridHideLoader();
    gridHidePagination()
}
function gridHideNoItems() {
    $(".grid-no-items").hide()
}
function gridFetchRequestFailure(message, data, err) {
    if (!data || data.statusText !== "abort") {
        gridFetchRequestEmpty()
    }
}
function gridSetLoaderPosition() {
    if (rtr_prop.mobile) {
        return
    }
    var gridLoader = $(".grid-main-loader");
    var marginTop = Math.max(0, $(window).scrollTop() + $(window).height() / 2 - gridLoader.parent().offset().top);
    var leftPos = gridLoader.parent().offset().left + gridLoader.parent().width() / 2 - 16;
    gridLoader.css({
        left: leftPos + "px"
    });
    if (marginTop) {
        gridLoader.addClass("fixed-loader")
    } else {
        gridLoader.removeClass("fixed-loader")
    }
}
function gridShowLoader() {
    $("#grid-thumbs").empty();
    $(".product-popup").hide();
    gridHidePagination();
    gridHideNoItems();
    gridSetLoaderPosition();
    $(".grid-main-loader").show()
}
function gridHideLoader() {
    $(".grid-main-loader").hide();
    gridShowPagination()
}
function gridShowPagination() {
    if (grid.styleNames.length > grid.pagination.displayMax) {
        $(".grid-pagination-wrapper").show();
        $(".grid-pagination-wrapper-top").show()
    }
}
function gridHidePagination() {
    $(".grid-pagination-wrapper").hide();
    $(".grid-pagination-wrapper-top").hide()
}
function gridUpdatePagination() {
    _.each($(".grid-pagination"), function (ele) {
        $(ele).pagination({
            items: grid.styleNames.length,
            itemsOnPage: grid.pagination.displayMax,
            displayedPages: 3,
            prevText: "<div class='p-arrow s32-Arrow_10PX_left'></div>",
            nextText: "<div class='p-arrow s32-Arrow_10PX_right'></div>",
            currentPage: grid.pagination.page || 1,
            edges: 1,
            onPageClick: function (page) {
                gridHidePagination();
                gridShowPage(page)
            },
            onInit: function () {
                $(".current.next .p-arrow").addClass("s32-Arrow_10PX_right_grey").removeClass("s32-Arrow_10PX_right");
                $(".current.prev .p-arrow").addClass("s32-Arrow_10PX_left_grey").removeClass("s32-Arrow_10PX_left");
                gridHidePagination()
            },
            onPaint: function () {
                $(".current.next .p-arrow").addClass("s32-Arrow_10PX_right_grey").removeClass("s32-Arrow_10PX_right");
                $(".current.prev .p-arrow").addClass("s32-Arrow_10PX_left_grey").removeClass("s32-Arrow_10PX_left")
            }
        })
    })
}
function updatePlusSizeLink() {
    $("#plus-size-grid-link").attr("href", window.location.pathname.replace(grid.urlSplit, "/plussize/search").replace(/sizes(-[0-9]\b|-1[0-3]\b)+/, "sizes").replace(/(sizes\b$|sizes--)/, ""))
}
$(document).bind(RTR.UX.hasUserData() ? "ready" : "userDataReady", function () {
    if (!grid) {
        return
    }
    if (!grid.uc) {
        grid.uc = new UserClient(rtr_prop.appPath)
    }
    var carouselTitle = (grid.gridType === "similar" && window.location.pathname.match("^/hearts/similar")) ? 'Recent <span class="highlight">♥</span>s' : "Recently Viewed";
    var carousel_settings = {
        title: carouselTitle,
        arrSize: 22,
        containerClass: "recent-items-carousels",
        resize: setWrapperPosition,
        onWindowResize: function () {
            this.resize()
        },
        onWindowScroll: function () {
            this.resize()
        },
        logItemsView: logRecentItemsView,
        logItems: logRecentItems,
        onArrowClick: function (scrollNext) {
            this.logItemsView("click_arrow_" + (scrollNext ? "bottom" : "top"))
        },
        onThumbClick: function (styleName) {
            var key = "click_" + styleName;
            var data = {
                style_index: $.inArray(styleName, this.styleNames),
                action: "infer",
                style_name: styleName
            };
            this.logItems(data, key)
        }
    };
    loadItems(carousel_settings)
});

function fixArrows(carousel) {
    carousel.arrNext = "s32-CarouselArrow_down";
    carousel.arrPrev = "s32-CarouselArrow_up";
    carousel.arrNextInactive = "s32-CarouselArrow_down_grey";
    carousel.arrPrevInactive = "s32-CarouselArrow_up_grey"
}
function loadItems(carousel_settings) {
    var paintCarousel = function (status, data) {
        var settings = carousel_settings;
        if (data && data.length) {
            carousel_settings.items = data;
            var recentItemsCarousel = new VerticalCarousel(carousel_settings);
            fixArrows(recentItemsCarousel);
            recentItemsCarousel.paint();
            recentItemsCarousel.find(".carousel-wrapper").addClass("carousel-top")
        }
    };
    if (grid.gridType === "similar" && window.location.pathname.match("^/hearts/similar")) {
        grid.uc.getHeartedItems(20, paintCarousel)
    } else {
        grid.uc.getRecentItems(20, paintCarousel)
    }
}
function loadRecos(carousel_settings) {
    var paintCarousel = function (status, data) {
        var settings = carousel_settings;
        if (data && data.length) {
            carousel_settings.title = (window.location.pathname.search("hearts/search") >= 0) ? 'recommended based on your <span class="highlight">♥</span>' : "recommended for you";
            carousel_settings.items = data;
            var recentItemsCarousel = new VerticalCarousel(carousel_settings);
            fixArrows(recentItemsCarousel);
            recentItemsCarousel.paint();
            recentItemsCarousel.find(".carousel-wrapper").addClass("carousel-top")
        }
    };
    var getRecos = function (styleNames) {
        BBClient.getSimilar({
            seed: styleNames,
            scope: "dresses",
            active: "true"
        }, function (status, data) {
            if (status) {
                var dresses = $.map(data.items.slice(0, 20), function (i, ele) {
                    return ele.styleName
                });
                PCClient.getItems(dresses, paintCarousel, gridRequestScope())
            }
        })
    };
    if (window.location.pathname.search("hearts/search") >= 0) {
        $(".recent-items-carousels .carousels-title").css("font-size", "10px");
        grid.uc.getHeartedItems(20, function (status, data) {
            var dress_stylenames = filterDresses(data, 5);
            getRecos(dress_stylenames)
        })
    } else {
        grid.uc.getRecentItems(20, function (status, data) {
            var dress_stylenames = filterDresses(data, 3);
            getRecos(dress_stylenames)
        })
    }
}
var setWrapperPosition = function () {
    var carouselWrapper = this.find(".carousel-wrapper");
    var gridWrapper = $(".grid-wrapper");
    var filterWrapper = $(".filters-wrapper");
    var offset = carouselWrapper.position().left;
    var top = ($(document).height() - 160) - ($(window).scrollTop() + $(window).height());
    carouselWrapper.css("top", Math.max(-160, Math.min(top, 10)) + "px");
    var leftPos = gridWrapper.width() + gridWrapper.position().left + gridWrapper.parent().offset().left + 18;
    if ($(window).scrollTop() > 210) {
        var left = leftPos;
        carouselWrapper.removeClass("carousel-top").addClass("carousel-scrolling");
        carouselWrapper.css("left", left + "px")
    } else {
        carouselWrapper.removeClass("carousel-scrolling").addClass("carousel-top");
        carouselWrapper.css("top", "10px");
        carouselWrapper.css("left", "")
    }
    var maxHeight = Math.min($(".grid-page-content").height(), $(window).height()) - 130;
    maxHeight = Math.min(maxHeight, this.thumbSize() * this.styleNames.length);
    this.find(".carousel-thumbs-wrapper").css("height", maxHeight + "px");
    if ($(window).width() < 1275 || maxHeight < 160) {
        carouselWrapper.hide()
    } else {
        carouselWrapper.show();
        if (!this.viewLogged) {
            this.logItemsView();
            this.viewLogged = true
        }
    }
};
var filterDresses = function (items, limit) {
    var dresses = $.grep(items, function (element, index) {
        return element.type === "Dress"
    });
    var styleNames = $.map(dresses, function (element, index) {
        return element.styleName
    });
    return (styleNames.slice(0, limit))
};

function BigBenClient(baseUrl) {
    if (!(this instanceof BigBenClient)) {
        return new BigBenClient(baseUrl)
    }
    this.baseUrl = (typeof (baseUrl) === "string" && baseUrl != "/m") ? baseUrl + "/integration" : "/grid/integration"
}
BigBenClient.prototype = new BaseClient();
BigBenClient.prototype.getDresses = function (filters, callback) {
    return this.get(this.baseUrl + "/dresses", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getAccessories = function (filters, callback) {
    return this.get(this.baseUrl + "/accessories", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getSaleables = function (filters, callback) {
    return this.get(this.baseUrl + "/saleables", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getOccasions = function (filters, callback) {
    return this.get(this.baseUrl + "/occasions", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getWhatsNew = function (filters, callback) {
    return this.get(this.baseUrl + "/whatsNew", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getHearts = function (filters, callback) {
    return this.get(this.baseUrl + "/mostPopular", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getHearts = function (filters, callback) {
    return this.get(this.baseUrl + "/hearts", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getSimilar = function (filters, callback) {
    return this.get(this.baseUrl + "/similar", {
        filters: filters
    }, callback)
};
BigBenClient.prototype.getGridItems = function (params, callback) {
    return this.get(this.baseUrl + "/gridItems", params, callback)
};
BigBenClient.prototype.getComboGridItems = function (params, callback) {
    return this.get(this.baseUrl + "/comboGridItems", params, callback)
};
var BBClient = new BigBenClient(rtr_prop.appPath);
var PC_SCOPE_DRESSES = "dresses";
var PC_SCOPE_ACCESSORIES = "accessories";
var PC_SCOPE_SALEABLES = "saleable_products";

function ProductCatalogClient(baseUrl) {
    if (!(this instanceof ProductCatalogClient)) {
        return new ProductCatalogClient(baseUrl)
    }
    this.baseUrl = (typeof (baseUrl) === "string" && baseUrl != "/m") ? baseUrl + "/pc" : "/grid/pc"
}
ProductCatalogClient.prototype = new BaseClient();
ProductCatalogClient.prototype.getDresses = function (styleNames, callback) {
    return this.getItems(styleNames, callback, "dresses")
};
ProductCatalogClient.prototype.getAccessories = function (styleNames, callback) {
    return this.getItems(styleNames, callback, "accessories")
};
ProductCatalogClient.prototype.getSaleables = function (styleNames, callback) {
    return this.getItems(styleNames, callback, "saleable_products")
};
ProductCatalogClient.prototype.getItems = function (styleNames, callback, scope) {
    if (scope !== PC_SCOPE_DRESSES && scope !== PC_SCOPE_ACCESSORIES && scope !== PC_SCOPE_SALEABLES) {
        scope = "all"
    }
    var url = this.baseUrl + "/itemsMetadata";
    var params = {
        sn: styleNames,
        scope: scope
    };
    return this.get(url, params, callback)
};
var PCClient = new ProductCatalogClient(rtr_prop.appPath);
$(document).ready(function () {
    $(document).delegate(".log", "click", function () {
        logClick(this)
    })
});

function logClick(target) {
    var map = {};
    var object_type;
    if (page_type === "PDP") {
        map.style_name = pdp_glob.item.styleName;
        object_type = "node";
        var dataAction = $(target).attr("data-action");
        dataAction = dataAction.replace("click_", "");
        if (pdp_glob[dataAction]) {
            if ($(target).data("val") == pdp_glob[dataAction]) {
                return
            } else {
                pdp_glob[dataAction] = $(target).data("val") + ""
            }
        }
    } else {
        if (page_type === "GRID") {
            map.results = grid.pagination.numRequest;
            object_type = "grid"
        }
    }
    genericPixelLog(object_type, target, map)
}
function genericPixelLog(object_type, target, map) {
    if (map === null) {
        map = {}
    }
    if (target) {
        if ($(target).hasClass("favorite_add")) {
            map.action = "click_unheart"
        } else {
            if ($(target).hasClass("favorite_remove")) {
                map.action = "click_heart"
            }
        }
    }
    R.log(object_type, map)
}
function common_ga_event_track(category, action, label, value, opt_noninteraction) {
    _gaq.push(["_trackEvent", category, action, label, value, opt_noninteraction])
}
function UserClient(baseUrl) {
    if (!(this instanceof UserClient)) {
        return new UserClient(baseUrl)
    }
    this.baseUrl = (typeof (baseUrl) === "string") ? baseUrl : "/pdp"
}
UserClient.prototype = new BaseClient();
UserClient.prototype.getRecentItems = function (limit, callback) {
    var styleNames = [];
    if (lsValueForKey("recentItemsCarousel")) {
        styleNames = JSON.parse(lsValueForKey("recentItemsCarousel"))
    }
    if (rtr_prop.uid && styleNames.length > 0) {
        lsRemoveKey("recentItemsCarousel")
    }
    var url = this.baseUrl + "/users/items/viewed";
    var obj = {
        styleNames: styleNames,
        limit: limit
    };
    this.get(url, obj, callback)
};
UserClient.prototype.getHeartedItems = function (limit, callback) {
    var styleNames = [];
    var url = this.baseUrl + "/users/items/hearted";
    var obj = {
        styleNames: styleNames,
        limit: limit
    };
    this.get(url, obj, callback)
};

function removeDupesAndTrim(styleNames, styleName) {
    var elementIndex = $.inArray(styleName, styleNames);
    if ((styleNames.length > 0) && (elementIndex >= 0)) {
        styleNames.splice(elementIndex, 1)
    }
    return styleNames.splice(0, 21)
}
UserClient.prototype.addRecentItem = function (styleName, callback) {
    var styleNames = [];
    if (rtr_prop.uid) {
        if (lsValueForKey("recentItemsCarousel")) {
            lsRemoveKey("recentItemsCarousel")
        }
        styleNames.unshift(styleName);
        var url = this.baseUrl + "/users/items/viewed";
        this.post(url, {
            styleNames: styleNames
        }, callback)
    } else {
        styleNames = [];
        if (lsValueForKey("recentItemsCarousel")) {
            styleNames = JSON.parse(lsValueForKey("recentItemsCarousel"))
        }
        styleNames = removeDupesAndTrim(styleNames, styleName);
        styleNames.unshift(styleName);
        lsSetKeyValue("recentItemsCarousel", JSON.stringify(styleNames));
        if (callback && typeof (callback) === "function") {
            callback(true, null)
        }
    }
};
UserClient.prototype.getAvailableSkus = function (sku, date, destinationZip, callback) {
    var url = this.baseUrl + "/users/items/availableSkuCount";
    this.get(url, {
        sku: sku,
        date: date,
        destinationZip: destinationZip
    }, callback)
};
var filterPrices = null;
var GridCalendar;
var gridFilters = {};

function initGridFilters(filters, blackoutDays) {
    filters = (filters) ? filters : {};
    addPriceSlider(filters);
    gridFilters.blackoutDays = formatBlackoutDays(blackoutDays);
    var iniDate = (filters.date) ? filters.date.join("/") : null;
    gridFilters.selectedDate = iniDate;
    var currfilters = getSelectedFilters();
    if (iniDate && typeof (createEvent) === "function") {
        tryToCreateEvent(iniDate, currfilters.sizes)
    }
    GridCalendar = new GridCalendar({
        inputId: "grid-calendar-input",
        initialDate: iniDate,
        blackoutDays: gridFilters.blackoutDays,
        onSelectDate: function (date, inst) {
            gridFilters.selectedDate = date;
            gridFilters.gridDateUsed = (date) ? true : false;
            gridApplyFilters();
            filters = getSelectedFilters();
            if (typeof (createEvent) === "function") {
                createEvent(date, filters.sizes)
            }
            var map = {
                action: "rezo_select",
                act_type: "click_dategrid",
                rentbegin: date
            };
            genericPixelLog("grid", null, map);
            $.cookie("lastFilteredDate", date, {
                path: "/"
            })
        },
        onChangeMonthYear: function (year, month, inst) {
            var map = {
                action: "scroll_calendar",
                calMonth: month,
                calYear: year
            };
            genericPixelLog("grid", null, map)
        }
    });
    if (typeof (refreshEvents) === "function") {
        refreshEvents()
    }
    if (filters.seed !== undefined) {
        $.each(filters.seed, function (i, ele) {
            var seed = $("<input>").attr("type", "hidden").addClass("seed").val(ele);
            $(".filters-wrapper").append(seed)
        })
    }
    addFilterInteractions()
}
function formatBlackoutDays(blackoutDays) {
    var days = _.map(blackoutDays, function (d) {
        return DF.mdyy(d)
    });
    var today = new Date();
    var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
    var todayEST = new Date(utc - (3600000 * 5));
    if (todayEST.getHours() >= 15) {
        days.push(DF.mdyy(todayEST))
    }
    return days
}
function updateBlackoutDaysForAdmin() {
    var today = DF.mdyy(new Date());
    var index = $.inArray(today, gridFilters.blackoutDays);
    if (index >= 0) {
        gridFilters.blackoutDays.splice(index, 1)
    }
    if (GridCalendar) {
        GridCalendar.updateBlackoutDays(gridFilters.blackoutDays)
    }
}
function addPriceSlider(filters) {
    if (!filters) {
        filters = {}
    }
    if (grid.extraFilters.clearance) {
        filters.priceMax = 1000;
        filters.maxRange = 1000
    }
    var minPrice = (filters.price) ? filters.price[0] : filters.priceMin;
    var maxPrice = (filters.price) ? filters.price[1] : filters.priceMax;
    if ($("#price-slider").length) {
        filterPrices = $("#price-slider").priceSlider({
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            maxRange: filters.maxRange || null,
            onChange: function (min, max) {
                gridApplyFilters()
            }
        })
    }
}
function getPriceFilterValues() {
    if (!filterPrices) {
        return null
    }
    var minPrice = filterPrices.priceSlider("minPrice");
    var maxPrice = filterPrices.priceSlider("maxPrice");
    var rangeMax = filterPrices.priceSlider("rangeMax");
    if (minPrice > 0 || maxPrice < rangeMax) {
        return {
            min: minPrice,
            max: maxPrice
        }
    } else {
        return null
    }
}
function filterDesigners(searchVal) {
    var count = 0;
    var elements = $("#filtered-designers").find(".filter-item");
    _.each(elements, function (item) {
        var designer = $(item).find(".options-designers").val();
        designer = (designer) ? designer.toLowerCase() : "";
        if (designer.search(searchVal) === 0) {
            $(item).show();
            count++
        } else {
            $(item).hide()
        }
    });
    if (count) {
        $("#filter-no-designers").hide()
    } else {
        $("#filter-no-designers").show()
    }
}
function addFilterInteractions() {
    $(".grid-no-items-clear").click(function () {
        clearFilters();
        gridApplyFilters()
    });
    $(document).delegate("#filter-designer-search", "keyup", function (e) {
        var searchVal = ($(this).val()) ? $(this).val().toLowerCase() : "";
        filterDesigners(searchVal)
    });
    $(".filter-label-link").attr("href", "javascript:void(0)");
    $(document).delegate(".filter-item label", "mouseenter mouseleave", function (e) {
        if (!navigator.userAgent.match(/iPad/i) && !navigator.userAgent.match(/iPhone/i)) {
            if (e.type == "mouseenter") {
                $(this).addClass("filter-item-label-hover")
            } else {
                $(this).removeClass("filter-item-label-hover")
            }
        }
    });
    $(document).delegate(".whats-this", "mouseenter mouseleave", function (e) {
        var tooltip = $(".filters-tooltip");
        if (e.type == "mouseenter") {
            tooltip.html("Heart your favorite styles to keep track of the looks you love.");
            var pos = $(this).offset();
            var hOffset = $("body").css("margin-top") ? parseInt($("body").css("margin-top"), 10) : 0;
            var tooltipWidth = tooltip.outerWidth();
            tooltip.css({
                top: (pos.top - 15 - hOffset) + "px",
                left: (pos.left + tooltipWidth / 2) + "px",
                padding: "8px"
            }).show()
        } else {
            tooltip.css({
                padding: "2px"
            });
            tooltip.hide()
        }
    });
    $(".filter-attributes-category a.options-category").click(function () {
        $(".filter-attributes-category a").removeClass("filter-link-checked");
        $(this).addClass("filter-link-checked");
        gridApplyFilters()
    });
    $(".filter-attributes-sizes .filter-item").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var checkbox = $(this).children(".filter-checkbox");
        var checkboxVal = $(checkbox).attr("value");
        if (checkbox.is(":checked")) {
            checkbox.attr("checked", false);
            $(this).removeClass("filter-checked");
            updateCookie("lastFilteredSize", checkboxVal, true)
        } else {
            checkbox.attr("checked", true);
            $(this).addClass("filter-checked");
            updateCookie("lastFilteredSize", checkboxVal, false)
        }
        gridApplyFilters()
    });
    $(".filter-attributes-swatches .filter-item, .filter-attributes-swatches .swatch-check").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var className = $(this).attr("class");
        var checkbox = (className == "swatch-check") ? $(this).next(".filter-item").children(".filter-checkbox") : $(this).children(".filter-checkbox");
        if (checkbox.is(":checked")) {
            checkbox.attr("checked", false);
            (className == "swatch-check") ? $(this).next(".filter-item").removeClass("filter-item-active") : $(this).removeClass("filter-item-active");
            $(this).parent(".filter-item-outer").removeClass("filter-item-outer-active");
            $(this).parent(".filter-item-outer").children(".swatch-check").hide()
        } else {
            checkbox.attr("checked", true);
            (className == "swatch-check") ? $(this).next(".filter-item").addClass("filter-item-active") : $(this).addClass("filter-item-active");
            $(this).parent(".filter-item-outer").addClass("filter-item-outer-active");
            $(this).parent(".filter-item-outer").children(".swatch-check").show()
        }
        gridApplyFilters()
    });
    $(".filter-checkbox").click(function (e) {
        if ($(this).is(":checked")) {
            $(this).next("label").addClass("filter-item-label-checked")
        } else {
            $(this).next("label").removeClass("filter-item-label-checked")
        }
        gridApplyFilters()
    });
    $(".filter-item-parent").change(function () {
        var checkbox = $(this).children("input");
        var children = $(".filter-checkbox-childof-" + checkbox.data("name"));
        if (checkbox.is(":checked")) {
            checkbox.next("label").addClass("filter-item-label-checked");
            _.each(children, function (child) {
                $(child).attr("checked", true);
                $(child).next("label").addClass("filter-item-label-checked")
            })
        } else {
            checkbox.next("label").removeClass("filter-item-label-checked");
            _.each(children, function (child) {
                $(child).attr("checked", false);
                $(child).next("label").removeClass("filter-item-label-checked")
            })
        }
        gridApplyFilters()
    });
    if (!rtr_prop.mobile) {
        $("#order_by_select").coreUISelect()
    }
    $(".grid-wrapper .b-core-ui-select").prepend('<span class="b-core-ui-select__label">Sort by: </span>');
    $(".grid-wrapper .b-core-ui-select__button").addClass("s8-arr-8-down-grey");
    $("#order_by_select").change(function () {
        gridApplyFilters();
        setTimeout(function () {
            $(".b-core-ui-select").removeClass("focus")
        }, 1)
    });
    $(document).delegate(".hover-on .filter-attributes-swatches .filter-item, .filter-attributes-swatches .swatch-check", "mouseenter mouseleave", function (event) {
        var className = $(this).attr("class");
        if (event.type == "mouseenter") {
            var pos = $(this).parent(".filter-item-outer").offset();
            var height = 19;
            var width = $(this).parent(".filter-item-outer").outerWidth();
            var hOffset = $("body").css("margin-top") ? parseInt($("body").css("margin-top"), 10) : 0;
            var color = (className == "swatch-check") ? $(this).next(".filter-item").children("input").val() : $(this).children("input").val();
            $(".filters-tooltip").html(color);
            var tooltipWidth = $(".filters-tooltip").outerWidth();
            $(".filters-tooltip").css({
                top: (pos.top - height - 5 - hOffset) + "px",
                left: (pos.left - (tooltipWidth / 2) + (width / 2)) + "px"
            }).show();
            (className == "swatch-check") ? $(this).next(".filter-item").addClass("filter-item-active") : $(this).addClass("filter-item-active");
            $(this).parent(".filter-item-outer").addClass("filter-item-outer-active")
        } else {
            $(".filters-tooltip").hide();
            var checkbox = (className == "swatch-check") ? $(this).next(".filter-item").children(".filter-checkbox") : $(this).children(".filter-checkbox");
            if (!checkbox.is(":checked")) {
                (className == "swatch-check") ? $(this).next(".filter-item").removeClass("filter-item-active") : $(this).removeClass("filter-item-active");
                $(this).parent(".filter-item-outer").removeClass("filter-item-outer-active");
                $(this).parent(".filter-item-outer").children(".swatch-check").hide()
            }
        }
    });
    $(".filter-checkbox-child").change(function () {
        var parentName = $(this).data("parent");
        if (!$(this).is(":checked")) {
            $(".filter-checkbox-parent-" + parentName).attr("checked", false);
            $(".filter-checkbox-parent-" + parentName).next("label").removeClass("filter-item-label-checked")
        }
    });
    $(".filter-title").click(function () {
        $(this).next(".filter-attributes").toggle();
        if ($(this).next(".filter-attributes").is(":visible")) {
            $(this).removeClass("filter-title-closed")
        } else {
            $(this).addClass("filter-title-closed")
        }
    });
    $(".clear-filters").click(function () {
        loc = $(this).data("loc");
        clearFilters(loc);
        gridApplyFilters()
    })
}
function clearFilters(loc) {
    $(".filter-item input").attr("checked", false);
    $(".filter-item input").next("label").removeClass("filter-item-label-checked");
    $(".filter-item").removeClass("filter-checked").removeClass("filter-item-active");
    $(".filter-item-outer").removeClass("filter-item-outer-active");
    $(".filter-item-outer").children(".swatch-check").hide();
    $(".filter-attributes-category a").removeClass("filter-link-checked");
    GridCalendar.clearDate();
    gridFilters.selectedDate = null;
    gridFilters.postalCode = null;
    if (filterPrices) {
        filterPrices.priceSlider("reset")
    }
    if ($("#filter-designer-search").length) {
        $("#filter-designer-search").val("");
        filterDesigners("")
    }
}
function getSelectedFilters() {
    var params = {};
    $(".filter-item input:checked").each(function (i, ele) {
        var key = $(ele).data("param");
        if (key) {
            if (typeof (params[key]) === "undefined") {
                params[key] = []
            }
            params[key].push(encodeURIComponent($(ele).val()))
        }
    });
    if ($(".filter-attributes-category .filter-link-checked").length > 0) {
        params.categories = [$(".filter-attributes-category .filter-link-checked").data("value")]
    }
    var prices = getPriceFilterValues();
    if (prices) {
        params.priceMin = prices.min;
        params.priceMax = prices.max
    }
    delete params.price;
    if (gridFilters.postalCode) {
        params.postalCode = gridFilters.postalCode
    }
    if (gridFilters.selectedDate) {
        params.available_from = gridFilters.selectedDate
    }
    if (grid.gridType !== "similar") {
        params.orderBy = $("#order_by_select").attr("value") || "descanalyticsscore"
    }
    $(".seed").each(function (i, ele) {
        if (params.seed === undefined) {
            params.seed = []
        }
        params.seed.push(encodeURIComponent($(ele).val()))
    });
    return params
}
function gridAnalyticsQueryString(params) {
    var queryString = "?";
    if (params.available_from && gridFilters.gridDateUsed) {
        queryString += "act_type=click_dategrid"
    }
    return (queryString === "?") ? "" : queryString
}
function formatUrlAppension(params, pageNumber) {
    var untracked = ["user_id", "priceMin", "priceMax", "offset", "limit"];
    var paramMatcher = {
        available_from: "date"
    };
    if ($("#order_by_select option:selected").attr("index") === "0") {
        untracked.push("orderBy")
    }
    if (params.priceMin >= 0 && params.priceMax >= 0) {
        params.price = [params.priceMin, params.priceMax]
    }
    var p = [];
    _.each(params, function (v, k) {
        if ($.inArray(k, untracked) == -1) {
            var b = (paramMatcher[k]) ? paramMatcher[k] : k;
            var a = b + "-";
            if (k == "available_from") {
                a += v.split("/").join("-")
            } else {
                if (typeof (v) === "object") {
                    var t = [];
                    _.each(v, function (o) {
                        t.push(o)
                    });
                    a += t.join("-").toLowerCase()
                } else {
                    a += v.toLowerCase()
                }
            }
            p.push(a)
        }
    });
    if (pageNumber && pageNumber > 1) {
        p.push("page-" + pageNumber)
    }
    var urlString = p.join("--") + gridAnalyticsQueryString(params);
    return (urlString) ? urlString.replace(/ |\%20/gi, "_").replace(/\%2f/gi, "") : ""
}
function appendUrl(params, splitOn, pageNumber) {
    gridFilters.urlAppension = formatUrlAppension(params, pageNumber);
    var currPath = window.location.pathname.split(splitOn);
    var currFilters = (currPath.length > 1) ? currPath[currPath.length - 1] : null;
    var l = splitOn.length;
    if (l > 0 && splitOn[l - 1] === "/") {
        splitOn = splitOn.substr(0, l - 1)
    }
    var newUrl = (gridFilters.urlAppension) ? currPath[0] + splitOn + "/" + gridFilters.urlAppension : currPath[0] + splitOn;
    if (history.pushState && (gridFilters.urlAppension || (currFilters && currFilters !== "/"))) {
        history.pushState({
            gridReset: true
        }, "", newUrl)
    }
    _gaq.push(["_trackPageview"])
}
function filtersFromURL(url, urlSplit) {
    if (!url) {
        return null
    }
    var filterArray = [],
        filters = {},
        fCount = 0;
    if (url.search("#!") >= 0) {
        filterArray = url.split("#!").pop().split("?")[0].split("&");
        _.each(filterArray, function (f) {
            var a = f.split("=");
            if (typeof (a[1]) !== "undefined" && a[1] !== "") {
                if (!filters[a[0]]) {
                    filters[a[0]] = []
                }
                filters[a[0]] = filters[a[0]].concat(a[1].split(","));
                fCount++
            }
        });
        if (filters.available_from instanceof Array) {
            filters.date = filters.available_from[0].split("/");
            delete filters.available_from
        }
    } else {
        if (typeof (urlSplit) === "string") {
            filterArray = url.split(urlSplit).pop().split("/").pop().split("?")[0].split("--");
            _.each(filterArray, function (f) {
                var a = f.split("-");
                if (typeof (a[1]) !== "undefined" && a[1] !== "") {
                    filters[a[0]] = a.splice(1, a.length);
                    fCount++
                }
            })
        } else {
            return null
        }
    }
    return (fCount > 0) ? filters : null
}
function highlightFilters(filters) {
    if (!filters) {
        filters = {}
    }
    if (filters.available_from && typeof (GridCalendar) === "object") {
        GridCalendar.date(filters.available_from.join("/"))
    }
    if (filters.date && typeof (GridCalendar) === "object") {
        GridCalendar.date(filters.date.join("/"));
        gridFilters.selectedDate = GridCalendar.date()
    }
    if (filters.orderBy) {
        $("#order_by_select").val(filters.orderBy);
        if (!rtr_prop.mobile) {
            $("#order_by_select").coreUISelect("update")
        }
    }
    if (filterPrices && filters.price && filters.price.length === 2) {
        filterPrices.priceSlider("minPrice", filters.price[0]);
        filterPrices.priceSlider("maxPrice", filters.price[1])
    }
    if (filters.sizes) {
        _.each(filters.sizes, function (size) {
            var input = $("#options-sizes-" + size);
            input.attr("checked", "checked");
            input.parent().addClass("filter-checked")
        })
    }
    if (filters.colors) {
        _.each(filters.colors, function (color) {
            color = color.toLowerCase();
            var input = $("#options-colors-" + color);
            input.attr("checked", "checked");
            input.parent().addClass("filter-item-active");
            input.parent().siblings(".swatch-check").show();
            input.parent().parent().addClass("filter-item-outer-active")
        })
    }
    var checkInput = function (type, value) {
        value = value.replace(/\%2b|\%26|\%a9|\&|\.|\//gi, "").toLowerCase().replace(/%c3%94/gi, "Ô").replace(/\%c3/gi, "é");
        var input = $("#options-" + type + "-" + value);
        if (input.length > 0) {
            input.attr("checked", "checked");
            input.siblings("label").addClass("filter-item-label-checked")
        }
    };
    if ((filters.favorited && filters.favorited.length) || document.URL.search("hearts/search") >= 0) {
        checkInput("favorited", "my")
    }
    var theOthers = ["sizes", "price", "date", "favorited"];
    var map = {
        lengths: {
            thigh_length: "mid-thighlength",
            floor_length: "long"
        },
        embellishments: {
            outs: "cut-outs"
        },
        neckline: {
            neck: "v-neck"
        }
    };
    for (var key in filters) {
        if ($.inArray(key, theOthers) < 0 && filters[key] instanceof Array) {
            _.each(filters[key], function (value) {
                value = (map[key] && map[key][value]) ? map[key][value] : value;
                checkInput(key, value)
            })
        }
    }
    if ($.inArray("mini", filters.lengths) >= 0 && $.inArray("thigh_length", filters.lengths) >= 0 && $.inArray("knee_length", filters.lengths) >= 0 && $.inArray("tea_length", filters.lengths) >= 0) {
        checkInput("lengths", "short")
    }
    var highlightLink = function (category) {
        if (category === "clip") {
            category = "clip-on"
        }
        var forsale = (category.search("_forsale") >= 0);
        category = category.replace(/_forsale|\%2b|\%26|\%a9|\&|\.|\//gi, "").toLowerCase().replace(/%c3%94/gi, "Ô").replace(/\%c3/gi, "é") + ((forsale) ? "_forsale" : "");
        var link = $("#options-category-" + category);
        if (link.length > 0) {
            $(".filter-attributes-category a").removeClass("filter-link-checked");
            link.addClass("filter-link-checked")
        }
    };
    if (filters.categories) {
        _.each(filters.categories, function (category) {
            highlightLink(category)
        })
    }
    if (filters.productTypeHierarchies) {
        _.each(filters.productTypeHierarchies, function (category) {
            highlightLink(category)
        })
    }
    if (filters.postal_code) {
        gridFilters.postalCode = filters.postal_code
    }
    if (filters.postalCode) {
        gridFilters.postalCode = filters.postalCode
    }
    if (gridFilters.postalCode) {
        $.cookie("lastFilteredZip", gridFilters.postalCode, {
            path: "/"
        })
    }
    _.each($(".filter-cat"), function (cat) {
        var checked = $(cat).find("input:checked");
        if (checked.length > 0) {
            $(cat).find(".filter-title").removeClass("filter-title-closed");
            $(cat).find(".filter-attributes").show()
        }
    })
}
function updateCookie(cookieName, value, toDelete) {
    var cookieVal = $.cookie(cookieName);
    var cookieValArray = [];
    if (cookieVal !== null && cookieVal.length > 0) {
        cookieValArray = cookieVal.split(",")
    }
    var valIndex = $.inArray(value, cookieValArray);
    if (toDelete) {
        if (valIndex !== -1) {
            cookieValArray.splice(valIndex, 1)
        }
    } else {
        if (valIndex === -1) {
            cookieValArray.push(value)
        }
    }
    if (cookieValArray && cookieValArray.length > 0) {
        $.cookie(cookieName, cookieValArray.join(","), {
            path: "/"
        })
    }
}
$(document).delegate(".grid-thumb a", "click", function () {
    var params = {
        page: grid.pagination.page,
        style_name: $(this).attr("stylename"),
        count: grid.pagination.numDisplayed,
        action: "infer",
        results: grid.styleNames.length,
        index: $.inArray($(this).attr("stylename"), grid.styleNames),
        reqID: grid.requestId,
        url: document.URL,
        object_type: "grid"
    };
    var key = "click_" + $(this).attr("stylename");
    logItems(params, key)
});

function logGridItems(action) {
    var params = {
        page: grid.pagination.page,
        results: grid.styleNames.length,
        count: grid.pagination.numDisplayed,
        url: document.URL,
        reqID: grid.requestId,
        object_type: "grid",
        action: action
    };
    logItems(params, null)
}
function googleAnalyticsLog() {
    var key = "googleLogClickSearchBtn";
    var value = lsValueForKey(key);
    if (value) {
        lsRemoveKey(key);
        var googleAnalyticsData = JSON.parse(value);
        if (googleAnalyticsData) {
            common_ga_event_track(googleAnalyticsData[0], googleAnalyticsData[1], googleAnalyticsData[2], googleAnalyticsData[3], googleAnalyticsData[4])
        }
    }
}
var RI_REQUEST_ID;

function recentItemsRequestId() {
    if (!RI_REQUEST_ID) {
        var s4 = function () {
            return Math.floor(Math.random() * 65536).toString(16)
        };
        RI_REQUEST_ID = s4() + s4() + s4() + new Date().getTime()
    }
    return RI_REQUEST_ID
}
var logRecentItemsView = function (source) {
    this.logItems({
        action: "view_rightrail",
        styles: this.styleNames.join(","),
        numStyles: this.styleNames.length,
        source: (source || null),
    })
};
var logRecentItems = function (data, lsKey) {
    var label = this.title.toLowerCase().replace(/<span class=\"highlight\">♥<\/span>/g, "heart").replace(/ /g, "_");
    var params = {
        object_type: "right_rail",
        reqID: recentItemsRequestId(),
        numDisplay: this.numDisplayed(),
        page: this.currentPage(),
        label: label
    };
    for (var key in data) {
        params[key] = data[key]
    }
    logItems(params, lsKey)
};

function logItems(data, lsKey) {
    if (lsKey) {
        lsSetKeyValue(lsKey, JSON.stringify(data))
    } else {
        var object_type = data.object_type;
        delete data.object_type;
        if (typeof (R) !== "undefined") {
            R.log(object_type, data)
        }
    }
};