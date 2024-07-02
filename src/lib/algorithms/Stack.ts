class StackNode {
  next: StackNode | null;
  value: number;
  constructor(value: number) {
    this.next = null;
    this.value = value;
  }
}

export class Stack {
  top: StackNode | null = null;
  length: number = 0;

  push(value: number) {
    const newNode = new StackNode(value);
    if (this.top === null) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.length++;
  }
  pop() {
    if (this.top === null) {
      return;
    }
    const temp = this.top;
    this.top = temp.next;
    temp.next = null;
    this.length--;
  }
  getValues() {
    if (this.length === 0) return [];
    let temp = this.top;
    const values = [];
    while (temp !== null) {
      values.push(temp.value);
      temp = temp.next;
    }
    return values;
  }
}
