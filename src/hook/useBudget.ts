import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

const useBudget = () => {
    const context = useContext(BudgetContext)
    if (!context) {
        throw new Error("useBudget must be used within a BudgetContext")
    }
  return context
}

export  {useBudget}
