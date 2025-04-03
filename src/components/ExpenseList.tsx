import { useMemo } from "react";
import { useBudget } from "../hook/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
  const { state } = useBudget();
  const isEmpty = useMemo(
    () => state.expenses.length === 0,
    [state.expenses.length]
  );
  return (
    <div className=" px-5">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No Hay gastos</p>
      ) : (
        <>
            <p className="text-gray-600 text-2xl font-bold my-5">Gastos</p>
            {state.expenses.map((expense) => (
                <ExpenseDetail key={expense.id}
                    expense={expense}
                />
            ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
