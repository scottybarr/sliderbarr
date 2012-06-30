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

  var renderStub            = sinon.stub(SliderBarr.prototype, '_render'),
      renderEdgeStub        = sinon.stub(SliderBarr.prototype, '_renderEdgeLabels'),
      initSelectorsStub     = sinon.stub(SliderBarr.prototype, '_initSelectors'),
      initEventsStub        = sinon.stub(SliderBarr.prototype, '_initEvents'),
      renderHandleStub      = sinon.stub(SliderBarr.prototype, '_renderHandleChanges'),
      validateHandlesStub   = sinon.stub(SliderBarr.prototype, '_validateHandles'),
      onChangeStub          = sinon.stub(SliderBarr.prototype, '_fireOnChange'),
      getValFromMouseStub   = sinon.stub(SliderBarr.prototype, '_getValFromMouseEvent', function(a) {
        return 10;
      });

  module('sliderbarr', {
    setup: function() {
      slider = new SliderBarr({
        'el'    : $('.slider'),
        'value' : 50,
        'step'  : 1
      });
    },
    tearDown: function () {
      renderStub.restore();
      renderEdgeStub.restore();
      initSelectorsStub.restore();
      initEventsStub.restore();
      renderHandleStub.restore();
      validateHandlesStub.restore();
    }
  });

  test('can construct', function() {

    var slider = new SliderBarr({
      'el'    : $('.slider'),
      'value' : 50,
      'step'  : 1
    });

    strictEqual(slider._settings.el[0], $('.slider')[0]);
    strictEqual(slider._settings.max, 100);
    strictEqual(slider._settings.min, 0);
    strictEqual(slider._settings.value, 50);
    strictEqual(slider._settings.bar, true);
    strictEqual(slider._settings.labels, false);
    strictEqual(slider._settings.step, 1);
    strictEqual(slider._settings.onChange, null);
    strictEqual(slider._settings.onDrag, null);
    strictEqual(slider._activeDrag, false);
    deepEqual(slider._cache, []);
    deepEqual(slider._sliderAttr, {});

    ok(renderStub.called);
    ok(!renderEdgeStub.called);
    ok(initSelectorsStub.called);
    ok(initEventsStub.called);
    ok(renderHandleStub.called);
  });

  test('can validate handles', function() {
    slider._validateHandles.restore();
    slider.setValue(68);

    strictEqual(slider.getValue(), 68);

    var sliderTwo = new SliderBarr({
        'el'    : $('.slider'),
        'value' : 23,
        'step'  : 10
      });

    strictEqual(sliderTwo.getValue(), 20);
    sliderTwo.setValue(178);
    strictEqual(sliderTwo.getValue(), 100);
    sliderTwo.setValue(-150);
    strictEqual(sliderTwo.getValue(), 0);
  });

  test('can render', function() {
    expect(0);
  });

  test('can render edge labels', function() {
    expect(0);
  });

  test('can initialise jquery selectors', function() {
    expect(0);
  });

  test('can initialise events', function() {
    expect(0);
  });

  test('can hange handle', function() {
    strictEqual(slider.getValue(), 50);

    var dir = 'r';
    slider._changeHandle(dir);

    strictEqual(slider.getValue(), 51);

    dir = 'l';
    slider._changeHandle(dir);
    strictEqual(slider.getValue(), 50);
    slider._changeHandle(dir);
    strictEqual(slider.getValue(), 49);
  });

  test('can handle on keydown', function() {
    var myDir = null;

    var changeStub = sinon.stub(SliderBarr.prototype, '_changeHandle', function(val) {
      myDir = val;
    });

    var e = {};

    e['keyCode'] = 37;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'l');

    e['keyCode'] = 40;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'l');

    e['keyCode'] = 65;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'l');

    e['keyCode'] = 83;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'l');

    e['keyCode'] = 38;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'r');

    e['keyCode'] = 39;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'r');
    
    e['keyCode'] = 68;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'r');

    e['keyCode'] = 87;
    slider._onHandleKeydown(e);
    strictEqual(myDir, 'r');
  });

  test('can handle mousedown', function() {
    expect(0);
  });

  test('can handle mouse move', function() {
    var setSliderValStub = sinon.stub(SliderBarr.prototype, '_setSliderValueOnDrag');

    slider._onHandleMousemove({});

    ok(!setSliderValStub.called);

    slider._activeDrag = true;

    slider._onHandleMousemove({});

    ok(setSliderValStub.called);

  });

  test('can perform on slider click', function() {
    slider._cache.handle = {
      'focus' : function() {}
    };  
    slider._onSliderClick({});
    ok (getValFromMouseStub.called);
    ok (validateHandlesStub.called);
    ok (renderHandleStub.called);
    ok (onChangeStub.called);
  });

  test('can handle mouseup', function() {
    expect(0);
  });

  test('can fire on change', function() {
    var fakeVal = null;
    var changeFunc = function(val) {
      fakeVal = val;
    };

    slider._fireOnChange();
    strictEqual(fakeVal, null);
  });

  test('can get value from mouse event', function() {
    expect(0);
  });

  test('can set slider value on drag', function() {
    slider._setSliderValueOnDrag({});
    ok (getValFromMouseStub.called);
    ok (validateHandlesStub.called);
    ok (renderHandleStub.called);
  });

}(jQuery));
