import Expense from "./Expense";
import Income from "./Income";

export default function BalaanceSummary({
  selectedCategory,
  onSelection,
  categories,
  transactionType,
}) {
  return (
    <>
      <Expense
        selectedCategory={selectedCategory}
        onSelection={onSelection}
        categories={categories}
        transactionType={transactionType}
      />
      <Income
        selectedCategory={selectedCategory}
        onSelection={onSelection}
        categories={categories}
        transactionType={transactionType}
      />
    </>
  );
}
