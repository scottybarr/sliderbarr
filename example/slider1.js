(function () {

    new SliderBarr({
        el    : $('#slider'),
        value : 15,
        step  : 1
    });

    new SliderBarr({
        el    : $('#sliderTwo'),
        value : 75,
        step  : 10
    });

    var sliderThree = new SliderBarr({
        el     : $('#sliderThree'),
        value  : 50,
        step   : 1,
        labels : true
    });

}).call(this);
