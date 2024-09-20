import { AppIcon } from '@/components/ui/AppIcon';
import { APP_ICONS } from '@/shared/constants/icons-constants';
import { Link } from 'react-router-dom';

// Define los estilos en constantes
const containerStyles = "flex justify-center bg-gray-100 mb-2";
const boxStyles = "bg-white p-2 w-screen rounded-lg shadow-md";
const linkStyles = "hover:underline rounded-md block shadow-md p-1 flex items-center justify-around"; // Cambiado p-4 a p-2 para botones más pequeños

const linkConfigs = [
    { to: "/Inventario/Listado", text: "Inventario", color: "text-blue-500", bgColor: "bg-blue-100", type: 'inventory2' },
    { to: "/preOrder", text: "Pedidos", color: "text-blue-500", bgColor: "bg-blue-100", type: 'order' },
    { to: "/Order", text: "Ordenes", color: "text-blue-500", bgColor: "bg-blue-100", type: 'order' },
    { to: "/productos", text: "Productos", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'Product' },
    { to: "/atributos/TypeProd", text: "Tipo Producto", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'tProduct' },
    { to: "/atributos/PaymentType", text: "Tipo de Pago", color: "text-amber-500", bgColor: "bg-yellow-100", type: 'pay_type' },
    { to: "/billing", text: "Facturación", color: "text-yellow-500", bgColor: "bg-yellow-100", type: 'billing' },
    { to: "/customers", text: "Clientes", color: "text-purple-500", bgColor: "bg-purple-100", type: 'user' },
    { to: "/Inventario/NuevaCompra", text: "Nueva Compra", color: "text-lime-500", bgColor: "bg-lime-100", type: 'newbuy' },
    { to: "/atributos/Size", text: "Tallas", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'Sizes' },
    { to: "/atributos/CategorySize", text: "Categorias de Tallas", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'Size_categoty' },
    { to: "/atributos/Color", text: "Colores", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'color' },
    { to: "/atributos/BankAccount", text: "Cuentas de Banco", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'bankAccount' },
    { to: "/atributos/Bank", text: "Bancos", color: "text-indigo-500", bgColor: "bg-indigo-100", type: 'bank' },
    { to: "/atributos/Payment", text: "Pagos", color: "text-amber-500", bgColor: "bg-amber-100", type: 'pay' },
    { to: "/atributos/Expenses", text: "Gastos", color: "text-amber-500", bgColor: "bg-orange-100", type: 'bills' },
    { to: "/atributos/CuentasPagar", text: "Cuentas por Pagar", color: "text-red-500", bgColor: "bg-red-100", type: 'for_pay' },
    { to: "/atributos/CuentasPorCobrar", text: "Cuentas por Cobrar", color: "text-green-500", bgColor: "bg-green-100", type: 'for_collect' },
];

const DOptions = () => {
    return (
        <div className={containerStyles}>
            <div className={boxStyles}>
                <div className="grid grid-cols-1 gap-3"> {/* Cambiado a 6 columnas y reducido el gap */}
                    {linkConfigs.map(({ to, text, color, bgColor, type }) => (
                        <Link to={to} className={`${linkStyles} ${color} ${bgColor}`} key={to}>
                            <AppIcon type={type as keyof typeof APP_ICONS} className="cursor-pointer" width={30} /> {/* Cambiado el tamaño del icono a 50 */}
                            <span className="text-sm font-bold text-center">{text}</span> {/* Cambiado a text-sm para texto más pequeño */}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DOptions;