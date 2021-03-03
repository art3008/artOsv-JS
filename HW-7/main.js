var arr = [1, 2, 3, 4, 5]

// убрали 0 в конце
var result = arr.reduce(function(sum, current) {
  return sum + current
});

let a = 0;
var r = arr.reduce(a,arr);
console.log(r);
console.log(result);