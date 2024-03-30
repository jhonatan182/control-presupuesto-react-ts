import { useContext } from "react";
import { BudgetContext, BudgetContextProps } from "../context/BudgetContext";

export default function useBudget(): BudgetContextProps {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }

  return context;
}
