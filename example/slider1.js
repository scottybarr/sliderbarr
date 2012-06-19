(function() {
  var onChange, onDrag, slider,
    _this = this;

  onChange = function(val) {
    return console.log('onChange', val);
  };

  onDrag = function(val) {
    return console.log('onDrag', val);
  };

  slider = new SliderBarr({
    el: $('.slider'),
    value: 50,
    step: 1,
    onChange: onChange,
    onDrag: onDrag
  });

}).call(this);
