console.log(sum(3, 4))
function sum(a, b) {
    return a + b;
}

// difference(1,2) - NO!
const difference = function (a, b) {
    return a - b;
}

console.log(difference(1, 2))

// mult(1,2) - NO!
const mult = (a, b) => {
    return a * b;
}

console.log(mult(5, 6))


// Higher order


function greaterThan(a) {
    return function (b) {
        return b > a;
    }
}

const greaterThan10 = greaterThan(10);
// greaterThan10 = function (b) { return b> a};
console.log(greaterThan10)
console.log(greaterThan10(5))



const nums = [3, 10, 7, 25, -5, 8];
console.log(nums)
// sort takes a compare function
nums.sort(comp)

function comp(a, b) {
    return a - b;
}

console.log(nums)
console.log(nums.sort((a, b) => b - a))



