import { categories } from "../data/category";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hook/useBudget";

const ExpensiveForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    category: "",
    expenseName: "",
    date: new Date(),
  })

  const { dispatch, state, remainingBudget } = useBudget();

  const [error, setError] = useState("");

  const [previusAmount, setPreviusAmount] = useState(0);

  useEffect(() => {
    if (state.editingId) {
      const expenseToEdit = state.expenses.filter(
        (expense) => expense.id === state.editingId
      )[0];
      if (expenseToEdit) {
        setExpense(expenseToEdit);
        setPreviusAmount(expenseToEdit.amount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountFlied = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountFlied ? Number(value) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value as Date,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (Object.values(expense).includes("") || Object.values(expense).includes(0)) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if((expense.amount - previusAmount) > remainingBudget) {
      setError("Este gasto excede el presupuesto disponible.");
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setExpense({
      amount: 0,
      category: "",
      expenseName: "",
      date: new Date(),
    });
    setPreviusAmount(0);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? "Actualizar Gasto" : "Nuevo Gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Añade el nombre de gasto"
          className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Añade la cantidad del gasto"
          className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione Categoria --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col gap-2">
          <label htmlFor="date-amount" className="text-xl">
            Fecha Gasto:
          </label>
          <DatePicker
            className="border-2 w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            id="date-amount"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>
      </div>

      <input
        className="bg-blue-600 uppercase w-full text-white font-bold py-2 px-4 rounded-md cursor-pointer hover:bg-blue-800 transition duration-300"
        type="submit"
        value={state.editingId ? "Guardar cambios" : "Añadir Gasto"}
      />
    </form>
  );
};

export default ExpensiveForm;
