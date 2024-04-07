import { ChangeEvent, FormEvent, useState } from "react";
import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ErrorMessage from "./ErrorMessage";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    category: "",
    date: new Date(),
    expenseName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isAmountField = ["amount"].includes(e.target.name);
    setExpense({
      ...expense,
      [e.target.name]: isAmountField ? +e.target.value : e.target.value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validar
    if (Object.values(expense).includes("") || expense.amount <= 0) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2  border-blue-500">
        Nuevo Gasto
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2 ">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto: ejm. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col ">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          className="bg-slate-100 p-2"
          name="category"
          id="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          onChange={handleChangeDate}
          value={expense.date}
          className="bg-slate-100 border-0"
          minDate={new Date()}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={"Registrar Gasto"}
      />
    </form>
  );
}
