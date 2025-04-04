import { useReducer, createContext, Dispatch, useMemo, FC } from "react";
import {
  initialState,
  budgetReducer,
  BudgetState,
  BudgetActions,
} from "../reducer/budget.reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalGastos: number;
  remainingBudget: number;
};

export const BudgetContext = createContext<BudgetContextProps | undefined>(undefined); // ✅ Mejora aquí

export const BudgetProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalGastos = useMemo(() => {
    return state.expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [state.expenses]);

  const remainingBudget = useMemo(() => {
    return state.budget - totalGastos;
  }, [state.budget, totalGastos]);

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalGastos, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
