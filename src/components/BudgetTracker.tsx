import { useBudget } from "../hook/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Amonunt from "./Amonunt";
import "react-circular-progressbar/dist/styles.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Corrección aquí
import { formatCurrency, formatDate } from "../helper";

const BudgetTracker = () => {
  const { state, remainingBudget, totalGastos, dispatch } = useBudget();

  const percentage = +((totalGastos / state.budget) * 100).toFixed(2);

  const handleCreatePDF = () => {
    const rows = state.expenses.map((expense) => [
      expense.expenseName,
      expense.amount,
      expense.category,
      formatDate(expense.date!.toString()),
    ]);

    const columns = ["Nombre", "Monto", "Categoría", "Fecha"];

    const doc = new jsPDF();
    doc.text("Presupuesto Semanal", 50, 10);
    doc.text(`Presupuesto:           ${formatCurrency(state.budget)}`, 10, 20);
    doc.text(`Gastado:               ${formatCurrency(totalGastos)}`, 10, 30);
    doc.text(`Disponible:            ${formatCurrency(remainingBudget)}`, 10, 40);

    autoTable(doc, {
      startY: 60,
      head: [columns],
      body: rows,
      theme: "grid",
    });

    doc.save("presupuestoSemanal.pdf");
  };

  const handleClick = () => {
    handleCreatePDF();
    dispatch({ type: "reset-app" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center items-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor:
              percentage >= 95
                ? "#DC2626"
                : percentage < 95 && percentage > 80
                ? "#eca200"
                : "#3B82F6",
            trailColor: "#F5F5F5",
            textSize: 8,
            textColor: "#3B82F6",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg uppercase hover:bg-pink-700 transition-colors duration-300 cursor-pointer disabled:opacity-50"
          onClick={handleClick}
        >
          Reset App
        </button>
        <Amonunt label="Presupuesto" amount={state.budget} />
        <Amonunt label="Disponible" amount={remainingBudget} />
        <Amonunt label="Gastado" amount={totalGastos} />
      </div>
    </div>
  );
};

export default BudgetTracker;
