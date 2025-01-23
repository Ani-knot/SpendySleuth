import { useState } from "react";
export default function SubmissionFrom({
  onTransaction,
  transactionType,
  categories,
  onSubmitFrom,
}) {
  const [transaction, setTransaction] = useState({
    type: { transactionType },
    category: " ",
    amount: " ",
    date: " ",
  });
  const handelFromChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };
  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form
        onSubmit={() => {
          onSubmitFrom(transaction);
        }}
      >
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <button
            type="button"
            onClick={() => onTransaction("Expense")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              transactionType === "Expense" ? "active" : "bg-gray-200"
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => onTransaction("Income")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              transactionType === "Income" ? "active" : "bg-gray-200"
            }`}
          >
            Income
          </button>
        </div>

        {/* Income Categories - Salary, Outsourcing, Bond, Dividend  */}
        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
              value={transaction.category}
              onChange={handelFromChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option>Select Catagory</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              value={transaction.amount}
              onChange={handelFromChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              placeholder="12931"
              value={transaction.date}
              onChange={handelFromChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
