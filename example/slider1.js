(function() {
  var onChange, onDrag, slider, sliderTwo, onDragTwo, onChangeTwo,
    _this = this;

  onChange = function(val) {
    $('.sliderVal').text(val + '%');
  };

  onDrag = function(val) {
    $('.sliderVal').text(val + '%');
  };

  onChangeTwo = function(val) {
    $('.sliderValTwo').text(val + '%');
  };

  onDragTwo = function(val) {
    $('.sliderValTwo').text(val + '%');
  };

  slider = new SliderBarr({
    el: $('#slider'),
    value: 50,
    step: 1,
    onChange: onChange,
    onDrag: onDrag
  });

  sliderTwo = new SliderBarr({
    el: $('#sliderTwo'),
    value: 50,
    step: 10,
    onChange: onChangeTwo,
    onDrag: onDragTwo
  });

}).call(this);
