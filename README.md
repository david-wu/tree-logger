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

