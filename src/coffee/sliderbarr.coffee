class SliderBarr
    'use strict'

    constructor: (userSettings) ->
        @_settings =
            el       : null
            max      : 100
            min      : 0
            value    : 25
            bar      : true
            labels   : false
            step     : 1
            onChange : null
            onDrag   : null

        @_activeDrag = false
        @_cache      = {}

        for k of @_settings
            @_settings[k] = userSettings[k] if userSettings.hasOwnProperty(k)

        @_settings.el = @_getSliderElement()
        @_validateHandles()
        @_render()
        @_renderEdgeLabels() if @_settings.labels
        @_initSelectors()
        @_initEvents()
        @_renderHandleChanges()

    _getSliderElement: ->
        if toString.call(@_settings.el) is '[object String]'
            return document.getElementById(@_settings.el)
        return @_settings.el.get(0)

    _initSelectors: ->
        @_cache = {
            'slider'   : @_settings.el
            'bar'      : @_settings.el.getElementsByClassName('bar')[0] if @_settings.bar
            'handle'   : @_settings.el.getElementsByClassName('handle')
            'current'  : @_settings.el.getElementsByClassName('current')[0] if @_settings.labels
            'width'    : @_settings.el.offsetWidth
        }

    _initEvents: ->
        for h in @_cache.handle
            h.addEventListener('keydown', @_onHandleKeydown)
            h.addEventListener('mousedown', @_onHandleMousedown)
        @_cache.slider.addEventListener('click', @_onSliderClick)
        document.addEventListener('mouseup', @_onMouseup)

    _changeHandle: (dir) ->
        @_settings.value = @_settings.value + (if dir is 'r' then @_settings.step else -@_settings.step)
        @_validateHandles()
        @_renderHandleChanges()
        @_fireOnChange()

    _validateHandles: ->
        @_settings.value = Math.round(@_settings.value / @_settings.step) * @_settings.step if @_settings.step isnt 1
        @_settings.value = @_validateValue(@_settings.value)
        @_settings.value = @_settings.max if @_settings.value > @_settings.max
        @_settings.value = @_settings.min if @_settings.value < @_settings.min

    _render: ->
        @_settings.el.innerHTML += '''
            <span class="label min"></span>
            <span class="label current"></span>
            <span class="label max"></span>'
        ''' if @_settings.labels
        @_settings.el.innerHTML += '<div class="bar"></div>' if @_settings.bar
        @_settings.el.innerHTML += '<a href="#" class="handle"></a>'

    _renderEdgeLabels: ->
        @_settings.el.getElementsByClassName('min')[0].innerHTML = @_settings.min
        @_settings.el.getElementsByClassName('max')[0].innerHTML = @_settings.max

    _renderHandleChanges: ->
        h.style.left = "#{@_settings.value}%" for h in @_cache.handle
        @_cache.bar.style.width  = "#{@_settings.value}%" if @_settings.bar
        @_cache.current.innerHTML = @_settings.value if @_settings.labels

    _onHandleKeydown: (e) =>
        @_changeHandle(if e.keyCode in [37, 40, 65, 83] then 'l' else 'r') if e.keyCode in [37, 38, 39, 40, 65, 68, 83, 87]

    _onHandleMousedown: (e) =>
        @_activeDrag = true
        document.addEventListener('mousemove', @_onHandleMousemove)
        false

    _onHandleMousemove: (e) =>
        @_setSliderValueOnDrag(e) if @_activeDrag

    _onSliderClick: (e) =>
        @_settings.value = @_getValFromMouseEvent(e)
        @_validateHandles()
        @_renderHandleChanges()
        @_fireOnChange()
        @_cache.handle[0].focus()
        false

    _onMouseup: (e) =>
        if @_activeDrag
            @_setSliderValueOnDrag(e)
            @_fireOnChange()
            @_cache.handle[0].focus()
        @_activeDrag = false
        @

    _fireOnChange:->
        @_settings.onChange(@_settings.value) if @_settings.onChange?

    _getValFromMouseEvent: (e) =>
        @_validateValue(((e.pageX - @_cache.slider.offsetLeft) / @_cache.width) * 100)

    _setSliderValueOnDrag: (e) ->
        @_settings.value = @_getValFromMouseEvent(e)
        @_validateHandles()
        @_settings.onDrag(@_settings.value) if @_settings.onDrag?
        @_renderHandleChanges()

    _validateValue: (val) ->
        return parseInt(val, 10) if @_settings.step % 1 is 0
        [int, places] = (@_settings.step + "").split(".")
        parseFloat(val.toFixed(places.length));

    getValue: -> @_settings.value

    setValue: (value, fireEvents=true) ->
        @_settings.value = value
        @_validateHandles()
        @_renderHandleChanges()
        @_fireOnChange() if fireEvents

if typeof define is "function" and define.amd
    define("SliderBarr", [], -> SliderBarr)
else
    window.SliderBarr = SliderBarr