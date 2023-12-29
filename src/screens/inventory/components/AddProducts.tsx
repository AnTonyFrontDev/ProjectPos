import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';

const { TextArea } = Input;

interface Product {
  usuario: string;
  fecha: Date | null;
  nombreProducto: string;
  descripcion: string;
  precioVenta: string;
}

interface AddProductsProps {
  showModal: boolean;
  handleClose: () => void;
  product: Product | null;
  onSave: (data: Product) => void;
}

const AddProducts: React.FC<AddProductsProps> = ({ showModal, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    usuario: product ? product.usuario : '',
    fecha: product ? product.fecha : null,
    nombreProducto: product ? product.nombreProducto : '',
    descripcion: product ? product.descripcion : '',
    precioVenta: product ? product.precioVenta : '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any, dateString: string) => {
    setFormData((prevData) => ({
      ...prevData,
      fecha: date,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal visible={showModal} onCancel={handleClose} footer={null}>
      <Form>
        <Form.Item label="Usuario" name="usuario">
          <Input
            type="text"
            placeholder="Ingrese el usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Fecha" name="fecha">
          <DatePicker
            placeholder="Seleccione la fecha"
            value={formData.fecha}
            onChange={handleDateChange}
          />
        </Form.Item>

        <Form.Item label="Nombre del Producto" name="nombreProducto">
          <Input
            type="text"
            placeholder="Ingrese el nombre del producto"
            name="nombreProducto"
            value={formData.nombreProducto}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Descripción" name="descripcion">
          <TextArea
            placeholder="Ingrese la descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Precio de Venta" name="precioVenta">
          <Input
            type="number"
            placeholder="Ingrese el precio de venta"
            name="precioVenta"
            value={formData.precioVenta}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProducts;
