import { AppIcon } from '@/components/ui/AppIcon';
import { Link } from 'react-router-dom';

// Define los estilos en constantes
const containerStyles = "flex justify-center bg-gray-100";
const boxStyles = "bg-white p-8 w-screen rounded-lg shadow-md";
const titleStyles = "text-4xl text-center font-bold mb-8";
const linkStyles = "hover:underline rounded-md block shadow-md p-4 flex flex-col items-center justify-center";

const linkConfigs = [
  { to: "/atributos/PaymentType", text: "Tipo de Pago", color: "text-green-500", bgColor: "bg-green-100" },
  { to: "/atributos/Color", text: "Color", color: "text-red-500", bgColor: "bg-red-100" },
  { to: "/atributos/Bank", text: "Banco", color: "text-yellow-500", bgColor: "bg-yellow-100" },
  { to: "/atributos/BankAccount", text: "BancoAccount", color: "text-cyan-500", bgColor: "bg-cyan-100" },
  { to: "/atributos/Size", text: "Size", color: "text-indigo-500", bgColor: "bg-indigo-100" },
  { to: "/atributos/CategorySize", text: "Categorias de Size", color: "text-purple-500", bgColor: "bg-purple-100" },
  { to: "/atributos/TypeProd", text: "Tipo Producto", color: "text-pink-500", bgColor: "bg-pink-100" },
  { to: "/atributos/Expenses", text: "Expenses", color: "text-orange-500", bgColor: "bg-orange-100" },
  { to: "/atributos/Payment", text: "Payment", color: "text-amber-500", bgColor: "bg-amber-100" },
];

const Atributos = () => {
  return (
    <div className={containerStyles}>
      <div className={boxStyles}>
        <h1 className={titleStyles}>Menú de Atributos</h1>
        <div className="grid grid-cols-3 gap-6">
          {linkConfigs.map(({ to, text, color, bgColor }) => (
            <Link to={to} className={`${linkStyles} ${color} ${bgColor}`} key={to}>
              <AppIcon type="billing" className="cursor-pointer mb-2" width={78} />
              <span className="text-lg font-bold text-center">{text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Atributos;
