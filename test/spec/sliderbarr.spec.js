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

            expect(fakeValidateHandles).toHaveBeenCalled();
            expect(fakeRender).toHaveBeenCalled();
            expect(fakeRenderLabels).not.toHaveBeenCalled();
            expect(fakeInitSelectors).toHaveBeenCalled();
            expect(fakeInitEvents).toHaveBeenCalled();
            expect(fakeRenderHandleChanges).toHaveBeenCalled();

        });

        describe('Rendering', function() {

            it ('can render', function() {

            });

            it ('can render edge labels', function() {

            });

        });

        describe('Selectors', function() {

            it ('can initialise jquery selectors', function() {

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

            it ('can validate handles', function() {

            });

            it ('can get value from mouse event', function() {

            });

            it ('can set slider value on drag', function() {

            });

            it ('can get value', function() {

            });

            it ('can set value', function() {

            });

        });

    });

})();