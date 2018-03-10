class Category {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addItem(name, price) {
    var item = new Item(name, price);
    this.items.push(item);
    console.log(this.items);
    addToCategory();
    return item;
  }

  total() {
    var sum = 0;
    this.items.forEach(item => {
      sum = sum + item.price;
      console.log(sum);
    });
    return sum;
  }
}

