(function($) {

    /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
    */

    var slider = null;

    module('sliderbarr', {
        setup: function() {
            slider = new SliderBarr({
                'el'    : $('.slider'),
                'value' : 50,
                'step'  : 1
            });
        }
    });

    test('constructor settings', function() {
        // Not a bad test to run on collection methods.
        notStrictEqual(slider._settings.el, $('.slider'));
        strictEqual(slider._settings.max, 100);
        strictEqual(slider._settings.min, 0);
        strictEqual(slider._settings.value, 50);
        strictEqual(slider._settings.bar, true);
        strictEqual(slider._settings.step, 1);
        strictEqual(slider._settings.onChange, null);
        strictEqual(slider._settings.onDrag, null);
        strictEqual(slider._activeDrag, false);
    });

}(jQuery));
