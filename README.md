# h-tree-cli
Print the H-Tree fractal to the console!

## Usage
### Via `npx`:
```
$ npx h-tree-cli <n>
$ npx h-tree-cli <n> <size>
```

### Via Global Install
```
$ npm install --global h-tree-cli
$ h-tree-cli <n>
$ h-tree-cli <n> <size>
```

### Via Import
```
$ npm install h-tree-cli
```
then:
```
const h_tree = require('h-tree-cli');
console.log(h_tree.create(<n>, <size>));
```