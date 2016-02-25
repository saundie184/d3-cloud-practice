'use strict';

var wordArray = [
  "Hello",
  "super",
  "long",
  "long",
  "long",
  "long",
  "long"
];

//Remove duplicates from array
var uniqueArray = wordArray.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
});

//Create object that maps the number of times spoken
function wordObj(arr) {
  var obj = {};
  arr.forEach(function(el) {
    obj[el] = 1;
  });
  //check for the key in the array and increment the value
  arr.sort();
  for (var i = 1; i < arr.length; i++) {
    if (arr[i - 1] === arr[i]) {
      obj[arr[i]]++;
    }
  }
  return obj;
}

var newObj = wordObj(wordArray );

var fill = d3.scale.category20();

d3.layout.cloud().size([300, 300])
  .words(uniqueArray.map(function(d) {
    return {
      text: d,
      size: newObj[d] * 10
    };
  }))
  .rotate(function() {
    return ~~(Math.random() * 2) * 90;
  })
  .font("Impact").fontSize(function(d) {
    return d.size;
  })
  .on("end", draw).start();

function draw(words) {
  d3.select("#word-cloud").append("svg").attr("width", 300).attr("height", 300).append("g").attr("transform", "translate(150,150)").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
    return d.size + "px";
  }).style("font-family", "Impact").style("fill", function(d, i) {
    return fill(i);
  }).attr("text-anchor", "middle").attr("transform", function(d) {
    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  }).text(function(d) {
    return d.text;
  });
}
