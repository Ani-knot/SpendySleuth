import React, { useState } from "react";
import "./App.css"; // Import Tailwind CSS

function App() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Expense");
  const [formData, setFormData] = useState({
    type: "Expense",
    category: "",
    amount: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { ...formData, id: Date.now() };
    setTransactions([...transactions, newTransaction]);
    setFormData({ type: transactionType, category: "", amount: "" });
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    setFormData(transactionToEdit);
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const categories =
    transactionType === "Income"
      ? ["Salary", "Outsourcing", "Bond", "Dividend"]
      : [
          "Education",
          "Food",
          "Health",
          "Bill",
          "Insurance",
          "Tax",
          "Transport",
          "Telephone",
        ];

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions = selectedCategory
    ? transactions.filter((t) => t.category === selectedCategory)
    : transactions;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      {/* Expense Tracker Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-4 mb-2">
          <button
            type="button"
            onClick={() => setTransactionType("Expense")}
            className={`px-4 py-2 ${
              transactionType === "Expense"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setTransactionType("Income")}
            className={`px-4 py-2 ${
              transactionType === "Income"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Income
          </button>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => updateFormData("category", e.target.value)}
            className="w-full border px-2 py-1"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => updateFormData("amount", e.target.value)}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Add Transaction
        </button>
      </form>

      {/* Balance Summary */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Balance Summary</h2>
        <p className={balance < 0 ? "text-red-500" : "text-black"}>
          Balance: {balance}
        </p>
        <p>Total Income: {totalIncome}</p>
        <p>Total Expense: {totalExpense}</p>
      </div>

      {/* Filter by Category */}
      <div className="mb-4">
        <label className="block mb-1">Filter by Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border px-2 py-1"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction List */}
      <div>
        <h2 className="text-xl font-bold mb-2">Transactions</h2>
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border p-2 flex justify-between items-center mb-2"
          >
            <span>{transaction.category}</span>
            <span>{transaction.amount}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(transaction.id)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;