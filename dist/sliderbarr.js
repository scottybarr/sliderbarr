(function() {
  var SliderBarr,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SliderBarr = (function() {
    'use strict';    function SliderBarr(userSettings) {
      this._getValFromMouseEvent = __bind(this._getValFromMouseEvent, this);
      this._onMouseup = __bind(this._onMouseup, this);
      this._onSliderClick = __bind(this._onSliderClick, this);
      this._onHandleMousemove = __bind(this._onHandleMousemove, this);
      this._onHandleMousedown = __bind(this._onHandleMousedown, this);
      this._onHandleKeydown = __bind(this._onHandleKeydown, this);
      var k;

      this._settings = {
        el: null,
        max: 100,
        min: 0,
        value: 25,
        bar: true,
        labels: false,
        step: 1,
        onChange: null,
        onDrag: null
      };
      this._activeDrag = false;
      this._cache = {};
      for (k in this._settings) {
        if (userSettings.hasOwnProperty(k)) {
          this._settings[k] = userSettings[k];
        }
      }
      this._settings.el = this._getSliderElement();
      this._validateHandles();
      this._render();
      if (this._settings.labels) {
        this._renderEdgeLabels();
      }
      this._initSelectors();
      this._initEvents();
      this._renderHandleChanges();
    }

    SliderBarr.prototype._getSliderElement = function() {
      if (toString.call(this._settings.el) === '[object String]') {
        return document.getElementById(this._settings.el);
      }
      return this._settings.el.get(0);
    };

    SliderBarr.prototype._initSelectors = function() {
      return this._cache = {
        'slider': this._settings.el,
        'bar': this._settings.bar ? this._settings.el.getElementsByClassName('bar')[0] : void 0,
        'handle': this._settings.el.getElementsByClassName('handle'),
        'current': this._settings.labels ? this._settings.el.getElementsByClassName('current')[0] : void 0,
        'width': this._settings.el.offsetWidth
      };
    };

    SliderBarr.prototype._initEvents = function() {
      var h, _i, _len, _ref;

      _ref = this._cache.handle;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        h = _ref[_i];
        h.addEventListener('keydown', this._onHandleKeydown);
        h.addEventListener('mousedown', this._onHandleMousedown);
      }
      this._cache.slider.addEventListener('click', this._onSliderClick);
      return document.addEventListener('mouseup', this._onMouseup);
    };

    SliderBarr.prototype._changeHandle = function(dir) {
      this._settings.value = this._settings.value + (dir === 'r' ? this._settings.step : -this._settings.step);
      this._validateHandles();
      this._renderHandleChanges();
      return this._fireOnChange();
    };

    SliderBarr.prototype._validateHandles = function() {
      if (this._settings.step !== 1) {
        this._settings.value = Math.round(this._settings.value / this._settings.step) * this._settings.step;
      }
      this._settings.value = this._validateValue(this._settings.value);
      if (this._settings.value > this._settings.max) {
        this._settings.value = this._settings.max;
      }
      if (this._settings.value < this._settings.min) {
        return this._settings.value = this._settings.min;
      }
    };

    SliderBarr.prototype._render = function() {
      if (this._settings.labels) {
        this._settings.el.innerHTML += '<span class="label min"></span>\n<span class="label current"></span>\n<span class="label max"></span>\'';
      }
      if (this._settings.bar) {
        this._settings.el.innerHTML += '<div class="bar"></div>';
      }
      return this._settings.el.innerHTML += '<a href="#" class="handle"></a>';
    };

    SliderBarr.prototype._renderEdgeLabels = function() {
      this._settings.el.getElementsByClassName('min')[0].innerHTML = this._settings.min;
      return this._settings.el.getElementsByClassName('max')[0].innerHTML = this._settings.max;
    };

    SliderBarr.prototype._renderHandleChanges = function() {
      var h, _i, _len, _ref;

      _ref = this._cache.handle;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        h = _ref[_i];
        h.style.left = "" + this._settings.value + "%";
      }
      if (this._settings.bar) {
        this._cache.bar.style.width = "" + this._settings.value + "%";
      }
      if (this._settings.labels) {
        return this._cache.current.innerHTML = this._settings.value;
      }
    };

    SliderBarr.prototype._onHandleKeydown = function(e) {
      var _ref, _ref1;

      if ((_ref = e.keyCode) === 37 || _ref === 38 || _ref === 39 || _ref === 40 || _ref === 65 || _ref === 68 || _ref === 83 || _ref === 87) {
        return this._changeHandle((_ref1 = e.keyCode) === 37 || _ref1 === 40 || _ref1 === 65 || _ref1 === 83 ? 'l' : 'r');
      }
    };

    SliderBarr.prototype._onHandleMousedown = function(e) {
      this._activeDrag = true;
      document.addEventListener('mousemove', this._onHandleMousemove);
      return false;
    };

    SliderBarr.prototype._onHandleMousemove = function(e) {
      if (this._activeDrag) {
        return this._setSliderValueOnDrag(e);
      }
    };

    SliderBarr.prototype._onSliderClick = function(e) {
      this._settings.value = this._getValFromMouseEvent(e);
      this._validateHandles();
      this._renderHandleChanges();
      this._fireOnChange();
      this._cache.handle[0].focus();
      return false;
    };

    SliderBarr.prototype._onMouseup = function(e) {
      if (this._activeDrag) {
        this._setSliderValueOnDrag(e);
        this._fireOnChange();
        this._cache.handle[0].focus();
      }
      this._activeDrag = false;
      return this;
    };

    SliderBarr.prototype._fireOnChange = function() {
      if (this._settings.onChange != null) {
        return this._settings.onChange(this._settings.value);
      }
    };

    SliderBarr.prototype._getValFromMouseEvent = function(e) {
      return this._validateValue(((e.pageX - this._cache.slider.offsetLeft) / this._cache.width) * 100);
    };

    SliderBarr.prototype._setSliderValueOnDrag = function(e) {
      this._settings.value = this._getValFromMouseEvent(e);
      this._validateHandles();
      if (this._settings.onDrag != null) {
        this._settings.onDrag(this._settings.value);
      }
      return this._renderHandleChanges();
    };

    SliderBarr.prototype._validateValue = function(val) {
      var int, places, _ref;

      if (this._settings.step % 1 === 0) {
        return parseInt(val, 10);
      }
      _ref = (this._settings.step + "").split("."), int = _ref[0], places = _ref[1];
      return parseFloat(val.toFixed(places.length));
    };

    SliderBarr.prototype.getValue = function() {
      return this._settings.value;
    };

    SliderBarr.prototype.setValue = function(value, fireEvents) {
      if (fireEvents == null) {
        fireEvents = true;
      }
      this._settings.value = value;
      this._validateHandles();
      this._renderHandleChanges();
      if (fireEvents) {
        return this._fireOnChange();
      }
    };

    return SliderBarr;

  })();

  if (typeof define === "function" && define.amd) {
    define("SliderBarr", [], function() {
      return SliderBarr;
    });
  } else {
    window.SliderBarr = SliderBarr;
  }

}).call(this);
