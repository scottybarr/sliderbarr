# SliderBarr

A simple and lightweight JavaScript slider component that **does NOT depend on jQuery UI**.

## Example
[View the example here](http://scottybarr.github.com/sliderbarr/index.html)

[Unit Tests](http://scottybarr.github.io/sliderbarr/test/SpecRunner.html)

## Getting Started
SliderBarr is written in CoffeeScript, styled using SASS and uses qunit for unit tests.

It is also AMD-compatible.

## How to use it
Once you have downloaded and extracted the component you should use the contents of the **dist** directory in the following manner:

In your web page:
```html

<head>
    <link charset='utf-8' href='dist/css/sliderbarr.css' rel='stylesheet' type='text/css' />
</head>
<body>
<div id="slider" class="sliderbarr"></div>

<script src="dist/sliderbarr.min.js"></script>
<script>
var slider = new SliderBarr({
    el: 'slider',
    value: 50,
    step: 1
});
</script>
</body>
```

## Current features
* Horizontal slider
* Single handle
* Callbacks for dragging and changing
* Support for Chrome, Firefox, Opera, Safari, Internet Explorer 7, 8, 9

## Future Features
* Range slider
* Vertical slider option
* Support for touchscreen devices.

## Building

Requirements:
* [Download and install Node](http://nodejs.org)
* [Download and install Ruby](http://www.ruby-lang.org/en/)
* Run the following commands in the command line:

```
gem install compass
```

* Download the component and extract it to a suitable directory.
* Install the required npm packages for grunt build.
```
npm install
```

* After changes open the command line and run:

```
grunt
```

* If you wish to automatically compile coffeescript, minify the js and compile sass stylesheets run:

```
grunt watch
```

* To run the tests use:
```
grunt jasmine
```

## License
Copyright (c) 2013 Scott Barr
Licensed under the MIT license.
