
var budget;
var category;
var categoryName;
var totalSpent = 0;


var cat1 = new Category("clothing");

window.addEventListener("load", () => {
  document.getElementById("cancel").addEventListener("click", stopSpending);
  document.getElementById("budget-modal").style.display = "block";
  document.getElementById("budget-button").addEventListener("click", () => {
    createBudget();
  });
});

function stopSpending() {
  document.getElementById("stop-spending").style.display = "none";
}

function createBudget() {
  const userBudgetInput = document.getElementById('budget-input').value;
  budget = new Budget(userBudgetInput);
  document.getElementById("budget-counter").innerText = "Total Budget: $" + userBudgetInput;
  document.getElementById("total-spent-counter").innerText = "Spent: " + totalSpent + " / " + userBudgetInput; // what if the user puts in a $?
  document.getElementById("budget-modal").style.display = "none";
  addCategories();
  return userBudgetInput;
}

function addCategories() {
  budget.addCategory("Clothing");
  budget.addCategory("Entertainment");
  budget.addCategory("Bills");
  budget.addCategory("Food");
}

function checkDropdown() {
  const catInput = document.getElementById('category-dropdown').value;
  if (catInput === 'clothing') {
    return budget.categories[0];
  } else if (catInput === 'entertainment') {
    return budget.categories[1];
  } else if (catInput === 'bills') {
    return budget.categories[2];
  } else if (catInput === 'food') {
    return budget.categories[3];
  } else {
    console.log("Please select a category.") // make this a notification
  }
}

function addItems() {
  var itemDesc = document.getElementById('item-description').value;
  var itemPrice = parseFloat(document.getElementById('item-price').value);
  var category = checkDropdown();
  category.addItem(itemDesc, itemPrice);
  spentUpdate();


}

function spentUpdate() {
  document.getElementById("total-spent-counter").innerText = "Spent: " + budget.total() + " / " + budget.totalBudget;
  totalRemaining();
  updateCategorySlider();
}

function addToCategory(catInput) {
  var catInput = document.getElementById('category-dropdown').value;
  var itemDesc = document.getElementById('item-description').value;
  var itemPrice = document.getElementById('item-price').value;
  var itemDiv = document.createElement("div");
  if (catInput === 'clothing') {
    itemDiv.innerHTML = "<p>" + itemDesc + " $" + itemPrice + "</p>" + "<hr>";
    document.getElementById("clothing").appendChild(itemDiv);
  } else if (catInput === 'entertainment') {
    itemDiv.innerHTML = "<p>" + itemDesc + " $" + itemPrice + "</p>" + "<hr>";
    document.getElementById("entertainment").appendChild(itemDiv);
  } else if (catInput === 'bills') {
    itemDiv.innerHTML = "<p>" + itemDesc + " $" + itemPrice + "</p>" + "<hr>";
    document.getElementById("bills").appendChild(itemDiv);
  } else if (catInput === 'food') {
    itemDiv.innerHTML = "<p>" + itemDesc + " $" + itemPrice + "</p>" + "<hr>";
    document.getElementById("food").appendChild(itemDiv);
  } else {
    console.log("ERROR")
  }
}

function totalRemaining() {
  var totalRemain = budget.totalBudget - budget.total();
  var percentage = ((budget.total() / budget.totalBudget) * 100);
  console.log(percentage);
  console.log(totalRemain);
  if (percentage >= 100) {
    document.getElementById("total-spent-counter").style.color = "red";
    document.getElementById("stop-spending").style.display = "flex";
  } else if (percentage >= 80) {
    console.log(percentage);
    return "#orange";
  } else if (percentage >= 60 || percentage < 60) {
    console.log(percentage);
    return "#green";
  } else {
    return "#red";
  }
}

function updateCategorySlider() {
  document.getElementById("entertainment-slider").style.width = (this.entertainmentPercent()).toString() + "%";
  document.getElementById("food-slider").style.width = (this.foodPercent()).toString() + "%";
  document.getElementById("clothing-slider").style.width = (this.clothingPercent()).toString() + "%";
  document.getElementById("bills-slider").style.width = (this.billsPercent()).toString() + "%";
}

function clothingPercent() {
  return (budget.categories[0].total() / budget.totalBudget) / .01;
}

function entertainmentPercent() {
  return (budget.categories[1].total() / budget.totalBudget) / .01;
}

function billsPercent() {
  return (budget.categories[2].total() / budget.totalBudget) / .01;
}

function foodPercent() {
  return (budget.categories[3].total() / budget.totalBudget) / .01;
}
