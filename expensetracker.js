document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const TotalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();
  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpenseTolocal();
      renderExpenses();
      updateTotal();

      expenseAmountInput.value = "";
      expenseNameInput.value = "";
    }
  });

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpenseTolocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    TotalAmountDisplay.textContent = totalAmount.toFixed(2);
  }
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.name} - $${expense.amount}
      <button class="li-btn" data-id="${expense.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      const expenseID = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseID);
      saveExpenseTolocal();
      renderExpenses();
      updateTotal();
    }
  });
});
