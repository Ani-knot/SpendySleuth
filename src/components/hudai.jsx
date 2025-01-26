// src/App.jsx
import { useState } from "react";
import BalanceSummary from "./components/BalanceSummary";
import Header from "./components/Header";
import ListView from "./components/ListView";
import SubmissionForm from "./components/SubmissionForm";
import "./style.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Expense");
  const [formData, setFormData] = useState({
    type: transactionType,
    category: "",
    amount: "",
    date: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFormChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = { ...formData, type: transactionType };
    setTransactions([...transactions, newTransaction]);
    setFormData({
      type: transactionType,
      category: "",
      amount: "",
      date: "",
    });
  };

  const handleTransactionType = (type) => {
    setTransactionType(type);
    setFormData({ ...formData, type: type });
  };

  const handleEditTransaction = (transaction) => {
    setFormData(transaction);
    setTransactionType(transaction.type);
  };

  const handleDeleteTransaction = (transaction) => {
    setTransactions(transactions.filter(t => t !== transaction));
  };

  const categories = transactionType === "Income"
    ? ["Salary", "Outsourcing", "Bond", "Dividend"]
    : ["Education", "Food", "Health", "Bill", "Insurance", "Tax", "Transport", "Telephone"];

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <>
      <Header />
      <div className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SubmissionForm
            onTransaction={handleTransactionType}
            transactionType={transactionType}
            categories={categories}
            onSubmitForm={handleAddTransaction}
            onFormChange={handleFormChange}
            formData={formData}
          />
          <div className="lg:col-span-2">
            <ListView
              balance={balance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8"></div>


// src/components/BalanceSummary.jsx
import Income from "./Income";
import Expense from "./Expense";

export default function BalanceSummary({ transactions, onEdit, onDelete }) {
  return (
    <>
      <Income transactions={transactions} onEdit={onEdit} onDelete={onDelete} />
      <Expense transactions={transactions} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}


// src/components/Expense.jsx
import React, { useState } from 'react';

export default function Expense({ transactions, onEdit, onDelete }) {
  const [sortOrder, setSortOrder] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.amount - b.amount;
    } else if (sortOrder === 'desc') {
      return b.amount - a.amount;
    } else {
      return 0;
    }
  });

  const filteredTransactions = sortedTransactions.filter(transaction => {
    return transaction.type === 'Expense' && (filterCategory ? transaction.category === filterCategory : true);
  });

  return (
    <div className="border rounded-md">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-8m-3.413 .584a2 2 0 0 0 1.413 3.416h2m4 0h6a1 1 0 0 1 1 1v3" />
              <path d="M19 19a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M16 12h4v4m-4 0a2 2 0 0 1 -2 -2" />
              <path d="M3 3l18 18" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">Expense</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => handleSort('asc')}
            >
              Sort Low to High
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => handleSort('desc')}
            >
              Sort High to Low
            </button>
          </div>
          <div className="relative inline-block text-left">
            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <option value="">All Categories</option>
              <option value="Education">Education</option>
              <option value="Food">Food</option>
              <option value="Health">Health</option>
              <option value="Bill">Bill</option>
              <option value="Insurance">Insurance</option>
              <option value="Tax">Tax</option>
              <option value="Transport">Transport</option>
              <option value="Telephone">Telephone</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-4 divide-y">
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-center py-2 relative group cursor-pointer">
            <div>
              <h3 className="text-base font-medium leading-7 text-gray-600">{transaction.category}</h3>
              <p className="text-xs text-gray-600">{transaction.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                BDT {transaction.amount}
              </p>
              <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                <button className="hover:text-teal-600" role="button" title="Edit Button" onClick={() => onEdit(transaction)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                    <path d="M13.5 6.5l4 4" />
                  </svg>
                </button>
                <button className="hover:text-red-600" role="button" title="Delete" onClick={() => onDelete(transaction)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7h16" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// src/components/Income.jsx
import React, { useState } from 'react';

export default function Income({ transactions, onEdit, onDelete }) {
  const [sortOrder, setSortOrder] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.amount - b.amount;
    } else if (sortOrder === 'desc') {
      return b.amount - a.amount;
    } else {
      return 0;
    }
  });

  const filteredTransactions = sortedTransactions.filter(transaction => {
    return transaction.type === 'Income' && (filterCategory ? transaction.category === filterCategory : true);
  });

  return (
    <div className="border rounded-md relative">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">Income</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => handleSort('asc')}
            >
              Sort Low to High
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => handleSort('desc')}
            >
              Sort High to Low
            </button>
          </div>
          <div className="relative inline-block text-left">
            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <option value="">All Categories</option>
              <option value="Salary">Salary</option>
              <option value="Outsourcing">Outsourcing</option>
              <option value="Bond">Bond</option>
              <option value="Dividend">Dividend</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-4 divide-y">
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-center py-2 relative group cursor-pointer">
            <div>
              <h3 className="text-base font-medium leading-7 text-gray-600">{transaction.category}</h3>
              <p className="text-xs text-gray-600">{transaction.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                BDT {transaction.amount}
              </p>
              <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                <button className="hover:text-teal-600" role="button" title="Edit Button" onClick={() => onEdit(transaction)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                    <path d="M13.5 6.5l4 4" />
                  </svg>
                </button>
                <button className="hover:text-red-600" role="button" title="Delete" onClick={() => onDelete(transaction)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7h16" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}