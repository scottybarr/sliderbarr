# SliderBarr

A simple and lightweight JavaScript slider component that **does NOT depend on jQuery UI**.

## Example
[View the example here](http://scottbarr.com/slider/example/)

## Getting Started
SliderBarr is written in CoffeeScript, styled using SASS and uses qunit for unit tests.

It is AMD-compatible and has a single dependency on [jQuery](http://jquery.com/).

## How to use it
Once you have downloaded and extracted the component you should use the contents of the **dist** directory in the following manner:

In your web page:
```html

<head>
    <link charset='utf-8' href='dist/css/sliderbarr.css' rel='stylesheet' type='text/css' />
</head>
<body>
<div id="slider" class="slider"></div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="dist/sliderbarr-0.0.1.min.js"></script>
<script>
var slider = SliderBarr({
    el: $('#slider'),
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
* Vertical slider option (If there's enough interest)
* Support for touchscreen devices.

## Building

Requirements:
* [Download and install Node](http://nodejs.org)
* Run the following commands in the command line:

```
npm install grunt
npm install coffee-script
```
* [Download and install Ruby](http://www.ruby-lang.org/en/)
* Run the following commands in the command line:

```
gem install compass
```
* Download the component and extract it to a suitable directory.
* Change to this directory and run the following commands in the command line:

```
compass create src --bare --syntax sass --sass-dir "sass" --css-dir "../dist/css"
```
* [Download PhantomJS and extract it to the SliderBarr directory](http://phantomjs.org/)
* After changes open the command line and run:

```
grunt
```

## License
Copyright (c) 2012 Scott Barr  
Licensed under the MIT license.