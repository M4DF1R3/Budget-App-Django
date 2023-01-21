// Budget App
// Create a Budget Class
class BUDGET {
    
    // Constructor
    constructor() {
        // Properties (State)
        this.budgetInput = document.getElementById("budget-value");
        this.expenseInput = document.getElementById("expense-input"); // Get The Text Input of the Expense
        this.expenseValue = document.getElementById("expense-value"); // Get the Value Input of the Expense
        this.expenseContainer = document.getElementById("expense-container"); // Storing the Expenses
        this.expenseList = [];
        this.expenseData = [];
        this.savedBudget = localStorage.getItem("budget");
        this.savedDataExpense = localStorage.getItem("data");
        this.savedNumExpense = localStorage.getItem("nums");
    }

    budgetInput() {

    }
    
    loadUserData() {
        if (this.savedBudget) {
            this.giveUserFeedback("Successfully Loaded User Data");
            document.getElementById("budget-amount").innerHTML = parseInt(this.savedBudget);
            this.budgetInput.value = this.savedBudget;
            this.expenseData = this.savedDataExpense.split(",");
            this.expenseList = this.savedNumExpense.split(",").map(x=>+x); // Coverts an array of strings back into numbers
            this.calcBalance(); // Update The Expenses and Balance
            this.drawExpenses(); // Redraw all the expenses
        } else {
            this.giveUserFeedback("There is no stored data");
            
        }
    }
    
    // Methods (Behavior)
    submitBudget(){
        let value = this.budgetInput.value;
        document.getElementById("budget-amount").innerHTML = value;
        this.calcBalance();
    }

    
    // Display To User The Balance
    calcBalance() {
        let expense = this.calcExpense();
        let balance = parseInt(this.budgetInput.value) - expense; // Calculate the Balance
        document.getElementById("balance-amount").innerHTML = balance; // Update the Balance

        if (balance < 0) {
            document.getElementById("balance-amount").style.color = "red"; 
        } else if (balance > 0) {
            document.getElementById("balance-amount").style.color = "green";
        } else {
            document.getElementById("balance-amount").style.color = "black";
        }
    }

    // Calculate Total Expense
    calcExpense() {
        let totalExpense = 0;
        for (let i = 0; i < this.expenseList.length; i++){
            totalExpense += this.expenseList[i]; // Go Through The Expense and Add Every expense up
        }
        document.getElementById("expense-amount").innerHTML =  -(totalExpense); // Update the Expense Amount
        return totalExpense;
    }

    addExpense() {
        let expense = this.expenseValue.value; // Get The Value of The Expense
        let input = this.expenseInput.value; // Get The Input of The Expense
        this.expenseList.push(parseInt(expense));
        this.expenseData.push(input);
        this.calcBalance();
        this.drawExpenses();
        console.log(this.expenseList)
        console.log(this.expenseData)
    }
    
    drawExpenses() {
        this.expenseContainer.innerHTML = ""; // Empty Expense Container

        // Loop through expense array to add elements to the div
        for (let i = 0; i < this.expenseData.length; i++) {
            this.expenseContainer.appendChild(this.getExpenseRow(i));
        }
    }

    getExpenseRow(index) {
        let expenseValue = this.expenseList[index];
        let expenseName = this.expenseData[index];

        var rowDiv = document.createElement("div");
        rowDiv.className = "row-container";

        var divBudget = document.createElement("div");
        divBudget.innerHTML = expenseName;
        divBudget.className = "divBudget";
        rowDiv.appendChild(divBudget);

        var divExpense = document.createElement("div");
        divExpense.innerHTML = "$" + -(expenseValue);
        divExpense.className = "divExpense";
        rowDiv.appendChild(divExpense);

        var divRemove = document.createElement("button");
        divRemove.innerHTML = "Remove";
        divRemove.className = "divRemove";
        divRemove.dataset.index = index;
        divRemove.addEventListener("click", removeExpense);
        rowDiv.appendChild(divRemove);

        return rowDiv;
    }
    
    removeExpense(i) {
        this.expenseData.splice(i, 1);
        this.expenseList.splice(i, 1);
        this.drawExpenses(); // Redraw all expenses
        this.calcBalance(); // Calculate Expenses and Balance again
    }

    saveUserData() {
        this.savedBudget = localStorage.setItem("budget", this.budgetInput.value);
        this.savedDataExpense = localStorage.setItem("data", this.expenseData);
        this.savedNumExpense = localStorage.setItem("nums", this.expenseList);
        this.giveUserFeedback("Successfully Saved");
    }

    clearStorage() {
        localStorage.clear()
        this.expenseList = [];
        this.expenseData = [];
        this.drawExpenses();
        this.budgetInput.value = 0;
        this.submitBudget();
        this.giveUserFeedback("Budget and Expenses Cleared");
    }

    giveUserFeedback(text) {
        document.getElementById("user-feedback").innerHTML = text;
        setTimeout(hideElement, 3000) // Timeout 3000 milliseconds
            function hideElement() {
                document.getElementById("user-feedback").innerHTML = "";
            }
    }
}

// Event Listeners

document.getElementById("submit-budget").addEventListener("click", createBudget);
document.getElementById("submit-expense").addEventListener("click", createExpense);
document.getElementById("save-user-input").addEventListener("click", saveUserData);
document.getElementById("load-user-input").addEventListener("click", loadUserData);
document.getElementById("clear-storage").addEventListener("click", clearStorage);

let budget = new BUDGET();
function createBudget() {
    budget.submitBudget();
}

function createExpense() {
    budget.addExpense();
}

function removeExpense(event){
    budget.removeExpense(event.target.dataset.index);
}

function saveUserData() {
    budget.saveUserData();
}

function loadUserData() {
    budget.loadUserData();
}

function clearStorage() {
    budget.clearStorage();
}
