(function() {

    describe('Sliderbarr', function() {
        var slider = null;

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

            it ('can change handle', function() {

            });

            it ('can handle on keydown', function() {

            });

            it ('can handle on mousedown', function() {

            });

            it ('can handle on mouse move', function() {

            });

            it ('can react to slider click', function() {

            });

            it ('can handle mouseup', function() {

            });

            it ('can fire on change', function() {

            });

        });

        describe('Set and Get Values', function() {

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

            });

            it ('can get value from mouse event', function() {

            });

            it ('can set slider value on drag', function() {

            });

            it ('can get value', function() {
                slider._settings.value = 78;
                expect(slider.getValue()).toBe(78);
            });

            it ('can set value', function() {
                var testValue = 27;
                var fireEvents = false;

                var fakeValidateHandles = spyOn(slider, '_validateHandles').andCallFake(function() {});
                var fakeRenderHandles = spyOn(slider, '_renderHandleChanges').andCallFake(function() {});
                var fakeFireOnChange = spyOn(slider, '_fireOnChange').andCallFake(function() {});

                slider.setValue(testValue, fireEvents);
                expect(slider._settings.value).toBe(testValue);

                expect(fakeValidateHandles).toHaveBeenCalled();
                expect(fakeRenderHandles).toHaveBeenCalled();
                expect(fakeFireOnChange).not.toHaveBeenCalled();
            });

            it ('can set value but not fire events', function() {
                var testValue = 29;
                var fireEvents = true;

                var fakeValidateHandles = spyOn(slider, '_validateHandles').andCallFake(function() {});
                var fakeRenderHandles = spyOn(slider, '_renderHandleChanges').andCallFake(function() {});
                var fakeFireOnChange = spyOn(slider, '_fireOnChange').andCallFake(function() {});

                slider.setValue(testValue, fireEvents);
                expect(slider._settings.value).toBe(testValue);

                expect(fakeValidateHandles).toHaveBeenCalled();
                expect(fakeRenderHandles).toHaveBeenCalled();
                expect(fakeFireOnChange).toHaveBeenCalled();
            });

        });

    });

})();