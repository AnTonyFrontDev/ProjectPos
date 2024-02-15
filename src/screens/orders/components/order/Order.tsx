import { GetInvColorAvailableToAddOrder } from "@/shared/Api/Order/OrderApi";
import { IInventoryToAddOrder } from "@/shared/interfaces/Inventory/IInventoryToAddOrder";
import { IPreOrderKeys } from "@/shared/interfaces/Preorder/IPreOrderKeys";
import { useEffect, useState } from "react";
import SelectItemsToOrder from "./SelectItemsToOrder";
import OrderDtoAdd from "@/shared/Dto/Order/OrderDtoAdd";
import { IOrderPost, Product } from "@/shared/interfaces/order/IOrderPost";

export const Order = (props: { preorderKeys: IPreOrderKeys[] }) => {
  const [data, setData] = useState<IInventoryToAddOrder[]>();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [descriptionJob, setDescriptionJob] = useState("");
  const [checkedJob, setCheckedJob] = useState(false);
  const order = new OrderDtoAdd();

  const sendOrder = () =>{

  }
  const HandlerOnAddToOrder = (item: Product[]) => {
    console.log(item);
    setProducts(item);
    order.products = products;
  };

  const handleInputDescriptionJob = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionJob(event.target.value);
  };
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedJob(event.target.checked);
  };
  useEffect(() => {
    const GetData = async () => {
      const obj = [
        {
          fkSize: 2,
          fkProduct: 1,
          fkColorPrimary: 1,
          fkColorSecondary: 2,
        },
      ] as IPreOrderKeys[];
      setData(await GetInvColorAvailableToAddOrder(obj));
      setLoading(false);
    };
    GetData();
  }, []);
  if (loading) {
    return <div> Loading...</div>;
  }
  return (
    <div>
      {Array.isArray(data) && (
        <SelectItemsToOrder
          itemsAvailableToAdd={data}
          OnAddToOrder={HandlerOnAddToOrder}
        />
      )}

      <div>
        <label>Descripcion del trabajo:</label>
        <input
          placeholder="Descripcion del trabajo"
          onChange={handleInputDescriptionJob}
        />
      </div>
      <div>
        <label>Confirmada:</label>
        <input type="checkbox" checked={checkedJob} onChange={handleCheckbox} />
      </div>
      <div>
        <h2>Productos agregados:</h2>
        {products.length != 0 &&
          products.map((product) => (
            <p key={product.fkInventoryColor}>{product.fkInventoryColor}</p>
          ))}
      </div>
      <button type="button" onClick={sendOrder}>
        Agregar orden
      </button>
    </div>
  );
};
