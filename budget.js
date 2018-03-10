class Budget {
  constructor(totalBudget) {
    this.totalBudget = totalBudget;
    this.categories = [];
  }

  addCategory(categoryName) {
    const category = new Category(categoryName);
    this.categories.push(category);
    return category;
  }

  total() {
    var sum = 0;
    this.categories.forEach(category => {
      sum = sum + category.total();
    });
    return sum;
  }


}
