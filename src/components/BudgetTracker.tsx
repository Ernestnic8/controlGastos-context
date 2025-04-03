import Amonunt from "./Amonunt";

const BudgetTracker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center items-center">
        <img src="/grafico.jpg" alt="Grafico de datos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg uppercase hover:bg-pink-700 transition-colors duration-300 cursor-pointer disabled:opacity-50"
        >
          Reset App
        </button>
        <Amonunt label="Disponible" amount={300} />
        <Amonunt label="Disponible" amount={200} />
        <Amonunt label="Disponible" amount={100} />
      </div>
    </div>
  );
};

export default BudgetTracker;
