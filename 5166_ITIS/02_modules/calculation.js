// initially
// module.exports = {} 

function add(x, y) {
    return x + y;
}

// module.exports.<name_of_field> = <function_name>
module.exports.add = add
module.exports.xyz = add

// exports = module.exports;
// function wrappers returns module.exports
// use exports as a shortcut for module.exports

exports.abc = add;


exports.sub = (x, y) => x - y;