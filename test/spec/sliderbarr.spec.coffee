'use strict'

createSpyOnSliderBarrProto = (method) ->
    spyOn(SliderBarr.prototype, method).andCallFake(->)

createFakeSpyOnSlider = (method) ->
    spyOn(slider, method).andCallFake(->)

createFakeGetValFromMouseEvent = ->
    spyOn(slider, '_getValFromMouseEvent').andCallFake(-> testValue)

createFakeValidateHandles = ->
    createFakeSpyOnSlider('_validateHandles')

createFakeRenderHandles = ->
    createFakeSpyOnSlider('_renderHandleChanges')

createFakeFireOnChange = ->
    createFakeSpyOnSlider('_fireOnChange')

createFakeHandleKeydown = ->
    createFakeSpyOnSlider('_onHandleKeydown')

createFakeHandleMousemove = ->
    createFakeSpyOnSlider('_onHandleMousemove')

createFakeHandleMousedown = ->
    createFakeSpyOnSlider('_onHandleMousedown')

createFakeSliderClick = ->
    createFakeSpyOnSlider('_onSliderClick')

createFakeMouseUp = ->
    createFakeSpyOnSlider('_onMouseup')

createFakeSliderSetOnDrag = ->
    createFakeSpyOnSlider('_setSliderValueOnDrag')

slider     = null
testValue  = 58
$slider    = $('#slider')
$sliderTwo = $('#slider-two')

describe('Sliderbarr', ->
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
)