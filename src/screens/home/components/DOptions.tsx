import { AppIcon } from '@/components/ui/AppIcon';
import { APP_ICONS } from '@/shared/constants/icons-constants';
import { Link } from 'react-router-dom';

// Define los estilos en constantes
const containerStyles = "flex justify-center bg-orange-100 mb-2";
const boxStyles = "bg-white p-2 w-screen rounded-lg shadow-md";
const linkStyles = "hover:underline rounded-md block shadow-md  p-1 px-3 flex items-center justify-between"; // Cambiado p-4 a p-2 para botones más pequeños

const linkConfigs = [
    { to: "/Inventario/Listado", text: "Inventario", color: "text-orange-700", bgColor: "bg-orange-100", type: 'inventory2' },
    { to: "/preOrder", text: "Pedidos", color: "text-orange-700", bgColor: "bg-orange-100", type: 'order' },
    { to: "/Order", text: "Ordenes", color: "text-orange-700", bgColor: "bg-orange-100", type: 'order' },
    { to: "/productos", text: "Productos", color: "text-orange-700", bgColor: "bg-orange-100", type: 'Product' },
    { to: "/atributos/TypeProd", text: "Tipo Producto", color: "text-orange-700", bgColor: "bg-orange-100", type: 'tProduct' },
    { to: "/atributos/PaymentType", text: "Tipo de Pago", color: "text-orange-700", bgColor: "bg-orange-100", type: 'pay_type' },
    { to: "/billing", text: "Facturación", color: "text-orange-700", bgColor: "bg-orange-100", type: 'billing' },
    { to: "/customers", text: "Clientes", color: "text-orange-700", bgColor: "bg-orange-100", type: 'user' },
    { to: "/Inventario/NuevaCompra", text: "Nueva Compra", color: "text-orange-700", bgColor: "bg-orange-100", type: 'newbuy' },
    { to: "/atributos/Size", text: "Tallas", color: "text-orange-700", bgColor: "bg-orange-100", type: 'Sizes' },
    { to: "/atributos/CategorySize", text: "Tipos de Talla", color: "text-orange-700", bgColor: "bg-orange-100", type: 'Size_categoty' },
    { to: "/atributos/Color", text: "Colores", color: "text-orange-700", bgColor: "bg-orange-100", type: 'color' },
    { to: "/atributos/BankAccount", text: "Cuentas de Banco", color: "text-orange-700", bgColor: "bg-orange-100", type: 'bankAccount' },
    { to: "/atributos/Bank", text: "Bancos", color: "text-orange-700", bgColor: "bg-orange-100", type: 'bank' },
    // { to: "/atributos/Payment", text: "Pagos", color: "text-orange-700", bgColor: "bg-orange-100", type: 'pay' },
    // { to: "/atributos/Expenses", text: "Gastos", color: "text-orange-700", bgColor: "bg-orange-100", type: 'bills' },
    { to: "/atributos/CuentasPagar", text: "Cuentas por Pagar", color: "text-red-500", bgColor: "bg-red-100", type: 'for_pay' },
    { to: "/atributos/CuentasPorCobrar", text: "Cuentas por Cobrar", color: "text-green-700", bgColor: "bg-green-100", type: 'for_collect' }
];


const DOptions = () => {
    return (
        <div className={containerStyles}>
            <div className={boxStyles}>
                <div className="grid grid-cols-1 gap-3"> {/* Cambiado a 6 columnas y reducido el gap */}
                    {linkConfigs.map(({ to, text, color, bgColor, type }) => (
                        <Link to={to} className={`${linkStyles} ${color} ${bgColor}`} key={to}>
                            <span className="text-sm font-bold text-center ">{text}</span> {/* Cambiado a text-sm para texto más pequeño */}
                            <AppIcon type={type as keyof typeof APP_ICONS} className="cursor-pointer" width={30} /> {/* Cambiado el tamaño del icono a 50 */}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DOptions;