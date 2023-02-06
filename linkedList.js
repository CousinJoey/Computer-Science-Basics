
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.size++;
        } else {
            let existingNode = this.head;
            while (existingNode.next) {
                existingNode = existingNode.next;
            }
            existingNode.next = newNode;
            this.size++;
        }
    }

    prepend(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.size++;
        } else {
            newNode.next = head;
            head = newNode;
            this.size++;
        }
    }

    head() {
        return this.head;
    }

    tail() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
        }
        return lastNode;
    }

    size() {
        return this.size;
    }

    at(index) {
        let current = this.head;
        let count = 0;
        while (current != null) {
            if (count == index) {
                return current;
            }
            count++;
            current = current.next;
        }
    }

    pop() {
        let previous = this.head
        let tail = this.head.next
        while (tail.next != null) {
            previous = tail;
            tail = tail.next;
        }
        previous.next = null;
        this.size--;
        return this.head;
    }

    find(value) {
        let current = this.head
        while (current != null) {
            if (current.data === value) {
                return current;
            }
            current = current.next;
        }
            return null;
        }

    toString() {
        let current = this.head
        let string = ""
        while (current != null) {
            string += `( ${current.data} ) -> `;
            current = current.next;
        }
        return (string + null);
    }
}