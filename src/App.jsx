import { useState } from "react";
import BalaanceSummary from "./components/BalanceSummery";
import Header from "./components/Header";
import ListView from "./components/ListView";
import SubmissionForm from "./components/SubmissionFrom";
import "./style.css";
export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Expense");
  const [formData, setFormData] = useState({
    type: transactionType,
    category: " ",
    amount: " ",
    date: " ",
  });
  const [selectedCategory, setSelectedCatagory] = useState("");
  const handelFormChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const handelAddTransaction = (e, newTransaction) => {
  //   e.preventDefault();
  //   setTransactions([...transactions, newTransaction]);
  //   setTransactions(" ");
  // };
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
  const handelTransactionType = (type) => {
    setTransactionType(type);
    setFormData({ ...formData, type: type });
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
  const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];
  const expenseCategories = [
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
  return (
    <>
      <Header />
      <div className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SubmissionForm
            onTransaction={handelTransactionType}
            transactionType={transactionType}
            categories={categories}
            onSubmitForm={handleAddTransaction}
            onFormChange={handelFormChange}
            formData={formData}
          />
          <div className="lg:col-span-2">
            <ListView
              balance={balance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <BalaanceSummary
                selectedCategory={selectedCategory}
                onSelection={setSelectedCatagory}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
