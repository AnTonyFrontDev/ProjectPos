import BackButton from '@/components/Generics/BackButton';
import { AppIcon } from '@/components/ui/AppIcon';
import { APP_ICONS } from '@/shared/constants/icons-constants';
import { Link } from 'react-router-dom';

// Define los estilos en constantes
const containerStyles = "flex justify-center bg-gray-100";
const boxStyles = "bg-white p-8 w-screen rounded-lg shadow-md";
// const titleStyles = "text-4xl text-center font-bold mb-8";
const linkStyles = "hover:underline rounded-md block shadow-md p-16 flex flex-col items-center justify-center";


const linkConfigsInventario = [
    { to: "/productos", text: "Productos", color: "text-orange-500", bgColor: "bg-orange-100", type: 'Product' },
    { to: "/Inventario/Listado", text: "Inventario", color: "text-amber-500", bgColor: "bg-amber-100", type: 'inventory2' },
    { to: "/Inventario/NuevaCompra", text: "Nueva Compra", color: "text-amber-500", bgColor: "bg-amber-100", type: 'newbuy' },
    { to: "/Inventario/Compras", text: "Compras", color: "text-orange-500", bgColor: "bg-orange-100", type: 'buy' },
];

const Inventario = () => {
    return (
        <div className={containerStyles}>
            <div className={boxStyles}>
                <div className="flex items-center space-x-4 mb-4">
                    <BackButton />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Menú de Inventario
                    </h2>
                </div>
                <div className="grid grid-cols-4 py-10 gap-6">
                    {linkConfigsInventario.map(({ to, text, color, bgColor, type }) => (
                        <Link to={to} className={`${linkStyles} ${color} ${bgColor}`} key={to}>
                            <AppIcon type={type as keyof typeof APP_ICONS} className="cursor-pointer mb-2" width={98} />
                            <span className="text-lg font-bold text-center">{text}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventario;
