// require keyword used to import modules
// local modules use export to allow other modules to import
// third party modules require that the package is first installed using npm, and then imported using require

const calculation = require("./calculation.js");

console.log(calculation)

console.log(calculation.add(3, 5))
console.log(calculation.xyz(1, 6))