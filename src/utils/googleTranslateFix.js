// Google Translate rewrites text nodes (wraps them in <font>), which makes React crash with
// "Failed to execute 'removeChild' on 'Node'" when it later re-renders those nodes.
// This is the well-known workaround (facebook/react#11538): ignore DOM operations on nodes
// that are no longer where React thinks they are.
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}
