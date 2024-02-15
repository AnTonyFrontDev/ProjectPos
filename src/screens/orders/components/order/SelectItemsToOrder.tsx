import { IInventoryToAddOrder } from "@/shared/interfaces/Inventory/IInventoryToAddOrder";
import { Product } from "@/shared/interfaces/order/IOrderPost";
import { useState } from "react";

const SelectItemsToOrder = (props: {
  itemsAvailableToAdd: IInventoryToAddOrder[];
  OnAddToOrder: (items: Product[]) => void;
}) => {
  const [invColorId, setInvColorId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const items = [] as Product[];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleInvColorId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInvColorId(Number(event.target.value));
  };

  const handleSendItem = () => {
    let success = true;
    const item = props.itemsAvailableToAdd.find(
      (item) => item.inventoryColorId == invColorId
    )?.quantity;
    console.log(item);
    if (quantity > (item != undefined ? item : 0)) {
      success = false;
      console.log(
        "no se puede agregar, la cantidad disponible es mayor a la posible"
      );
    }

    if (success) {
      items.push({
        fkOrder: 0,
        fkInventoryColor: invColorId,
        quantity: quantity,
      } as Product);
      const indexItem = props.itemsAvailableToAdd.findIndex(
        (item) => item.inventoryColorId == invColorId
      );
      props.itemsAvailableToAdd.splice(indexItem, 1);
      props.OnAddToOrder(items);
      setInvColorId(0);
      console.log(items);
    }
  };
  return (
    <form>
      <select value={invColorId} onChange={handleInvColorId}>
        <option hidden>Selecciona una opcion</option>
        {props.itemsAvailableToAdd.map((item) => (
          <option key={item.inventoryColorId} value={item.inventoryColorId}>
            producto:{item.product.name_prod} size:{item.size.size} cantidad:{" "}
            {item.quantity}colores: {item.colorPrimary.colorname}{" "}
            {item.colorSecondary.colorname}
          </option>
        ))}
      </select>
      <input type="number" value={quantity} onChange={handleInput} />
      <button type="button" onClick={handleSendItem}>
        Agregar item
      </button>
    </form>
  );
};

export default SelectItemsToOrder;
