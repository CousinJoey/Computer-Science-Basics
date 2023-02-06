
class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array){
        const processedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(processedArray);
    };

    buildTree(array) {
        if (!array.length) return null;

        let midpoint = Math.floor(array.length/2);
        let root = new Node(array[midpoint]);
        root.left = this.buildTree(array.slice(0,midpoint));
        root.right = this.buildTree(array.slice(midpoint + 1));

        return root;
    };

    insert(data) {
        let newNode = new Node(data);
    
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    };
    
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    };

    delete(data) {
        let current = this.root,
            parent = null;
    
        while (current) {
            if (data < current.data) {
                parent = current;
                current = current.left;
            } else if (data > current.data) {
                parent = current;
                current = current.right;
            } else {
                if (!current.left) {
                    if (!parent) {
                        this.root = current.right;
                    } else {
                        parent.right === current ? parent.right = current.right : parent.left = current.right;
                    }
                } else if (!current.right) {
                    if (!parent) {
                        this.root = current.left;
                    } else {
                        parent.right === current ? parent.right = current.left : parent.left = current.left;
                    }
                } else {
                    let successor = current.right,
                        successorParent = current;
                    while (successor.left) {
                        successorParent = successor;
                        successor = successor.left;
                    }
                    current.data = successor.data;
                    if (successorParent.left === successor) {
                        successorParent.left = successor.right;
                    } else {
                        successorParent.right = successor.right;
                    }
                }
                return;
            }
        }
    };

    find(data) {
        let current = this.root;

        while(current) {
            if (data === current.data) {
                return current;
            } else if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            }
        }

        return null;
    };


    levelOrder = (root, fn = null, level = 0) => {
        if (!root) return [];

        if(fn) fn(root);

        return [root.data, ...this.levelOrder(root.left, fn, level + 1), ...this.levelOrder(root.right, fn, level + 1)];
    };

    inOrder(root, nodes = []) {
        if(root) {
            this.inOrder(root.left, nodes);
            nodes.push(root.data);
            this.inOrder(root.right, nodes);
        }

        return nodes;
    };

    preOrder(root, nodes = []) {
        if(root) {
            nodes.push(root.data)
            this.preOrder(root.left, nodes)
            this.preOrder(root.right, nodes)
        }

        return nodes;
    };

    postOrder(root, nodes = []) {
        if(root) {
            this.postOrder(root.left, nodes)
            this.postOrder(root.right, nodes)
            nodes.push(root.data)
        }

        return nodes;
    };
    
    height(node = this.root) {
        if (!node) return 0;
      
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
      
        return 1 + Math.max(leftHeight, rightHeight);
      }
    
    depth(node, root = this.root, level = 0) {
        if (!node) return null;
        if (root === null) return 0;
        if (root.data === node.data) return level;
        let count = this.depth(node, root.left, level + 1);
        if (count !== 0) return count;
        return this.depth(node, root.right, level + 1);
    };

    isBalanced(node = this.root) {
        if (node === null) return true;
        const heightDiff = Math.abs(
          this.height(node.left) - this.height(node.right)
        );
        return (
          heightDiff <= 1 &&
          this.isBalanced(node.left) &&
          this.isBalanced(node.right)
        );
    };

    rebalance() {
        if (this.root === null) return;
        const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
        this.root = this.buildTree(sorted);
    };

};

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(testArray);


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (!node) return;
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};