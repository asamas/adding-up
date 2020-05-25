"use strict"

const iterable = [{key:10}, {key:20}, {key:30}];

for (const value of iterable) {
  value.key+=1
  console.log(value);
}

console.log(iterable)