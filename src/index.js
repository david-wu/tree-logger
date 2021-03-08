module.exports = logTree;

function logTree(root, getChildren, getNodeLog) {
  getChildren = getChildren || ((d) => d.children);
  getNodeLog = getNodeLog || ((d) => d.value);

  const levelLogs = [];
  const lastChildSet = new Set([root]);
  const depthByNode = new Map();
  const openLevelDepths = new Set();

  const stack = [root];
  while(stack.length) {
    const node = stack.pop();
    const nodeDepth = depthByNode.get(node) || 0;
    if (lastChildSet.has(node)) {
      openLevelDepths.delete(nodeDepth-1);
    }

    const spacing = getSpacing(nodeDepth, openLevelDepths);
    const delimeter = lastChildSet.has(node) ? '└── ' : '├── '
    levelLogs.push(`${spacing}${delimeter}${getNodeLog(node)}`);

    const children = getChildren(node) || [];
    openLevelDepths.add(nodeDepth);

    children.forEach((child) => {
      depthByNode.set(child, nodeDepth + 1);
    });
    const lastChild = children[children.length - 1];
    if (lastChild) {
      lastChildSet.add(lastChild);
    }

    stack.push(...children.reverse());
  }
  return levelLogs.join('\n');
}

function getSpacing(depth, openLevelDepths) {
  let spacing = [];
  for(let i = 0; i < depth; i++) {
    spacing.push(openLevelDepths.has(i-1) ? '|   ' : '    ');
  }
  return spacing.join('');
}
