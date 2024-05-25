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
      const tempNode = this.tail;
      if (tempNode) {
        tempNode.next = node;
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
    if (index > this.length || index < 0) {
      return;
    }
    if (this.length === 0) return;
    if (index === 0) {
      return this.removeHead();
    }
    if (index === this.length - 1) {
      return this.removeTail();
    }
    const targetedNode = this.getNode(index);
    const prevNode = this.getNode(index - 1);
    if (prevNode && targetedNode) {
      prevNode.next = targetedNode?.next;
      this.length--;
    }
  }

  removeHead() {
    if (this.length === 0) return;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (this.head) {
        this.head = this.head?.next;
      }
    }
    this.length--;
  }
  removeTail() {
    if (this.length === 0) return;
    let temp = this.head;
    let pre = this.head;
    while (temp?.next !== null) {
      if (temp && pre) {
        pre = temp;
        temp = temp?.next;
      }
    }
    this.tail = pre;
    if (this.tail) {
      this.tail.next = null;
    }
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
  }

  getNode(index: number) {
    if (index < 0 || index >= this.length) return null;
    let tempNode: ListNode | null = this.head;
    for (let i = 0; i < index; i++) {
      if (tempNode) {
        tempNode = tempNode?.next;
      }
    }
    return tempNode;
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
