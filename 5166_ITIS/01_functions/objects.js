var dog = { "name": "Woody", "type": "dog" };
var cat = { "name": "Bob", "type": "cat" };

console.log(dog);
console.log(cat);

var pets = [dog, cat];
console.log(pets);

pets.push({ "name": "Roxy", "type": "dog" });
console.log(pets[2]);

cat.age = 2;
dog["age"] = 14;

console.log(pets)

console.log(pets[0]["name"])
console.log(pets[0].age)
