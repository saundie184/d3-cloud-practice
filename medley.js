'use strict';
//make an object that keeps track of the words and how many times it is said
var wordArray = [
  "Hello",
  "world",
  "normally",
  "you",
  "want",
  "more",
  "words",
  "than",
  "this",
  "make",
  "a",
  "super",
  "long",
  "want",
  "more",
  "words",
  "than",
  "this",
  "make",
  "a",
  "super",
  "long",
  "long",
  "long",
  "long",
  "long"
];

var anotherArray = [
  "Hello",
  "world",
  "normally",
  "you",
  "want",
  "Hello",
  "world"
];

//loop through array
//make object with each word as a keyboard
function wordObj(arr) {
  //create empty object
  var obj = {};
  //assign each word as a key
  arr.forEach(function(el) {
    obj[el] = 1;
  });
  //check for the key in the array and increment the value
  arr.sort();
  for ( var i = 1; i < arr.length; i++ ){
      if(arr[i-1] === arr[i]){
          obj[arr[i]]++;
      }
  }
  //return object with value of how many times it is said
  return obj;
}

console.log(wordObj(wordArray));

var fill = d3.scale.category20();
d3.layout.cloud().size([300, 300]).words(wordArray.map(function(d) {
  // console.log(d);
  return {
    text: d,
    size: 10 + Math.random() * 90
  };
})).rotate(function() {
  return ~~(Math.random() * 2) * 90;
}).font("Impact").fontSize(function(d) {
  return d.size;
}).on("end", draw).start();

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
