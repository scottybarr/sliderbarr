class SliderBarr
    'use strict'
	
    constructor: (userSettings)->
        @_settings = 
            el       : null
            max      : 100
            min      : 0
            value    : 25
            bar      : true
            step     : 1
            onChange : null
            onDrag   : null

        @_activeDrag    = false
        @_sliderAttr    = {}
        @_cache         = []

        $.extend(@_settings, userSettings)

        @_validateHandles()
        @_render()
        @_initSelectors()
        @_initEvents()
        @_renderHandleChanges()

    _validateHandles: ->
        @_settings.value = Math.round(@_settings.value / @_settings.step) * @_settings.step if @_settings.step isnt 1
        @_settings.value = @_settings.max if @_settings.value > @_settings.max
        @_settings.value = @_settings.min if @_settings.value < @_settings.min

    _render:->
        @_settings.el.append('<span class="bar"></span>') if @_settings.bar
        @_settings.el.append('<a href="#" class="handle"></a>')

    _initSelectors:->
        @_cache['document'] = $(document)
        @_cache['slider']   = @_settings.el
        @_cache['bar']      = @_settings.el.find('.bar') if @_settings.bar
        @_cache['handle']   = @_settings.el.find('.handle')

        @_sliderAttr =
            'width'      : @_cache['slider'].outerWidth()
            'leftOffset' : @_cache['slider'].offset().left

    _initEvents:->
        @_cache['handle'].on('keydown', @_onHandleKeydown)
        @_cache['handle'].on('mousedown', @_onHandleMousedown)
        @_cache['slider'].on('click', @_onSliderClick)
        @_cache['document'].on('mouseup', @_onMouseup)

    _changeHandle: (dir)->
        @_settings.value = @_settings.value + (if dir is 'r' then @_settings.step else -@_settings.step)
        @_validateHandles()
        @_renderHandleChanges()
        @_fireOnChange()

    _renderHandleChanges: ->
        @_cache['handle'].css('left', @_settings.value + '%')
        @_cache['bar'].css('width' : @_settings.value + '%') if @_settings.bar

    _onHandleKeydown: (e)=>
        @_changeHandle(if e.keyCode in [37, 40, 65, 83] then 'l' else 'r') if e.keyCode in [37, 38, 39, 40, 65, 68, 83, 87]

    _onHandleMousedown: (e)=>
        @_activeDrag = true
        @_cache['document'].on('mousemove', @_onHandleMousemove)
        false

    _onHandleMousemove: (e)=>
        @_setSliderValueOnDrag(e) if @_activeDrag
        
    _onSliderClick: (e)=>
        @_settings.value = @_getValFromMouseEvent(e)
        @_validateHandles()
        @_renderHandleChanges()
        @_fireOnChange()
        @_cache['handle'].focus()
        false

    _onMouseup: (e)=>
        if @_activeDrag
            @_setSliderValueOnDrag(e)
            @_fireOnChange()
            @_cache['handle'].focus()
        @_activeDrag = false

    _fireOnChange:->
        @_settings.onChange(@_settings.value) if @_settings.onChange isnt null

    _getValFromMouseEvent: (e)->
        parseInt(((e.pageX - @_sliderAttr.leftOffset) / @_sliderAttr.width) * 100, 10)

    _setSliderValueOnDrag: (e)->
        @_settings.value = @_getValFromMouseEvent(e)
        @_validateHandles()
        @_settings.onDrag(@_settings.value) if @_settings.onDrag isnt null
        @_renderHandleChanges()

if typeof define is "function" && define.amd then define("SliderBarr", [], -> SliderBarr) else window.SliderBarr = SliderBarr