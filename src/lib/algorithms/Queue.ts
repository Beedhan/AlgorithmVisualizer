class QueueNode {
  next: QueueNode | null;
  value: number;
  constructor(value: number) {
    this.next = null;
    this.value = value;
  }
}
export class Queue {
  head: QueueNode | null = null;
  tail: QueueNode | null = null;
  length: number = 0;
  enqueue(value: number) {
    const newNode = new QueueNode(value);
    if (this.length === 0) {
      this.head = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
    }
    this.tail = newNode;
    this.length++;
  }
  dequeue() {
    if (this.length == 0) return;
    let temp = this.head;
    if (temp) {
      this.head = temp?.next;
      temp.next = null;
    }
    this.length--;
  }
  getValues() {
    if (this.length === 0) return [];
    let temp = this.head;
    const values = [];
    while (temp !== null) {
      values.push(temp.value);
      temp = temp.next;
    }
    return values;
  }
}
