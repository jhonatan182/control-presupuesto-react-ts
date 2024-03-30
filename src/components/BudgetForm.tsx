import { ChangeEvent, useContext, useMemo, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useContext(BudgetContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          name="budget"
          type="number"
          className="w-full border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          value={budget}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white uppercase font-bold disabled:opacity-30 disabled:pointer-events-none"
        disabled={isValid}
        onClick={() =>
          dispatch({ type: "add-budget", payload: { budget: budget } })
        }
      />
    </form>
  );
}
