'use strict'

describe('Sliderbarr', ->

    slider     = null
    testValue  = 58
    $slider    = $('#slider')
    $sliderTwo = $('#slider-two')

    beforeEach(->
        slider = new SliderBarr(
            el:     $slider
            value:  50
            step:   1
        )
    )

    afterEach(->
        $('#slider-two').empty()
    )

    createSpyOnSliderBarrProto = (method) ->
        spyOn(SliderBarr.prototype, method).andCallFake(->)


    createFakeGetValFromMouseEvent = ->
        spyOn(slider, '_getValFromMouseEvent').andCallFake(-> testValue)


    it('can construct', ->
        fakeValidateHandles     = createSpyOnSliderBarrProto('_validateHandles')
        fakeRender              = createSpyOnSliderBarrProto('_render')
        fakeRenderLabels        = createSpyOnSliderBarrProto('_renderEdgeLabels')
        fakeInitSelectors       = createSpyOnSliderBarrProto('_initSelectors')
        fakeInitEvents          = createSpyOnSliderBarrProto('_initEvents')
        fakeRenderHandleChanges = createSpyOnSliderBarrProto('_renderHandleChanges')
        slide                   = new SliderBarr(el: $slider)

        expect(slide._settings.el).toEqual($slider)
        expect(slide._settings.max).toBe(100)
        expect(slide._settings.min).toBe(0)
        expect(slide._settings.value).toBe(25)
        expect(slide._settings.bar).toBeTruthy()
        expect(slide._settings.labels).toBeFalsy()
        expect(slide._settings.step).toBe(1)
        expect(slide._settings.onChange).toBeNull()
        expect(slide._settings.onDrag).toBeNull()

        expect(slide._activeDrag).toBeFalsy()
        expect(slide._sliderAttr).toEqual({})
        expect(slide._cache).toEqual([])

        expect(fakeValidateHandles).toHaveBeenCalled()
        expect(fakeRender).toHaveBeenCalled()
        expect(fakeRenderLabels).not.toHaveBeenCalled()
        expect(fakeInitSelectors).toHaveBeenCalled()
        expect(fakeInitEvents).toHaveBeenCalled()
        expect(fakeRenderHandleChanges).toHaveBeenCalled()

    )

    describe('Rendering', ->
        it('can render', ->
            expect($sliderTwo.find('div').length).toBe(0)

            slide = new SliderBarr(el: $('#slider-two'))
            expect($('#slider-two').find('div').length).not.toBe(0)
        )

        it('can render edge labels', ->
            expect($sliderTwo.find('div').length).toBe(0)
            expect($sliderTwo.find('.label').length).toBe(0)

            slide = new SliderBarr(el: $('#slider-two'), labels: true)
            expect($('#slider-two').find('div').length).not.toBe(0)
            expect($('#slider-two').find('.label').length).not.toBe(0)
        )
    )

    describe('Selectors', ->
        it('can initialise jquery selectors', ->
            slide = new SliderBarr(el: $sliderTwo, labels: true)
            expect($(document)).toEqual(slide._cache.document)
            expect($sliderTwo).toEqual(slide._cache.slider)
            expect($sliderTwo.find('.bar')).toEqual(slide._cache.bar)
            expect($sliderTwo.find('.handle')).toEqual(slide._cache.handle)
            expect($sliderTwo.find('.current')).toEqual(slide._cache.current)
        )
    )

    describe('Get and Set Values', ->
        it('can change handle', ->
            fakeValidateHandles     = spyOn(slider, '_validateHandles').andCallFake(->)
            fakeRenderHandleChanges = spyOn(slider, '_renderHandleChanges').andCallFake(->)
            fakeFireOnChange        = spyOn(slider, '_fireOnChange').andCallFake(->)
            val  = 22
            step = 1
            slider._settings.step  = step
            slider._settings.value = val

            slider._changeHandle('r')
            expect(slider._settings.value).toBe(val + step)
            expect(fakeValidateHandles).toHaveBeenCalled()
            expect(fakeRenderHandleChanges).toHaveBeenCalled()
            expect(fakeFireOnChange).toHaveBeenCalled()

            slider._settings.value = val
            slider._changeHandle('l')
            expect(slider._settings.value).toBe(val - step)
        )

        it('can validate value', ->
            testValue = 50
            expect(slider._validateValue(testValue)).toBe(50)
            testValue = 50.33333
            expect(slider._validateValue(testValue)).toBe(50)

            slider._settings.step = 0.25
            testValue = 23.75
            expect(slider._validateValue(testValue)).toBe(23.75)
            testValue = 23.7786534
            expect(slider._validateValue(testValue)).toBe(23.78)
        )

        it('can validate handles', ->
            val = 9e9
            slider._settings.value = val
            slider._validateHandles()
            expect(slider._settings.value).toBe(slider._settings.max)

            val = -9e9
            slider._settings.value = val
            slider._validateHandles()
            expect(slider._settings.value).toBe(slider._settings.min)

            val = 27
            slider._settings.value = val
            slider._validateHandles()
            expect(slider._settings.value).toBe(val)
        )

        it('can set slider value on drag', ->
            testValue                = 56
            fakeGetValFromMouseEvent = spyOn(slider, '_getValFromMouseEvent').andCallFake(-> testValue)
            fakeValidateHandles      = spyOn(slider, '_validateHandles').andCallFake(->)
            seenDrag                 = false

            slider._settings.onDrag = -> seenDrag = true

            slider._setSliderValueOnDrag({})
            expect(slider._settings.value).toBe(testValue)
            expect(fakeValidateHandles).toHaveBeenCalled()
            expect(fakeGetValFromMouseEvent).toHaveBeenCalled()
            expect(seenDrag).toBeTruthy()
        )

        it('can get value', ->
            slider._settings.value = 78
            expect(slider.getValue()).toBe(78)
        )

        it('can set value', ->
            testValue  = 27
            fireEvents = false
            fakeValidateHandles = spyOn(slider, '_validateHandles').andCallFake(->)
            fakeRenderHandles   = spyOn(slider, '_renderHandleChanges').andCallFake(->)
            fakeFireOnChange    = spyOn(slider, '_fireOnChange').andCallFake(->)

            slider.setValue(testValue, fireEvents)
            expect(slider._settings.value).toBe(testValue)
            expect(fakeValidateHandles).toHaveBeenCalled()
            expect(fakeRenderHandles).toHaveBeenCalled()
            expect(fakeFireOnChange).not.toHaveBeenCalled()
        )

        it('can set value but not fire events', ->
            testValue  = 29
            fireEvents = true
            fakeValidateHandles = spyOn(slider, '_validateHandles').andCallFake(->)
            fakeRenderHandles   = spyOn(slider, '_renderHandleChanges').andCallFake(->)
            fakeFireOnChange    = spyOn(slider, '_fireOnChange').andCallFake(->)

            slider.setValue(testValue, fireEvents)
            expect(slider._settings.value).toBe(testValue)

            expect(fakeValidateHandles).toHaveBeenCalled()
            expect(fakeRenderHandles).toHaveBeenCalled()
            expect(fakeFireOnChange).toHaveBeenCalled()
        )
    )

    describe('Events', ->

    )
)