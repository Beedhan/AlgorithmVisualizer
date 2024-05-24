class ListNode {
  next: ListNode | null;
  value: number;
  constructor(value: number) {
    this.next = null;
    this.value = value;
  }
}

export class LinkedList {
  head: ListNode | null = null;
  tail: ListNode | null;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: number) {
    const node = new ListNode(value);
    node.next = null;
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail) {
        this.tail.next = node;
      }
      this.tail = node;
    }

    this.length = this.length + 1;
  }
  prepend(value: number) {
    const node = new ListNode(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length = this.length + 1;
  }
  remove(index: number) {
    if (this.length === 0) return;
    if (index === 0) {
      this.removeHead();
      return;
    }
    const targetedNode = this.getNode(index);
    const prevNode = this.getNode(index - 1);
    if (prevNode && targetedNode) {
      prevNode.next = targetedNode?.next;
    }
    this.length--;
  }

  removeHead() {
    if (this.length === 0) return;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    if (this.head) {
      this.head = this.head?.next;
    }
    this.length--;
  }

  getNode(index: number) {
    if (index === 0) return this.head;
    if (index === this.length) return this.tail;
    let tempNode: ListNode | null = this.head;
    let currentIndex = 0;
    let targetedNode = null;
    while (tempNode !== null) {
      if (currentIndex === index) {
        targetedNode = tempNode;
        break;
      }
      tempNode = tempNode?.next;
      currentIndex++;
    }
    return targetedNode;
  }

  getValues() {
    if (this.length === 0) return [];
    const values = [];
    let nextNode = this.head;
    while (nextNode) {
      values.push(nextNode.value);
      nextNode = nextNode.next;
    }
    return values;
  }
}
