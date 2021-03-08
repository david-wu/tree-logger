# tree-logger
Console logs trees.  It can be useful when debugging in terminal.


### Usage
```
const treeLogger = require('tree-logger');

const root = {
  value: 2,
  children: [
    {
      value: 3,
      children: [
        { value: 5 },
        { value: 6 },
      ],
    },
    {
      value: 4,
      children: [
        { value: 8 },
        { value: 10 },
      ],
    },
  ]
};
const log = treeLogger(root, (node) => node.children, (node) => node.value);
console.log(log);
```

```
└── 2
    ├── 3
    |   ├── 5
    |   └── 6
    └── 4
        ├── 8
        └── 10
```

### Advanced Usage
The second argument is a function that returns a node's children.
The third argument is a function that returns the node's label string.
This lets you log out nested structures that are not conventional trees.

```
const arrTree = [0, [1, 2, {}, [3, 4, 'cat'], 5, undefined], 6, null, [7, 8]];
const arrLog = treeLogger(
  arrTree,
  (d) => Array.isArray(d) ? d : [],
  (d) => Array.isArray(d) ? '[]' : d,
);
console.log(arrLog);
```

```
└── []
    ├── 0
    ├── []
    |   ├── 1
    |   ├── 2
    |   ├── [object Object]
    |   ├── []
    |   |   ├── 3
    |   |   ├── 4
    |   |   └── cat
    |   ├── 5
    |   ├── undefined
    ├── 6
    ├── null
    └── []
        ├── 7
        └── 8
```