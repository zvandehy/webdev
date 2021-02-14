// foreach

// cannot be used to modify the elements in the arrays
const nums = [1, 3, 5, 7, 9];


// always returns undefined
console.log(nums.forEach(num => num *= 2))
// doesn't modify nums
console.log(nums)


// map
// creates and returns a new array with values that are returned by calling the argument function on each element
console.log(nums.map(num => num *= 2));

// original is unmodified
console.log(nums)


// find
// tests each element with the arugment function, returns the first element that satisfies the condition
// argument function returns Boolean
// returns undefined if no element satisfies the condition
console.log(nums.find(num => num > 3))

// findindex
// returns -1 if not found
console.log(nums.findIndex(num => num > 3))