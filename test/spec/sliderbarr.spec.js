(function() {

    describe('Sliderbarr', function() {
        var slider = null;
        var testValue = 56;

        beforeEach(function() {
            slider = new SliderBarr({
                el: $('#slider'),
                value: 50,
                step: 1
            });
        });

        afterEach(function() {
            $('#slider-two').empty();
        });

        it ('can construct', function() {
            var fakeValidateHandles = spyOn(SliderBarr.prototype, '_validateHandles').andCallFake(function() {});
            var fakeRender = spyOn(SliderBarr.prototype, '_render').andCallFake(function() {});
            var fakeRenderLabels = spyOn(SliderBarr.prototype, '_renderEdgeLabels').andCallFake(function() {});
            var fakeInitSelectors = spyOn(SliderBarr.prototype, '_initSelectors').andCallFake(function() {});
            var fakeInitEvents = spyOn(SliderBarr.prototype, '_initEvents').andCallFake(function() {});
            var fakeRenderHandleChanges = spyOn(SliderBarr.prototype, '_renderHandleChanges').andCallFake(function() {});

            var slide = new SliderBarr({el: $('#slider')});

            expect(slide._settings.el).toEqual($('#slider'));
            expect(slide._settings.max).toBe(100);
            expect(slide._settings.min).toBe(0);
            expect(slide._settings.value).toBe(25);
            expect(slide._settings.bar).toBeTruthy();
            expect(slide._settings.labels).toBeFalsy();
            expect(slide._settings.step).toBe(1);
            expect(slide._settings.onChange).toBeNull();
            expect(slide._settings.onDrag).toBeNull();

            expect(slide._activeDrag).toBeFalsy();
            expect(slide._sliderAttr).toEqual({});
            expect(slide._cache).toEqual([]);

            expect(fakeValidateHandles).toHaveBeenCalled();
            expect(fakeRender).toHaveBeenCalled();
            expect(fakeRenderLabels).not.toHaveBeenCalled();
            expect(fakeInitSelectors).toHaveBeenCalled();
            expect(fakeInitEvents).toHaveBeenCalled();
            expect(fakeRenderHandleChanges).toHaveBeenCalled();

        });

        describe('Rendering', function() {

            it ('can render', function() {
                // Ensure there is no slider intialised first
                expect($('#slider-two').find('div').length).toBe(0);

                // Initialise slider
                var slide = new SliderBarr({el: $('#slider-two')});

                // Ensure the slider has new DOM elements
                expect($('#slider-two').find('div').length).not.toBe(0);
            });

            it ('can render edge labels', function() {
                // Ensure there is no slider intialised first
                var el = $('#slider-two');
                expect(el.find('div').length).toBe(0);
                expect(el.find('.label').length).toBe(0);

                // Initialise slider
                var slide = new SliderBarr({el: el, labels: true});

                // Ensure the slider has new DOM elements
                expect(el.find('div').length).not.toBe(0);
                expect(el.find('.label').length).not.toBe(0);
            });

        });

        describe('Selectors', function() {

            it ('can initialise jquery selectors', function() {
                $el = $('#slider-two');
                var slide = new SliderBarr({el: $el, labels: true});
                expect($(document)).toEqual(slide._cache.document);
                expect($el).toEqual(slide._cache.slider);
                expect($el.find('.bar')).toEqual(slide._cache.bar);
                expect($el.find('.handle')).toEqual(slide._cache.handle);
                expect($el.find('.current')).toEqual(slide._cache.current);
            });

        });

        describe('Events', function() {

            it ('can initialise events', function() {

            });

            it ('can handle on keydown', function() {
                var e = {
                    keyCode: 37
                };

                var spyChangeHandle = spyOn(slider, '_changeHandle');
                slider._onHandleKeydown(e);
                expect(spyChangeHandle).toHaveBeenCalledWith('l');

                spyChangeHandle.reset();

                e.keyCode = 38;
                slider._onHandleKeydown(e);
                expect(spyChangeHandle).toHaveBeenCalledWith('r');

                spyChangeHandle.reset();

                e.keyCode = 0;
                slider._onHandleKeydown(e);
                expect(spyChangeHandle).not.toHaveBeenCalled();
            });

            it ('can handle on mousedown', function() {

            });

            it ('can handle on mouse move', function() {
                var e = {};

                fakeSetSliderValueOnDrag = createFakeSliderSetOnDrag();

                slider._activeDrag = false;
                slider._onHandleMousemove(e);
                expect(fakeSetSliderValueOnDrag).not.toHaveBeenCalled();

                fakeSetSliderValueOnDrag.reset();

                slider._activeDrag = true;
                slider._onHandleMousemove(e);
                expect(fakeSetSliderValueOnDrag).toHaveBeenCalled();
            });

            it ('can react to slider click', function() {

            });

            it ('can handle mouseup', function() {

            });

            it ('can fire on change', function() {

            });

        });

        describe('Set and Get Values', function() {

            it ('can change handle', function() {
                var fakeValidateHandles = createFakeValidateHandles();
                var fakeRenderHandleChanges = createFakeRenderHandles();
                var fakeFireOnChange = createFakeFireOnChange();

                var val = 22;
                var step = 1;
                slider._settings.step = step;
                slider._settings.value = val;

                slider._changeHandle('r');
                expect(slider._settings.value).toBe(val + step);
                expect(fakeValidateHandles).toHaveBeenCalled();
                expect(fakeRenderHandleChanges).toHaveBeenCalled();
                expect(fakeFireOnChange).toHaveBeenCalled();

                slider._settings.value = val;

                slider._changeHandle('l');
                expect(slider._settings.value).toBe(val - step);
            });

            it ('can validate value', function() {
                var testValue = 50;
                expect(slider._validateValue(testValue)).toBe(50);
                testValue = 50.33333;
                expect(slider._validateValue(testValue)).toBe(50);

                slider._settings.step = 0.25;
                testValue = 23.75;
                expect(slider._validateValue(testValue)).toBe(23.75);
                testValue = 23.7786534;
                expect(slider._validateValue(testValue)).toBe(23.78);
            });

            it ('can validate handles', function() {
                var val = 9e9;
                slider._settings.value = val;
                slider._validateHandles();
                expect(slider._settings.value).toBe(slider._settings.max);

                val = -9e9;
                slider._settings.value = val;
                slider._validateHandles();
                expect(slider._settings.value).toBe(slider._settings.min);

                val = 27;
                slider._settings.value = val;
                slider._validateHandles();
                expect(slider._settings.value).toBe(val);
            });

            it ('can get value from mouse event', function() {
                var e = {
                    pageX: 500
                };

                slider._sliderAttr.width = 100;
                expect(slider._getValFromMouseEvent(e)).toBe(500);
            });

            it ('can set slider value on drag', function() {
                var testValue = 56;
                var fakeGetValFromMouseEvent = createFakeGetValFromMouseEvent();
                var fakeValidateHandles = createFakeValidateHandles();
                var seenDrag = false;

                slider._settings.onDrag = function() { seenDrag = true; };

                slider._setSliderValueOnDrag({});
                expect(slider._settings.value).toBe(testValue);
                expect(fakeValidateHandles).toHaveBeenCalled();
                expect(fakeGetValFromMouseEvent).toHaveBeenCalled();
                expect(seenDrag).toBeTruthy();
            });

            it ('can get value', function() {
                slider._settings.value = 78;
                expect(slider.getValue()).toBe(78);
            });

            it ('can set value', function() {
                var testValue = 27;
                var fireEvents = false;

                var fakeValidateHandles = createFakeValidateHandles();
                var fakeRenderHandles = createFakeRenderHandles();
                var fakeFireOnChange = createFakeFireOnChange();

                slider.setValue(testValue, fireEvents);
                expect(slider._settings.value).toBe(testValue);

                expect(fakeValidateHandles).toHaveBeenCalled();
                expect(fakeRenderHandles).toHaveBeenCalled();
                expect(fakeFireOnChange).not.toHaveBeenCalled();
            });

            it ('can set value but not fire events', function() {
                var testValue = 29;
                var fireEvents = true;

                var fakeValidateHandles = createFakeValidateHandles();
                var fakeRenderHandles = createFakeRenderHandles();
                var fakeFireOnChange = createFakeFireOnChange();

                slider.setValue(testValue, fireEvents);
                expect(slider._settings.value).toBe(testValue);

                expect(fakeValidateHandles).toHaveBeenCalled();
                expect(fakeRenderHandles).toHaveBeenCalled();
                expect(fakeFireOnChange).toHaveBeenCalled();
            });

        });

        function createFakeGetValFromMouseEvent() {
            return spyOn(slider, '_getValFromMouseEvent').andCallFake(function() {
                return testValue;
            });
        };

        function createFakeValidateHandles() {
            return spyOn(slider, '_validateHandles').andCallFake(function() {});
        };

        function createFakeRenderHandles() {
            return spyOn(slider, '_renderHandleChanges').andCallFake(function() {});
        };

        function createFakeFireOnChange() {
            return spyOn(slider, '_fireOnChange').andCallFake(function() {});
        };

        function createFakeHandleKeydown() {
            return spyOn(slider, '_onHandleKeydown').andCallFake(function() {});
        };

        function createFakeHandleMousedown() {
            return spyOn(slider, '_onHandleMousedown').andCallFake(function() {});
        };

        function createFakeSliderClick() {
            return spyOn(slider, '_onSliderClick').andCallFake(function() {});
        };

        function createFakeMouseUp() {
            return spyOn(slider, '_onMouseup').andCallFake(function() {});
        };

        function createFakeSliderSetOnDrag() {
            return spyOn(slider, '_setSliderValueOnDrag').andCallFake(function() {});
        };

    });

})();