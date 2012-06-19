# SliderBarr

A simple JavaScript slider component.

## Getting Started
SliderBarr is written in CoffeeScript, styled using SASS and uses qunit for unit tests.

It is AMD-compatible and has a single dependency on [jQuery](http://jquery.com/).


## How to use it
In your web page:

```html

<head>
    <link charset='utf-8' href='dist/css/sliderbarr.css' rel='stylesheet' type='text/css' />
</head>
<body>
<div class="slider"></div>

<script src="jquery.js"></script>
<script src="dist/sliderbarr-0.0.1.min.js"></script>
<script>
var slider = SliderBarr({
    el: $('.slider'),
    value: 50,
    step: 1,
});
</script>
</body>
```

## Building

Requirements:
1. [Download and install Node](http://nodejs.org)
2. Run the following commands in the command line:

```
npm install coffee-script
```
3. [Download and install Ruby](http://www.ruby-lang.org/en/)
4. Run the following commands in the command line:

```
gem install compass
```
5. Download the component and extract it to a suitable directory.
6 Change to this directory and run the following commands in the command line:

```
cd src
compass install compass
compass create src --css-dir=../dist/css
```
7. Edit src/coffee/sliderbarr-0.0.1.coffee or src/sass/sliderbarr.scss
8. After changes open the command line and run:

```
grunt
```

## License
Copyright (c) 2012 Scott Barr  
Licensed under the MIT license.
