var Benchmark = require('benchmark');
var path = require('path');
var fs = require('fs');

var original = require('./lib/types/png');
var instrumented = require('./lib-cov/types/png');

var buffer = new Buffer(1024);
var file = path.resolve('specs/images/sample.png');
var descriptor = fs.openSync(file, 'r');
fs.readSync(descriptor, buffer, 0, 1024, 0);

var suite = new Benchmark.Suite();
suite.add('Original', function () {
  original(buffer);
}).add('Instrumented', function () {
  instrumented(buffer);
}).on('cycle', function(event) {
  console.log(String(event.target));
}).on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run();

