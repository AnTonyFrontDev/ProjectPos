
import { useParams } from 'react-router-dom'
import Detail from '../components/DetalleProducto';
import ProductColorAdd from '../components/ProductColorAdd';

const ProductDetail = () => {
    const { productId } = useParams<{ productId : any}>();
    console.log(productId);
    return (
      <div>
        <Detail Id={productId} />
        <ProductColorAdd productId={productId}/>
        <div className="flex mt-4">
        {/* Botón para editar */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
          Editar
        </button>
        {/* Botón para eliminar */}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Eliminar
        </button>
      </div>
      </div>
    );
  };
  

export default ProductDetail