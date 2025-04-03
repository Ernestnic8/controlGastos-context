import { formatCurrency } from "../helper";

type AmonuntProps = {
  label?: string;
  amount: number;
};

const Amonunt = ({ label, amount }: AmonuntProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}: `}
      <span className="text-black font-bold">{formatCurrency(amount)}</span>
    </p>
  );
};

export default Amonunt;
