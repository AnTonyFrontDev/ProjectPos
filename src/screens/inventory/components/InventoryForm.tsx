import React from 'react';
import { useInventoryForm } from '../hooks/useInventoryForm';
import FilterProducts from './SelectFilter/FilterProductsI';
import FilterSize from './SelectFilter/FilterSizeI'
import FilterColor from './SelectFilter/FilterColorI'
// import { InventoryColorDto } from '../../../shared/interfaces/Inventory/I_InventoryColor';
const InventoryForm: React.FC = () => {
    //custom hooks useInventoryForm
    const { formData, setFormData, addExistence, handleSubmit, handleAddInventory, handleProductSelect, handleSizeSelect, handleColorSelect } = useInventoryForm();


    return (
        <form onSubmit={handleSubmit}>

            <FilterProducts onProductSelect={handleProductSelect} />

            <FilterSize onSizeSelected={handleSizeSelect} />

            <label htmlFor="Date">Fecha del Inventario:</label>
            <input
                type="date"
                id="Date"
                name="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
            />

            <hr />

            {/* Iterar sobre las existencias y mostrar un formulario para cada una */}
            {formData.inventoryColors.map((existence, index) => (
                <div key={index}>
                    <FilterColor onColorSelected={(sizeId) => handleColorSelect(sizeId, true, index)} />
                    <FilterColor onColorSelected={(sizeId) => handleColorSelect(sizeId, false, index)} />

                    <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                    <input
                        type="number"
                        id={`quantity-${index}`}
                        name={`quantity-${index}`}
                        value={existence.quantity}
                        onChange={(e) =>
                            setFormData((prevInventory) => ({
                                ...prevInventory,
                                inventoryColors: prevInventory.inventoryColors.map((item, i) =>
                                    i === index ? { ...item, quantity: Number(e.target.value) } : item
                                ),
                            }))
                        }
                        required
                    />
                </div>
            ))}

            {/* Botón para agregar nueva existencia */}
            <button type="button" onClick={addExistence}>
                Agregar Existencia
            </button>

            {/* Botón para agregar el inventario */}
            {/* <button type="button" onClick={handleSubmit}> */}
            <button type="button" onClick={handleAddInventory}>
                Agregar Inventario
            </button>
        </form>
    );
};

export default InventoryForm;
