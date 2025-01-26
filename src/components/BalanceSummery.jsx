import Expense from "./Expense";
import Income from "./Income";

export default function BalaanceSummary({
  // selectedCategory,
  // onSelection,
  // incomeCategories,
  // expenseCategories,
  transactions,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <Income
        // selectedCategory={selectedCategory}
        // onSelection={onSelection}
        // incomeCategories={incomeCategories}
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Expense
        // selectedCategory={selectedCategory}
        // onSelection={onSelection}
        // expenseCategories={expenseCategories}
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}
