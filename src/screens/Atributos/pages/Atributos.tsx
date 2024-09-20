import { AppIcon } from '@/components/ui/AppIcon';
import { APP_ICONS } from '@/shared/constants/icons-constants';
import { Link } from 'react-router-dom';

// Define los estilos en constantes
const containerStyles = "flex justify-center bg-gray-100";
const boxStyles = "bg-white p-8 w-screen rounded-lg shadow-md";
const titleStyles = "text-4xl text-center font-bold mb-8";
const linkStyles = "hover:underline rounded-md block shadow-md p-4 flex flex-col items-center justify-center";

const linkConfigs = [
  { to: "/atributos/TypeProd", text: "Tipo Producto", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'tProduct' },
  { to: "/atributos/CategorySize", text: "Categorias de Tallas", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'Size_categoty' },
  { to: "/atributos/Size", text: "Tallas", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'Sizes' },
  { to: "/atributos/BankAccount", text: "Cuentas de Banco", color: "text-amber-500", bgColor: "bg-amber-100", type: 'bankAccount' },
  { to: "/atributos/Bank", text: "Bancos", color: "text-amber-500", bgColor: "bg-amber-100", type: 'bank' },
  { to: "/atributos/PaymentType", text: "Tipo de Pago", color: "text-amber-500", bgColor: "bg-amber-100", type: 'pay_type' },
  { to: "/atributos/CuentasPorCobrar", text: "Cuentas por Cobrar", color: "text-green-500", bgColor: "bg-green-100", type: 'for_collect' },
  { to: "/customers", text: "Clientes", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'user' },
  { to: "/atributos/Color", text: "Colores", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'color' },
  { to: "/atributos/Supplier", text: "Suplidores", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'orders' },
  { to: "/atributos/Payment", text: "Pagos", color: "text-amber-500", bgColor: "bg-amber-100", type: 'pay' },
  { to: "/atributos/Expenses", text: "Gastos", color: "text-amber-500", bgColor: "bg-amber-100", type: 'bills' },
  { to: "/atributos/NoteCredit", text: "Nota de credito", color: "text-amber-500", bgColor: "bg-amber-100", type: 'for_collect' },
  { to: "/atributos/CuentasPagar", text: "Cuentas por Pagar", color: "text-red-500", bgColor: "bg-red-100", type: 'for_pay' },
];

const Atributos = () => {
  return (
    <div className={containerStyles}>
      <div className={boxStyles}>
        <h1 className={titleStyles}>Menú de Atributos</h1>
        <div className="grid grid-cols-7 gap-y-10 gap-x-6">
          {linkConfigs.map(({ to, text, color, bgColor, type }) => (
            <Link to={to} className={`${linkStyles} ${color} ${bgColor}`} key={to}>
              <AppIcon type={type as keyof typeof APP_ICONS} className="cursor-pointer mb-2" width={78} />
              <span className="text-lg font-bold text-center">{text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Atributos;
