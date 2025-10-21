import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

export default function AmountDisplay({ amount, label }: AmountDisplayProps) {
  return (

<p className="text-xl sm:text-2xl text-blue-600 font-bold whitespace-nowrap">
    {label && `${label}: `}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
      </p>

  
  );
}
