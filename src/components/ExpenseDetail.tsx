import { useMemo } from "react";
import { categories } from "../data/categories";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import useBudget from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })
        }
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: expense.id } })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
<div className="bg-white shadow-lg p-5 w-full border-b border-gray-200">
    {/* Header: Ícono, Categoría y Monto */}
      <div className="flex gap-5 items-center">
          <div className="flex-shrink-0">
                <img
                        src={`/icono_${categoryInfo.icon}.svg`}
                                alt="Imagen gasto"
                                        className="w-16 sm:w-20"
                                              />
                                                  </div>

                                                      <div className="flex-1">
                                                            <p className="text-sm font-bold uppercase text-slate-500">
                                                                    {categoryInfo.name}
                                                                          </p>
                                                                                <p className="text-slate-600 text-sm">
                                                                                        {formatDate(expense.date!.toString())}
                                                                                              </p>
                                                                                                  </div>

                                                                                                      <div className="flex-shrink-0">
                                                                                                            <AmountDisplay amount={expense.amount} />
                                                                                                                </div>
                                                                                                                  </div>

                                                                                                                    {/* Descripción debajo - sin truncar */}
                                                                                                                      <div className="mt-3 pt-3 border-t border-gray-100">
                                                                                                                          <p className="text-gray-700">
                                                                                                                                {expense.expenseName}
                                                                                                                                    </p>
                                                                                                                                      </div>
                                                                                                                                      </div>

      </SwipeableListItem>
    </SwipeableList>
  );
}
